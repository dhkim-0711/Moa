"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

type Source = {
  id: number;
  title: string;
  kind: string;
  url?: string | null;
  excerpt?: string | null;
  content?: string | null;
  createdAt: string;
};

type DiscoveryTopic = { id: number; query: string; lastRunAt?: string | null };
type DiscoveryCandidate = { id: number; query: string; title: string; url: string; summary?: string | null; host?: string | null; relevance: number; publishedAt?: string | null };
type WeeklyDiscovery = { discovered: number; saved: number; dismissed: number; topTopic?: string | null };
type ReportItem = Source & { summary: string; metrics: string[] };
type TrendReport = {
  period: "week" | "month";
  periodLabel: string;
  generatedAt: string;
  overview: string;
  overviewBullets: string[];
  sectionSummaries: { technology: string; market: string; company: string };
  total: number;
  allMetrics: string[];
  sections: { technology: ReportItem[]; market: ReportItem[]; company: ReportItem[] };
  markdown: string;
};
type UnifiedSearchResult = {
  id: string;
  sourceId?: number;
  origin: "MOA" | "DAILY_DESK";
  title: string;
  text: string;
  url: string;
  kind: string;
  source: string;
  publishedAt?: string | null;
};

const seedSources: Source[] = [
  { id: -1, title: "2026 제품 전략 리서치.pdf", kind: "PDF", excerpt: "고객 인터뷰와 시장 진입 전략 정리", createdAt: "오늘" },
  { id: -2, title: "경쟁 서비스 벤치마크", kind: "WEB", excerpt: "기능·가격·포지셔닝 비교", createdAt: "어제" },
  { id: -3, title: "아이디어 메모 — 온보딩", kind: "MEMO", excerpt: "첫 5분 안에 가치 경험 제공", createdAt: "7월 25일" },
];

const DOCUMENT_KINDS = [
  "PDF", "DOCX", "HWPX", "XLSX", "XLS", "XLSM", "ODS",
  "PPTX", "ODT", "RTF", "TXT", "MD", "CSV", "JSON", "HTML", "HTM", "XML", "FILE",
];

function sourceKindLabel(kind: string) {
  return kind === "AUTO_WEB" ? "자동수집" : kind;
}

function matchingSnippets(source: Source, query: string) {
  const text = source.content || source.excerpt || source.title;
  const needle = query.trim().toLocaleLowerCase("ko");
  if (!needle) return [];
  const normalized = text.toLocaleLowerCase("ko");
  const snippets: string[] = [];
  let cursor = 0;
  while (snippets.length < 6) {
    const index = normalized.indexOf(needle, cursor);
    if (index < 0) break;
    const start = Math.max(0, index - 110);
    const end = Math.min(text.length, index + needle.length + 150);
    snippets.push(`${start > 0 ? "…" : ""}${text.slice(start, end).replace(/\s+/g, " ").trim()}${end < text.length ? "…" : ""}`);
    cursor = index + needle.length;
  }
  return snippets.length ? snippets : [source.excerpt || source.title];
}

function highlighted(text: string, query: string): ReactNode[] {
  const needle = query.trim();
  if (!needle) return [text];
  const result: ReactNode[] = [];
  const normalized = text.toLocaleLowerCase("ko");
  const target = needle.toLocaleLowerCase("ko");
  let cursor = 0;
  let index = normalized.indexOf(target);
  while (index >= 0) {
    result.push(text.slice(cursor, index));
    result.push(<mark key={`${index}-${cursor}`}>{text.slice(index, index + needle.length)}</mark>);
    cursor = index + needle.length;
    index = normalized.indexOf(target, cursor);
  }
  result.push(text.slice(cursor));
  return result;
}

export default function Home() {
  const [authState, setAuthState] = useState<"checking" | "locked" | "ready">("checking");
  const [accessCode, setAccessCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [filterKind, setFilterKind] = useState<"ALL" | "DOCUMENT" | "WEB" | "AUTO_WEB" | "MEMO">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [unifiedResults, setUnifiedResults] = useState<UnifiedSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPreview, setSearchPreview] = useState<Source | null>(null);
  const [helpTab, setHelpTab] = useState<"chatgpt" | "mcp">("mcp");
  const [view, setView] = useState<"library" | "discovery" | "report">("library");
  const [topics, setTopics] = useState<DiscoveryTopic[]>([]);
  const [candidates, setCandidates] = useState<DiscoveryCandidate[]>([]);
  const [weekly, setWeekly] = useState<WeeklyDiscovery>({ discovered: 0, saved: 0, dismissed: 0 });
  const [newTopic, setNewTopic] = useState("");
  const [discoveryLoading, setDiscoveryLoading] = useState(false);
  const [discoveryMessage, setDiscoveryMessage] = useState("");
  const [reportPeriod, setReportPeriod] = useState<"week" | "month">("week");
  const [trendReport, setTrendReport] = useState<TrendReport | null>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [sources, setSources] = useState<Source[]>(seedSources);
  const [modal, setModal] = useState<"link" | "memo" | "file" | "help" | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/session")
      .then((response) => response.json())
      .then((session) => {
        if (!session.authenticated) return setAuthState("locked");
        setAuthState("ready");
        return fetch("/api/sources")
          .then((r) => r.ok ? r.json() : Promise.reject())
          .then((data) => data.sources?.length ? setSources(data.sources) : setSources([]));
      })
      .catch(() => setAuthState("locked"));
  }, []);

  useEffect(() => {
    if (authState !== "ready") return;
    fetch("/api/discovery/run", { method: "POST" })
      .then((response) => response.json())
      .then((data) => data.autoSaved > 0 && fetch("/api/sources")
        .then((response) => response.json())
        .then((result) => setSources(result.sources || [])))
      .catch(() => {});
  }, [authState]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (authState !== "ready" || query.length < 2) {
      setUnifiedResults([]);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((response) => response.json())
        .then((data) => setUnifiedResults(data.results || []))
        .catch(() => {})
        .finally(() => setSearchLoading(false));
    }, 300);
    return () => { window.clearTimeout(timer); controller.abort(); };
  }, [authState, searchQuery]);

  async function loadDiscovery() {
    const [topicData, candidateData] = await Promise.all([
      fetch("/api/discovery/topics").then((response) => response.json()),
      fetch("/api/discovery/candidates").then((response) => response.json()),
    ]);
    setTopics(topicData.topics || []);
    setCandidates(candidateData.candidates || []);
    setWeekly(candidateData.weekly || { discovered: 0, saved: 0, dismissed: 0 });
  }

  async function openDiscovery() {
    setView("discovery");
    setDiscoveryLoading(true);
    try { await loadDiscovery(); } finally { setDiscoveryLoading(false); }
  }

  async function addTopic(event: FormEvent) {
    event.preventDefault();
    if (!newTopic.trim()) return;
    const response = await fetch("/api/discovery/topics", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: newTopic }) });
    const data = await response.json();
    if (!response.ok) return setDiscoveryMessage(data.error || "주제를 추가하지 못했습니다.");
    setNewTopic("");
    setDiscoveryMessage("관심 주제를 추가했습니다. 지금 검색을 눌러 첫 자료를 찾아보세요.");
    await loadDiscovery();
  }

  async function removeTopic(id: number) {
    await fetch("/api/discovery/topics", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
    await loadDiscovery();
  }

  async function runDiscovery() {
    setDiscoveryLoading(true);
    setDiscoveryMessage("웹 전체에서 새로운 자료를 찾고 있습니다…");
    try {
      const response = await fetch("/api/discovery/run?force=1", { method: "POST" });
      const data = await response.json();
      setDiscoveryMessage(data.errors?.length
        ? `일부 검색에 실패했습니다: ${data.errors.join(", ")}`
        : `${data.added || 0}개의 후보를 찾고, ${data.autoSaved || 0}개를 자료함에 자동 저장했습니다.`);
      if (data.autoSaved > 0) {
        const sourceData = await fetch("/api/sources").then((result) => result.json());
        setSources(sourceData.sources || []);
      }
      await loadDiscovery();
    } finally { setDiscoveryLoading(false); }
  }

  async function handleCandidate(candidate: DiscoveryCandidate, action: "save" | "dismiss" | "block") {
    const response = await fetch("/api/discovery/candidates", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: candidate.id, action }) });
    const data = await response.json();
    if (data.source) setSources((items) => [data.source, ...items]);
    setDiscoveryMessage(action === "save" ? "정식 자료함에 저장했습니다." : action === "block" ? `${candidate.host || "이 출처"}를 차단했습니다.` : "관심 없음으로 처리했습니다.");
    await loadDiscovery();
  }

  async function loadTrendReport(period: "week" | "month") {
    setReportLoading(true);
    setReportMessage("");
    try {
      const response = await fetch(`/api/reports/trends?period=${period}`);
      const data = await response.json();
      setTrendReport(data.report || null);
    } catch {
      setReportMessage("보고서를 작성하지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally { setReportLoading(false); }
  }

  async function openTrendReport() {
    setView("report");
    await loadTrendReport(reportPeriod);
  }

  async function changeReportPeriod(period: "week" | "month") {
    setReportPeriod(period);
    await loadTrendReport(period);
  }

  async function copyReport() {
    if (!trendReport) return;
    await navigator.clipboard.writeText(trendReport.markdown);
    setReportMessage("보고서를 클립보드에 복사했습니다.");
  }

  function downloadReport() {
    if (!trendReport) return;
    const blob = new Blob([trendReport.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `모아_AI-NPU_${trendReport.periodLabel}_동향보고서.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function unlock(event: FormEvent) {
    event.preventDefault();
    setLoginError("");
    const response = await fetch("/api/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code: accessCode }),
    });
    if (!response.ok) {
      setLoginError("비밀번호가 올바르지 않습니다.");
      return;
    }
    setAuthState("ready");
    const data = await fetch("/api/sources").then((result) => result.json());
    setSources(data.sources || []);
  }

  const counts = useMemo(() => ({
    all: sources.length,
    documents: sources.filter((s) => DOCUMENT_KINDS.includes(s.kind)).length,
    web: sources.filter((s) => s.kind === "WEB").length,
    automatic: sources.filter((s) => s.kind === "AUTO_WEB").length,
    memo: sources.filter((s) => s.kind === "MEMO").length,
  }), [sources]);
  const visibleSources = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase("ko");
    return sources.filter((source) => {
      const matchesKind = filterKind === "ALL"
        || (filterKind === "DOCUMENT" && DOCUMENT_KINDS.includes(source.kind))
        || source.kind === filterKind;
      if (!matchesKind) return false;
      if (!normalizedQuery) return true;
      return [source.title, source.excerpt, source.content, source.kind]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase("ko").includes(normalizedQuery));
    });
  }, [sources, filterKind, searchQuery]);

  async function saveSource(event: FormEvent) {
    event.preventDefault();
    if (modal === "link") {
      const optimistic: Source = { id: Date.now(), title: title || content, kind: "WEB", url: content, excerpt: "웹페이지 내용을 가져오는 중…", createdAt: "방금 전" };
      setSources((items) => [optimistic, ...items]);
      setModal(null); setTitle(""); setContent("");
      try {
        const response = await fetch("/api/web-import", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title, url: content }) });
        if (!response.ok) throw new Error();
        const data = await response.json();
        setSources((items) => items.map((item) => item.id === optimistic.id ? data.source : item));
      } catch {
        setSources((items) => items.map((item) => item.id === optimistic.id ? { ...item, excerpt: "가져오기 실패 — 해당 사이트가 자동 수집을 막고 있을 수 있어요." } : item));
      }
      return;
    }
    const payload = { title: title || (modal === "link" ? content : "새 자료"), kind: modal === "link" ? "WEB" : "MEMO", url: modal === "link" ? content : null, excerpt: modal === "memo" ? content : "웹페이지 분석 대기 중" };
    const optimistic: Source = { id: Date.now(), ...payload, createdAt: "방금 전" };
    setSources((items) => [optimistic, ...items]);
    setModal(null); setTitle(""); setContent("");
    fetch("/api/sources", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setSources((items) => items.map((item) => item.id === optimistic.id ? data.source : item)))
      .catch(() => {});
  }

  async function extractFileText(file: File) {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (["txt", "md", "csv", "json"].includes(extension || "")) return file.text();
    if (["html", "htm", "xml"].includes(extension || "")) {
      const raw = await file.text();
      return new DOMParser().parseFromString(raw, extension === "xml" ? "text/xml" : "text/html").documentElement.textContent || "";
    }
    if (extension === "rtf") {
      return (await file.text())
        .replace(/\\par[d]?/g, "\n")
        .replace(/\\'[0-9a-fA-F]{2}/g, " ")
        .replace(/\\[a-zA-Z]+-?\d* ?/g, "")
        .replace(/[{}]/g, "")
        .trim();
    }
    if (extension === "docx") {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
      return result.value;
    }
    if (["xlsx", "xls", "xlsm", "ods"].includes(extension || "")) {
      const XLSX = await import("xlsx");
      const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
      return workbook.SheetNames.map((sheetName) => {
        const rows = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName], { blankrows: false });
        return `[시트: ${sheetName}]\n${rows}`;
      }).join("\n\n");
    }
    if (extension === "pptx") {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(file);
      const slideNames = Object.keys(zip.files)
        .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
        .sort((a, b) => Number(a.match(/\d+/)?.[0]) - Number(b.match(/\d+/)?.[0]));
      const slides = await Promise.all(slideNames.map(async (name, index) => {
        const xml = await zip.file(name)?.async("text") || "";
        const document = new DOMParser().parseFromString(xml, "text/xml");
        const text = [...document.getElementsByTagNameNS("*", "t")].map((node) => node.textContent || "").join(" ");
        return `[슬라이드 ${index + 1}]\n${text}`;
      }));
      return slides.join("\n\n");
    }
    if (extension === "odt") {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(file);
      const xml = await zip.file("content.xml")?.async("text") || "";
      return new DOMParser().parseFromString(xml, "text/xml").documentElement.textContent || "";
    }
    if (extension === "hwpx") {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(file);
      const sectionNames = Object.keys(zip.files).filter((name) => /^Contents\/section\d+\.xml$/i.test(name)).sort();
      const sections = await Promise.all(sectionNames.map((name) => zip.file(name)?.async("text") || ""));
      return sections.map((xml) => new DOMParser().parseFromString(xml, "text/xml").documentElement.textContent || "").join("\n\n");
    }
    if (extension === "pdf") {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data }).promise;
      const pages: string[] = [];
      let extractedCharacters = 0;
      for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
        const page = await pdf.getPage(pageNo);
        const text = await page.getTextContent();
        const pageText = text.items.map((item) => "str" in item ? item.str : "").join(" ");
        extractedCharacters += pageText.trim().length;
        pages.push(`[${pageNo}페이지]\n${pageText}`);
      }
      if (extractedCharacters === 0) throw new Error("PDF_TEXT_EMPTY");
      return pages.join("\n\n");
    }
    return "";
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const added = [...files].map((file, index) => ({
      id: Date.now() + index,
      title: file.name,
      kind: file.name.split(".").pop()?.toUpperCase() || "FILE",
      excerpt: `${(file.size / 1024 / 1024).toFixed(1)}MB · 내용 분석 준비됨`,
      createdAt: "방금 전",
    }));
    setSources((items) => [...added, ...items]);
    setModal(null);
    for (const file of [...files]) {
      const form = new FormData();
      form.append("file", file);
      let extracted = "";
      try {
        extracted = await extractFileText(file);
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        const reason = /password/i.test(message)
          ? "암호가 설정된 PDF라 내용을 읽을 수 없습니다."
          : message === "PDF_TEXT_EMPTY"
            ? "글자 레이어가 없는 스캔 PDF입니다. OCR 기능이 필요합니다."
            : /invalid|format|corrupt/i.test(message)
              ? "PDF 형식이 올바르지 않거나 파일이 손상되었습니다."
              : `내용 추출에 실패했습니다${message ? `: ${message}` : "."}`;
        setSources((items) => items.map((item) => item.title === file.name ? { ...item, excerpt: reason } : item));
        continue;
      }
      form.append("content", extracted);
      try {
        const response = await fetch("/api/upload", { method: "POST", body: form });
        if (!response.ok) {
          const detail = await response.json().catch(() => ({})) as { error?: string };
          throw new Error(detail.error || `서버 응답 ${response.status}`);
        }
        const data = await response.json();
        setSources((items) => items.map((item) => item.title === file.name && item.id > 0 ? { ...data.source, excerpt: extracted ? extracted.slice(0, 100) : "텍스트 추출이 지원되지 않는 파일입니다." } : item));
      } catch (error) {
        const detail = error instanceof Error ? error.message : "";
        setSources((items) => items.map((item) => item.title === file.name ? { ...item, excerpt: `파일 저장에 실패했습니다${detail ? `: ${detail}` : "."}` } : item));
      }
    }
  }

  async function logout() {
    await fetch("/api/session", { method: "DELETE" });
    setAuthState("locked");
    setAccessCode("");
  }

  function openLibraryHome() {
    setView("library");
    setSearchQuery("");
    setFilterKind("ALL");
    setShowAll(true);
    setSearchPreview(null);
    setModal(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteSource(source: Source) {
    if (source.id < 0) {
      setSources((items) => items.filter((item) => item.id !== source.id));
      return;
    }
    if (!window.confirm(`“${source.title}” 자료를 삭제할까요?\n삭제한 자료는 복구할 수 없습니다.`)) return;
    const response = await fetch(`/api/source/${source.id}`, { method: "DELETE" });
    if (!response.ok) {
      window.alert("자료를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    setSources((items) => items.filter((item) => item.id !== source.id));
  }

  if (authState !== "ready") {
    return <main className="lock-screen">
      <section className="lock-card">
        <div className="brand lock-brand"><span className="brand-mark">M</span><span>모아</span></div>
        {authState === "checking" ? <><div className="lock-spinner" /><p>개인 공간을 확인하고 있어요.</p></> :
          <form onSubmit={unlock}>
            <span className="eyebrow">PRIVATE KNOWLEDGE SPACE</span>
            <h1>나의 지식 작업실</h1>
            <p>저장한 자료를 보호하기 위해 개인 비밀번호가 필요합니다.</p>
            <label>비밀번호<input type="password" autoFocus value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder="모아 비밀번호" /></label>
            {loginError && <small className="login-error">{loginError}</small>}
            <button type="submit">개인 공간 열기</button>
          </form>}
      </section>
    </main>;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">M</span><span>모아</span></div>
        <button className="new-button" onClick={() => setModal("file")}><span>＋</span> 새 자료 추가</button>
        <nav>
          <button className={view === "library" ? "active" : ""} onClick={openLibraryHome}><span>▦</span> 자료함 <b>{counts.all}</b></button>
          <button className={view === "discovery" ? "active" : ""} onClick={openDiscovery}><span>✦</span> 자동 수집함 <b>{candidates.length || ""}</b></button>
          <button className={view === "report" ? "active" : ""} onClick={openTrendReport}><span>▤</span> 동향 보고서</button>
          <button onClick={() => setModal("help")}><span>⌁</span> ChatGPT 연결 방법</button>
        </nav>
        <div className="side-label">자료 유형</div>
        <div className="filters">
          <button className={filterKind === "DOCUMENT" ? "selected" : ""} onClick={() => { setFilterKind("DOCUMENT"); setShowAll(true); }}>문서 <b>{counts.documents}</b></button>
          <button className={filterKind === "WEB" ? "selected" : ""} onClick={() => { setFilterKind("WEB"); setShowAll(true); }}>웹페이지 <b>{counts.web}</b></button>
          <button className={filterKind === "AUTO_WEB" ? "selected" : ""} onClick={() => { setFilterKind("AUTO_WEB"); setShowAll(true); }}>자동수집 <b>{counts.automatic}</b></button>
          <button className={filterKind === "MEMO" ? "selected" : ""} onClick={() => { setFilterKind("MEMO"); setShowAll(true); }}>메모 <b>{counts.memo}</b></button>
        </div>
        <div className="sidebar-foot"><span className="avatar">나</span><div><strong>나의 지식 공간</strong><small>개인 전용</small></div><button onClick={logout} aria-label="로그아웃">나가기</button></div>
      </aside>

      <section className="workspace">
        <header><div><h1>{view === "library" ? "내 자료함" : view === "discovery" ? "자동 수집함" : "동향 보고서"}</h1><p>{view === "library" ? "ChatGPT가 활용할 PDF, 워드, 엑셀, PPT, HWPX와 메모를 저장하고 관리하세요." : view === "discovery" ? "관심 주제를 바탕으로 무료 웹 검색에서 새로운 자료 후보를 모읍니다." : "자동수집 자료를 기술·시장·기업별로 정리한 근거 중심 보고서입니다."}</p></div><button className="help" onClick={() => setModal("help")} aria-label="사용 방법">?</button></header>

        {view === "library" ? <>
          <section className="hero-card">
            <div><span className="eyebrow">PERSONAL KNOWLEDGE BASE</span><h2>생각의 재료를<br/><em>한곳에 모으세요.</em></h2><p>PDF, 워드, 엑셀, PPT, HWPX까지. 모아가 읽고 연결해<br/>당신의 다음 기획과 보고서를 돕습니다.</p></div>
            <div className="orb"><span>PDF</span><span>WORD</span><span>EXCEL</span><span>PPT</span><i>✦</i></div>
          </section>
          <section className="quick-add">
            <button onClick={() => setModal("file")}><i className="coral">↑</i><span><strong>파일 올리기</strong><small>PDF, 워드, 엑셀, PPT, HWPX</small></span><b>›</b></button>
            <button onClick={() => setModal("link")}><i className="mint">⌁</i><span><strong>웹페이지 저장</strong><small>링크를 붙여넣어 저장</small></span><b>›</b></button>
            <button onClick={() => setModal("memo")}><i className="violet">✎</i><span><strong>메모 남기기</strong><small>떠오른 생각을 바로 기록</small></span><b>›</b></button>
          </section>
          <div className="library-search"><span>⌕</span><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="모아와 Daily Desk에서 함께 검색" aria-label="통합 자료 검색" />{searchQuery && <button onClick={() => setSearchQuery("")} aria-label="검색어 지우기">×</button>}</div>
          <div className="section-title"><div><h3>{searchQuery ? "통합 검색 결과" : filterKind !== "ALL" ? `${filterKind === "DOCUMENT" ? "문서" : filterKind === "WEB" ? "웹페이지" : filterKind === "AUTO_WEB" ? "자동수집" : "메모"} 자료` : showAll ? "전체 자료" : "최근 자료"}</h3><span>{searchQuery ? `${unifiedResults.length}개 · 모아 + Daily Desk` : `${visibleSources.length}개의 자료`}</span></div><button onClick={() => { if (searchQuery) setSearchQuery(""); else if (filterKind !== "ALL") setFilterKind("ALL"); else setShowAll((value) => !value); }}>{searchQuery ? "검색 지우기" : filterKind !== "ALL" ? "필터 해제" : showAll ? "최근 자료만 보기" : "전체 보기 →"}</button></div>
          {searchQuery ? <section className="unified-search-results">
            {unifiedResults.map((result) => <a href={result.origin === "MOA" && result.sourceId ? `/source/${result.sourceId}` : result.url} target="_blank" rel="noreferrer" key={result.id}><div className={`search-origin ${result.origin.toLowerCase()}`}>{result.origin === "MOA" ? "모아" : "Daily Desk"}</div><div><span>{result.kind} · {result.source}</span><h4>{result.title}</h4><p>{result.text}</p></div><b>↗</b></a>)}
            {searchLoading && <div className="searching-both">모아와 Daily Desk를 검색하고 있습니다…</div>}
            {!searchLoading && unifiedResults.length === 0 && <div className="empty-search"><span>⌕</span><strong>일치하는 자료가 없습니다.</strong><small>다른 검색어를 사용해보세요.</small></div>}
          </section> : <section className="source-grid">
            {(showAll || filterKind !== "ALL" ? visibleSources : visibleSources.slice(0, 6)).map((source) => <article className={source.id > 0 ? "openable" : ""} key={source.id} onClick={() => { if (source.id > 0) window.open(`/source/${source.id}`, "_blank", "noopener,noreferrer"); }}><div className={`file-icon ${source.kind.toLowerCase()}`}>{source.kind === "WEB" || source.kind === "AUTO_WEB" ? "⌁" : source.kind === "MEMO" ? "✎" : "▤"}</div><span className="kind">{sourceKindLabel(source.kind)}</span><h4>{source.title}</h4><p>{source.excerpt}</p><footer><span>{source.createdAt}</span><button className="delete-source" onClick={(event) => { event.stopPropagation(); deleteSource(source); }} aria-label={`${source.title} 삭제`}>삭제</button></footer></article>)}
            {visibleSources.length === 0 && <div className="empty-search"><span>⌕</span><strong>자료가 없습니다.</strong><small>다른 자료 유형을 사용해보세요.</small></div>}
          </section>}
        </> : view === "discovery" ? <section className="discovery-workspace">
          <section className="discovery-intro"><div><span className="eyebrow">ZERO-COST DISCOVERY</span><h2>찾으러 다니지 않아도<br/><em>관심 자료가 모이도록.</em></h2><p>자료함의 내용을 기준으로 AI·NPU 시장, 기술, 기업 동향을 탐색합니다. 관련도 90점 이상이며 원문 추출에 성공한 자료는 자동 저장하고, 70점 이상 후보는 이곳에서 검토할 수 있습니다.</p></div><button onClick={runDiscovery} disabled={discoveryLoading}>{discoveryLoading ? "검색 중…" : "지금 새 자료 찾기"}</button></section>
          <section className="topic-panel"><div><h3>관심 주제</h3><span>최대 10개를 구체적으로 적을수록 결과가 좋아집니다.</span></div><form onSubmit={addTopic}><input value={newTopic} onChange={(event) => setNewTopic(event.target.value)} maxLength={60} placeholder="예: AI 반도체 실증 지원사업" disabled={topics.length >= 10}/><button disabled={topics.length >= 10}>추가</button></form><div className="topic-chips">{topics.map((topic) => <span key={topic.id}>{topic.query}<button onClick={() => removeTopic(topic.id)} aria-label={`${topic.query} 삭제`}>×</button></span>)}{topics.length === 0 && <small>등록된 관심 주제가 없습니다.</small>}</div></section>
          <section className="weekly-report"><div><small>최근 7일 발견</small><strong>{weekly.discovered}</strong></div><div><small>자료함에 저장</small><strong>{weekly.saved}</strong></div><div><small>제외·차단</small><strong>{weekly.dismissed}</strong></div><div><small>가장 활발한 주제</small><strong>{weekly.topTopic || "—"}</strong></div></section>
          {discoveryMessage && <div className="discovery-message">{discoveryMessage}</div>}
          <div className="section-title"><div><h3>수집 후보</h3><span>{candidates.length}개의 자료</span></div><small>검토 후 정식 자료함에 저장하세요.</small></div>
          <section className="candidate-list">{candidates.map((candidate) => <article key={candidate.id}><div className="candidate-score"><strong>{candidate.relevance}</strong><small>관련도</small></div><div className="candidate-copy"><span>{candidate.query} · {candidate.host}</span><h4><a href={candidate.url} target="_blank" rel="noreferrer">{candidate.title}</a></h4><p>{candidate.summary || "검색 결과에 요약이 없습니다."}</p></div><div className="candidate-actions"><button className="save-candidate" onClick={() => handleCandidate(candidate, "save")}>자료함에 저장</button><button onClick={() => handleCandidate(candidate, "dismiss")}>관심 없음</button><button onClick={() => handleCandidate(candidate, "block")}>출처 차단</button></div></article>)}{!discoveryLoading && candidates.length === 0 && <div className="empty-search"><span>✦</span><strong>아직 수집된 후보가 없습니다.</strong><small>관심 주제를 추가하고 새 자료 찾기를 실행해보세요.</small></div>}</section>
          <p className="free-search-note">무료 공개 검색 피드 기반이라 결과 범위와 안정성이 달라질 수 있습니다. 개인·비영리 용도로만 사용하세요.</p>
        </section> : <section className="trend-report-workspace">
          <section className="report-toolbar">
            <div className="period-tabs"><button className={reportPeriod === "week" ? "selected" : ""} onClick={() => changeReportPeriod("week")}>주간</button><button className={reportPeriod === "month" ? "selected" : ""} onClick={() => changeReportPeriod("month")}>월간</button></div>
            <div className="report-actions"><button onClick={() => loadTrendReport(reportPeriod)} disabled={reportLoading}>{reportLoading ? "작성 중…" : "새로 작성"}</button><button onClick={copyReport} disabled={!trendReport}>복사</button><button className="download-report" onClick={downloadReport} disabled={!trendReport}>Markdown 다운로드</button></div>
          </section>
          {reportMessage && <div className="discovery-message">{reportMessage}</div>}
          {reportLoading && !trendReport ? <div className="report-loading">자동수집 자료를 읽고 보고서를 작성하고 있습니다…</div> : trendReport && <article className="trend-report">
            <div className="report-cover"><span className="eyebrow">MOA TREND BRIEF</span><h2>AI·NPU {trendReport.periodLabel}<br/>동향 보고서</h2><p>{new Date(trendReport.generatedAt).toLocaleString("ko-KR")} 기준 · 자동수집 자료 {trendReport.total}건</p></div>
            <section className="report-summary"><div className="report-heading-number">01</div><div><h3>종합 요약</h3><p>{trendReport.overview}</p><ul>{trendReport.overviewBullets.map((item) => <li key={item}>{item}</li>)}</ul>{trendReport.allMetrics.length > 0 && <div className="summary-metrics">{trendReport.allMetrics.map((metric) => <span key={metric}>{metric}</span>)}</div>}</div></section>
            {(["technology", "market", "company"] as const).map((category) => {
              const label = category === "technology" ? "기술 동향" : category === "market" ? "시장 동향" : "기업 동향";
              const number = category === "technology" ? "02" : category === "market" ? "03" : "04";
              const items = trendReport.sections[category];
              return <section className="report-section" key={category}><div className="report-section-title"><div className="report-heading-number">{number}</div><div><h3>{label}</h3><p>{trendReport.sectionSummaries[category]}</p></div><span>{items.length}건</span></div>{items.length ? items.map((item) => <article key={item.id}><h4>{item.title}</h4><p>{item.summary}</p>{item.metrics.length > 0 && <div className="item-metrics">핵심 수치 · {item.metrics.join(" · ")}</div>}<a href={item.url || `/source/${item.id}`} target="_blank" rel="noreferrer">출처 원문 보기 ↗</a></article>) : <p className="report-empty">해당 기간에 분류된 자료가 없습니다.</p>}</section>;
            })}
            <footer className="report-note">이 보고서는 모아 자동수집 자료와 Daily Desk 공개 자료의 문장을 추출·분류해 작성했습니다. 원문에 없는 판단이나 전망은 추가하지 않았습니다.</footer>
          </article>}
        </section>}
      </section>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close" onClick={() => setModal(null)}>×</button>
        {modal === "help" ? <div className="connection-guide"><h2>모아 연결 방법</h2><p>먼저 MCP 서버를 연결한 다음 ChatGPT에서 모아를 활성화하세요.</p><div className="guide-tabs" role="tablist"><button className={helpTab === "mcp" ? "selected" : ""} onClick={() => setHelpTab("mcp")} role="tab" aria-selected={helpTab === "mcp"}>1. MCP 연결</button><button className={helpTab === "chatgpt" ? "selected" : ""} onClick={() => setHelpTab("chatgpt")} role="tab" aria-selected={helpTab === "chatgpt"}>2. ChatGPT 연결</button></div>{helpTab === "chatgpt" ? <div className="guide-panel"><div className="help-steps"><span><b>1</b> 모아에 파일·링크·메모를 저장합니다.</span><span><b>2</b> ChatGPT 설정에서 모아 앱 또는 커넥터를 연결합니다.</span><span><b>3</b> 대화에서 연결된 모아를 활성화합니다.</span><span><b>4</b> “모아 자료를 근거로 답해줘”라고 질문합니다.</span></div><small className="guide-note">연결 후에는 자료 검색, 비교, 요약과 기획서·보고서 초안을 요청할 수 있습니다.</small></div> : <div className="guide-panel"><div className="help-steps"><span><b>1</b> 사용하는 AI 도구의 MCP 서버 추가 화면을 엽니다.</span><span><b>2</b> 전송 방식으로 Remote HTTP를 선택합니다.</span><span><b>3</b> 아래 주소 형식과 별도로 발급받은 MCP 토큰을 입력합니다.</span><span><b>4</b> 연결 후 “모아의 최근 자료를 보여줘”라고 확인합니다.</span></div><div className="mcp-endpoint"><small>MCP 서버 주소 형식</small><code>https://moa-knowledge-assistant.ehdkim71.chatgpt.site/api/mcp?token=YOUR_MCP_TOKEN</code></div><small className="guide-note">로그인 비밀번호는 MCP 설정에 입력하지 않습니다. 인증에는 별도의 MCP 토큰을 사용하며, 토큰은 외부에 공유하지 마세요.</small></div>}</div> :
        modal === "file" ? <><h2>파일 올리기</h2><p>PDF, DOCX, XLSX·XLS, PPTX, HWPX 등 여러 파일을 한 번에 추가할 수 있어요.</p><div className="dropzone" onClick={() => fileRef.current?.click()}><span>↑</span><strong>파일을 선택하거나 여기로 끌어오세요</strong><small>지원 형식은 본문·시트·슬라이드의 글자를 추출해 검색할 수 있습니다.</small></div><input ref={fileRef} type="file" multiple hidden onChange={(e) => handleFiles(e.target.files)} /></> :
        <form onSubmit={saveSource}><h2>{modal === "link" ? "웹페이지 저장" : "메모 남기기"}</h2><p>{modal === "link" ? "링크의 내용을 읽고 검색 가능한 자료로 정리합니다." : "아이디어와 관찰을 바로 지식으로 남겨보세요."}</p><label>제목<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="자료의 제목" /></label><label>{modal === "link" ? "웹 주소" : "내용"}{modal === "link" ? <input required value={content} onChange={(e) => setContent(e.target.value)} placeholder="https://..." /> : <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="생각을 자유롭게 적어주세요" />}</label><button className="save" type="submit">저장하기</button></form>}
      </div></div>}
      {searchPreview && <div className="modal-backdrop" onMouseDown={() => setSearchPreview(null)}>
        <div className="modal search-preview" role="dialog" aria-modal="true" aria-label="검색 내용 미리보기" onMouseDown={(event) => event.stopPropagation()}>
          <button className="close" onClick={() => setSearchPreview(null)}>×</button>
          <span className="search-preview-kind">{sourceKindLabel(searchPreview.kind)}</span>
          <h2>{searchPreview.title}</h2>
          <p>‘{searchQuery}’와 관련된 내용만 표시합니다.</p>
          <div className="match-list">
            {matchingSnippets(searchPreview, searchQuery).map((snippet, index) => <div className="match-snippet" key={index}>{highlighted(snippet, searchQuery)}</div>)}
          </div>
          {searchPreview.id > 0 && <button className="open-original" onClick={() => window.open(`/source/${searchPreview.id}`, "_blank", "noopener,noreferrer")}>원문 전체 보기</button>}
        </div>
      </div>}
    </main>
  );
}
