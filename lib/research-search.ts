import type { SearchResult } from "./discovery";

function clean(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function atomTag(entry: string, name: string) {
  return clean(entry.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i"))?.[1] || "");
}

async function searchCrossref(query: string): Promise<SearchResult[]> {
  const cutoff = new Date(Date.now() - 540 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const params = new URLSearchParams({
    "query.bibliographic": query,
    filter: `from-pub-date:${cutoff}`,
    select: "DOI,title,abstract,URL,published-online,published-print,publisher,container-title",
    rows: "12",
    sort: "published",
    order: "desc",
  });
  const response = await fetch(`https://api.crossref.org/works?${params}`, {
    headers: { "user-agent": "MoaKnowledge/1.0 (personal research discovery)" },
  });
  if (!response.ok) throw new Error(`Crossref ${response.status}`);
  const data = await response.json() as { message?: { items?: Array<Record<string, unknown>> } };
  return (data.message?.items || []).map((item) => {
    const title = Array.isArray(item.title) ? String(item.title[0] || "") : "";
    const container = Array.isArray(item["container-title"]) ? String(item["container-title"][0] || "") : "";
    const publisher = String(item.publisher || "");
    const abstract = clean(String(item.abstract || ""));
    const dateParts = ((item["published-online"] || item["published-print"]) as { "date-parts"?: number[][] } | undefined)?.["date-parts"]?.[0];
    const publishedAt = dateParts?.length ? new Date(Date.UTC(dateParts[0], (dateParts[1] || 1) - 1, dateParts[2] || 1)).toISOString() : null;
    const doi = String(item.DOI || "");
    return {
      title: clean(title),
      url: doi ? `https://doi.org/${doi}` : String(item.URL || ""),
      summary: clean([abstract, container, publisher].filter(Boolean).join(" · ")),
      publishedAt,
    };
  }).filter((item) => item.title && /^https?:\/\//i.test(item.url));
}

async function searchArxiv(query: string): Promise<SearchResult[]> {
  const terms = query.split(/\s+/).filter((term) => term.length > 2).slice(0, 6);
  const searchQuery = terms.map((term) => `all:\"${term.replace(/\"/g, "")}\"`).join(" OR ");
  const params = new URLSearchParams({ search_query: searchQuery, start: "0", max_results: "12", sortBy: "submittedDate", sortOrder: "descending" });
  const response = await fetch(`https://export.arxiv.org/api/query?${params}`, {
    headers: { "user-agent": "MoaKnowledge/1.0" },
  });
  if (!response.ok) throw new Error(`arXiv ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => ({
    title: atomTag(match[1], "title"),
    url: atomTag(match[1], "id"),
    summary: atomTag(match[1], "summary"),
    publishedAt: atomTag(match[1], "published") || null,
  })).filter((item) => item.title && /^https?:\/\//i.test(item.url));
}

export async function collectResearchSearchResults(interestTerms: string[]) {
  const focus = [...new Set(["AI accelerator", "NPU", "AI semiconductor", ...interestTerms])].slice(0, 6).join(" ");
  const settled = await Promise.allSettled([searchCrossref(focus), searchArxiv(focus)]);
  const results = settled.flatMap((item) => item.status === "fulfilled" ? item.value : []);
  const urls = new Set<string>();
  return results.filter((item) => {
    const key = item.url.replace(/[?#].*$/, "").toLowerCase();
    if (urls.has(key)) return false;
    urls.add(key);
    return true;
  });
}
