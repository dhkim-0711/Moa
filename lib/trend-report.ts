export type TrendSource = {
  id: number;
  title: string;
  url: string | null;
  excerpt: string | null;
  content: string | null;
  createdAt: string;
  origin?: "MOA" | "DAILY_DESK";
};

export type TrendCategory = "technology" | "market" | "company";

const CATEGORY_LABELS: Record<TrendCategory, string> = {
  technology: "기술 동향",
  market: "시장 동향",
  company: "기업 사건",
};

const TERMS: Record<TrendCategory, string[]> = {
  technology: ["npu", "ai 반도체", "ai 가속기", "tops", "전력효율", "전력 효율", "추론", "hbm", "칩렛", "cxl", "공정", "아키텍처", "성능"],
  market: ["시장규모", "시장 규모", "점유율", "매출", "출하량", "투자액", "cagr", "성장률", "전망", "수요"],
  company: ["수주", "양산", "투자유치", "투자 유치", "공급계약", "공급 계약", "협력", "인수", "출시", "계약"],
};

const METRIC_PATTERN = /(?:약\s*)?(?:\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*(?:%|조원|억원|만원|원|억\s*달러|만\s*달러|달러|usd|배|대|개|건|tops(?:\/w)?|w|nm|gb\/s|tb\/s)/gi;

function clean(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sentences(value: string) {
  return clean(value).split(/(?<=[.!?。]|다\.)\s+/).map(clean).filter((sentence) => sentence.length >= 25);
}

function classify(source: TrendSource): TrendCategory {
  const text = `${source.title} ${source.excerpt || ""} ${(source.content || "").slice(0, 20_000)}`.toLocaleLowerCase("ko");
  const scores = (Object.keys(TERMS) as TrendCategory[]).map((category) => ({
    category,
    score: TERMS[category].reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0),
  }));
  scores.sort((a, b) => b.score - a.score || (a.category === "company" ? -1 : 1));
  return scores[0].category;
}

function summarize(source: TrendSource, category: TrendCategory) {
  const candidates = sentences(source.content || source.excerpt || "");
  const terms = TERMS[category];
  const selected = candidates.find((sentence) => {
    const normalized = sentence.toLocaleLowerCase("ko");
    return terms.some((term) => normalized.includes(term)) && sentence.length <= 320;
  }) || candidates.find((sentence) => sentence.length <= 320) || source.excerpt || source.title;
  return clean(selected).slice(0, 320);
}

function metrics(source: TrendSource) {
  const text = `${source.title} ${source.excerpt || ""} ${(source.content || "").slice(0, 30_000)}`;
  return [...new Set(text.match(METRIC_PATTERN) || [])].slice(0, 8);
}

export function buildTrendReport(rows: TrendSource[], period: "week" | "month") {
  const sections: Record<TrendCategory, Array<TrendSource & { summary: string; metrics: string[] }>> = {
    technology: [], market: [], company: [],
  };
  for (const row of rows) {
    const category = classify(row);
    sections[category].push({ ...row, summary: summarize(row, category), metrics: metrics(row) });
  }
  const allMetrics = [...new Set(Object.values(sections).flatMap((items) => items.flatMap((item) => item.metrics)))].slice(0, 15);
  const leading = (Object.keys(sections) as TrendCategory[]).sort((a, b) => sections[b].length - sections[a].length)[0];
  const periodLabel = period === "week" ? "주간" : "월간";
  const generatedAt = new Date().toISOString();
  const overview = rows.length
    ? `분석 기간에 모아와 Daily Desk 자료 ${rows.length}건이 확인되었습니다. 기술 동향 ${sections.technology.length}건, 시장 동향 ${sections.market.length}건, 기업 사건 ${sections.company.length}건이며, 가장 많은 비중을 차지한 영역은 ${CATEGORY_LABELS[leading]}입니다.`
    : `분석 기간에 저장된 자동수집 자료가 없어 보고서 본문을 작성하지 않았습니다.`;
  const markdownLines = [
    `# AI·NPU ${periodLabel} 동향 보고서`, "", `작성 시각: ${generatedAt}`, "", "## 종합 요약", "", overview,
  ];
  if (allMetrics.length) markdownLines.push("", "## 핵심 수치", "", ...allMetrics.map((metric) => `- ${metric}`));
  for (const category of Object.keys(sections) as TrendCategory[]) {
    markdownLines.push("", `## ${CATEGORY_LABELS[category]}`, "");
    if (!sections[category].length) markdownLines.push("- 해당 기간에 분류된 자료가 없습니다.");
    for (const item of sections[category]) {
      markdownLines.push(`### ${item.title}`, "", item.summary);
      if (item.metrics.length) markdownLines.push("", `핵심 수치: ${item.metrics.join(", ")}`);
      markdownLines.push("", `출처: ${item.url || `/source/${item.id}`}`, "");
    }
  }
  markdownLines.push("", "## 작성 기준", "", "이 보고서는 모아 자동수집 자료와 Daily Desk 공개 자료의 문장을 추출·분류해 작성했습니다. 원문에 없는 판단이나 전망은 추가하지 않았습니다.");
  return { period, periodLabel, generatedAt, overview, total: rows.length, allMetrics, sections, markdown: markdownLines.join("\n") };
}
