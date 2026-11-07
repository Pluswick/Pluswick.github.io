(function () {
  "use strict";
  var C = window.CONTENT;

  /* ---------- UI strings ---------- */
  var UI = {
    nav: {
      about: { en: "About", ko: "소개" },
      experience: { en: "Experience", ko: "경력" },
      publications: { en: "Publications", ko: "논문" },
      projects: { en: "Projects", ko: "프로젝트" },
      grants: { en: "Grants", ko: "연구 과제" },
      honors: { en: "Honors & Activities", ko: "수상 및 활동" },
    },
    education: { en: "Education", ko: "학력" },
    expected: { en: "Expected", ko: "졸업 예정" },
    filter: {
      all: { en: "All", ko: "전체" },
      vision: { en: "Vision & Medical", ko: "비전·의료 영상" },
      bio: { en: "Bio-AI", ko: "바이오 AI" },
      embedded: { en: "Embedded & NPU", ko: "임베디드·NPU" },
    },
    type: { industry: { en: "Industry", ko: "연구 용역" }, team: { en: "Team project", ko: "팀 프로젝트" } },
    lead: { en: "Lead Researcher", ko: "실무 책임" },
    ongoing: { en: "ongoing", ko: "진행 중" },
    role: { en: "Role", ko: "역할" },
    outcome: { en: "Outcome", ko: "성과" },
    results: { en: "Results", ko: "결과" },
    status: {
      review: { en: "Under review", ko: "심사 중" },
      published: { en: "Published", ko: "게재" },
      accepted: { en: "Accepted", ko: "게재 승인" },
      preparing: { en: "In preparation", ko: "준비 중" },
    },
    author: function (n, equal) {
      if (n === 1 && equal) return lang === "ko" ? "공동 1저자" : "Co-first author";
      if (n === 1) return lang === "ko" ? "1저자" : "First author";
      return lang === "ko" ? "공동저자" : "Co-author";
    },
    toTop: { en: "Back to top", ko: "맨 위로" },
  };
  var SECTIONS = ["about", "experience", "publications", "projects", "grants", "honors"];

  /* ---------- Icons ---------- */
  var P = {
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    doc: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    school: '<path d="M2 9 12 4l10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
  };
  function icon(n) {
    return '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + "</svg>";
  }

  /* ---------- State & helpers ---------- */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var lang = (function () {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ko") return q;
    var s = store("lang");
    return s === "ko" || s === "en" ? s : "en";
  })();
  var filter = "all";

  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    return v[lang] != null ? v[lang] : v.en != null ? v.en : "";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function T(v) { return esc(t(v)); }
  function when(period, ongoing) {
    return '<span class="when">' + T(period) + (ongoing ? " (" + T(UI.ongoing) + ")" : "") + "</span>";
  }
  function section(id, title, body) {
    return '<section id="' + id + '"><h2>' + T(title) + "</h2>" + body + "</section>";
  }
  function thumb(src, alt, href, cls) {
    if (!src) return "";
    return '<a class="thumb ' + (cls || "") + '" href="' + esc(href || src) + '" target="_blank" rel="noopener">' +
      '<img src="' + esc(src) + '" alt="' + T(alt) + '" loading="lazy" onerror="this.closest(\'li\').classList.add(\'no-thumb\');this.parentNode.remove()"></a>';
  }

  /* ---------- Sidebar ---------- */
  function sidebar() {
    var p = C.profile, L = p.links || {}, E = p.education || {};
    var other = lang === "ko" ? p.name.en : p.name.ko;
    var meta = "";
    if (E.school) meta += "<li>" + icon("school") + "<span>" + T(E.school) + "</span></li>";
    if (p.location) meta += "<li>" + icon("pin") + "<span>" + T(p.location) + "</span></li>";
    if (L.email) meta += "<li>" + icon("mail") + '<a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></li>";
    if (L.cv) meta += "<li>" + icon("doc") + '<a href="' + esc(L.cv) + '" target="_blank" rel="noopener">CV (PDF)</a></li>';
    if (L.github) meta += "<li>" + icon("github") + '<a href="' + esc(L.github) + '" target="_blank" rel="noopener">' + esc(L.github.replace(/^https?:\/\/(www\.)?/, "")) + "</a></li>";
    return '<div class="photo"><span class="photo-ph" aria-hidden="true">' + T(p.initials) + "</span>" +
      (p.photo ? '<img src="' + esc(p.photo) + '" alt="' + T(p.name) + '" onerror="this.remove()">' : "") + "</div>" +
      "<div><h1>" + T(p.name) + "</h1>" +
      (other ? '<p class="alt-name">' + esc(other) + "</p>" : "") +
      '<p class="role">' + T(p.kicker) + "</p>" +
      '<ul class="meta">' + meta + "</ul></div>";
  }

  /* ---------- Sections ---------- */
  function about() {
    var p = C.profile, E = p.education || {};
    var paras = (Array.isArray(p.about) ? p.about : [p.about]).map(function (x) { return "<p>" + T(x) + "</p>"; }).join("");
    var majors = (E.majors || []).map(function (m) { return T(m.name) + " (" + T(m.note) + ")"; }).join(lang === "ko" ? ", " : " and ");
    var edu = E.school ? '<h3 class="sub">' + T(UI.education) + "</h3>" +
      '<div class="edu">' + (E.logo ? '<img src="' + esc(E.logo) + '" alt="" onerror="this.remove()">' : "<span></span>") +
      '<div><div class="row"><span class="e-title">' + T(E.school) + "</span>" +
      (E.graduation ? '<span class="when">' + T(UI.expected) + " " + T(E.graduation) + "</span>" : "") + "</div>" +
      '<p class="e-org">' + T(E.degree) + (majors ? " — " + majors : "") + "</p></div></div>" : "";
    return section("about", UI.nav.about,
      (p.title ? '<p class="intro">' + T(p.title) + "</p>" : "") + '<div class="prose">' + paras + "</div>" + edu);
  }

  function experience() {
    var items = C.experience.map(function (e) {
      return '<li><div class="row"><span class="e-title">' + T(e.title) + "</span>" + when(e.period, e.ongoing) + "</div>" +
        '<p class="e-org">' + T(e.org) + "</p>" + (e.desc ? '<p class="e-desc">' + T(e.desc) + "</p>" : "") + "</li>";
    }).join("");
    return section("experience", UI.nav.experience, '<ul class="list">' + items + "</ul>");
  }

  function publications() {
    var items = C.publications.map(function (p) {
      var st = p.status || "review";
      var title = p.link
        ? '<a class="it-title" href="' + esc(p.link) + '" target="_blank" rel="noopener">' + T(p.title) + "</a>"
        : '<span class="it-title">' + T(p.title) + "</span>";
      var tags = '<span class="tag strong">' + esc(UI.author(p.position, p.equal)) + "</span>" +
        (p.index ? '<span class="tag">' + esc(p.index) + (p.quartile ? " · " + esc(p.quartile) : "") + "</span>" : "") +
        '<span class="tag ' + esc(st) + '">' + T(UI.status[st]) + "</span>" +
        (p.link ? '<span class="links"><a href="' + esc(p.link) + '" target="_blank" rel="noopener">[' + T(p.linkLabel || "Link") + "]</a></span>" : "");
      return '<li class="' + (p.thumb ? "" : "no-thumb") + '">' + thumb(p.thumb, p.title) +
        "<div>" + title + '<p class="it-meta"><em>' + T(p.venue) + "</em>" + (p.year && t(p.venue).indexOf(t(p.year)) < 0 ? ", " + T(p.year) : "") + "</p>" +
        (p.results ? '<p class="it-out"><b>' + T(UI.results) + ".</b> " + T(p.results) + "</p>" : "") +
        '<div class="tags">' + tags + "</div></div></li>";
    }).join("");
    return section("publications", UI.nav.publications, '<ul class="items">' + items + "</ul>");
  }

  function projects() {
    var f = ["all", "vision", "bio", "embedded"].map(function (k) {
      return '<button type="button" data-filter="' + k + '"' + (filter === k ? ' class="on"' : "") + ">" + T(UI.filter[k]) + "</button>";
    }).join("");
    var items = C.projects.map(function (p) {
      var tags = (p.lead ? '<span class="tag strong">' + T(UI.lead) + "</span>" : "") +
        '<span class="tag">' + T(UI.type[p.type]) + "</span>" +
        (p.domains || []).map(function (d) { return '<span class="tag">' + T(UI.filter[d]) + "</span>"; }).join("");
      return '<li data-domains="' + (p.domains || []).join(" ") + '" class="' + (p.image ? "" : "no-thumb") + '">' +
        thumb(p.image, p.imageAlt || p.title, null, "wide" + (p.imageFit === "contain" ? "" : " cover")) +
        "<div>" + '<span class="it-title">' + T(p.title) + "</span>" +
        '<p class="it-meta">' + T(p.org) + ", " + T(p.period) + (p.ongoing ? " (" + T(UI.ongoing) + ")" : "") + "</p>" +
        (p.role ? '<p class="it-role"><b>' + T(UI.role) + ".</b> " + T(p.role) + "</p>" : "") +
        (p.desc ? '<p class="it-desc">' + T(p.desc) + "</p>" : "") +
        (p.results ? '<p class="it-out"><b>' + T(UI.results) + ".</b> " + T(p.results) + "</p>" : "") +
        (p.outcome ? '<p class="it-out"><b>' + T(UI.outcome) + ".</b> " + T(p.outcome) + "</p>" : "") +
        '<div class="tags">' + tags + "</div>" +
        (p.link ? '<p class="links"><a href="' + esc(p.link) + '" target="_blank" rel="noopener">[' + T(p.linkLabel || "Link") + "]</a></p>" : "") +
        "</div></li>";
    }).join("");
    return section("projects", UI.nav.projects, '<div class="filter" role="tablist">' + f + '</div><ul class="items">' + items + "</ul>");
  }

  function grants() {
    var items = C.grants.map(function (g) {
      return '<li><div class="row"><span class="e-title">' + T(g.title) + "</span>" + when(g.period) + "</div>" +
        '<p class="e-org">' + T(g.org) + "</p></li>";
    }).join("");
    return section("grants", UI.nav.grants, '<ul class="list">' + items + "</ul>");
  }

  function honors() {
    var body = (C.extras || []).map(function (x) {
      return '<h3 class="sub">' + T(x.title) + '</h3><ul class="plain">' +
        x.items.map(function (it) { return "<li>" + T(it) + "</li>"; }).join("") + "</ul>";
    }).join("");
    return section("honors", UI.nav.honors, body);
  }

  /* ---------- Render ---------- */
  function render() {
    document.documentElement.lang = lang;
    document.title = t(C.profile.name);
    document.getElementById("brand").textContent = t(C.profile.name);
    document.getElementById("nav").innerHTML = SECTIONS.map(function (s) {
      return '<a href="#' + s + '" data-sec="' + s + '">' + T(UI.nav[s]) + "</a>";
    }).join("");
    document.getElementById("side").innerHTML = sidebar();
    document.getElementById("main").innerHTML = about() + experience() + publications() + projects() + grants() + honors();
    document.getElementById("footer").innerHTML = '<div class="row"><span>© ' + new Date().getFullYear() + " " + T(C.profile.name) + "</span>" +
      '<span class="when">' + T(C.footer && C.footer.updated) + ' · <a href="#top">' + T(UI.toTop) + "</a></span></div>";
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang);
    });
    document.querySelectorAll(".filter button").forEach(function (b) {
      b.addEventListener("click", function () { filter = b.dataset.filter; applyFilter(); });
    });
    applyFilter();
    observeNav();
  }

  function applyFilter() {
    document.querySelectorAll("#projects .items > li").forEach(function (li) {
      li.hidden = !(filter === "all" || li.dataset.domains.split(" ").indexOf(filter) > -1);
    });
    document.querySelectorAll(".filter button").forEach(function (b) { b.classList.toggle("on", b.dataset.filter === filter); });
  }

  var navObs = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      document.querySelectorAll(".nav a").forEach(function (a) { a.classList.toggle("on", a.dataset.sec === e.target.id); });
    });
  }, { rootMargin: "-40% 0px -55% 0px" }) : null;
  function observeNav() {
    if (!navObs) return;
    navObs.disconnect();
    SECTIONS.forEach(function (s) { var el = document.getElementById(s); if (el) navObs.observe(el); });
  }

  /* Theme */
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function theme() { return document.documentElement.getAttribute("data-theme") || (mq.matches ? "dark" : "light"); }
  function paintTheme() {
    var b = document.getElementById("theme-toggle"), dark = theme() === "dark";
    b.innerHTML = icon(dark ? "sun" : "moon");
    b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = theme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store("theme", next);
    paintTheme();
  });
  if (mq.addEventListener) mq.addEventListener("change", paintTheme);

  /* Language */
  document.querySelectorAll(".lang button").forEach(function (b) {
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
  var bar = document.getElementById("topbar"), mbtn = document.getElementById("menu-toggle");
  function setMenu(open) {
    bar.classList.toggle("open", open);
    mbtn.innerHTML = icon(open ? "close" : "menu");
    mbtn.setAttribute("aria-expanded", open);
  }
  mbtn.addEventListener("click", function () { setMenu(!bar.classList.contains("open")); });
  document.getElementById("nav").addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  setMenu(false);
  paintTheme();
  render();
})();
