# pluswick.github.io

Personal academic homepage of **Seonghan Kim** (김성한), an undergraduate researcher at Sangmyung University working on machine learning for computer vision, the bio domain, and on-device inference.

- Homepage: <https://pluswick.github.io> ([한국어](https://pluswick.github.io/?lang=ko))
- CV: [cv.pdf](https://pluswick.github.io/cv.pdf)

## Overview

A static single-page site served by GitHub Pages. There is no build step: all content lives in one data file and is rendered in the browser.

- English / Korean toggle (`?lang=ko` opens the Korean version)
- Light / dark theme that follows the system setting
- Project filter by research area
- A two-page CV generated from the same data as the homepage

## Structure

```
.
├── index.html          # Homepage
├── cv.html             # Printable CV (A4, English)
├── cv.pdf              # Exported CV
├── data/
│   └── content.js      # All content: profile, publications, projects, experience, ...
├── assets/
│   ├── main.js         # Homepage renderer
│   ├── style.css       # Homepage styles
│   ├── cv.js           # CV renderer
│   ├── cv.css          # CV styles (print layout)
│   └── fonts/          # Source Sans 3 for the CV
└── images/             # Photo, thumbnails, logos
```

## Updating content

Edit `data/content.js`. Text fields accept either a plain string or an `{ en, ko }` pair; if `ko` is missing, the English text is shown.

After changing CSS or JavaScript, bump the `?v=` query in `index.html` (and `cv.html`) so browsers fetch the new files instead of cached ones.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Regenerating the CV

1. Open `http://localhost:8000/cv.html` in Chrome.
2. Click **Save as PDF** (or press `Ctrl/Cmd + P`).
3. Choose A4, default margins, enable background graphics, and disable headers and footers.
4. Save as `cv.pdf` in the repository root.

## Credits

- Layout inspired by [luost26/academic-homepage](https://github.com/luost26/academic-homepage)
- Fonts: [Pretendard](https://github.com/orioncactus/pretendard) and [Source Sans 3](https://github.com/adobe-fonts/source-sans), both under the SIL Open Font License

Content and images © Seonghan Kim.
