// ============================================
// Zeus ⚡ web — Buscador (la lógica, sin pantalla)
// ============================================
// Dado lo que la persona escribe ("sillon", "pierde la canilla", "ana"),
// devuelve qué profesionales mostrar y por qué. Lo usa app.js, que se ocupa de
// dibujar el resultado. Corre entero en el navegador: no hay servidor.
//
// Dónde busca, de más a menos importante:
//   1. el nombre de la persona;
//   2. sus "detalles": lo puntual que hace ("Limpieza de vidrios y ventanas",
//      "Destapaciones"). Salen de Airtable, los arma actualizar_profesionales.py;
//   3. sus rubros: el nombre del rubro y las palabras de "buscar" en
//      datos/rubros.js ("canilla" trae plomeros, "enchufe" trae electricistas);
//   4. la frase que se ve en su tarjeta.
//
// Cómo compara palabras: sin mayúsculas ni tildes ("sillón" = "sillon"), sin la
// "s" del final ("vidrios" = "vidrio"), acepta la palabra a medio escribir
// ("sill"), reconoce palabras de la misma familia ("planchar" / "planchado") y
// perdona un error de tipeo en palabras largas ("electrisista").
//
// Para cambiar qué encuentra NO hace falta tocar este archivo:
//   - palabras de un rubro  → "buscar" en datos/rubros.js
//   - lo que hace alguien   → su ficha en Airtable (aparece al día siguiente)
//
// Se prueba con: node herramientas/probar_buscador.js

(function (global) {
  "use strict";

  // Palabras que no dicen qué se busca: se ignoran en lo que escribe la persona
  // y en los textos donde se busca (si no, "si" encontraría "…si te mudás").
  var VACIAS = (
    "a al algo alguien busco cada como con cuando de del donde el en es esta este hace hacen hay " +
    "la las le les lo los mas me mi mis muy necesito no nos o para por que quiero se si sin solo " +
    "son su sus tambien te tengo tu tus un una unas unos y ya"
  ).split(" ");

  // Importancia de cada lugar donde aparece una palabra.
  var PESO = { nombre: 3, detalle: 3, rubro: 2, frase: 1 };

  // "Sillón" -> "sillon". Sin mayúsculas ni tildes.
  function limpiar(texto) {
    return String(texto == null ? "" : texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // "vidrios" -> "vidrio". Solo saca la "s" final: con eso y con comparar por
  // comienzo de palabra alcanza para singular y plural ("sillones" / "sillon").
  function raiz(palabra) {
    return palabra.length > 3 && palabra.charAt(palabra.length - 1) === "s" ? palabra.slice(0, -1) : palabra;
  }

  // Parte un texto en palabras, sin las vacías ni las letras sueltas (una "b"
  // sola coincidiría con la inicial de "Sergio B.").
  function partir(texto) {
    return limpiar(texto).split(/[^a-z0-9]+/).filter(function (p) {
      return p.length >= 2 && VACIAS.indexOf(p) === -1;
    });
  }

  // "Limpieza de vidrios" -> ["limpieza", "vidrio"]
  function palabras(texto) {
    return partir(texto).map(raiz);
  }

  // Lo que escribió la persona, sin repetidos.
  function terminos(consulta) {
    var vistos = {};
    return palabras(consulta).filter(function (p) {
      if (vistos[p]) return false;
      vistos[p] = true;
      return true;
    });
  }

  // Cuántas letras hay que cambiar para pasar de una palabra a la otra (hasta "tope").
  function diferencia(a, b, tope) {
    if (Math.abs(a.length - b.length) > tope) return tope + 1;
    var fila = [], i, j;
    for (j = 0; j <= b.length; j++) fila[j] = j;
    for (i = 1; i <= a.length; i++) {
      var anterior = fila[0], minimo;
      fila[0] = i;
      minimo = fila[0];
      for (j = 1; j <= b.length; j++) {
        var guardado = fila[j];
        fila[j] = Math.min(fila[j] + 1, fila[j - 1] + 1, anterior + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        anterior = guardado;
        if (fila[j] < minimo) minimo = fila[j];
      }
      if (minimo > tope) return tope + 1;
    }
    return fila[b.length];
  }

  // Cuántas letras iguales tienen al principio.
  function comienzoComun(a, b) {
    var n = 0;
    while (n < a.length && n < b.length && a.charAt(n) === b.charAt(n)) n++;
    return n;
  }

  // Qué tan bien coincide lo buscado con una palabra de la ficha: de 0 (nada) a 1 (igual).
  // "desde": cuántas letras hacen falta para aceptar una palabra a medio escribir.
  function parecido(buscada, palabra, desde) {
    if (buscada === palabra) return 1;
    // Palabra a medio escribir: "sill" encuentra "sillon".
    if (buscada.length >= (desde || 4) && palabra.indexOf(buscada) === 0) return 0.9;
    // La ficha tiene la palabra más corta: "sillone" (de "sillones") encuentra "sillon".
    if (palabra.length >= 3 && buscada.indexOf(palabra) === 0 && buscada.length - palabra.length <= 2) return 0.85;
    // Misma familia: "planchar" / "planchado", "instalar" / "instalación". Tienen que
    // compartir el comienzo: 6 letras o más, y casi toda la palabra más corta
    // (así "electrodoméstico" no trae electricistas).
    var comun = comienzoComun(buscada, palabra);
    if (comun >= 6 && comun >= 0.75 * Math.min(buscada.length, palabra.length)) return 0.6;
    // Un error de tipeo en palabras largas (dos, si son muy largas).
    var tope = buscada.length >= 9 ? 2 : buscada.length >= 5 ? 1 : 0;
    if (tope && palabra.length >= 5 && diferencia(buscada, palabra, tope) <= tope) return 0.5;
    return 0;
  }

  function mejorParecido(buscada, lista, desde) {
    var mejor = 0;
    for (var i = 0; i < lista.length && mejor < 1; i++) {
      var v = parecido(buscada, lista[i], desde);
      if (v > mejor) mejor = v;
    }
    return mejor;
  }

  // Prepara una vez la lista de dónde buscar.
  //   gente:     las personas que la página puede mostrar
  //   secciones: las secciones de rubro visibles (de datos/rubros.js)
  function armarIndice(gente, secciones) {
    return gente.map(function (p) {
      var campos = [{ tipo: "nombre", palabras: palabras(p.nombre) }];
      (p.detalles || []).forEach(function (d) {
        campos.push({ tipo: "detalle", texto: d, palabras: palabras(d) });
      });
      secciones.forEach(function (s) {
        if (p.rubros.indexOf(s.rubro) === -1) return;
        campos.push({
          tipo: "rubro", seccion: s, texto: s.nombre,
          palabras: palabras([s.etiqueta, s.nombre, s.descripcion, s.buscar].filter(Boolean).join(" ")),
        });
      });
      if (p.frase) campos.push({ tipo: "frase", palabras: palabras(p.frase) });
      return { persona: p, campos: campos };
    });
  }

  // Devuelve { terminos, resultados }. Cada resultado: { persona, puntaje, porque, seccion }.
  //   porque:  el detalle o el rubro que explica por qué aparece (o null si fue por nombre o frase)
  //   seccion: el rubro por el que coincidió, si coincidió por rubro
  // Si se buscan varias palabras, quedan quienes coinciden con más de ellas.
  function buscar(indice, consulta) {
    var ts = terminos(consulta);
    if (!ts.length) return { terminos: ts, resultados: [] };

    var encontrados = [];
    indice.forEach(function (ficha, orden) {
      var cubiertos = 0, puntaje = 0;
      var porCampo = ficha.campos.map(function () { return 0; });
      ts.forEach(function (t) {
        var mejor = 0;
        ficha.campos.forEach(function (c, i) {
          // En un nombre alcanzan 3 letras ("ana" encuentra a Analia); en el resto hacen
          // falta 4, para que esas mismas 3 letras no traigan también "anafe".
          var v = PESO[c.tipo] * mejorParecido(t, c.palabras, c.tipo === "nombre" ? 3 : 4);
          if (v > 0) porCampo[i] += v;
          if (v > mejor) mejor = v;
        });
        if (mejor > 0) { cubiertos++; puntaje += mejor; }
      });
      if (!cubiertos) return;

      // El campo que mejor explica la coincidencia: primero un detalle, después un rubro.
      var porque = null, seccion = null, mejorDetalle = 0, mejorRubro = 0;
      ficha.campos.forEach(function (c, i) {
        if (c.tipo === "detalle" && porCampo[i] > mejorDetalle) { mejorDetalle = porCampo[i]; porque = c.texto; }
      });
      ficha.campos.forEach(function (c, i) {
        if (c.tipo === "rubro" && porCampo[i] > mejorRubro) {
          mejorRubro = porCampo[i];
          seccion = c.seccion;
          if (!mejorDetalle) porque = c.texto;
        }
      });
      encontrados.push({ persona: ficha.persona, puntaje: puntaje, cubiertos: cubiertos, porque: porque, seccion: seccion, orden: orden });
    });

    var maximo = encontrados.reduce(function (m, e) { return Math.max(m, e.cubiertos); }, 0);
    var resultados = encontrados
      .filter(function (e) { return e.cubiertos === maximo; })
      .sort(function (a, b) { return b.puntaje - a.puntaje || a.orden - b.orden; });
    return { terminos: ts, resultados: resultados };
  }

  var api = { limpiar: limpiar, palabras: palabras, terminos: terminos, parecido: parecido, armarIndice: armarIndice, buscar: buscar };
  if (typeof module !== "undefined" && module.exports) module.exports = api;   // para probarlo con node
  else global.ZEUS_BUSCADOR = api;
})(typeof window !== "undefined" ? window : this);
