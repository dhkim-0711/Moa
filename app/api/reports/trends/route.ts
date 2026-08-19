import { and, desc, eq, gte } from "drizzle-orm";
import { getDb } from "../../../../db";
import { sources } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";
import { buildTrendReport } from "../../../../lib/trend-report";

export async function GET(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const period = new URL(request.url).searchParams.get("period") === "month" ? "month" : "week";
  const days = period === "month" ? 30 : 7;
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const rows = await getDb().select().from(sources)
    .where(and(eq(sources.kind, "AUTO_WEB"), gte(sources.createdAt, cutoff)))
    .orderBy(desc(sources.createdAt)).limit(100);
  return Response.json({ report: buildTrendReport(rows, period) });
}
