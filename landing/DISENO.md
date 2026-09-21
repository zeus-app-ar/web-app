# Zeus ⚡ — Diseño

La web y la futura app tienen que sentirse el mismo producto. Si la app usa otros colores, otra letra u otros nombres de rubro, está mal.

## Colores

| Nombre | Valor | Para qué |
|---|---|---|
| Rojo Zeus | `#D62828` | Botones principales, números de los pasos, banda final |
| Negro | `#111111` | Barra de arriba, portada, pie |
| Gris | `#F5F5F5` | Fondo de paneles y de "Por qué Zeus" |
| Gris medio | `#E0E0E0` | Bordes |
| Texto | `#222222` | Texto principal |
| Texto suave | `#666666` | Texto secundario |
| Verde WhatsApp | `#25D366` | Solo el botón "Contratar" de cada profesional |

## Letra

- **Abril Fatface** (Google Fonts) para el logo y los títulos grandes, en mayúscula. Tiene un solo grosor: no pedirle negrita.
- **La letra del sistema** (la que trae cada teléfono) para todo el resto: párrafos, botones, tarjetas.

## Íconos

- **Emojis**: cada teléfono los muestra a su estilo y se ven "a mano".
- Dibujos propios **solo** donde no existe un emoji adecuado, con colores planos como un emoji: rodillo de pintar paredes (pintor) y armario (armado de muebles).
- Electricista usa 🔌: el ⚡ es el logo de Zeus y no se repite.

## Piezas

| Pieza | Regla |
|---|---|
| Barra de servicios | Fija arriba. Tocar un rubro abre su panel; tocarlo de nuevo lo cierra |
| Panel de rubro | Título "… disponibles"; en los rubros menos conocidos, una línea que lo explica |
| Tarjeta de profesional | Foto redonda, nombre de pila + inicial, una línea verdadera (años de experiencia, zonas) y "Contratar" por WhatsApp. **Nunca** teléfono, apellido completo, barrio ni dirección |
| "Quiero ser proveedor" | Pregunta si es limpieza u otro oficio y lleva al formulario que corresponde |

## Rubros: una sola lista

Las claves de rubro (`plomero`, `gasista`, `arreglatodo`, …) son **las mismas** en el bot (`zeus-bot/servicios.py`), en esta web (`datos/rubros.js`) y en la app. El nombre que se muestra puede cambiar; la clave, nunca.

Un rubro solo se muestra si tiene al menos un profesional activo.

## Cómo se escribe

- Español rioplatense, con voseo. Cercano, corto y simple. Como le explicarías a un vecino.
- Zeus conecta: no es el que hace el trabajo. Nada de "nuestros técnicos", "garantizado", "lo arreglamos".
- Nada de perfiles, fotos, cantidades de trabajos ni reseñas inventadas. Solo se afirma lo que hoy pasa de verdad.
- El precio siempre es aproximado: el real se sabe cuando el profesional ve el problema en la casa.
