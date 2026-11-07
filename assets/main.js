(function () {
  "use strict";
  var C = window.CONTENT;

  /* ── UI strings ─────────────────────────────────────────── */
  var UI = {
    nav: {
      about: { en: "About", ko: "소개" },
      publications: { en: "Publications", ko: "논문" },
      projects: { en: "Projects", ko: "프로젝트" },
      grants: { en: "Grants", ko: "연구 과제" },
      experience: { en: "Experience", ko: "경력" },
    },
    sub: {
      publications: { en: "Journal manuscripts and conference papers", ko: "저널 및 학술대회 논문" },
      projects: { en: "Industry contracts and team projects", ko: "연구 용역 및 팀 프로젝트" },
      grants: { en: "Funded research programs I participated in", ko: "참여한 정부 연구 과제" },
      experience: { en: "Research positions, internship, and more", ko: "연구 경력, 인턴 및 기타 활동" },
    },
    fields: { en: "Experience by Field", ko: "분야별 경험" },
    fieldsHint: { en: "Click a field to see its projects", ko: "분야를 누르면 해당 프로젝트를 볼 수 있습니다" },
    projectsN: function (n) { return lang === "ko" ? "프로젝트 " + n : n + (n === 1 ? " project" : " projects"); },
    papersN: function (n) { return lang === "ko" ? "논문 " + n : n + (n === 1 ? " paper" : " papers"); },
    legendProject: { en: "Project", ko: "프로젝트" },
    legendPaper: { en: "Paper", ko: "논문" },
    stat: {
      first: { en: "First-author journal manuscripts", ko: "1저자 저널 논문" },
      industry: { en: "Industry & institute projects", ko: "기업·기관 연구 용역" },
      lead: { en: "Projects as lead researcher", ko: "실무 책임 프로젝트" },
    },
    expected: { en: "Expected", ko: "졸업 예정" },
    filter: {
      all: { en: "All", ko: "전체" },
      vision: { en: "Vision & Medical", ko: "비전·의료 영상" },
      bio: { en: "Bio-AI", ko: "바이오 AI" },
      embedded: { en: "Embedded & NPU", ko: "임베디드·NPU" },
    },
    type: { industry: { en: "Industry", ko: "연구 용역" }, team: { en: "Team", ko: "팀 프로젝트" } },
    lead: { en: "Lead Researcher", ko: "실무 책임" },
    ongoing: { en: "Ongoing", ko: "진행 중" },
    role: { en: "Role", ko: "역할" },
    status: {
      review: { en: "Under review", ko: "심사 중" },
      published: { en: "Published", ko: "게재" },
      accepted: { en: "Accepted", ko: "게재 승인" },
      preparing: { en: "In preparation", ko: "준비 중" },
    },
    author: function (n) {
      if (n === 1) return lang === "ko" ? "1저자" : "1st author";
      return lang === "ko" ? "공동저자" : "Co-author";
    },
    email: { en: "Email", ko: "이메일" },
    toTop: { en: "Back to top", ko: "맨 위로" },
    github: "GitHub",
    viewWork: { en: "View projects", ko: "프로젝트 보기" },
  };

  var SECTIONS = ["about", "experience", "publications", "projects", "grants"];

  /* ── Icons (inline SVG, stroke-based) ───────────────────── */
  var P = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ext: '<path d="M14 4h6v6M10 14 20 4M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    cap: '<path d="M2 9 12 4l10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v5"/>',
    doc: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><rect x="10" y="10" width="4" height="4"/>',
  };
  function icon(name, cls) {
    return '<svg class="ico ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[name] + "</svg>";
  }
  var DOMAIN_ICON = { vision: "eye", bio: "flask", embedded: "chip" };

  /* ── State ──────────────────────────────────────────────── */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = (function () {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ko") return q;
    var s = store("lang");
    return s === "ko" || s === "en" ? s : "en";
  })();
  var filter = "all";

  /* ── Helpers ────────────────────────────────────────────── */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    return v[lang] != null ? v[lang] : v.en != null ? v.en : "";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function T(v) { return esc(t(v)); }
  function chips(arr, cls) {
    return (arr || []).map(function (x) { return '<span class="chip ' + (cls || "") + '">' + T(x) + "</span>"; }).join("");
  }
  function head(id, idx) {
    return '<div class="sec-head"><span class="sec-idx">' + String(idx).padStart(2, "0") + '</span><div><h2>' + T(UI.nav[id]) + "</h2>" +
      (UI.sub[id] ? '<p class="sec-sub">' + T(UI.sub[id]) + "</p>" : "") + "</div></div>";
  }

  /* ── Sections ───────────────────────────────────────────── */
  function hero() {
    var p = C.profile, L = p.links || {}, E = p.education || {};
    var links = "";
    if (L.email) links += '<a class="btn primary" href="mailto:' + esc(L.email) + '">' + icon("mail") + T(UI.email) + "</a>";
    if (L.github) links += '<a class="btn" href="' + esc(L.github) + '" target="_blank" rel="noopener">' + icon("github") + "GitHub</a>";
    links += '<a class="btn ghost" href="#projects">' + T(UI.viewWork) + icon("arrow") + "</a>";

    var majors = (E.majors || []).map(function (m) {
      return '<li><span class="mj-note">' + T(m.note) + "</span>" + T(m.name) + "</li>";
    }).join("");
    var edu = E.school ? '<div class="edu">' + icon("cap") + "<div>" +
      '<p class="edu-school">' + T(E.school) + ' <span class="edu-deg">' + T(E.degree) +
      (E.graduation ? " · " + T(UI.expected) + " " + T(E.graduation) : "") + "</span></p>" +
      '<ul class="majors">' + majors + "</ul></div></div>" : "";

    var photo = '<figure class="photo reveal"><div class="photo-frame">' +
      '<span class="photo-fallback" aria-hidden="true">' + T(p.initials || "") + "</span>" +
      (p.photo ? '<img src="' + esc(p.photo) + '" alt="' + T(p.name) + '" onerror="this.remove()">' : "") +
      "</div></figure>";

    return '<section class="hero" id="top"><div class="wrap hero-grid">' +
      '<div class="hero-main reveal">' +
        '<p class="kicker"><span class="dot"></span>' + T(p.kicker) + "</p>" +
        '<h1 class="name">' + T(p.name) + "</h1>" +
        '<p class="title">' + T(p.title) + "</p>" + edu +
        '<div class="hero-links">' + links + "</div>" +
      "</div>" + photo + "</div></section>";
  }

  function count(list, id) { return list.filter(function (x) { return (x.domains || []).indexOf(id) > -1; }).length; }

  function about(i) {
    var p = C.profile;
    var stats = [
      { ico: "doc", v: C.publications.filter(function (x) { return x.position === 1 && /journal/i.test(t(x.venue)); }).length, l: UI.stat.first },
      { ico: "brief", v: C.projects.filter(function (x) { return x.type === "industry"; }).length, l: UI.stat.industry },
      { ico: "flag", v: C.projects.filter(function (x) { return x.lead; }).length, l: UI.stat.lead },
    ].map(function (s) {
      return '<div class="stat card">' + icon(s.ico) + '<span class="stat-v">' + s.v + '</span><span class="stat-l">' + T(s.l) + "</span></div>";
    }).join("");

    var rows = (C.fields || []).map(function (f) {
      return { f: f, pr: count(C.projects, f.id), pa: count(C.publications, f.id) };
    });
    var max = Math.max.apply(null, rows.map(function (r) { return r.pr + r.pa; }).concat([1]));
    var fieldRows = rows.map(function (r) {
      var segs = "";
      for (var k = 0; k < max; k++) {
        segs += '<i class="' + (k < r.pr ? "on" : k < r.pr + r.pa ? "on paper" : "") + '"></i>';
      }
      return '<button type="button" class="field d-' + r.f.id + '" data-go="' + r.f.id + '">' +
        '<div class="fld-top"><span class="fld-name">' + icon(DOMAIN_ICON[r.f.id] || "chip") + T(r.f.title) + "</span>" +
        '<span class="fld-cnt mono">' + esc(UI.projectsN(r.pr)) + (r.pa ? " · " + esc(UI.papersN(r.pa)) : "") + "</span></div>" +
        '<div class="segs" style="--n:' + max + '">' + segs + "</div>" +
        '<p class="fld-desc">' + T(r.f.desc) + "</p></button>";
    }).join("");

    return '<section id="about" class="about-sec"><div class="wrap about-grid">' +
      '<div class="about-main reveal">' + head("about", i) +
        '<p class="about-text">' + T(p.about) + '</p><div class="stats">' + stats + "</div></div>" +
      '<aside class="fields card reveal"><h3 class="fields-h">' + T(UI.fields) + "</h3>" + fieldRows +
        '<div class="legend"><span><i class="lg-p"></i>' + T(UI.legendProject) + '</span><span><i class="lg-a"></i>' + T(UI.legendPaper) +
        '</span><span class="hint">' + T(UI.fieldsHint) + "</span></div></aside>" +
      "</div></section>";
  }

  function publications(i) {
    var items = C.publications.map(function (p) {
      var st = p.status || "review";
      return '<article class="pub card reveal">' +
        '<div class="pub-side"><span class="pos' + (p.position === 1 ? " first" : "") + '">' + esc(UI.author(p.position)) + '</span><span class="yr">' + T(p.year) + "</span></div>" +
        '<div class="pub-body"><h3>' + (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + T(p.title) + "</a>" : T(p.title)) + "</h3>" +
        '<p class="venue">' + T(p.venue) + '</p><div class="pub-meta">' +
        (p.index ? '<span class="badge idx">' + esc(p.index) + (p.quartile ? '<span class="q">' + esc(p.quartile) + "</span>" : "") + "</span>" : "") +
        '<span class="badge st-' + esc(st) + '">' + T(UI.status[st]) + "</span>" +
        (p.link ? '<a class="pub-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + icon("ext") + T(p.linkLabel || "Link") + "</a>" : "") +
        "</div></div></article>";
    }).join("");
    return '<section id="publications"><div class="wrap">' + head("publications", i) + '<div class="pub-list">' + items + "</div></div></section>";
  }

  function projectCard(p, n) {
    var d = p.domains || [];
    var main = d[0] || "vision";
    // Placeholder (icon + number) is always rendered; a cover image sits on top and is removed if it fails to load.
    var img = "";
    if (p.image) {
      img = '<a class="cover-link" href="' + esc(p.image) + '" target="_blank" rel="noopener" aria-label="' + T(p.imageAlt || p.title) + '">' +
        '<img class="cover' + (p.imageFit === "contain" ? " contain" : "") + '" src="' + esc(p.image) + '" alt="' + T(p.imageAlt || p.title) + '" loading="lazy"' +
        (p.imagePos ? ' style="object-position:' + esc(p.imagePos) + '"' : "") +
        ' onerror="var m=this.closest(\'.pmedia\');m.classList.remove(\'has-img\');this.parentNode.remove()"></a>';
    }
    var media = '<div class="pmedia d-' + main + (p.image ? " has-img" + (p.imageFit === "contain" ? " fit-contain" : "") : "") + '">' +
      '<span class="pm-ico">' + icon(DOMAIN_ICON[main]) + '</span><span class="pm-num">' + String(n).padStart(2, "0") + "</span>" + img + "</div>";
    var badges = d.map(function (x) { return '<span class="tag d-' + x + '">' + T(UI.filter[x]) + "</span>"; }).join("") +
      '<span class="tag type">' + T(UI.type[p.type]) + "</span>" +
      (p.lead ? '<span class="tag lead">' + T(UI.lead) + "</span>" : "") +
      (p.ongoing ? '<span class="tag live"><span class="pulse"></span>' + T(UI.ongoing) + "</span>" : "");
    return '<article class="card proj reveal" data-domains="' + d.join(" ") + '">' + media +
      '<div class="pbody"><div class="tags">' + badges + "</div>" +
      "<h3>" + T(p.title) + "</h3>" +
      '<p class="org">' + T(p.org) + ' <span class="sep">·</span> <span class="mono">' + T(p.period) + "</span></p>" +
      (p.role ? '<p class="role"><b>' + T(UI.role) + "</b>" + T(p.role) + "</p>" : "") +
      (p.desc ? '<p class="desc">' + T(p.desc) + "</p>" : "") +
      (p.tech && p.tech.length ? '<div class="chips">' + chips(p.tech) + "</div>" : "") +
      (p.outcome ? '<p class="outcome">' + icon("arrow") + "<span>" + T(p.outcome) + "</span></p>" : "") +
      (p.link ? '<a class="plink" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + icon("ext") + "Link</a>" : "") +
      "</div></article>";
  }

  function projects(i) {
    var fs = ["all", "vision", "bio", "embedded"].map(function (f) {
      var count = f === "all" ? C.projects.length : C.projects.filter(function (p) { return (p.domains || []).indexOf(f) > -1; }).length;
      return '<button type="button" class="fbtn' + (filter === f ? " on" : "") + '" data-filter="' + f + '">' + T(UI.filter[f]) + '<span class="cnt">' + count + "</span></button>";
    }).join("");
    var cards = C.projects.map(function (p, k) { return projectCard(p, k + 1); }).join("");
    return '<section id="projects"><div class="wrap">' + head("projects", i) +
      '<div class="filters" role="tablist">' + fs + '</div><div class="proj-grid' +
      (C.projects.some(function (p) { return p.image; }) ? " covers" : "") + '">' + cards + "</div></div></section>";
  }

  function grants(i) {
    var items = C.grants.map(function (g) {
      return '<article class="card grant reveal"><div class="g-top"><span class="mono">' + T(g.period) + "</span>" +
        (g.ongoing ? '<span class="tag live"><span class="pulse"></span>' + T(UI.ongoing) + "</span>" : "") + "</div>" +
        "<h3>" + T(g.title) + '</h3><p class="org">' + T(g.org) + "</p></article>";
    }).join("");
    return '<section id="grants"><div class="wrap">' + head("grants", i) + '<div class="grant-grid">' + items + "</div></div></section>";
  }

  function experience(i) {
    var tl = C.experience.map(function (e) {
      return '<li class="reveal"><span class="tl-dot"></span><div class="tl-body"><span class="mono tl-date">' + T(e.period) + "</span>" +
        "<h3>" + T(e.title) + '</h3><p class="org">' + T(e.org) + "</p>" + (e.desc ? '<p class="desc">' + T(e.desc) + "</p>" : "") + "</div></li>";
    }).join("");
    var extras = (C.extras || []).map(function (x) {
      return '<article class="card extra reveal"><div class="ex-head">' + icon(x.icon || "award") + "<h3>" + T(x.title) + "</h3></div><ul>" +
        x.items.map(function (it) { return "<li>" + T(it) + "</li>"; }).join("") + "</ul></article>";
    }).join("");
    return '<section id="experience"><div class="wrap">' + head("experience", i) +
      '<ol class="timeline">' + tl + '</ol><div class="extra-grid">' + extras + "</div></div></section>";
  }

  /* ── Render ─────────────────────────────────────────────── */
  var seen = false;
  function render() {
    document.documentElement.lang = lang;
    document.getElementById("nav-links").innerHTML = SECTIONS.map(function (s) {
      return '<a href="#' + s + '" data-sec="' + s + '">' + T(UI.nav[s]) + "</a>";
    }).join("");

    document.getElementById("app").innerHTML =
      hero() + about(1) + experience(2) + publications(3) + projects(4) + grants(5);

    var L = C.profile.links || {};
    var fl = "";
    if (L.email) fl += '<a class="icon-btn" href="mailto:' + esc(L.email) + '" aria-label="' + T(UI.email) + '" title="' + esc(L.email) + '">' + icon("mail") + "</a>";
    if (L.github) fl += '<a class="icon-btn" href="' + esc(L.github) + '" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">' + icon("github") + "</a>";
    document.getElementById("footer").innerHTML = '<div class="wrap">' +
      '<div class="foot-top">' +
        '<div class="foot-id"><span class="foot-name">' + T(C.profile.name) + "</span>" +
          (C.profile.location ? '<span class="foot-loc">' + icon("pin") + T(C.profile.location) + "</span>" : "") + "</div>" +
        '<div class="foot-actions">' + fl +
          '<a class="to-top" href="#top">' + icon("up") + T(UI.toTop) + "</a></div>" +
      "</div>" +
      '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + " " + T(C.profile.name) + "</span>" +
      '<span class="mono">' + T(C.footer && C.footer.updated) + "</span></div></div>";

    document.querySelectorAll(".seg button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang);
    });

    applyFilter();
    bindFilters();
    bindFields();
    observe();
    seen = true;
  }

  function applyFilter() {
    document.querySelectorAll(".proj").forEach(function (el) {
      var show = filter === "all" || el.dataset.domains.split(" ").indexOf(filter) > -1;
      el.hidden = !show;
    });
    document.querySelectorAll(".fbtn").forEach(function (b) { b.classList.toggle("on", b.dataset.filter === filter); });
  }
  function bindFields() {
    document.querySelectorAll(".field[data-go]").forEach(function (b) {
      b.addEventListener("click", function () {
        filter = b.dataset.go; applyFilter();
        document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
      });
    });
  }
  function bindFilters() {
    document.querySelectorAll(".fbtn").forEach(function (b) {
      b.addEventListener("click", function () { filter = b.dataset.filter; applyFilter(); });
    });
  }

  /* Reveal-on-scroll + active nav */
  var revealObs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;

  var navObs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach(function (a) { a.classList.toggle("on", a.dataset.sec === e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" }) : null;

  function observe() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (!revealObs || seen) el.classList.add("in");
      else revealObs.observe(el);
    });
    if (navObs) SECTIONS.forEach(function (s) { var el = document.getElementById(s); if (el) navObs.observe(el); });
  }

  /* Theme */
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function currentTheme() { return document.documentElement.getAttribute("data-theme") || (mq.matches ? "dark" : "light"); }
  function paintThemeBtn() {
    var dark = currentTheme() === "dark";
    var b = document.getElementById("theme-toggle");
    b.innerHTML = icon(dark ? "sun" : "moon");
    b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store("theme", next);
    paintThemeBtn();
  });
  if (mq.addEventListener) mq.addEventListener("change", paintThemeBtn);

  /* Language */
  document.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      store("lang", lang);
      var u = new URL(location.href);
      u.searchParams.set("lang", lang);
      history.replaceState(null, "", u);
      render();
    });
  });

  /* Mobile menu */
  var nav = document.getElementById("nav"), mbtn = document.getElementById("menu-toggle");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    mbtn.innerHTML = icon(open ? "close" : "menu");
    mbtn.setAttribute("aria-expanded", open);
  }
  mbtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  document.getElementById("nav-links").addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  /* Nav shadow on scroll */
  window.addEventListener("scroll", function () { nav.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });

  setMenu(false);
  paintThemeBtn();
  render();
})();
