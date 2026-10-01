# Zeus ⚡ — Diseño

La web y la futura app tienen que sentirse el mismo producto. Si la app usa otros colores, otra letra u otros nombres de rubro, está mal.

## Colores

| Nombre | Valor | Para qué |
|---|---|---|
| Rojo Zeus | `#D62828` | Botones principales, el rayo del logo, rubro elegido, números de los pasos, banda final |
| Negro | `#111111` | Barra de arriba, portada, pie |
| Gris | `#F5F5F5` | Fondo de paneles y de "Por qué Zeus" |
| Gris medio | `#E0E0E0` | Bordes |
| Texto | `#222222` | Texto principal |
| Texto suave | `#666666` | Texto secundario |

## Letra

- **Abril Fatface** (Google Fonts) para el logo y los títulos grandes, en mayúscula. Tiene un solo grosor: no pedirle negrita.
- **La letra del sistema** (la que trae cada teléfono) para todo el resto: párrafos, botones, tarjetas.

## Íconos

- **Emojis**: cada teléfono los muestra a su estilo y se ven "a mano".
- Dibujos propios **solo** donde no existe un emoji adecuado, con colores planos como un emoji: rodillo de pintar paredes (pintor) y armario (armado de muebles).
- Electricista usa 🔌: el rayo es el logo de Zeus y no se repite.
- **El rayo de Zeus es siempre el mismo dibujo y siempre rojo** (`#d-rayo` en `index.html`, igual al ícono de la pestaña). No se usa el emoji ⚡, que cada teléfono muestra amarillo y distinto.
- El ícono de WhatsApp acompaña a los botones que abren el chat ("Escribinos por WhatsApp"), para que se sepa qué pasa al tocarlos.

## Piezas

| Pieza | Regla |
|---|---|
| Barra de arriba | Lo único fijo: logo y "Pedir servicio". Nada más queda pegado a la pantalla |
| Portada | Título con qué es y dónde ("… en Buenos Aires"), los rubros y el botón de WhatsApp. La acción principal es pedir un servicio; "Quiero ser proveedor" va aparte, al final |
| Rubros | En la portada, bajo "¿Qué necesitás?": 4 por fila en celular, una fila en pantalla grande. Tocar un rubro abre su panel justo debajo; tocarlo de nuevo lo cierra |
| Panel de rubro | Título "… disponibles"; en los rubros menos conocidos, una línea que lo explica |
| Tarjeta de profesional | Foto redonda, nombre de pila + inicial, una línea verdadera (años de experiencia, zonas) y el botón negro "Pedir a <nombre>", que abre el WhatsApp **de Zeus**. No dice "Contratar": Zeus conecta, no contrata. **Nunca** teléfono, apellido completo, barrio ni dirección |
| Botones | Todo lo que se toca mide al menos 44px de alto |
| "Quiero ser proveedor" | Sección propia al final ("¿Tenés un oficio?"). Pregunta si es limpieza u otro oficio y lleva al formulario que corresponde |

## Rubros: una sola lista

Las claves de rubro (`plomero`, `gasista`, `arreglatodo`, …) son **las mismas** en el bot (`zeus-bot/servicios.py`), en esta web (`datos/rubros.js`) y en la app. El nombre que se muestra puede cambiar; la clave, nunca.

Un rubro solo se muestra si tiene al menos un profesional activo.

## Cómo se escribe

- Español rioplatense, con voseo. Cercano, corto y simple. Como le explicarías a un vecino.
- Zeus conecta: no es el que hace el trabajo. Nada de "nuestros técnicos", "garantizado", "lo arreglamos".
- Nada de perfiles, fotos, cantidades de trabajos ni reseñas inventadas. Solo se afirma lo que hoy pasa de verdad.
- El precio siempre es aproximado: el real se sabe cuando el profesional ve el problema en la casa.
