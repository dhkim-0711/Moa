# AI 주간 동향보고서

- **분석기간:** 2026년 8월 24일~8월 30일
- **발간일:** 2026년 8월 31일

## 1. 시장동향

□ **AI 인프라 수요가 실적과 장기 조달계획에서 동시에 재확인**

ㅇ NVIDIA의 데이터센터 매출이 전년 동기 대비 두 배 이상 확대

- NVIDIA는 8월 26일 2027회계연도 2분기 매출 **962억 달러**를 발표했으며, 전년 동기 대비 106%, 전분기 대비 18% 증가함.
  * 데이터센터 매출은 **890억 달러**로 전년 동기 대비 117% 증가해 전체 매출의 약 92.5%를 차지했으며, AI 인프라 투자가 일부 선도기업의 시험투자를 넘어 대규모 상용 수요로 연결되고 있음을 보여줌.
  * 출처: [NVIDIA, 「Financial Results for Second Quarter Fiscal 2027」](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027), 2026.8.26.

ㅇ AWS는 기존 계획을 상향해 2027~2028년 NVIDIA GPU 200만 개를 추가 배치할 예정

- AWS와 NVIDIA는 8월 26일 Blackwell Ultra, Rubin 및 Rubin Ultra GPU **200만 개**를 AWS 글로벌 인프라와 AI 팩토리에 추가 배치한다고 발표함.
  * GTC 2026에서 제시한 100만 개 이상 도입계획 이후 수요가 예상치를 웃돌았다는 설명으로, 시장 병목이 단순 GPU 구매에서 전력·데이터센터·네트워크를 포함한 랙 단위 공급능력으로 확대되고 있음.
  * 출처: [NVIDIA·AWS, 「AWS and NVIDIA to Deliver 2 Million Additional GPUs」](https://nvidianews.nvidia.com/news/aws-and-nvidia-to-deliver-2-million-additional-gpus-and-next-generation-infrastructure-for-agentic-and-physical-ai), 2026.8.26.

□ **AI 투자자금이 클라우드·모델을 넘어 피지컬 AI의 생산설비와 상용운영으로 확산**

ㅇ XPENG 로봇사업과 Gatik이 한 주 동안 총 11억 달러 이상의 자금을 확보

- XPENG은 8월 24일 로봇사업에서 **9억 달러 이상**을 조달해 63억 달러 이상의 기업가치를 인정받았고, Gatik은 8월 25일 자율주행 화물운송 확대를 위한 **2억 달러** 규모 시리즈 D를 발표함.
  * 두 거래 모두 모델 연구만이 아니라 로봇 양산시설, 고품질 현장데이터, 무인운영 확대에 자금 용도를 제시해 피지컬 AI의 투자논리가 기술시연에서 반복 가능한 운영·생산능력으로 이동하고 있음을 보여줌.
  * 출처: [XPENG, 「Robotics Business Raises Over US$900 Million」](https://www.xpeng.com/news/01a03797fccda01e0de68a02a256006a), 2026.8.24; [Gatik, 「Gatik Raises $200 Million」](https://archive.gatik.ai/news/coverage/gatik-raises-200-million-series-d-led-by-qia-and-kdt-as-demand-for-driverless-commercial-freight-accelerates/), 2026.8.25.

□ **대규모 AI 지출의 조달방식과 투자회수 가능성이 기업가치의 핵심 변수로 부상**

ㅇ Alibaba는 AI 역량 확대를 위해 800억 홍콩달러 규모 신주배치를 추진

- Alibaba가 8월 23일 발표한 신주배치는 8월 24일 시장에 본격 반영됐으며, 회사는 순조달금 전액을 AI 인프라를 포함한 AI 역량 확대에 사용하겠다고 밝힘.
  * 조달규모는 약 **102억 달러**로, AI 투자가 영업현금만으로 충당되는 단계를 넘어 자본시장 조달과 주주 희석을 수반하는 장기 설비투자로 전환됐음을 의미함.
  * 출처: [Alibaba Group, 「Pricing of HK$80 Billion Placing of New Shares」](https://www.alibabagroup.com/en-US/document-2028384807859257344), 2026.8.23 발표; [Reuters, 「Alibaba shares slide after $10.2 billion AI share sale」](https://www.reuters.com/business/retail-consumer/alibaba-set-open-down-8-hong-kong-after-102-billion-share-placement-plan-2026-08-24/), 2026.8.24 보도.

□ **결론 및 시사점**

ㅇ 이번 주 시장은 AI 수요 둔화보다 인프라 공급 확대와 투자회수 검증이 동시에 진행되는 국면을 보여줌.

- GPU·클라우드 수요는 고성장을 지속하지만, 자본집약도가 높아질수록 투자평가는 보유 칩 수보다 가동률, 장기 고객계약, 전력 확보 및 서비스 매출 전환속도에 좌우될 전망임.
  * 피지컬 AI 역시 모델 성능만으로는 기업가치를 유지하기 어려우며, 양산수율·현장 안전성·무인운영시간·반복매출이 핵심 검증지표로 부상함.

## 2. 기술동향

□ **에이전틱 AI 추론이 프롬프트 처리와 토큰 생성의 분리형 구조로 진화**

ㅇ NVIDIA가 토큰 생성에 특화된 Groq 3 LPX의 양산을 발표

- 8월 24일 공개된 Groq 3 LPX는 Vera Rubin NVL72의 범용 연산과 결합해 대규모 문맥처리와 저지연 토큰 생성을 서로 다른 가속기에 배치하는 구조를 제시함.
  * NVIDIA는 Artificial Analysis 환경에서 Gemma 4 31B와 10만 토큰 문맥을 사용해 초당 **3,400개 출력토큰**을 기록했다고 밝혔으나, 특정 모델·문맥·하네스에 기반한 공급사 공개수치이므로 독립 재현 전에는 일반 성능으로 확대해석하기 어려움.
  * 출처: [NVIDIA, 「Groq 3 LPX Now in Full Production」](https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai), 2026.8.24.

ㅇ 추론 최적화의 단위가 단일 칩에서 단계별 자원배치로 확대

- 에이전트는 한 번의 답변에도 문서검사, 코드작성, 도구호출, 검증을 반복하므로 개별 이용자의 토큰 생성지연이 전체 업무완료시간을 결정함.
  * 향후 추론 인프라는 입력단계와 생성단계의 가속기를 분리하고, 요청 특성에 따라 GPU·NPU·추론전용 ASIC을 조합하는 운영 소프트웨어 경쟁이 강화될 것으로 판단됨.

□ **피지컬 AI의 실행기반이 고성능 로봇에서 저전력 엣지 장치로 확대**

ㅇ Jetson Orin Nano 2가 동일 폼팩터에서 추론성능과 전력효율을 개선

- NVIDIA는 8월 25일 **78 TOPS**, 8GB 메모리, 8코어 Arm CPU를 갖춘 Jetson Orin Nano 2를 공개했으며, 전 세대 대비 추론성능 2배와 동일 성능 기준 소비전력 40% 절감을 제시함.
  * 로봇·드론·비전시스템에서 소형 언어모델과 비전언어모델을 현장 구동할 수 있는 범위가 넓어져, 클라우드 연결이 불안정하거나 즉시성이 중요한 산업현장의 온디바이스 추론 비중이 확대될 전망임.
  * 출처: [NVIDIA, 「Jetson Orin Nano 2 Robotics Computer」](https://nvidianews.nvidia.com/news/nvidia-announces-jetson-orin-nano-2-robotics-computer-to-redefine-entry-level-edge-ai), 2026.8.25.

□ **희귀사건 예측에서 과거 극단값 의존도를 낮추는 생성형 접근 제시**

ㅇ MIT 연구진이 극단적 사건 기록 없이도 현실 가능한 최악 시나리오를 생성하는 알고리즘을 공개

- 8월 24일 공개된 연구는 일상적인 기상기록과 지도에서 통계적 구조를 학습해 불가능한 조합을 배제하고, 100년 빈도와 같은 조건에 맞는 폭풍·폭염 등 극단사건의 규모·강도·기간을 생성함.
  * 이는 관측데이터가 부족한 재난·산업안전 영역에서 AI를 평균적 예측이 아니라 스트레스테스트와 복원력 설계에 활용하는 방향을 보여줌.
  * 출처: [MIT News, 「Generating scenarios for extreme events, without extreme data」](https://news.mit.edu/2026/generating-scenarios-extreme-events-without-extreme-data-0824), 2026.8.24.

□ **결론 및 시사점**

ㅇ 기술경쟁의 중심이 범용 모델·가속기의 최고점에서 워크로드 단계별 최적화와 현장 제약 대응으로 이동함.

- 데이터센터에서는 문맥처리와 토큰생성의 분리, 엣지에서는 전력·메모리 제약 내 실시간 추론, 산업응용에서는 희귀사건까지 포함하는 검증이 중요해짐.
  * 국산 NPU도 동일 모델의 단일 성능보다 프리필·디코드·비전·센서처리 중 강점 구간을 명확히 하고, 멀티벤더 환경에서 해당 구간을 자동 배치하는 역량이 차별화 요소가 될 전망임.

## 3. 기업동향

□ **NVIDIA, 가속기 기업에서 추론 단계 전체를 통제하는 플랫폼 기업으로 확장**

ㅇ 실적 성장과 함께 범용 GPU·토큰 생성 가속기·엣지 모듈을 한 주에 연속 공개

- NVIDIA는 데이터센터 매출 890억 달러를 기록한 가운데 Groq 3 LPX 양산, Jetson Orin Nano 2 출시, AWS 대규모 배치계획을 발표함.
  * 회사 전략은 학습용 GPU 판매에 머무르지 않고 에이전틱 AI의 저지연 생성, 피지컬 AI의 엣지 추론, 클라우드 장기공급을 하나의 소프트웨어·시스템 생태계로 묶는 방향임.
  * 출처: [NVIDIA 2분기 실적](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027), 2026.8.26; [Groq 3 LPX](https://nvidianews.nvidia.com/news/nvidia-groq-3-lpx-now-in-full-production-with-world-class-speed-for-agentic-ai), 2026.8.24; [Jetson Orin Nano 2](https://nvidianews.nvidia.com/news/nvidia-announces-jetson-orin-nano-2-robotics-computer-to-redefine-entry-level-edge-ai), 2026.8.25.

□ **XPENG, 자동차의 제조·데이터 역량을 휴머노이드 로봇으로 전이**

ㅇ 로봇사업 첫 외부조달로 대규모 양산과 글로벌 출시 일정을 구체화

- XPENG은 9억 달러 이상을 조달하면서 IRON 휴머노이드 로봇의 2026년 말 양산, 매장·캠퍼스 우선배치, 2027년 중국 및 해외 판매계획을 제시함.
  * 차량에서 축적한 센서, 배터리, 제어, 제조 및 실세계 데이터 역량을 로봇에 재사용하는 구조로, 피지컬 AI 경쟁이 로봇 스타트업만이 아니라 대규모 제조기반을 가진 모빌리티 기업으로 확대되고 있음.
  * 출처: [XPENG, 「Robotics Business Raises Over US$900 Million」](https://www.xpeng.com/news/01a03797fccda01e0de68a02a256006a), 사건발표 2026.8.24·게시 2026.8.25.

□ **Gatik, 제한된 화물노선에서 자율주행의 상용운영 지표를 축적**

ㅇ 2억 달러 투자와 함께 계약매출·무인주문·정시배송 실적 공개

- Gatik은 계약매출 **6억 달러 이상**, 완전 무인 주문 **8만5천 건**, 정시배송률 **99%**를 회사 실적으로 제시함.
  * 범용 도로주행보다 물류센터와 점포 사이의 반복노선에 집중해 규제·안전·운영 복잡도를 낮춘 전략으로, 피지컬 AI 상용화가 범용성보다 통제 가능한 업무영역에서 먼저 확장될 가능성을 보여줌.
  * 출처: [Gatik, 「Gatik Raises $200 Million」](https://archive.gatik.ai/news/coverage/gatik-raises-200-million-series-d-led-by-qia-and-kdt-as-demand-for-driverless-commercial-freight-accelerates/), 2026.8.25.

□ **결론 및 시사점**

ㅇ 기업 경쟁력의 평가축이 기술발표에서 공급·운영·반복매출을 함께 증명하는 단계로 이동함.

- NVIDIA는 생태계 통합과 대규모 공급계약, XPENG은 제조기반과 양산일정, Gatik은 실제 무인운영 실적을 기업가치의 근거로 제시함.
  * 국내 AI반도체·피지컬 AI 기업도 PoC 건수보다 상용배치 규모, 운영시간, 장애율, 재구매 및 계약매출을 축적할수록 글로벌 투자·수요시장과의 연결 가능성이 높아질 전망임.

## 4. 글로벌 빅테크 동향

□ **Google, 검색을 정보제공 화면에서 거래를 수행하는 에이전트 인터페이스로 확장**

ㅇ AI Mode에 항공권 가격추적·포인트 조회·호텔 예약 기능을 결합

- Google은 8월 27일 AI Mode 대화 안에서 항공권 가격변동을 추적하고, 항공·호텔 포인트를 비교하며, 호텔 예약까지 이어지는 기능을 발표함.
  * 가격추적은 180개 이상 국가·지역에 제공되고 300개 이상의 항공사·여행사이트 데이터를 활용해, 검색사업의 경쟁단위가 링크 제공에서 상태변화 감시와 거래완료까지 확대되고 있음.
  * 출처: [Google, 「3 new ways to plan and book travel in Search」](https://blog.google/products-and-platforms/products/search/book-travel-ai-mode/), 2026.8.27.

ㅇ Gemini Live도 음성 대화에서 다단계 업무수행으로 기능을 확대

- 8월 26일 공개된 기능은 음성으로 문서 정리, 받은편지함 요약·관리, 일정 브리핑 및 백그라운드 다단계 작업을 수행하도록 설계됨.
  * 검색과 음성비서가 공통적으로 외부 서비스 연결과 사용자 맥락을 활용하는 실행형 인터페이스로 수렴하면서, 플랫폼 경쟁이 답변 품질보다 권한관리·거래연결·지속 실행능력으로 이동함.
  * 출처: [Google, 「Turn your voice into action with Gemini Live」](https://blog.google/innovation-and-ai/products/gemini-app/productivity-features-gemini-live/), 2026.8.26.

□ **Google, 음성모델을 기록도구에서 실시간 에이전트 입력계층으로 전환**

ㅇ Gemini 3.5 Transcribe를 API와 기업용 에이전트 플랫폼에 제공

- Google은 8월 26일 실시간 스트리밍과 사전녹음 처리용 API를 공개했으며, 85개 이상 언어, 맞춤용어, 화자분리 및 함수호출을 지원한다고 발표함.
  * 회사가 인용한 Artificial Analysis 기준 평균 단어오류율은 스트리밍 4.0%, 비스트리밍 2.6%이나, 언어·소음·도메인별 편차를 고려해 실제 도입 전 개별 검증이 필요함.
  * 출처: [Google, 「Intelligent transcription with Gemini 3.5 Transcribe」](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5-transcribe/), 2026.8.26.

□ **Alibaba와 AWS, AI 경쟁을 장기 자본·인프라 조달전으로 확대**

ㅇ Alibaba는 신주배치 순조달금 전액을 AI에 투입하고, AWS는 차세대 NVIDIA GPU의 선점 배치를 확대

- Alibaba의 800억 홍콩달러 조달과 AWS의 200만 GPU 추가계획은 미·중 빅테크 모두 모델 성능만이 아니라 컴퓨팅 공급능력을 장기간 확보하는 전략을 강화하고 있음을 보여줌.
  * 다만 대규모 선투자는 감가상각, 전력비, 활용률과 가격하락 위험을 수반하므로 향후 경쟁은 투자규모와 함께 AI 서비스 매출·마진으로 전환되는 속도에서 갈릴 전망임.
  * 출처: [Alibaba Group](https://www.alibabagroup.com/en-US/document-2028384807859257344), 2026.8.23; [NVIDIA·AWS](https://nvidianews.nvidia.com/news/aws-and-nvidia-to-deliver-2-million-additional-gpus-and-next-generation-infrastructure-for-agentic-and-physical-ai), 2026.8.26.

□ **결론 및 시사점**

ㅇ 글로벌 빅테크의 경쟁영역은 모델·클라우드에서 사용자 접점, 거래권한, 음성·검색 입력계층 및 장기 컴퓨팅 조달까지 확대됨.

- Google은 검색과 음성을 에이전트 실행면으로 전환하고, AWS·Alibaba는 이를 뒷받침할 인프라와 자본을 선점하고 있음.
  * 향후 플랫폼 종속은 모델 API보다 이용자 데이터, 결제·예약 연결, 권한체계와 실행이력에서 더 강하게 형성될 가능성이 있음.

## 5. 정책·규제동향

□ **한국, 에이전틱 AI 국제표준 논의에 정부출연연을 통해 공식 참여**

ㅇ ETRI가 Linux Foundation 산하 Agentic AI Foundation(AAIF)에 가입

- 과기정통부는 8월 25일 ETRI의 AAIF 가입을 발표했으며, MCP 등 에이전틱 AI 핵심규격의 형성 초기부터 국제표준·오픈소스 논의에 참여할 기반을 마련함.
  * AAIF는 정확성·신뢰성, 신원, 보안·개인정보, 관찰성·추적성, 거버넌스·규제대응, 워크플로 연계 및 에이전트 상거래 등 기술작업반을 운영해 표준경쟁이 연결규격에서 신뢰·운영규범으로 확대되고 있음을 보여줌.
  * 출처: [과학기술정보통신부, 「에이전틱 AI 글로벌 표준 선점을 위해 AAIF와의 협력 추진」](https://www.korea.kr/briefing/pressReleaseView.do?newsId=156775386), 2026.8.25; [정책브리핑 문서뷰어](https://www.korea.kr/common/docViewer.do?fileId=198529740&tblKey=GMN), 2026.8.25.

□ **한국, 피지컬 AI 정책을 개별 로봇개발에서 국가 임무형 R&D로 구체화**

ㅇ 과기정통부가 K-문샷 AI 휴머노이드 미션의 추진방향과 실행 로드맵안을 산업계와 논의

- 8월 25일 공개된 간담회는 로봇 하드웨어·소프트웨어·AI 분야 관계자에게 추진방향을 공유하고 현장 의견을 수렴하는 단계로, 최종 사업확정이나 예산의결과는 구분할 필요가 있음.
  * 정책범위가 단일 로봇 부품보다 모델·센서·구동계·데이터·실증환경을 결합하는 임무형 체계로 이동하는 신호이며, 성패는 공동 목표와 기업별 역할을 실제 시스템 수준에서 연결하는 데 달려 있음.
  * 출처: [과학기술정보통신부, 「K-문샷 AI 휴머노이드 미션 현장소통」](https://www.korea.kr/briefing/pressReleaseView.do?newsId=156775406), 2026.8.25.

□ **EU AI 규제는 일률적 교육수준보다 위험·직무별 AI 리터러시 조치로 운영방식이 구체화**

ㅇ 8월 25일 공개된 실무 프레임워크가 개정 AI Act 제4조의 조직 적용방식을 제시

- Regulation (EU) 2026/1744는 공급자와 배포자가 직원 등의 AI 리터러시 개발을 지원할 조치를 취하도록 하되 특정한 ‘충분 수준’을 일률적으로 보장하도록 하지는 않으며, 감독·집행 규정은 8월 3일부터 적용됨.
  * 이번 주 공개된 Interface의 프레임워크는 조직 역할, 시스템 위험, 이용맥락과 직무별 역량을 기준으로 교육을 설계하는 방향을 제시해 규제대응이 일회성 전사교육보다 업무·위험 기반 역량관리로 전환되고 있음을 보여줌.
  * 출처: [EUR-Lex, 「Regulation (EU) 2026/1744」](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng), 2026.7.24 공표·2026.7.27 발효; [European Commission, 「AI Literacy Q&A」](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers), 2026.7.27; [Interface, 「An operational framework for AI literacy in the workplace」](https://www.interface-eu.org/publications/ai-literacy-workplace-framework), 2026.8.25.

□ **결론 및 시사점**

ㅇ 정책의 중심이 모델 개발지원에서 상호운용 표준, 임무형 실증, 조직의 사용역량과 책임체계로 확대됨.

- 에이전틱 AI는 MCP 연결만으로 완성되지 않으며 신원·권한·추적성·결제·규제대응을 포함하는 운영표준이 시장진입을 좌우할 가능성이 높음.
  * 피지컬 AI 정책도 장비·알고리즘을 개별 지원하는 방식보다 공동 임무와 현장데이터를 중심으로 공급기업과 수요기관을 결합하는 구조가 중요해짐.

## 6. 시사점 및 향후 전망

□ **AI 인프라 경쟁은 ‘GPU 확보량’에서 ‘워크로드별 유효 처리량’ 경쟁으로 전환**

ㅇ AWS의 200만 GPU 계획과 Groq 3 LPX 양산은 범용 대규모 연산과 저지연 생성의 동시 최적화를 요구

- 하나의 가속기로 모든 단계를 처리하기보다 프리필·디코드·비전·센서처리를 분리하고, 각 단계에 적합한 GPU·NPU·ASIC을 배치하는 구조가 확산될 전망임.
  * 이기종 인프라의 가치는 장비 종류 수가 아니라 동일 정확도와 SLO에서 달성한 비용·전력·지연 개선으로 판단될 가능성이 높음.

□ **피지컬 AI는 2027년을 전후해 연구개발과 양산·운영의 격차가 드러날 전망**

ㅇ XPENG과 Gatik의 사례는 제조역량과 제한된 운영영역이 상용화 속도를 좌우함을 보여줌.

- 휴머노이드의 범용성보다 매장·캠퍼스·물류노선처럼 환경과 업무를 통제할 수 있는 영역에서 반복운영 데이터가 먼저 축적될 가능성이 높음.
  * 기업간 비교도 데모 성공 여부보다 무고장 운영시간, 개입빈도, 작업완료율, 안전사고, 양산원가와 고객계약으로 이동할 전망임.

□ **에이전트 플랫폼의 경쟁우위는 모델보다 연결·권한·추적성에서 강화**

ㅇ Google의 검색·음성 기능과 AAIF 표준 논의는 에이전트가 실제 거래와 업무를 수행하는 단계에 진입했음을 보여줌.

- 예약·메일·문서·결제에 접근하는 에이전트가 늘수록 신원확인, 최소권한, 실행 전 승인, 이력기록과 책임소재가 제품 품질의 핵심이 됨.
  * 개방형 표준 참여는 단순 기술수용을 넘어 국내 서비스·결제·공공업무 요구를 초기 규격에 반영할 수 있는 통로로 중요성이 커질 전망임.

□ **대규모 AI 투자는 성장성과 자본효율을 동시에 입증해야 하는 단계에 진입**

ㅇ NVIDIA 실적은 수요를 확인했지만 Alibaba의 신주배치는 투자비용과 주주부담도 함께 부각

- 향후 AI 기업의 평가는 매출 성장뿐 아니라 인프라 활용률, 감가상각 이후 마진, 장기계약의 질과 서비스당 투자회수기간을 함께 보는 방향으로 강화될 전망임.
  * 공공 AI 인프라도 구축규모보다 실제 이용기관, 모델 배포율, 토큰 처리량, 에너지 효율과 서비스 전환성과의 연계가 중요함.

## 별첨. 정책 제언(안)

| 구분 | 정책목표 | 실행내용 | 핵심 성과지표(예시) | 추진시기 |
|---|---|---|---|---|
| 이기종 추론 실증 | GPU·국산 NPU·추론전용 가속기의 단계별 최적배치 검증 | 프리필·디코드·비전·센서처리를 분리한 공통 워크로드를 구성하고 단일·혼합 가속기 환경을 동일 정확도·SLO 조건으로 비교 | TTFT, ITL, 처리량, 토큰/Wh, 원/백만 토큰, 자동전환 성공률 | 2026년 4분기 설계, 2027년 실증 |
| 에이전틱 AI 상호운용 시험 | 국내 서비스의 국제표준 호환성과 안전한 도구연결 확보 | AAIF·MCP 계열 규격을 기반으로 신원·권한·도구호출·감사로그·결제 연동 시험환경을 구축하고 국내 산학연 구현체를 상호검증 | 호환 구현체 수, 도구연결 성공률, 권한오류·취약점 수, 국제기고·표준반영 건수 | 2026년 하반기 착수 |
| 피지컬 AI 임무형 실증 | 로봇 기술개발을 반복 가능한 현장성과로 전환 | 물류·점검·공공안전 등 통제 가능한 임무별로 로봇·모델·센서·통신·운영 SW 컨소시엄을 구성하고 장기 현장운영 평가 | 작업완료율, 무고장 운영시간, 인간개입 빈도, 안전사고, 양산원가, 후속구매율 | 2027~2029년 |
| 엣지 AI 저전력 검증 | 국산 NPU의 피지컬 AI 적용 경쟁력 확보 | 10~30W급 장치에서 비전언어·센서융합 모델의 정확도·지연·전력·열안정성을 검증하고 공용 레퍼런스 설계 제공 | 지원 모델 수, W당 추론량, 24시간 안정운영률, 현장 적용기기 수 | 2027년 시범 |
| AI 인프라 자본효율 평가 | 대규모 공공 컴퓨팅 투자의 활용성과 제고 | 장비구축 중심 지표를 가동률·서비스 전환·토큰 처리·전력효율·민간수요 연계 지표로 전환하고 분기별 공개점검 | 평균 가동률, 실제 사용자·서비스 수, 토큰당 비용, 전력당 처리량, 민간매칭 규모 | 차기 사업평가부터 |
| 직무·위험 기반 AI 리터러시 | EU 등 해외 규제에 대응하는 조직 운영역량 확보 | 개발자·운영자·구매자·감사자별 교육모듈과 고위험 사용사례별 실습을 구성하고 이수보다 업무수행·사고대응 능력으로 평가 | 직무별 숙련도, 모의사고 대응시간, 권한위반률, 감사증빙 완성도 | 2026년 가이드, 2027년 확산 |
