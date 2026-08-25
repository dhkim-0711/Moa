# Moa 아키텍처 구성도

Moa의 사용자 화면, API, 처리 로직, 저장소, 무료 외부 자료원과 GitHub 보고서 연동 구조를 나타낸다.

```mermaid
flowchart TB
    user["개인 사용자"]
    chatgpt["ChatGPT Pro / MCP 클라이언트"]

    subgraph ui["Moa 사용자 화면"]
        library["자료함<br/>파일·웹·메모·자동수집"]
        unifiedSearch["통합검색<br/>Moa + Daily Desk"]
        discovery["자동수집함<br/>70점 표시 / 90점 자동저장"]
        reportTabs["동향보고서<br/>일일 · 주간 · 월간"]
        reportSearch["보고서 검색<br/>본문검색 · 문맥 · 노란 강조"]
    end

    subgraph edge["OpenAI Sites / Cloudflare"]
        app["vinext 애플리케이션"]
        auth["개인 인증"]
        sourceApi["자료 관리·검색 API"]
        discoveryApi["자동수집 API"]
        trendApi["동향보고서 생성 API"]
        archiveApi["GitHub 보고서 API<br/>목록+최신본문 통합"]
        mcpApi["Remote HTTP MCP"]
        reportCache["단기 캐시<br/>목록 1분 · 본문 2분 · 검색 15분"]
    end

    subgraph processing["처리 로직"]
        extraction["PDF·Office·HWPX·웹<br/>텍스트 추출"]
        profile["자료함 기반 관심 프로필"]
        aiFilter["AI반도체 중심 필터<br/>AI가속기·NPU 필수 맥락"]
        quality["보고서·IR·백서·벤치마크 우선"]
        score["관련도 계산<br/>70점 노출 · 90점 저장"]
        dedupe["URL·제목·본문·이슈 중복 제거"]
        synthesis["시장·기술·기업·정책 연결<br/>이슈 중심 재구성"]
        highlight["검색어 문맥 추출<br/>보고서 본문 노란 강조"]
    end

    subgraph storage["영속 저장"]
        d1["Cloudflare D1<br/>자료·주제·후보·차단출처"]
        r2["Cloudflare R2<br/>업로드 원본"]
        github["GitHub Moa<br/>report/daily<br/>report/weekly<br/>report/monthly"]
    end

    subgraph sources["무료 외부 자료원"]
        bing["Bing RSS"]
        dailyDesk["AI Processor Daily Desk"]
        institutions["SPRi·IITP·KISDI·KIET<br/>KISTEP·ETRI"]
        market["TrendForce·McKinsey"]
        companies["NVIDIA·AMD·Intel<br/>Samsung·SK hynix·IR"]
        benchmark["MLCommons"]
        papers["Crossref·arXiv<br/>소량의 보조 근거"]
    end

    user --> auth --> app
    chatgpt -->|"MCP"| mcpApi

    app --> library
    app --> unifiedSearch
    app --> discovery
    app --> reportTabs
    app --> reportSearch

    library --> sourceApi --> extraction
    extraction --> d1
    extraction --> r2
    unifiedSearch --> sourceApi
    sourceApi --> d1
    sourceApi --> dailyDesk
    mcpApi --> d1
    mcpApi --> dailyDesk

    discovery --> discoveryApi --> profile --> aiFilter --> quality --> score --> dedupe --> d1
    discoveryApi --> bing
    discoveryApi --> dailyDesk
    discoveryApi --> institutions
    discoveryApi --> market
    discoveryApi --> companies
    discoveryApi --> benchmark
    discoveryApi --> papers

    reportTabs --> trendApi
    trendApi --> d1
    trendApi --> dailyDesk
    trendApi --> synthesis --> reportTabs

    reportTabs --> archiveApi
    reportSearch --> archiveApi
    archiveApi <--> reportCache
    archiveApi <--> github
    archiveApi --> highlight --> reportSearch

    github -. "MD 추가·수정 시 최신화" .-> archiveApi
```

## 주요 흐름

1. 사용자는 Moa 웹 화면에서 자료를 저장·검색하거나 동향보고서를 열어본다.
2. ChatGPT 등 외부 AI 도구는 Remote HTTP MCP를 통해 Moa 자료와 Daily Desk를 검색한다.
3. 업로드 원본은 R2에 저장하고, 추출된 본문과 자료 메타데이터는 D1에 저장한다.
4. 자동수집은 무료 외부 자료원에서 후보를 찾고 AI반도체 관련성·품질·중복을 평가한다.
5. 동향보고서는 D1 자료와 외부 근거를 시장·기술·기업·정책 이슈로 재구성한다.
6. 완성된 일일·주간·월간 Markdown 보고서는 GitHub가 원본 저장소 역할을 한다.
7. 보고서 API는 GitHub 목록과 본문을 짧게 캐시해 최신성과 로딩 속도를 함께 관리한다.
8. 보고서 검색은 GitHub Markdown 본문을 통합검색하고 선택한 키워드를 본문에서 강조한다.

## 저장소별 역할

| 저장소 | 역할 |
|---|---|
| Cloudflare D1 | 자료 본문, 메타데이터, 관심 주제, 자동수집 후보, 차단 출처 |
| Cloudflare R2 | 사용자가 업로드한 원본 파일 |
| GitHub `report/` | 일일·주간·월간 보고서 Markdown 원본 |
| AI Processor Daily Desk | AI반도체 외부 동향 데이터 |

Mermaid 원본만 필요한 경우 [`Moa_아키텍처_구성도.mmd`](./Moa_아키텍처_구성도.mmd)를 사용한다.

