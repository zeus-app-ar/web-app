# Zeus ⚡ — Diseño

La web y la futura app tienen que sentirse el mismo producto. Si la app usa otros colores, otra letra u otros nombres de rubro, está mal.

El estilo es claro y redondeado (octubre 2026, inspirado en clickie.com.ar): fondo casi blanco, texto casi negro, el rojo de Zeus solo como acento, botones píldora, tarjetas blancas con borde finito y esquinas muy redondeadas, mucho aire entre secciones. Todo lo que cambia de color o de lugar al tocarlo lo hace suave (0,15 s).

## Colores

| Nombre | Valor | Para qué |
|---|---|---|
| Rojo Zeus | `#D62828` | Botones principales, el rayo del logo, rubro elegido, etiquetas de sección ("CÓMO FUNCIONA"), la caja final |
| Rojo oscuro | `#B91F1F` | Botones rojos al pasar el mouse |
| Rojo suave | `#FCEBEB` | Fondo del rubro elegido, de los números de los pasos, de los círculos de íconos y de la etiqueta "por qué apareció" en los resultados |
| Negro | `#111111` | "Pedir servicio" de la barra, "Pedir a …" de las tarjetas, globos del cliente en las charlas de ejemplo |
| Texto | `#1B1B1F` | Texto principal y títulos |
| Texto suave | `#5F5E66` | Texto secundario y la segunda mitad de los títulos |
| Fondo | `#FBF9F8` | Fondo de toda la página (blanco con un toque cálido) |
| Blanco | `#FFFFFF` | Tarjetas, la caja del buscador, los chips, las franjas "Por qué Zeus" y "¿Tenés un oficio?" |
| Gris | `#F4F1F0` | Paneles de profesionales, las charlas de ejemplo |
| Borde | `rgba(17,17,17,0.08)` | Bordes de tarjetas, chips, rubros y separadores |

Los valores viven en las variables al inicio del `<style>` de `index.html`. Cambiar el acento es cambiar `--rojo`, `--rojo-oscuro` y `--rojo-suave`.

## Letra

- **Montserrat** (Google Fonts) para todo: párrafos, botones, chips, tarjetas y el título de la portada. Pesos 500 (texto), 600 (botones) y 700 (etiquetas, "¿Qué necesitás?").
- **Ubuntu** en negrita (700) para los títulos de sección, los de las tarjetas, el nombre de cada profesional y el logo.
- Nada va en mayúsculas salvo las etiquetas chiquitas de sección ("CÓMO FUNCIONA", "O ELEGÍ EL RUBRO"), que llevan letra espaciada.
- Los títulos grandes van en dos tonos: la primera frase en texto, la segunda en texto suave ("Contanos qué necesitás. *Nosotros buscamos a alguien.*").

## Formas

| Pieza | Esquinas |
|---|---|
| Botones y chips | Píldora (`999px`) |
| Rubros | 18px |
| Tarjetas (profesionales, pasos) | 20–24px |
| Caja del buscador | 28px |
| Caja roja final | 32px |

Sombras suaves y apenas visibles; la caja del buscador y la caja roja llevan una sombra con tinte rojo.

## Íconos

- **Emojis** para los rubros: cada teléfono los muestra a su estilo y se ven "a mano".
- Dibujos propios **solo** donde no existe un emoji adecuado, con colores planos como un emoji: rodillo de pintar paredes (pintor) y armario (armado de muebles).
- Electricista usa 🔌: el rayo es el logo de Zeus y no se repite.
- **El rayo de Zeus es siempre el mismo dibujo y siempre rojo** (`#d-rayo` en `index.html`, igual al ícono de la pestaña). No se usa el emoji ⚡, que cada teléfono muestra amarillo y distinto.
- Los íconos de línea (flechas, "+", tilde, escudo, etiqueta de precio, globo de chat) son trazos simples de 2px, en rojo sobre un círculo rojo suave.
- El ícono de WhatsApp acompaña a los botones que abren el chat ("Escribinos por WhatsApp"), para que se sepa qué pasa al tocarlos.

## Piezas

| Pieza | Regla |
|---|---|
| Barra de arriba | Lo único fijo: logo y "Pedir servicio" (píldora negra). Es translúcida: la página se ve pasar detrás, desenfocada |
| Portada | Título con qué es y dónde ("… en Buenos Aires.") y, en rojo, la pregunta "¿Qué necesitás?". Debajo, la caja del buscador, los ejemplos, una línea con cómo funciona (WhatsApp, unos 30 minutos), los rubros y el botón de WhatsApp. La acción principal es pedir un servicio; "Quiero ser proveedor" va aparte, al final |
| Buscador | La caja grande blanca del centro de la portada. Flecha gris que se pone roja cuando hay algo escrito. Mientras hay algo escrito, los resultados ocupan el lugar de los rubros (así se ven sobre el teclado del celular); al borrar, vuelven los rubros. Si no encuentra a nadie, ofrece escribir por WhatsApp con lo buscado ya en el mensaje |
| Ejemplos (chips) | Píldoras blancas debajo del buscador con pedidos típicos ("Canilla que gotea"). Tocar una es como escribirla. La lista está en `datos/config.js`; solo se muestran las que hoy encuentran a alguien. En celular van en una fila que se desliza con el dedo |
| Rubros | Tarjetas blancas con emoji y nombre: 4 por fila en celular, una fila en pantalla grande. Tocar un rubro abre su panel justo debajo; tocarlo de nuevo lo cierra. El elegido queda con borde rojo y fondo rojo suave |
| Panel de rubro | Fondo gris, título "… disponibles"; en los rubros menos conocidos, una línea que lo explica |
| Tarjeta de profesional | Blanca, con borde. Foto redonda, nombre de pila + inicial, una línea verdadera (años de experiencia, zonas) y la píldora negra "Pedir a <nombre>", que abre el WhatsApp **de Zeus**. No dice "Contratar": Zeus conecta, no contrata. **Nunca** teléfono, apellido completo, barrio ni dirección. En los resultados del buscador suma una etiqueta roja suave con el motivo por el que apareció ("Limpieza de vidrios y ventanas", "Plomero") |
| Cómo funciona | Tres tarjetas numeradas, cada una con una charla de ejemplo por WhatsApp arriba (globo negro = cliente, globo blanco con el rayo = Zeus). Las charlas son ilustrativas: sin precios, sin nombres reales y sin prometer nada que la página no diga |
| Por qué Zeus | Título en dos tonos, una frase y tres puntos con ícono: conocemos a cada uno, precio aproximado por adelantado, escribinos si algo no salió bien |
| Preguntas frecuentes | Acordeón (`<details>`), con el "+" que gira al abrir. Las respuestas solo dicen lo que la página ya afirma en otro lado |
| Cierre | Caja roja redondeada dentro de la página, con el botón blanco de WhatsApp |
| Botones | Píldoras. Todo lo que se toca mide al menos 44px de alto. Al pasar el mouse suben 1px y oscurecen |
| "Quiero ser proveedor" | Sección propia al final ("¿Tenés un oficio?"), píldora con borde negro. Pregunta si es limpieza u otro oficio y lleva al formulario que corresponde |

## Rubros: una sola lista

Las claves de rubro (`plomero`, `gasista`, `arreglatodo`, …) son **las mismas** en el bot (`zeus-bot/servicios.py`), en esta web (`datos/rubros.js`) y en la app. El nombre que se muestra puede cambiar; la clave, nunca.

Un rubro solo se muestra si tiene al menos un profesional activo.

## Cómo se escribe

- Español rioplatense, con voseo. Cercano, corto y simple. Como le explicarías a un vecino.
- Zeus conecta: no es el que hace el trabajo. Nada de "nuestros técnicos", "garantizado", "lo arreglamos".
- Nada de perfiles, fotos, cantidades de trabajos ni reseñas inventadas. Solo se afirma lo que hoy pasa de verdad. Esto vale también para las preguntas frecuentes y las charlas de ejemplo.
- El precio siempre es aproximado: el real se sabe cuando el profesional ve el problema en la casa.
