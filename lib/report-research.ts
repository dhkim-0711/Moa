import { canonicalUrl, searchWeb, similarTitle } from "./discovery";

export type ResearchCategory = "technology" | "market" | "company" | "policy";

const SEARCH_PLAN: Array<{ category: ResearchCategory; months: number; queries: string[] }> = [
  { category: "market", months: 6, queries: [
    "global AI market size growth forecast regional share investment 2026",
    "AI accelerator semiconductor market demand revenue shipments forecast 2026",
    "enterprise generative AI adoption spending market trend 2026",
  ] },
  { category: "company", months: 3, queries: [
    "OpenAI Google Microsoft Meta Amazon Baidu ByteDance AI product partnership acquisition funding latest",
    "Samsung Naver Kakao AI product service partnership investment latest",
  ] },
  { category: "policy", months: 1, queries: [
    "한국 AI 정책 예산 법안 시행 최신",
    "EU AI Act US China AI regulation G7 OECD latest",
  ] },
  { category: "technology", months: 1, queries: [
    "AI SOTA benchmark model release open source latest",
    "GPU NPU AI accelerator performance efficiency TOPS latest release",
  ] },
  { category: "market", months: 6, queries: ["AI investment funding data center capacity demand latest"] },
];

export async function collectReportResearch() {
  const tasks = SEARCH_PLAN.flatMap((plan) => plan.queries.map(async (query) => {
    try {
      const results = await searchWeb(query);
      const cutoff = Date.now() - plan.months * 31 * 24 * 60 * 60 * 1000;
      return results.filter((item) => {
        const time = item.publishedAt ? new Date(item.publishedAt).getTime() : NaN;
        return Number.isFinite(time) && time >= cutoff;
      }).map((item) => ({ ...item, category: plan.category }));
    } catch { return []; }
  }));
  const rows = (await Promise.all(tasks)).flat();
  const unique: typeof rows = [];
  const urls = new Set<string>();
  for (const row of rows) {
    const url = canonicalUrl(row.url);
    if (urls.has(url) || unique.some((item) => similarTitle(item.title, row.title))) continue;
    urls.add(url);
    unique.push(row);
  }
  return unique.slice(0, 80);
}
