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
// nombre: cómo se nombra el rubro en el mensaje de WhatsApp de "Pedir a …".
// buscar: palabras con las que la gente suele pedir ese rubro, para el buscador
//         de la portada ("canilla" trae plomeros). Van sueltas, separadas por
//         espacios; no importan tildes, mayúsculas ni plurales. No se muestran:
//         solo sirven para encontrar. Si alguien busca algo y no aparece el
//         rubro que debería, se agrega la palabra acá. Solo lo que hace
//         CUALQUIERA del rubro: lo que hacen algunos (planchar, destapar con
//         máquina, limpiar vidrios) sale de la ficha de cada uno en Airtable.

window.ZEUS_BARRA = [
  { id: "plomero", etiqueta: "Plomero", icono: "🔧",
    secciones: [{ rubro: "plomero", titulo: "Plomeros disponibles", nombre: "Plomero",
                  buscar: "plomería canilla grifería caño cañería pérdida gotea agua inodoro mochila baño bacha desagüe tapado destapar destapación cloaca ducha bidet termotanque flexible sifón" }] },

  // Enchufe y no rayo: el ⚡ es el logo de Zeus.
  { id: "electricista", etiqueta: "Electricista", icono: "🔌",
    secciones: [{ rubro: "electricista", titulo: "Electricistas disponibles", nombre: "Electricista",
                  buscar: "electricidad eléctrico eléctrica luz luces enchufe toma tomacorriente tablero térmica disyuntor cable cableado lámpara luminaria aplique interruptor tecla cortocircuito ventilador" }] },

  { id: "gasista", etiqueta: "Gasista", icono: "🔥",
    secciones: [{ rubro: "gasista", titulo: "Gasistas disponibles", nombre: "Gasista",
                  buscar: "gas estufa calefón calefactor caldera termotanque hornalla anafe pérdida" }] },

  { id: "cerrajero", etiqueta: "Cerrajero", icono: "🔑",
    secciones: [{ rubro: "cerrajero", titulo: "Cerrajeros disponibles", nombre: "Cerrajero",
                  buscar: "cerrajería cerradura llave puerta abrir apertura trabada candado" }] },

  { id: "electrodomesticos", etiqueta: "Electrodom.", icono: "🖥️",
    secciones: [{ rubro: "tecnico_electrodomesticos", titulo: "Técnicos en electrodomésticos disponibles",
                  subtitulo: "— heladeras, lavarropas, microondas, TV (no aire acondicionado)", nombre: "Técnico electrodom.",
                  buscar: "electrodoméstico heladera freezer lavarropas secarropas lavavajillas microondas horno tele televisor tv" }] },

  { id: "limpieza", etiqueta: "Limpieza", icono: "🧹",
    secciones: [
      { rubro: "limpieza_profesional", titulo: "Limpieza Profesional", subtitulo: "— equipos, post-obra, oficinas, sillones, alfombras y tapizados",
        icono: "🧹", nombre: "Limpieza Profesional",
        buscar: "limpiar profunda post-obra obra oficina empresa sillón sofá alfombra tapizado colchón" },
      { rubro: "limpieza_particular", titulo: "Limpieza Particular", subtitulo: "— por horas o jornada, una persona",
        icono: "🏠", nombre: "Limpieza Particular",
        buscar: "limpiar empleada doméstica casa hogar departamento horas jornada" },
    ] },

  // Se muestra como "Handyman" (06/10/2026, igual que en Instagram). La clave
  // sigue siendo "arreglatodo": es la del bot y la de Airtable, no se cambia.
  { id: "arreglatodo", etiqueta: "Handyman", icono: "🛠️",
    secciones: [{ rubro: "arreglatodo", titulo: "Handyman disponibles", nombre: "Handyman",
                  descripcion: "Para los arreglos chicos de la casa: colgar cuadros o estantes, ajustar una puerta, cambiar una cortina.",
                  buscar: "arreglatodo arreglo arreglar reparar mantenimiento espejo repisa barral soporte bisagra picaporte" }] },

  { id: "pintor", etiqueta: "Pintor", icono: "svg:rodillo",
    secciones: [{ rubro: "pintor", titulo: "Pintores disponibles", nombre: "Pintor",
                  buscar: "pintura pintar pared techo cielorraso látex enduido yeso barniz esmalte" }] },

  { id: "muebles", etiqueta: "Armado de muebles", icono: "svg:armario",
    secciones: [{ rubro: "armado_muebles", titulo: "Armadores de muebles disponibles", nombre: "Armado de muebles",
                  descripcion: "Arman los muebles que vienen en caja (placares, camas, escritorios) y desarman los tuyos si te mudás.",
                  buscar: "armar armado desarmar placard ropero mesa cómoda biblioteca rack estantería" }] },

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
                  subtitulo: "— instalación, service y reparación de AC", nombre: "Aire acond.",
                  buscar: "aire acondicionado split multisplit frigorías inverter condensadora climatización" }] },

  { id: "plagas", etiqueta: "Plagas", icono: "🐜",
    secciones: [{ rubro: "control_plagas", titulo: "Control de plagas", nombre: "Control de plagas",
                  buscar: "fumigación fumigar fumigador desinfección desinsectación desratización cucarachas hormigas ratas ratones roedores mosquitos insectos bichos" }] },
];
