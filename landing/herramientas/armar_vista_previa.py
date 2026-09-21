# Arma una versión de un solo archivo de la página, para mandarla por
# WhatsApp o mail y revisarla antes de publicar.
# NO es lo que se publica: lo publicado es index.html con sus archivos.
# En la vista previa se ven todos los rubros (aunque no tengan gente) y
# los profesionales sin foto, para poder revisar el diseño completo.
#
# Uso: python herramientas/armar_vista_previa.py <archivo_de_salida.html>

import io
import os
import re
import sys

WEB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def leer(ruta):
    return io.open(os.path.join(WEB, ruta), encoding="utf-8").read()


html = leer("index.html")
titulo = re.search(r"<title>.*?</title>", html, re.S).group(0)
estilo = re.search(r"<style>.*?</style>", html, re.S).group(0)
fuentes = "\n".join(re.findall(r'<link rel="(?:preconnect|stylesheet)"[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>', html))
cuerpo = html[html.index("<body>") + len("<body>"):html.index("</body>")]
cuerpo = re.sub(r'\s*<script src="[^"]+"></script>', "", cuerpo)

scripts = "\n".join([
    "window.ZEUS_REVISAR = true;",
    leer("datos/config.js"), leer("datos/rubros.js"), leer("datos/profesionales.js"), leer("app.js"),
])

aviso = (
    '<div style="position:fixed;left:0;right:0;bottom:0;z-index:200;background:#FFF4D6;color:#5A4300;'
    'font:600 13px/1.4 system-ui,sans-serif;padding:8px 16px;text-align:center">'
    'Vista previa. Se muestran todos los rubros aunque no tengan gente, y las iniciales en lugar de las fotos.</div>'
)

salida = f"""{titulo}
{fuentes}
{estilo}
<style>nav {{ padding-top: env(safe-area-inset-top, 0px); }}</style>
{cuerpo}
{aviso}
<script>
{scripts}
</script>
"""

io.open(sys.argv[1], "w", encoding="utf-8").write(salida)
print("vista previa:", sys.argv[1], f"({len(salida) // 1024} KB)")
