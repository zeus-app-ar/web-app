# 🌐 Landing — página pública de Zeus

HTML/CSS/JS estático, sin build step. Diseño de la versión de Chiara + contenido actualizado de la versión de julio 2026 de Francisco (11 categorías, limpieza Profesional/Particular, pago retenido, Google Form de proveedores, Términos y condiciones).

## Estructura

```
landing/
├── index.html        → estructura de la página (nav, hero, secciones, footer)
├── css/
│   └── styles.css    → todos los estilos, con comentarios por sección
└── js/
    ├── servicios.js  → SOLO datos: categorías y proveedores
    └── app.js        → lógica: genera la grilla de servicios, las tarjetas
                        y completa los links de WhatsApp
```

## Cómo editar lo más común

- **Agregar / cambiar un proveedor o una categoría** → editar `js/servicios.js`. Nada más. Los botones y las tarjetas se generan solos.
- **Cambiar el número de WhatsApp** → editar `WHATSAPP_NUMERO` al inicio de `js/app.js` (está una única vez).
- **Cambiar textos del hero, pasos, "¿Por qué Zeus?"** → editar `index.html`.
- **Cambiar colores** → editar las variables al inicio de `css/styles.css` (`--red`, `--black`, etc.).

## Cómo verla en local

```bash
# Desde la raíz del repo
cd landing
python -m http.server 8080
# Abrir http://localhost:8080/
```

También funciona con doble click en `index.html`, pero mejor usar el server local.

## Cómo probar en celular

Estando la PC y el celular en la misma red Wi-Fi:

```bash
# Levantar el server
cd landing
python -m http.server 8080

# Averiguar la IP local de la PC
ipconfig                 # Windows → "Dirección IPv4", ej: 192.168.0.15
ipconfig getifaddr en0   # Mac

# En el celular, abrir:
# http://192.168.0.15:8080/
```

## Pendientes

- Reemplazar el número de WhatsApp placeholder (`5491100000000`) por el real.
- Reemplazar las fotos de Unsplash por fotos reales de proveedores (idealmente en `assets/`).
- Rediseño visual (menos "plantilla de AI") — próxima etapa.
- Ver más mejoras en [`../docs/mejoras-propuestas.md`](../docs/mejoras-propuestas.md).
