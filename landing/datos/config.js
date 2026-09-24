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
