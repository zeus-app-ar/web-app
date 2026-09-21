# Zeus ⚡ — Web App

La parte web de **Zeus**: servicios para el hogar en Buenos Aires.

El bot de WhatsApp y la operación viven en [`zeus-app-ar/Zeus-app`](https://github.com/zeus-app-ar/Zeus-app). Acá va todo lo que se ve en un navegador: hoy la página pública; más adelante, el backend y el frontend de la app (en carpetas propias, por ejemplo `backend/` y `frontend/`).

## Estructura

```
web-app/
├── landing/                  → página pública (HTML/CSS/JS, sin build). Ver landing/README.md
│   ├── index.html
│   ├── app.js
│   ├── datos/                → WhatsApp, formularios, rubros y profesionales
│   ├── fotos/                → fotos de los profesionales
│   ├── herramientas/         → actualizar profesionales desde Airtable, armar vista previa
│   └── DISENO.md             → colores, letras y reglas de escritura
└── .github/workflows/
    └── deploy.yml            → publica landing/ en GitHub Pages en cada push a main
```

## La página está publicada en

**https://zeus-app-ar.github.io/web-app/**

Cada push a `main` la actualiza sola (tarda ~1 minuto, se puede seguir en la pestaña *Actions*).

## Flujo de trabajo

1. Crear una rama: `git switch -c nombre-descriptivo`
2. Hacer los cambios y commitear
3. `git push -u origin nombre-descriptivo`
4. Abrir un Pull Request y que otro hermano lo revise antes de mergear a `main`
