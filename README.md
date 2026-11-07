# 포트폴리오 사이트 — 배포 및 수정 가이드

GitHub Pages(`username.github.io`)용 한 페이지 정적 사이트입니다. 빌드 도구는 필요 없습니다.

## 1. 파일 구조

```
portfolio/
├── index.html          # 뼈대 (거의 수정할 일 없음)
├── .nojekyll           # GitHub Pages의 Jekyll 처리 끄기
├── data/
│   └── content.js      # ★ 내용은 전부 여기서 수정
├── assets/
│   ├── style.css       # 디자인 (색상·폰트)
│   └── main.js         # 렌더링, 언어/테마 토글, 필터
└── images/
    └── profile.jpg     # ★ 프로필 사진 (직접 추가)
```

## 2. 프로필 사진 넣기

1. 사진을 `images/profile.jpg`로 저장합니다. 세로 4:5 비율(예: 800×1000)을 권장합니다.
2. 파일 이름이나 확장자가 다르면 `data/content.js`의 `profile.photo` 경로를 바꿔 주세요.
3. 사진이 없거나 경로가 틀리면 이니셜(`profile.initials`, 현재 `SK`)이 대신 표시됩니다.

## 공개 전 확인할 것
- [ ] 기업 과제(Amway, 현대 MIB, 생명연, 라메디텍 등)를 공개해도 되는지 계약 조건 확인
- [ ] 심사 중인 논문은 제목과 저널명만 공개 (원고 PDF는 게재 확정 후)
- [ ] 영문 표기 확인: 전공명(Electronic Engineering, Human-Centered AI Engineering), "Top Excellence Award(최우수상)", 기관명 등
- [ ] 졸업 예정 시기를 표시하려면 `profile.education.graduation`에 입력 (예: `"2027.02"`)

## 3. 로컬 미리보기

`index.html`을 브라우저로 바로 열어도 됩니다. 로컬 서버로 보려면 다음을 실행하세요.

```bash
cd portfolio
python3 -m http.server 8000
# → http://localhost:8000
```

## 4. 배포 (GitHub Pages)

1. GitHub에서 **`<사용자명>.github.io`** 이름으로 public 저장소를 만듭니다.
2. 이 폴더의 내용을 저장소 루트에 올립니다.
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<사용자명>/<사용자명>.github.io.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages**에서 Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 지정합니다.
4. 1–2분 뒤 `https://<사용자명>.github.io`에서 확인합니다.

> 다른 이름의 저장소(예: `portfolio`)를 쓰면 주소가 `https://<사용자명>.github.io/portfolio/`가 됩니다.

## 5. 내용 수정 방법

텍스트 필드에는 두 가지 형식을 쓸 수 있습니다.

```js
title: "Bifusion"                                       // 두 언어 공통
title: { en: "Skin Image Labeling Tool", ko: "피부 촬영 이미지 라벨링 프로그램 개발" }
```

`ko`를 비워 두면 영어 텍스트가 대신 표시됩니다.

### 논문 추가
```js
{
  title: "Paper title",
  position: 1,                 // 저자 순서 → "1st author" / "1저자"
  venue: "Journal name",
  status: "review",            // review | accepted | published | preparing
  year: "2026",
  link: "https://doi.org/...", // (선택) 넣으면 제목이 링크가 되고 상태 배지 옆에 링크 버튼이 생김
  linkLabel: { en: "Preprint", ko: "프리프린트" }  // (선택) 링크 버튼 이름 (기본 "Link"). 게재 후엔 DOI로 바꾸고 "DOI" 등으로 변경
}
```

### 프로젝트 추가
```js
{
  title: { en: "...", ko: "..." },
  org: { en: "...", ko: "..." },
  period: "2026.01 – 2026.03",
  domains: ["vision"],         // vision | bio | embedded (여러 개 가능, 첫 번째가 대표 분야)
  type: "industry",            // industry(연구 용역) | team(팀 프로젝트)
  lead: true,                  // (선택) "Lead Researcher / 실무 책임" 배지
  ongoing: true,               // (선택) "진행 중" 배지
  role: { en: "...", ko: "..." },
  desc: { en: "...", ko: "..." },
  tech: ["PyTorch", "Docker"],
  outcome: { en: "...", ko: "..." },   // (선택) 결과물 한 줄
  image: "images/project.jpg",         // (선택) 카드 커버 이미지
  imageFit: "cover",                   // (선택) cover(기본, 꽉 채움) | contain(그래프·다이어그램처럼 잘리면 안 되는 그림)
  imagePos: "center 30%",              // (선택) cover일 때 보여줄 위치 (CSS object-position)
  imageAlt: { en: "...", ko: "..." },  // (선택) 이미지 설명. 없으면 제목 사용
  link: "https://..."                  // (선택) 데모·저장소 링크
}
```

배열 순서가 곧 화면에 표시되는 순서입니다. 현재 프로젝트는 대표 분야(비전 → 바이오 → 임베디드)별로 묶고, 그 안에서는 시작일 기준 최신순으로 정렬해 두었습니다. 논문·연구 과제·경력은 최신순입니다. 카드 번호(01, 02…)는 자동으로 매겨집니다.

### 프로젝트 커버 이미지
- 이미지는 `images/` 폴더에 넣고 `image` 경로를 적습니다. **16:9 비율**(예: 1600×900)을 권장합니다.
- 프로젝트 중 **하나라도 이미지가 있으면 모든 카드의 상단이 16:9 커버 영역**으로 바뀌어 높이가 맞춰집니다. 이미지가 없는 카드는 분야 아이콘이 커버 자리에 표시됩니다.
- 경로가 틀리거나 파일이 없으면 자동으로 아이콘 표시로 돌아갑니다.
- 커버 이미지를 누르면 원본 크기 이미지가 새 탭에서 열립니다.
- 기업 과제 이미지는 공개 허락을 받은 것만 넣어 주세요.

### 소개 영역 (About)
- 소개글: `profile.about`
- 학력·전공: `profile.education`
- **통계 카드 3개는 자동 계산**됩니다: 1저자 저널 논문 수(`position: 1`이고 venue에 "Journal"이 들어간 논문), 연구 용역 수(`type: "industry"`), 실무 책임 프로젝트 수(`lead: true`).
- **분야별 경험 패널**: `fields` 배열에 분야 이름과 설명을 적습니다. 막대의 칸 수는 각 프로젝트와 논문의 `domains` 값으로 자동 계산됩니다(채운 칸 = 프로젝트, 빗금 칸 = 논문).
  - 분야 `id`는 `vision`, `bio`, `embedded` 중 하나를 쓰며, 배열 순서대로 표시됩니다. 새 분야를 추가하려면 `main.js`의 `UI.filter`와 `DOMAIN_ICON`, `style.css`의 색상 변수도 함께 추가해야 합니다.
  - 분야 줄을 누르면 프로젝트 섹션으로 이동하면서 해당 분야로 필터가 걸립니다.
- 논문에도 `domains: ["bio"]`처럼 분야를 지정해 두세요. 패널의 논문 칸 수에 반영됩니다.

### 기타 항목
- 수상·리더십·어학·병역 카드: `extras` 배열 (`icon`: award | users | book | globe | shield)
- 하단 수정일: `footer.updated`
- 토익 L&R 점수가 나오면 `extras`의 Languages `items`에 한 줄을 추가하면 됩니다.

## 6. 기능

- **언어**: 기본은 영어이고, EN/KO 토글로 바꿀 수 있습니다. 고른 언어는 브라우저에 저장됩니다. `?lang=ko`를 붙인 링크를 보내면 한국어로 열립니다.
  - 예: `https://<사용자명>.github.io/?lang=ko`
- **다크 모드**: 기본은 시스템 설정을 따르고, 토글로 바꾼 값은 저장됩니다.
- **프로젝트 필터**: 전체 / 비전·의료 영상 / 바이오 AI / 임베디드·NPU (분야별 경험 패널에서도 이동 가능)
- **반응형**: 모바일에서는 메뉴가 햄버거 버튼으로 바뀝니다.

## 7. 파비콘

`assets/favicon.svg`(기본), `assets/favicon-32.png`, `assets/apple-touch-icon.png`, 루트의 `favicon.ico`가 들어 있습니다. 바꾸려면 SVG를 수정한 뒤 PNG와 ICO도 같은 그림으로 교체해 주세요.

## 8. 디자인 조정

`assets/style.css` 상단에서 조정합니다.
- 메인 포인트 색: `--accent`, `--accent-2` (라이트와 다크 블록에 각각 있음)
- 분야별 색: `--bio`, `--vision`, `--embedded`
- 폰트: `--font` (Pretendard), `--mono` (JetBrains Mono)

UI 문구(섹션 이름, 버튼 라벨 등)는 `assets/main.js` 상단의 `UI` 객체에 있습니다.
