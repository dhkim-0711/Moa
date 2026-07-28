import { getDb } from "../../../db";
import { sources } from "../../../db/schema";

function readableText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(request: Request) {
  const { url, title } = await request.json() as { url?: string; title?: string };
  if (!url || !/^https?:\/\//i.test(url)) {
    return Response.json({ error: "올바른 웹 주소가 필요합니다." }, { status: 400 });
  }
  try {
    const response = await fetch(url, { headers: { "user-agent": "Moa Knowledge Assistant/1.0" } });
    if (!response.ok) throw new Error("페이지를 불러오지 못했습니다.");
    const html = await response.text();
    const content = readableText(html).slice(0, 500_000);
    const pageTitle = title?.trim() || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || url;
    const [source] = await getDb().insert(sources).values({
      title: pageTitle,
      kind: "WEB",
      url,
      excerpt: content.slice(0, 180),
      content,
      status: "ready",
    }).returning();
    return Response.json({ source }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "웹페이지 저장 실패" }, { status: 502 });
  }
}
