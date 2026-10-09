// ============================================
// Zeus ⚡ web — Comportamiento de la página
// ============================================
// Arma los rubros de la portada y los paneles de profesionales a partir de
// datos/, conecta los botones de WhatsApp, el buscador y la ventana "Quiero ser
// proveedor". Tocar un rubro abre su panel debajo de la portada; tocarlo de
// nuevo lo cierra. Escribir en el buscador reemplaza los rubros por los
// resultados (qué encuentra y por qué lo decide buscador.js).

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
  // "porque" (opcional) lo pasa el buscador: el detalle o rubro por el que apareció la persona.
  function tarjeta(p, seccion, porque) {
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
        (porque ? '<div class="prov-match">' + texto(porque) + "</div>" : "") +
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
  var portada = document.querySelector(".hero");
  function cerrarPaneles() {
    document.querySelectorAll("#paneles .providers-panel").forEach(function (p) { p.classList.remove("open"); });
    barra.querySelectorAll(".rubro").forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-expanded", "false"); });
    portada.classList.remove("con-panel");
  }
  function togglePanel(id) {
    var panel = document.getElementById("panel-" + id);
    var eraElMismo = actual === id;
    cerrarPaneles();
    actual = null;
    if (eraElMismo) return;
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

  // ---------- Buscador ----------
  // Mientras hay algo escrito, los resultados reemplazan a los rubros. Al borrar
  // vuelven los rubros. Busca solo entre quienes la página ya muestra.
  var B = window.ZEUS_BUSCADOR;
  var campo = document.getElementById("buscar");
  var borrar = document.getElementById("buscar-borrar");
  var resultados = document.getElementById("resultados");
  if (B && campo && resultados) {
    var seccionesVisibles = [];
    botones.forEach(function (x) {
      x.secciones.forEach(function (s) {
        seccionesVisibles.push({ rubro: s.rubro, nombre: s.nombre, descripcion: s.descripcion, buscar: s.buscar, etiqueta: x.b.etiqueta });
      });
    });
    var buscables = GENTE.filter(function (p) {
      return (p.foto || C.mostrarSinFoto || revisar) &&
        seccionesVisibles.some(function (s) { return p.rubros.indexOf(s.rubro) !== -1; });
    });
    var indice = B.armarIndice(buscables, seccionesVisibles);

    // La sección con la que se arma el mensaje de "Pedir a …": la que coincidió
    // con la búsqueda o, si coincidió por nombre o frase, su primer rubro visible.
    var seccionDe = function (p) {
      return seccionesVisibles.filter(function (s) { return p.rubros.indexOf(s.rubro) !== -1; })[0];
    };

    var buscando = false;
    var mostrar = function () {
      var escrito = campo.value.replace(/\s+/g, " ").trim();
      borrar.hidden = !campo.value;
      var r = escrito.length >= 2 ? B.buscar(indice, escrito) : null;
      if (!r || !r.terminos.length) {
        buscando = false;
        portada.classList.remove("buscando");
        resultados.classList.remove("open");
        resultados.innerHTML = "";
        return;
      }
      if (!buscando) {
        // Entra en modo búsqueda: se cierran los paneles de rubro y la página sube
        // hasta dejar el buscador arriba, con los resultados a la vista sobre el teclado.
        buscando = true;
        cerrarPaneles();
        actual = null;
        portada.classList.add("buscando");
        setTimeout(function () { document.getElementById("servicios").scrollIntoView({ block: "start" }); }, 50);
      }
      var corto = escrito.slice(0, 80);
      var pedido = linkWhatsApp("Hola Zeus! Estoy buscando: " + corto);
      var cuerpo;
      if (r.resultados.length) {
        cuerpo =
          "<h3>Profesionales para “" + texto(corto) + "”</h3>" +
          '<div class="providers-grid">' +
            r.resultados.map(function (e) { return tarjeta(e.persona, e.seccion || seccionDe(e.persona), e.porque); }).join("") +
          "</div>" +
          '<p class="otra">¿No es lo que buscabas? <a href="' + pedido + '" target="_blank" rel="noopener">Contanos por WhatsApp</a> qué necesitás.</p>';
      } else {
        cuerpo =
          "<h3>No encontramos a nadie para “" + texto(corto) + "”</h3>" +
          '<p class="rubro-desc">Contanos qué necesitás y buscamos a alguien.</p>' +
          '<a class="btn-primary" href="' + pedido + '" target="_blank" rel="noopener">' +
            '<svg class="ico-wa" aria-hidden="true"><use href="#d-wa"/></svg> Escribinos por WhatsApp</a>';
      }
      resultados.innerHTML = '<div class="adentro">' + cuerpo + "</div>";
      resultados.classList.add("open");
    };

    var espera = null;
    campo.addEventListener("input", function () {
      clearTimeout(espera);
      espera = setTimeout(mostrar, 120);
    });
    campo.addEventListener("focus", function () { bajarFotos(buscables); });
    campo.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { campo.value = ""; mostrar(); }
    });
    // "Buscar" en el teclado del celular: no recarga la página, solo esconde el teclado.
    document.getElementById("buscador").addEventListener("submit", function (e) {
      e.preventDefault();
      clearTimeout(espera);
      mostrar();
      campo.blur();
    });
    borrar.addEventListener("click", function () {
      campo.value = "";
      mostrar();
      campo.focus();
    });

    // somoszeus.com/?buscar=sillones abre la página con esa búsqueda hecha (para compartir un link).
    var pedida = /[?&]buscar=([^&]*)/.exec(window.location.search);
    if (pedida) {
      try { campo.value = decodeURIComponent(pedida[1].replace(/\+/g, " ")); } catch (e) { campo.value = ""; }
      bajarFotos(buscables);
      mostrar();
    }
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
