import type { SearchResult } from "./discovery";

type DirectSource = {
  name: string;
  url: string;
  kind: "기관 보고서" | "시장 분석" | "기업 기술" | "기업 IR" | "벤치마크";
};

// 검색엔진 색인 여부와 무관하게 발행처의 최신 목록을 직접 확인한다.
const DIRECT_SOURCES: DirectSource[] = [
  { name: "SPRi", url: "https://spri.kr/posts", kind: "기관 보고서" },
  { name: "IITP", url: "https://www.iitp.kr/kr/1/knowledge/periodicalList.it", kind: "기관 보고서" },
  { name: "KISDI", url: "https://www.kisdi.re.kr/report/list.do?key=m2101113025337", kind: "기관 보고서" },
  { name: "KIET", url: "https://www.kiet.re.kr/research/reportList", kind: "기관 보고서" },
  { name: "KISTEP", url: "https://www.kistep.re.kr/board.es?mid=a10306010000&bid=0031", kind: "기관 보고서" },
  { name: "ETRI", url: "https://ksp.etri.re.kr/ksp/plan-report/list", kind: "기관 보고서" },
  { name: "TrendForce", url: "https://www.trendforce.com/presscenter", kind: "시장 분석" },
  { name: "McKinsey Semiconductors", url: "https://www.mckinsey.com/industries/semiconductors/our-insights", kind: "시장 분석" },
  { name: "NVIDIA Technical Blog", url: "https://developer.nvidia.com/blog/", kind: "기업 기술" },
  { name: "AMD Newsroom", url: "https://www.amd.com/en/newsroom.html", kind: "기업 기술" },
  { name: "Intel Newsroom", url: "https://newsroom.intel.com/", kind: "기업 기술" },
  { name: "Samsung Semiconductor", url: "https://semiconductor.samsung.com/news-events/tech-blog/", kind: "기업 기술" },
  { name: "SK hynix Newsroom", url: "https://news.skhynix.com/", kind: "기업 기술" },
  { name: "NVIDIA Investor Relations", url: "https://investor.nvidia.com/financial-info/financial-reports-and-sec-filings/default.aspx", kind: "기업 IR" },
  { name: "AMD Investor Relations", url: "https://ir.amd.com/financial-information/quarterly-results", kind: "기업 IR" },
  { name: "Samsung Electronics IR", url: "https://www.samsung.com/global/ir/reports-disclosures/earnings-release/", kind: "기업 IR" },
  { name: "SK hynix IR", url: "https://www.skhynix.com/ir/UI-FR-IR01/", kind: "기업 IR" },
  { name: "MLCommons", url: "https://mlcommons.org/benchmarks/", kind: "벤치마크" },
];

function decode(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function meaningfulTitle(value: string) {
  return value.length >= 12
    && value.length <= 240
    && !/^(more|view more|read more|learn more|next|previous|home|전체보기|더보기)$/i.test(value);
}

async function collectSource(source: DirectSource): Promise<SearchResult[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: { "user-agent": "Mozilla/5.0 MoaKnowledge/1.0 (personal research reader)" },
    });
    if (!response.ok) throw new Error(`${source.name} ${response.status}`);
    const html = await response.text();
    const results: SearchResult[] = [];
    const seen = new Set<string>();
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      const title = decode(match[2]);
      if (!meaningfulTitle(title)) continue;
      let url = "";
      try { url = new URL(match[1], source.url).toString(); } catch { continue; }
      if (!/^https?:\/\//i.test(url) || seen.has(url) || url === source.url) continue;
      seen.add(url);
      results.push({
        title,
        url,
        summary: `${source.kind} · ${source.name} 공식 발행 페이지에서 직접 수집`,
        publishedAt: null,
      });
      if (results.length >= 30) break;
    }
    return results;
  } finally {
    clearTimeout(timeout);
  }
}

export async function collectDirectSourceResults() {
  const settled = await Promise.allSettled(DIRECT_SOURCES.map(async (source) => ({
    source,
    results: await collectSource(source),
  })));
  return settled.flatMap((item) => item.status === "fulfilled" && item.value.results.length
    ? [{
        label: `${item.value.source.kind} · ${item.value.source.name}`,
        institutional: item.value.source.kind === "기관 보고서",
        results: item.value.results,
      }]
    : []);
}
