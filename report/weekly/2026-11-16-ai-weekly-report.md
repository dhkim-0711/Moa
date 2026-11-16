# AI 주간 동향보고서

> 분석기간: 2026년 11월 9일~11월 15일 | 발간일: 2026년 11월 16일

## 1. 시장동향

□ **AI 인프라 수요가 범용 학습클러스터에서 추론 목적별 전용 시스템으로 세분화**

  ㅇ Rackspace와 Together AI는 11월 10일 NVIDIA GB300 NVL72와 Spectrum-X 기반의 전용 추론 인프라를 Rackspace가 구축·운영하고 Together AI가 관리형 AI 플랫폼을 제공하는 다년간 전략계약을 발표했다.

  - 실제 배치는 일정 조건 충족을 전제로 2027년에 계획돼 있으며, 공동 판매 구상은 구속력 없는 의향서 단계다. 그럼에도 장비 구매뿐 아니라 전력·액체냉각·네트워크·스토리지·운영책임을 묶은 전용용량 계약이 등장했다는 점은 기업 추론시장이 장기 운영계약으로 발전하고 있음을 보여준다.
    * 출처: [Rackspace, “Rackspace and Together AI Announce Strategic Agreement to Support Enterprise AI Inference”](https://ir.rackspace.com/news-releases/news-release-details/rackspace-and-together-ai-announce-strategic-agreement-support), 사건·발표 2026.11.10.

  ㅇ Google이 11월 9일 공개한 TPU 8tx와 TPU 8i Max는 각각 기밀 추론·소규모 학습과 대용량 문맥·고밀도 추론을 겨냥한다. Google은 8세대 TPU를 학습용 8t, 저지연 추론용 8i, 기밀컴퓨팅용 8tx, 고밀도용 8i Max로 세분화하고 TPU 고객이 약 100곳이라고 밝혔다.

  - 고객 수와 성능은 공급사 발표이지만, 동일 세대에서도 보안·메모리·지연·랙밀도를 기준으로 제품군이 나뉜 것은 조달단위가 ‘가속기 수량’에서 ‘워크로드별 시스템 조합’으로 이동하고 있음을 시사한다.
    * 출처: [Google Cloud, “Our newest TPUs: 8tx and 8i Max, built for the agentic era”](https://cloud.google.com/blog/topics/ai-infrastructure/tpu-8tx-and-tpu-8i-max), 사건·발표 2026.11.09.

□ **AI 데이터센터 시장의 희소자원이 반도체에서 전력계통 접속과 입지 승인으로 확대**

  ㅇ 기후에너지환경부는 11월 15일 수도권 데이터센터의 전력계통영향평가 통과점수를 70점에서 75점으로 높이고, 전력이용밀도가 높은 지역에는 5점을 감점하는 고시를 발표했다. 고시는 11월 16일부터 시행되며 시범운영 기간 데이터센터 심의는 수도권 28건·1.9GW, 비수도권 64건·7GW였다.

  - 이번 제도는 10MW 이상 대규모 전력사용시설의 수도권 입지비용과 일정위험을 높이고, 비수도권의 전력여유를 시장진입 자산으로 바꾼다. 평가서 양도·이전 금지와 원칙적 1년 유효기간은 전력용량을 선점하는 허수사업의 기대가치도 낮출 수 있다.
    * 출처: [기후에너지환경부, 「대규모 전력수요의 합리적 분산을 위한 전력계통영향평가 제도 본격 시행」](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156789255&pWise=mSub&pWiseSub=C3), 발표 2026.11.15·시행 2026.11.16.

  ㅇ 국제에너지기구(IEA)는 10월 14일 보고서에서 하이퍼스케일러의 2026년 자본지출이 7,000억 달러를 넘을 것으로 전망했고, 데이터센터와 전력망 통합 관련 정책·규정 134건을 34개 관할권에서 확인했다.

  - 이 수치는 이번 주 신규 사건은 아니지만 시장 배경을 제공한다. 연산설비 투자와 계통규율이 동시에 확대되면서 프로젝트 경쟁력은 GPU 확보보다 전력인입 확정, 냉각설비, 입지허가와 유료가동 시점의 결합에 더 민감해지고 있다.
    * 출처: [IEA, *Powering Artificial Intelligence: Executive Summary*](https://www.iea.org/reports/powering-artificial-intelligence/executive-summary), 보고서 발간 2026.10.14.

□ **결론 및 시사점**

  ㅇ 이번 주 시장은 AI 인프라가 단일 학습클러스터의 확장경쟁에서 보안·문맥길이·지연·운영책임을 기준으로 한 추론시스템 시장으로 분화하고 있음을 보여준다.

  - 동시에 전력계통 심사가 실제 입지와 가동일정을 좌우하면서, 장비계약만으로 공급능력을 평가하기 어려워졌다. 시장가치는 발표된 연산량보다 전력·냉각·네트워크가 연결된 상태에서 유료 추론을 지속 제공하는 능력으로 이동할 전망이다.
    * 판단 근거: Rackspace–Together AI 계약, Google TPU 포트폴리오, 기후에너지환경부 고시와 IEA 전력·투자자료를 종합한 분석.

## 2. 기술동향

□ **오픈소스 추론엔진이 단일 프로젝트에서 멀티벤더 공동 최적화의 중립계층으로 확대**

  ㅇ LMSYS는 11월 12일 NVIDIA·AMD·Intel·Google·Meta·Cloudflare·Modal·RadixArk가 참여하는 SGLang 컨소시엄을 출범시켰다. 기술 의사결정과 코드 수용권한은 기존 유지관리자가 보유하고, 회원사는 연 2회 로드맵 회의와 기술대표 참여를 통해 프론티어 모델·추론·하드웨어 최적화 과제를 논의한다.

  - 서로 경쟁하는 가속기·클라우드 사업자가 같은 추론엔진에 참여한 것은 모델 제공계층과 하드웨어 사이의 실행소프트웨어가 독립적인 성능·이식성 시장으로 커졌다는 의미다. 다만 컨소시엄 출범은 향후 협업구조이며, 모든 하드웨어에서 동일한 성능이나 기능호환이 이미 확보됐다는 뜻은 아니다.
    * 출처: [LMSYS, “LMSYS Org Launches SGLang Consortium”](https://www.lmsys.org/blog/2026-11-12-sglang-consortium/), 사건·발표 2026.11.12; [SGLang Documentation](https://sgl-project.github.io/), 2026.11.16 확인.

  ㅇ SGLang은 NVIDIA·AMD·Intel Xeon·Google TPU·Ascend 등 여러 플랫폼을 지원한다고 제시한다. 향후 차별화는 단순 실행가능성보다 모델별 최적화 반영속도, KV 캐시 효율, 분산추론의 꼬리지연과 장애복구에서 나타날 가능성이 높다.

  - 공급사별 컴파일러와 커널을 공통 서빙계층에 연결하면 고객의 모델이전비용을 낮출 수 있지만, 가장 빠른 경로가 특정 하드웨어에 종속될 가능성은 남는다. 개방형 거버넌스와 실제 회귀시험 범위가 중립성의 실질을 결정한다.
    * 출처: [SGLang 프로젝트 문서](https://sgl-project.github.io/), 지원 플랫폼·기능 2026.11.16 확인; [LMSYS 컨소시엄 발표](https://www.lmsys.org/blog/2026-11-12-sglang-consortium/), 2026.11.12.

□ **에이전트 운영기술이 모델 모니터링에서 단계별 추적·비용·데이터접근 통제로 확장**

  ㅇ Google Cloud는 11월 13일 BigQuery·Looker의 에이전트 관측·평가기능을 확대했다. 자사 데이터 에이전트뿐 아니라 ADK·LangGraph 기반 외부 에이전트의 구조화 텔레메트리를 고객 소유 BigQuery 테이블에 저장하고, 세션·지연·토큰·지식원천·사용자 피드백을 분석하도록 설계했다.

  - 대화로그와 API가 정식 제공 단계에 들어갔고 감사로그, VPC Service Controls, 고객관리 암호키와 데이터 레지던시를 결합했다. 이는 에이전트 운영의 최소단위가 최종 응답 성공률에서 각 도구호출과 데이터접근의 추적·비용귀속으로 바뀌고 있음을 보여준다.
    * 출처: [Google Cloud, “Enterprise AI agent observability with BigQuery and Looker”](https://cloud.google.com/blog/products/data-analytics/enterprise-ai-agent-observability-with-bigquery-and-looker/), 사건·발표 2026.11.13.

  ㅇ AWS는 11월 12일 기업용 에이전트를 이해–계획–검색–추론–행동·관찰의 순환구조로 나누고, 단계별 지연·토큰·도구상태·실행경로를 추적하는 참조아키텍처를 공개했다.

  - 두 발표의 공통점은 비결정적 에이전트를 일반 API처럼 요청·응답만 관찰해서는 원인분석과 감사가 어렵다는 인식이다. 향후 운영성숙도는 답변평가뿐 아니라 작업 그래프 재현, 정책위반 차단, 테넌트별 원가와 인간승인 이력을 함께 다루는 능력으로 구분될 전망이다.
    * 출처: [AWS Architecture Blog, “Inside an enterprise AI agent: A governed, observable loop architecture”](https://aws.amazon.com/blogs/architecture/inside-an-enterprise-ai-agent-a-governed-observable-loop-architecture/), 발표 2026.11.12.

□ **가속기 기술이 피크연산보다 기밀성·메모리대역폭·분업형 추론구조를 중심으로 재설계**

  ㅇ Google의 TPU 8tx는 5세대 AMD EPYC 호스트 CPU와 결합해 하드웨어 기반 기밀컴퓨팅을 제공하고, TPU 8i Max는 두 개의 8i 칩을 한 패키지에 결합해 8i 대비 연산량·SRAM·HBM 대역폭을 각각 두 배로 늘렸다고 회사가 밝혔다.

  - 성능배수는 공급사 수치로 독립검증이 필요하지만, 규제산업의 모델·데이터 보호와 장문맥 에이전트의 메모리 병목이 별도 하드웨어 제품을 만드는 단계에 이르렀다는 점이 중요하다.
    * 출처: [Google Cloud](https://cloud.google.com/blog/topics/ai-infrastructure/tpu-8tx-and-tpu-8i-max), 사건·발표 2026.11.09; [AMD, “AMD EPYC Expands Its Leadership at the Foundation of AI”](https://newsroom.amd.com/), 호스트 CPU 발표 2026.11.09.

  ㅇ NVIDIA·Rebellions·SK텔레콤은 GPU가 프리필을, NPU가 디코드를 담당하는 분리형 추론구조를 계획했다. 긴 입력을 병렬처리하는 단계와 토큰을 순차 생성하는 단계의 연산특성이 다르다는 점을 이용해 이기종 자원을 배치하는 접근이다.

  - 실제 효율은 GPU–NPU 사이의 KV 캐시 이동, 인터커넥트 지연, 배치 크기, 모델지원과 장애전환에 좌우된다. 발표자료에는 통합 벤치마크가 없고 R200 기반 시스템 배치는 2028년 목표이므로 현재 단계는 설계·검증계획으로 봐야 한다.
    * 출처: [NVIDIA Investor Relations](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Rebellions-and-SK-Telecom-Announce-Collaboration-to-Advance-Sovereign-AI-Infrastructure-With-NVIDIA-NVLink-Fusion/default.aspx), 발표 2026.11.09; [SK텔레콤 뉴스룸](https://news.sktelecom.com/232944), MOU 체결 2026.11.09.

□ **결론 및 시사점**

  ㅇ 기술경쟁은 모델·칩의 단일 벤치마크에서 멀티벤더 추론엔진, 기밀컴퓨팅, 메모리계층과 에이전트 실행추적을 결합한 운영스택으로 이동했다.

  - SGLang은 개방형 실행계층을, Google·AWS는 운영·감사계층을, Google TPU와 GPU–NPU 분리추론은 워크로드별 하드웨어 배치를 각각 강화한다. 기술성숙도는 발표된 최고성능보다 실제 모델 이식시간, P95 지연, 장애복구, 로그 완전성과 업무완료당 비용·전력으로 판별될 전망이다.
    * 판단 근거: LMSYS, Google Cloud, AWS, NVIDIA·Rebellions·SK텔레콤 공식자료를 운영기술 관점에서 종합한 분석.

## 3. 기업동향

□ **Rebellions·SK텔레콤, 국산 NPU를 NVIDIA 랙스케일 생태계에 연결하는 공동검증 경로 확보**

  ㅇ Rebellions·SK텔레콤·NVIDIA는 11월 9일 NVIDIA AI Day Seoul에서 NVLink Fusion과 MGX 랙 구조를 활용한 AI 인프라 협력 MOU를 발표했다. Rebellions는 차세대 R200 NPU의 연계를, SK텔레콤은 자사 AI 데이터센터에서 시스템 배치·검증과 모델·서비스 적용을 계획했다.

  - 이 협력은 국산 NPU가 독립형 서버로만 경쟁하기보다 NVIDIA의 네트워크·랙·소프트웨어 생태계 안에서 디코드 가속기로 진입하는 경로를 제시한다. 그러나 R200 시스템은 2028년 배치 목표이며 고객물량·통합성능·상용가동은 아직 공개되지 않았다.
    * 출처: [NVIDIA Investor Relations](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Rebellions-and-SK-Telecom-Announce-Collaboration-to-Advance-Sovereign-AI-Infrastructure-With-NVIDIA-NVLink-Fusion/default.aspx), 발표 2026.11.09; [과학기술정보통신부](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156788455&pWiseMinistry=ministryNews&repCode=A00033&repCodeType=%EC%A0%95%EB%B6%80%EB%B6%80%EC%B2%98), 지원내용 발표 2026.11.09.

□ **DEEPX, 전용 SDK 중심에서 Intel OpenVINO·x86 호스트와의 호환성 검증으로 확장**

  ㅇ DEEPX와 Intel Korea는 11월 12일 업무협약을 체결하고 OpenVINO와 DEEPX NPU의 연동·최적화, 피지컬·엣지 AI 플랫폼, 시스템 아키텍처 검증과 DX-M2 기반 생성형 AI 솔루션을 검토하기로 했다. 사건은 11월 12일, 회사발표와 보도는 11월 13일 이뤄졌다.

  - 별도로 DEEPX·Intel Korea·KTNF는 NPU·CPU 기반 온프레미스 추론서버 협력 MOU를 맺었다. x86이 호스트·제어를, NPU가 인지·추론을 담당하는 구조는 기존 서버·로봇 개발환경에 NPU를 보조가속기로 넣으려는 전략이다.
    * 출처: [전자신문, 「딥엑스, 인텔 오픈비노에 NPU 연동 추진」](https://www.etnews.com/20261113000100), 사건 2026.11.12·보도 2026.11.13; [Herald Business](https://mbiz.heraldcorp.com/article/10936547), 보도 2026.11.13.

  ㅇ 현재 확인된 성과는 연동·최적화와 실증을 추진하는 MOU이며 OpenVINO 정식배포판 통합, 지원모델 범위, 처리량·지연·전력 또는 판매계약은 공개되지 않았다.

  - 사업화의 핵심은 데모보다 모델변환 성공률, 미지원 연산자의 처리, OpenVINO 버전변경 대응과 현장장비의 장기지원이다. 이 지표가 확보돼야 인텔 CPU 생태계와의 결합이 개발비용 절감으로 이어질 수 있다.
    * 판단 근거: DEEPX–Intel Korea 협력범위와 공개된 사업단계를 비교한 분석. 출처: [연합뉴스](https://www.yna.co.kr/amp/view/AKR20261113048500017), 발표 보도 2026.11.13.

□ **국내 AI 기업의 성장경로가 단일 투자유치에서 글로벌 플랫폼·공공정책의 결합으로 확대**

  ㅇ 과학기술정보통신부와 NVIDIA는 11월 9일 20여 개 국내 스타트업이 참가한 파트너십 포럼을 열었다. NVIDIA는 Point2 투자를 발표했고 Motif Technologies·RLWRLD·Upstage에는 추가 투자를 계획한다고 밝혔다.

  - Point2의 투자와 나머지 3개사의 투자계획은 완료단계가 다르다. 그럼에도 자본, 기술지원, 글로벌 판매접점을 묶는 방식은 국내 스타트업의 해외진입경로가 개별 고객개척에서 플랫폼 생태계 편입으로 이동하는 사례다.
    * 출처: [NVIDIA Blog, “NVIDIA Announces New Planned Investments in Korean Startups”](https://blogs.nvidia.com/blog/korean-startup-investments-msit/), 사건·발표 2026.11.09.

□ **결론 및 시사점**

  ㅇ 국내 AI 반도체 기업은 독립형 칩의 사양경쟁에서 NVLink·MGX·OpenVINO·x86 등 기존 글로벌 플랫폼과 연결되는 보완가속기 전략으로 이동했다.

  - 플랫폼 접속은 고객의 도입장벽을 낮추지만 특정 사업자의 로드맵과 인증절차에 대한 의존도도 높인다. 기업성과는 MOU 수보다 정식 소프트웨어 통합, 독립 성능검증, 반복수주, 현장 가동률과 장기지원 계약으로 확인될 전망이다.
    * 판단 근거: Rebellions·SK텔레콤·NVIDIA, DEEPX·Intel Korea, NVIDIA 스타트업 포럼 자료의 사업단계를 비교한 분석.

## 4. 글로벌 빅테크 동향

□ **Google, 8세대 TPU를 기밀성·메모리밀도 기준으로 세분화하며 자체가속기 시장 확대**

  ㅇ Google은 11월 9일 TPU 8tx와 TPU 8i Max를 공개했다. 8tx는 사용 중인 데이터와 모델가중치를 하드웨어에서 격리하는 기밀컴퓨팅을, 8i Max는 두 개의 8i 칩을 한 패키지로 구성해 대용량 문맥의 메모리 병목 완화를 겨냥한다.

  - 8tx는 동일 기반의 TPU 8t보다 최대 2배 낮은 지연을 거의 없는 성능손실로 제공하고, 8i Max는 8i 대비 연산·SRAM·HBM 대역폭을 두 배로 제공한다는 것이 회사 설명이다. 실제 고객 워크로드와 독립 비교는 추가 검증이 필요하다.
    * 출처: [Google Cloud](https://cloud.google.com/blog/topics/ai-infrastructure/tpu-8tx-and-tpu-8i-max), 사건·발표 2026.11.09; [Reuters](https://www.reuters.com/business/google-to-introduce-two-variants-its-in-house-chips-bloomberg-news-reports-2026-11-09/), 보도 2026.11.09.

□ **Google, 고난도 장기작업용 Gemini 4 Carbon을 출시하고 다중에이전트 조정기능을 예고**

  ㅇ Google은 11월 10일 Gemini 4 Carbon을 개발자·기업·과학자·소비자에게 공개했다. Carbon은 장기 에이전틱 워크플로우, 소프트웨어·과학 추론과 사이버보안을 겨냥하며, 일반 지식·소프트웨어 작업에는 기존 Argon을 권장한다고 구분했다.

  - 유료 API의 출시가격은 입력 100만 토큰당 2달러, 출력 100만 토큰당 10달러이며 11월 30일 이후 각각 4달러와 20달러가 적용될 예정이다. Google Antigravity의 `/swarm`은 하나의 지시에서 여러 격리 작업공간의 에이전트를 조정하는 미리보기 기능이다.
    * 출처: [Google, “Gemini 4 Carbon is now available”](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/), 사건·발표 2026.11.10; [Google Korea](https://blog.google/intl/ko-kr/company-news/technology/gemini-4-carbon-now-available-kr/), 한국어 발표 2026.11.10.

  ㅇ 회사가 제시한 벤치마크와 공격경로 차단률은 공급사 평가이므로 실제 기업업무의 정확도·지연·비용과 분리해 봐야 한다.

  - 기술적 의미는 단일 에이전트의 답변성능보다 역할분담·검증·격리공간을 묶는 조정계층이 상용 모델제품에 들어온 점이다. 경쟁은 모델 호출가격뿐 아니라 병렬 작업의 실패전파, 감사가능성과 총작업비용으로 이동할 수 있다.
    * 판단 근거: Google의 제품설명·가격·기능상태를 비교한 분석. 출처: [Google 공식 발표](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/), 2026.11.10.

□ **NVIDIA, 한국에서 인터커넥트 표준·스타트업 투자·공공협력을 하나의 생태계 전략으로 결합**

  ㅇ NVIDIA는 Rebellions·SK텔레콤과 NVLink Fusion 협력을 발표한 날 Point2 투자 및 3개 스타트업 추가 투자계획도 공개했다. 회사는 NVIDIA Inception의 한국 회원사가 1,000곳을 넘는다고 밝혔다.

  - NVIDIA의 전략은 GPU 판매를 넘어 국산 NPU를 자사 인터커넥트·랙 구조에 연결하고, 모델·로봇·반도체 스타트업을 개발자 생태계에 편입하는 방식이다. 개방형 연결을 제공하면서도 네트워크·관리도구·검증체계의 중심을 유지하는 플랫폼 확장으로 해석된다.
    * 출처: [NVIDIA Blog](https://blogs.nvidia.com/blog/korean-startup-investments-msit/), 발표 2026.11.09; [NVIDIA Investor Relations](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Rebellions-and-SK-Telecom-Announce-Collaboration-to-Advance-Sovereign-AI-Infrastructure-With-NVIDIA-NVLink-Fusion/default.aspx), 발표 2026.11.09.

□ **결론 및 시사점**

  ㅇ 글로벌 빅테크의 경쟁단위는 모델·가속기 단품에서 목적별 하드웨어, 다중에이전트 실행환경과 지역 생태계 통합으로 확대됐다.

  - Google은 자체 모델과 TPU의 워크로드 세분화를 강화하고, NVIDIA는 외부 NPU와 스타트업을 자사 시스템 경계 안으로 끌어들인다. ‘개방성’은 공급사 교체 가능성보다 여러 하드웨어·모델을 누가 공통 제어면에서 연결하고 운영데이터를 확보하는가의 경쟁으로 재정의될 가능성이 높다.
    * 판단 근거: Google의 Carbon·TPU 공식발표와 NVIDIA의 한국 협력·투자 발표를 종합한 분석.

## 5. 정책·규제동향

□ **한국, K-온디바이스 AI 반도체 사업을 2030년까지 10개 칩·IP 실증 로드맵으로 구체화**

  ㅇ 산업통상부는 11월 12일 AI 반도체 M.AX 얼라이언스 총회에서 6월 착수한 8,002억 원 규모 K-온디바이스 AI 반도체 기술개발 프로젝트의 로드맵을 발표했다.

  - 2030년까지 자율주행차 1종, 스마트가전 3종, 협동로봇·휴머노이드·농업로봇·무인드론 각 1종과 첨단공정·극한환경 IP 각 1종 등 총 10개 칩·IP를 개발·검증한다. 스마트가전용 칩 1종은 당초보다 1년 이상 제조시점을 앞당겼다고 정부가 밝혔다.
    * 출처: [산업통상부, 「K-온디바이스 AI반도체, ‘상생’으로 속도낸다」](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156788895&pWise=mSub&pWiseSub=C3), 사건·발표 2026.11.12; [대한민국 정책브리핑](https://www.korea.kr/news/policyNewsView.do?newsId=148975587), 보도 2026.11.12.

  ㅇ 연차별 계획을 검토하고 기술·사업화 문제를 조정하는 민관 전략위원회도 신설됐다.

  - 정책대상이 범용 NPU 수치경쟁보다 자동차·가전·로봇·드론의 수요기업 검증으로 이동한 것은 긍정적이다. 다만 칩 제작완료와 제품탑재·양산·수출은 다른 단계이므로 성과판단에서도 분리할 필요가 있다.
    * 판단 근거: 산업통상부가 공개한 품목별 개발·검증 범위와 추진체계를 사업화 단계별로 분석.

□ **한국, 수도권 데이터센터의 계통영향 통과기준을 높여 전력입지를 산업정책 수단으로 전환**

  ㅇ 기후에너지환경부가 11월 15일 발표한 고시는 수도권 데이터센터 통과점수를 75점으로 차등화하고, 전력이용밀도 감점항목을 신설했다. 심의결과 통보 전인 기존 신청에도 새 기준이 적용된다.

  - 정부는 2026년 말 세부 매뉴얼, 2027년 초 종합정보지원시스템을 마련할 계획이다. 제도효과는 지방분산 건수뿐 아니라 실제 전력인입·통신망·고용·가동률로 판단해야 하며, 지역의 계통여유가 장거리 통신지연과 추가망비용을 상쇄하는지가 핵심이다.
    * 출처: [기후에너지환경부](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156789255&pWise=mSub&pWiseSub=C3), 발표 2026.11.15·시행 2026.11.16; [연합뉴스](https://www.yna.co.kr/view/AKR20261114043000530), 제도 보도 2026.11.15.

□ **프론티어 AI 국제협력이 선언적 안전원칙에서 평가표준·사고보고·조기경보 체계로 구체화**

  ㅇ 프랑스 등 정부와 Anthropic·Cohere·Hugging Face·Microsoft·Mistral AI·OpenAI 등 기업은 11월 9일 파리 AI 안전·보안 선언에 서명했다. 선언은 공통 평가·위험관리 틀, 비민감 평가결과의 표준형식 공개, 역할별 책임성과 심각한 사고의 정보공유·조기경보를 주요 축으로 제시했다.

  - 법적 구속력이 확인된 규정은 아니지만, 모델 역량·한계·위험 공개, 독립평가 지원, 훈련·내부사용을 포함한 중단장치와 내부 연구자 보호를 기업 책무로 명시했다. 향후 각국 규제와 조달기준이 공통 평가형식에 수렴할 가능성을 높인다.
    * 출처: [Élysée, “Paris Call for AI safety and security”](https://www.elysee.fr/en/emmanuel-macron/2026/11/09/paris-call-for-ai-safety-and-security), 사건·발표 2026.11.09; [Government of the Netherlands](https://www.government.nl/documents/2026/11/10/paris-declaration-on-ai-safety-and-security), 문서 게시 2026.11.10.

□ **NIST, 적대적 머신러닝 분류체계를 에이전틱 시스템의 공격수명주기까지 확대**

  ㅇ 미국 NIST는 11월 9일 ‘Adversarial Machine Learning: A Taxonomy and Terminology’ 초안을 공개하고 12월 18일까지 의견을 받기 시작했다.

  - 초안은 공격목표·역량·지식뿐 아니라 에이전틱 시스템의 공격수명주기와 완화방법을 공통언어로 정리한다. 아직 공개초안이지만, 에이전트 보안평가가 프롬프트 공격만이 아니라 계획·도구사용·메모리·행동결과의 연쇄를 다루는 기준으로 확장될 수 있다.
    * 출처: [NIST CSRC, “Adversarial Machine Learning Taxonomy and Terminology | Draft”](https://csrc.nist.gov/News/2026/adversarial-machine-learning-taxonomy-2026-draft), 초안 공개 2026.11.09·의견마감 2026.12.18.

□ **결론 및 시사점**

  ㅇ 정책은 산업육성과 안전규제를 별개로 다루기보다 칩 실증, 데이터센터 전력입지, 모델평가와 에이전트 보안을 측정 가능한 운영요건으로 전환하고 있다.

  - 한국은 수요산업별 칩 검증과 계통영향을 공급정책에 연결하고, 국제사회와 NIST는 평가·사고보고·공격분류의 공통기준을 구체화한다. 정책 신뢰성은 발표된 예산·서명국 수보다 양산·가동성과와 평가결과의 비교가능성에서 결정될 전망이다.
    * 판단 근거: 산업통상부·기후에너지환경부, 파리 선언과 NIST 공식자료를 종합한 분석.

## 6. 시사점 및 향후 전망

□ **국산 NPU의 시장진입은 GPU 대체보다 이기종 분업과 기존 생태계 호환에서 먼저 확대될 전망**

  ㅇ Rebellions의 NVLink Fusion 계획과 DEEPX의 OpenVINO 연동은 국산 NPU가 프리필–디코드 분업, CPU–NPU 역할분담과 기존 개발도구 호환을 통해 진입하려는 공통경로를 보여준다.

  - 상용화의 분기점은 칩 피크성능이 아니라 모델이전, KV 캐시 이동, 미지원 연산자, 장애전환과 장기 소프트웨어 유지비용이다. 2028년 배치계획과 MOU를 현재 매출·가동성과로 해석하지 않는 단계관리가 중요하다.
    * 판단 근거: Rebellions·SK텔레콤·NVIDIA 및 DEEPX·Intel Korea 발표의 기술구조와 성숙도를 비교한 분석.

□ **에이전트 인프라는 추론자원보다 관측·격리·승인·비용귀속을 제공하는 제어면이 차별화요소가 될 전망**

  ㅇ Google Cloud와 AWS가 같은 주에 단계별 텔레메트리와 통제형 참조구조를 제시하고, Google이 다중에이전트 기능을 미리보기로 공개한 것은 에이전트의 운영문제가 제품경쟁의 중심으로 이동했음을 보여준다.

  - 기업채택은 최종 정답률과 토큰단가만으로 결정되기 어렵다. 실행그래프 재현, 데이터 접근증적, 도구권한, 인간승인, 실패한 병렬작업의 격리와 업무완료당 총비용이 실제 운영품질을 구분할 가능성이 높다.
    * 판단 근거: Google Cloud 관측기능, AWS 참조아키텍처와 Gemini 4 Carbon의 다중에이전트 기능을 종합한 분석.

□ **AI 인프라의 개방형 생태계가 확대되지만 제어면 집중은 오히려 강화될 수 있음**

  ㅇ SGLang 컨소시엄과 NVLink Fusion은 여러 하드웨어를 연결하고 개발자의 선택지를 넓힌다.

  - 그러나 성능커널, 인터커넥트, 관리도구와 텔레메트리를 누가 지배하는가에 따라 전환비용이 남는다. 향후 개방성은 지원업체 수가 아니라 동일 모델의 이동시간, 데이터·로그의 반출성, 독립 스케줄러 사용과 장애 시 대체경로로 평가될 전망이다.
    * 판단 근거: SGLang 거버넌스, NVLink Fusion 구조와 Google의 운영계층 발표를 비교한 분석.

□ **전력계통과 AI 안전평가가 기술 외부의 제약이 아니라 시장접근의 선행조건으로 전환**

  ㅇ 수도권 계통영향 기준 강화는 데이터센터 가동을, 파리 선언과 NIST 초안은 프론티어 모델·에이전트의 평가와 사고대응을 각각 시장진입 조건으로 끌어올린다.

  - 인프라 사업자는 전력인입·지역수용성과 모델평가·실행증적을 제품설계 초기에 함께 고려해야 하는 구조에 놓인다. 이는 단기 개발비를 늘리지만 비교 가능한 안전·효율 데이터가 축적되면 조달과 보험, 규제대응 비용을 낮추는 기반이 될 수 있다.
    * 판단 근거: 기후에너지환경부 고시, 파리 AI 안전·보안 선언과 NIST 초안의 적용방향을 종합한 분석.

## 별첨. 정책 제언(안)

| 구분 | 정책목표 | 실행내용 | 핵심 성과지표(예시) |
|---|---|---|---|
| 이기종 AI 인프라 | 국산 NPU의 글로벌 시스템 호환성과 상용성 검증 | GPU 프리필–NPU 디코드, CPU–NPU 분업을 동일 모델·데이터·전력조건에서 검증하고 장애전환·KV 캐시 이동을 포함한 결과 공개 | 지원모델 수, 모델이전시간, P95 지연, KV 캐시 전송시간, 장애복구시간, 업무당 전력 |
| 추론 소프트웨어 | 멀티벤더 오픈소스 추론계층의 지속가능성 확보 | SGLang·OpenVINO 등 상위 프로젝트의 버전변경 대응, 회귀시험, 보안패치와 장기 유지보수 참여 지원 | 상위버전 호환기간, 코드병합 유지율, 미지원 연산자 수, 회귀결함 해결시간 |
| 에이전트 운영 | 에이전트 행동의 추적성·비용통제·감사가능성 확보 | 단계별 실행그래프, 데이터접근, 토큰·도구비용, 인간승인·중단·재실행을 공통 관측항목으로 정립 | 추적완전성, 작업재현률, 권한초과 차단률, 중단복구시간, 업무완료당 총비용 |
| AI 데이터센터 | 전력계통 분산과 실제 지역가동 성과의 연계 | 계통영향평가 이후 전력인입·통신망·준공·유료가동과 지역고용을 연계 관리하고 허수사업을 지속 정비 | 전력인입률, 심의소요기간, 비수도권 유료가동률, 계통보강비용, 지역고용 |
| 온디바이스 AI 반도체 | 개발품을 수요산업의 양산·수출로 연결 | 10개 칩·IP 과제에 수요기업 현장검증, 안전·전력 기준, 양산전환과 반복구매 단계를 연계 | 현장검증 통과율, 제품탑재 건수, 양산전환율, 반복구매액, 수출계약액 |
| AI 안전·보안 | 국제적으로 비교 가능한 모델·에이전트 평가체계 구축 | NIST 분류와 국제 평가·사고보고 논의를 반영해 공개 가능한 결과형식, 심각도 분류, 조기경보와 독립평가 절차를 정립 | 평가결과 공개율, 독립검증 비율, 사고보고시간, 분류일치율, 시정조치 완료율 |
