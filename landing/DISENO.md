# Zeus ⚡ — Diseño

La web y la futura app tienen que sentirse el mismo producto. Si la app usa otros colores, otra letra u otros nombres de rubro, está mal.

El estilo (octubre 2026) es claro, cálido y directo: papel casi blanco, tinta casi negra, el rojo de Zeus solo como acento, botones píldora y mucho aire. Lo que más identifica a Zeus en la página son dos cosas que ninguna competencia tiene: **la gente de verdad** (las fotos de los profesionales en la portada, con el número real de cuántos hay) y **el rayo**, que aparece grande detrás de la red y en la banda del cierre. Nada de mascotas ni ilustraciones: Zeus muestra lo que hay. Todo lo que cambia de color al tocarlo lo hace suave (0,15 s).

## Colores

| Nombre | Valor | Para qué |
|---|---|---|
| Rojo Zeus | `#D62828` | Botones principales, el rayo, el rubro elegido, los números de los pasos, la flecha del buscador con algo escrito, la etiqueta "por qué apareció" en los resultados |
| Rojo oscuro | `#B51F1F` | Botones rojos al pasar el mouse |
| Rojo suave | `#FBE9E8` | Fondo del rubro elegido y de las etiquetas |
| Tinta | `#17161A` | Texto, títulos, "Pedir servicio", "Pedir a …", globos del cliente en la charla de ejemplo |
| Tormenta | `#1C1B21` | La banda oscura del cierre |
| Texto suave | `#6B6770` | Texto secundario |
| Papel | `#FBFAF7` | Fondo de toda la página |
| Arena | `#F1ECE4` | Superficies: chips, círculos de los rubros, paneles de profesionales, la franja "Por qué Zeus", globos de Zeus en la charla |
| Blanco | `#FFFFFF` | La caja del buscador, tarjetas de profesionales, el teléfono de ejemplo |
| Borde | `rgba(23,22,26,0.10)` | Bordes y separadores |

Los valores viven en las variables al inicio del `<style>` de `index.html`. Cambiar el acento es cambiar `--rojo`, `--rojo-oscuro` y `--rojo-suave`.

## Letra

- **Bricolage Grotesque** (Google Fonts) en negrita (700/800) para los títulos, los números de los pasos, el nombre de cada profesional y el logo. Es la letra con carácter: ancha, redonda, un poco "a mano".
- **Figtree** (Google Fonts) para todo lo demás: párrafos, botones, chips, etiquetas. Pesos 400 (texto), 500 (chips, buscador), 600 (botones).
- Nada va en mayúsculas. Nada de etiquetas chiquitas arriba de los títulos ni de una palabra en otro color en el medio de un título: el título se lee solo.
- Las líneas de texto no pasan de unos 70 caracteres (los párrafos tienen `max-width`).

## Formas

| Pieza | Esquinas |
|---|---|
| Botones, chips y la caja del buscador | Píldora (`999px`) |
| Círculos de los rubros, fotos | Círculo |
| Tarjetas de profesionales, opciones de la ventana | 16px |
| El teléfono de ejemplo | 36px |

Sombras: casi ninguna. Solo la caja del buscador, las fotos de la red y el teléfono de ejemplo llevan una, suave.

## Íconos

- **Emojis** para los rubros: cada teléfono los muestra a su estilo y se ven "a mano".
- Dibujos propios **solo** donde no existe un emoji adecuado, con colores planos como un emoji: rodillo de pintar paredes (pintor) y armario (armado de muebles).
- Electricista usa 🔌: el rayo es el logo de Zeus y no se repite.
- **El rayo de Zeus es siempre el mismo dibujo y siempre rojo** (`#d-rayo` en `index.html`, igual al ícono de la pestaña). No se usa el emoji ⚡, que cada teléfono muestra amarillo y distinto.
- Los únicos íconos de línea son la flecha del buscador y la flecha de las preguntas: trazos simples de 2px.
- El ícono de WhatsApp acompaña a los botones que abren el chat ("Escribinos por WhatsApp"), para que se sepa qué pasa al tocarlos.

## Piezas

| Pieza | Regla |
|---|---|
| Barra de arriba | Lo único fijo: logo y "Pedir servicio" (píldora de tinta). Es translúcida: la página se ve pasar detrás, desenfocada |
| Portada | En pantalla grande, dos columnas: a la izquierda el título (qué es y dónde: "… en Buenos Aires."), una línea que explica (WhatsApp, unos 30 minutos), el buscador, los ejemplos y la pila de fotos con el número real de profesionales; a la derecha, la red. Debajo, a todo el ancho, los rubros y el botón de WhatsApp. En el celular, una sola columna y la red se ve solo como la pila de fotos |
| La red | Hasta seis fotos de verdad alrededor del rayo, con tres etiquetas de oficio. Las elige `app.js`: una persona por rubro, en el orden de la barra. Si hay menos de tres personas con foto, no se muestra. Nunca se inventan caras |
| Buscador | Píldora blanca con la flecha a la derecha; la flecha se pone roja cuando hay algo escrito. Mientras hay algo escrito, los resultados ocupan el lugar de los rubros (así se ven sobre el teclado del celular); al borrar, vuelven. Si no encuentra a nadie, ofrece escribir por WhatsApp con lo buscado ya en el mensaje |
| Ejemplos (chips) | Píldoras color arena debajo del buscador con pedidos típicos ("Canilla que gotea"). Tocar una es como escribirla. La lista está en `datos/config.js`; solo se muestran las que hoy encuentran a alguien. En celular van en una fila que se desliza con el dedo |
| Rubros | Emoji en un círculo color arena y el nombre debajo, sin tarjeta: 4 por fila en celular, una fila en pantalla grande. Tocar un rubro abre su panel justo debajo; tocarlo de nuevo lo cierra. El elegido queda con aro rojo y nombre en rojo |
| Panel de rubro | Fondo arena, título "… disponibles"; en los rubros menos conocidos, una línea que lo explica |
| Tarjeta de profesional | Blanca, con borde. Foto redonda, nombre de pila + inicial, una línea verdadera (años de experiencia, zonas) y la píldora de tinta "Pedir a <nombre>", que abre el WhatsApp **de Zeus**. No dice "Contratar": Zeus conecta, no contrata. **Nunca** teléfono, apellido completo, barrio ni dirección. En los resultados del buscador suma una etiqueta roja suave con el motivo por el que apareció |
| Cómo funciona | A la izquierda, un teléfono con una charla de ejemplo (globo de tinta = cliente, globo arena = Zeus); a la derecha, los tres pasos con el número grande en rojo. La charla es ilustrativa: sin precios, sin nombres reales, sin prometer nada que la página no diga |
| Por qué Zeus | Franja arena. Un título que dice el problema, una frase y tres puntos con una raya roja arriba: conocemos a cada uno, precio aproximado antes de que vayan, escribinos si algo no salió bien |
| Preguntas frecuentes | Acordeón (`<details>`), con una flecha roja que gira al abrir. Las respuestas solo dicen lo que la página ya afirma en otro lado |
| Cierre | Banda oscura (tormenta) a todo el ancho con el rayo rojo grande a la derecha y el botón blanco de WhatsApp |
| Barra de WhatsApp (celular) | Cuando la portada ya pasó, una barra fija abajo con "Escribinos por WhatsApp". No existe en pantalla grande |
| Botones | Píldoras. Todo lo que se toca mide al menos 44px de alto. Al pasar el mouse solo cambian de color; nada se mueve ni se agranda |
| "Quiero ser proveedor" | Sección propia al final ("¿Tenés un oficio?"), píldora con borde. Pregunta si es limpieza u otro oficio y lleva al formulario que corresponde |

## Rubros: una sola lista

Las claves de rubro (`plomero`, `gasista`, `arreglatodo`, …) son **las mismas** en el bot (`zeus-bot/servicios.py`), en esta web (`datos/rubros.js`) y en la app. El nombre que se muestra puede cambiar; la clave, nunca.

Un rubro solo se muestra si tiene al menos un profesional activo.

## Cómo se escribe

- Español rioplatense, con voseo. Cercano, corto y simple. Como le explicarías a un vecino.
- Zeus conecta: no es el que hace el trabajo. Nada de "nuestros técnicos", "garantizado", "lo arreglamos".
- Nada de perfiles, fotos, cantidades de trabajos ni reseñas inventadas. Solo se afirma lo que hoy pasa de verdad. Esto vale también para las preguntas frecuentes y las charlas de ejemplo.
- El precio siempre es aproximado: el real se sabe cuando el profesional ve el problema en la casa.
