# AI 주간 동향보고서

> 분석기간: 2026년 11월 16일~11월 22일 | 발간일: 2026년 11월 23일

## 1. 시장동향

□ **AI 인프라 수요가 고성장을 유지하는 가운데 공급능력 확보가 장기계약 중심으로 전환**

  ㅇ NVIDIA는 11월 17일 2027회계연도 3분기 매출 1,158억 달러를 발표했다. 데이터센터 매출은 1,076억 달러로 전년 동기 대비 110% 증가해 전체 매출의 약 93%를 차지했다.

  - 대형 AI 인프라 수요가 회사 실적에서 다시 확인됐지만, 매출이 데이터센터에 집중된 만큼 고객의 투자주기·전력확보·수출규제 변화가 공급사 실적에 미치는 영향도 커졌다.
    * 출처: [NVIDIA, “NVIDIA Announces Financial Results for Third Quarter Fiscal 2027”](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2027), 실적기간 2026.07.27~2026.10.25·발표 2026.11.17.

  ㅇ 같은 날 NVIDIA는 기판·첨단패키징·조립 분야의 장기 공급계약을 확대했다고 발표했다. Kinsus·삼성전기와 기판능력을 늘리고, Amkor·SPIL과 패키징능력을 확대하며, Foxconn의 글로벌 생산망을 차세대 GPU·네트워크 플랫폼에 활용하는 구조다.

  - Amkor와의 다년 계약은 2026년 7월·10월 발표분을 합쳐 약 30억 달러이며, Vera Rubin NVL72와 Vera CPU는 3분기에 양산 출하를 시작했다고 회사가 밝혔다. 시장경쟁이 칩 설계에서 기판·CoWoS·패키징·시스템 조립의 선제 확보로 이동한 사례다.
    * 출처: [NVIDIA, “NVIDIA Expands Commitments With Supply Chain Partners to Support AI Infrastructure Buildout”](https://nvidianews.nvidia.com/news/nvidia-expands-commitments-with-supply-chain-partners-to-support-ai-infrastructure-buildout), 발표 2026.11.17.

□ **데이터센터 시장의 경쟁단위가 서버 조달에서 전력설비·계통평가·지역 인프라로 확대**

  ㅇ SK텔레콤과 효성중공업은 11월 16일 GW급 AI 데이터센터를 위한 전략적 MOU를 체결했다. 협력범위는 345kV 변전소, 전력기기, 직류배전과 데이터센터 설계·구축·운영을 포함한다.

  - 이번 발표는 시설가동이나 수주확정이 아닌 협력계획이지만, 통신사업자의 데이터센터 운영역량과 전력기기 기업의 제조·엔지니어링을 초기설계부터 결합하려는 구조다. AI 데이터센터의 납기와 원가가 GPU보다 계통연계와 전력변환설비에 좌우되는 비중이 커졌음을 보여준다.
    * 출처: [SK텔레콤 뉴스룸, 「SKT, 효성중공업과 GW급 AI 데이터센터 구축 맞손」](https://news.sktelecom.com/233113), MOU·발표 2026.11.16.

  ㅇ 정부는 11월 20일 비수도권의 계약전력 50MW 이하 AIDC를 전력계통영향평가에서 면제하고, AIDC 특구의 비기술적 평가를 면제하며, 메가프로젝트·인허가 일괄처리 대상에는 우선평가를 적용하는 방안을 입법예고했다.

  - 수도권의 75점 통과기준을 높인 11월 16일 고시와 비수도권의 특례를 결합하면 입지별 규제비용 차이가 확대된다. 다만 하위법령은 입법예고 단계이고 특구 간소화에는 고시개정이 필요하므로 즉시 적용되는 확정혜택과 구분해야 한다.
    * 출처: [과학기술정보통신부·기후에너지환경부, 「AI 데이터센터 신속 구축을 위한 전력계통영향평가 제도 개선 추진」](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156790061), 입법예고·발표 2026.11.20; [기후에너지환경부, 「전력계통영향평가 제도 본격 시행」](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156789255), 고시 시행 2026.11.16.

□ **결론 및 시사점**

  ㅇ AI 시장은 가속기 수요의 절대규모가 커지는 동시에 반도체 공급망과 전력 인프라를 장기간 선점하는 자본집약 산업으로 전환됐다.

  - NVIDIA의 실적은 수요강도를 보여주고, 기판·패키징 계약과 국내 전력설비 협력은 공급능력이 GPU 출하량만으로 결정되지 않음을 보여준다. 프로젝트 가치는 발표된 연산량보다 전력인입·패키징·시스템 조립·유료가동을 같은 일정 안에서 완결하는 능력으로 평가될 전망이다.
    * 판단 근거: NVIDIA 공식 실적·공급망 발표, SK텔레콤·효성중공업 협력과 정부 AIDC 제도자료를 종합한 분석.

## 2. 기술동향

□ **AI 학습 벤치마크가 사전학습 중심에서 에이전틱 후학습과 대규모 추천시스템으로 확장**

  ㅇ MLCommons는 11월 16일 MLPerf Training v6.1 결과를 공개했다. 이번 판에는 도구호출·소프트웨어 문제해결을 학습하는 Qwen3.5-397B 기반 GRPO 후학습과 HSTU 기반 추천시스템 벤치마크가 새로 추가됐다.

  - 24개 기관이 153개 시스템에서 250개 결과를 제출했고, 57개 시스템·37%가 클라우드 구성이었다. 1,000개 이상 가속기를 사용한 시스템도 12개였으며 NVIDIA·AMD·Google 가속기가 함께 포함됐다.
    * 출처: [MLCommons, “MLPerf Training v6.1 Results”](https://mlcommons.org/2026/11/mlperf-training-v6-1-results/), 결과발표 2026.11.16; [MLCommons Results](https://results.mlcommons.org/training), 세부결과 2026.11.23 확인.

  ㅇ 벤치마크가 에이전틱 후학습을 별도 작업으로 채택한 것은 모델경쟁의 병목이 사전학습 규모에서 도구사용·추론행동을 조정하는 후학습 시스템으로 이동했음을 반영한다.

  - 제출결과는 시스템·규모·소프트웨어가 달라 단일 순위로 해석하기 어렵다. 같은 모델·품질목표·가속기 수를 맞춘 비교와 에너지·비용자료가 함께 제시돼야 실제 조달판단에 활용할 수 있다.
    * 판단 근거: MLCommons의 신규 벤치마크 정의와 공개 결과구성을 비교한 분석.

□ **GPU 운영기술이 정적 할당에서 분할·이상탐지·리전 간 자동 라우팅으로 발전**

  ㅇ AWS는 11월 19일 Amazon EKS에서 NVIDIA Run:ai를 이용해 하나의 GPU를 여러 워크로드에 분할하고 우선순위에 따라 공유하는 구현방식을 공개했다.

  - GPU를 정수 단위로 고정할당할 때 생기는 유휴용량을 줄일 수 있지만, 메모리·연산간섭과 워크로드별 서비스수준을 함께 검증해야 한다. 분할률 자체보다 꼬리지연, OOM 발생률과 업무완료당 비용이 운영효과를 결정한다.
    * 출처: [AWS, “Using NVIDIA Run:ai GPU Fractioning on Amazon EKS”](https://aws.amazon.com/blogs/machine-learning/using-nvidia-runai-gpu-fractioning-on-amazon-eks/), 기술자료 공개 2026.11.19.

  ㅇ AWS는 11월 20일 SageMaker HyperPod에 GPU·네트워크·호스트 계층의 통합 관측기능과 리전·클러스터 간 Global Inference Gateway를 공개했다. 관측기능은 GPU 이용률·온도·전력·클럭, ECC·XID 오류와 EFA 네트워크 이상을 비교하고, 게이트웨이는 KV 캐시 여유·대기열·거리·오류율로 클러스터를 선택한다.

  - 분산 AI 운영의 핵심이 장애발견에서 원인격리와 자동 우회로 이동한 사례다. 게이트웨이는 13개 리전에서 제공되며 회사 베타사례 외의 대규모 장애전환 성능과 비용효과는 추가 검증이 필요하다.
    * 출처: [AWS, “Introducing enhanced infrastructure observability in Amazon SageMaker HyperPod”](https://aws.amazon.com/blogs/machine-learning/introducing-enhanced-observability-in-amazon-sagemaker-hyperpod-to-diagnose-gpu-training-issues/), 발표 2026.11.20; [AWS, “Introducing Amazon SageMaker HyperPod Global Inference Gateway”](https://aws.amazon.com/blogs/machine-learning/introducing-amazon-sagemaker-hyperpod-global-inference-gateway-one-endpoint-across-regions-and-clusters/), 발표 2026.11.20.

□ **장문맥·에이전틱 추론의 병목을 GPU 외부 메모리 풀로 확장하는 구조 등장**

  ㅇ Marvell과 Penguin Solutions는 11월 16일 CXL 메모리 확장카드와 광인터커넥트를 이용한 멀티랙 메모리 풀 협력을 발표했다. CXL 카드는 2026년 말 검증·기업배치를 목표로 하며, 광기반 MemoryAI 구조는 페타바이트급 분리형 메모리 공유를 지향한다.

  - 모델가중치와 KV 캐시가 커질수록 HBM에 모두 적재하기 어렵기 때문에 CXL·광연결로 용량을 늘리는 접근이다. 다만 원격 메모리는 지연·일관성·소프트웨어 최적화 비용이 발생하므로 HBM 대체가 아니라 콜드 가중치·캐시계층을 포함한 메모리 계층화로 보는 편이 타당하다.
    * 출처: [Marvell, “Marvell and Penguin Solutions Collaborate to Address Data Center AI Memory”](https://www.marvell.com/company/newsroom/marvell-penguin-solutions-data-center-ai-memory-inference.html), 사건·발표 2026.11.16.

□ **결론 및 시사점**

  ㅇ 기술경쟁은 가속기 피크성능에서 후학습, 메모리계층, 자원분할, 장애격리와 리전 간 라우팅을 결합한 시스템 운영경쟁으로 이동했다.

  - MLPerf의 신규 작업은 비교대상을 넓혔고, AWS와 Marvell의 발표는 비싼 연산자원의 유휴시간과 메모리 병목을 줄이는 경로를 제시한다. 향후 기술성숙도는 벤치마크 최고점보다 가속기 이용률, 장애복구시간, P95 지연, 업무완료당 전력·비용과 결과 재현성으로 판별될 전망이다.
    * 판단 근거: MLCommons, AWS와 Marvell 공식자료를 AI 인프라 운영기술 관점에서 종합한 분석.

## 3. 기업동향

□ **SK텔레콤·효성중공업, AI 데이터센터 사업을 전력설비 공동설계까지 확대**

  ㅇ 양사는 GW급 AIDC의 변전·배전·전력품질과 운영을 함께 검토하고 국내외 사업기회를 공동 발굴하기로 했다.

  - 통신사의 임차·운영모델과 전력기기 기업의 장주기 설비조달을 초기부터 연결하면 착공 이후 설계변경 위험을 줄일 수 있다. 현재는 MOU 단계이므로 실제 부지·용량·수주·준공시점은 확정성과로 볼 수 없다.
    * 출처: [SK텔레콤 뉴스룸](https://news.sktelecom.com/233113), MOU·발표 2026.11.16.

□ **업스테이지·퓨리오사AI, 국산 LLM–NPU 조합의 사업화를 스타트업 PoC로 확장**

  ㅇ 서울창조경제혁신센터·업스테이지·퓨리오사AI·IT동아는 11월 20일 국내 유망 스타트업을 모집해 Solar 계열 모델과 RNGD 기반 추론환경의 개념증명·최적화·공동사업을 지원한다고 발표했다.

  - 지원내용에는 API 크레딧, NPU 최적화, PoC와 공동영업 검토가 포함된다. 단순 칩 데모보다 애플리케이션의 실제 모델·트래픽·비용조건을 검증할 수 있지만, 모집·PoC 단계는 유료전환이나 반복매출과 구분해야 한다.
    * 출처: [동아일보, 「국산 LLM과 NPU로 AI 추론 실증·사업화」](https://www.donga.com/news/amp/all/20261120/135059997/1), 프로그램 발표·보도 2026.11.20.

□ **피아스페이스, 국산 NPU와 VLM을 결합한 2단계 안전관제 실증 공개**

  ㅇ 피아스페이스는 11월 20일 대구 도시철도 중앙로역에서 국산 NPU가 쓰러짐·침입 등을 상시 탐지하고 VLM이 전후 맥락을 재확인하는 관제시스템을 실증 중이라고 밝혔다.

  - 회사의 초기분석에서는 관제담당자가 확인할 알림이 90% 이상 감소했다. 다만 이는 회사발표 수치이며, TTA가 탐지성능·연산효율 공인시험을 진행 중이므로 정확도·재현율·전력·장시간 안정성은 시험완료 후 판단해야 한다.
    * 출처: [IT조선, 「피아스페이스, 국산 NPU·VLM으로 관제 오탐 90%↓」](https://it.chosun.com/news/articleView.html?idxno=3000000001290), 실증발표·보도 2026.11.20; [NIPA, AX디바이스 개발·실증 사업](https://www.nipa.kr/home/bsnsAll/0/detail?bsnsDtlsIemNo=857), 사업내용 2026.11.23 확인.

  ㅇ 상시 영상분석은 저전력 NPU가, 의심장면의 의미판단은 VLM이 담당하는 구조는 비용이 큰 모델을 모든 프레임에 호출하지 않는 분업형 추론이다.

  - 현장가치는 탐지건수보다 불필요한 알림을 줄이면서 실제 사고 누락을 방지하는 균형에 있다. 향후 공인시험과 장기운영에서 오경보·미탐·응답시간·운영비가 함께 공개돼야 다른 교통시설로의 확장성을 판단할 수 있다.
    * 판단 근거: 공개된 2단계 추론구조와 시험진행 상태를 현장 운영지표 관점에서 분석.

□ **결론 및 시사점**

  ㅇ 국내 기업은 AI 인프라의 전력설비 통합과 국산 NPU의 업무별 실증을 병행하며 사업범위를 칩·서버에서 현장 운영성과로 넓히고 있다.

  - SK텔레콤·효성중공업은 구축단계의 실행위험을, 업스테이지·퓨리오사AI와 피아스페이스는 모델–가속기–업무흐름의 적합성을 각각 다룬다. 사업성과는 MOU·모집건수보다 유료전환, 반복구매, 공인시험, 장기가동률과 서비스수준협약으로 확인될 전망이다.
    * 판단 근거: 3개 기업사례의 발표단계와 검증범위를 비교한 분석.

## 4. 글로벌 빅테크 동향

□ **NVIDIA, 실적성장과 함께 기판·패키징·시스템조립을 장기계약으로 내재화**

  ㅇ NVIDIA는 3분기 데이터센터 매출의 고성장과 동시에 삼성전기·Kinsus·Amkor·SPIL·Foxconn 등 공급망 파트너와 용량확대를 발표했다.

  - Vera Rubin과 Vera CPU의 양산출하를 시작하면서 차세대 제품의 병목을 GPU 다이보다 기판·CoWoS·패키징·랙 조립에서 동시에 해소하려는 전략이다. 선급·장기약정은 공급안정성을 높이지만 수요조정 시 재고·계약부담도 함께 키운다.
    * 출처: [NVIDIA 실적발표](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2027), 2026.11.17; [NVIDIA 공급망 발표](https://nvidianews.nvidia.com/news/nvidia-expands-commitments-with-supply-chain-partners-to-support-ai-infrastructure-buildout), 2026.11.17.

□ **AMD, 특화 추론칩 인수와 PC NPU 소프트웨어 유통을 동시에 확대**

  ㅇ AMD는 11월 17일 특화 추론실리콘 기업 Taalas 인수를 완료하고, 기술을 Instinct GPU·EPYC CPU·ROCm·Helios 랙스케일 체계와 결합하겠다고 밝혔다.

  - AMD의 11월 4일 SEC 보고서에 따르면 8월 체결한 거래의 가치는 조건부 대가 최대 14억 달러를 포함해 약 29억 달러였다. 인수완료는 기술통합의 시작이며 제품출시·매출기여 시점은 공개되지 않았다.
    * 출처: [AMD, “AMD Completes Acquisition of Taalas”](https://newsroom.amd.com/news/amd-completes-acquisition-taalas-advance-ai-inference-innovation/), 인수완료 발표 2026.11.17; [AMD Form 10-Q](https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000191/amd-20260926.htm), 거래규모 공시 2026.11.04.

  ㅇ AMD와 Unsloth는 11월 19일 Unsloth Desktop을 통해 XDNA 2 NPU를 100개 이상의 호환 에이전트 애플리케이션과 연결한다고 발표했다.

  - 회사 시연은 350억 전체 파라미터의 Qwen3.6 MoE 모델을 로컬 NPU에서 실행하는 구조다. 지원앱 수는 연결가능성을 뜻하며 각 앱의 전 과정이 NPU에서 실행되거나 동일 성능을 보장한다는 의미는 아니다.
    * 출처: [AMD, “AMD and Unsloth Bring NPU Support to 100+ Agentic AI Apps”](https://newsroom.amd.com/news/amd-unsloth-bring-npu-support-agentic-ai-applications/), 발표 2026.11.19; [AMD 기술 블로그](https://www.amd.com/en/blogs/2026/unlocking-the-amd-ryzen-ai-npu-for-unsloth-desktop.html), 시연자료 2026.11.19.

□ **Microsoft, 기업용 에이전트 경쟁을 모델 제공에서 지속개선·비용·행동통제로 확장**

  ㅇ Microsoft는 11월 17일 Ignite 2026에서 Microsoft IQ, Foundry의 지속개선 루프, Agent 365 Business Analytics와 운영체제 수준의 에이전트 격리를 발표했다.

  - Foundry는 운영추적과 평가를 이용해 에이전트 구성을 개선하고 모델 후학습까지 연결하며, Agent 365는 작업성공·사용량·비용을 분석한다. Execution Containers·Entra 신원·정책은 에이전트 행동의 권한경계를 Windows까지 확장한다.
    * 출처: [Microsoft, “Microsoft Ignite 2026: Empowering human ambition, intelligence and trust”](https://news.microsoft.com/source/2026/11/17/microsoft-ignite-2026-empowering-human-ambition-intelligence-and-trust/), 사건·발표 2026.11.17; [Microsoft Ignite 2026 Book of News](https://news.microsoft.com/events/ignite/2026/book-of-news/), 2026.11.17~20.

  ㅇ Microsoft는 Cobalt 200 VM을 정식 제공하며 이전 세대 대비 최대 50% 높은 성능을 회사수치로 제시했고, 2026년 말 23개 리전 공급을 계획했다.

  - 에이전트가 모델추론 외에 코드실행·도구호출을 반복하면서 범용 CPU와 운영제어의 중요성이 커진다는 전략이다. 성능수치는 워크로드별 독립검증이 필요하며 실제 지역별 가용용량은 계획과 구분해야 한다.
    * 출처: [Microsoft Azure, “What’s new in Azure at Microsoft Ignite 2026”](https://azure.microsoft.com/en-us/blog/microsoft-ignite-2026-whats-new-in-azure-the-platform-purpose-built-for-ai/), 발표 2026.11.17.

□ **결론 및 시사점**

  ㅇ 글로벌 빅테크는 AI 경쟁범위를 가속기에서 공급망, 특화 추론실리콘, PC NPU와 에이전트 운영제어로 동시에 넓혔다.

  - NVIDIA는 물리적 공급망을, AMD는 데이터센터·클라이언트 추론 포트폴리오를, Microsoft는 기업 에이전트의 학습·비용·권한 제어면을 강화한다. 플랫폼 우위는 단일 모델성능보다 반도체 공급부터 현장행동 감사까지 전 수명주기를 누가 통합하느냐에 좌우될 가능성이 높다.
    * 판단 근거: NVIDIA·AMD·Microsoft의 공식발표를 공급망–연산–운영계층으로 구분해 종합한 분석.

## 5. 정책·규제동향

□ **한국, AIDC 특별법 하위규정으로 지원대상·신고·특구·계통특례를 구체화**

  ㅇ 과학기술정보통신부는 11월 20일 AIDC 특별법 시행령·시행규칙 제정안을 12월 30일까지 입법예고했다. AIDC를 일정규모 이상의 AI 가속기와 전력·냉각설비를 갖추고 설계전력비율 1.5 이하인 시설로 정의하며 코로케이션 형태도 포함한다.

  - 구축신고는 공사개시 전, 운영신고는 운영개시 30일 전, 변경신고는 사유발생 30일 이내로 구분했고 구축신고 후 1년 내 착공일 신고를 요구해 특례선점을 제한한다.
    * 출처: [과학기술정보통신부, 「AI 데이터센터 구축 빨라진다」](https://www.korea.kr/news/policyNewsView.do?newsId=148976211), 입법예고·발표 2026.11.20.

  ㅇ 비수도권 50MW 이하 전평 면제, AIDC 특구의 비기술적 평가면제와 대형사업 우선평가가 제시됐지만 일부는 시행령·고시개정이 완료돼야 효력이 발생한다.

  - 제도는 지역분산과 구축기간 단축을 목표로 하나, 면제·우선처리가 계통의 실제 공급가능성을 대신하지는 않는다. 특례 이후에도 전력인입, 용수·통신, 주민수용성과 유료가동을 분리해 확인해야 한다.
    * 출처: [과학기술정보통신부·기후에너지환경부](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156790061), 제도개선 발표 2026.11.20; 시행예정 2027.03.10.

□ **미국, 첨단칩 수출통제를 물리적 선적에서 해외 데이터센터의 원격 컴퓨팅 접근까지 확대**

  ㅇ 미국 상무부 산업안보국(BIS)은 11월 16일 ‘Addressing Remote Access to Advanced Semiconductors’ 잠정최종규칙을 발표했고 11월 19일부터 시행했다.

  - 해외 데이터센터가 마카오 또는 Country Group D:5 소재 기업에 상당한 연산량을 원격 제공하는 경우 허가를 요구하고, 데이터센터·파운드리·칩 수출자에게 고객의 직간접 소유·통제관계 실사를 부과한다. 1월 19일까지 의견을 받는다.
    * 출처: [BIS 보도자료](https://www.bis.gov/press-release/bis-issues-rule-addressing-remote-access-american-super-intelligence-technology), 발표 2026.11.16; [미국 연방관보 91 FR 74970](https://www.govinfo.gov/content/pkg/FR-2026-11-19/html/2026-23529.htm), 공표·시행 2026.11.19·의견마감 2027.01.19.

  ㅇ 인도네시아·말레이시아·싱가포르·태국·브라질로의 첨단반도체 수출·재수출·국내이전에는 원칙적으로 허가가 추가되며, 미국 기업 또는 미국 모회사가 최종사용자인 경우 보고조건을 전제로 예외가 가능하다.

  - 기존 국가등급형 AI Diffusion Rule은 공식 폐지됐지만 규제강도가 단순 완화된 것은 아니다. 새 체계는 우회 가능성이 높은 지역과 원격 연산의 최종사용자를 중심으로 통제를 재구성해 클라우드·코로케이션·파운드리의 고객확인 부담을 높인다.
    * 출처: [미국 연방관보](https://www.govinfo.gov/app/details/FR-2026-11-19/2026-23529), 규칙요약·시행 2026.11.19; [BIS 제출안내](https://media.bis.gov/si/exclusionnotesubmission), 보고체계 2026.11.19.

□ **결론 및 시사점**

  ㅇ 국내 정책은 AIDC의 인정·신고와 지역특례를 구체화하고, 미국 규제는 연산자원의 실제 사용주체와 원격접근을 통제대상으로 편입했다.

  - 양국 조치는 방향은 다르지만 AI 인프라가 단순 부동산·서버시설이 아니라 전력·가속기·고객신원·원격접근을 함께 관리해야 하는 규제대상으로 전환됐음을 보여준다. 정책효과는 허가건수보다 실제 구축기간, 지역가동률, 우회통제와 기업의 준수비용으로 나타날 전망이다.
    * 판단 근거: 한국 AIDC 하위법령 입법예고와 미국 BIS 잠정최종규칙을 비교한 분석.

## 6. 시사점 및 향후 전망

□ **AI 인프라 성장률과 개별 프로젝트의 사업성을 분리해 평가할 필요가 확대**

  ㅇ NVIDIA의 데이터센터 매출은 전체 수요의 강도를 보여주지만 장기 공급약정, 전력설비와 계통특례는 프로젝트별 자본·규제위험이 동시에 커지고 있음을 보여준다.

  - 시장성 판단은 발표된 GPU·GW보다 전력인입, 패키징·시스템 납기, 계약상 최소구매, 실제 유료가동과 현금회수기간을 연결해 이뤄질 전망이다.
    * 판단 근거: NVIDIA 실적·공급계약, SK텔레콤·효성중공업 협력과 AIDC 제도를 종합한 분석.

□ **국산 NPU의 상용화 경로가 범용 GPU 대체보다 좁은 업무의 분업형 추론에서 구체화**

  ㅇ 도시철도 관제의 NPU–VLM 2단계 구조와 Solar–RNGD 스타트업 PoC는 상시 저비용 추론과 필요시 고성능 모델 호출을 결합하는 접근이다.

  - 확산의 분기점은 칩 사양보다 미탐·오경보, 응답시간, 모델이식, 장기가동과 운영비 절감이다. 초기 회사수치와 모집성과를 반복수주로 해석하지 않고 공인시험·유료전환을 단계별로 확인해야 한다.
    * 판단 근거: 피아스페이스와 업스테이지·퓨리오사AI 사례의 기술구조·사업단계를 비교한 분석.

□ **AI 운영기술은 자원배치에서 실패예측·자동우회·업무성과 최적화로 진화**

  ㅇ AWS의 GPU 분할·관측·글로벌 라우팅과 Microsoft Foundry의 지속개선은 인프라와 에이전트 양쪽에서 운영데이터를 자동조정에 사용하는 흐름을 보여준다.

  - 향후 경쟁력은 자원이용률뿐 아니라 오류가 서비스에 전파되기 전 탐지하는 능력, 자동우회의 일관성, 변경 전후 품질·안전·비용을 비교하는 승인체계에 의해 좌우될 가능성이 높다.
    * 판단 근거: AWS HyperPod·EKS와 Microsoft Ignite 공식발표를 운영루프 관점에서 종합한 분석.

□ **수출통제의 준수대상이 칩 제조사에서 데이터센터·클라우드·파운드리 전체로 확대**

  ㅇ BIS 규칙은 물리적 칩의 목적지뿐 아니라 해외 데이터센터가 누구에게 얼마나 많은 연산을 제공하는지까지 확인하도록 한다.

  - 다국가 AI 서비스는 고객의 본사·최종모회사, 연산량, 모델용도와 이후의 용도변경을 추적해야 하며, 지역별 배치와 고객온보딩 절차가 기술아키텍처와 판매전략에 직접 영향을 줄 전망이다.
    * 판단 근거: BIS 잠정최종규칙의 원격접근·실사·용도변경 조항을 사업운영 관점에서 분석.

## 별첨. 정책 제언(안)

| 구분 | 정책목표 | 실행내용 | 핵심 성과지표(예시) |
|---|---|---|---|
| AI 인프라 공급망 | 장기약정과 실제 수요 간 불일치 위험 축소 | 가속기·기판·패키징·전력설비의 계약, 납기, 최소구매와 가동계획을 단계별 연계 관리 | 납기준수율, 최소구매 이행률, 재고일수, 유료가동률, 현금회수기간 |
| AIDC 전력·입지 | 지역분산과 계통안정·사업예측 가능성의 동시 확보 | 전평 면제·패스트트랙 이후 전력인입, 통신·용수, 지역수용성과 운영실적을 통합 추적 | 평가기간, 전력인입률, 비수도권 가동률, 계통보강비용, 민원처리기간 |
| 국산 NPU 실증 | 업무별 기술검증을 반복구매와 조달성과로 연결 | NPU–VLM·LLM 분업구조를 정확도·지연·전력·장기가동 조건에서 공인시험하고 유료전환 단계와 연계 | 미탐·오경보율, P95 지연, 업무당 전력, 장기가동률, PoC 유료전환율 |
| AI 인프라 운영 | GPU 유휴·장애·메모리 병목의 통합 최적화 | 자원분할, GPU·네트워크 이상탐지, KV 캐시 기반 라우팅과 자동 장애전환을 공통 시험 | 가속기 이용률, OOM률, 이상탐지시간, 장애복구시간, 업무완료당 비용 |
| 벤치마크 | 에이전틱 후학습·이기종 시스템의 비교가능성 확보 | MLPerf 등 공개방식을 참고해 품질목표·규모·소프트웨어·전력 조건이 동일한 반복시험 체계 구축 | 재현성, 제출시스템 수, 성능·전력 동시공개율, 동일규모 비교가능률 |
| 수출통제 대응 | 원격 컴퓨팅·파운드리 거래의 규제준수 역량 확보 | 고객 본사·최종모회사·연산량·모델용도·용도변경을 추적하는 데이터센터·클라우드 공통 절차 마련 | 고객확인 완료율, 허가소요기간, 용도변경 탐지율, 보고누락 건수, 규제중단시간 |
