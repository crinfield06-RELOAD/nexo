/* NEXO Académico · aplicación (no es necesario editar este archivo) */
(function () {
  "use strict";
  var CFG = window.NEXO_CONFIG || { publicado: "", gids: {}, diasNuevo: 14 };
  var HOY = new Date(); HOY.setHours(0, 0, 0, 0);
  var CACHE_KEY = "nexo-datos-v1";
  var D = null;            // datos normalizados
  var ES_EJEMPLO = true;   // true mientras se usan los datos de ejemplo
  var Q = { q: "", curso: "", tema: "", tipo: "", semana: "", formato: "", limite: 40 };

  /* ---------- Íconos ---------- */
  var P = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    cursos: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    semana: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 15h3"/>',
    biblioteca: '<path d="M4 4v16M8.5 7v13M13 4v16"/><path d="m16.5 6.5 4 13"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    descargar: '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v3h16v-3"/>',
    ver: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    archivo: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    presentacion: '<path d="M3 4h18M4 4v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4M12 15v4M8 21l4-2 4 2"/>',
    guia: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    actividad: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2"/><path d="m9 14 2 2 4-4"/>',
    plantilla: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    herramienta: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    rubrica: '<path d="m3 7 2 2 4-4M3 17l2 2 4-4M13 6h8M13 12h8M13 18h8"/>',
    video: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/>',
    lectura: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    infografia: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    carpeta: '<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    atras: '<path d="M19 12H5m6-6-6 6 6 6"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    audio: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/>',
    play: '<path d="m7 4 13 8-13 8z"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    enlace: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    aula: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>'
  };
  function ic(n, s) { s = s || 20; return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || P.archivo) + "</svg>"; }

  /* ---------- Tipos de recurso ---------- */
  var TIPOS = {
    "saberes esenciales": { icon: "archivo", v: "--t-saberes", pl: "Saberes esenciales", ord: 3 },
    "presentacion": { icon: "presentacion", v: "--t-presentacion", pl: "Presentaciones", ord: 1 },
    "video": { icon: "video", v: "--t-video", pl: "Videos", ord: 2 },
    "podcast": { icon: "audio", v: "--t-podcast", pl: "Podcasts", ord: 2.5 },
    "audio": { icon: "audio", v: "--t-podcast", pl: "Audios", ord: 2.5 },
    "guia": { icon: "guia", v: "--t-guia", pl: "Guías", ord: 4 },
    "actividad": { icon: "actividad", v: "--t-actividad", pl: "Actividades", ord: 5 },
    "plantilla": { icon: "plantilla", v: "--t-plantilla", pl: "Plantillas", ord: 6 },
    "herramienta": { icon: "herramienta", v: "--t-herramienta", pl: "Herramientas", ord: 7 },
    "rubrica": { icon: "rubrica", v: "--t-rubrica", pl: "Rúbricas", ord: 8 },
    "lectura": { icon: "lectura", v: "--t-lectura", pl: "Lecturas", ord: 9 },
    "infografia": { icon: "infografia", v: "--t-infografia", pl: "Infografías", ord: 10 },
    "documento": { icon: "archivo", v: "--t-documento", pl: "Documentos", ord: 11 }
  };
  function tipoDe(t) { return TIPOS[norm(t)] || TIPOS.documento; }
  var DESTACADOS = { "🆕": "Nuevo", "🔥": "De la semana", "⭐": "Recomendado", "📌": "Importante" };

  /* ---------- Utilidades ---------- */
  function norm(s) { return String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pad(n) { n = String(n || ""); return n.length === 1 ? "0" + n : n; }
  function parseFecha(s) {
    s = String(s || "").trim(); var m;
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return new Date(+m[1], m[2] - 1, +m[3]);
    if ((m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/))) return new Date(+m[3], m[2] - 1, +m[1]);
    return null;
  }
  var FMT = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "short", year: "numeric" });
  function fecha(s) { var d = parseFecha(s); return d ? FMT.format(d) : ""; }
  function diasDesde(s) { var d = parseFecha(s); return d ? Math.round((HOY - d) / 864e5) : 9999; }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }

  function parseCSV(txt) {
    var rows = [], row = [], f = "", q = false, i, c;
    for (i = 0; i < txt.length; i++) {
      c = txt[i];
      if (q) { if (c === '"') { if (txt[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
      else if (c !== "\r") f += c;
    }
    if (f !== "" || row.length) { row.push(f); rows.push(row); }
    if (!rows.length) return [];
    var h = rows[0].map(function (x) { return norm(x).replace(/\s+/g, "_"); });
    return rows.slice(1).filter(function (r) { return r.some(function (x) { return String(x).trim(); }); })
      .map(function (r) { var o = {}; h.forEach(function (k, j) { if (k) o[k] = String(r[j] == null ? "" : r[j]).trim(); }); return o; });
  }

  /* Convierte enlaces de Google Drive en "ver" y "descargar" */
  function enlaces(url) {
    url = String(url || "").trim(); if (!url) return {};
    var m;
    if ((m = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/)) || (m = url.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([^&#]+)/)))
      return { ver: "https://drive.google.com/file/d/" + m[1] + "/view", descargar: "https://drive.google.com/uc?export=download&id=" + m[1] };
    if ((m = url.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([^/?#]+)/))) {
      var f = { document: "docx", spreadsheets: "xlsx", presentation: "pptx" }[m[1]];
      return { ver: "https://docs.google.com/" + m[1] + "/d/" + m[2] + "/edit?usp=sharing", descargar: "https://docs.google.com/" + m[1] + "/d/" + m[2] + "/export?format=" + f };
    }
    return { ver: url };
  }

  /* ---------- Carga de datos ---------- */
  function normalizar(raw) {
    var d = {};
    ["cursos", "temas", "subtemas", "recursos", "actividades", "sinonimos", "sitio"].forEach(function (k) { d[k] = (raw[k] || []).map(function (o) { var n = {}; Object.keys(o).forEach(function (key) { n[norm(key).replace(/\s+/g, "_")] = String(o[key] == null ? "" : o[key]).trim(); }); return n; }); });
    d.cfg = {}; d.sitio.forEach(function (r) { if (r.clave) d.cfg[r.clave] = r.valor; });
    d.cursos = d.cursos.filter(function (c) { return c.codigo && norm(c.estado) !== "oculto"; })
      .sort(function (a, b) { return (+a.orden || 99) - (+b.orden || 99); });
    var activos = {}; d.cursos.forEach(function (c) { activos[c.codigo] = c; });
    d.recursos = d.recursos.filter(function (r) { return r.id && r.titulo && norm(r.estado) !== "archivado" && activos[r.curso]; });
    d.actividades = d.actividades.filter(function (a) { return a.id && a.nombre && norm(a.estado) !== "archivado" && activos[a.curso]; });
    d.porId = {}; d.recursos.forEach(function (r) { d.porId[r.id] = r; });
    d.curso = activos;
    d.recursos.forEach(function (r) {
      r._tema = temaDe(d, r.curso, r.tema); r._sub = subDe(d, r.curso, r.subtema);
      if (!r.destacado && diasDesde(r.actualizado) <= (CFG.diasNuevo || 14) && diasDesde(r.actualizado) >= 0) r._nuevo = true;
      r._txt = { t: norm(r.titulo), e: norm(r.etiquetas), d: norm(r.descripcion), c: norm([r.tipo, r.formato, r.curso, r._tema ? r._tema.titulo : "", r._sub ? r._sub.titulo : ""].join(" ")) };
    });
    d.syn = d.sinonimos.map(function (s) { return [norm(s.termino)].concat(String(s.equivalentes || "").split(/[;,]/).map(norm)).filter(Boolean); });
    return d;
  }
  function temaDe(d, curso, t) { return d.temas.filter(function (x) { return x.curso === curso && String(x.tema) === String(t); })[0]; }
  function subDe(d, curso, s) { return s ? d.subtemas.filter(function (x) { return x.curso === curso && String(x.subtema) === String(s); })[0] : null; }

  function hayHoja() { return CFG.publicado && CFG.gids && CFG.gids.recursos && CFG.gids.cursos; }
  function cargarHojas() {
    var nombres = ["sitio", "cursos", "temas", "subtemas", "recursos", "actividades", "sinonimos"];
    return Promise.all(nombres.map(function (n) {
      var gid = CFG.gids[n]; if (!gid) return Promise.resolve([]);
      var url = "https://docs.google.com/spreadsheets/d/e/" + CFG.publicado + "/pub?gid=" + gid + "&single=true&output=csv";
      return fetch(url, { cache: "no-store" }).then(function (r) { if (!r.ok) throw new Error(n); return r.text(); }).then(parseCSV);
    })).then(function (arr) { var o = {}; nombres.forEach(function (n, i) { o[n] = arr[i]; }); return o; });
  }
  function iniciar() {
    if (hayHoja()) {
      var cache = lsGet(CACHE_KEY);
      if (cache) { try { D = normalizar(JSON.parse(cache)); ES_EJEMPLO = false; render(); } catch (e) { } }
      cargarHojas().then(function (raw) { lsSet(CACHE_KEY, JSON.stringify(raw)); D = normalizar(raw); ES_EJEMPLO = false; render(); })
        .catch(function () { if (!D) { D = normalizar(window.NEXO_EJEMPLO || {}); ES_EJEMPLO = true; render(); toast("No se pudo leer la hoja de Google. Revisa la conexión o la configuración."); } });
      if (!D) document.getElementById("app").innerHTML = '<p style="padding:24px">Cargando recursos…</p>';
    } else { D = normalizar(window.NEXO_EJEMPLO || {}); ES_EJEMPLO = true; render(); }
  }

  /* ---------- Semanas ---------- */
  function totalSem(c) { return +c.total_semanas || 16; }
  function semanaActual(c) {
    if (c.semana_actual) return Math.max(1, Math.min(+c.semana_actual, totalSem(c)));
    var s = parseFecha(c.fecha_inicio); if (!s) return null;
    var w = Math.floor((HOY - s) / 864e5 / 7) + 1;
    if (w < 1) return 1; if (w > totalSem(c)) return null; return w;
  }
  function temaDeSemana(c, w) { return D.temas.filter(function (t) { return t.curso === c.codigo && w >= +t.semana_inicio && w <= +t.semana_fin; })[0]; }
  function recursosDe(curso, f) { return D.recursos.filter(function (r) { return r.curso === curso && (!f || f(r)); }); }
  function porOrden(a, b) { return (tipoDe(a.tipo).ord - tipoDe(b.tipo).ord) || String(a.subtema).localeCompare(String(b.subtema), "es", { numeric: true }) || a.titulo.localeCompare(b.titulo, "es"); }
  function colorCurso(c) { return /^#[0-9a-f]{3,8}$/i.test(c.color || "") ? c.color : "#1F3864"; }

  /* ---------- Componentes ---------- */
  function ticon(tipo, s) { var t = tipoDe(tipo); return '<span class="ticon" style="--c:var(' + t.v + ')">' + ic(t.icon, s || 20) + "</span>"; }
  function badge(r) {
    if (r.destacado && DESTACADOS[r.destacado]) return '<span class="badge">' + r.destacado + " " + DESTACADOS[r.destacado] + "</span>";
    if (r._nuevo) return '<span class="badge">🆕 Nuevo</span>';
    return "";
  }
  function meta(r, opts) {
    var p = [];
    if (opts && opts.curso) p.push('<span class="mono">' + esc(r.curso) + "</span>");
    p.push(esc(r.tipo)); if (r.formato && norm(r.formato) !== norm(r.tipo)) p.push(esc(r.formato) + (r.peso ? " · " + esc(r.peso) : "")); else if (r.peso) p.push(esc(r.peso));
    if (r.semana && !(opts && opts.noSem)) p.push("Sem. " + esc(pad(r.semana)));
    if (r.actualizado) p.push("act. " + fecha(r.actualizado));
    return p.map(function (x) { return "<span>" + x + "</span>"; }).join("");
  }
  function botonDescarga(r) {
    var l = enlaces(r.enlace);
    if (l.descargar) return '<a class="iconbtn" href="' + esc(l.descargar) + '" target="_blank" rel="noopener" aria-label="Descargar ' + esc(r.titulo) + '">' + ic("descargar") + "</a>";
    if (l.ver) return '<a class="iconbtn" href="' + esc(l.ver) + '" target="_blank" rel="noopener" aria-label="Abrir ' + esc(r.titulo) + '">' + ic("externo") + "</a>";
    return '<button class="iconbtn" data-demo aria-label="Descargar ' + esc(r.titulo) + '">' + ic("descargar") + "</button>";
  }
  function fila(r, opts) {
    var titulo = opts && opts.hl ? resaltar(r.titulo, opts.hl) : esc(r.titulo);
    return '<div class="row"><a class="row-main" href="#recurso.' + encodeURIComponent(r.id) + '">' + ticon(r.tipo) +
      '<span style="min-width:0"><span class="row-title">' + titulo + "</span> " + badge(r) + '<span class="row-meta">' + meta(r, opts) + "</span></span></a>" + botonDescarga(r) + "</div>";
  }
  function lista(rs, opts) { return rs.length ? '<div class="list">' + rs.map(function (r) { return fila(r, opts); }).join("") + "</div>" : ""; }
  function avatar() {
    var foto = D.cfg.foto;
    if (!foto) return '<span class="avatar" aria-hidden="true">LC</span>';
    return '<img class="avatar" id="foto-docente" src="' + esc(foto) + '" alt="Foto del docente">';
  }
  function vigilarFoto() {
    var f = document.getElementById("foto-docente");
    if (f) f.addEventListener("error", function () { var s = document.createElement("span"); s.className = "avatar"; s.setAttribute("aria-hidden", "true"); s.textContent = "LC"; f.replaceWith(s); });
  }

  /* ---------- Vistas ---------- */
  function vInicio() {
    var h = "";
    h += '<section class="hero"><div class="hero-id">' + avatar() + "<div><h1>" + esc(D.cfg.saludo || "Hola, bienvenido(a).") + '</h1><div class="who">' + esc(D.cfg.docente || "") + "</div></div></div>" +
      "<p>" + esc(D.cfg.mensaje || "") + "</p>" +
      '<form class="bigsearch" data-search role="search"><label class="sr" for="q-inicio">Buscar recursos</label>' + ic("buscar", 22) +
      '<input id="q-inicio" name="q" type="search" autocomplete="off" placeholder="Busca: OEE, plantilla, rúbrica…"></form>' +
      '<div class="chips" aria-label="Búsquedas frecuentes">' + ["OEE", "Plantilla", "Rúbrica", "Cursograma", "Economía circular"].map(function (s) { return '<button class="chip" data-q="' + esc(s) + '">' + esc(s) + "</button>"; }).join("") + "</div>" +
      "</section>";

    var activos = D.cursos.filter(function (c) { return norm(c.estado) !== "anterior"; });
    var semanales = activos.map(function (c) { var w = semanaActual(c); return w ? cardSemana(c, w) : ""; }).join("");
    h += '<div class="duo">';
    if (semanales) h += '<section><div class="sec-head"><h2>Esta semana</h2><a href="#semana">Ver todo</a></div><div class="grid">' + semanales + "</div></section>";
    h += '<section><div class="sec-head"><h2>Mis cursos</h2><a href="#cursos">Todos los cursos</a></div><div class="grid">' + activos.map(cardCurso).join("") + "</div></section></div>";
    h += '<section aria-label="Por qué usar NEXO">' + '<ul class="value"><li>' + ic("reloj") + "<span><b>Esta semana, en un toque</b>Lo que necesitas para la sesión de hoy, por curso.</span></li><li>" + ic("enlace") + "<span><b>Todo conectado</b>Cada actividad trae su guía, plantilla y rúbrica.</span></li><li>" + ic("check") + "<span><b>Siempre la versión vigente</b>Cada archivo muestra su fecha de actualización.</span></li></ul></section>";

    var dest = D.recursos.filter(function (r) { return DESTACADOS[r.destacado]; }).sort(function (a, b) { return "📌🔥⭐🆕".indexOf(a.destacado) - "📌🔥⭐🆕".indexOf(b.destacado); });
    if (dest.length) h += '<section><div class="sec-head"><h2>Destacados</h2></div><div class="rail">' + dest.map(function (r) {
      return '<a class="card feat" href="#recurso.' + encodeURIComponent(r.id) + '">' + badge(r) + '<div style="display:flex;gap:12px;align-items:flex-start">' + ticon(r.tipo) + "<h3>" + esc(r.titulo) + '</h3></div><div class="row-meta">' + meta(r, { curso: 1 }) + "</div></a>";
    }).join("") + "</div></section>";

    var rec = D.recursos.slice().sort(function (a, b) { return (parseFecha(b.actualizado) || 0) - (parseFecha(a.actualizado) || 0); }).slice(0, 6);
    h += '<section><div class="sec-head"><h2>Recién actualizados</h2><a href="#biblioteca">Ver biblioteca</a></div>' + lista(rec, { curso: 1 }) + "</section>";
    return h;
  }
  function cardSemana(c, w) {
    var t = temaDeSemana(c, w), cc = colorCurso(c);
    var sab = "#curso." + c.codigo + ".saberes", act = "#curso." + c.codigo + ".actividades";
    var guia = t && recursosDe(c.codigo, function (r) { return norm(r.tipo) === "guia" && String(r.tema) === String(t.tema); })[0];
    return '<div class="card week-card" style="--c:' + cc + '"><span class="tag">' + esc(c.codigo) + " · Semana " + pad(w) + (t ? " · Tema " + esc(t.tema) : "") + "</span>" +
      "<h3>" + esc(t ? t.titulo : c.nombre) + '</h3><div class="now">' + esc(c.nombre) + "</div>" +
      '<div class="btnrow"><a class="btn small" href="' + sab + '">' + ic("archivo", 18) + 'Saberes</a><a class="btn small" href="' + act + '">' + ic("actividad", 18) + "Actividad</a>" +
      '<a class="btn small" href="' + (guia ? "#recurso." + encodeURIComponent(guia.id) : "#curso." + c.codigo + ".semana") + '">' + ic("guia", 18) + "Guía</a></div>" +
      '<a class="btn primary" href="#curso.' + c.codigo + '.semana">Abrir semana ' + pad(w) + "</a></div>";
  }
  function cardCurso(c) {
    var n = recursosDe(c.codigo).length, w = semanaActual(c);
    return '<a class="card course-card" style="--c:' + colorCurso(c) + '" href="#curso.' + esc(c.codigo) + '"><span class="code">' + esc(c.codigo) + "</span><h3>" + esc(c.nombre) + "</h3><p>" + esc(c.descripcion) + "</p>" +
      '<div class="course-meta"><span>' + esc(c.universidad) + " · Ciclo " + esc(c.ciclo) + " · " + esc(c.periodo) + "</span><span>" + n + " recursos</span>" + (w && norm(c.estado) !== "anterior" ? "<span>Semana " + pad(w) + "</span>" : "") + "</div></a>";
  }

  function vCursos() {
    var act = D.cursos.filter(function (c) { return norm(c.estado) !== "anterior"; }), ant = D.cursos.filter(function (c) { return norm(c.estado) === "anterior"; });
    var h = '<section><div class="sec-head"><h2>Cursos de este ciclo</h2></div><div class="grid">' + act.map(cardCurso).join("") + "</div></section>";
    if (ant.length) h += '<section><div class="sec-head"><h2>Cursos anteriores</h2></div><div class="grid">' + ant.map(cardCurso).join("") + "</div></section>";
    return h;
  }

  function vEstaSemana() {
    var h = '<section><div class="sec-head"><h2>Esta semana en tus cursos</h2></div><div class="stack">';
    var algo = false;
    D.cursos.filter(function (c) { return norm(c.estado) !== "anterior"; }).forEach(function (c) {
      var w = semanaActual(c); if (!w) return; algo = true;
      h += '<div class="card" style="gap:14px"><div><span class="eyebrow">' + esc(c.codigo) + "</span><div class=\"h2\" style=\"margin-top:6px\">" + esc(c.nombre) + "</div></div>" + bloqueSemana(c, w, true, true) + "</div>";
    });
    if (!algo) h += '<div class="empty">Ningún curso está en periodo de clases en este momento.</div>';
    return h + "</div></section>";
  }

  function bloqueSemana(c, w, abierto, plano) {
    var t = temaDeSemana(c, w), ahora = semanaActual(c) === w;
    var rs = recursosDe(c.codigo, function (r) { return String(r.semana) === String(w); }).sort(porOrden);
    var as = D.actividades.filter(function (a) { return a.curso === c.codigo && String(a.semana) === String(w); });
    var cuenta = {}; rs.forEach(function (r) { var k = tipoDe(r.tipo).pl; cuenta[k] = (cuenta[k] || 0) + 1; });
    var resumen = Object.keys(cuenta).map(function (k) { return cuenta[k] + " " + k.toLowerCase(); }).join(" · ") || "Sin materiales publicados";
    var cuerpo = "";
    if (t && t.carpeta) cuerpo += '<a class="btn" href="' + esc(t.carpeta) + '" target="_blank" rel="noopener">' + ic("carpeta", 18) + "Abrir carpeta del Tema " + esc(t.tema) + "</a>";
    as.forEach(function (a) { cuerpo += tarjetaActividad(a, true); });
    cuerpo += lista(rs, { noSem: 1 }) || (as.length ? "" : '<p class="cap">Aún no hay materiales publicados para esta semana.</p>');
    var titulo = t ? "Tema " + esc(t.tema) + " · " + esc(t.titulo) : (as[0] ? esc(as[0].nombre) : "Semana " + pad(w));
    if (plano) return '<div class="stack"><div class="sum-sub">Semana ' + pad(w) + " · " + titulo + "</div>" + cuerpo + "</div>";
    return '<details class="block' + (ahora ? " is-now" : "") + '" id="sem-' + w + '"' + (abierto ? " open" : "") + '><summary><span class="wk">SEM<b>' + pad(w) + '</b></span><span><span class="sum-title">' + titulo + (ahora ? '<span class="nowpill">Esta semana</span>' : "") +
      '</span><br><span class="sum-sub">' + esc(resumen) + (as.length ? " · " + as.length + " actividad" + (as.length > 1 ? "es" : "") : "") + "</span></span>" + ic("chev") + '</summary><div class="block-body">' + cuerpo + "</div></details>";
  }

  function tarjetaActividad(a, compacta) {
    var enl = [["guia", "Guía", "guia"], ["plantilla", "Plantilla", "plantilla"], ["rubrica", "Rúbrica", "rubrica"]].map(function (x) {
      var r = D.porId[a[x[0]]]; return r ? '<a class="btn small" href="#recurso.' + encodeURIComponent(r.id) + '">' + ic(x[2], 18) + x[1] + "</a>" : "";
    }).join("");
    var h = '<div class="card act" id="act-' + esc(a.id) + '" style="' + (compacta ? "background:var(--surface-2);border:0" : "") + '"><div class="act-top">' + ticon("actividad") +
      (a.semana ? '<span class="pill">Semana ' + pad(a.semana) + "</span>" : "") + (a.evaluacion ? '<span class="badge">' + esc(a.evaluacion) + "</span>" : "") + "</div><h3>" + esc(a.nombre) + "</h3><dl>";
    if (a.objetivo) h += "<div><dt>Objetivo</dt><dd>" + esc(a.objetivo) + "</dd></div>";
    if (!compacta) {
      if (a.instrucciones) h += "<div><dt>Instrucciones</dt><dd>" + esc(a.instrucciones) + "</dd></div>";
      if (a.producto) h += "<div><dt>Producto esperado</dt><dd>" + esc(a.producto) + "</dd></div>";
      if (a.criterios) h += "<div><dt>Criterios de evaluación</dt><dd>" + esc(a.criterios) + "</dd></div>";
    } else if (a.producto) h += "<div><dt>Producto esperado</dt><dd>" + esc(a.producto) + "</dd></div>";
    h += "</dl>" + (enl ? '<div class="btnrow">' + enl + "</div>" : "") + "</div>";
    return h;
  }

  function esAudio(r) { var t = norm(r.tipo); return t === "podcast" || t === "audio"; }
  function driveId(u) { var m = String(u || "").match(/\/d\/([\w-]{20,})/) || String(u || "").match(/[?&]id=([\w-]{20,})/); return m ? m[1] : ""; }
  function reproductor(r) {
    var id = driveId(r.enlace);
    return '<div class="player" data-player="' + esc(id) + '">' + ticon(r.tipo, 22) + '<div class="player-txt"><b>' + esc(r.titulo) + "</b>" +
      (r.descripcion ? "<span>" + esc(r.descripcion) + "</span>" : "") + '<span class="meta">' + (r.subtema ? "Subtema " + esc(r.subtema) + " · " : "") + (r.peso ? esc(r.peso) : "") + "</span></div>" +
      (id ? '<button class="btn primary" data-play="' + esc(id) + '">' + ic("play", 16) + "Escuchar</button>" : '<a class="btn" href="#recurso.' + encodeURIComponent(r.id) + '">Ver</a>') + "</div>";
  }
  var TABS = [["semana", "Por semana"], ["audios", "Podcasts"], ["saberes", "Saberes esenciales"], ["actividades", "Actividades y guías"], ["plantillas", "Plantillas y herramientas"], ["rubricas", "Rúbricas"]];
  function vCurso(cod, tab) {
    var c = D.curso[cod]; if (!c) return vNoEncontrado();
    tab = tab || "semana";
    var w = semanaActual(c), cc = colorCurso(c);
    var silabo = D.recursos.filter(function (r) { return r.curso === cod && norm(r.titulo).indexOf("silabo") === 0; })[0];
    var h = '<a class="back" href="#cursos">' + ic("atras", 18) + "Cursos</a>";
    h += '<section class="course-head" style="--c:' + cc + '"><span class="code">' + esc(c.codigo) + " · " + esc(c.universidad) + " · Ciclo " + esc(c.ciclo) + " · " + esc(c.periodo) + "</span><h1>" + esc(c.nombre) + "</h1>" +
      (c.logro ? "<p><b>Al terminar el curso:</b> " + esc(c.logro) + "</p>" : "") + '<div class="btns">' +
      (w ? '<a class="btn primary" href="#curso.' + esc(cod) + '.semana">' + ic("semana", 18) + "Semana " + pad(w) + "</a>" : "") +
      (silabo ? '<a class="btn" href="#recurso.' + encodeURIComponent(silabo.id) + '">' + ic("archivo", 18) + "Sílabo</a>" : (c.silabo ? '<a class="btn" href="' + esc(c.silabo) + '" target="_blank" rel="noopener">' + ic("archivo", 18) + "Sílabo</a>" : "")) +
      (recursosDe(cod, esAudio).length ? '<a class="btn" href="#curso.' + esc(cod) + '.audios">' + ic("audio", 18) + "Podcasts (" + recursosDe(cod, esAudio).length + ")</a>" : "") +
      (c.grupo ? '<a class="btn" href="' + esc(c.grupo) + '" target="_blank" rel="noopener">' + ic("candado", 18) + "Solicitar acceso a los archivos</a>" : "") +
      (c.aula_virtual ? '<a class="btn" href="' + esc(c.aula_virtual) + '" target="_blank" rel="noopener">' + ic("aula", 18) + "Aula virtual</a>" : "") + "</div></section>";
    h += '<nav class="tabs" aria-label="Secciones del curso">' + TABS.map(function (t) { return '<a href="#curso.' + esc(cod) + "." + t[0] + '"' + (t[0] === tab ? ' aria-current="page"' : "") + ">" + t[1] + "</a>"; }).join("") + "</nav>";

    if (tab === "semana") {
      var s = '<div class="stack">';
      for (var i = 1; i <= totalSem(c); i++) s += bloqueSemana(c, i, i === w);
      h += "<section>" + s + "</div></section>";
    } else if (tab === "audios") {
      var aus = recursosDe(cod, esAudio), tA = w ? temaDeSemana(c, w) : null;
      if (!aus.length) h += '<section><div class="empty">' + ic("audio", 28) + "<p>Aún no hay podcasts publicados para este curso.</p></div></section>";
      else {
        h += '<section><p class="cap">Escúchalos aquí mismo o ábrelos en Google Drive. Se reproducen con la cuenta con la que te uniste al grupo del curso.</p></section>';
        h += '<section class="stack">' + D.temas.filter(function (t) { return t.curso === cod; }).map(function (t) {
          var rs = aus.filter(function (r) { return String(r.tema) === String(t.tema); }).sort(function (a, b) { return String(a.subtema).localeCompare(String(b.subtema), "es", { numeric: true }) || a.titulo.localeCompare(b.titulo, "es"); });
          if (!rs.length) return "";
          var ahora = tA && tA.tema === t.tema;
          return '<details class="block' + (ahora ? " is-now" : "") + '" open><summary><span class="wk">TEMA<b>' + esc(t.tema) + '</b></span><span><span class="sum-title">' + esc(t.titulo) + (ahora ? '<span class="nowpill">En curso</span>' : "") + '</span><br><span class="sum-sub">' + rs.length + " podcast" + (rs.length > 1 ? "s" : "") + "</span></span>" + ic("chev") + '</summary><div class="block-body">' + rs.map(reproductor).join("") + "</div></details>";
        }).join("") + "</section>";
        var sinTema = aus.filter(function (r) { return !r.tema; });
        if (sinTema.length) h += '<section><div class="sec-head"><h2>Otros audios</h2></div>' + sinTema.map(reproductor).join("") + "</section>";
      }
    } else if (tab === "saberes") {
      var tAct = w ? temaDeSemana(c, w) : null;
      h += '<section class="stack">' + D.temas.filter(function (t) { return t.curso === cod; }).map(function (t) {
        var rs = recursosDe(cod, function (r) { return String(r.tema) === String(t.tema) && ["saberes esenciales", "presentacion", "video", "podcast", "audio", "lectura", "infografia", "documento"].indexOf(norm(r.tipo)) >= 0; });
        var generales = rs.filter(function (r) { return !r.subtema; }).sort(porOrden);
        var subs = D.subtemas.filter(function (s) { return s.curso === cod && String(s.tema) === String(t.tema); });
        var body = (t.capacidad ? '<p class="cap">' + esc(t.capacidad) + "</p>" : "") + lista(generales);
        subs.forEach(function (s) {
          var rr = rs.filter(function (r) { return String(r.subtema) === String(s.subtema); }).sort(porOrden);
          body += '<div><div class="subt"><span class="mono">' + esc(s.subtema) + "</span>" + esc(s.titulo) + "</div>" + (lista(rr) || '<p class="cap">Próximamente.</p>') + "</div>";
        });
        var ahora = tAct && tAct.tema === t.tema;
        return '<details class="block' + (ahora ? " is-now" : "") + '"' + (ahora ? " open" : "") + '><summary><span class="wk">TEMA<b>' + esc(t.tema) + '</b></span><span><span class="sum-title">' + esc(t.titulo) + (ahora ? '<span class="nowpill">En curso</span>' : "") + '</span><br><span class="sum-sub">Semanas ' + esc(t.semana_inicio) + "–" + esc(t.semana_fin) + " · " + rs.length + " recursos</span></span>" + ic("chev") + '</summary><div class="block-body">' + body + "</div></details>";
      }).join("") + "</section>";
    } else if (tab === "actividades") {
      var acts = D.actividades.filter(function (a) { return a.curso === cod; }).sort(function (a, b) { return (+a.semana || 99) - (+b.semana || 99); });
      var guias = recursosDe(cod, function (r) { return norm(r.tipo) === "guia"; }).sort(function (a, b) { return (+a.semana || 99) - (+b.semana || 99); });
      h += '<section><div class="grid">' + acts.map(function (a) { return tarjetaActividad(a); }).join("") + "</div></section>";
      if (guias.length) h += '<section><div class="sec-head"><h2>Todas las guías</h2></div>' + lista(guias) + "</section>";
    } else if (tab === "plantillas") {
      ["plantilla", "herramienta"].forEach(function (k) {
        var rs = recursosDe(cod, function (r) { return norm(r.tipo) === k; }).sort(function (a, b) { return a.titulo.localeCompare(b.titulo, "es"); });
        if (rs.length) h += '<section><div class="sec-head"><h2>' + TIPOS[k].pl + "</h2></div>" + lista(rs) + "</section>";
      });
    } else if (tab === "rubricas") {
      var rb = recursosDe(cod, function (r) { return norm(r.tipo) === "rubrica"; }).sort(function (a, b) { return (+a.semana || 99) - (+b.semana || 99); });
      h += "<section>" + (lista(rb) || '<div class="empty">Aún no hay rúbricas publicadas.</div>') + "</section>";
    }
    return h;
  }

  function vRecurso(id) {
    var r = D.porId[id]; if (!r) return vNoEncontrado();
    var c = D.curso[r.curso], l = enlaces(r.enlace), ext = r.enlace_externo;
    var h = '<a class="back" href="#curso.' + esc(r.curso) + '">' + ic("atras", 18) + esc(r.curso) + "</a>";
    h += '<article class="sheet"><div class="sheet-main"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">' + ticon(r.tipo, 22) + '<span class="eyebrow">' + esc(r.tipo) + "</span>" + badge(r) + "</div>" +
      "<h1>" + esc(r.titulo) + "</h1>" + (r.descripcion ? '<p style="margin:0;max-width:65ch">' + esc(r.descripcion) + "</p>" : "") +
      '<div class="actions">' +
      (l.ver ? '<a class="btn primary" href="' + esc(l.ver) + '" target="_blank" rel="noopener">' + ic("ver") + "Ver recurso</a>" : '<button class="btn primary" data-demo>' + ic("ver") + "Ver recurso</button>") +
      (l.descargar ? '<a class="btn gold" href="' + esc(l.descargar) + '" target="_blank" rel="noopener">' + ic("descargar") + "Descargar</a>" : (!l.ver ? '<button class="btn gold" data-demo>' + ic("descargar") + "Descargar</button>" : "")) +
      (ext ? '<a class="btn" href="' + esc(ext) + '" target="_blank" rel="noopener">' + ic("externo") + "Abrir recurso externo</a>" : "") + "</div>" +
      (esAudio(r) && driveId(r.enlace) ? '<div class="player" data-player="' + esc(driveId(r.enlace)) + '"><button class="btn primary" data-play="' + esc(driveId(r.enlace)) + '">' + ic("play", 16) + "Escuchar aquí</button></div>" : "") +
      (norm(r.visibilidad) !== "publico" ? '<div class="lock">' + ic("candado", 18) + "<span>" + esc(D.cfg.aviso_acceso || "El archivo es solo para estudiantes del curso.") + (c && c.grupo ? ' <a href="' + esc(c.grupo) + '" target="_blank" rel="noopener">Solicitar acceso</a>' : "") + "</span></div>" : "") +
      '</div><div class="card"><dl class="facts">' +
      "<dt>Curso</dt><dd><a href=\"#curso." + esc(r.curso) + '"><span class="mono">' + esc(r.curso) + "</span> " + esc(c ? c.nombre : "") + "</a></dd>" +
      (r._tema ? "<dt>Tema</dt><dd>" + esc(r._tema.tema) + ". " + esc(r._tema.titulo) + "</dd>" : "") +
      (r._sub ? "<dt>Subtema</dt><dd>" + esc(r._sub.subtema) + " " + esc(r._sub.titulo) + "</dd>" : "") +
      (r.semana ? "<dt>Semana</dt><dd>" + pad(r.semana) + "</dd>" : "") +
      "<dt>Tipo</dt><dd>" + esc(r.tipo) + "</dd>" + (r.formato ? "<dt>Formato</dt><dd>" + esc(r.formato) + (r.peso ? " · " + esc(r.peso) : "") + "</dd>" : "") +
      (r.actualizado ? "<dt>Actualizado</dt><dd>" + fecha(r.actualizado) + "</dd>" : "") + '<dt>Código</dt><dd class="mono">' + esc(r.id) + "</dd></dl></div></article>";

    var usos = D.actividades.filter(function (a) { return a.guia === id || a.plantilla === id || a.rubrica === id; });
    if (usos.length) h += '<section><div class="sec-head"><h2>Se usa en</h2></div><div class="grid">' + usos.map(function (a) { return tarjetaActividad(a, true); }).join("") + "</div></section>";
    var tags = r._txt.e.split(";").map(function (s) { return s.trim(); }).filter(Boolean);
    var rel = D.recursos.filter(function (x) { return x.id !== id && x.curso === r.curso; }).map(function (x) {
      var s = 0; if (r.subtema && x.subtema === r.subtema) s += 3; if (r.tema && x.tema === r.tema) s += 2;
      tags.forEach(function (t) { if (x._txt.e.indexOf(t) >= 0) s += 1.5; }); return [s, x];
    }).filter(function (p) { return p[0] >= 2; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 5).map(function (p) { return p[1]; });
    if (rel.length) h += '<section><div class="sec-head"><h2>Recursos relacionados</h2></div>' + lista(rel) + "</section>";
    return h;
  }

  /* ---------- Búsqueda ---------- */
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var m = [], i, j; for (i = 0; i <= b.length; i++) m[i] = [i];
    for (j = 0; j <= a.length; j++) m[0][j] = j;
    for (i = 1; i <= b.length; i++) for (j = 1; j <= a.length; j++) m[i][j] = Math.min(m[i - 1][j - 1] + (b[i - 1] === a[j - 1] ? 0 : 1), m[i][j - 1] + 1, m[i - 1][j] + 1);
    return m[b.length][a.length];
  }
  function grupos(q) {
    var nq = norm(q); if (!nq) return [];
    var usados = {}, gs = [];
    D.syn.forEach(function (g) { g.forEach(function (term) { if (term && (nq === term || (" " + nq + " ").indexOf(" " + term + " ") >= 0)) { gs.push(g); nq = (" " + nq + " ").replace(" " + term + " ", " ").trim(); } }); });
    nq.split(/\s+/).filter(function (t) { return t.length > 1 && ["de", "la", "el", "los", "las", "del", "y", "en", "para", "por", "un", "una"].indexOf(t) < 0; }).forEach(function (t) {
      if (usados[t]) return; usados[t] = 1;
      var g = [t]; D.syn.forEach(function (s) { if (s.indexOf(t) >= 0) g = g.concat(s); }); gs.push(g);
    });
    return gs;
  }
  function puntaje(txt, g) {
    var best = 0, W = { t: 3, e: 2.5, c: 1.5, d: 1 };
    Object.keys(W).forEach(function (k) {
      var f = txt[k];
      g.forEach(function (term) {
        if (f.indexOf(term) >= 0) best = Math.max(best, W[k]);
        else if (term.length >= 4 && term.indexOf(" ") < 0) {
          var words = f.split(/[^a-z0-9ñ]+/);
          for (var i = 0; i < words.length; i++) { var d = lev(term, words[i]); if (d <= (term.length >= 7 ? 2 : 1)) { best = Math.max(best, W[k] * 0.6); break; } }
        }
      });
    });
    return best;
  }
  function buscar() {
    var gs = grupos(Q.q);
    var base = D.recursos.filter(function (r) {
      return (!Q.curso || r.curso === Q.curso) && (!Q.tema || String(r.tema) === Q.tema) && (!Q.tipo || norm(r.tipo) === Q.tipo) && (!Q.semana || String(r.semana) === Q.semana) && (!Q.formato || norm(r.formato) === Q.formato);
    });
    if (!gs.length) return { items: base.slice().sort(function (a, b) { return a.curso.localeCompare(b.curso) || (+a.tema || 99) - (+b.tema || 99) || porOrden(a, b); }), gs: gs };
    var todos = [], alguno = [];
    base.forEach(function (r) {
      var total = 0, ok = 0; gs.forEach(function (g) { var p = puntaje(r._txt, g); if (p) { ok++; total += p; } });
      if (ok === gs.length) todos.push([total, r]); else if (ok) alguno.push([total, r]);
    });
    var res = todos.length ? todos : alguno;
    return { items: res.sort(function (a, b) { return b[0] - a[0]; }).map(function (p) { return p[1]; }), gs: gs, parcial: !todos.length && alguno.length };
  }
  function resaltar(texto, gs) {
    var t = String(texto), n = "", map = [];
    for (var i = 0; i < t.length; i++) { var c = norm(t[i]) || t[i].toLowerCase(); for (var k = 0; k < c.length; k++) { n += c[k]; map.push(i); } }
    var marks = new Array(t.length).fill(false);
    gs.forEach(function (g) { g.forEach(function (term) { if (term.length < 2) return; var p = n.indexOf(term); while (p >= 0) { for (var j = p; j < p + term.length; j++) marks[map[j]] = true; p = n.indexOf(term, p + term.length); } }); });
    var out = "", open = false;
    for (i = 0; i < t.length; i++) { if (marks[i] && !open) { out += "<mark>"; open = true; } if (!marks[i] && open) { out += "</mark>"; open = false; } out += esc(t[i]); }
    return out + (open ? "</mark>" : "");
  }
  function opciones(vals, sel, todos) { return '<option value="">' + todos + "</option>" + vals.map(function (v) { return '<option value="' + esc(v[0]) + '"' + (v[0] === sel ? " selected" : "") + ">" + esc(v[1]) + "</option>"; }).join(""); }
  function uniq(arr) { var s = {}, o = []; arr.forEach(function (x) { if (x[0] !== "" && !s[x[0]]) { s[x[0]] = 1; o.push(x); } }); return o; }
  function vBiblioteca() {
    var h = '<section class="stack" style="gap:14px"><h2>Biblioteca de recursos</h2>' +
      '<form class="bigsearch" data-search-live role="search"><label class="sr" for="q-bib">Buscar recursos</label>' + ic("buscar", 22) +
      '<input id="q-bib" type="search" autocomplete="off" placeholder="Escribe un tema, herramienta o palabra clave" value="' + esc(Q.q) + '"></form>' +
      '<div class="filters" id="filtros"></div><div id="resultados"></div></section>';
    return h;
  }
  function pintarFiltros() {
    var el = document.getElementById("filtros"); if (!el) return;
    var rs = D.recursos.filter(function (r) { return !Q.curso || r.curso === Q.curso; });
    var temas = Q.curso ? D.temas.filter(function (t) { return t.curso === Q.curso; }).map(function (t) { return [String(t.tema), "Tema " + t.tema + ". " + t.titulo]; }) : [];
    var tipos = uniq(rs.map(function (r) { return [norm(r.tipo), r.tipo]; })).sort(function (a, b) { return (TIPOS[a[0]] || {}).ord - (TIPOS[b[0]] || {}).ord; });
    var sems = uniq(rs.map(function (r) { return [String(r.semana), "Semana " + pad(r.semana)]; })).sort(function (a, b) { return a[0] - b[0]; });
    var fmts = uniq(rs.map(function (r) { return [norm(r.formato), r.formato]; })).sort(function (a, b) { return a[1].localeCompare(b[1]); });
    el.innerHTML =
      '<label for="f-curso">Curso<select id="f-curso" data-f="curso">' + opciones(D.cursos.map(function (c) { return [c.codigo, c.codigo + " · " + c.nombre]; }), Q.curso, "Todos") + "</select></label>" +
      '<label for="f-tema">Tema<select id="f-tema" data-f="tema"' + (Q.curso ? "" : " disabled") + ">" + opciones(temas, Q.tema, Q.curso ? "Todos" : "Elige un curso") + "</select></label>" +
      '<label for="f-tipo">Tipo<select id="f-tipo" data-f="tipo">' + opciones(tipos, Q.tipo, "Todos") + "</select></label>" +
      '<label for="f-semana">Semana<select id="f-semana" data-f="semana">' + opciones(sems, Q.semana, "Todas") + "</select></label>" +
      '<label for="f-formato">Formato<select id="f-formato" data-f="formato">' + opciones(fmts, Q.formato, "Todos") + "</select></label>";
  }
  function pintarResultados() {
    var el = document.getElementById("resultados"); if (!el) return;
    var r = buscar(), n = r.items.length, filtros = Q.curso || Q.tema || Q.tipo || Q.semana || Q.formato;
    var h = '<div class="count"><span>' + (Q.q ? n + " resultado" + (n === 1 ? "" : "s") + " para «" + esc(Q.q) + "»" : n + " recursos") + (r.parcial ? " (coincidencias parciales)" : "") + "</span>" +
      (filtros || Q.q ? '<button class="linkbtn" data-limpiar>Limpiar búsqueda</button>' : "") + "</div>";
    if (!n) h += '<div class="empty">No encontramos recursos con esa búsqueda. Prueba con otra palabra o quita filtros.</div>';
    else {
      h += lista(r.items.slice(0, Q.limite), { curso: !Q.curso, hl: r.gs.length ? r.gs : null });
      if (n > Q.limite) h += '<div style="text-align:center;margin-top:12px"><button class="btn" data-mas>Mostrar más (' + (n - Q.limite) + ")</button></div>";
    }
    el.innerHTML = h;
  }

  function vAyuda() {
    return '<article class="prose"><h1>Ayuda</h1>' +
      "<h2>¿Cómo encuentro el material de mi clase?</h2><p>En Inicio, busca tu curso en «Esta semana» y toca Saberes, Actividad o Guía. También puedes entrar al curso y abrir la pestaña «Por semana».</p>" +
      "<h2>¿Por qué me pide iniciar sesión?</h2><p>Los archivos son solo para estudiantes del curso. La primera vez, entra a tu curso y toca «Solicitar acceso a los archivos»: te unes al grupo de Google del curso con tu cuenta UPN y tu docente aprueba la solicitud. Después, abre los archivos con esa misma cuenta; si tienes otra cuenta de Google abierta en el celular, cámbiala desde el ícono de tu perfil.</p>" +
      "<h2>¿Cómo descargo desde el celular?</h2><p>Toca el botón dorado «Descargar». Si Drive abre una vista previa, usa el menú ⋮ y elige «Descargar».</p>" +
      "<h2>No encuentro un recurso</h2><p>Usa la Biblioteca y prueba con una sigla (OEE, MRP, CPM) o con el nombre del tema. Si aún no aparece, consulta a tu docente en clase o por el aula virtual.</p>" +
      "<h2>¿Dónde entrego mis trabajos?</h2><p>Las entregas y calificaciones se gestionan en el aula virtual de la universidad. Este sitio organiza los materiales.</p></article>";
  }
  function vPrivacidad() {
    return '<article class="prose"><h1>Privacidad</h1><p>Este sitio no solicita ni guarda datos personales de los estudiantes. No usa cookies de seguimiento.</p>' +
      "<p>Tu navegador guarda una copia temporal del catálogo de recursos para que el sitio cargue más rápido. Puedes borrarla desde la configuración de tu navegador.</p>" +
      "<p>Los archivos están alojados en Google Drive y su acceso se rige por las condiciones de tu cuenta institucional. El tratamiento de datos personales se ajusta a la Ley N.º 29733, Ley de Protección de Datos Personales del Perú.</p>" +
      "<p>Los materiales son de uso académico exclusivo para los estudiantes de los cursos. No los redistribuyas fuera del curso.</p></article>";
  }
  function vNoEncontrado() { return '<div class="empty">No encontramos esta página. <a href="#">Volver al inicio</a>.</div>'; }

  /* ---------- Marco y navegación ---------- */
  function ruta() {
    var h = decodeURIComponent((location.hash || "").replace(/^#\/?/, ""));
    var i = h.indexOf("."), tipo = i < 0 ? h : h.slice(0, i), resto = i < 0 ? "" : h.slice(i + 1);
    return { tipo: tipo || "inicio", resto: resto };
  }
  function render() {
    if (!D) return;
    var r = ruta(), vista = "", sec = r.tipo;
    if (r.tipo === "inicio") vista = vInicio();
    else if (r.tipo === "cursos") vista = vCursos();
    else if (r.tipo === "semana") vista = vEstaSemana();
    else if (r.tipo === "biblioteca") vista = vBiblioteca();
    else if (r.tipo === "curso") { var p = r.resto.split("."); vista = vCurso(p[0], p[1]); sec = "cursos"; }
    else if (r.tipo === "recurso") { vista = vRecurso(r.resto); sec = ""; }
    else if (r.tipo === "ayuda") vista = vAyuda();
    else if (r.tipo === "privacidad") vista = vPrivacidad();
    else vista = vNoEncontrado();
    var nav = [["inicio", "", "Inicio", "home"], ["cursos", "cursos", "Cursos", "cursos"], ["semana", "semana", "Esta semana", "semana"], ["biblioteca", "biblioteca", "Biblioteca", "biblioteca"]];
    var nombre = D.cfg.nombre_sitio || "NEXO Académico";
    var ult = D.recursos.map(function (x) { return parseFecha(x.actualizado); }).filter(Boolean).sort(function (a, b) { return b - a; })[0];
    document.title = nombre;
    document.getElementById("app").innerHTML =
      '<header class="top"><div class="top-in"><a class="logo" href="#"><span class="logo-mark" aria-hidden="true">N</span><span class="logo-txt">' + esc(nombre.split(" ")[0]) + "<small>" + esc(D.cfg.docente || "") + "</small></span></a>" +
      '<nav class="topnav" aria-label="Principal">' + nav.map(function (n) { return '<a href="#' + n[1] + '"' + (sec === n[0] ? ' aria-current="page"' : "") + ">" + n[2] + "</a>"; }).join("") + "</nav>" +
      '<form class="topsearch" data-search role="search"><label class="sr" for="q-top">Buscar</label>' + ic("buscar", 18) + '<input id="q-top" type="search" autocomplete="off" placeholder="Buscar recursos"></form></div></header>' +
      (ES_EJEMPLO ? '<div class="demo"><span>Vista de ejemplo con datos de muestra de CINE1248P. Los archivos se activan al conectar tu hoja de Google.</span></div>' : "") +
      "<main>" + vista + "</main>" +
      '<footer><span>' + esc(D.cfg.docente || "") + (ult ? " · Actualizado " + FMT.format(ult) : "") + '</span><nav><a href="#ayuda">Ayuda</a><a href="#privacidad">Privacidad</a></nav></footer>' +
      '<nav class="bottomnav" aria-label="Principal">' + nav.map(function (n) { return '<a href="#' + n[1] + '"' + (sec === n[0] ? ' aria-current="page"' : "") + ">" + ic(n[3], 22) + n[2] + "</a>"; }).join("") + "</nav>";
    vigilarFoto();
    if (r.tipo === "biblioteca") { pintarFiltros(); pintarResultados(); }
    var ancla = r.tipo === "curso" && document.querySelector("details.is-now");
    if (ancla && ruta().resto.split(".")[1] === "semana") ancla.scrollIntoView({ block: "center" });
    else window.scrollTo(0, 0);
  }

  var tt;
  function toast(msg) {
    var el = document.querySelector(".toast"); if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg; el.hidden = false; clearTimeout(tt); tt = setTimeout(function () { el.hidden = true; }, 3800);
  }
  function irABiblioteca(q) {
    Q.q = q || ""; Q.limite = 40;
    if (ruta().tipo === "biblioteca") { var i = document.getElementById("q-bib"); if (i) i.value = Q.q; pintarResultados(); }
    else location.hash = "biblioteca";
  }

  document.addEventListener("submit", function (e) {
    var f = e.target; if (!f.matches("[data-search],[data-search-live]")) return;
    e.preventDefault(); var inp = f.querySelector("input"); irABiblioteca(inp.value.trim()); inp.blur();
  });
  document.addEventListener("input", function (e) {
    if (e.target.id === "q-bib") { Q.q = e.target.value; Q.limite = 40; pintarResultados(); }
  });
  document.addEventListener("change", function (e) {
    var k = e.target.getAttribute("data-f"); if (!k) return;
    Q[k] = e.target.value; if (k === "curso") Q.tema = ""; Q.limite = 40; pintarFiltros(); pintarResultados();
  });
  document.addEventListener("click", function (e) {
    var pl = e.target.closest("[data-play]");
    if (pl) {
      e.preventDefault(); var pid = pl.getAttribute("data-play"), box = pl.closest("[data-player]");
      var fr = document.createElement("iframe"); fr.className = "player-frame"; fr.src = "https://drive.google.com/file/d/" + pid + "/preview"; fr.allow = "autoplay"; fr.title = "Reproductor de audio";
      var alt = document.createElement("a"); alt.href = "https://drive.google.com/file/d/" + pid + "/view"; alt.target = "_blank"; alt.rel = "noopener"; alt.className = "player-alt"; alt.textContent = "¿No se reproduce? Ábrelo en Google Drive";
      var wrap = document.createElement("div"); wrap.className = "player-embed"; wrap.appendChild(fr); wrap.appendChild(alt);
      pl.replaceWith(wrap); return;
    }
    var b = e.target.closest("[data-q],[data-demo],[data-limpiar],[data-mas]"); if (!b) return;
    if (b.hasAttribute("data-q")) irABiblioteca(b.getAttribute("data-q"));
    else if (b.hasAttribute("data-demo")) { e.preventDefault(); toast("Recurso de ejemplo: aquí se abrirá el archivo de Google Drive."); }
    else if (b.hasAttribute("data-limpiar")) { Q = { q: "", curso: "", tema: "", tipo: "", semana: "", formato: "", limite: 40 }; var i = document.getElementById("q-bib"); if (i) i.value = ""; pintarFiltros(); pintarResultados(); }
    else if (b.hasAttribute("data-mas")) { Q.limite += 40; pintarResultados(); }
  });
  window.addEventListener("hashchange", render);
  iniciar();
})();
