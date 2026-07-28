import { env } from "cloudflare:workers";
import { getDb } from "../../../db";
import { sources } from "../../../db/schema";
import { requireAuthorized } from "../../../lib/auth";

export async function POST(request: Request) {
  const denied = await requireAuthorized(request);
  if (denied) return denied;
  const form = await request.formData();
  const file = form.get("file");
  const extractedText = String(form.get("content") || "");
  if (!(file instanceof File)) return Response.json({ error: "파일이 필요합니다." }, { status: 400 });
  const objectKey = `${Date.now()}-${crypto.randomUUID()}-${file.name}`;
  try {
    await env.FILES.put(objectKey, file.stream(), { httpMetadata: { contentType: file.type } });
    const [source] = await getDb().insert(sources).values({
      title: file.name,
      kind: file.name.split(".").pop()?.toUpperCase() || "FILE",
      objectKey,
      excerpt: `${Math.round(file.size / 1024)}KB · 내용 분석 준비됨`,
      content: extractedText.slice(0, 500_000),
      status: extractedText ? "ready" : "needs_text",
    }).returning();
    return Response.json({ source }, { status: 201 });
  } catch {
    return Response.json({ error: "파일 저장소를 준비하는 중입니다." }, { status: 503 });
  }
}
