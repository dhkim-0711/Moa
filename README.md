# 모아 (Moa)

모아는 개인이 보유한 파일, 웹페이지, 메모를 한곳에 저장하고 검색할 수 있게 만든 개인 지식 작업실입니다. 저장한 자료는 MCP를 통해 ChatGPT 같은 AI 도구에서 검색·조회하여 기획서와 보고서 작성의 근거로 활용할 수 있습니다.

## 주요 기능

- PDF, DOCX, XLSX·XLS, PPTX, HWPX 등 파일 업로드 및 텍스트 추출
- 웹페이지와 메모 저장
- 제목·본문 통합 검색과 관련 내용 확인
- 관심 주제 기반 무료 웹 자료 탐색
- 관련도 70점 이상인 수집 후보만 표시
- 수집 후보 저장, 제외, 출처 차단
- MCP를 통한 자료 검색, 원문 조회, 최근 자료 조회
- 비밀번호 기반 개인용 화면 보호

## 구조 문서

- [모아 구조 및 동작 설명](docs/모아_구조_설명.md)
- [아키텍처 다이어그램 원본](docs/moa-architecture.mmd)

## 개발 실행

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

Windows PowerShell에서는 다음 명령으로 실행할 수 있습니다.

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
npx vinext dev
```

## 보안 주의사항

접속 비밀번호, 세션 비밀값, MCP 토큰은 저장소에 넣지 않습니다. 운영 환경의 비밀 환경변수로만 설정해야 합니다.
