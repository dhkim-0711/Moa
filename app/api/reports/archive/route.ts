import { NextRequest, NextResponse } from "next/server";

const REPOSITORY = "dhkim-0711/Moa";
const BRANCH = "main";

type GitHubContent = {
  name: string;
  type: "file" | "dir";
};

type ReportPeriod = "day" | "week" | "month";

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

export async function GET(request: NextRequest) {
  const periodParam = request.nextUrl.searchParams.get("period");
  if (!validPeriod(periodParam)) {
    return NextResponse.json({ error: "period는 day, week 또는 month여야 합니다." }, { status: 400 });
  }

  const filename = request.nextUrl.searchParams.get("file");
  const directory = reportDirectory(periodParam);

  if (filename) {
    if (!/^[0-9A-Za-z가-힣._-]+\.md$/.test(filename)) {
      return NextResponse.json({ error: "올바르지 않은 파일명입니다." }, { status: 400 });
    }
    const rawUrl = `https://raw.githubusercontent.com/${REPOSITORY}/${BRANCH}/${directory}/${encodeURIComponent(filename)}`;
    const response = await fetch(rawUrl, { headers: { "user-agent": "moa-report-archive" }, cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "보고서를 찾지 못했습니다." }, { status: response.status });
    const content = sanitizeReportContent(await response.text());
    const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() || titleFromFilename(filename, periodParam);
    return NextResponse.json({ report: { id: `${periodParam}:${filename}`, period: periodParam, periodLabel: periodLabel(periodParam), title, publishedAt: filename.match(/\d{4}-\d{2}(?:-\d{2})?/)?.[0] || "", filename, content } });
  }

  const apiUrl = `https://api.github.com/repos/${REPOSITORY}/contents/${directory}?ref=${BRANCH}`;
  const response = await fetch(apiUrl, { headers: { accept: "application/vnd.github+json", "user-agent": "moa-report-archive" }, cache: "no-store" });
  if (response.status === 404) return NextResponse.json({ reports: [] });
  if (!response.ok) return NextResponse.json({ error: "보고서 목록을 불러오지 못했습니다." }, { status: response.status });

  const rows = await response.json() as GitHubContent[];
  const reports = rows
    .filter((row) => row.type === "file" && row.name.toLowerCase().endsWith(".md") && !row.name.toLowerCase().startsWith("readme"))
    .map((row) => ({ id: `${periodParam}:${row.name}`, period: periodParam, periodLabel: periodLabel(periodParam), title: titleFromFilename(row.name, periodParam), publishedAt: row.name.match(/\d{4}-\d{2}(?:-\d{2})?/)?.[0] || "", filename: row.name, content: "" }))
    .sort((a, b) => b.filename.localeCompare(a.filename, "ko"));
  return NextResponse.json({ reports });
}
