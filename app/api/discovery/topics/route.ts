import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { discoveryTopics } from "../../../../db/schema";
import { requireAuthorized } from "../../../../lib/auth";

export async function GET(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const topics = await getDb().select().from(discoveryTopics)
    .where(eq(discoveryTopics.origin, "manual"))
    .orderBy(asc(discoveryTopics.id));
  return Response.json({ topics });
}

export async function POST(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const { query } = await request.json() as { query?: string };
  const value = query?.trim();
  if (!value || value.length < 2) return Response.json({ error: "두 글자 이상의 관심 주제를 입력하세요." }, { status: 400 });
  try {
    const [topic] = await getDb().insert(discoveryTopics).values({ query: value }).returning();
    return Response.json({ topic }, { status: 201 });
  } catch {
    return Response.json({ error: "이미 등록된 관심 주제입니다." }, { status: 409 });
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const { id } = await request.json() as { id?: number };
  if (!id) return Response.json({ error: "주제 ID가 필요합니다." }, { status: 400 });
  await getDb().delete(discoveryTopics).where(eq(discoveryTopics.id, id));
  return Response.json({ ok: true });
}
