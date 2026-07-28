import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { sources } from "../../../../db/schema";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const [source] = await getDb().select().from(sources).where(eq(sources.id, Number(id))).limit(1);
  return source ? Response.json({ source }) : Response.json({ error: "자료를 찾을 수 없습니다." }, { status: 404 });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await getDb().delete(sources).where(eq(sources.id, Number(id)));
  return Response.json({ ok: true });
}
