"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Source = {
  id: number;
  title: string;
  kind: string;
  url?: string | null;
  excerpt?: string | null;
  createdAt: string;
};

const seedSources: Source[] = [
  { id: -1, title: "2026 제품 전략 리서치.pdf", kind: "PDF", excerpt: "고객 인터뷰와 시장 진입 전략 정리", createdAt: "오늘" },
  { id: -2, title: "경쟁 서비스 벤치마크", kind: "WEB", excerpt: "기능·가격·포지셔닝 비교", createdAt: "어제" },
  { id: -3, title: "아이디어 메모 — 온보딩", kind: "MEMO", excerpt: "첫 5분 안에 가치 경험 제공", createdAt: "7월 25일" },
];

export default function Home() {
  const [authState, setAuthState] = useState<"checking" | "locked" | "ready">("checking");
  const [accessCode, setAccessCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [filterKind, setFilterKind] = useState<"ALL" | "DOCUMENT" | "WEB" | "MEMO">("ALL");
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
    documents: sources.filter((s) => ["PDF", "HWPX", "FILE"].includes(s.kind)).length,
    web: sources.filter((s) => s.kind === "WEB").length,
    memo: sources.filter((s) => s.kind === "MEMO").length,
  }), [sources]);
  const visibleSources = useMemo(() => sources.filter((source) => {
    if (filterKind === "ALL") return true;
    if (filterKind === "DOCUMENT") return ["PDF", "HWPX", "FILE", "TXT", "MD", "CSV"].includes(source.kind);
    return source.kind === filterKind;
  }), [sources, filterKind]);

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
    if (extension === "txt" || extension === "md" || extension === "csv") return file.text();
    if (extension === "hwpx") {
      const JSZip = (await import("jszip")).default;
      const zip = await JSZip.loadAsync(file);
      const sectionNames = Object.keys(zip.files).filter((name) => /^Contents\/section\d+\.xml$/i.test(name)).sort();
      const sections = await Promise.all(sectionNames.map((name) => zip.file(name)?.async("text") || ""));
      return sections.map((xml) => new DOMParser().parseFromString(xml, "text/xml").documentElement.textContent || "").join("\n\n");
    }
    if (extension === "pdf") {
      const pdfjs = await import("pdfjs-dist");
      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
      const pages: string[] = [];
      for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
        const page = await pdf.getPage(pageNo);
        const text = await page.getTextContent();
        pages.push(`[${pageNo}페이지]\n${text.items.map((item) => "str" in item ? item.str : "").join(" ")}`);
      }
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
      try {
        const extracted = await extractFileText(file);
        form.append("content", extracted);
        const response = await fetch("/api/upload", { method: "POST", body: form });
        if (!response.ok) throw new Error();
        const data = await response.json();
        setSources((items) => items.map((item) => item.title === file.name && item.id > 0 ? { ...data.source, excerpt: extracted ? extracted.slice(0, 100) : "텍스트 추출이 지원되지 않는 파일입니다." } : item));
      } catch {
        setSources((items) => items.map((item) => item.title === file.name ? { ...item, excerpt: "내용 추출 또는 업로드에 실패했습니다." } : item));
      }
    }
  }

  async function logout() {
    await fetch("/api/session", { method: "DELETE" });
    setAuthState("locked");
    setAccessCode("");
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
          <button className="active"><span>▦</span> 자료함 <b>{counts.all}</b></button>
          <button onClick={() => setModal("help")}><span>⌁</span> ChatGPT 연결 방법</button>
        </nav>
        <div className="side-label">자료 유형</div>
        <div className="filters">
          <button className={filterKind === "DOCUMENT" ? "selected" : ""} onClick={() => { setFilterKind("DOCUMENT"); setShowAll(true); }}>문서 <b>{counts.documents}</b></button>
          <button className={filterKind === "WEB" ? "selected" : ""} onClick={() => { setFilterKind("WEB"); setShowAll(true); }}>웹페이지 <b>{counts.web}</b></button>
          <button className={filterKind === "MEMO" ? "selected" : ""} onClick={() => { setFilterKind("MEMO"); setShowAll(true); }}>메모 <b>{counts.memo}</b></button>
        </div>
        <div className="sidebar-foot"><span className="avatar">나</span><div><strong>나의 지식 공간</strong><small>개인 전용</small></div><button onClick={logout} aria-label="로그아웃">나가기</button></div>
      </aside>

      <section className="workspace">
        <header><div><h1>내 자료함</h1><p>ChatGPT가 활용할 PDF, HWPX, 웹페이지와 메모를 저장하고 관리하세요.</p></div><button className="help" onClick={() => setModal("help")} aria-label="사용 방법">?</button></header>

        <>
          <section className="hero-card">
            <div><span className="eyebrow">PERSONAL KNOWLEDGE BASE</span><h2>생각의 재료를<br/><em>한곳에 모으세요.</em></h2><p>PDF, HWPX, 웹페이지, 메모까지. 모아가 읽고 연결해<br/>당신의 다음 기획과 보고서를 돕습니다.</p></div>
            <div className="orb"><span>PDF</span><span>HWPX</span><span>URL</span><span>MEMO</span><i>✦</i></div>
          </section>
          <section className="quick-add">
            <button onClick={() => setModal("file")}><i className="coral">↑</i><span><strong>파일 올리기</strong><small>PDF, HWPX 및 문서</small></span><b>›</b></button>
            <button onClick={() => setModal("link")}><i className="mint">⌁</i><span><strong>웹페이지 저장</strong><small>링크를 붙여넣어 저장</small></span><b>›</b></button>
            <button onClick={() => setModal("memo")}><i className="violet">✎</i><span><strong>메모 남기기</strong><small>떠오른 생각을 바로 기록</small></span><b>›</b></button>
          </section>
          <div className="section-title"><div><h3>{filterKind !== "ALL" ? `${filterKind === "DOCUMENT" ? "문서" : filterKind === "WEB" ? "웹페이지" : "메모"} 자료` : showAll ? "전체 자료" : "최근 자료"}</h3><span>{visibleSources.length}개의 자료</span></div><button onClick={() => { if (filterKind !== "ALL") setFilterKind("ALL"); else setShowAll((value) => !value); }}>{filterKind !== "ALL" ? "필터 해제" : showAll ? "최근 자료만 보기" : "전체 보기 →"}</button></div>
          <section className="source-grid">
            {(showAll || filterKind !== "ALL" ? visibleSources : visibleSources.slice(0, 6)).map((source) => <article className={source.id > 0 ? "openable" : ""} key={source.id} onClick={() => source.id > 0 && window.open(`/source/${source.id}`, "_blank", "noopener,noreferrer")}><div className={`file-icon ${source.kind.toLowerCase()}`}>{source.kind === "WEB" ? "⌁" : source.kind === "MEMO" ? "✎" : "▤"}</div><span className="kind">{source.kind}</span><h4>{source.title}</h4><p>{source.excerpt}</p><footer><span>{source.createdAt}</span><button className="delete-source" onClick={(event) => { event.stopPropagation(); deleteSource(source); }} aria-label={`${source.title} 삭제`}>삭제</button></footer></article>)}
          </section>
        </>
      </section>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close" onClick={() => setModal(null)}>×</button>
        {modal === "help" ? <><h2>모아 사용 방법</h2><p>모아는 자료를 보관하고 ChatGPT에 제공하는 개인 자료함입니다. 질문과 문서 작성은 ChatGPT에서 진행하세요.</p><div className="help-steps"><span><b>1</b> 파일·링크·메모를 자료함에 저장</span><span><b>2</b> 자료 카드를 눌러 추출된 원문 확인</span><span><b>3</b> ChatGPT에서 모아 앱을 활성화</span><span><b>4</b> “모아 자료를 근거로 답해줘”라고 질문</span></div></> :
        modal === "file" ? <><h2>파일 올리기</h2><p>PDF, HWPX 등 여러 파일을 한 번에 추가할 수 있어요.</p><div className="dropzone" onClick={() => fileRef.current?.click()}><span>↑</span><strong>파일을 선택하거나 여기로 끌어오세요</strong><small>파일은 개인 공간에 안전하게 보관됩니다.</small></div><input ref={fileRef} type="file" multiple hidden onChange={(e) => handleFiles(e.target.files)} /></> :
        <form onSubmit={saveSource}><h2>{modal === "link" ? "웹페이지 저장" : "메모 남기기"}</h2><p>{modal === "link" ? "링크의 내용을 읽고 검색 가능한 자료로 정리합니다." : "아이디어와 관찰을 바로 지식으로 남겨보세요."}</p><label>제목<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="자료의 제목" /></label><label>{modal === "link" ? "웹 주소" : "내용"}{modal === "link" ? <input required value={content} onChange={(e) => setContent(e.target.value)} placeholder="https://..." /> : <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="생각을 자유롭게 적어주세요" />}</label><button className="save" type="submit">저장하기</button></form>}
      </div></div>}
    </main>
  );
}
