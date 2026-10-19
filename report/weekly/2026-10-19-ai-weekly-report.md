# AI 주간 동향보고서

> 분석기간: 2026년 10월 12일~10월 18일 | 발간일: 2026년 10월 19일

## 1. 시장동향

□ **첨단공정 수요는 실적으로 확인됐지만, AI 인프라 전반의 투자위험은 동일하게 낮아지지 않음**

  ㅇ TSMC는 10월 15일 2026년 3분기 매출 1조4,942억 대만달러, 순이익 7,631억 대만달러를 발표했다. 전년 동기 대비 각각 50.9%, 68.7% 증가했으며, 달러 기준 매출은 467억2천만 달러였다.

  - 7나노 이하 첨단공정이 웨이퍼 매출의 79%를 차지했고, 처음 매출에 반영된 2나노 비중은 8%였다. 이는 AI 가속기와 고성능컴퓨팅 수요가 첨단공정의 실제 매출·이익으로 전환되고 있음을 보여준다.
    * 출처: [TSMC, “TSMC Reports Third Quarter EPS of NT$29.43”](https://pr.tsmc.com/english/news/3346), 2026.10.15.

  ㅇ ASML도 10월 14일 3분기 순매출 117억 유로, 순이익 50억 유로, 매출총이익률 57.5%를 발표했다. 신규 노광장비 판매는 전분기 86대에서 113대로 늘었고, 회사는 4분기 매출을 142억~152억 유로로 전망했다.

  - 파운드리와 노광장비 공급자의 동반 실적증가는 AI 반도체 수요가 칩 주문을 넘어 전공정 장비와 생산능력 투자로 이어지는 신호다. 다만 회사 전망은 고객의 실제 주문·출하·매출인식 시점에 따라 달라질 수 있다.
    * 출처: [ASML, “ASML reports €11.7 billion total net sales and €5.0 billion net income in Q3 2026”](https://investor.asml.com/news-releases/news-release-details/asml-reports-eu11.7-billion-total-net-sales-and-eu5.0-billion-net-income-q3-2026), 2026.10.14.

□ **자본시장은 AI 컴퓨트 수요와 데이터센터 사업자의 신용위험을 분리해 가격에 반영**

  ㅇ 10월 16일 Reuters는 CoreWeave가 6월 발행한 채권의 수익률이 약 15%까지 상승했다고 보도했다. 발행 당시 수익률은 9.675%였으며, 가격하락에 따른 수익률 상승은 투자자가 AI 인프라 확장속도와 차입부담을 더 높은 위험으로 평가하고 있음을 뜻한다.

  - 이는 AI 수요의 부재를 의미하지 않는다. 같은 주 TSMC·ASML의 실적은 공급망 상단의 수요를 확인했지만, 데이터센터 운영기업에는 고객집중도, 전력·건설 일정, 가동률, 차환비용이 별도의 가치평가 변수로 작용한다.
    * 출처: [Reuters, “CoreWeave bond rout tests market's math on AI buildout”](https://www.reuters.com/legal/transactional/coreweave-bond-rout-tests-markets-math-ai-buildout-2026-10-16/), 2026.10.16; 발행내역: [CoreWeave, “CoreWeave Announces Intention to Offer $3.5 Billion of Senior Notes”](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Announces-Intention-to-Offer-3-5-Billion-of-Senior-Notes/default.aspx), 2026.06.11.

□ **결론 및 시사점**

  ㅇ 이번 주 시장은 ‘AI 반도체 수요 강세’와 ‘AI 인프라 금융의 선별 강화’가 동시에 진행되는 국면을 보여줬다.

  - 수요가 실제 매출로 전환되는 첨단공정·핵심장비는 높은 수익성을 유지하는 반면, 차입으로 선투자하는 인프라 사업자는 준공·가동·현금흐름을 입증하지 못하면 높은 자본비용을 부담한다. 시장의 평가축은 총 투자액에서 병목통제력과 단위자본당 현금창출력으로 이동하고 있다.
    * 판단 근거: TSMC·ASML 공식 실적과 CoreWeave 채권시장 동향을 종합한 분석.

## 2. 기술동향

□ **에이전틱 AI 인프라가 가속기 단품이 아닌 CPU·GPU·라우팅·전력·냉각을 묶은 랙 단위 설계로 전환**

  ㅇ AMD는 10월 12일 Open Compute Project 규격을 기반으로 한 개방형 랙 참조설계 ‘Helion’을 공개했다. 대규모 에이전트 실행을 위한 CPU 중심 구성과, 기업용 에이전트 실행·추론을 한 랙에 결합한 EPYC CPU·Instinct MI350P GPU 구성을 제시했다.

  - 통합 토큰 라우터가 에이전트의 모델 호출을 프런티어 모델과 오픈 모델 사이에서 분배하도록 설계된 점이 핵심이다. 에이전틱 워크로드에서는 모든 요청을 GPU에 보내기보다 계획·도구호출·추론을 서로 다른 자원에 배치하는 스케줄링이 전력과 비용을 좌우한다.
    * 출처: [AMD, “Introducing AMD Helion, Agentic AI Compute at Rack Scale”](https://newsroom.amd.com/news/open-rack-blueprint-scale-agentic-ai/), 2026.10.12.

  ㅇ Helion은 공랭·수랭과 여러 시스템 공급자의 구현을 전제로 한 참조설계이며, 발표 시점의 개별 고객 가동실적이나 표준화된 성능검증 결과는 아니다.

  - 개방형 랙 설계의 가치는 최고 TOPS보다 부품 대체성, 랙 전력한도 안의 작업배치, 텔레메트리, 장애격리에 있다. 실제 경쟁력은 파트너별 구현에서 동일한 운영 인터페이스와 성능·신뢰성 수준을 유지하는지로 판별될 전망이다.
    * 출처: [AMD Helion 제품자료](https://www.amd.com/en/products/rackscale-solutions/helion.html), 2026.10.12 확인; 행사 배경: [Open Compute Project, 2026 Global Summit](https://www.opencompute.org/summit/global-summit?activity_id=4607623), 2026.10.12~15.

□ **엣지 VLM 운영평가가 칩의 정격성능에서 전체 시스템의 응답길이별 에너지·열 특성으로 구체화**

  ㅇ 10월 14일 공개된 연구는 Raspberry Pi 5와 Hailo-10H NPU, Jetson Orin Nano Super에서 Qwen2-VL-2B-Instruct를 실행해 총 시스템 에너지, 지연시간, 열 거동을 비교했다. Pi의 NPU 오프로딩은 CPU 실행 대비 생성 토큰당 에너지를 약 3분의 2 줄였고, 지속부하에서 CPU의 열 스로틀링도 피했다.

  - 연구진은 서로 다른 양자화와 서빙 소프트웨어 때문에 칩 자체가 아닌 ‘배포 스택’을 비교한다고 명시했다. Jetson은 짧은 응답에서 낮은 고정비용, Pi NPU는 긴 응답에서 낮은 토큰당 비용을 보였고, 에너지 곡선은 약 40개 출력 토큰 부근에서 교차했다.
    * 출처: [Liao et al., “Seeing at the Edge: Energy Characterization of Vision-Language Model Inference on Edge Platforms”](https://arxiv.org/abs/2610.20136), 2026.10.14.

□ **결론 및 시사점**

  ㅇ 이번 주 기술 변화는 AI 인프라 최적화의 단위가 칩에서 랙·배포 스택·실제 응답패턴으로 확대됐음을 보여준다.

  - 데이터센터에서는 토큰 라우팅과 전력·냉각 텔레메트리가, 엣지에서는 모델 양자화·응답길이·열지속성이 운영비를 결정한다. 향후 비교는 정격 TOPS보다 워크로드별 토큰당 에너지, 지연분포, 열제한, 자원대체성과 장애격리 수준을 함께 측정하는 방향으로 전개될 가능성이 높다.
    * 판단 근거: AMD Helion 공식 설계와 엣지 VLM 에너지 측정연구를 종합한 분석.

## 3. 기업동향

□ **DEEPX, NPU 단품 공급에서 글로벌 런타임 호환과 로봇 운영 소프트웨어로 사업범위를 확장**

  ㅇ DEEPX 대표는 10월 15일 진행되고 18일 보도된 인터뷰에서 Intel OpenVINO 생태계에 자사 NPU를 통합하고 모델·SDK를 최적화하는 기술협력을 진행 중이며, 초기 결과를 2027년 초 제시할 계획이라고 밝혔다.

  - 회사 설명에 따르면 DX-M1은 삼성전자 5나노 공정으로 양산단계에 들어갔고, 2025년 8월~2026년 7월 10여 개국에서 77건의 구매주문을 받았다. 전 세계 27개 반도체 유통사와 계약했고 약 300개 기관이 제품을 평가 중이지만, 평가수와 반복매출은 구분할 필요가 있다.
    * 출처: [Yonhap, “DeepX eyes '1st mover' strategy in global physical AI market through partnerships with Intel, AMD”](https://en.yna.co.kr/view/AEN20261017001500320), 인터뷰 2026.10.15·보도 2026.10.18.

  ㅇ DEEPX는 삼성 2나노 공정 기반 칩의 테이프아웃을 10월 중 완료하고, 로봇에 AI 모델을 네트워크로 배포·관리하는 ‘DX-Newton’을 연내 공개할 계획이라고 밝혔다. AMD와의 협력은 후속 실무논의를 준비하는 초기단계다.

  - 신규 칩과 소프트웨어는 모두 계획 또는 개발단계이며 상용 성과로 확정할 수 없다. 다만 OpenVINO·NVIDIA Isaac과 입력·출력 호환을 지향한 것은 국내 NPU의 시장진입 병목이 연산성능뿐 아니라 기존 개발도구와 운영체계에 있다는 판단을 반영한다.
    * 출처: [Yonhap 인터뷰](https://en.yna.co.kr/view/AEN20261017001500320), 2026.10.18.

□ **엣지에이아이·미국 이피션트컴퓨터, 로봇용 VLA 칩을 공동설계하는 한미 협력 착수**

  ㅇ 양사는 10월 16일 차세대 피지컬 AI 칩셋 공동개발 MOU를 체결하고, 70억~80억 개 매개변수 규모의 시각·언어·행동(VLA) 모델을 외부 서버 없이 로봇에서 구동하는 칩렛 기반 반도체를 개발하겠다고 발표했다.

  - 핵심 IP·전용 컴파일러, SoC·칩렛 통신, 물리설계·전력성능 최적화를 분담하고 11~12월 세부 작업기술서를 확정한 뒤 12월 말 최종 공동개발계약 체결을 목표로 한다. 따라서 현재의 확정 사건은 MOU이며, 제품사양·성능·양산일정은 후속계약과 시제품 검증 대상이다.
    * 출처: [전자신문, 「엣지에이아이·美 이피션트컴퓨터, 차세대 피지컬 AI 반도체 공동개발」](https://www.etnews.com/20261016000231), 2026.10.16.

□ **결론 및 시사점**

  ㅇ 국내 NPU 기업의 경쟁축이 저전력 칩 설계에서 글로벌 도구호환, 컴파일러, 원격배포, 로봇 탑재검증을 포함한 풀스택으로 확대되고 있다.

  - DEEPX는 기존 플랫폼과의 호환을, 엣지에이아이는 칩렛·컴파일러 공동설계를 선택했다. 두 사례의 사업성은 발표된 목표성능보다 양산수율, 지원모델 수, 개발자의 이전비용, 현장 SLO, 평가고객의 반복주문에서 확인될 전망이다.
    * 판단 근거: DEEPX 인터뷰와 엣지에이아이·이피션트컴퓨터 협력발표의 사업단계 비교.

## 4. 글로벌 빅테크 동향

□ **Microsoft, Maia 300을 2027년부터 멀티기가와트 규모로 배치하며 추론비용을 시스템 수준에서 내재화**

  ㅇ Microsoft는 10월 12일 3세대 자체 AI 가속기 Maia 300을 공개했다. 167kW 랙에 가속기 96개를 배치하고, 랙 전체에서 27.6TB HBM과 1.7PB/s의 총 HBM 대역폭을 제공한다고 밝혔다.

  - 회사 측 측정으로 Maia 200 대비 랙 단위 토큰 처리량은 최대 7배, 와트당 성능은 2.5배 이상이며, 주요 GPU 기반 시스템보다 와트당 토큰을 40% 더 제공할 것으로 예상한다. 이는 공급자 자체 비교이므로 독립된 동등조건 벤치마크로 보기는 어렵다.
    * 출처: [Microsoft, “Microsoft to expand Azure Maia system to multi-gigawatt deployments”](https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/), 2026.10.12; [Microsoft Azure 기술자료](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/), 2026.10.12.

  ㅇ Microsoft는 2027년부터 Maia 300의 멀티기가와트 배치를 시작할 계획이다. 칩, 서버, 네트워크, 전력·냉각, 텔레메트리와 워크로드 배치를 공동설계해 고정된 데이터센터 전력 안에서 추론량을 높이는 접근이다.

  - 이는 GPU 구매량을 늘리는 전략에서 핵심 추론 워크로드의 비용곡선을 직접 설계하는 전략으로의 이동이다. 향후 외부 고객의 이용가능 범위와 가격, 모델호환성, 장애 시 GPU 대체성은 Azure의 실질 경쟁력을 좌우할 변수다.
    * 출처: [Microsoft 공식 블로그](https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/), 2026.10.12; 보완취재: [Reuters](https://www.reuters.com/business/microsoft-plans-huge-deployment-its-own-ai-chips-with-an-eye-saving-costs-2026-10-12/), 2026.10.12.

□ **Google, Gemini 4 Argon을 모델·API·코딩도구·검색에 동시에 배포해 프런티어 모델의 유통주기를 단축**

  ㅇ Google은 10월 13일 Gemini 4 Argon을 개발자·기업용 API, AI Studio, Gemini 플랫폼, Antigravity, Gemini 앱과 검색 AI Mode에 전 세계 출시했다. 복잡한 소프트웨어 엔지니어링, 기업 지식업무, 사이버 방어와 장기 다단계 작업을 핵심 용도로 제시했다.

  - 제품공개와 함께 모델카드와 안전·보안 접근법을 갱신했다. 모델 성능에 대한 회사 벤치마크는 활용가능성을 보여주지만, 실제 기업도입에서는 도메인 정확도, 도구권한 통제, 데이터 경계, 장기작업 실패복구를 별도로 검증해야 한다.
    * 출처: [Google, “Gemini 4 Argon: Built to solve your hardest problems”](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/), 2026.10.13; [Google DeepMind 모델카드](https://deepmind.google/models/model-cards/gemini-4-argon/), 2026.10.13.

  ㅇ Google Cloud는 11월 30일까지 API 프로모션 가격을 입력 100만 토큰당 2달러, 출력 100만 토큰당 10달러로 제시하고, 이후 각각 4달러와 20달러의 표준가격을 적용한다고 밝혔다.

  - 한시적 가격은 초기 전환비용을 낮추지만 장기 TCO는 표준가격과 에이전트의 반복호출량에 의해 달라진다. 에이전틱 서비스에서는 표면적인 토큰 단가보다 한 업무완료에 필요한 호출 수, 재시도, 도구사용과 인간검토 비용이 더 중요한 비교단위가 된다.
    * 출처: [Google Cloud, “Gemini 4 Argon available on Google Cloud”](https://cloud.google.com/blog/products/ai-machine-learning/gemini-4-argon-available-on-google-cloud/), 2026.10.13.

□ **결론 및 시사점**

  ㅇ 빅테크 경쟁이 자체 가속기를 통한 공급비용 절감과 프런티어 모델의 전 채널 동시배포를 결합하는 방향으로 전개되고 있다.

  - Microsoft는 추론 원가와 전력효율을, Google은 모델 유통속도와 애플리케이션 접점을 각각 내재화했다. 클라우드·모델 사업의 경쟁우위는 단일 모델 점수보다 칩-모델-도구-배포채널을 얼마나 빠르게 공동최적화하고 운영위험을 통제하는지에 달릴 전망이다.
    * 판단 근거: Microsoft Maia 300 및 Google Gemini 4 Argon 공식발표를 종합한 분석.

## 5. 정책·규제동향

□ **한국의 AI 인프라 정책이 GPU 확보와 국산 NPU의 실증·양산·수출 연계를 병행**

  ㅇ NIPA 원장은 10월 15일 국회 과학기술정보방송통신위원회 국정감사에서 지난해 GPU 1만5천 장에 이어 올해 1만9천 장을 확보했으며, 스타트업·중소기업·대학·연구기관에 공급하겠다고 밝혔다.

  - 같은 발언에서 국산 AI 반도체의 설계·실증뿐 아니라 양산·수출까지 전주기 지원하고, 전북·경남의 ‘피지컬 AI 공장 모델’ 개발과 에이전틱 AI 지원을 확대하겠다고 설명했다. 수치는 기관장의 국감 발언을 보도한 것이며 실제 공급률·가동률·수혜기관별 사용량은 별도 성과검증이 필요하다.
    * 출처: [ZDNet Korea, 「NIPA “올해 GPU 1.9만장 확보…국산 AI 반도체 상용화 지원”」](https://zdnet.co.kr/view/?no=20261015110351), 사건·보도 2026.10.15; 사업구조: [NIPA, 2026년 고성능컴퓨팅지원사업](https://www.nipa.kr/home/2-2/16567), 2026년 확인.

□ **EU AI법이 최초의 고위험 AI 품질경영 조화표준을 통해 원칙에서 적합성 입증체계로 이동**

  ㅇ 유럽연합 집행위원회는 10월 12일 시행결정 (EU) 2026/2274를 채택하고, 10월 14일 관보에 EN 18286:2026 ‘EU AI법 규제 목적의 AI 품질경영시스템’을 고위험 AI 시스템의 조화표준으로 게재했다.

  - EU AI법 제40조에 따라 관보에 인용된 조화표준의 적용범위에서 이를 충족한 시스템은 관련 법적 요구사항에 대한 적합성이 추정된다. 이번 결정은 품질경영과 사후시장 모니터링을 문서화 가능한 운영절차로 연결한 첫 사례라는 의미가 있다.
    * 출처: [European Commission, Harmonised standards for artificial intelligence](https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/artificial-intelligence-ai_en), 채택 2026.10.12·관보게재 2026.10.14; [EUR-Lex 원문](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202602274), 2026.10.14.

  ㅇ 조화표준은 법 자체를 대체하지 않지만 기업이 위험관리, 변경관리, 책임배분, 사후감시를 어떤 증적으로 입증할지에 관한 공통 경로를 제공한다.

  - EU 시장을 겨냥하는 공급자에게 규제준수는 모델 출시 전 일회성 평가보다 품질경영시스템과 운영로그를 지속 유지하는 문제로 바뀐다. 국내 AI 기업도 제품설계와 동시에 버전·데이터·모델·사건기록을 연결하지 않으면 수출단계에서 추가 재검증 비용을 부담할 가능성이 높다.
    * 출처: [EU AI Act Service Desk, Article 40](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-40), 2026.10.18 확인; [European Commission 시행결정 안내](https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/artificial-intelligence-ai_en), 2026.10.14.

□ **결론 및 시사점**

  ㅇ 국내 정책은 컴퓨트 공급과 산업실증을 확대하고, EU 규제는 운영증적을 표준화하는 상보적 방향으로 움직였다.

  - 공공자원 투입의 효과는 GPU 보유량이나 실증건수보다 유료가동·재사용·민간전환에서 판별해야 한다. 동시에 해외시장 진입을 위해서는 모델·칩 성능과 함께 품질경영, 변경기록, 사후감시를 제품운영의 기본기능으로 설계하는 것이 중요해졌다.
    * 판단 근거: NIPA 국감 발언과 EU 시행결정 (EU) 2026/2274를 종합한 분석.

## 6. 시사점 및 향후 전망

□ **AI 인프라의 성장률과 투자수익률은 점차 분리될 전망**

  ㅇ TSMC·ASML의 실적은 첨단공정 수요를 확인하지만 CoreWeave 채권가격은 모든 인프라 사업자가 같은 조건으로 자본을 조달할 수 없음을 보여준다.

  - 향후 기업가치 격차는 발표된 GPU·MW 규모보다 전력확보의 확정성, 준공진척, 유료가동률, 고객집중도, 차환일정과 단위전력당 매출에서 확대될 가능성이 높다.
    * 근거: TSMC·ASML 공식 실적 및 Reuters의 CoreWeave 채권시장 보도.

□ **에이전틱 AI의 비용경쟁은 모델가격보다 랙·라우팅·업무완료 효율에서 결정**

  ㅇ AMD Helion과 Microsoft Maia 300은 서로 다른 개방성 전략을 취하지만 CPU·가속기·네트워크·전력·냉각을 하나의 시스템으로 최적화한다는 공통점을 가진다.

  - Google의 모델 단가는 중요한 입력값이지만, 실제 비용은 작업당 호출 수, 추론자원 배치, 재시도와 인간검토까지 포함해야 한다. ‘100만 토큰 가격’보다 ‘검증된 업무 1건의 완결비용’이 조달과 운영의 실질 지표가 될 전망이다.
    * 근거: AMD Helion, Microsoft Maia 300, Google Gemini 4 Argon 공식자료.

□ **국산 NPU의 성패는 글로벌 소프트웨어 생태계 안에서의 전환비용으로 판별**

  ㅇ DEEPX의 OpenVINO·Isaac 호환과 엣지에이아이의 컴파일러 공동개발은 성능표보다 도구·모델·배포체계가 상용화 병목임을 보여준다.

  - 공공 실증이 민간 반복구매로 이어지려면 기존 GPU·CPU 환경에서 모델을 옮기는 시간, 지원연산자, 관측·업데이트·롤백, 장기지원비용을 함께 입증해야 한다. 향후 해외 파트너의 SDK 통합과 양산 이후 재주문이 핵심 신뢰신호가 될 것이다.
    * 근거: DEEPX 인터뷰, 엣지에이아이 협력발표, NIPA 지원방향.

□ **AI 규제준수는 문서 제출에서 운영 가능한 품질경영시스템으로 전환**

  ㅇ EU의 EN 18286:2026 인용은 고위험 AI의 적합성 추정이 추상적 윤리원칙이 아니라 지속적인 품질관리와 사후감시 절차에 연결됨을 보여준다.

  - 모델 업데이트가 빈번한 서비스에서는 출시시점 인증보다 버전별 위험평가, 변경승인, 사건로그, 시정조치의 연속성이 중요해진다. 이 체계는 수출규제 대응뿐 아니라 장애원인 분석과 고객 신뢰의 기반으로도 작동할 가능성이 높다.
    * 근거: European Commission 및 EU AI Act Service Desk 공식자료.

## 별첨. 정책 제언(안)

| 구분 | 정책목표 | 실행내용 | 핵심 성과지표(예시) |
|---|---|---|---|
| AI 인프라 투자검증 | 수요성장과 사업자 신용위험을 분리해 건전한 투자를 유도 | 전력확보·인허가·자금조달·준공·가동·유료사용을 구분한 AIDC 단계별 공시와 스트레스테스트 마련 | 예정 대비 준공률, 유료가동률, 고객집중도, 이자보상배율, 차환만기 분산도 |
| 랙 단위 효율평가 | 에이전틱 AI의 실제 전력·비용 효율을 비교 가능한 형태로 측정 | CPU·GPU·NPU·라우터·냉각을 포함해 업무완료당 에너지·비용·지연을 측정하는 공통 시험환경 구축 | 업무완료당 kWh, 성공업무당 비용, P95 지연, 재시도율, 랙 전력활용률 |
| 엣지 AI 운영검증 | 정격 TOPS 중심 평가를 실제 배포 스택 중심으로 전환 | 양자화·서빙SW·응답길이·열지속성·호스트CPU 점유율을 포함한 엣지 VLM 시험규격 마련 | 토큰당 에너지, 지속부하 성능유지율, 열 스로틀링 발생률, CPU 여유율 |
| 국산 NPU 상호운용 | 글로벌 런타임과의 통합비용을 낮춰 반복구매 촉진 | OpenVINO·ROCm·주요 로봇 SDK·모델서빙과의 호환성, 업데이트·롤백·통합관측을 검증하는 공개 레퍼런스 구축 | 지원모델·연산자 수, 모델이전 소요일, SLO 충족률, 현장 반복구매율, 해외 배치건수 |
| 공공 컴퓨트 성과관리 | GPU 확보량을 산업·연구 성과와 연결 | 배정·실사용·대기·유휴·과제종료 후 재배분을 추적하고 NPU 실증의 민간전환을 연계평가 | 자원가동률, 대기시간, 과제당 GPU시간, 민간전환율, 후속매출·투자액 |
| EU AI법 수출대응 | 고위험 AI의 조화표준 기반 적합성 입증역량 확보 | EN 18286:2026을 기준으로 품질경영·변경관리·사후시장감시·사건증적을 시험하는 지원체계 구축 | 적합성 시험통과율, 변경기록 완전성, 사건보고시간, 시정조치 완료기간, EU 진출제품 수 |
