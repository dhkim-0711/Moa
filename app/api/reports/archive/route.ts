import { NextRequest, NextResponse } from "next/server";

const REPOSITORY = "dhkim-0711/Moa";
const BRANCH = "main";

type GitHubContent = {
  name: string;
  type: "file" | "dir";
};

type ReportPeriod = "day" | "week" | "month";
type SearchableReport = { period: ReportPeriod; filename: string; content: string };
type ArchivedReportRecord = { id: string; period: ReportPeriod; periodLabel: string; title: string; publishedAt: string; filename: string; content: string };

let searchCache: { loadedAt: number; reports: SearchableReport[] } | null = null;
const SEARCH_CACHE_MS = 15 * 60 * 1000;
const LIST_CACHE_MS = 60 * 1000;
const CONTENT_CACHE_MS = 2 * 60 * 1000;
const listCache = new Map<ReportPeriod, { loadedAt: number; reports: ArchivedReportRecord[] }>();
const contentCache = new Map<string, { loadedAt: number; report: ArchivedReportRecord }>();

function validPeriod(value: string | null): value is ReportPeriod {
  return value === "day" || value === "week" || value === "month";
}

function reportDirectory(period: ReportPeriod) {
  if (period === "day") return "report/daily";
  return period === "week" ? "report/weekly" : "report/monthly";
}

function periodLabel(period: ReportPeriod) {
  return period === "day" ? "일일동향" : period === "week" ? "주간" : "월간";
}

function titleFromFilename(filename: string, period: ReportPeriod) {
  const stem = filename.replace(/\.md$/i, "").replace(/[-_]/g, " ");
  return `${stem} ${periodLabel(period)} 보고서`;
}

function sanitizeReportContent(content: string) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/\n(?:\/\/\s*\n)?#{1,6}\s*작성\s*기준\s*및\s*유의사항\b[\s\S]*$/i, "")
    .trimEnd();
}

function reportMeta(period: ReportPeriod, filename: string): ArchivedReportRecord {
  return { id: `${period}:${filename}`, period, periodLabel: periodLabel(period), title: titleFromFilename(filename, period), publishedAt: filename.match(/\d{4}-\d{2}(?:-\d{2})?/)?.[0] || "", filename, content: "" };
}

async function listReports(period: ReportPeriod) {
  const cached = listCache.get(period);
  if (cached && Date.now() - cached.loadedAt < LIST_CACHE_MS) return cached.reports;
  const directory = reportDirectory(period);
  const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/contents/${directory}?ref=${BRANCH}`, {
    headers: { accept: "application/vnd.github+json", "user-agent": "moa-report-archive" },
    cache: "no-store",
  });
  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`GitHub list ${response.status}`);
  const rows = await response.json() as GitHubContent[];
  const reports = rows.filter((row) => row.type === "file" && row.name.toLowerCase().endsWith(".md") && !row.name.toLowerCase().startsWith("readme"))
    .map((row) => reportMeta(period, row.name))
    .sort((a, b) => b.filename.localeCompare(a.filename, "ko"));
  listCache.set(period, { loadedAt: Date.now(), reports });
  return reports;
}

async function loadReport(period: ReportPeriod, filename: string) {
  const key = `${period}:${filename}`;
  const cached = contentCache.get(key);
  if (cached && Date.now() - cached.loadedAt < CONTENT_CACHE_MS) return cached.report;
  const rawUrl = `https://raw.githubusercontent.com/${REPOSITORY}/${BRANCH}/${reportDirectory(period)}/${encodeURIComponent(filename)}`;
  const response = await fetch(rawUrl, { headers: { "user-agent": "moa-report-archive" }, cache: "no-store" });
  if (!response.ok) throw new Error(`GitHub report ${response.status}`);
  const content = sanitizeReportContent(await response.text());
  const meta = reportMeta(period, filename);
  const report = { ...meta, title: content.match(/^#\s+(.+)$/m)?.[1]?.trim() || meta.title, content };
  contentCache.set(key, { loadedAt: Date.now(), report });
  return report;
}

async function searchableReports() {
  if (searchCache && Date.now() - searchCache.loadedAt < SEARCH_CACHE_MS) return searchCache.reports;
  const periods: ReportPeriod[] = ["day", "week", "month"];
  const listed = await Promise.all(periods.map(async (period) => (await listReports(period)).map((report) => ({ period, filename: report.filename }))));
  const files = listed.flat().sort((a, b) => b.filename.localeCompare(a.filename, "ko")).slice(0, 250);
  const reports: SearchableReport[] = [];
  for (let index = 0; index < files.length; index += 12) {
    const batch = await Promise.all(files.slice(index, index + 12).map(async (file) => {
      try {
        const report = await loadReport(file.period, file.filename);
        return { ...file, content: report.content };
      } catch { return null; }
    }));
    reports.push(...batch.filter((report): report is SearchableReport => Boolean(report)));
  }
  searchCache = { loadedAt: Date.now(), reports };
  return reports;
}

function matchingExcerpt(content: string, query: string) {
  const plain = content.replace(/[#>*|`_[\]()]/g, " ").replace(/https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim();
  const index = plain.toLocaleLowerCase("ko").indexOf(query.toLocaleLowerCase("ko"));
  const start = Math.max(0, index - 75);
  const end = Math.min(plain.length, index + query.length + 135);
  return `${start > 0 ? "…" : ""}${plain.slice(start, end)}${end < plain.length ? "…" : ""}`;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  if (query) {
    if (query.length < 2) return NextResponse.json({ error: "검색어는 두 글자 이상 입력해주세요." }, { status: 400 });
    try {
      const reports = await searchableReports();
      const normalized = query.toLocaleLowerCase("ko");
      const results = reports.filter((report) => `${report.filename}\n${report.content}`.toLocaleLowerCase("ko").includes(normalized)).slice(0, 30).map((report) => ({
        id: `${report.period}:${report.filename}`,
        period: report.period,
        periodLabel: periodLabel(report.period),
        title: report.content.match(/^#\s+(.+)$/m)?.[1]?.trim() || titleFromFilename(report.filename, report.period),
        publishedAt: report.filename.match(/\d{4}-\d{2}(?:-\d{2})?/)?.[0] || "",
        filename: report.filename,
        content: "",
        excerpt: matchingExcerpt(report.content, query),
      }));
      return NextResponse.json({ results, searched: reports.length });
    } catch {
      return NextResponse.json({ error: "GitHub 보고서 검색에 실패했습니다." }, { status: 502 });
    }
  }
  const periodParam = request.nextUrl.searchParams.get("period");
  if (!validPeriod(periodParam)) {
    return NextResponse.json({ error: "period는 day, week 또는 month여야 합니다." }, { status: 400 });
  }

  const filename = request.nextUrl.searchParams.get("file");

  if (filename) {
    if (!/^[0-9A-Za-z가-힣._-]+\.md$/.test(filename)) {
      return NextResponse.json({ error: "올바르지 않은 파일명입니다." }, { status: 400 });
    }
    try { return NextResponse.json({ report: await loadReport(periodParam, filename) }); }
    catch { return NextResponse.json({ error: "보고서를 찾지 못했습니다." }, { status: 404 }); }
  }

  try {
    const reports = await listReports(periodParam);
    const latest = request.nextUrl.searchParams.get("latest") === "1" && reports[0] ? await loadReport(periodParam, reports[0].filename) : null;
    return NextResponse.json({ reports, latest });
  } catch {
    return NextResponse.json({ error: "보고서 목록을 불러오지 못했습니다." }, { status: 502 });
  }
}
