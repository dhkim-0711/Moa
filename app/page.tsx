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
  const [sources, setSources] = useState<Source[]>(seedSources);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [active, setActive] = useState<"library" | "chat" | "studio">("library");
  const [modal, setModal] = useState<"link" | "memo" | "file" | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/sources")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => data.sources?.length && setSources(data.sources))
      .catch(() => {});
  }, []);

  const counts = useMemo(() => ({
    all: sources.length,
    documents: sources.filter((s) => ["PDF", "HWPX", "FILE"].includes(s.kind)).length,
    web: sources.filter((s) => s.kind === "WEB").length,
    memo: sources.filter((s) => s.kind === "MEMO").length,
  }), [sources]);

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

  function ask() {
    if (!query.trim()) return;
    setActive("chat");
    setAnswer(`“${query}” 질문은 ChatGPT에서 모아 앱을 활성화한 뒤 그대로 물어보세요. ChatGPT가 저장된 자료를 검색하고 원문을 확인해 출처와 함께 답합니다.`);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">M</span><span>모아</span></div>
        <button className="new-button" onClick={() => setModal("file")}><span>＋</span> 새 자료 추가</button>
        <nav>
          <button className={active === "library" ? "active" : ""} onClick={() => setActive("library")}><span>▦</span> 자료함 <b>{counts.all}</b></button>
          <button className={active === "chat" ? "active" : ""} onClick={() => setActive("chat")}><span>✦</span> 자료에게 질문</button>
          <button className={active === "studio" ? "active" : ""} onClick={() => setActive("studio")}><span>▤</span> 문서 작업실</button>
        </nav>
        <div className="side-label">자료 유형</div>
        <div className="filters">
          <span>문서 <b>{counts.documents}</b></span><span>웹페이지 <b>{counts.web}</b></span><span>메모 <b>{counts.memo}</b></span>
        </div>
        <div className="sidebar-foot"><span className="avatar">나</span><div><strong>나의 지식 공간</strong><small>개인 전용</small></div><span>•••</span></div>
      </aside>

      <section className="workspace">
        <header><div><h1>{active === "library" ? "내 자료함" : active === "chat" ? "자료에게 질문" : "문서 작업실"}</h1><p>{active === "library" ? "흩어진 자료를 모으고, 연결하고, 새로운 생각으로 발전시키세요." : active === "chat" ? "저장한 자료를 근거로 답을 찾습니다." : "자료를 바탕으로 기획서와 보고서의 초안을 만듭니다."}</p></div><button className="help">?</button></header>

        {active === "library" && <>
          <section className="hero-card">
            <div><span className="eyebrow">PERSONAL KNOWLEDGE BASE</span><h2>생각의 재료를<br/><em>한곳에 모으세요.</em></h2><p>PDF, HWPX, 웹페이지, 메모까지. 모아가 읽고 연결해<br/>당신의 다음 기획과 보고서를 돕습니다.</p></div>
            <div className="orb"><span>PDF</span><span>HWPX</span><span>URL</span><span>MEMO</span><i>✦</i></div>
          </section>
          <section className="quick-add">
            <button onClick={() => setModal("file")}><i className="coral">↑</i><span><strong>파일 올리기</strong><small>PDF, HWPX 및 문서</small></span><b>›</b></button>
            <button onClick={() => setModal("link")}><i className="mint">⌁</i><span><strong>웹페이지 저장</strong><small>링크를 붙여넣어 저장</small></span><b>›</b></button>
            <button onClick={() => setModal("memo")}><i className="violet">✎</i><span><strong>메모 남기기</strong><small>떠오른 생각을 바로 기록</small></span><b>›</b></button>
          </section>
          <div className="section-title"><div><h3>최근 자료</h3><span>{sources.length}개의 자료</span></div><button>전체 보기 →</button></div>
          <section className="source-grid">
            {sources.slice(0, 6).map((source) => <article key={source.id}><div className={`file-icon ${source.kind.toLowerCase()}`}>{source.kind === "WEB" ? "⌁" : source.kind === "MEMO" ? "✎" : "▤"}</div><span className="kind">{source.kind}</span><h4>{source.title}</h4><p>{source.excerpt}</p><footer><span>{source.createdAt}</span><button>•••</button></footer></article>)}
          </section>
        </>}

        {active === "chat" && <section className="chat-panel">
          <div className="chat-intro"><span>✦</span><h2>내 자료에서 답을 찾아보세요</h2><p>답변에는 참고한 자료와 근거가 함께 표시됩니다.</p></div>
          {answer && <div className="answer"><small>모아의 답변</small><p>{answer}</p><div className="citations"><span>① 아이디어 메모 — 온보딩</span><span>② 경쟁 서비스 벤치마크</span></div></div>}
          <div className="prompts"><button onClick={() => setQuery("모아의 최근 자료에서 핵심 인사이트를 정리해줘")}>최근 자료 핵심 인사이트</button><button onClick={() => setQuery("모아 자료를 근거로 새 기획의 기회 영역을 찾아줘")}>기획 기회 영역 찾기</button></div>
        </section>}

        {active === "studio" && <section className="studio">
          <div className="template-copy"><span className="eyebrow">DOCUMENT STUDIO</span><h2>무엇을 만들까요?</h2><p>자료의 맥락을 읽고 바로 편집 가능한 초안을 만듭니다.</p></div>
          <div className="templates"><button><span>▤</span><strong>기획서</strong><small>배경부터 실행 계획까지</small></button><button><span>▥</span><strong>보고서</strong><small>핵심 요약과 근거 중심</small></button><button><span>◇</span><strong>빈 문서</strong><small>자유롭게 시작하기</small></button></div>
          <textarea placeholder="만들고 싶은 문서의 목적과 독자를 적어주세요. 예: 경영진 공유용 신규 서비스 기획서" />
          <button className="create-doc">초안 만들기 <span>→</span></button>
        </section>}

        <div className="ask-bar"><span>✦</span><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="내 자료에 무엇이든 물어보세요" /><button onClick={ask}>↑</button></div>
      </section>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close" onClick={() => setModal(null)}>×</button>
        {modal === "file" ? <><h2>파일 올리기</h2><p>PDF, HWPX 등 여러 파일을 한 번에 추가할 수 있어요.</p><div className="dropzone" onClick={() => fileRef.current?.click()}><span>↑</span><strong>파일을 선택하거나 여기로 끌어오세요</strong><small>파일은 개인 공간에 안전하게 보관됩니다.</small></div><input ref={fileRef} type="file" multiple hidden onChange={(e) => handleFiles(e.target.files)} /></> :
        <form onSubmit={saveSource}><h2>{modal === "link" ? "웹페이지 저장" : "메모 남기기"}</h2><p>{modal === "link" ? "링크의 내용을 읽고 검색 가능한 자료로 정리합니다." : "아이디어와 관찰을 바로 지식으로 남겨보세요."}</p><label>제목<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="자료의 제목" /></label><label>{modal === "link" ? "웹 주소" : "내용"}{modal === "link" ? <input required value={content} onChange={(e) => setContent(e.target.value)} placeholder="https://..." /> : <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="생각을 자유롭게 적어주세요" />}</label><button className="save" type="submit">저장하기</button></form>}
      </div></div>}
    </main>
  );
}
