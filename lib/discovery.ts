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
  "AI 반도체 NPU 시장 수요 점유율 매출 출하량",
  "AI 반도체 NPU 신제품 성능 벤치마크 아키텍처",
  "AI 반도체 NPU 기업 도입 공급 계약 데이터센터",
  "global AI accelerator NPU market adoption company deployment",
  "AI chip startup funding partnership product launch",
  "HBM AI accelerator supply demand price capacity",
  "AI 반도체 NPU 이슈리포트 산업동향 보고서 filetype:pdf",
  "AI accelerator market technology white paper report filetype:pdf",
];

const TITLE_ANCHORS = ["npu", "ai 반도체", "ai semiconductor", "ai 가속기", "ai accelerator"];
const MARKET_TERMS = ["시장규모", "시장 규모", "점유율", "매출", "출하량", "투자액", "cagr", "수요", "공급", "가격", "capacity", "demand", "revenue", "shipment", "adoption"];
const TECH_TERMS = ["tops", "tops/w", "전력효율", "전력 효율", "추론 성능", "hbm", "칩렛", "cxl", "공정", "benchmark", "architecture", "inference"];
const COMPANY_EVENTS = ["수주", "양산", "투자유치", "투자 유치", "공급계약", "공급 계약", "협력", "인수", "도입", "채택", "출시", "deployment", "adoption", "partnership", "launch"];
const POLICY_TERMS = ["보도자료", "정책", "지원사업", "지원 사업", "공고", "협약식", "간담회", "장관", "정부", "부처", "실증사업", "실증 사업"];
const REPORT_TERMS = ["이슈리포트", "이슈 리포트", "연구보고서", "산업동향", "백서", "전망 보고서", "분석 보고서", "기술 보고서", "white paper", "whitepaper", "research report", "market report", "technical report", "outlook", "case study", "benchmark", "methodology", "investor presentation"];
const RESEARCH_HOSTS = ["oecd.org", "wipo.int", "worldbank.org", "imf.org", "stanford.edu", "kdi.re.kr", "kisdi.re.kr", "kistep.re.kr", "iitp.kr", "spri.kr", "kiet.re.kr", "kotra.or.kr", "etri.re.kr"];
const DEEP_SOURCE_HOSTS = [...RESEARCH_HOSTS, "arxiv.org", "doi.org", "ieee.org", "acm.org", "semi.org", "semiconductor.org", "mlcommons.org", "semianalysis.com", "epoch.ai", "developer.nvidia.com", "research.google", "microsoft.com", "aws.amazon.com", "amd.com", "intel.com", "samsung.com", "skhynix.com", "mckinsey.com", "bcg.com", "deloitte.com", "pwc.com", "accenture.com", "idc.com", "counterpointresearch.com", "trendforce.com", "techinsights.com"];
const NEWS_AGGREGATOR_HOSTS = ["news.google.com", "news.yahoo.com", "news.naver.com", "news.daum.net", "msn.com"];
export const INSTITUTIONAL_REPORT_QUERIES = [
  { query: "site:spri.kr AI 반도체 보고서", hosts: ["spri.kr"] },
  { query: "site:iitp.kr AI 반도체 주간기술동향", hosts: ["iitp.kr"] },
  { query: "site:kisdi.re.kr AI 반도체 연구보고서", hosts: ["kisdi.re.kr"] },
  { query: "site:kiet.re.kr AI 반도체 산업 보고서", hosts: ["kiet.re.kr"] },
  { query: "site:kistep.re.kr AI 반도체 기술동향 보고서", hosts: ["kistep.re.kr"] },
  { query: "site:etri.re.kr AI 반도체 기술 보고서", hosts: ["etri.re.kr"] },
  { query: "site:kotra.or.kr AI 반도체 해외시장 보고서", hosts: ["kotra.or.kr"] },
  { query: "site:oecd.org artificial intelligence semiconductor report", hosts: ["oecd.org"] },
  { query: "site:wipo.int artificial intelligence semiconductor report", hosts: ["wipo.int"] },
  { query: "site:hai.stanford.edu AI Index report hardware industry", hosts: ["hai.stanford.edu"] },
] as const;
export const DEEP_RESEARCH_QUERIES = [
  "AI accelerator market outlook methodology report PDF 2026",
  "AI semiconductor benchmark architecture technical paper PDF 2026",
  "NPU enterprise deployment case study total cost ownership",
  "HBM AI accelerator supply demand investor presentation 2026",
  "AI processor inference performance efficiency benchmark whitepaper",
] as const;
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
      `${focus} 기업 도입 제품 출시 기술 성능`,
      `${focus} 해외 시장 수요 공급 투자`,
    ])].slice(0, 8),
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
  const policyHits = POLICY_TERMS.filter((term) => combined.includes(term)).length;
  const reportEvidence = REPORT_TERMS.some((term) => combined.includes(term));
  const specificEvidence = marketEvidence || techEvidence || companyEvidence;
  const baseScore = Math.min(89, 45 + titleMatches * 10 + summaryMatches * 4 + Math.min(10, interestMatches * 2));
  if (policyHits && !techEvidence && !marketEvidence && !companyEvidence) return Math.min(69, baseScore - policyHits * 8);
  if (policyHits >= 2 && !marketEvidence && !techEvidence) return Math.min(79, baseScore - 10);
  if (reportEvidence && (hasTitleAnchor || TITLE_ANCHORS.some((term) => combined.includes(term)))) return Math.max(90, Math.min(97, baseScore + 8));
  if (!hasTitleAnchor || !specificEvidence) return baseScore;
  const evidenceCount = [marketEvidence, techEvidence, companyEvidence].filter(Boolean).length;
  const titleInterestMatches = interestTerms.filter((term) => normalizedTitle.includes(term.toLocaleLowerCase("ko"))).length;
  return Math.min(99, 90 + Math.min(6, evidenceCount * 2 + titleInterestMatches) - Math.min(6, policyHits * 3));
}

export function isInstitutionalReport(title: string, summary: string, url: string) {
  const combined = `${title} ${summary}`.toLocaleLowerCase("ko");
  let host = ""; try { host = new URL(url).hostname.replace(/^www\./, ""); } catch {}
  return REPORT_TERMS.some((term) => combined.includes(term)) || /\.pdf(?:$|[?#])/i.test(url) || RESEARCH_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`));
}

export function hostMatches(host: string, allowedHosts: readonly string[]) {
  const normalized = host.replace(/^www\./, "").toLowerCase();
  return allowedHosts.some((domain) => normalized === domain || normalized.endsWith(`.${domain}`));
}

function hasProcessorResearchContext(value: string) {
  const text = value.toLocaleLowerCase("ko");
  const hardware = ["npu", "gpu", "hbm", "cxl", "반도체", "semiconductor", "ai chip", "ai processor", "processor", "accelerator", "가속기", "칩렛", "chiplet", "데이터센터", "data center", "datacenter", "컴퓨팅", "compute", "inference", "추론"]
    .some((term) => text.includes(term));
  const ai = ["ai", "인공지능", "artificial intelligence", "machine learning"].some((term) => text.includes(term));
  const analytical = ["시장", "market", "산업", "industry", "투자", "investment", "도입", "deployment", "benchmark", "architecture", "기술", "technical"].some((term) => text.includes(term));
  return hardware || (ai && analytical);
}

export function isRelevantDiscoveryResult(_query: string, title: string, summary: string) {
  const resultText = `${title} ${summary}`.toLocaleLowerCase("ko");
  const obviousNoise = ["dictionary", "wikipedia", "imdb", "calculator", "sign in", "login", "webtoon", "boots", "porn", "adult"]
    .some((term) => resultText.includes(term));
  return !obviousNoise && hasProcessorResearchContext(resultText);
}

export function isDeepDiscoveryResult(title: string, summary: string, url: string) {
  const combined = `${title} ${summary}`.toLocaleLowerCase("ko");
  let host = ""; try { host = new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch {}
  const deepHost = DEEP_SOURCE_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`));
  const reportSignal = REPORT_TERMS.some((term) => combined.includes(term));
  const documentSignal = /\.pdf(?:$|[?#])/i.test(url) || /(?:보고서|리포트|백서|논문|연구|분석|전망|벤치마크|아키텍처|사례연구|기술문서)/i.test(combined);
  const evidenceSignal = /(?:\d+(?:\.\d+)?\s*(?:%|억|조|달러|usd|tops(?:\/w)?|w|nm|gb\/s|tb\/s|배)|cagr|methodology|dataset|실험|측정|비교)/i.test(combined);
  if (!hasProcessorResearchContext(combined)) return false;
  return deepHost || (reportSignal && (documentSignal || evidenceSignal)) || (/\.pdf(?:$|[?#])/i.test(url) && (reportSignal || evidenceSignal));
}

export function depthAdjustedScore(score: number, title: string, summary: string, url: string) {
  const deep = isDeepDiscoveryResult(title, summary, url);
  let host = ""; try { host = new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch {}
  const newsAggregator = NEWS_AGGREGATOR_HOSTS.some((domain) => host === domain || host.endsWith(`.${domain}`));
  if (!deep) return Math.min(69, score);
  if (newsAggregator) return Math.min(79, Math.max(70, score));
  return Math.min(99, Math.max(78, score + 5));
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
