import { desc, like, or } from "drizzle-orm";
import { getDb } from "../../../db";
import { sources } from "../../../db/schema";
import { requireAuthorized } from "../../../lib/auth";
import { searchDailyDesk } from "../../../lib/daily-desk";

export async function GET(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const query = new URL(request.url).searchParams.get("q")?.trim() || "";
  if (query.length < 2) return Response.json({ results: [] });
  const words = query.split(/\s+/).filter((word) => word.length > 1).slice(0, 6);
  const conditions = words.flatMap((word) => [like(sources.title, `%${word}%`), like(sources.content, `%${word}%`)]);
  const localRows = conditions.length
    ? await getDb().select().from(sources).where(or(...conditions)).orderBy(desc(sources.id)).limit(10)
    : [];
  const local = localRows.map((item) => ({
    id: `moa:${item.id}`,
    sourceId: item.id,
    origin: "MOA" as const,
    title: item.title,
    text: (item.content || item.excerpt || "").slice(0, 500),
    url: item.url || `/source/${item.id}`,
    kind: item.kind,
    source: "모아 자료함",
    publishedAt: item.createdAt,
  }));
  let dailyDesk: Awaited<ReturnType<typeof searchDailyDesk>> = [];
  try { dailyDesk = await searchDailyDesk(query, 10); } catch {}
  return Response.json({ results: [...local, ...dailyDesk], counts: { moa: local.length, dailyDesk: dailyDesk.length } });
}
