/* Builds the CV from data/content.js. The CV is always rendered in English. */
(function () {
  "use strict";
  var C = window.CONTENT;
  var lang = "en";

  // Your name as it may appear in author lists (highlighted automatically)
  var ME = /^seong\s*han\s+kim$/i;
  var HOMEPAGE = "https://pluswick.github.io";

  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    return v[lang] != null ? v[lang] : v.en != null ? v.en : "";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function T(v) { return esc(t(v)); }

  // "2025.05 – 2025.10" -> "May 2025 – Oct 2025"
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function date(v) {
    return T(v).replace(/(\d{4})\.(\d{2})/g, function (_, y, m) { return MON[+m - 1] + " " + y; });
  }
  function row(left, right) { return '<div class="row"><div>' + left + "</div><div>" + right + "</div></div>"; }
  function section(title, body, sub) {
    return "<section><h2>" + esc(title) + (sub ? ' <span class="sub">(' + esc(sub) + ")</span>" : "") + "</h2>" + body + "</section>";
  }

  /* Header */
  function header() {
    var p = C.profile, L = p.links || {};
    var links = ['<a href="' + HOMEPAGE + '">Website</a>'];
    if (L.github) links.push('<a href="' + esc(L.github) + '">GitHub</a>');
    return '<header class="hd">' +
      "<h1>" + esc(p.name.en) + "</h1>" +
      '<div class="r">Location: ' + T(p.location) + "</div>" +
      '<div class="links">' + links.join(" | ") + "</div>" +
      '<div class="r">' + (L.email ? 'Email: <a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a>" : "") + "</div>" +
      "</header>";
  }

  /* Summary: the one-line research statement + the master's direction paragraph */
  function summary() {
    var p = C.profile;
    var about = Array.isArray(p.about) ? p.about : [p.about];
    var text = [t(p.title), t(about[about.length - 1])].filter(Boolean).join(" ");
    return section("Summary", '<p class="summary">' + esc(text) + "</p>");
  }

  function education() {
    var E = C.profile.education;
    var majors = (E.majors || []).map(function (m) { return t(m.name) + " (" + t(m.note) + ")"; }).join(" and ");
    var when = E.graduation ? "Expected " + date(E.graduation) : "";
    return section("Education", '<div class="entry">' +
      row('<span class="b">B.S. in ' + esc(majors) + "</span>", T(C.profile.location)) +
      row('<span class="i">' + T(E.school) + "</span>", '<span class="i">' + when + "</span>") +
      "</div>");
  }

  function authors(list) {
    return (list || []).map(function (a) {
      var star = /\*$/.test(a), name = a.replace(/\*$/, "");
      var h = esc(name) + (star ? "*" : "");
      return ME.test(name.trim()) ? '<span class="me">' + h + "</span>" : h;
    }).join(", ");
  }
  function pubItem(p) {
    var idx = p.index ? " [" + esc(p.index) + (p.quartile ? ", " + esc(p.quartile) : "") + "]" : "";
    var venue = esc(p.cvVenue || t(p.venue));
    venue = venue.replace(/\(([A-Z][A-Za-z]{1,10})\)/, '(<span class="abbr">$1</span>)');
    var link = p.link ? '<a href="' + esc(p.link) + '">[' + T(p.linkLabel || "paper").toLowerCase() + "]</a>" : "";
    var status = p.status === "review" ? '<div class="note">Under review</div>' :
                 p.status === "accepted" ? '<div class="note">Accepted</div>' : "";
    var title = T(p.title).replace(/\bKp\b/g, "<i>K</i><sub>p</sub>");
    return "<li>" + '<div class="ptitle">' + title + "</div>" +
      "<div>" + authors(p.authors) + "</div>" +
      row('<span class="venue">' + venue + idx + "</span>", link) + status + "</li>";
  }
  function publications() {
    var groups = [
      ["Manuscripts Under Review", function (p) { return p.status === "review" || p.status === "preparing"; }],
      ["Journal Publications", function (p) { return p.kind === "journal" && p.status !== "review" && p.status !== "preparing"; }],
      ["Conference Publications", function (p) { return p.kind !== "journal" && p.status !== "review" && p.status !== "preparing"; }],
    ];
    var body = groups.map(function (g) {
      var items = C.publications.filter(g[1]);
      return items.length ? "<h3>" + g[0] + '</h3><ol class="pubs">' + items.map(pubItem).join("") + "</ol>" : "";
    }).join("");
    return section("Publications", body, "* equal contribution");
  }

  function experience() {
    var items = C.experience.map(function (e) {
      return '<div class="entry">' +
        row('<span class="b">' + T(e.title) + "</span>", '<span class="i">' + date(e.period) + "</span>") +
        row('<span class="i">' + T(e.org) + "</span>", "") +
        (e.desc ? '<ul class="bul"><li>' + T(e.desc) + "</li></ul>" : "") + "</div>";
    }).join("");
    return section("Research Experience", items);
  }

  function projects() {
    var TYPE = { industry: "Industry project", team: "Team project" };
    var items = C.projects.map(function (p) {
      var bullets = [];
      if (p.role) bullets.push('<span class="kv"><b>Role:</b> ' + T(p.role) + "</span>");
      if (p.desc) bullets.push(T(p.desc));
      if (p.results) bullets.push('<span class="kv"><b>Results:</b> ' + T(p.results) + "</span>");
      if (p.outcome) bullets.push('<span class="kv"><b>Outcome:</b> ' + T(p.outcome) + "</span>");
      var right = date(p.period) + (p.ongoing ? " (ongoing)" : "");
      return '<div class="entry">' +
        row('<span class="b">' + T(p.title) + "</span>" + (p.lead ? ' <span class="muted">— Lead Researcher</span>' : ""), '<span class="i">' + right + "</span>") +
        row('<span class="i">' + T(p.org) + "</span>" + (p.link ? ' <a href="' + esc(p.link) + '">[' + T(p.linkLabel || "link").toLowerCase() + "]</a>" : ""),
            '<span class="muted">' + (TYPE[p.type] || "") + "</span>") +
        (bullets.length ? '<ul class="bul">' + bullets.map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" : "") +
        "</div>";
    }).join("");
    return section("Research Projects", items);
  }

  function grants() {
    var items = C.grants.map(function (g) {
      return '<div class="entry">' +
        row('<span class="b">' + T(g.title) + "</span>", '<span class="i">' + date(g.period) + "</span>") +
        row('<span class="i">' + T(g.org) + "</span>", "") + "</div>";
    }).join("");
    return section("Research Grants", items, "participant");
  }

  function extrasBy(icons) {
    return (C.extras || []).filter(function (x) { return icons.indexOf(x.icon) > -1; });
  }
  function plainList(items) {
    return '<ul class="plain">' + items.map(function (it) { return "<li>" + T(it) + "</li>"; }).join("") + "</ul>";
  }
  function honors() {
    var x = extrasBy(["award"])[0];
    return x ? section("Honors & Awards", plainList(x.items)) : "";
  }
  function activities() {
    var x = extrasBy(["users", "book"]);
    return x.length ? section("Activities", plainList([].concat.apply([], x.map(function (e) { return e.items; })))) : "";
  }
  function additional() {
    var x = extrasBy(["globe", "shield"]);
    if (!x.length) return "";
    var lines = x.map(function (e) {
      return '<li><span class="kv"><b>' + T(e.title) + ":</b> " + e.items.map(T).join("; ") + "</span></li>";
    });
    return section("Additional Information", '<ul class="plain">' + lines.join("") + "</ul>");
  }

  document.getElementById("cv").innerHTML =
    header() + summary() + education() + publications() + experience() + projects() + grants() + honors() + activities() + additional() +
    '<p class="foot">' + T(C.footer && C.footer.updated) + " · " + HOMEPAGE.replace("https://", "") + "</p>";
})();
