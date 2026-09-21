// ============================================
// Zeus ⚡ web — Comportamiento de la página
// ============================================
// Arma la barra de servicios y los paneles de profesionales a partir de
// datos/, conecta los botones de WhatsApp y la ventana "Quiero ser proveedor".
// Tocar un servicio abre su panel; tocarlo de nuevo lo cierra.

(function () {
  "use strict";

  var C = window.ZEUS_CONFIG;
  var BARRA = window.ZEUS_BARRA || [];
  var GENTE = window.ZEUS_PROFESIONALES || [];

  // "?revisar" en la dirección muestra también los rubros sin profesionales y
  // a quienes no tienen foto. Solo para revisar el diseño: el público no lo usa.
  var revisar = window.ZEUS_REVISAR === true || /[?&]revisar(&|=|$)/.test(window.location.search);

  function linkWhatsApp(mensaje) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(mensaje || C.mensajeGeneral);
  }

  function texto(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function icono(valor) {
    if (valor && valor.indexOf("svg:") === 0) {
      return '<svg class="dibujo" aria-hidden="true"><use href="#d-' + valor.slice(4) + '"/></svg>';
    }
    return texto(valor);
  }

  // ---------- Botones generales de WhatsApp ----------
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = linkWhatsApp(a.getAttribute("data-wa"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  // ---------- Quién aparece en cada sección ----------
  function gentePara(rubro) {
    return GENTE.filter(function (p) {
      return p.rubros.indexOf(rubro) !== -1 && (p.foto || C.mostrarSinFoto || revisar);
    });
  }
  function tieneGente(rubro) {
    // Un rubro se muestra si tiene al menos un profesional activo (aunque falte su foto).
    return GENTE.some(function (p) { return p.rubros.indexOf(rubro) !== -1; });
  }

  var botones = BARRA.map(function (b) {
    var secciones = b.secciones.filter(function (s) { return revisar || tieneGente(s.rubro); });
    return { b: b, secciones: secciones };
  }).filter(function (x) { return x.secciones.length; });

  // ---------- Barra de servicios ----------
  var barra = document.getElementById("service-bar");
  barra.innerHTML = botones.map(function (x) {
    return (
      '<button class="service-btn" type="button" data-panel="' + x.b.id + '" aria-expanded="false" aria-controls="panel-' + x.b.id + '">' +
        '<span class="icon">' + icono(x.b.icono) + "</span>" +
        '<span class="label">' + texto(x.b.etiqueta) + "</span>" +
      "</button>"
    );
  }).join("");

  // ---------- Paneles ----------
  function tarjeta(p, seccion) {
    var cara = p.foto
      ? '<img src="' + p.foto + '" alt="' + texto(p.nombre) + '" loading="lazy">'
      : '<div class="sin-foto" aria-hidden="true">' + texto(p.nombre.charAt(0)) + "</div>";
    var mensaje = "Hola Zeus! Quiero contratar a " + p.nombre + " (" + seccion.nombre + ").";
    return (
      '<div class="provider-card">' +
        cara +
        '<div class="prov-name">' + texto(p.nombre) + "</div>" +
        (p.frase ? '<div class="prov-desc">' + texto(p.frase) + "</div>" : "") +
        '<a class="prov-wa" href="' + linkWhatsApp(mensaje) + '" target="_blank" rel="noopener">Contratar</a>' +
      "</div>"
    );
  }

  document.getElementById("paneles").innerHTML = botones.map(function (x) {
    var varias = x.secciones.length > 1;
    var cuerpo = x.secciones.map(function (s, i) {
      var gente = gentePara(s.rubro);
      var ico = s.icono || x.b.icono;
      return (
        "<h3" + (varias && i > 0 ? ' class="subsection-title"' : "") + ">" +
          icono(ico) + " " + texto(s.titulo) +
          (s.subtitulo ? ' <span class="subtitle">' + texto(s.subtitulo) + "</span>" : "") +
        "</h3>" +
        (s.descripcion ? '<p class="rubro-desc">' + texto(s.descripcion) + "</p>" : "") +
        (gente.length
          ? '<div class="providers-grid">' + gente.map(function (p) { return tarjeta(p, s); }).join("") + "</div>"
          : '<p class="vacio">Todavía no hay profesionales cargados en este rubro.</p>')
      );
    }).join("");
    return '<div id="panel-' + x.b.id + '" class="providers-panel">' + cuerpo + "</div>";
  }).join("");

  // ---------- Abrir / cerrar paneles ----------
  var actual = null;
  function togglePanel(id) {
    var panel = document.getElementById("panel-" + id);
    var btns = barra.querySelectorAll(".service-btn");
    document.querySelectorAll(".providers-panel").forEach(function (p) { p.classList.remove("open"); });
    btns.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-expanded", "false"); });
    if (actual === id) { actual = null; return; }
    panel.classList.add("open");
    actual = id;
    var btn = barra.querySelector('[data-panel="' + id + '"]');
    btn.classList.add("active");
    btn.setAttribute("aria-expanded", "true");
    setTimeout(function () { panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 50);
  }
  barra.addEventListener("click", function (e) {
    var btn = e.target.closest(".service-btn");
    if (btn) togglePanel(btn.getAttribute("data-panel"));
  });

  // ---------- "Quiero ser proveedor" ----------
  var ventana = document.getElementById("ventana-proveedor");
  document.getElementById("form-limpieza").href = C.formularios.limpieza;
  document.getElementById("form-oficios").href = C.formularios.oficios;
  document.getElementById("aviso-google").hidden = !C.formulariosPidenGoogle;
  document.getElementById("abrir-proveedor").addEventListener("click", function () {
    if (typeof ventana.showModal === "function") ventana.showModal();
    else window.open(C.formularios.oficios, "_blank", "noopener");
  });
  ventana.addEventListener("click", function (e) {
    if (e.target === ventana || e.target.hasAttribute("data-cerrar")) ventana.close();
  });
  ventana.querySelectorAll(".opcion").forEach(function (a) {
    a.addEventListener("click", function () { ventana.close(); });
  });
})();
