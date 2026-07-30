# Zeus ⚡ — Web App

Aplicación web de **Zeus**: servicios para el hogar en Buenos Aires, fáciles, simples y seguros.

Este repositorio contiene la parte web del producto. El bot de WhatsApp y la operación Wizard of Oz viven en [`zeus-app-ar/Zeus-app`](https://github.com/zeus-app-ar/Zeus-app).

## Estructura

```
web-app/
├── landing/                  → página pública (HTML/CSS/JS estático, sin build)
│   ├── index.html            → estructura de la página
│   ├── css/styles.css        → estilos
│   └── js/
│       ├── servicios.js      → SOLO datos: categorías y proveedores
│       └── app.js            → lógica: genera las tarjetas, links de WhatsApp
└── .github/workflows/
    └── deploy.yml            → publica landing/ en GitHub Pages en cada push a main
```

A futuro acá también van a vivir el backend y el frontend de la app (en carpetas propias, por ejemplo `backend/` y `frontend/`).

## La landing está publicada en

**https://zeus-app-ar.github.io/web-app/**

Cada push a `main` la actualiza automáticamente (tarda ~1 minuto, se puede seguir en la pestaña *Actions*).

## Cómo editar la landing

- **Agregar/sacar proveedores o categorías** → editar solo `landing/js/servicios.js` (las instrucciones están comentadas dentro del archivo y en `landing/README.md`).
- **Cambiar el número de WhatsApp** → constante `WHATSAPP_NUMERO` al inicio de `landing/js/app.js` (⚠️ todavía tiene un placeholder).
- **Estilos** → `landing/css/styles.css`, comentado por sección.

Para verla en local basta abrir `landing/index.html` en el navegador — no hay que instalar nada.

## Flujo de trabajo

1. Crear una rama: `git switch -c feature-nombre-descriptivo`
2. Hacer los cambios y commitear
3. `git push -u origin feature-nombre-descriptivo`
4. Abrir un Pull Request y que otro hermano lo revise antes de mergear a `main`
