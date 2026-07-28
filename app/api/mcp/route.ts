import { env } from "cloudflare:workers";
import { desc, eq, like, or } from "drizzle-orm";
import { getDb } from "../../../db";
import { sources } from "../../../db/schema";

type RpcRequest = { jsonrpc?: string; id?: string | number | null; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } };

const tools = [
  {
    name: "search",
    title: "모아 자료 검색",
    description: "사용자의 개인 자료함에서 질문과 관련된 PDF, HWPX, 웹페이지, 메모를 검색합니다. 답변이나 문서 작성 전에 근거 자료를 찾을 때 사용하세요.",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "찾을 내용이나 질문" } }, required: ["query"], additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
  },
  {
    name: "fetch",
    title: "모아 원문 가져오기",
    description: "검색 결과의 ID로 저장된 자료 원문과 출처 정보를 가져옵니다.",
    inputSchema: { type: "object", properties: { id: { type: "string", description: "search가 반환한 자료 ID" } }, required: ["id"], additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
  },
  {
    name: "list_recent_sources",
    title: "최근 자료 목록",
    description: "모아에 최근 저장한 자료 목록을 확인합니다.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
  },
];

function rpc(id: RpcRequest["id"], result: unknown) {
  return Response.json({ jsonrpc: "2.0", id, result }, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Expose-Headers": "Mcp-Session-Id" } });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "content-type, accept, mcp-session-id" } });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!env.MOA_MCP_TOKEN || token !== env.MOA_MCP_TOKEN) return new Response("Unauthorized", { status: 401 });
  return Response.json({ name: "모아 MCP", status: "ready" });
}

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!env.MOA_MCP_TOKEN || token !== env.MOA_MCP_TOKEN) return new Response("Unauthorized", { status: 401 });
  const body = await request.json() as RpcRequest;
  if (body.method === "initialize") return rpc(body.id, {
    protocolVersion: "2025-03-26",
    capabilities: { tools: {} },
    serverInfo: { name: "moa-knowledge", version: "1.0.0" },
    instructions: "모아는 사용자의 개인 지식 자료함입니다. 질문에 답하거나 기획서·보고서를 작성하기 전에 search로 관련 자료를 찾고, fetch로 원문을 확인하세요. 자료에 없는 추론은 추론이라고 명확히 구분하고, 결과에 제공된 URL을 출처로 인용하세요.",
  });
  if (body.method === "notifications/initialized") return new Response(null, { status: 202 });
  if (body.method === "tools/list") return rpc(body.id, { tools });
  if (body.method !== "tools/call") return rpc(body.id, { content: [{ type: "text", text: "지원하지 않는 요청입니다." }], isError: true });

  const name = body.params?.name;
  const args = body.params?.arguments || {};
  if (name === "search") {
    const query = String(args.query || "").trim();
    const words = query.split(/\s+/).filter((word) => word.length > 1).slice(0, 6);
    const conditions = words.flatMap((word) => [like(sources.title, `%${word}%`), like(sources.content, `%${word}%`)]);
    const rows = conditions.length
      ? await getDb().select().from(sources).where(or(...conditions)).orderBy(desc(sources.id)).limit(10)
      : await getDb().select().from(sources).orderBy(desc(sources.id)).limit(10);
    const results = rows.map((item) => ({
      id: String(item.id),
      title: item.title,
      text: (item.content || item.excerpt || "").slice(0, 1200),
      url: item.url || `https://moa-knowledge-assistant.ehdkim71.chatgpt.site/source/${item.id}`,
    }));
    return rpc(body.id, { content: [{ type: "text", text: JSON.stringify({ results }) }], structuredContent: { results } });
  }
  if (name === "fetch") {
    const [item] = await getDb().select().from(sources).where(eq(sources.id, Number(args.id))).limit(1);
    if (!item) return rpc(body.id, { content: [{ type: "text", text: "자료를 찾을 수 없습니다." }], isError: true });
    const document = { id: String(item.id), title: item.title, text: item.content || item.excerpt || "", url: item.url || `https://moa-knowledge-assistant.ehdkim71.chatgpt.site/source/${item.id}`, metadata: { type: item.kind, saved_at: item.createdAt } };
    return rpc(body.id, { content: [{ type: "text", text: JSON.stringify(document) }], structuredContent: document });
  }
  if (name === "list_recent_sources") {
    const rows = await getDb().select().from(sources).orderBy(desc(sources.id)).limit(20);
    const items = rows.map((item) => ({ id: String(item.id), title: item.title, type: item.kind, saved_at: item.createdAt }));
    return rpc(body.id, { content: [{ type: "text", text: JSON.stringify({ items }) }], structuredContent: { items } });
  }
  return rpc(body.id, { content: [{ type: "text", text: "알 수 없는 도구입니다." }], isError: true });
}
