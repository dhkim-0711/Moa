import { and, desc, eq, gte } from "drizzle-orm";
import { getDb } from "../../../../db";
import { blockedHosts, discoveryCandidates, sources } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";
import { readableText } from "../../../../lib/discovery";

export async function GET(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const minimumRelevance = 70;
  const candidates = await getDb().select().from(discoveryCandidates)
    .where(and(
      eq(discoveryCandidates.status, "pending"),
      gte(discoveryCandidates.relevance, minimumRelevance),
    ))
    .orderBy(desc(discoveryCandidates.relevance), desc(discoveryCandidates.id)).limit(100);
  const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const weeklyRows = await getDb().select().from(discoveryCandidates).where(and(
    gte(discoveryCandidates.discoveredAt, weekStart),
    gte(discoveryCandidates.relevance, minimumRelevance),
  ));
  const byTopic = weeklyRows.reduce<Record<string, number>>((totals, item) => ({ ...totals, [item.query]: (totals[item.query] || 0) + 1 }), {});
  return Response.json({ candidates, weekly: {
    discovered: weeklyRows.length,
    saved: weeklyRows.filter((item) => item.status === "saved").length,
    dismissed: weeklyRows.filter((item) => item.status === "dismissed" || item.status === "blocked").length,
    topTopic: Object.entries(byTopic).sort((a, b) => b[1] - a[1])[0]?.[0] || null,
  } });
}

export async function POST(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const { id, action } = await request.json() as { id?: number; action?: "save" | "dismiss" | "block" };
  if (!id || !action) return Response.json({ error: "처리할 자료와 동작이 필요합니다." }, { status: 400 });
  const db = getDb();
  const [candidate] = await db.select().from(discoveryCandidates).where(eq(discoveryCandidates.id, id)).limit(1);
  if (!candidate) return Response.json({ error: "수집 후보를 찾을 수 없습니다." }, { status: 404 });
  if (action === "dismiss") {
    await db.update(discoveryCandidates).set({ status: "dismissed" }).where(eq(discoveryCandidates.id, id));
    return Response.json({ ok: true });
  }
  if (action === "block") {
    if (candidate.host) await db.insert(blockedHosts).values({ host: candidate.host }).onConflictDoNothing();
    if (candidate.host) await db.update(discoveryCandidates).set({ status: "blocked" }).where(and(eq(discoveryCandidates.host, candidate.host), eq(discoveryCandidates.status, "pending")));
    return Response.json({ ok: true });
  }
  let content = candidate.summary || "";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(candidate.url, { signal: controller.signal, headers: { "user-agent": "Mozilla/5.0 MoaKnowledge/1.0" } });
    clearTimeout(timeout);
    if (response.ok && (response.headers.get("content-type") || "").includes("text/html")) content = readableText(await response.text()).slice(0, 500_000) || content;
  } catch {}
  const [source] = await db.insert(sources).values({
    title: candidate.title,
    kind: "WEB",
    url: candidate.url,
    excerpt: (candidate.summary || content).slice(0, 180),
    content,
    status: content ? "ready" : "needs_text",
  }).returning();
  await db.update(discoveryCandidates).set({ status: "saved" }).where(eq(discoveryCandidates.id, id));
  return Response.json({ ok: true, source });
}
