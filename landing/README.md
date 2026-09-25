# Landing — la página pública de Zeus ⚡

HTML, CSS y JavaScript sin servidor ni build. Se publica sola en GitHub Pages con cada push a `main` (ver `.github/workflows/deploy.yml`).

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `index.html` | La página, con sus estilos adentro |
| `app.js` | Arma la barra de servicios y los paneles, conecta WhatsApp y "Quiero ser proveedor" |
| `datos/config.js` | **Lo que más se cambia**: número de WhatsApp y links de los formularios |
| `datos/rubros.js` | La barra de servicios: rubros, íconos, títulos y frases. Mismas claves que el bot |
| `datos/profesionales.js` | **Generado.** Lo reescribe entero la Action diaria desde Airtable — editarlo a mano no sirve, se pisa a la noche. Para cambiar quién aparece se edita Airtable |
| `fotos/` | **Generado.** Se bajan solas del campo "Foto" de Airtable. Una foto subida a mano solo sobrevive si esa persona no tiene foto en Airtable |
| `herramientas/actualizar_profesionales.py` | Regenera `datos/profesionales.js` desde Airtable |
| `herramientas/nombres_web.json` | Correcciones a mano de cómo figura alguien |
| `herramientas/armar_vista_previa.py` | Junta todo en un solo `.html` para mandarlo y revisarlo antes de publicar |
| `DISENO.md` | Colores, letras y reglas de escritura, para que la app use lo mismo |

## Cambiar lo más común

- **WhatsApp o formularios** → `datos/config.js`.
- **Sumar, sacar o renombrar un rubro** → `datos/rubros.js`. Un rubro solo aparece si tiene al menos un profesional activo.
- **Textos de la portada, "Cómo funciona" y "Por qué Zeus"** → `index.html`.
- **Colores** → las variables al inicio del `<style>` en `index.html`.

## Actualizar los profesionales

Cuando alguien se suma, se da de baja o cambia de rubro en Airtable:

```bash
cd landing
python herramientas/actualizar_profesionales.py
```

Lee la clave de Airtable del `.env` del bot (`../../Zeus-app/zeus-bot/.env`, o la ruta que se pase con `--bot`). **La clave nunca entra a este repo** y la página nunca se conecta a Airtable: si lo hiciera, cualquiera podría ver la clave y leer o borrar toda la base.

Aparecen los prestadores `Activo` + `Disponible`. Lo acordado es mostrar solo a quienes tienen foto en `fotos/`; mientras se bajan las fotos, `mostrarSinFoto` en `datos/config.js` está en `true` y se muestra la inicial.

## Revisar el diseño completo

Agregando `?revisar` a la dirección se muestran también los rubros sin profesionales. Es solo para revisar; el público no lo ve.

## Probar en la compu

```bash
cd landing
python -m http.server 8080
```

y abrir `http://localhost:8080`. Para probar en el celular (misma red Wi-Fi): `ipconfig getifaddr en0` en Mac o `ipconfig` en Windows da la IP de la compu, y en el celular se abre `http://<esa IP>:8080`.

## Pendientes

- **Fotos de los profesionales**: bajarlas de Drive a `fotos/` y volver `mostrarSinFoto` a `false`.
- **Mudanza**: fuera de la página hasta que Fletes y Ayudante de mudanza existan por separado en el formulario de alta y en Airtable. Las frases ya están escritas y comentadas en `datos/rubros.js`.
- **Formularios**: hoy exigen iniciar sesión con Google.
- **Dominio propio**.
- **Imagen para compartir** (`og:image`): hoy no hay, así que WhatsApp e Instagram muestran solo el título.
