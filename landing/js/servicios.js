/* ============================================================
   Zeus ⚡ — Catálogo de servicios y proveedores
   Este archivo es SOLO datos: para agregar, sacar o editar
   una categoría o un proveedor se toca únicamente acá.

   Cada categoría tiene:
   - etiqueta:  texto del botón en la grilla de servicios
   - icono:     emoji del botón
   - grupos:    grupos de proveedores del panel. Casi todas las
                categorías tienen UN grupo; Limpieza tiene dos
                (Profesional y Particular).

   Cada grupo tiene:
   - nombre:  título del grupo en el panel ("Proveedores
              disponibles: <nombre>") y cómo se nombra el rubro
              en el mensaje de WhatsApp.
   - sub:     aclaración chica debajo del título (opcional)
   - items:   proveedores: nombre, desc, pedidos, estrellas
              (1 a 5) y foto.

   El orden de las categorías acá define el orden de los
   botones en la grilla.
   ============================================================ */

const SERVICIOS = {
  plomero: {
    etiqueta: "Plomero",
    icono: "🔧",
    grupos: [{
      nombre: "Plomeros",
      items: [
        { nombre: "Carlos R.", desc: "Especialista en cañerías, pérdidas y destapaciones. 10 años de experiencia en Palermo.", pedidos: 87, estrellas: 5, foto: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80" },
        { nombre: "Martín G.", desc: "Instalaciones sanitarias y reparaciones urgentes. Disponible fines de semana.", pedidos: 54, estrellas: 5, foto: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
        { nombre: "Diego P.", desc: "Termotanques, calefones y plomería general. Presupuesto sin cargo.", pedidos: 41, estrellas: 4, foto: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80" },
        { nombre: "Facundo L.", desc: "Destapaciones de urgencia 24hs. Equipamiento profesional.", pedidos: 33, estrellas: 5, foto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
        { nombre: "Roberto M.", desc: "Reparación de pérdidas y conexiones de gas (habilitado ENARGAS).", pedidos: 29, estrellas: 4, foto: "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?w=400&q=80" }
      ]
    }]
  },

  electricista: {
    etiqueta: "Electricista",
    icono: "⚡",
    grupos: [{
      nombre: "Electricistas",
      items: [
        { nombre: "Sebastián K.", desc: "Instalaciones eléctricas residenciales, tableros y cableado estructurado.", pedidos: 112, estrellas: 5, foto: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80" },
        { nombre: "Pablo T.", desc: "Reparaciones eléctricas y colocación de luces. Trabajo prolijo y garantizado.", pedidos: 76, estrellas: 5, foto: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80" },
        { nombre: "Fernando A.", desc: "Especialista en domótica, automatización y Smart Home. Habilitado.", pedidos: 58, estrellas: 5, foto: "https://images.unsplash.com/photo-1609205807103-4c9b6e38b5f5?w=400&q=80" },
        { nombre: "Gustavo N.", desc: "Instalación de aires split, luces y enchufes. Rapidez garantizada.", pedidos: 45, estrellas: 4, foto: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=400&q=80" },
        { nombre: "Leandro V.", desc: "Mantenimiento eléctrico preventivo para departamentos y casas.", pedidos: 38, estrellas: 4, foto: "https://images.unsplash.com/photo-1575318634028-6a0cfcb60c59?w=400&q=80" }
      ]
    }]
  },

  gasista: {
    etiqueta: "Gasista",
    icono: "🔥",
    grupos: [{
      nombre: "Gasistas",
      items: [
        { nombre: "Jorge B.", desc: "Matriculado ENARGAS. Instalaciones, habilitaciones y reparaciones de gas.", pedidos: 94, estrellas: 5, foto: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80" },
        { nombre: "Alberto F.", desc: "Revisión de instalaciones y libre deuda de gas. Experiencia 15 años.", pedidos: 67, estrellas: 5, foto: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
        { nombre: "Néstor C.", desc: "Conexión de estufas, calefones y cocinas. Certificados vigentes.", pedidos: 51, estrellas: 4, foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
        { nombre: "Ricardo H.", desc: "Urgencias de gas 24hs. Detección de pérdidas con equipamiento.", pedidos: 43, estrellas: 5, foto: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&q=80" },
        { nombre: "Marcelo S.", desc: "Plomería y gas integral. Habilitado para CABA y GBA.", pedidos: 29, estrellas: 4, foto: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80" }
      ]
    }]
  },

  cerrajero: {
    etiqueta: "Cerrajero",
    icono: "🔑",
    grupos: [{
      nombre: "Cerrajeros",
      items: [
        { nombre: "Hugo D.", desc: "Apertura de puertas 24hs, cambio de cerraduras y duplicado de llaves.", pedidos: 143, estrellas: 5, foto: "https://images.unsplash.com/photo-1558618047-f4c2c815c5b1?w=400&q=80" },
        { nombre: "Mario E.", desc: "Cerrajería de seguridad. Cajas fuertes y rejas. Rápido y confiable.", pedidos: 89, estrellas: 5, foto: "https://images.unsplash.com/photo-1590650046871-92c887180603?w=400&q=80" },
        { nombre: "Raúl P.", desc: "Especialista en portones automáticos y sistemas de acceso.", pedidos: 62, estrellas: 4, foto: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80" },
        { nombre: "Hernán G.", desc: "Cerrajería automotriz y residencial. Cobertura zona Palermo y Belgrano.", pedidos: 44, estrellas: 4, foto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" },
        { nombre: "Walter O.", desc: "Cambio de bombines y colocación de cerraduras de alta seguridad.", pedidos: 31, estrellas: 5, foto: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80" }
      ]
    }]
  },

  tecnico: {
    etiqueta: "Técnico electrodomésticos",
    icono: "📺",
    grupos: [{
      nombre: "Técnicos de electrodomésticos",
      sub: "Heladeras, lavarropas, microondas, TV — el aire acondicionado tiene su propia categoría",
      items: [
        { nombre: "Eduardo M.", desc: "Reparación de heladeras, lavarropas y lavavajillas. Todas las marcas.", pedidos: 97, estrellas: 5, foto: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&q=80" },
        { nombre: "Claudio R.", desc: "Técnico Samsung y LG certificado. Línea blanca y electrodomésticos.", pedidos: 74, estrellas: 5, foto: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80" },
        { nombre: "Nicolás V.", desc: "Microondas, hornos y pequeños electrodomésticos. Garantía de 30 días.", pedidos: 55, estrellas: 4, foto: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80" },
        { nombre: "Ariel S.", desc: "Cocinas, anafes y campanas. Instalación y reparación.", pedidos: 48, estrellas: 5, foto: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80" },
        { nombre: "Lucas F.", desc: "Reparación de TVs y equipos de sonido. Visita a domicilio sin costo.", pedidos: 36, estrellas: 4, foto: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" }
      ]
    }]
  },

  limpieza: {
    etiqueta: "Limpieza",
    icono: "🧹",
    grupos: [
      {
        nombre: "Limpieza Profesional",
        sub: "Equipos, post-obra, oficinas y eventos",
        items: [
          { nombre: "María G.", desc: "Limpieza profunda de departamentos. Equipo de 2-3 personas. Por jornada.", pedidos: 91, estrellas: 5, foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
          { nombre: "Claudia N.", desc: "Post-obra y mudanza. Limpieza de vidrios y exteriores incluidos.", pedidos: 56, estrellas: 5, foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
          { nombre: "Sandra L.", desc: "Limpieza de oficinas y comercios. Turnos nocturnos disponibles.", pedidos: 44, estrellas: 4, foto: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80" }
        ]
      },
      {
        nombre: "Limpieza Particular",
        sub: "Por horas o jornada, una persona",
        items: [
          { nombre: "Rosa F.", desc: "Servicio semanal o quincenal. Trae sus propios productos.", pedidos: 38, estrellas: 5, foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
          { nombre: "Patricia O.", desc: "Cocinas y baños a fondo. Por horas. Muy detallista.", pedidos: 29, estrellas: 4, foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" },
          { nombre: "Sofía D.", desc: "Limpieza diaria y planchado incluido. Trabaja por jornada.", pedidos: 22, estrellas: 5, foto: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=400&q=80" }
        ]
      }
    ]
  },

  handyman: {
    etiqueta: "Arreglatodo",
    icono: "🪛",
    grupos: [{
      nombre: "Arreglatodo / Handyman",
      items: [
        { nombre: "Matías B.", desc: "El hombre para todo: colocación de muebles, pintura, reparaciones generales.", pedidos: 134, estrellas: 5, foto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
        { nombre: "Damián F.", desc: "Pintura, masilla, reparaciones de mampostería y colocación de cortinas.", pedidos: 91, estrellas: 5, foto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80" },
        { nombre: "Ezequiel P.", desc: "Reformas parciales, colocación de piso y azulejos. Presupuesto gratis.", pedidos: 73, estrellas: 4, foto: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
        { nombre: "Tomás A.", desc: "Todo lo que necesite tu depto: desde colgar cuadros hasta renovar el baño.", pedidos: 58, estrellas: 5, foto: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80" },
        { nombre: "Iván C.", desc: "Mantenimiento edilicio preventivo para consorcios y propietarios.", pedidos: 45, estrellas: 4, foto: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80" }
      ]
    }]
  },

  pintor: {
    etiqueta: "Pintor",
    icono: "🎨",
    grupos: [{
      nombre: "Pintores",
      items: [
        { nombre: "Roberto S.", desc: "Interior y exterior. Departamentos completos en pocos días.", pedidos: 72, estrellas: 5, foto: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80" },
        { nombre: "Daniel G.", desc: "Pintura decorativa, técnicas especiales y empapelado.", pedidos: 34, estrellas: 4, foto: "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?w=400&q=80" },
        { nombre: "Javier M.", desc: "Yeso, enduído y pintura. Trabajos completos llave en mano.", pedidos: 51, estrellas: 5, foto: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80" },
        { nombre: "Hernán F.", desc: "Fachadas y exteriores. Equipo de altura propio.", pedidos: 28, estrellas: 4, foto: "https://images.unsplash.com/photo-1516822669470-7f8c1a92be1e?w=400&q=80" },
        { nombre: "Ricardo P.", desc: "Departamentos chicos en 1-2 días. Presupuesto sin cargo.", pedidos: 19, estrellas: 5, foto: "https://images.unsplash.com/photo-1613963931023-5dc59437c8a6?w=400&q=80" }
      ]
    }]
  },

  muebles: {
    etiqueta: "Armado de muebles",
    icono: "🪑",
    grupos: [{
      nombre: "Armado de muebles",
      items: [
        { nombre: "Rodrigo M.", desc: "Armado de IKEA, Easy y cualquier marca. Rápido, prolijo y sin rayar el piso.", pedidos: 108, estrellas: 5, foto: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80" },
        { nombre: "Javier L.", desc: "Especialista en muebles de cocina, placares y dormitorios.", pedidos: 79, estrellas: 5, foto: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
        { nombre: "Santiago R.", desc: "Armado y desarmado para mudanzas. Disponible fines de semana.", pedidos: 61, estrellas: 4, foto: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80" },
        { nombre: "Andrés V.", desc: "Muebles de escritorio, estanterías y racks de TV. Trabajo garantizado.", pedidos: 44, estrellas: 5, foto: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80" },
        { nombre: "Christian P.", desc: "Armado profesional con herramientas propias. No deja sin terminar.", pedidos: 37, estrellas: 4, foto: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80" }
      ]
    }]
  },

  mudanza: {
    etiqueta: "Mudanza",
    icono: "📦",
    grupos: [{
      nombre: "Mudanza",
      items: [
        { nombre: "Equipo FlexMove", desc: "Equipo de 3 personas + flete. Mudanzas internas en Palermo y CABA.", pedidos: 62, estrellas: 5, foto: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
        { nombre: "Lucas & Pablo", desc: "Mudanza con embalaje incluido. Muebles grandes, cajas y electrónica.", pedidos: 48, estrellas: 5, foto: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
        { nombre: "Franco R.", desc: "Flete y ayudante para objetos voluminosos. Disponible 7 días.", pedidos: 41, estrellas: 4, foto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
        { nombre: "Gustavo C.", desc: "Servicio completo de mudanza: empaque, traslado y acomodado en destino.", pedidos: 35, estrellas: 4, foto: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80" },
        { nombre: "Diego & Hernán", desc: "Mudanza exprés para departamentos chicos. 2 personas en menos de 3 hs.", pedidos: 27, estrellas: 5, foto: "https://images.unsplash.com/photo-1513171920216-2640b288471b?w=400&q=80" }
      ]
    }]
  },

  aire: {
    etiqueta: "Aire acondicionado",
    icono: "❄️",
    grupos: [{
      nombre: "Aire acondicionado",
      sub: "Instalación, service y reparación de equipos de AC",
      items: [
        { nombre: "Héctor F.", desc: "Instalación y service de splits. Todas las marcas. Garantía incluida.", pedidos: 58, estrellas: 5, foto: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80" },
        { nombre: "Walter N.", desc: "Carga de gas y limpieza de filtros. Servicio preventivo anual.", pedidos: 43, estrellas: 5, foto: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80" },
        { nombre: "Oscar B.", desc: "Equipos de ventana y cassette. Reparación y sustitución.", pedidos: 31, estrellas: 4, foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
        { nombre: "Leandro C.", desc: "Instalaciones nuevas. Asesoramiento en elección de equipo.", pedidos: 22, estrellas: 5, foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
        { nombre: "Marcelo T.", desc: "Sistemas centrales y VRV. Proyectos comerciales y residenciales.", pedidos: 17, estrellas: 4, foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" }
      ]
    }]
  }
};
