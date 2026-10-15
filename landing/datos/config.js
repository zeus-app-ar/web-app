// ============================================
// Zeus ⚡ web — Configuración general
// ============================================
// Lo que más probablemente haya que cambiar vive acá, en un solo lugar.

window.ZEUS_CONFIG = {
  // Número al que abre el botón de WhatsApp: código de país + 9 + área + número, sin "+" ni espacios.
  // Es el número de Zeus (el mismo que atiende el bot).
  whatsapp: "5491173027044",

  // Mensaje que aparece escrito cuando el cliente toca un botón general.
  mensajeGeneral: "Hola Zeus! Quiero contratar un servicio.",

  // Ejemplos que se ven debajo del buscador de la portada. Tocar uno es como
  // escribirlo. Conviene que sean cosas que la gente pide de verdad, con las
  // palabras que usa ("canilla", no "grifería"). Un ejemplo solo se muestra si
  // hoy encuentra a alguien; si no, se esconde solo.
  ejemplos: ["Canilla que gotea", "Saltó la térmica", "Limpieza por horas", "Colgar un estante", "Pintar una pared"],

  // En la portada, al lado de la pila de fotos, se dice cuántos profesionales hay
  // en la red SOLO a partir de este número (decisión de Chiara, 14/10/2026: con
  // pocos, el número juega en contra). Hasta llegar, se ven las fotos sin número.
  // Se enciende solo el día que la red llega a esta cantidad.
  cantidadDesde: 30,

  // Reseñas: en la tarjeta de cada profesional se ven las estrellas (promedio
  // sobre TODAS sus reseñas de clientes, no solo las publicadas) y cuántas son,
  // a partir de esta cantidad de reseñas. 1 = desde la primera. Las reseñas
  // publicadas (con "Visible al público" tildado en Airtable) se leen en la
  // ficha de la persona, que se abre tocando su foto o su nombre.
  resenasDesde: 1,

  // Links PÚBLICOS de los formularios de alta (los que terminan en /viewform, nunca los de /edit).
  formularios: {
    oficios: "https://docs.google.com/forms/d/e/1FAIpQLSctsV77KvJDRsZw6yMwxKK2JXgPJA2XVT912YEHgWZIuGcDnA/viewform",
    limpieza: "https://docs.google.com/forms/d/e/1FAIpQLSeLZ9w5MRKeou-eSMgSrD2pxvfRRK683w8dQhoZce94Nr0Rug/viewform",
  },

  // Hoy los dos formularios exigen iniciar sesión con Google. Mientras sea así,
  // se le avisa a la persona antes de mandarla. Pasar a false cuando se cambie
  // en la configuración de cada formulario.
  formulariosPidenGoogle: true,

  // Profesionales sin foto: false = solo aparecen quienes tienen foto en fotos/
  // (lo acordado). Las fotos las baja sola la GitHub Action desde Airtable.
  mostrarSinFoto: false,
};
