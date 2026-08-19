export type SearchResult = {
  title: string;
  url: string;
  summary: string;
  publishedAt: string | null;
};

const INTEREST_TERMS = [
  "AI 반도체", "NPU", "인공지능 반도체", "AI 가속기", "온디바이스 AI",
  "엣지 AI", "데이터센터", "HBM", "칩렛", "CXL", "첨단 패키징",
  "파운드리", "팹리스", "반도체", "GPU", "LLM", "추론", "실증",
  "컴퓨팅", "MangoBoost", "망고부스트", "퓨리오사AI", "리벨리온",
  "딥엑스", "사피온", "엔비디아", "AMD", "인텔", "삼성전자", "SK하이닉스",
];

const BASE_INTEREST_QUERIES = [
  "AI 반도체 NPU 시장 동향",
  "AI 반도체 NPU 기술 동향",
  "AI 반도체 NPU 기업 투자 동향",
  "AI 반도체 정책 실증 사업 동향",
];

const TITLE_ANCHORS = ["npu", "ai 반도체", "ai semiconductor", "ai 가속기", "ai accelerator"];
const MARKET_TERMS = ["시장규모", "시장 규모", "점유율", "매출", "출하량", "투자액", "cagr"];
const TECH_TERMS = ["tops", "tops/w", "전력효율", "전력 효율", "추론 성능", "hbm", "칩렛", "cxl", "공정"];
const COMPANY_EVENTS = ["수주", "양산", "투자유치", "투자 유치", "공급계약", "공급 계약", "협력", "인수"];
const COMPANY_TERMS = [
  "mangoboost", "망고부스트", "퓨리오사ai", "리벨리온", "딥엑스", "사피온",
  "엔비디아", "nvidia", "amd", "인텔", "intel", "삼성전자", "sk하이닉스",
];

function decode(value: string) {
  const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(x?[0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : parseInt(code, 10)))
    .replace(/&([a-z]+);/gi, (_, name: string) => entities[name.toLowerCase()] || `&${name};`)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(item: string, name: string) {
  return decode(item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1] || "");
}

export async function searchWeb(query: string): Promise<SearchResult[]> {
  const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&format=rss`;
  const response = await fetch(url, { headers: { "user-agent": "Moa personal RSS reader/1.0" } });
  if (!response.ok) throw new Error(`검색 서비스 응답 ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 10).map((match) => ({
    title: tag(match[1], "title"),
    url: tag(match[1], "link"),
    summary: tag(match[1], "description"),
    publishedAt: tag(match[1], "pubDate") || null,
  })).filter((item) => item.title && /^https?:\/\//i.test(item.url));
}

export function deriveInterestProfile(items: Array<{ title: string; content: string | null; excerpt: string | null }>) {
  const scores = new Map<string, number>();
  for (const item of items) {
    const title = item.title.toLocaleLowerCase("ko");
    const body = `${item.excerpt || ""} ${(item.content || "").slice(0, 30_000)}`.toLocaleLowerCase("ko");
    for (const term of INTEREST_TERMS) {
      const normalized = term.toLocaleLowerCase("ko");
      const titleCount = title.includes(normalized) ? 5 : 0;
      const bodyCount = Math.min(5, body.split(normalized).length - 1);
      if (titleCount + bodyCount > 0) scores.set(term, (scores.get(term) || 0) + titleCount + bodyCount);
    }
  }
  const terms = [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([term]) => term);
  const anchors = terms.length ? terms : ["AI 반도체", "NPU"];
  const focus = anchors.slice(0, 3).join(" ");
  return {
    terms: anchors,
    queries: [...new Set([
      ...BASE_INTEREST_QUERIES,
      `${focus} 시장 동향`,
      `${focus} 기술 개발 동향`,
      `${focus} 기업 투자 사업 동향`,
    ])].slice(0, 6),
  };
}

export function relevanceScore(query: string, title: string, summary: string, interestTerms: string[] = []) {
  const words = query.toLocaleLowerCase("ko").split(/\s+/).filter((word) => word.length > 1);
  const normalizedTitle = title.toLocaleLowerCase("ko");
  const normalizedSummary = summary.toLocaleLowerCase("ko");
  const titleMatches = words.filter((word) => normalizedTitle.includes(word)).length;
  const summaryMatches = words.filter((word) => normalizedSummary.includes(word)).length;
  const interestMatches = interestTerms.filter((term) => {
    const normalized = term.toLocaleLowerCase("ko");
    return normalizedTitle.includes(normalized) || normalizedSummary.includes(normalized);
  }).length;
  const combined = `${normalizedTitle} ${normalizedSummary}`;
  const hasTitleAnchor = TITLE_ANCHORS.some((term) => normalizedTitle.includes(term));
  const marketEvidence = MARKET_TERMS.some((term) => combined.includes(term))
    && /(?:\d+(?:\.\d+)?\s*(?:%|조원|억원|만원|달러|usd|배|대|개)|cagr\s*\d)/i.test(combined);
  const techHits = TECH_TERMS.filter((term) => combined.includes(term)).length;
  const techEvidence = techHits >= 2
    || (techHits >= 1 && /\d+(?:\.\d+)?\s*(?:tops(?:\/w)?|w|nm|gb\/s|%)/i.test(combined));
  const companyEvidence = COMPANY_TERMS.some((term) => combined.includes(term))
    && COMPANY_EVENTS.some((term) => combined.includes(term));
  const specificEvidence = marketEvidence || techEvidence || companyEvidence;
  const baseScore = Math.min(89, 45 + titleMatches * 10 + summaryMatches * 4 + Math.min(10, interestMatches * 2));
  if (!hasTitleAnchor || !specificEvidence) return baseScore;
  const evidenceCount = [marketEvidence, techEvidence, companyEvidence].filter(Boolean).length;
  const titleInterestMatches = interestTerms.filter((term) => normalizedTitle.includes(term.toLocaleLowerCase("ko"))).length;
  return Math.min(99, 90 + Math.min(6, evidenceCount * 2 + titleInterestMatches));
}

export function similarTitle(left: string, right: string) {
  const stopWords = new Set(["관련", "대한", "위한", "통해", "이번", "최근", "발표", "전망", "동향"]);
  const tokens = (value: string) => new Set(value.toLocaleLowerCase("ko")
    .replace(/[^0-9a-z가-힣]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word)));
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return false;
  const intersection = [...a].filter((word) => b.has(word)).length;
  const union = new Set([...a, ...b]).size;
  return intersection / union >= 0.65;
}

export function canonicalUrl(value: string) {
  try {
    const url = new URL(value);
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid$|gclid$|ref$|source$)/i.test(key)) url.searchParams.delete(key);
    }
    url.hostname = url.hostname.replace(/^www\./, "").toLowerCase();
    url.pathname = url.pathname.replace(/\/$/, "") || "/";
    return url.toString();
  } catch {
    return value.trim();
  }
}

export function similarContent(left: string | null | undefined, right: string | null | undefined) {
  const tokens = (value: string) => new Set(value.toLocaleLowerCase("ko")
    .replace(/[^0-9a-z가-힣]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 600));
  const a = tokens((left || "").slice(0, 12_000));
  const b = tokens((right || "").slice(0, 12_000));
  if (a.size < 20 || b.size < 20) return false;
  const intersection = [...a].filter((word) => b.has(word)).length;
  return intersection / Math.min(a.size, b.size) >= 0.72;
}

export function readableText(html: string) {
  return decode(html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6])[^>]*>/gi, "\n"));
}

export async function fetchReadablePage(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "Mozilla/5.0 MoaKnowledge/1.0" },
    });
    if (!response.ok || !(response.headers.get("content-type") || "").includes("text/html")) return "";
    return readableText(await response.text()).slice(0, 500_000);
  } finally {
    clearTimeout(timeout);
  }
}
