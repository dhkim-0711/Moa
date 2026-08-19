import { and, desc, eq, gte } from "drizzle-orm";
import { getDb } from "../../../../db";
import { sources } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";
import { buildTrendReport } from "../../../../lib/trend-report";
import { searchDailyDesk } from "../../../../lib/daily-desk";

export async function GET(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const period = new URL(request.url).searchParams.get("period") === "month" ? "month" : "week";
  const days = period === "month" ? 30 : 7;
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const localRows = await getDb().select().from(sources)
    .where(and(eq(sources.kind, "AUTO_WEB"), gte(sources.createdAt, cutoff)))
    .orderBy(desc(sources.createdAt)).limit(100);
  let dailyRows: Awaited<ReturnType<typeof searchDailyDesk>> = [];
  try {
    dailyRows = (await searchDailyDesk("", 180)).filter((item) => !item.publishedAt || new Date(item.publishedAt).toISOString() >= cutoff);
  } catch {}
  const knownUrls = new Set(localRows.map((item) => item.url).filter(Boolean));
  const rows = [
    ...localRows.map((item) => ({ ...item, origin: "MOA" as const })),
    ...dailyRows.filter((item) => !knownUrls.has(item.url)).map((item, index) => ({
      id: -100_000 - index,
      title: item.title,
      url: item.url,
      excerpt: item.text,
      content: item.text,
      createdAt: item.publishedAt || new Date().toISOString(),
      origin: "DAILY_DESK" as const,
    })),
  ].slice(0, 100);
  return Response.json({ report: buildTrendReport(rows, period) });
}
