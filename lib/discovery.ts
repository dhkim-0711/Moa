export type SearchResult = {
  title: string;
  url: string;
  summary: string;
  publishedAt: string | null;
};

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

export function relevanceScore(query: string, title: string, summary: string) {
  const words = query.toLocaleLowerCase("ko").split(/\s+/).filter((word) => word.length > 1);
  const normalizedTitle = title.toLocaleLowerCase("ko");
  const normalizedSummary = summary.toLocaleLowerCase("ko");
  const titleMatches = words.filter((word) => normalizedTitle.includes(word)).length;
  const summaryMatches = words.filter((word) => normalizedSummary.includes(word)).length;
  return Math.min(99, 55 + titleMatches * 15 + summaryMatches * 5);
}

export function readableText(html: string) {
  return decode(html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6])[^>]*>/gi, "\n"));
}
