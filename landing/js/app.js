/* ============================================================
   Zeus ⚡ — Lógica de la landing
   Necesita que js/servicios.js esté cargado antes (define la
   constante SERVICIOS).

   Qué hace:
   1. Completa los links de WhatsApp del HTML (los que tienen
      data-wa) usando un único número, definido abajo.
   2. Genera la grilla de categorías a partir de SERVICIOS.
   3. Al tocar una categoría muestra sus proveedores (Limpieza
      muestra sus dos grupos: Profesional y Particular).
   ============================================================ */

/* --- Configuración: cambiar el número SOLO acá --- */
const WHATSAPP_NUMERO = "5491100000000";

const MENSAJE_CONTRATAR = "Hola! Quiero contratar un servicio";

/** Arma un link de WhatsApp, con mensaje prellenado opcional. */
function linkWhatsApp(mensaje) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/* ------------------------------------------------------------
   1. Links de WhatsApp fijos del HTML (nav, hero, footer)
   ------------------------------------------------------------ */

function completarLinksWhatsApp() {
  document.querySelectorAll("[data-wa]").forEach(link => {
    const tipo = link.dataset.wa; // "contratar" o "simple"
    link.href = tipo === "contratar" ? linkWhatsApp(MENSAJE_CONTRATAR) : linkWhatsApp();
  });
}

/* ------------------------------------------------------------
   2. Grilla de categorías de servicio
   ------------------------------------------------------------ */

function generarBotonesServicios() {
  const grid = document.getElementById("servicios-grid");

  Object.entries(SERVICIOS).forEach(([clave, categoria]) => {
    const btn = document.createElement("button");
    btn.className = "servicio-btn";
    btn.type = "button";

    const icono = document.createElement("span");
    icono.className = "servicio-icon";
    icono.textContent = categoria.icono;

    const etiqueta = document.createElement("span");
    etiqueta.textContent = categoria.etiqueta;

    btn.append(icono, etiqueta);
    btn.addEventListener("click", () => mostrarProveedores(clave, btn));
    grid.appendChild(btn);
  });
}

/* ------------------------------------------------------------
   3. Tarjetas de proveedores de la categoría elegida
   ------------------------------------------------------------ */

function crearTarjetaProveedor(proveedor, nombreGrupo) {
  const estrellas = "★".repeat(proveedor.estrellas) + "☆".repeat(5 - proveedor.estrellas);
  const mensaje = `Hola! Quiero contratar a ${proveedor.nombre} ( ${nombreGrupo} )`;

  const card = document.createElement("div");
  card.className = "proveedor-card";
  card.innerHTML = `
    <img src="${proveedor.foto}" alt="${proveedor.nombre}" class="proveedor-foto" loading="lazy">
    <div class="proveedor-info">
      <div class="proveedor-nombre"></div>
      <div class="proveedor-desc"></div>
      <div class="proveedor-stats">
        <div class="proveedor-pedidos"><strong>${proveedor.pedidos}</strong> trabajos</div>
        <div class="stars">${estrellas}</div>
      </div>
      <a href="${linkWhatsApp(mensaje)}" target="_blank" rel="noopener" class="btn-contratar">💬 Contratar por WhatsApp</a>
    </div>
  `;

  // Nombre y descripción se asignan como texto plano (no como HTML)
  card.querySelector(".proveedor-nombre").textContent = proveedor.nombre;
  card.querySelector(".proveedor-desc").textContent = proveedor.desc;

  // Si la foto no carga, queda el fondo gris del CSS
  card.querySelector(".proveedor-foto").addEventListener("error", function () {
    this.removeAttribute("src");
  });

  return card;
}

function crearTituloGrupo(grupo) {
  const titulo = document.createElement("p");
  titulo.className = "proveedores-title";
  titulo.append("Proveedores disponibles: ");

  const nombre = document.createElement("span");
  nombre.textContent = grupo.nombre;
  titulo.appendChild(nombre);

  if (grupo.sub) {
    const sub = document.createElement("small");
    sub.className = "grupo-sub";
    sub.textContent = grupo.sub;
    titulo.appendChild(sub);
  }

  return titulo;
}

function mostrarProveedores(clave, btnActivo) {
  const categoria = SERVICIOS[clave];
  const seccion = document.getElementById("proveedores-section");

  // Marcar el botón activo
  document.querySelectorAll(".servicio-btn").forEach(b => b.classList.remove("active"));
  btnActivo.classList.add("active");

  // Rellenar el panel: un título + una grilla por grupo
  seccion.replaceChildren();
  categoria.grupos.forEach(grupo => {
    const grid = document.createElement("div");
    grid.className = "proveedores-grid";
    grupo.items.forEach(proveedor => {
      grid.appendChild(crearTarjetaProveedor(proveedor, grupo.nombre));
    });
    seccion.append(crearTituloGrupo(grupo), grid);
  });

  seccion.classList.add("visible");

  // Scroll suave hacia los proveedores
  setTimeout(() => {
    seccion.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

/* --- Inicio --- */

completarLinksWhatsApp();
generarBotonesServicios();
