# Landing — la página pública de Zeus ⚡

HTML, CSS y JavaScript sin servidor ni build. Se publica sola en GitHub Pages con cada push a `main` (ver `.github/workflows/deploy.yml`).

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `index.html` | La página, con sus estilos adentro |
| `app.js` | Arma los rubros de la portada, la red de fotos y el número de profesionales, los paneles, el buscador, la ficha de cada profesional (con sus reseñas), la barra de WhatsApp del celular y "Quiero ser proveedor" |
| `buscador.js` | Decide qué profesionales aparecen cuando alguien escribe en el buscador, y por qué. Ver "El buscador" más abajo |
| `datos/config.js` | **Lo que más se cambia**: número de WhatsApp, links de los formularios, los ejemplos que se ven debajo del buscador, a partir de cuántos profesionales se dice el número en la portada y a partir de cuántas reseñas se ve el puntaje |
| `datos/rubros.js` | Los rubros de la portada: íconos, títulos, frases y las palabras con las que el buscador encuentra cada rubro. Mismas claves que el bot |
| `datos/profesionales.js` | **Generado.** Lo reescribe entero la Action diaria desde Airtable — editarlo a mano no sirve, se pisa a la noche. Para cambiar quién aparece, lo que hace cada uno o qué reseñas se publican, se edita Airtable |
| `fotos/` | **Generado.** Se bajan solas del campo "Foto" de Airtable. Una foto subida a mano solo sobrevive si esa persona no tiene foto en Airtable |
| `herramientas/actualizar_profesionales.py` | Regenera `datos/profesionales.js` desde Airtable |
| `herramientas/nombres_web.json` | Correcciones a mano de cómo figura alguien |
| `herramientas/armar_vista_previa.py` | Junta todo en un solo `.html` para mandarlo y revisarlo antes de publicar |
| `herramientas/og.html` | El origen de `og.png`, la imagen que se ve al compartir el link por WhatsApp o redes. Adentro dice cómo regenerarla |
| `herramientas/probar_buscador.js` | Pruebas del buscador. Corren solas en cada Pull Request que toca `landing/` |
| `herramientas/probar_resenas_web.py` | Pruebas de cómo se arman las reseñas para la página (qué cuenta, qué se publica, con qué nombre). Corren en el mismo Pull Request |
| `DISENO.md` | Colores, letras y reglas de escritura, para que la app use lo mismo |

## Cambiar lo más común

- **WhatsApp o formularios** → `datos/config.js`.
- **Los ejemplos debajo del buscador** ("Canilla que gotea", …) → `ejemplos` en `datos/config.js`. Un ejemplo solo se muestra si hoy encuentra a alguien; las pruebas del buscador avisan si alguno está escrito con palabras que no se entienden.
- **Sumar, sacar o renombrar un rubro** → `datos/rubros.js`. Un rubro solo aparece si tiene al menos un profesional activo.
- **Que el buscador encuentre algo que hoy no encuentra** → ver "El buscador", acá abajo.
- **Textos de la portada, "Cómo funciona", "Por qué Zeus" y las preguntas frecuentes** → `index.html`.
- **Colores, letras y formas** → las variables al inicio del `<style>` en `index.html`. Qué significa cada una y por qué: `DISENO.md`.

## El buscador

Es la caja grande del centro de la portada, con ejemplos para tocar debajo. Mientras hay algo escrito, los resultados reemplazan a los rubros; al borrar, vuelven. No hay servidor: busca en el navegador, entre las mismas personas que la página ya muestra.

Busca en cuatro lugares, de más a menos importante:

1. **El nombre** de la persona.
2. **Sus detalles**: lo puntual que hace ("Limpieza de vidrios y ventanas", "Destapaciones", "Muebles de IKEA"). Salen de las casillas y opciones que marcó en el formulario de alta, o sea de su ficha en Airtable.
3. **Sus rubros**: el nombre del rubro y las palabras de `buscar` en `datos/rubros.js` ("canilla" trae plomeros, "enchufe" trae electricistas).
4. **La frase** que se ve en su tarjeta.

No importan mayúsculas, tildes ni plurales ("sillon", "Sillón" y "sillones" dan lo mismo), acepta la palabra a medio escribir y perdona un error de tipeo en palabras largas. En cada resultado se ve por qué apareció la persona (el detalle o el rubro). Si no hay resultados, ofrece escribir por WhatsApp con lo buscado ya cargado en el mensaje.

`somoszeus.com/?buscar=sillones` abre la página con esa búsqueda hecha, por si sirve para compartir un link.

**Alguien busca algo y no aparece quien debería. ¿Dónde se arregla?**

| Caso | Dónde |
|---|---|
| Lo hace cualquiera del rubro ("canilla", "enchufe") | Agregar la palabra a `buscar` de ese rubro, en `datos/rubros.js` |
| Lo hacen algunos ("vidrios", "planchado", "sillones") | En Airtable, en la ficha de cada persona (tabla "Prestadores de Servicios"): tildar la casilla o elegir la opción. Aparece al día siguiente |
| Es un campo de Airtable que la página todavía no usa | Agregar un renglón a `DETALLES` en `herramientas/actualizar_profesionales.py` (ahí mismo está explicado cómo) |

Dos límites puestos a propósito:

- **No se usa el texto libre** que la persona escribió en el formulario ("Contanos sobre vos"): suele traer teléfonos, redes, barrios y nombres de empresa, y la página es pública.
- **No se publican "Cuida niños", "Hace mandados o compras" ni "Experiencia con mascotas"**, aunque estén en la ficha: hoy Zeus no ofrece esos servicios.

Después de tocar `buscador.js` o las palabras de `datos/rubros.js`:

```bash
cd landing
node herramientas/probar_buscador.js
```

Las mismas pruebas corren solas en cada Pull Request (`.github/workflows/probar-buscador.yml`).

## Las reseñas y la ficha de cada profesional

Tocar la foto o el nombre de un profesional (o su puntaje) abre su **ficha**: rubros, la frase, qué hace y sus reseñas. `somoszeus.com/?p=<id>` (el id de Airtable, el mismo del archivo de la foto) abre la ficha directo: mientras está abierta la dirección del navegador ya lleva ese `?p=`, así que alcanza con copiarla para compartirla.

Las reseñas salen de la tabla **Reseñas** de Airtable y las baja la misma Action de todas las noches. Las carga sola el bot cuando un cliente opina por WhatsApp (ver el repo `Zeus-app`, `resenas.py`). Reglas:

| Qué | Regla |
|---|---|
| Puntaje y cantidad en la tarjeta ("4,7⚡ /5⚡ · 3 reseñas", con el rayo de Zeus en vez de estrellas) | Promedio de **todas** las reseñas de clientes del profesional con puntaje (`Origen = Cliente`), publicadas o no. Así no es "el promedio de las buenas". Se muestran a partir de `resenasDesde` reseñas (`datos/config.js`; hoy 1) |
| Qué reseñas se leen en la ficha | Solo las que tienen **"Visible al público"** tildado en Airtable. Eso lo tilda una persona, nunca el bot |
| Qué texto se ve | **"Texto público"**: el recorte que revisó el equipo. Nunca el comentario crudo (puede tener nombres de otras personas, teléfonos o insultos). Sin "Texto público", la reseña se ve solo con su puntaje |
| Con qué nombre | **Sin nombre**: todas salen como "Cliente de Zeus" (decisión de Chiara, 15/10/2026; así no hay que pedirle permiso a nadie, y los T&C ya cubren que se publican). Si algún día se quiere el nombre de pila: `PUBLICAR_NOMBRE = True` en `actualizar_profesionales.py` lo muestra solo con "Permiso para publicar" = Sí, y hay que prender `PUBLICAR_CON_NOMBRE` en el bot para que lo pregunte |
| Fecha | Solo el mes ("ago 2026"), nunca el día |
| Reseñas del equipo o de familiares | `Origen = Equipo Zeus`: no cuentan ni se publican |

Para publicar una reseña: en Airtable, tabla Reseñas, revisar "Texto público" (que no identifique al cliente: nada de direcciones, nombres de familiares ni detalles muy puntuales) y tildar "Visible al público". Aparece a la noche; para verla ya, correr la Action "Actualizar profesionales".

## Actualizar los profesionales

Cuando alguien se suma, se da de baja o cambia de rubro en Airtable:

```bash
cd landing
python herramientas/actualizar_profesionales.py
```

Lee la clave de Airtable del `.env` del bot (`../../Zeus-app/zeus-bot/.env`, o la ruta que se pase con `--bot`). **La clave nunca entra a este repo** y la página nunca se conecta a Airtable: si lo hiciera, cualquiera podría ver la clave y leer o borrar toda la base.

Aparecen los prestadores `Activo` + `Disponible`. Se muestra solo a quienes tienen foto en `fotos/` (`mostrarSinFoto: false` en `datos/config.js`).

## Revisar el diseño completo

Agregando `?revisar` a la dirección se muestran también los rubros sin profesionales. Es solo para revisar; el público no lo ve.

## Probar en la compu

```bash
cd landing
python -m http.server 8080
```

y abrir `http://localhost:8080`. Para probar en el celular (misma red Wi-Fi): `ipconfig getifaddr en0` en Mac o `ipconfig` en Windows da la IP de la compu, y en el celular se abre `http://<esa IP>:8080`.

## Pendientes

- **Mudanza**: fuera de la página hasta que Fletes y Ayudante de mudanza existan por separado en el formulario de alta y en Airtable. Las frases ya están escritas y comentadas en `datos/rubros.js`.
- **Formularios**: hoy exigen iniciar sesión con Google.
- **Frases de quienes están en más de un rubro** (`herramientas/frases_web.json`): no arrancar con un oficio, porque la misma frase se ve en todos sus rubros.
