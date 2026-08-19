const DAILY_DESK_DATA_URL = "https://dhkim-0711.github.io/daily-desk/data/dashboard.json";

type DailyDeskArticle = {
  title: string;
  link: string;
  publishedAt?: string;
  summary?: string;
  outlet?: string;
  source?: string;
  companyHits?: string[];
  taxonomyHits?: string[];
  issueCategory?: string;
  score?: number;
};

type DailyDeskData = { generatedAt?: string; news?: { articles?: DailyDeskArticle[] } };

function searchTerms(query: string) {
  return query.toLocaleLowerCase("ko").split(/\s+/).map((term) => term.trim()).filter((term) => term.length > 1).slice(0, 8);
}

export async function searchDailyDesk(query: string, limit = 10) {
  const response = await fetch(DAILY_DESK_DATA_URL, { headers: { "user-agent": "Moa Knowledge Assistant/1.0" } });
  if (!response.ok) return [];
  const data = await response.json() as DailyDeskData;
  const terms = searchTerms(query);
  return (data.news?.articles || []).map((article) => {
    const title = article.title.toLocaleLowerCase("ko");
    const body = [article.summary, article.outlet, article.source, article.issueCategory, ...(article.companyHits || []), ...(article.taxonomyHits || [])].join(" ").toLocaleLowerCase("ko");
    const titleHits = terms.filter((term) => title.includes(term)).length;
    const bodyHits = terms.filter((term) => body.includes(term)).length;
    return { article, rank: titleHits * 5 + bodyHits * 2 + Math.min(3, (article.score || 0) / 20) };
  }).filter(({ rank }) => terms.length === 0 || rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, limit)
    .map(({ article }) => ({
      id: `daily-desk:${article.link}`,
      origin: "DAILY_DESK" as const,
      title: article.title,
      text: article.summary || article.title,
      url: article.link,
      kind: article.issueCategory || "Daily Desk",
      source: article.outlet || article.source || "Daily Desk",
      publishedAt: article.publishedAt || null,
    }));
}

