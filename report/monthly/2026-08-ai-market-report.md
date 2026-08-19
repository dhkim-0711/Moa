# 2026년 8월 AI 월간 시장보고서

> **주제:** AI 시장·기업·정책·기술 및 AI 인프라 운영기술 동향  
> **작성일:** 2026.08.19  
> **작성 기준:** 기술·시장·정책 통합 분석  
> **기준일:** 2026.08.19 / 금액은 미 달러 기준(별도 표기 제외)

## ■ 전체 내용 요약

- 2026년 AI 인프라 지출은 4,870억 달러로 전년 대비 약 53% 증가하고, 2029년 1조 달러를 넘어설 전망이다. AI 최적화 IaaS는 2026년 423억 달러(+96.4%)로 성장하며, 이 중 추론 지출이 233억 달러로 학습을 처음 앞선다.
- AI 모델·플랫폼 지출은 2026년 643억 달러(+63.4%)로 확대되고, 특화형 생성 AI 모델은 210% 성장한다. 시장의 평가축은 최대 성능에서 비용·지연·신뢰성·사용량 통제로 이동하고 있다.
- 자본은 대형 거래와 추론 인프라에 집중된다. 2026년 글로벌 AI 투자는 1조 달러를 상회할 전망이며, 상반기 AI 벤처투자는 4,070억 달러에 달했다. 8월 Etched는 7억 달러를 조달해 기업가치 210억 달러를 인정받았다.
- 모델 경쟁은 가격·속도·도구사용 능력으로 세분화됐다. OpenAI GPT-5.6, Google Gemini 3.7 Flash, DeepSeek V4 Pro가 코드·에이전트·장문맥 영역에서 경쟁하며, 공개 벤치마크의 신뢰도는 하네스·프롬프트·비용 조건의 투명성에 따라 갈린다.
- 한국은 9.9조 원 규모 AI 예산, 독자 AI 파운데이션 모델, 국산 NPUaaS를 결합할 정책 기반을 갖췄다. 반면 GPU 공급 확대만으로는 활용률·호환성·서비스 전환율이 보장되지 않아 이기종 운영 소프트웨어와 공개 검증체계가 핵심 공백으로 남아 있다.
- EU AI Act는 2026년 8월 2일부터 집행 단계에 들어갔고, 미국 NIST는 7월 29일 대외 공개 AI 문서화 초안을 제시했다. 모델카드·콘텐츠 표시·사고대응·공급망 기록은 한국 기업의 수출시장 진입을 좌우하는 제품 요건으로 전환되고 있다.
- **종합 결론:** 향후 AI 경쟁우위는 단일 모델의 최고점보다 모델·서빙엔진·오케스트레이션·집합통신·네트워크·가속기를 하나의 SLO로 최적화하는 능력에서 발생한다. 이에 따라 시장과 정책의 평가축도 GPU 보유량보다 실제 추론 처리량, 국산 NPU 사용률, 서비스 전환율과 에너지 효율로 이동하고 있다.

---

## 1. 글로벌 시장동향

### o AI 인프라: 2026년 4,870억 달러, 전년 대비 53% 성장

- 서버·스토리지 중심 AI 인프라 지출은 2026년 4,870억 달러로 확대되고 2029년 1조 달러를 넘어설 전망이다.
- 2025년 지출은 3,180억 달러였고 2025~2029년 CAGR은 약 31%다. 2025년 4분기 미국은 692억 달러로 77.0%, 중국은 84억 달러로 9.4%를 차지해 공급·수요가 미국에 집중됐다.
- **결론 및 시사점:** AI 인프라의 가치평가 기준은 서버 보유량에서 모델별 tokens/s, TTFT, P99 지연, tokens/W로 이동하고 있다. 공공 컴퓨팅 역시 가동률·전력효율·국산 가속기 이식률이 실질 성과를 가르는 구조다.

* 출처 : [AI Infrastructure Spending Caps Historic Year at $90 Billion in Q4 2025(IDC, 2026.04.16)](https://www.idc.com/resource-center/blog/ai-infrastructure-spending-caps-historic-year-at-90-billion-in-q4-2025-2029-spending-to-eclipse-1-trillion/)

### o AI 최적화 IaaS: 추론 지출이 학습을 처음 추월

- AI 최적화 IaaS는 2026년 422.8억 달러로 전년 대비 96.4% 성장하고 2027년 661.4억 달러에 이를 전망이다.
- 2026년 추론 지출은 233억 달러로 전체의 55%를 차지해 학습 190억 달러를 앞선다. 2027년 추론 비중은 59%로 높아져 운영비·지연·탄력확장이 시장의 주된 구매 기준이 된다.
- **결론 및 시사점:** 추론비용의 차이는 장비 규모보다 Prefill–Decode 분리, KV 캐시 이동과 요청별 모델 라우팅에서 확대된다. 공공 GPU의 활용가치도 학습 배분보다 상시 추론·공공서비스 API·다중 사용자 SLO에서 결정되는 국면이다.

* 출처 : [Gartner Forecasts Worldwide AI-Optimized IaaS Spending to Grow 96% in 2026(Gartner, 2026.08.10)](https://www.gartner.com/en/newsroom/press-releases/2026-08-10-gartner-forecasts-worldwide-artificial-intelligence-optimized-iaas-spending-to-grow-96-percent-in-2026)

### o 모델·플랫폼: 643억 달러, 특화 모델 210% 성장

- AI 모델·플랫폼 지출은 2025년 393억 달러에서 2026년 643억 달러로 63.4% 증가할 전망이다.
- 파운데이션 생성 AI 모델은 234억 달러(+104.2%), 도메인·특화 모델은 49억 달러(+210.0%)다. 데이터사이언스·ML 플랫폼 264억 달러와 앱 개발 플랫폼 95억 달러도 동반 성장한다.
- **결론 및 시사점:** 범용 모델과 업무별 소형·특화 모델의 혼합 운영이 정확도와 비용 균형의 표준 구조로 부상하고 있다. 의료·제조·행정의 분야별 데이터와 평가셋은 특화 모델 시장의 진입장벽이자 국내 산업의 차별화 자산으로 작용한다.

* 출처 : [Gartner Forecasts Worldwide AI Platforms and Models Market to Grow 63% in 2026(Gartner, 2026.07.20)](https://www.gartner.com/en/newsroom/press-releases/2026-07-20-gartner-forecasts-worldwide-ai-platforms-and-models-market-to-grow-63-percent-in-2026)

### o 지역·투자: 미국 집중 속 아시아 공급망 영향력 확대

- 2025년 4분기 AI 인프라 지출의 미국 비중은 77.0%, 중국은 9.4%로 집계돼 수요의 지역 집중이 심화됐다.
- 반면 2026년 AI 관련 아시아 항공화물은 전체 물량의 7%에 불과했지만 2025년 화물가치의 53.5%를 차지했다. 한국·대만·일본은 HBM·파운드리·장비 공급망에서 높은 전략가치를 보유한다.
- **결론 및 시사점:** AI 공급망 경쟁의 단위가 칩 단품에서 메모리–가속기–서버–운영 SW–서비스 패키지로 확대되고 있다. 한국의 경쟁력은 HBM·반도체 강점을 실제 서비스 스택과 수출 패키지로 연결하는 능력에 좌우된다.

* 출처 : [AI Infrastructure Spending Caps Historic Year at $90 Billion in Q4 2025(IDC, 2026.04.16)](https://www.idc.com/resource-center/blog/ai-infrastructure-spending-caps-historic-year-at-90-billion-in-q4-2025-2029-spending-to-eclipse-1-trillion/)  
* 출처 : [AI race redraws Asian air cargo, replacing e-commerce as growth engine(Reuters, 2026.07.29)](https://www.reuters.com/business/aerospace-defense/ai-race-redraws-asian-air-cargo-replacing-e-commerce-growth-engine-2026-07-29/)

### o 자본시장: 1조 달러 투자와 메가딜 중심의 쏠림

- 글로벌 AI 투자는 2026년 1조 달러를 상회할 전망이며, 상반기 AI 벤처투자는 3,500건에서 4,070억 달러를 기록했다.
- 미국 투자 비중과 초대형 라운드가 시장을 주도한다. 수익성이 지연될 경우 전력·데이터센터·반도체 자산의 감가와 자금조달비용이 동시에 커질 수 있어 실사용·매출 전환 검증이 중요하다.
- **결론 및 시사점:** AI 자본시장은 모델 규모보다 실제 추론원가, 데이터 권리, 배포 가능성, 전력효율, 상호운용성과 매출 전환을 중시하는 선별 국면으로 진입하고 있다. 메가딜 확대와 함께 실사용이 약한 자산의 재평가 위험도 커지는 흐름이다.

* 출처 : [Global Investment Is Forecast to Exceed $1 Trillion in 2026(Goldman Sachs, 2026.08.07)](https://www.goldmansachs.com/insights/articles/global-investment-is-forecast-to-exceed-1-trillion-in-2026)  
* 출처 : [Q2 2026 AI Report: $407B raised as megadeals dominate(PitchBook, 2026.08.10)](https://pitchbook.com/news/reports/q2-2026-ai-report-407-billion-raised-as-megadeals-dominate)

---

## 2. 주요 기업동향

### o 빅테크: 모델 성능 경쟁에서 가격·속도·운영효율 경쟁으로 전환

- OpenAI는 GPT-5.6 Fast를 기본 대비 2.5배 빠른 옵션으로 제시하고, 자체 서빙 최적화로 종단간 비용을 20% 줄였다고 밝혔다.
- Google은 8월 13일 Gemini 3.7 Flash를 정식 출시했다. 100만 토큰 입력 문맥과 6.5만 토큰 출력을 지원하며 FrontierCode 43.6, TerminalBench 2.1 85.8을 공개했다.
- **결론 및 시사점:** 모델 경쟁은 단일 벤치마크 순위보다 품질·가격·지연·데이터 위치·교체 가능성을 조합한 운영 경쟁으로 전환되고 있다. 공급사 수치와 실제 업무 성능의 간극이 커질수록 동일 하네스 기반 비교의 시장가치가 높아진다.

* 출처 : [Advancing the price-performance frontier with GPT-5.6(OpenAI, 2026.07.30)](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)  
* 출처 : [Gemini 3.7 Flash Model Card(Google DeepMind, 2026.08.13)](https://deepmind.google/models/model-cards/gemini-3-7-flash/)

### o 중국 기업: 가격경쟁과 자국 규제 적합성을 동시에 강화

- DeepSeek V4 Pro는 100만 입력토큰당 1.32달러, 출력토큰당 3.96달러로 출시돼 저가·고성능 전략을 강화했다.
- 독립 평가기관 Artificial Analysis 종합점수는 V4 Pro 53, V4 Flash 40으로 보도됐다. DeepSeek는 6월 74억 달러 조달과 약 740억 달러 기업가치를 추진하며 자체 AI 칩도 개발 중이다.
- **결론 및 시사점:** 중국 모델의 저가 공세는 API 단가뿐 아니라 품질·가용성·버전 안정성·장문맥 비용·규제 대응을 포함한 총소유비용 경쟁을 심화시킨다. 중국과 글로벌 서비스 간 데이터·모델 운영체계의 분리가 사업 지속성의 핵심 조건으로 부상했다.

* 출처 : [DeepSeek releases V4 Pro model as it steps up expansion(Reuters, 2026.08.13)](https://www.reuters.com/world/china/deepseek-releases-official-v4-pro-model-it-steps-up-expansion-2026-08-13/)

### o 중국 현지화: Apple–Alibaba의 이중 트랙 전략

- Apple은 Alibaba 지원으로 중국 시장 전용 대규모 언어모델을 학습하고 현지 규제 승인 체계를 밟는 것으로 보도됐다.
- Apple은 중국 당국의 독자 AI 모델 승인을 받은 첫 외국 기업으로 보도됐다. 글로벌 모델을 그대로 이전하기보다 데이터·모델·심사 체계를 지역별로 분리하는 전략이 확인된다.
- **결론 및 시사점:** 글로벌 단일 모델보다 국가별 데이터·규제·저작권에 맞춘 모델 분리와 현지화가 시장 진입의 표준 전략으로 굳어지고 있다. 공통 평가셋과 변경관리 역량은 분리 운영의 비용과 품질 편차를 좌우하는 핵심 자산이다.

* 출처 : [Apple trains its own AI model for China market with Alibaba's support(Reuters, 2026.08.14)](https://www.reuters.com/business/retail-consumer/apple-trains-its-own-ai-model-china-market-with-alibabas-support-sources-say-2026-08-14/)

### o M&A·펀딩: CUDA 대항 상호운용 SW와 추론칩에 자본 집중

- Qualcomm은 칩별 재작성 없이 AI 모델을 구동하는 Modular을 약 40억 달러에 인수해 소프트웨어 생태계 경쟁에 진입했다.
- 추론칩 스타트업 Etched는 8월 18일 7억 달러를 조달하며 기업가치 210억 달러를 인정받았다. 고객계약은 10억 달러 이상으로 보도돼 투자 기준이 학습칩에서 tokens/$ 중심 추론칩으로 이동했다.
- **결론 및 시사점:** AI 반도체의 가치 중심이 칩 사양에서 컴파일러·런타임·커널·서빙 SW·개발자 생태계로 이동하고 있다. 상호운용 SW와 모델 이식비용이 반도체 기업의 성장성과 인수 가치를 결정하는 비중도 커졌다.

* 출처 : [Qualcomm to buy startup Modular for $4 billion in AI software push(Reuters, 2026.06.24)](https://www.reuters.com/business/qualcomm-buy-ai-startup-modular-2026-06-24/)  
* 출처 : [AI chip startup Etched doubles valuation to $21 billion(Reuters, 2026.08.18)](https://www.reuters.com/technology/ai-chip-startup-etched-valued-21-billion-latest-funding-round-2026-08-18/)

### o 한국 기업: 국산 NPU의 클라우드 서비스 진입

- FuriosaAI와 삼성SDS는 7월 20일 국내 최초 상용 국산 NPUaaS를 삼성 클라우드 플랫폼에 출시했다.
- RNGD는 FP8 512TFLOPS, 메모리 대역폭 1.5TB/s, 전력 180W 사양을 제시하며 1·2·4·8카드 단위 온디맨드 구성을 지원한다. 해당 수치는 업체 사양으로, 독립 검증 전에는 실서비스 성능으로 일반화하기 어렵다.
- **결론 및 시사점:** 국산 NPU의 시장진입 여부는 정점성능보다 모델 지원범위, 양자화 정확도, 동시성, 장애복구와 서빙엔진 완성도에서 결정된다. GPU 대비 성능·전력·비용을 동일 조건에서 확인할 수 있는 독립 검증이 시장 신뢰의 핵심 변수다.

* 출처 : [FuriosaAI and Samsung SDS Launch Korea's First Commercial NPUaaS(FuriosaAI, 2026.07.20)](https://furiosa.ai/blog/furiosaai-and-samsung-sds)

### o 한국 독자 AI: 3개 팀 경쟁과 가속기 지원 확대

- 8월 18일 독자 AI 파운데이션 모델 2단계 평가에서 업스테이지·SK텔레콤·LG AI연구원이 3단계 진출팀으로 선정됐다.
- 평가는 벤치마크 40%, 전문가 35%, 사용자 25%로 구성됐고 B200 지원은 768장에서 1,000장으로 확대됐다. 2027년 초 최종 2개 팀 선정이 예정돼 있다.
- **결론 및 시사점:** 독자 AI 경쟁은 정적 벤치마크를 넘어 도구사용·장문맥·안전성·비용·국산 NPU 이식성과 실제 서비스 전환능력의 경쟁으로 확대되고 있다. 컴퓨팅 지원 규모보다 서비스·산업 생태계와의 결합력이 최종 차별화 요인이다.

* 출처 : [독자 AI 파운데이션 모델 프로젝트 2단계 평가 결과(Korea Daily, 2026.08.18)](https://www.koreadaily.com/article/20260818005054720)

---

## 3. 정책·규제동향

### o 한국: 9.9조 원 AI 예산을 성과형 집행으로 전환할 시점

- 2026년 정부 AI 예산은 총 9.9조 원으로 전년 대비 약 3배이며, 41개 부처 741개 사업에 편성됐다.
- 부처별로 과기정통부 5.1조 원(51%), 산업부 1.7조 원(17%), 중기부 0.9조 원(9%)이다. 사업이 41개 부처 741개로 분산돼 중복투자·GPU 유휴·실증 종료 후 단절을 식별할 공동 성과체계가 현재의 구조적 공백이다.
- **결론 및 시사점:** 대규모 AI 예산의 성과는 개별 장비·연구과제보다 모델–데이터–가속기–서빙의 통합성과 서비스 전환율에서 갈리는 구조다. 부처별 사업이 분산될수록 공통 성과지표와 재현 가능한 평가단위의 중요성이 커진다.

* 출처 : [2026년 인공지능 분야 예산안 총 9.9조원(AI Korea·과학기술정보통신부, 2025.09.01)](https://www.aikorea.go.kr/web/board/brdDetail.do?menu_cd=000011&num=359)

### o EU: AI Act 집행과 투명성 의무가 8월 2일 본격화

- EU AI Act는 2026년 8월 2일부터 집행 단계에 들어가 AI Office와 회원국 감독기관의 권한이 본격 작동한다.
- 제50조 지침은 대화형 AI 고지와 AI 생성·조작 콘텐츠의 기계판독 표시를 구체화했다. 일부 고위험 시스템 일정은 AI Omnibus에 따라 2027~2028년으로 조정됐다.
- **결론 및 시사점:** EU 규제 대응은 사후 법무업무가 아니라 워터마크·로그·모델카드·위험평가가 내장된 제품개발 역량으로 전환되고 있다. 문서와 증빙의 재사용성이 낮은 기업일수록 유럽 진입비용과 출시 지연이 커질 가능성이 높다.

* 출처 : [Commission starts enforcing AI Act rules and new transparency requirements(European Commission, 2026.07.31)](https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august)  
* 출처 : [Guidelines on AI transparency obligations(European Commission, 2026.08.06)](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations)

### o 미국: 공개 AI 문서화 표준과 민관 보안협력 강화

- 미국 NIST는 7월 29일 대외 공개 AI 문서화를 위한 표준 제로 초안과 템플릿을 공개하고 9월 16일까지 의견을 수렴한다.
- 백악관은 7월 14일 OpenAI·Anthropic·NVIDIA·Meta 등이 참여하는 AI·사이버보안 협력그룹을 출범시켜 핵심 인프라 위협정보 공유를 강화했다.
- **결론 및 시사점:** 시스템카드·취약점 공개·보안 정보공유가 모델 공급망의 신뢰를 판단하는 기본 인프라로 자리 잡고 있다. 문서화 수준은 모델 교체·사고조사·공급망 관리의 속도와 공공시장 진입 가능성을 함께 좌우한다.

* 출처 : [AI Standards — Public-Facing AI Documentation Zero Draft(NIST, 2026.07.29)](https://www.nist.gov/artificial-intelligence/ai-standards)  
* 출처 : [US to launch AI cybersecurity coordination group(Reuters, 2026.07.14)](https://www.reuters.com/technology/us-launch-ai-cybersecurity-coordination-group-white-house-says-2026-07-14/)

### o 중국: 인간형 상호작용 AI에 별도 규율 적용

- 중국의 인간형 상호작용 AI 서비스 관리조치는 2026년 7월 15일 시행돼 감정적 의존과 인격 모방 서비스에 별도 의무를 부과한다.
- 사업자는 AI임을 명확히 고지하고 과도한 의존·유해 상호작용을 통제해야 한다. 대화형·에이전트 서비스는 일반 생성 AI 규정 외에 사용자 관계 위험까지 관리대상이 된다.
- **결론 및 시사점:** 대화형 AI 규율이 콘텐츠 안전을 넘어 정서적 의존·미성년자 보호·인간 대체 오인 등 관계 위험으로 확대되고 있다. 장기기억·개인화·음성·아바타 기능이 강할수록 별도의 안전성 평가와 책임 범위가 요구되는 흐름이다.

* 출처 : [China's New Regulations on AI Anthropomorphic Interactive Services(Bird & Bird, 2026.07.15)](https://www.twobirds.com/en/insights/2026/china/china%27s-new-regulations-on-ai-anthropomorphic-interactive-services)

### o 국제 협력: 규제 문구보다 상호운용 가능한 증빙이 핵심

- G7·OECD 원칙은 위험기반·인권·투명성의 공통 방향을 제공하지만 기업 현장에서는 국가별 증빙 양식이 여전히 다르다.
- 8월 정책 변화는 EU의 표시·집행, 미국의 문서화, 중국의 서비스별 규율로 구체화됐다. 국제 경쟁의 실질 쟁점은 원칙 선언보다 모델카드·데이터 계보·사고보고를 여러 관할권에서 재사용할 수 있는 증빙 상호운용성으로 이동했다.
- **결론 및 시사점:** 국제 규제 경쟁의 실무 초점은 원칙 선언보다 로그·평가결과·시험성적을 관할권 간 재사용할 수 있는 증빙 상호운용성으로 이동하고 있다. 공통 기술문서 스키마와 시험성적 상호인정이 중소기업의 수출비용을 가르는 요인이다.

* 출처 : [OECD AI Principles(OECD, 2024.05.03 개정)](https://www.oecd.org/en/topics/sub-issues/ai-principles.html)  
* 출처 : [Regulatory framework for AI(European Commission, 2026.08.02 적용)](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)

---

## 4. 기술 발전동향

### o SOTA: Gemini 3.7 Flash의 코드·에이전트 성능 상승

- Gemini 3.7 Flash는 FrontierCode 43.6으로 3.6 Flash의 34.4보다 9.2%p, AutomationBench는 30.4로 13.4%p 상승했다.
- TerminalBench 2.1은 85.8, DeepSWE는 65.3, CodeArena는 1,588 Elo를 기록했다. 가격은 100만 토큰당 입력 0.75달러, 출력 3.75달러의 출시 프로모션 기준이다.
- **결론 및 시사점:** 공개 모델카드는 기술 진전을 보여주지만 실제 배포 우위는 동일 하네스에서의 업무 성공률·도구사용·보안·비용·에너지로 판별되는 구조다. 정적 지식점수와 현장 업무성능의 괴리도 확대되고 있다.

* 출처 : [Gemini 3.7 Flash Model Card(Google DeepMind, 2026.08.13)](https://deepmind.google/models/model-cards/gemini-3-7-flash/)

### o 모델 효율: 서빙 커널·캐시·출력길이가 총비용을 결정

- OpenAI는 GPT-5.6 서빙 커널 최적화로 종단간 비용 20%, 토큰 생성 효율 15% 개선을 발표했다.
- 고객사 사례에서는 프롬프트 캐시 재사용률 24%→90%, 출력토큰 8.5배 감소, 총비용 87% 절감이 보고됐다. 이는 특정 워크로드 결과이므로 독립 재현 전에는 일반적 효율개선율로 보기 어렵다.
- **결론 및 시사점:** 모델 경제성의 핵심 단위가 토큰 가격에서 캐시 적중률·출력길이·재시도율·동시성·SLO 위반을 포함한 성공업무 1건당 비용으로 이동하고 있다. 서빙 최적화가 모델 교체만큼 큰 비용 차이를 만드는 시장이다.

* 출처 : [Advancing the price-performance frontier with GPT-5.6(OpenAI, 2026.07.30)](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)

### o 오픈소스 서빙: vLLM의 빠른 모델 지원과 운영기반 확장

- PyTorch Foundation은 vLLM의 격주 릴리스와 Model Runner V2의 GPTQ 성능개선을 공개했다.
- Kimi K3·MiniMax M3·Qwen 3.8 등 신규 모델의 당일 지원을 강화하고 있다. 오픈소스 서빙엔진은 특정 클라우드 종속을 낮추는 대신 커널 품질·회귀시험·보안패치 역량이 운영 안정성을 좌우한다.
- **결론 및 시사점:** 오픈소스 서빙엔진의 경쟁력은 처리량뿐 아니라 회귀관리·관측성·멀티테넌시·장애대응과 상위 생태계 호환성에서 결정된다. 국산 NPU의 확산성도 개별 SDK보다 vLLM·PyTorch와의 지속적 호환 여부에 좌우된다.

* 출처 : [Driving the Future of Open Source AI: PyTorch Foundation Projects Update(PyTorch Foundation, 2026.07.22)](https://pytorch.org/blog/driving-the-future-of-open-source-ai-an-update-from-pytorch-foundation-projects/)

### o 하드웨어: 랙 스케일·추론 특화와 이기종 구성이 동시 진전

- AMD는 MI455X와 Venice CPU를 결합한 2세대 Helios AI 서버를 양산 중이며 2026년 3분기 말 출하 예정이다.
- OpenAI는 연내 Helios 랙 사용 계획을 밝혔다. 한편 FuriosaAI RNGD는 180W와 512TFLOPS FP8을 제시해 국산 NPU가 클라우드 추론 서비스 단계로 진입했다.
- **결론 및 시사점:** GPU·NPU 비교의 실질 기준은 정점연산량이 아니라 정확도·메모리·집합통신·서빙 SW·전력·가격을 결합한 워크로드 단위 효율이다. 제품 사양과 실제 서비스 효율의 간극이 클수록 표준화된 PoB의 시장가치가 높아진다.

* 출처 : [AMD says its newest AI server is in full production(Reuters, 2026.07.23)](https://www.reuters.com/business/amd-expected-launch-next-generation-ai-infrastructure-challenge-nvidia-2026-07-23/)  
* 출처 : [FuriosaAI and Samsung SDS Launch Korea's First Commercial NPUaaS(FuriosaAI, 2026.07.20)](https://furiosa.ai/blog/furiosaai-and-samsung-sds)

---

## 5. 이달의 심층분석: 에이전틱 추론과 이기종 AI 인프라

### o 문제의 맥락과 성공 기준

- 에이전트는 계획·도구호출·검증·재시도를 반복해 챗봇보다 훨씬 많은 토큰과 상태 이동을 유발한다.
- 성공 기준은 모델 1회 응답속도가 아니라 전체 업무 성공률, 완료시간, 토큰·전력·비용, P95/P99 지연, 장애복구다. 따라서 모델과 인프라를 분리 평가하면 실제 병목을 놓친다.
- **결론 및 시사점:** 에이전틱 추론에서는 모델 1회 응답보다 SLO 라우팅·KV 캐시·Prefill–Decode 분리·모델 계층화가 업무완료율과 비용을 좌우한다. 데모 성능보다 월간 실사용량과 오류·사고·비용절감의 지속성이 상용화 가능성을 보여준다.

* 출처 : [Gartner Forecasts Worldwide AI-Optimized IaaS Spending to Grow 96% in 2026(Gartner, 2026.08.10)](https://www.gartner.com/en/newsroom/press-releases/2026-08-10-gartner-forecasts-worldwide-artificial-intelligence-optimized-iaas-spending-to-grow-96-percent-in-2026)  
* 출처 : [About MangoBoost — Agentic AI Full-Stack Infrastructure(MangoBoost, 2026.08.19 조회)](https://www.mangoboost.io/company/about)

### o 운영 스택: 배치·라우팅·통신·전송의 역할 구분

| 계층 | 핵심 역할 | 대표 검증지표 |
|---|---|---|
| 오케스트레이션 | 자원 발견, 컨테이너 배치, 격리, 쿼터, 오토스케일 | 대기시간, 활용률, 공정성, 복구시간 |
| 추론 게이트웨이 | 요청·SLO·KV 캐시·모델 비용 기반 실시간 라우팅 | TTFT, P95/P99, 성공률, 비용/업무 |
| CCL(집합통신) | All-Reduce·All-Gather 등 다중 가속기 동기화 | 대역폭, 확장효율, straggler 영향 |
| RDMA/RoCE | 서버 간 메모리 직접전송과 저지연 패브릭 | 처리량, 지연, 패킷손실, 재전송 |
| PCIe | 서버 내부 CPU·GPU·NPU·NIC 연결 | 링크 대역폭, NUMA 영향, 혼잡 |

- PCIe는 서버 내부 연결, RDMA/RoCE는 서버 간 저지연 전송, CCL은 학습·추론의 집합통신, 오케스트레이터는 자원배치를 담당한다.
- 네 계층은 대체관계가 아니라 상호보완 관계다. 공공 RFP에서 용어를 혼용하면 공급범위·성능책임·장애원인이 불분명해져 벤더 종속과 검수분쟁이 커진다.
- **결론 및 시사점:** 이기종 AI 인프라의 성능책임은 오케스트레이션·라우팅·집합통신·RDMA/RoCE·PCIe를 구분하고 공통 trace로 연결할 때 비로소 측정 가능하다. 계층 간 경계가 불명확할수록 조달 검수와 장애책임 분쟁이 커진다.

### o 국내 기술축 ① Moreh: 크로스벤더 분산 추론·집합통신

- Moreh는 H100 Prefill과 MI300X Decode를 결합한 GPT-OSS 120B 추론에서 지연 최대 43% 감소, 처리량 최대 67% 향상을 발표했다.
- HetCCL은 NVIDIA NCCL과 AMD RCCL을 연결해 드라이버 수정 없이 크로스벤더 RDMA 집합통신을 구현한다. 결과는 업체·연구팀 환경 기준이며, 구성·부하·정확도 조건이 공개되지 않으면 상용환경 재현성을 판단하기 어렵다.
- **결론 및 시사점:** 크로스벤더 KV 캐시 전송과 집합통신은 이기종 풀 구성의 가능성을 보여주지만, 최저속 장치·네트워크 병목·시험 재현성이 상용화의 관건이다. 혼합구성의 장점은 단일벤더 대비 동일 조건 비교에서만 명확해진다.

* 출처 : [Cross-Vendor Disaggregated Inference: GPT-OSS 120B across NVIDIA H100 and AMD MI300X(Moreh, 2026.03.18)](https://moreh.io/blog/)  
* 출처 : [HetCCL: Accelerating LLM Training with Heterogeneous GPUs(Moreh, 2026.01.30)](https://moreh.io/technical-report/hetccl-accelerating-llm-training-with-heterogeneous-gpus-260130/)

### o 국내 기술축 ② Backend.AI: 자원 거버넌스와 이기종 운영

- Backend.AI는 Sokovan의 2단계 스케줄링과 HAL을 통해 NVIDIA·AMD·Intel·국산 NPU를 자원그룹으로 통합 관리한다.
- 컨테이너 수준 fractional GPU, 그룹별 회계·쿼터, Prometheus 호환 모니터링을 제공한다. 다만 공개자료만으로는 세부 토폴로지 점수화와 KV 캐시 라우팅 기능의 구현 수준이 확인되지 않는다.
- **결론 및 시사점:** 멀티테넌시·쿼터·격리·사용량 회계가 연구용 클러스터와 상용 AI 컴퓨팅 서비스를 구분한다. 추론 라우팅과 자원 거버넌스의 결합 수준이 서비스 안정성·비용배부·SLA 이행능력을 좌우한다.

* 출처 : [Backend.AI's heterogeneous GPU operation strategy(Lablup, 2026.06.19)](https://www.backend.ai/blog/2026-06-heterogeneous-gpu-operation)  
* 출처 : [Backend.AI — AI Infrastructure OS(Lablup, 2026.08.19 조회)](https://www.backend.ai/)

### o 국내 기술축 ③ MangoBoost: 에이전트용 풀스택·DPU 접근

- MangoBoost는 DPU, AI Agent OS, 서버, 데이터센터를 결합하고 네트워크·스토리지·보안을 GPU에서 오프로딩하는 전략을 제시한다.
- GENIES 사례에서 처리량 2배, 지연 33% 감소, TCO 50% 절감을 발표했으나 공급사·고객 사례 수치다. 워크로드·기준선·하드웨어 조건이 확인되지 않은 상태에서는 일반적 성능개선율로 해석하기 어렵다.
- **결론 및 시사점:** 에이전트 워크로드에서는 DPU·메모리 계층·네트워크 오프로딩의 가치가 커지며, 국내 경쟁력은 DPU–NPU–서빙 SW를 묶은 시스템 단위에서 형성된다. 공급사 성능주장의 신뢰도는 시험조건과 원시데이터의 투명성에 좌우된다.

* 출처 : [About MangoBoost — Agentic AI Full-Stack Infrastructure(MangoBoost, 2026.08.19 조회)](https://www.mangoboost.io/company/about)  
* 출처 : [MangoBoost Case Studies — GENIES(MangoBoost, 2026.08.19 조회)](https://mangoboost.io/solutions/case-study)

### o 종합 결론: 국내의 공백은 ‘가속기 사이의 운영계층’

- 국내는 모델·NPU·클라우드 역량을 보유하지만 이들을 공통 API·런타임·라우팅·관측성으로 묶는 운영계층은 분절돼 있다.
- 이 공백을 방치하면 국산 NPU는 개별 PoC에 머물고 GPU는 특정 생태계에 잠긴다. 공통 인터페이스와 공개 PoB가 구축되면 다양한 가속기를 업무별로 배치해 공급망·비용 리스크를 낮출 수 있다.
- **결론 및 시사점:** 국내 생태계의 핵심 공백은 칩이나 모델이 아니라 벤더중립 API·호환성·집합통신·SLO 라우팅·관측성을 묶는 운영계층이다. 이 계층의 완성도가 국산 NPU의 PoC 탈피와 GPU 종속 완화 가능성을 함께 결정한다.

---

## 6. 시사점 및 향후 전망

### o 추론경제 전환: 인프라 경쟁의 평가축 변화

- 2026년 추론 지출이 학습을 처음 앞서면서 AI 인프라의 수익구조가 일회성 대규모 학습에서 상시 서비스 운영으로 이동하고 있다.
- 추론시장에서는 GPU 보유량보다 TTFT·P95/P99·tokens/W·성공업무당 비용과 캐시 효율이 사업성과를 설명하는 핵심 지표가 된다.
- **결론 및 시사점:** AI 인프라 경쟁의 평가축은 자산 규모에서 운영효율과 서비스 신뢰성으로 전환되고 있다. 모델·캐시·라우팅·전력의 통합 최적화 역량이 향후 6~12개월의 비용 격차를 확대할 가능성이 높다.

### o 이기종 가속기 확산: 국산 NPU의 기회와 운영 SW 공백

- 국산 NPUaaS와 크로스벤더 추론 기술의 상용화는 공급망 다변화 가능성을 높였지만, 모델 호환성·집합통신·장애복구·관측성은 여전히 분절돼 있다.
- 국산 가속기의 실제 경쟁력은 정점성능보다 기존 PyTorch·vLLM 생태계와의 연결성, GPU 대비 업무당 비용, 운영자의 전환비용에서 판별된다.
- **결론 및 시사점:** 이기종 인프라의 확산은 국산 NPU에 시장 진입기회를 제공하는 동시에 운영 SW 공백을 노출한다. 벤더중립 운영계층의 성숙도가 국산 가속기의 PoC 탈피와 반복매출 형성을 가르는 조건이다.

### o 모델 경쟁 심화: 최고성능보다 업무당 경제성

- GPT·Gemini·DeepSeek의 경쟁은 코드·에이전트·장문맥 등 용도별로 세분화되고, API 가격과 추론속도의 차이가 빠르게 좁혀지고 있다.
- 범용 대형모델과 소형·특화모델을 요청별로 조합하는 구조가 단일 모델 고정 방식보다 비용·지연·데이터 통제에서 유리한 흐름이다.
- **결론 및 시사점:** 모델 우위는 공개 벤치마크 최고점보다 동일 업무에서의 성공률·지연·보안·에너지·총비용으로 결정된다. 모델 교체 가능성과 라우팅 역량이 구매자 협상력의 핵심으로 부상할 전망이다.

### o 규제의 시장진입요건화

- EU 집행, 미국의 공개 문서화, 중국의 인간형 상호작용 규율은 AI 규제가 원칙 단계에서 제품·서비스별 증빙 단계로 이동했음을 보여준다.
- 모델카드·데이터 계보·콘텐츠 표시·로그·사고대응 기록은 법무 문서가 아니라 수출·조달·파트너십 심사의 공통 자료가 되고 있다.
- **결론 및 시사점:** 규제 준수능력이 품질·가격과 함께 시장진입을 결정하는 제품 역량으로 편입되고 있다. 증빙 자동화와 관할권 간 재사용성이 낮은 기업의 출시 지연과 대응비용이 상대적으로 커질 전망이다.

### o 향후 6~12개월 전망

- AI 최적화 IaaS는 추론 비중 확대와 함께 고성장을 이어가되, 하이퍼스케일러 자본지출의 수익성 검증 압력도 동시에 높아질 전망이다.
- 모델 API 가격경쟁은 지속되고, 특화모델·추론칩·오픈소스 서빙엔진이 범용 대형모델의 비용구조를 압박할 가능성이 크다.
- 국내에서는 9.9조 원 AI 예산, 독자 AI 모델, 국산 NPUaaS가 결합되면서 공공 컴퓨팅의 초점이 장비 배분에서 서비스 전환과 민간 수요 창출로 이동할 것으로 보인다.
- **결론 및 시사점:** 시장의 상승세는 유지되지만 자본·모델·인프라의 평가기준은 더욱 엄격해진다. 실제 업무수요와 연결되지 않은 연산자산은 재평가 압력을 받고, 운영효율·상호운용성·규제 증빙을 갖춘 사업자는 프리미엄을 확보할 가능성이 높다.

### o 9월 핵심 관찰지표

- 정책·시장에서는 EU AI Act 초기 집행사례, NIST 문서화 초안 의견수렴, 독자 AI 3단계 과제, B200 1,000장 배분방식, AI 최적화 IaaS 추론 비중과 모델 API 가격을 관찰한다.
- 기술에서는 Gemini·GPT·DeepSeek의 동일 하네스 비교, vLLM 신규 릴리스의 회귀·보안, Moreh·Backend.AI·MangoBoost·FuriosaAI의 동일 모델·트래픽 기반 성능자료가 핵심 변수다.
- **결론 및 시사점:** 9월의 방향성은 정책 발표의 규모보다 집행조건과 공개 검증자료에서 확인될 가능성이 높다. 동일 조건 비교가 가능한 데이터의 축적 여부가 시장 기대와 실제 사업성의 간극을 보여줄 것이다.

---

# 별첨. 정책 제언(안)

| 정책과제 | 정책목표 | 주요 실행내용 | 핵심 성과지표 |
|---|---|---|---|
| 추론 우선형 국가 AI 컴퓨팅 풀 | GPU·국산 NPU를 통합한 상시 추론 서비스 기반 조성 | 3개월 내 서비스 카탈로그, 6개월 내 멀티테넌트 추론 API, 12개월 내 민간 CSP 연계 | 가동률 70% 이상, P95 SLO 충족률 99%, 국산 NPU 추론 비중 30% 이상 |
| 벤더중립 AI 인프라 상호운용 레이어 | 모델·서빙·장치·집합통신·관측성의 개방형 참조구현 확보 | PyTorch·vLLM 호환 CI, NVIDIA·AMD·국산 NPU 3종 이상 이식, CCL·RDMA·RoCE 연계 시험 | 모델 10종, 코드변경 10% 미만, 성능저하 15% 이내, 장애전환 5분 이내 |
| 국가 AI PoB·벤치마크 인증체계 | 장비·모델·서빙 SW의 동일 업무조건 비교와 결과 재현성 확보 | 한국어·코드·멀티모달·에이전트 4개 트랙, TTFT·TPOT·P99·tokens/W·tokens/원·정확도 측정 | 연 2회 갱신, 20개 시스템 참여, 결과 재현률 90% 이상 |
| 독자모델–국산 NPU–수요서비스 삼각 실증 | 모델·칩·수요서비스의 공동 최적화와 유료 전환 검증 | 행정·제조·의료·콘텐츠 4개 분야 모델–NPU 공동튜닝 및 실서비스 계약 연계 | 국산 NPU 서비스 8건, TCO 20% 절감 3건, 민간 매출 100억 원 |
| 수출형 AI 신뢰·문서화 패키지 | EU·미국·중국 규제에 공통 대응하는 수출 증빙체계 구축 | 3개월 내 공공 표준안, 6개월 내 자동 문서화 도구, 12개월 내 시험성적 상호인정 협의 | 기업 100개 적용, 문서작성시간 50% 단축, EU 대응 실증 20건 |

---

# 관련근거 및 출처

1. [AI Infrastructure Spending Caps Historic Year at $90 Billion in Q4 2025(IDC, 2026.04.16)](https://www.idc.com/resource-center/blog/ai-infrastructure-spending-caps-historic-year-at-90-billion-in-q4-2025-2029-spending-to-eclipse-1-trillion/)
2. [Gartner Forecasts Worldwide AI-Optimized IaaS Spending to Grow 96% in 2026(Gartner, 2026.08.10)](https://www.gartner.com/en/newsroom/press-releases/2026-08-10-gartner-forecasts-worldwide-artificial-intelligence-optimized-iaas-spending-to-grow-96-percent-in-2026)
3. [Gartner Forecasts Worldwide AI Platforms and Models Market to Grow 63% in 2026(Gartner, 2026.07.20)](https://www.gartner.com/en/newsroom/press-releases/2026-07-20-gartner-forecasts-worldwide-ai-platforms-and-models-market-to-grow-63-percent-in-2026)
4. [AI race redraws Asian air cargo, replacing e-commerce as growth engine(Reuters, 2026.07.29)](https://www.reuters.com/business/aerospace-defense/ai-race-redraws-asian-air-cargo-replacing-e-commerce-growth-engine-2026-07-29/)
5. [Global Investment Is Forecast to Exceed $1 Trillion in 2026(Goldman Sachs, 2026.08.07)](https://www.goldmansachs.com/insights/articles/global-investment-is-forecast-to-exceed-1-trillion-in-2026)
6. [Q2 2026 AI Report: $407B raised as megadeals dominate(PitchBook, 2026.08.10)](https://pitchbook.com/news/reports/q2-2026-ai-report-407-billion-raised-as-megadeals-dominate)
7. [Advancing the price-performance frontier with GPT-5.6(OpenAI, 2026.07.30)](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)
8. [Gemini 3.7 Flash Model Card(Google DeepMind, 2026.08.13)](https://deepmind.google/models/model-cards/gemini-3-7-flash/)
9. [DeepSeek releases V4 Pro model as it steps up expansion(Reuters, 2026.08.13)](https://www.reuters.com/world/china/deepseek-releases-official-v4-pro-model-it-steps-up-expansion-2026-08-13/)
10. [Apple trains its own AI model for China market with Alibaba's support(Reuters, 2026.08.14)](https://www.reuters.com/business/retail-consumer/apple-trains-its-own-ai-model-china-market-with-alibabas-support-sources-say-2026-08-14/)
11. [Qualcomm to buy startup Modular for $4 billion in AI software push(Reuters, 2026.06.24)](https://www.reuters.com/business/qualcomm-buy-ai-startup-modular-2026-06-24/)
12. [AI chip startup Etched doubles valuation to $21 billion(Reuters, 2026.08.18)](https://www.reuters.com/technology/ai-chip-startup-etched-valued-21-billion-latest-funding-round-2026-08-18/)
13. [FuriosaAI and Samsung SDS Launch Korea's First Commercial NPUaaS(FuriosaAI, 2026.07.20)](https://furiosa.ai/blog/furiosaai-and-samsung-sds)
14. [독자 AI 파운데이션 모델 프로젝트 2단계 평가 결과(Korea Daily, 2026.08.18)](https://www.koreadaily.com/article/20260818005054720)
15. [2026년 인공지능 분야 예산안 총 9.9조원(AI Korea·과학기술정보통신부, 2025.09.01)](https://www.aikorea.go.kr/web/board/brdDetail.do?menu_cd=000011&num=359)
16. [Commission starts enforcing AI Act rules and new transparency requirements(European Commission, 2026.07.31)](https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august)
17. [Guidelines on AI transparency obligations(European Commission, 2026.08.06)](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations)
18. [AI Standards — Public-Facing AI Documentation Zero Draft(NIST, 2026.07.29)](https://www.nist.gov/artificial-intelligence/ai-standards)
19. [US to launch AI cybersecurity coordination group(Reuters, 2026.07.14)](https://www.reuters.com/technology/us-launch-ai-cybersecurity-coordination-group-white-house-says-2026-07-14/)
20. [China's New Regulations on AI Anthropomorphic Interactive Services(Bird & Bird, 2026.07.15)](https://www.twobirds.com/en/insights/2026/china/china%27s-new-regulations-on-ai-anthropomorphic-interactive-services)
21. [OECD AI Principles(OECD, 2024.05.03 개정)](https://www.oecd.org/en/topics/sub-issues/ai-principles.html)
22. [Regulatory framework for AI(European Commission, 2026.08.02 적용)](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
23. [Driving the Future of Open Source AI: PyTorch Foundation Projects Update(PyTorch Foundation, 2026.07.22)](https://pytorch.org/blog/driving-the-future-of-open-source-ai-an-update-from-pytorch-foundation-projects/)
24. [AMD says its newest AI server is in full production(Reuters, 2026.07.23)](https://www.reuters.com/business/amd-expected-launch-next-generation-ai-infrastructure-challenge-nvidia-2026-07-23/)
25. [Cross-Vendor Disaggregated Inference: GPT-OSS 120B across NVIDIA H100 and AMD MI300X(Moreh, 2026.03.18)](https://moreh.io/blog/)
26. [HetCCL: Accelerating LLM Training with Heterogeneous GPUs(Moreh, 2026.01.30)](https://moreh.io/technical-report/hetccl-accelerating-llm-training-with-heterogeneous-gpus-260130/)
27. [Backend.AI's heterogeneous GPU operation strategy(Lablup, 2026.06.19)](https://www.backend.ai/blog/2026-06-heterogeneous-gpu-operation)
28. [Backend.AI — AI Infrastructure OS(Lablup, 2026.08.19 조회)](https://www.backend.ai/)
29. [About MangoBoost — Agentic AI Full-Stack Infrastructure(MangoBoost, 2026.08.19 조회)](https://www.mangoboost.io/company/about)
30. [MangoBoost Case Studies — GENIES(MangoBoost, 2026.08.19 조회)](https://mangoboost.io/solutions/case-study)

//

## 작성 기준 및 유의사항

- 시장동향은 최근 6개월, 기업동향은 최근 3개월, 정책·규제와 기술동향은 최근 1개월 자료를 우선 적용했다. 정부 예산·국제원칙·이기종 집합통신은 현재 정책·기술의 기준선 확인을 위해 예외적으로 이전 자료를 병기했다.
- 기업 발표의 성능·비용 수치는 ‘공급사 또는 고객 사례’로 구분했으며, 독립 재현 전에는 일반화하지 않았다.
- 벤치마크 비교 시 모델뿐 아니라 프롬프트, 하네스, 샘플링, 토큰 예산, 동시성, 하드웨어, 전력, 가격 조건을 함께 확인해야 한다.
- 본 보고서는 공개자료와 2026년 8월 모아 수집자료를 통합한 시장·정책 분석 초안이며 투자·법률 자문을 대체하지 않는다.
