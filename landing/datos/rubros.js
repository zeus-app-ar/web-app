// ============================================
// Zeus ⚡ web — Barra de servicios
// ============================================
// Cada botón de la barra abre un panel con los profesionales de ese rubro.
// "rubro" usa las MISMAS claves que el bot (zeus-bot/servicios.py) y que va a
// usar la app. Un botón solo aparece si alguna de sus secciones tiene al
// menos un profesional activo (los oficios secundarios cuentan).
//
// icono: un emoji, o el nombre de un dibujo propio (svg) cuando no existe
//        un emoji adecuado (rodillo de pintar paredes, armario).
// descripcion: una línea que explica el rubro, debajo del título del panel.
//              Solo en los rubros menos conocidos.
// nombre: cómo se nombra el rubro en el mensaje de WhatsApp de "Contratar".

window.ZEUS_BARRA = [
  { id: "plomero", etiqueta: "Plomero", icono: "🔧",
    secciones: [{ rubro: "plomero", titulo: "Plomeros disponibles", nombre: "Plomero" }] },

  // Enchufe y no rayo: el ⚡ es el logo de Zeus.
  { id: "electricista", etiqueta: "Electricista", icono: "🔌",
    secciones: [{ rubro: "electricista", titulo: "Electricistas disponibles", nombre: "Electricista" }] },

  { id: "gasista", etiqueta: "Gasista", icono: "🔥",
    secciones: [{ rubro: "gasista", titulo: "Gasistas disponibles", nombre: "Gasista" }] },

  { id: "cerrajero", etiqueta: "Cerrajero", icono: "🔑",
    secciones: [{ rubro: "cerrajero", titulo: "Cerrajeros disponibles", nombre: "Cerrajero" }] },

  { id: "electrodomesticos", etiqueta: "Electrodom.", icono: "🖥️",
    secciones: [{ rubro: "tecnico_electrodomesticos", titulo: "Técnicos en electrodomésticos disponibles",
                  subtitulo: "— heladeras, lavarropas, microondas, TV (no aire acondicionado)", nombre: "Técnico electrodom." }] },

  { id: "limpieza", etiqueta: "Limpieza", icono: "🧹",
    secciones: [
      { rubro: "limpieza_profesional", titulo: "Limpieza Profesional", subtitulo: "— equipos, post-obra, oficinas, eventos",
        icono: "🧹", nombre: "Limpieza Profesional" },
      { rubro: "limpieza_particular", titulo: "Limpieza Particular", subtitulo: "— por horas o jornada, una persona",
        icono: "🏠", nombre: "Limpieza Particular" },
    ] },

  { id: "arreglatodo", etiqueta: "Arreglatodo", icono: "🛠️",
    secciones: [{ rubro: "arreglatodo", titulo: "Arreglatodos disponibles", nombre: "Arreglatodo",
                  descripcion: "Para los arreglos chicos de la casa: colgar cuadros o estantes, ajustar una puerta, cambiar una cortina." }] },

  { id: "pintor", etiqueta: "Pintor", icono: "svg:rodillo",
    secciones: [{ rubro: "pintor", titulo: "Pintores disponibles", nombre: "Pintor" }] },

  { id: "muebles", etiqueta: "Armado de muebles", icono: "svg:armario",
    secciones: [{ rubro: "armado_muebles", titulo: "Armadores de muebles disponibles", nombre: "Armado de muebles",
                  descripcion: "Arman los muebles que vienen en caja (placares, camas, escritorios) y desarman los tuyos si te mudás." }] },

  // MUDANZA: sacada de la página por decisión de Tomás (19/09/2026) hasta que
  // Fletes y Ayudante de mudanza existan como servicios separados en el
  // formulario de alta y en Airtable. Para volver a sumarla, reponer esto:
  //
  // { id: "mudanza", etiqueta: "Mudanza", icono: "📦",
  //   secciones: [
  //     { rubro: "fletes", titulo: "Fletes", icono: "🚚", nombre: "Flete",
  //       descripcion: "Pueden o no ayudarte a bajar o subir las cosas. Depende del servicio de cada uno." },
  //     { rubro: "ayudante_mudanza", titulo: "Ayudantes de mudanza", icono: "📦", nombre: "Ayudante de mudanza",
  //       descripcion: "Te dan una mano para cargar, bajar y acomodar tus cosas el día de la mudanza. No incluye el vehículo." },
  //   ] },

  { id: "aire", etiqueta: "Aire Acond.", icono: "❄️",
    secciones: [{ rubro: "instalacion_aire", titulo: "Técnicos en aire acondicionado disponibles",
                  subtitulo: "— instalación, service y reparación de AC", nombre: "Aire acond." }] },

  { id: "plagas", etiqueta: "Plagas", icono: "🐜",
    secciones: [{ rubro: "control_plagas", titulo: "Control de plagas", nombre: "Control de plagas" }] },
];
