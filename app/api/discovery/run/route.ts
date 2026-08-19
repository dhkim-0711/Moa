import { and, desc, eq, gte } from "drizzle-orm";
import { getDb } from "../../../../db";
import { blockedHosts, discoveryCandidates, discoveryTopics, sources } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";
import { canonicalUrl, deriveInterestProfile, fetchReadablePage, INSTITUTIONAL_REPORT_QUERIES, isInstitutionalReport, relevanceScore, searchWeb, similarContent, similarTitle } from "../../../../lib/discovery";
import { collectDailyDeskCandidates } from "../../../../lib/daily-desk";

const DAY = 24 * 60 * 60 * 1000;
const AUTO_SAVE_SCORE = 90;

export async function POST(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;

  const db = getDb();
  const force = new URL(request.url).searchParams.get("force") === "1";
  const cutoffDate = new Date(Date.now() - DAY);
  const recentSources = await db.select({
    title: sources.title,
    excerpt: sources.excerpt,
    content: sources.content,
  }).from(sources).orderBy(desc(sources.id)).limit(100);
  const profile = deriveInterestProfile(recentSources);
  for (const query of profile.queries) {
    await db.insert(discoveryTopics).values({ query, origin: "automatic" }).onConflictDoNothing();
  }
  const topics = await db.select().from(discoveryTopics).where(eq(discoveryTopics.active, true));
  const blocked = new Set((await db.select().from(blockedHosts)).map((item) => item.host));

  const plans = new Map<string, { query: string; topicId: number | null; topicRowId?: number }>();
  for (const topic of topics) {
    if (topic.origin === "automatic" && /(정책|지원사업|실증 사업|실증사업|정부|보도자료)/i.test(topic.query)) continue;
    if (force || !topic.lastRunAt || new Date(topic.lastRunAt).getTime() < cutoffDate.getTime()) {
      plans.set(topic.query, { query: topic.query, topicId: topic.id, topicRowId: topic.id });
    }
  }
  for (const query of INSTITUTIONAL_REPORT_QUERIES) {
    plans.set(query, { query, topicId: null });
  }
  let added = 0;
  const errors: string[] = [];
  const knownCandidates = await db.select({ title: discoveryCandidates.title, url: discoveryCandidates.url }).from(discoveryCandidates);
  const knownCandidateUrls = new Set(knownCandidates.map((item) => canonicalUrl(item.url)));
  const knownCandidateTitles = knownCandidates.map((item) => item.title);
  for (const plan of plans.values()) {
    try {
      const [webResults, dailyDeskResults] = await Promise.all([
        searchWeb(plan.query),
        collectDailyDeskCandidates(plan.query),
      ]);
      const results = [...dailyDeskResults, ...webResults];
      for (const result of results) {
        let host = "";
        try { host = new URL(result.url).hostname.replace(/^www\./, ""); } catch { continue; }
        if (blocked.has(host)) continue;
        const normalizedUrl = canonicalUrl(result.url);
        if (knownCandidateUrls.has(normalizedUrl) || knownCandidateTitles.some((title) => similarTitle(title, result.title))) continue;
        const institutionalReport = isInstitutionalReport(result.title, result.summary, result.url);
        const calculatedScore = relevanceScore(plan.query, result.title, result.summary, profile.terms);
        const score = institutionalReport ? Math.max(calculatedScore, /\.pdf(?:$|[?#])/i.test(result.url) ? 92 : 84) : calculatedScore;
        const inserted = await db.insert(discoveryCandidates).values({
          topicId: plan.topicId,
          query: plan.query,
          title: result.title,
          url: result.url,
          summary: result.summary,
          host,
          relevance: score,
          publishedAt: result.publishedAt,
        }).onConflictDoNothing().returning({ id: discoveryCandidates.id });
        added += inserted.length;
        if (inserted.length) {
          knownCandidateUrls.add(normalizedUrl);
          knownCandidateTitles.push(result.title);
        }
      }
      if (plan.topicRowId) {
        await db.update(discoveryTopics).set({ lastRunAt: new Date().toISOString() })
          .where(eq(discoveryTopics.id, plan.topicRowId));
      }
    } catch (error) {
      errors.push(`${plan.query}: ${error instanceof Error ? error.message : "검색 실패"}`);
    }
  }

  const previouslyHigh = await db.select().from(discoveryCandidates)
    .where(and(
      eq(discoveryCandidates.status, "pending"),
      gte(discoveryCandidates.relevance, AUTO_SAVE_SCORE),
    ))
    .limit(100);
  for (const candidate of previouslyHigh) {
    const recalculated = relevanceScore(candidate.query, candidate.title, candidate.summary || "", profile.terms);
    if (recalculated !== candidate.relevance) {
      await db.update(discoveryCandidates).set({ relevance: recalculated })
        .where(eq(discoveryCandidates.id, candidate.id));
    }
  }

  let autoSaved = 0;
  const highConfidence = await db.select().from(discoveryCandidates)
    .where(and(
      eq(discoveryCandidates.status, "pending"),
      gte(discoveryCandidates.relevance, AUTO_SAVE_SCORE),
    ))
    .orderBy(desc(discoveryCandidates.relevance), desc(discoveryCandidates.id))
    .limit(5);

  const existingSources = await db.select({ url: sources.url, title: sources.title, content: sources.content }).from(sources);
  const existingUrls = new Set(existingSources
    .map((item) => item.url)
    .filter((url): url is string => Boolean(url))
    .map(canonicalUrl));
  const prepared = await Promise.all(highConfidence.map(async (candidate) => {
    if (existingUrls.has(canonicalUrl(candidate.url))) return { candidate, content: "", exists: true, duplicate: false };
    if (existingSources.some((source) => similarTitle(source.title, candidate.title))) {
      return { candidate, content: "", exists: false, duplicate: true };
    }
    try {
      return { candidate, content: await fetchReadablePage(candidate.url), exists: false, duplicate: false };
    } catch {
      return { candidate, content: "", exists: false, duplicate: false };
    }
  }));

  const knownTitles = existingSources.map((source) => source.title);
  for (const { candidate, content, exists, duplicate } of prepared) {
    try {
      if (exists) {
        await db.update(discoveryCandidates).set({ status: "saved" })
          .where(eq(discoveryCandidates.id, candidate.id));
        continue;
      }
      if (duplicate || knownTitles.some((title) => similarTitle(title, candidate.title)) || existingSources.some((source) => similarContent(source.content, content))) {
        await db.update(discoveryCandidates).set({ status: "dismissed" })
          .where(eq(discoveryCandidates.id, candidate.id));
        continue;
      }
      const institutionalReport = isInstitutionalReport(candidate.title, candidate.summary || "", candidate.url);
      const reportContent = content.length >= 500 ? content : institutionalReport ? `${candidate.title}\n\n${candidate.summary || "기관 발행 보고서 원문 링크"}` : "";
      if (!reportContent || (!institutionalReport && reportContent.length < 500)) continue;
      await db.insert(sources).values({
        title: candidate.title,
        kind: "AUTO_WEB",
        url: candidate.url,
        excerpt: (candidate.summary || content).slice(0, 180),
        content: reportContent,
        status: "ready",
      });
      knownTitles.push(candidate.title);
      await db.update(discoveryCandidates).set({ status: "saved" })
        .where(eq(discoveryCandidates.id, candidate.id));
      autoSaved += 1;
    } catch {
      // 원문을 안정적으로 읽을 수 없는 후보는 자동 저장하지 않고 검토 대기 상태로 둔다.
    }
  }

  return Response.json({
    added,
    autoSaved,
    checked: plans.size,
    profileTerms: profile.terms,
    errors,
  });
}
