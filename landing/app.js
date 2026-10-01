// ============================================
// Zeus ⚡ web — Comportamiento de la página
// ============================================
// Arma los rubros de la portada y los paneles de profesionales a partir de
// datos/, conecta los botones de WhatsApp y la ventana "Quiero ser proveedor".
// Tocar un rubro abre su panel debajo de la portada; tocarlo de nuevo lo cierra.

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

  // ---------- Rubros de la portada ----------
  var barra = document.getElementById("rubros");
  barra.innerHTML = botones.map(function (x) {
    return (
      '<button class="rubro" type="button" data-panel="' + x.b.id + '" aria-expanded="false" aria-controls="panel-' + x.b.id + '">' +
        '<span class="icon">' + icono(x.b.icono) + "</span>" +
        '<span class="label">' + texto(x.b.etiqueta) + "</span>" +
      "</button>"
    );
  }).join("");

  // ---------- Paneles ----------
  function tarjeta(p, seccion) {
    var cara = p.foto
      ? '<img src="' + p.foto + '" alt="' + texto(p.nombre) + '" width="84" height="84" decoding="async">'
      : '<div class="sin-foto" aria-hidden="true">' + texto(p.nombre.charAt(0)) + "</div>";
    // El botón abre el chat con Zeus (no con la persona): por eso dice "Pedir a …" y no "Contratar".
    var mensaje = "Hola Zeus! Quiero pedir a " + p.nombre + " (" + seccion.nombre + ").";
    var pila = String(p.nombre).split(" ")[0];
    return (
      '<div class="provider-card">' +
        cara +
        '<div class="prov-name">' + texto(p.nombre) + "</div>" +
        (p.frase ? '<div class="prov-desc">' + texto(p.frase) + "</div>" : "") +
        '<a class="prov-wa" href="' + linkWhatsApp(mensaje) + '" target="_blank" rel="noopener">Pedir a ' + texto(pila) + "</a>" +
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
    return '<div id="panel-' + x.b.id + '" class="providers-panel"><div class="adentro">' + cuerpo + "</div></div>";
  }).join("");

  // ---------- Abrir / cerrar paneles ----------
  var actual = null;
  function togglePanel(id) {
    var panel = document.getElementById("panel-" + id);
    var btns = barra.querySelectorAll(".rubro");
    document.querySelectorAll(".providers-panel").forEach(function (p) { p.classList.remove("open"); });
    btns.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-expanded", "false"); });
    var portada = document.querySelector(".hero");
    if (actual === id) { actual = null; portada.classList.remove("con-panel"); return; }
    portada.classList.add("con-panel");
    panel.classList.add("open");
    actual = id;
    var btn = barra.querySelector('[data-panel="' + id + '"]');
    btn.classList.add("active");
    btn.setAttribute("aria-expanded", "true");
    // Sube la página hasta dejar los rubros arriba y el panel a la vista: se ve a
    // quién hay y se puede cambiar de rubro sin volver a buscar los botones.
    setTimeout(function () { barra.scrollIntoView({ block: "start" }); }, 50);
  }
  barra.addEventListener("click", function (e) {
    var btn = e.target.closest(".rubro");
    if (btn) togglePanel(btn.getAttribute("data-panel"));
  });

  // ---------- Fotos listas antes de abrir un panel ----------
  // Los paneles arrancan cerrados, así que el navegador no baja sus fotos hasta
  // que se abren y se veían círculos vacíos un par de segundos. Se bajan de
  // fondo cuando la página ya cargó (o al tocar un rubro, si el teléfono está
  // en modo "ahorro de datos").
  var pedidas = {};
  function bajarFotos(lista) {
    lista.forEach(function (p) {
      if (p.foto && !pedidas[p.foto]) { pedidas[p.foto] = true; new Image().src = p.foto; }
    });
  }
  function fotosDe(id) {
    var x = botones.filter(function (y) { return y.b.id === id; })[0];
    if (!x) return;
    x.secciones.forEach(function (s) { bajarFotos(gentePara(s.rubro)); });
  }
  ["pointerenter", "pointerdown", "focusin"].forEach(function (ev) {
    barra.addEventListener(ev, function (e) {
      var btn = e.target.closest && e.target.closest(".rubro");
      if (btn) fotosDe(btn.getAttribute("data-panel"));
    }, true);
  });
  var ahorro = navigator.connection && navigator.connection.saveData;
  if (!ahorro) {
    window.addEventListener("load", function () {
      setTimeout(function () { botones.forEach(function (x) { fotosDe(x.b.id); }); }, 800);
    });
  }

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
