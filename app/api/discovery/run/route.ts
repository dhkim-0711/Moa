import { and, desc, eq, gte } from "drizzle-orm";
import { getDb } from "../../../../db";
import { blockedHosts, discoveryCandidates, discoveryTopics, sources } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";
import { deriveInterestProfile, fetchReadablePage, relevanceScore, searchWeb } from "../../../../lib/discovery";

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
    if (force || !topic.lastRunAt || new Date(topic.lastRunAt).getTime() < cutoffDate.getTime()) {
      plans.set(topic.query, { query: topic.query, topicId: topic.id, topicRowId: topic.id });
    }
  }
  let added = 0;
  const errors: string[] = [];
  for (const plan of plans.values()) {
    try {
      const results = await searchWeb(plan.query);
      for (const result of results) {
        let host = "";
        try { host = new URL(result.url).hostname.replace(/^www\./, ""); } catch { continue; }
        if (blocked.has(host)) continue;
        const score = relevanceScore(plan.query, result.title, result.summary, profile.terms);
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
      }
      if (plan.topicRowId) {
        await db.update(discoveryTopics).set({ lastRunAt: new Date().toISOString() })
          .where(eq(discoveryTopics.id, plan.topicRowId));
      }
    } catch (error) {
      errors.push(`${plan.query}: ${error instanceof Error ? error.message : "검색 실패"}`);
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

  const existingUrls = new Set((await db.select({ url: sources.url }).from(sources))
    .map((item) => item.url)
    .filter((url): url is string => Boolean(url)));
  const prepared = await Promise.all(highConfidence.map(async (candidate) => {
    if (existingUrls.has(candidate.url)) return { candidate, content: "", exists: true };
    try {
      return { candidate, content: await fetchReadablePage(candidate.url), exists: false };
    } catch {
      return { candidate, content: "", exists: false };
    }
  }));

  for (const { candidate, content, exists } of prepared) {
    try {
      if (exists) {
        await db.update(discoveryCandidates).set({ status: "saved" })
          .where(eq(discoveryCandidates.id, candidate.id));
        continue;
      }
      if (content.length < 200) continue;
      await db.insert(sources).values({
        title: candidate.title,
        kind: "WEB",
        url: candidate.url,
        excerpt: (candidate.summary || content).slice(0, 180),
        content,
        status: "ready",
      });
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
