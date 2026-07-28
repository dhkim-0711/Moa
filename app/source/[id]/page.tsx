import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { sources } from "../../../db/schema";

export default async function SourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [source] = await getDb().select().from(sources).where(eq(sources.id, Number(id))).limit(1);
  if (!source) return <main style={{ padding: 40 }}>자료를 찾을 수 없습니다.</main>;
  return <main style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px", lineHeight: 1.75 }}>
    <p style={{ color: "#638177", fontWeight: 700 }}>{source.kind} · 모아 자료함</p>
    <h1>{source.title}</h1>
    {source.url && <p><a href={source.url}>원본 웹페이지 열기</a></p>}
    <article style={{ whiteSpace: "pre-wrap", marginTop: 32 }}>{source.content || source.excerpt || "추출된 내용이 없습니다."}</article>
  </main>;
}
