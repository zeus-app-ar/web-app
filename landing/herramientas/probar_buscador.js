// ============================================
// Zeus ⚡ web — Pruebas del buscador
// ============================================
// Revisa que el buscador siga encontrando lo que tiene que encontrar (y no
// encuentre lo que no). Correrlo después de tocar buscador.js o las palabras
// "buscar" de datos/rubros.js:
//
//   cd landing
//   node herramientas/probar_buscador.js
//
// Usa los rubros de verdad (datos/rubros.js) y un grupo fijo de personas
// inventadas, para que el resultado no cambie cuando cambia la gente de Airtable.

"use strict";

var path = require("path");
global.window = {};
require(path.join(__dirname, "..", "datos", "rubros.js"));
var B = require(path.join(__dirname, "..", "buscador.js"));

var GENTE = [
  { id: "1", nombre: "Analia M.", rubros: ["limpieza_particular"],
    frase: "Limpieza de casas y oficinas, alfombras, tapizados y sillones. Trabaja por horas en zona norte.",
    detalles: ["Limpieza de casas y departamentos", "Limpieza de vidrios y ventanas", "Planchado"] },
  { id: "2", nombre: "Viviana H.", rubros: ["limpieza_particular"],
    frase: "Limpieza de oficinas. Trabaja en zona oeste de CABA.",
    detalles: ["Limpieza de oficinas"] },
  { id: "3", nombre: "Diego S.", rubros: ["armado_muebles", "electricista", "plomero"],
    frase: "5 años de experiencia en electricidad, instalaciones sanitarias y mantenimiento.",
    detalles: ["Tableros eléctricos"] },
  { id: "4", nombre: "Roberto Q.", rubros: ["electricista", "gasista", "plomero"],
    frase: "Encargado de edificio con 25 años de oficio.",
    detalles: ["Mantenimiento y reparaciones de gas", "Gas natural"] },
  { id: "5", nombre: "Alan G.", rubros: ["arreglatodo", "pintor"],
    frase: "Pintura, durlock y mantenimiento de casas y edificios.",
    detalles: ["Pintura de interiores", "Pintura de exteriores"] },
  { id: "6", nombre: "Mario L.", rubros: ["armado_muebles"],
    frase: "Armado de muebles, con 10 años de experiencia.",
    detalles: ["Muebles de IKEA", "Anclaje de muebles a la pared"] },
  { id: "7", nombre: "Lucas M.", rubros: ["instalacion_aire"],
    frase: "Técnico en aire acondicionado.",
    detalles: ["Instalación de aire acondicionado", "Aire acondicionado: mini split"] },
  { id: "8", nombre: "Mauro P.", rubros: ["control_plagas"], frase: "Más de 30 años en control de plagas." },   // sin "detalles": tiene que andar igual
];

var secciones = [];
window.ZEUS_BARRA.forEach(function (b) {
  b.secciones.forEach(function (s) {
    secciones.push({ rubro: s.rubro, nombre: s.nombre, descripcion: s.descripcion, buscar: s.buscar, etiqueta: b.etiqueta });
  });
});
var indice = B.armarIndice(GENTE, secciones);

function nombres(consulta) {
  return B.buscar(indice, consulta).resultados.map(function (e) { return e.persona.nombre; });
}
function porque(consulta, nombre) {
  var e = B.buscar(indice, consulta).resultados.filter(function (x) { return x.persona.nombre === nombre; })[0];
  return e ? e.porque : undefined;
}

var fallas = 0, total = 0;
function igual(que, obtenido, esperado) {
  total++;
  var a = JSON.stringify(obtenido), b = JSON.stringify(esperado);
  if (a === b) return;
  fallas++;
  console.log("FALLA  " + que + "\n   esperado: " + b + "\n   obtenido: " + a);
}
// Mismas personas, sin importar el orden.
function mismos(consulta, esperados) {
  igual('"' + consulta + '"', nombres(consulta).sort(), esperados.slice().sort());
}

// --- El ejemplo que originó el buscador: algo puntual que está en la ficha ---
mismos("sillon", ["Analia M."]);
mismos("sillón", ["Analia M."]);
mismos("Sillones", ["Analia M."]);
mismos("SILLON", ["Analia M."]);

// --- Detalles de la ficha (lo que hace cada uno, no todo el rubro) ---
mismos("vidrios", ["Analia M."]);
mismos("limpieza de vidrios", ["Analia M."]);
mismos("planchar", ["Analia M."]);            // misma familia que "Planchado"; Viviana no plancha
mismos("ikea", ["Mario L."]);
mismos("tablero", ["Diego S.", "Roberto Q."]); // Diego por su ficha, Roberto por ser electricista
igual("tablero: primero quien lo tiene en la ficha", nombres("tablero")[0], "Diego S.");
igual("vidrios: dice por qué", porque("vidrios", "Analia M."), "Limpieza de vidrios y ventanas");

// --- Palabras del rubro (datos/rubros.js) ---
mismos("canilla", ["Diego S.", "Roberto Q."]);
mismos("pierde la canilla", ["Diego S.", "Roberto Q."]);
mismos("enchufe", ["Diego S.", "Roberto Q."]);
mismos("plomero", ["Diego S.", "Roberto Q."]);
mismos("plomería", ["Diego S.", "Roberto Q."]);
mismos("pintar", ["Alan G."]);
mismos("colgar un cuadro", ["Alan G."]);
mismos("cucarachas", ["Mauro P."]);
mismos("aire acondicionado", ["Lucas M."]);
mismos("limpiar", ["Analia M.", "Viviana H."]);
igual("canilla: dice el rubro", porque("canilla", "Diego S."), "Plomero");

// --- Nombres ---
mismos("ana", ["Analia M."]);                 // y no "anafe" (gasistas)
mismos("lucas", ["Lucas M."]);
igual("por nombre no hace falta explicar", porque("lucas", "Lucas M."), null);

// --- Lo que se ve en la frase ---
mismos("zona norte", ["Analia M."]);

// --- A medio escribir y con errores de tipeo ---
mismos("sill", ["Analia M."]);
mismos("electrisista", ["Diego S.", "Roberto Q."]);
mismos("plomerro", ["Diego S.", "Roberto Q."]);

// --- Varias palabras: quedan quienes coinciden con más ---
mismos("pintura exterior", ["Alan G."]);
mismos("mueble ikea", ["Mario L."]);

// --- Lo que NO tiene que encontrar ---
mismos("xyzxyz", []);
mismos("de la", []);                           // solo palabras vacías
mismos("", []);
mismos("si", []);                              // está en "…si te mudás", pero no dice nada
mismos("más", []);
mismos("m", []);                               // una letra suelta no es la inicial de un apellido
mismos("arreglar un piano m", ["Alan G."]);    // ...ni sumada a otras palabras
mismos("electrodoméstico", []);               // no hay técnicos: no tiene que traer electricistas
mismos("niños", []);
mismos("heladera", []);

// --- Rubros que la página no muestra no se buscan (acá, sin secciones) ---
igual("sin secciones visibles no hay rubros que buscar",
  B.buscar(B.armarIndice(GENTE, []), "plomero").resultados.length, 0);

console.log(fallas ? "\n" + fallas + " de " + total + " pruebas fallaron." : "Las " + total + " pruebas del buscador pasaron.");
process.exit(fallas ? 1 : 0);
