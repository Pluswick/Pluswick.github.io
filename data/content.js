/*
 * ─────────────────────────────────────────────────────────────
 *  Portfolio content — edit this file only.
 *  Every text field is either a plain string (same in both languages)
 *  or { en: "...", ko: "..." }.
 * ─────────────────────────────────────────────────────────────
 */
window.CONTENT = {
  /* ── Profile ─────────────────────────────────────────────── */
  profile: {
    name: { en: "Seonghan Kim", ko: "김성한" },
    // ▼ Put your photo at this path (portrait ~4:5, e.g. 800×1000). Until then, initials are shown.
    photo: "images/profile.jpg",
    initials: "SK",
    kicker: { en: "AI Researcher", ko: "AI 연구자" },
    title: {
      en: "My research focuses on machine learning for computer vision, the bio domain, and on-device inference.",
      ko: "컴퓨터 비전, 바이오 분야, 온디바이스 추론을 위한 기계학습을 연구하고 있습니다.",
    },
    education: {
      school: { en: "Sangmyung University", ko: "상명대학교" },
      degree: { en: "B.S. candidate", ko: "학사 졸업 예정" },
      graduation: "2027.02",
      logo: "images/smu-logo.png", // e.g. "2027.02" — leave empty to hide
      majors: [
        { name: { en: "Electronic Engineering", ko: "융합전자공학전공" }, note: { en: "1st major", ko: "1전공" } },
        { name: { en: "Human-Centered AI Engineering", ko: "휴먼AI공학전공" }, note: { en: "2nd major", ko: "2전공" } },
      ],
    },
    // Each item is one paragraph
    about: [
      {
        en: "I'm a final-year undergraduate at Sangmyung University, double-majoring in Electronic Engineering and Human-Centered AI Engineering. My work spans computer vision for general and medical imaging, AI for the bio domain, and on-device AI on embedded systems such as NPUs. As the lead researcher on industry and institute-funded projects, I have covered everything from model design to NPU deployment, and turned two of them into first-author journal manuscripts.",
        ko: "상명대학교 융합전자공학전공(1전공)과 휴먼AI공학전공(2전공) 졸업 예정자입니다. 일반·의료 영상을 다루는 컴퓨터 비전, 바이오 분야를 위한 AI, NPU와 같은 임베디드 시스템의 온디바이스 AI를 연구해 왔습니다. 기업·연구기관 과제의 실무 책임을 맡아 모델 설계부터 NPU 배포까지 다뤘고, 그중 두 프로젝트를 1저자 저널 논문 작성으로 이어갔습니다.",
      },
      {
        en: "In my master's program, I aim to study model compression and optimization, how training data affects model performance, and reinforcement learning.",
        ko: "석사 과정에서는 모델 구조 경량화 및 최적화, 학습 데이터가 모델 성능에 미치는 영향, 그리고 강화학습을 연구하고자 합니다.",
      },
    ],
    location: { en: "Seoul, Korea", ko: "대한민국 서울" },
    links: {
      email: "lucidus814@gmail.com",
      github: "https://github.com/Pluswick",
    },
  },

  /* ── Publications ────────────────────────────────────────── */
  publications: [
    {
      title: "Dissecting Tissue-Context Effects in Graph Neural Networks for Rat Kp Prediction: Additive Shifts, Fusion Position, and Extrapolation",
      position: 1,
      venue: "Journal of Pharmacokinetics and Pharmacodynamics (Springer Nature)",
      index: "SCIE", quartile: "Q2",
      thumb: "images/pub-kp.png",
      domains: ["bio"],
      status: "review",
      year: "2026",
    },
    {
      title: "The choice of species representation in multi-species aquatic acute-toxicity prediction is constrained by data availability rather than by predictive accuracy",
      position: 1,
      venue: "Journal of Cheminformatics (Springer Nature)",
      index: "SCIE", quartile: "Q1",
      thumb: "images/pub-aqua.png",
      link: "https://www.researchsquare.com/article/rs-10915713/v1",
      linkLabel: { en: "Preprint", ko: "프리프린트" },
      domains: ["bio"],
      status: "review",
      year: "2026",
    },
    {
      title: {
        en: "Implementation and Processing-Time Analysis of an NPU-Based Real-Time Iris Recognition System",
        ko: "NPU 기반 실시간 홍채 인식 시스템 구현 및 처리 시간 분석",
      },
      position: 4,
      venue: { en: "IEIE Summer Conference 2025", ko: "2025 대한전자공학회 하계학술대회" },
      domains: ["vision", "embedded"],
      thumb: "images/pub-iris.png",
      status: "published",
      year: "2025",
    },
  ],

  /* ── Research grants ─────────────────────────────────────── */
  grants: [
    {
      title: {
        en: "Global CORE-AX: Securing Core Copyright Technologies and Fostering Convergence Talent through Joint Research",
        ko: "글로벌 CORE-AX 공동연구를 통한 저작권 원천기술 확보 및 선도형 융합인재 양성",
      },
      org: {
        en: "Ministry of Culture, Sports and Tourism — Copyright Workforce Development Program",
        ko: "문화체육관광부 저작권 인력양성 사업",
      },
      period: { en: "2026.08 – Present", ko: "2026.08 – 현재" },
      ongoing: true,
    },
    {
      title: { en: "Excellent Young Researcher (Seed Research) grant", ko: "우수신진연구 (씨앗연구)" },
      org: { en: "National Research Foundation of Korea (NRF)", ko: "한국연구재단" },
      period: "2025.09 – 2026.08",
    },
  ],

  /* ── Projects ────────────────────────────────────────────────
   * domains: "bio" | "vision" | "embedded"  (one or more)
   * type:    "industry" | "team"
   * image:   optional, e.g. "images/kp.png"
   * link:    optional URL (demo, repo, paper)
   */
  projects: [
    {
      title: { en: "Skin Image Labeling Tool", ko: "피부 촬영 이미지 라벨링 프로그램 개발" },
      org: { en: "Lameditech", ko: "라메디텍" },
      period: "2026.10 – 2026.12",
      image: "images/lameditech.jpg",
      imageAlt: { en: "Forehead ROI cropping rules compared on skin images", ko: "피부 이미지에서 이마 ROI crop 규칙 비교" },
      domains: ["vision"], type: "industry", ongoing: true,
      desc: {
        en: "Labeling program for building skin-condition (e.g., wrinkle) datasets: face detection and mesh-map generation with MediaPipe, with ROI-cropping rules designed on top of the mesh.",
        ko: "피부 상태(주름 등) 판단용 데이터 확보를 위한 라벨링 프로그램. MediaPipe로 안면 인식 및 메쉬맵 생성, 이를 바탕으로 ROI crop rule 설계",
      },
      tech: ["MediaPipe", "Face Mesh", "ROI Design"],
    },
    {
      title: { en: "Mouse Filler Volume Change Measurement & Prediction", ko: "Mouse filler 부피 변화 측정 및 예측" },
      org: { en: "Gachon University, College of Korean Medicine", ko: "가천대학교 한의과대학" },
      period: "2026.05 – 2026.06",
      image: "images/gachon-filler.jpg",
      imageAlt: { en: "Mouse captured on a checkerboard for 3D reconstruction", ko: "3D 복원을 위해 체커보드 위에서 촬영한 마우스" },
      domains: ["vision"], type: "industry", lead: true,
      role: {
        en: "Owned all Instant-NGP work and the extraction of filler-injection regions (volume measurement excluded).",
        ko: "Instant-NGP 관련 작업 전담 및 필러 주입 부위 추출 (부피 측정 제외)",
      },
      desc: {
        en: "Reconstructed 3D scenes from 2D videos with Instant-NGP and extracted the filler-injection regions.",
        ko: "Instant-NGP로 2D 동영상을 3D 렌더링, 필러 주입 부위 추출",
      },
      tech: ["Instant-NGP", "3D Reconstruction"],
    },
    {
      title: { en: "Aging & Skin-Trouble Progression Prediction App", ko: "노화 및 트러블 악화 예측 어플리케이션 개발" },
      org: "Amway Global",
      period: "2026.04 – 2026.06",
      image: "images/amway.jpg",
      imageAlt: { en: "Predicted facial changes by skin attribute", ko: "피부 항목별 얼굴 변화 예측 결과" },
      domains: ["vision"], type: "industry", lead: true,
      role: {
        en: "Made the key decisions across planning and development, and served as the primary point of contact with Amway.",
        ko: "기획·개발 전 과정의 의사결정을 주도하고, Amway와의 BtoB 소통 창구를 담당",
      },
      tech: [],
      outcome: { en: "Journal paper on aging prediction in preparation", ko: "노화 예측 관련 저널 논문 준비 중" },
    },
    {
      title: "Bifusion",
      org: { en: "Capstone Project", ko: "캡스톤 디자인" },
      period: "2026.03 – 2026.11",
      image: "images/bifusion.png",
      imageAlt: { en: "Bifusion Research Hub interface", ko: "Bifusion Research Hub 화면" },
      domains: ["vision"], type: "team", ongoing: true,
      role: {
        en: "Team lead; concept design; owned all AI components including the augmentation and few-shot models.",
        ko: "팀장, 컨셉 기획, 증강 모델·few-shot 모델 등 AI 전반 담당",
      },
      desc: {
        en: "Designed a Normal/Anomaly classifier trainer that fine-tunes on user data, combining the medical diffusion model Medfusion with the few-shot model ProtoNet.",
        ko: "의료 특화 확산모델 Medfusion과 few-shot 모델 ProtoNet으로 사용자 데이터 기반 파인튜닝하는 Normal/Anomaly 분류 학습기 설계",
      },
      tech: ["Medfusion", "Diffusion", "ProtoNet", "Few-shot"],
    },
    {
      title: { en: "Cammand", ko: "캐맨드 (Cammand)" },
      org: { en: "Capstone Project", ko: "캡스톤 디자인" },
      period: "2026.03 – 2026.09",
      image: "images/cammand.jpg",
      imageAlt: { en: "Controlling home devices with hand gestures", ko: "손 제스처로 기기를 제어하는 모습" },
      domains: ["vision"], type: "team",
      role: {
        en: "Planned the overall project and designed the gesture computation algorithm.",
        ko: "전체 프로젝트 기획, 제스처 계산 알고리즘 설계",
      },
      desc: {
        en: "MediaPipe-based gesture classification combined with an arithmetic gesture-recognition method.",
        ko: "MediaPipe 기반 제스처 분류와 산술적(arithmetic) 방식의 제스처 인식",
      },
      tech: ["MediaPipe", "Gesture Recognition"],
    },
    {
      title: { en: "NPU Algorithm for Toxicity Prediction", ko: "독성 평가 결과 예측을 위한 NPU 알고리즘 개발" },
      org: { en: "Korea Research Institute of Bioscience and Biotechnology (KRIBB)", ko: "한국생명공학연구원" },
      period: "2025.10 – 2025.12",
      image: "images/npu-toxicity.png",
      imageAlt: { en: "Rewriting operators into an NPU-supported set", ko: "NPU 지원 연산자로의 변환 과정" },
      domains: ["bio", "embedded"], type: "industry", lead: true,
      role: { en: "Led every stage except data-related work.", ko: "데이터 관련 작업을 제외한 전 과정 수행" },
      desc: {
        en: "Selected the operators best suited to the Kneron KL630 NPU and built an MLP from those operators alone to predict molecular toxicity.",
        ko: "KL630 NPU에 최적인 연산자를 선별하고 해당 연산자만으로 MLP를 구성해 분자 독성 예측 프로그램 개발",
      },
      tech: ["Kneron KL630", "Kneron SDK", "MLP", "Docker"],
      outcome: {
        en: "Follow-up first-author manuscript on aquatic toxicity (J. Cheminformatics, under review)",
        ko: "후속 연구로 수생독성 논문 (Journal of Cheminformatics, 심사 중)",
      },
    },
    {
      title: { en: "Tissue-specific Kp Prediction Model", ko: "조직별 Kp값 예측모델 개발" },
      org: { en: "Korea Research Institute of Bioscience and Biotechnology (KRIBB)", ko: "한국생명공학연구원" },
      period: "2025.05 – 2025.10",
      image: "images/kp.png",
      imageAlt: { en: "Study design: inputs, context fusion position, and evaluation", ko: "연구 설계: 입력, 조직 정보 결합 위치, 평가 체계" },
      domains: ["bio"], type: "industry", lead: true,
      role: {
        en: "Carried out the entire pipeline single-handedly, except for the data provided by KRIBB.",
        ko: "생명연 제공 데이터를 제외한 전 과정 단독 수행",
      },
      desc: {
        en: "Developed a Chemprop-based GNN for predicting tissue-to-plasma partition coefficients (Kp) and built a Streamlit demo page.",
        ko: "Chemprop 기반 GNN Kp 예측 모델 개발, Streamlit 데모 페이지 개발",
      },
      tech: ["Chemprop", "GNN", "Streamlit"],
      outcome: { en: "First-author manuscript under review at JPKPD", ko: "Kp 논문 (JPKPD, 심사 중)" },
    },
    {
      title: { en: "DoorBox — Crime-prevention Smart Doorbell", ko: "DoorBox — 범죄예방 도어벨" },
      org: { en: "Team Project", ko: "팀 프로젝트" },
      period: "2025.03 – 2025.07",
      image: "images/doorbox.png",
      imageAlt: { en: "Real-time on-device inference results", ko: "온디바이스 실시간 추론 결과" },
      domains: ["embedded"], type: "team",
      role: {
        en: "Team lead and main programmer; quantization and NPU optimization.",
        ko: "팀장, 메인 프로그래머, 양자화 및 NPU 최적화",
      },
      desc: {
        en: "Designed an EfficientNet-B0-based age/gender classification model on the Kneron KL630 NPU with the Kneron SDK in Docker.",
        ko: "Kneron KL630 NPU, Kneron SDK, Docker 환경에서 EfficientNet-B0 기반 Age/Gender Classification 모델 설계",
      },
      tech: ["Kneron KL630", "EfficientNet-B0", "Quantization", "Docker"],
    },
    {
      title: { en: "NPU-based Real-time Iris Recognition System", ko: "NPU 기반 실시간 홍채 인식 시스템 개발" },
      org: "Hyundai MIB International",
      period: "2024.05 – 2024.08",
      image: "images/iris.png",
      imageAlt: { en: "Iris image before and after eyelash removal", ko: "속눈썹 제거 전후 홍채 이미지" },
      domains: ["embedded", "vision"], type: "industry",
      desc: {
        en: "Improved iris segmentation by applying a Gaussian filter for eyelash removal, and ported the Python pipeline to C.",
        ko: "홍채 segmentation의 속눈썹 제거에 가우시안 필터를 적용해 성능 향상, Python 코드를 C로 포팅",
      },
      tech: ["NPU", "Iris Segmentation", "Python → C"],
      outcome: { en: "IEIE Summer Conference paper (co-author)", ko: "대한전자공학회 하계학술대회 논문 (공동저자)" },
    },
  ],

  /* ── Experience (timeline) ───────────────────────────────── */
  experience: [
    {
      title: { en: "Undergraduate Researcher", ko: "학부연구생" },
      org: { en: "Dept. of Computer Science, Sangmyung University", ko: "상명대학교 컴퓨터과학과" },
      period: { en: "Spring 2025 – Fall 2026", ko: "2025년 1학기 – 2026년 2학기" },
    },
    {
      title: { en: "Intern", ko: "인턴" },
      org: "InSiliCox",
      period: "2025.07 – 2025.08",
      desc: {
        en: "Led frontend development of OMNIDRUG, a drug-discovery platform; assisted with docking and molecular dynamics while learning them.",
        ko: "신약개발 플랫폼 OMNIDRUG 프론트엔드 개발 총괄, docking·molecular dynamics를 학습하며 보조",
      },
    },
    {
      title: { en: "Undergraduate Researcher", ko: "학부연구생" },
      org: { en: "OpenLab, Dept. of Emotion Engineering, Sangmyung University", ko: "상명대학교 감성공학과 OpenLab" },
      period: { en: "Summer 2024 – Fall 2024", ko: "2024년 여름방학 – 2학기" },
    },
  ],

  /* ── Small info cards (awards, leadership, etc.) ─────────── */
  extras: [
    {
      icon: "award",
      title: { en: "Awards", ko: "수상" },
      items: [
        { en: "Human AI Studio Festival 2026 — Top Excellence Award (Graduation Exhibition)", ko: "Human AI Studio Festival 2026 최우수상 (졸업전시회)" },
      ],
    },
    {
      icon: "users",
      title: { en: "Activities", ko: "교내외활동" },
      items: [
        { en: "Student Council President, Intelligent IoT Convergence / Electronic Engineering (2025)", ko: "지능-IoT융합전공/융합전자공학전공 학생회장 (2025)" },
        { en: "Student Council Vice President (Fall 2024)", ko: "부학회장 (2024년 2학기)" },
        { en: "Hackathon Instructor, Sangmyung Univ. Affiliated Girls' High School (2024.08)", ko: "상명대부속여고 해커톤 교육강사 (2024.08)" },
        { en: "INIRO — Programming Club (2021 – 2025)", ko: "이니로 — 프로그래밍 동아리 (2021 – 2025)" },
      ],
    },
    {
      icon: "globe",
      title: { en: "Languages", ko: "어학" },
      items: [
        { en: "TOEIC Speaking IH (150), valid until 2028.07", ko: "토익 스피킹 IH (150점), 유효기간 ~2028.07" },
      ],
    },
    {
      icon: "shield",
      title: { en: "Military Service", ko: "병역" },
      items: [
        { en: "Republic of Korea Army, 3rd Infantry Division — Sergeant, honorably discharged", ko: "육군 제3보병사단 병장 만기전역" },
      ],
    },
  ],

  footer: { updated: { en: "Last updated Nov 2026", ko: "최종 수정 2026.11" } },
};
