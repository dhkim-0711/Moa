# Moa 새 PC 작업 인수인계 프롬프트

아래 내용을 새 PC의 Codex 또는 ChatGPT 작업에 그대로 전달한다.

---

## 시작 프롬프트

나는 기존에 개발하던 개인용 지식관리 도구 **Moa(모아)** 작업을 이어서 진행하려고 한다. 아래 내용을 프로젝트 인수인계 정보로 사용하고, 기존 기능과 사용자 변경을 보존한 상태에서 현재 구조를 먼저 확인한 후 작업해줘.

### 1. 프로젝트 기본 정보

- 서비스명: 모아 — 나의 지식 작업실
- GitHub: <https://github.com/dhkim-0711/Moa>
- 운영 사이트: <https://moa-knowledge-assistant.ehdkim71.chatgpt.site>
- OpenAI Sites 프로젝트 ID: `appgprj_6a684b89a1188191bdba58735bd89ac9`
- 기준 커밋: `54a5b97b8056833d0efcc1e61f4edce7ffe71dd3`
- D1 바인딩: `DB`
- R2 바인딩: `FILES`
- `.openai/hosting.json`이 있으므로 사이트 변경 시 `sites-building` 적용 후 `sites-hosting`으로 배포한다.
- 비밀번호, MCP 토큰, 저장소 접근 토큰은 코드·문서·대화에 노출하거나 커밋하지 않는다.

새 PC에서는 저장소를 clone한 다음 `main` 최신 상태를 확인한다.

### 2. 서비스 목적과 범위

Moa는 개인이 가진 파일·웹페이지·메모와 외부 동향 자료를 저장하고 검색하며, 이를 기반으로 질문·기획·보고서 작성에 활용하는 개인용 지식 작업실이다.

업무의 중심은 일반 반도체가 아니라 다음 분야다.

- AI반도체, AI가속기, NPU
- AI 추론·학습 프로세서
- AI 서버 및 데이터센터 컴퓨팅
- AI가속기와 직접 연결된 HBM·CXL·칩렛·첨단 패키징
- 국내외 AI반도체 기업·제품·시장·기술 동향

일반 파운드리, 범용 메모리, 일반 반도체 시황은 AI가속기와 직접 연결되지 않으면 수집 중심에 두지 않는다. 추가 API 비용이 발생하지 않아야 하며, 현재 유료 OpenAI API와 Google Search API는 사용하지 않는다.

### 3. 주요 기술과 파일

- Next.js 호환 vinext
- OpenAI Sites / Cloudflare Worker 호환 ESM
- Cloudflare D1 + Drizzle
- Cloudflare R2
- GitHub Markdown 보고서 저장소

핵심 파일:

- `app/page.tsx`: 자료함·자동수집·보고서·보고서 검색 UI
- `app/globals.css`: 전체 UI 및 반응형 스타일
- `app/api/reports/archive/route.ts`: GitHub 보고서 목록·본문·검색·캐시
- `app/api/reports/trends/route.ts`: 동향보고서 생성
- `app/api/discovery/run/route.ts`: 자동수집 실행
- `lib/discovery.ts`: AI반도체 관련성·점수·중복 판정
- `lib/direct-sources.ts`: 기관·시장·기업·IR·벤치마크 직접 수집
- `lib/research-search.ts`: Crossref·arXiv 보조 검색
- `lib/daily-desk.ts`: AI Processor Daily Desk 연계
- `lib/trend-report.ts`: 이슈 중심 보고서 구성
- `lib/report-research.ts`: 보고서 근거 조사
- `docs/모아_구조_설명.md`: 한글 구조 설명
- `docs/Moa_아키텍처_구성도.mmd`: 최신 아키텍처 구성도

### 4. 자료함

지원 자료:

- PDF, DOCX, HWPX
- XLSX, XLS, XLSM, ODS
- PPTX, ODT, RTF
- TXT, MD, CSV, JSON, HTML, XML
- 웹페이지, 메모

자료 유형은 문서·웹페이지·자동수집·메모로 구분한다. 어느 화면에서든 좌측 자료 유형을 누르면 자료함으로 이동해 해당 유형을 보여준다. 좌측 `모아` 로고를 누르면 전체 자료가 보이는 자료함 초기화면으로 이동한다.

통합검색은 Moa 자료와 AI Processor Daily Desk를 함께 검색한다.

### 5. Daily Desk 연계

- 주소: <https://dhkim-0711.github.io/daily-desk/>
- 명칭: `AI Processor Daily Desk`
- 좌측 외부 링크와 자료함 초기화면 배너로 연결
- 공개 데이터를 Moa 통합검색과 자동수집에 활용
- 동일 기사와 중복 자료는 제외

### 6. 자동수집

무료 경로를 조합한다.

1. Bing 무료 RSS 검색
2. AI Processor Daily Desk 공개 데이터
3. 기관·기업·시장조사기관 공식 발행 페이지 직접 수집
4. Crossref·arXiv 논문 검색을 소량의 보조 근거로 사용

직접수집 주요 출처:

- SPRi, IITP, KISDI, KIET, KISTEP, ETRI
- TrendForce, McKinsey
- NVIDIA, AMD, Intel, Samsung Semiconductor, SK hynix
- NVIDIA·AMD·삼성전자·SK하이닉스 IR
- MLCommons

논문은 너무 전문적인 자료에 치우치지 않도록 최대 4건 수준의 보조 자료로 제한한다.

관련도 정책:

- 70점 이상 후보만 자동수집함에 표시
- 90점 이상 고신뢰 자료는 자료함 자동 저장 가능
- 단순 뉴스와 뉴스 포털은 낮게 평가
- 보고서·백서·시장분석·벤치마크·기술문서·IR 우선
- AI반도체·AI가속기·NPU 또는 AI 워크로드와 컴퓨팅 하드웨어의 명확한 연결 필요
- Blackwell, Rubin, H100/H200/B200, Instinct·MI300, Gaudi, TPU, Trainium, Inferentia와 국내 NPU 기업·제품 인식
- `새 자료 찾기` 실행 시 기존 후보도 최신 기준으로 재평가

### 7. 동향보고서

상단 메뉴:

- 일일동향
- 주간
- 월간
- 보고서 검색

GitHub 원본 위치:

- `report/daily`
- `report/weekly`
- `report/monthly`

GitHub에 Markdown 파일을 추가하면 Moa가 목록과 본문을 읽어 표시한다. GitHub MD가 보고서의 원본이다.

보고서는 Chief AI Scientist와 한국 정부 AI 정책수립자 관점을 결합한다. 기사별 요약을 나열하지 말고 다음을 수행한다.

- 동일 사건 중복 제거
- 다중 출처 통합
- 수치 비교
- 기업·기술·시장 연결
- 요약 → 맥락/서론 → 본론 → 시사점 구조
- 실제 URL·발행처·발행일 표시
- 시장·기술·기업 동향 중심
- 정부 보도자료에 과도하게 치우치지 않기
- 마지막 장은 `시사점 및 향후 전망`
- `&nbsp;` 등 HTML 엔티티가 본문에 노출되지 않게 처리
- 별도 핵심 수치 배지는 숨김

### 8. 보고서 선택과 검색

일일·주간·월간 탭에서는 카드 나열 대신 연도 → 월 → 일자/주차/월 보고서 드롭다운으로 선택한다. 탭 진입 시 최신 보고서가 자동 선택된다.

`보고서 검색`을 누르면 기존 보고서·이전 검색어·이전 검색 결과를 닫고 검색 카드만 표시한다.

검색 예시 문구:

`예: 엔비디아, NPU, 데이터센터`

검색 대상:

- 일일·주간·월간 MD 제목과 본문 전체
- 최근 최대 250개 보고서

결과에는 유형·날짜·제목·검색어 주변 문맥을 표시한다. 결과를 누르면 해당 MD만 직접 열고, 검색어를 제목·본문·표·출처 문장에서 노란색으로 강조한다.

### 9. 보고서 로딩 최적화

현재 구현:

- 기간별 목록과 최신 본문을 한 번의 Moa API 요청으로 반환
- 검색 결과는 목록을 다시 읽지 않고 선택한 MD만 요청
- GitHub 목록 약 1분 캐시
- 동일 MD 본문 약 2분 캐시
- 통합검색용 보고서 데이터 약 15분 재사용
- 새 보고서는 최대 약 1분, 동일 파일 수정은 최대 약 2분 내 반영

### 10. Git과 배포 주의사항

작업 전 항상 `git status --short`와 원격 `main`을 확인한다. 사용자 변경을 절대 덮어쓰지 않는다.

이 인수인계 작성 당시 이전 PC에는 다음 미커밋 변경이 있었다.

- `report/daily/2026-08-20-ai-daily-briefing.md`
- `report/weekly/2026-08-10_2026-08-16-ai-weekly-report.md`
- `.obsidian/`

이 파일들은 GitHub clone만으로 새 PC에 전달되지 않는다. 필요하면 이전 PC에서 별도로 복사하거나 사용자가 의도한 내용만 커밋한다.

금지사항:

- `git reset --hard`
- 강제 push
- 사용자 파일 임의 삭제·복원·커밋
- Sites와 GitHub 중 한쪽 변경을 무시하는 병합

빌드 명령:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
npx.cmd vinext build
```

배포 순서:

1. 빌드 성공
2. 변경 파일만 커밋
3. 원격 `main` 정상 병합
4. GitHub push
5. Sites source credential 발급
6. Sites 저장소 `main`에 안전하게 push
7. Sites 패키징 스크립트 실행
8. `save_site_version`
9. `deploy_site_version`
10. 배포 상태가 `succeeded`인지 확인

### 11. 다음 작업 목록

#### 우선순위 1: 실제 동작 점검

- 일일·주간·월간 첫 로딩 속도 확인
- 검색 결과가 선택한 MD만 요청하는지 확인
- 노란색 강조가 제목·본문·표·출처에서 작동하는지 확인
- 한글·영문·대소문자 검색 확인
- 모바일에서 4개 상단 메뉴와 검색 카드 확인

#### 우선순위 2: 검색 확장성

보고서가 장기간 쌓이면 250개 본문 검색이 느려질 수 있다. 비용 없는 구조로 다음을 검토한다.

- GitHub Actions가 MD 변경 시 `report-index.json` 생성
- Moa는 단일 인덱스 파일만 내려받아 검색
- 제목·날짜·유형·검색용 본문·원본 경로 저장
- 원본 보고서는 계속 GitHub MD로 유지

#### 우선순위 3: GitHub 장애 대응

- GitHub 요청 실패 시 직전 목록 캐시 표시
- Raw MD 실패 원인 안내
- ETag 또는 Last-Modified 조건부 요청
- GitHub 비로그인 API 제한 대응

#### 우선순위 4: 자동수집 품질

- 공식 RSS·Atom·사이트맵 우선
- 동적 기관 게시판 수집 안정화
- 시장보고서·IR·백서·벤치마크 비중 확대
- 일반 반도체 자료 차단 강화
- 동일 이슈·동일 수치·재배포 기사 중복 제거 개선

#### 우선순위 5: 보고서 품질

- 다중 출처 이슈 통합 강화
- 시장조사·IR·기술 백서 비중 확대
- 상충 수치 검증
- 기업·제품·기술·시장 연결 강화
- 한국 산업과 정책에 대한 실행 가능한 시사점 강화

#### 우선순위 6: 문서 최신화

- `docs/모아_구조_설명.md`
- `docs/Moa_아키텍처_구성도.mmd`
- `README.md`

최근 기능인 보고서 검색·키워드 강조·드롭다운 보관함·로딩 캐시·AI반도체 중심 필터를 반영한다.

### 12. 작업 시작 순서

1. 저장소 clone 및 최신 `main` 확인
2. `git status --short` 확인
3. `.openai/hosting.json` 확인
4. `app/page.tsx`, `app/globals.css`, `app/api/reports/archive/route.ts` 우선 검토
5. 기존 빌드 확인
6. 요청받은 범위만 수정
7. 사용자 변경 보존
8. 빌드 후 GitHub와 Sites에 안전하게 반영

항상 다음 원칙을 우선한다.

- AI반도체·AI가속기 중심
- 추가 API 비용 없음
- GitHub MD를 보고서 원본으로 유지
- 신뢰도 높은 출처
- 기사 나열이 아닌 이슈 중심 종합보고서
- 사용자 로컬 변경과 배포 이력 보존

---

## 인수인계 파일 사용법

새 PC에서 이 파일 전체를 Codex에 전달한 다음 다음과 같이 요청한다.

> 위 인수인계 내용을 기준으로 저장소를 점검하고, 기존 기능과 사용자 변경을 보존한 상태에서 작업을 이어가줘. 먼저 현재 커밋·작업 폴더·빌드 상태와 인수인계 내용의 차이를 보고해줘.

