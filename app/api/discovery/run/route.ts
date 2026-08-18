import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { blockedHosts, discoveryCandidates, discoveryTopics } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";
import { relevanceScore, searchWeb } from "../../../../lib/discovery";

export async function POST(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const db = getDb();
  const force = new URL(request.url).searchParams.get("force") === "1";
  const topics = await db.select().from(discoveryTopics).where(eq(discoveryTopics.active, true));
  const blocked = new Set((await db.select().from(blockedHosts)).map((item) => item.host));
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const due = topics.filter((topic) => force || !topic.lastRunAt || new Date(topic.lastRunAt).getTime() < cutoff);
  let added = 0;
  const errors: string[] = [];
  for (const topic of due) {
    try {
      const results = await searchWeb(topic.query);
      for (const result of results) {
        let host = "";
        try { host = new URL(result.url).hostname.replace(/^www\./, ""); } catch { continue; }
        if (blocked.has(host)) continue;
        const inserted = await db.insert(discoveryCandidates).values({
          topicId: topic.id,
          query: topic.query,
          title: result.title,
          url: result.url,
          summary: result.summary,
          host,
          relevance: relevanceScore(topic.query, result.title, result.summary),
          publishedAt: result.publishedAt,
        }).onConflictDoNothing().returning({ id: discoveryCandidates.id });
        added += inserted.length;
      }
      await db.update(discoveryTopics).set({ lastRunAt: new Date().toISOString() }).where(eq(discoveryTopics.id, topic.id));
    } catch (error) {
      errors.push(`${topic.query}: ${error instanceof Error ? error.message : "검색 실패"}`);
    }
  }
  return Response.json({ added, checked: due.length, errors });
}
