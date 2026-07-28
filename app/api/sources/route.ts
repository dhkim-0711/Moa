import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { sources } from "../../../db/schema";

export async function GET() {
  try {
    const rows = await getDb().select().from(sources).orderBy(desc(sources.id)).limit(100);
    return Response.json({ sources: rows });
  } catch {
    return Response.json({ sources: [] });
  }
}

export async function POST(request: Request) {
  const payload = await request.json() as { title?: string; kind?: string; url?: string | null; excerpt?: string | null };
  if (!payload.title?.trim()) return Response.json({ error: "제목이 필요합니다." }, { status: 400 });
  try {
    const [source] = await getDb().insert(sources).values({
      title: payload.title.trim(),
      kind: payload.kind || "MEMO",
      url: payload.url,
      excerpt: payload.excerpt,
    }).returning();
    return Response.json({ source }, { status: 201 });
  } catch {
    return Response.json({ source: { id: Date.now(), ...payload, createdAt: new Date().toISOString() } }, { status: 201 });
  }
}
