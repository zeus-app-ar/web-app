# ============================================
# Zeus ⚡ web — Actualizar los profesionales que muestra la página
# ============================================
# Lee de Airtable los prestadores ACTIVOS y DISPONIBLES y escribe
# datos/profesionales.js con lo mínimo que la página necesita:
#   nombre de pila + inicial del apellido, rubros, años de experiencia, zonas
#   generales (Norte, Centro...), lo puntual que hace (para el buscador) y la
#   foto (si está en fotos/).
#
# NUNCA saca teléfono, DNI, email, barrios ni direcciones. La página es pública.
# La clave de Airtable se lee del .env del bot y NO se copia a este repo:
# la página no se conecta a Airtable (si lo hiciera, la clave quedaría a la
# vista de cualquiera y con ella se puede leer y borrar toda la base).
#
# Uso (desde la carpeta landing/ de web-app):
#   python herramientas/actualizar_profesionales.py
#   python herramientas/actualizar_profesionales.py --bot "/ruta/a/Zeus-app/zeus-bot"
#
# Por defecto busca el bot en ../../Zeus-app/zeus-bot (web-app y Zeus-app
# clonados uno al lado del otro).
#
# Los nombres que se muestran salen de herramientas/nombres_web.json si la
# persona está ahí (para corregir a mano casos raros); si no, se arman solos.
#
# DESCRIPCIONES: la frase debajo del nombre sale de herramientas/frases_web.json,
# escrita a mano a partir de lo que la persona contó en el formulario (corta,
# sin teléfonos, redes, nombres de empresa ni promesas). Se busca por el
# record_id de su alta en "Onboarding Submissions" (así se puede escribir antes
# de que la promoción de las 20:00 le cree la ficha) o por el de "Prestadores
# de Servicios". Si la persona no está en el archivo, se arma una frase sola
# con los años de experiencia y dónde trabaja.
#
# FOTOS: se bajan solas del campo "Foto" (adjunto) de Prestadores de Servicios,
# se recortan a cuadrado 400x400 y se guardan en fotos/<record_id>.jpg. Se
# vuelve a bajar solo si el adjunto cambió (fotos/.origen.json guarda qué
# adjunto se usó). Un adjunto que no es imagen (ej: la pagina HTML de Drive que
# quedo pegada en los registros viejos) se ignora y la persona queda sin foto.
# Solo el retrato: nunca DNI, matricula ni seguro.
#
# DETALLES (para el buscador de la página): además de la frase, cada persona
# lleva una lista "detalles" con lo puntual que hace ("Limpieza de vidrios y
# ventanas", "Destapaciones", "Reparación de heladera"). Sale de las casillas y
# opciones que la persona marcó en el formulario de alta; la lista de qué
# campos se usan está más abajo, en DETALLES. Así, quien busca "sillón" o
# "heladera" encuentra a quien lo hace aunque su frase no lo diga.
# Nunca se usa texto libre ("Descripción personal", "Contanos sobre vos"): ahí
# la gente escribe teléfonos, redes, barrios y nombres de empresa.

import argparse
import datetime
import io
import json
import os
import sys

import requests
from PIL import Image, ImageOps

AQUI = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.dirname(AQUI)                 # landing/
REPO = os.path.dirname(WEB)                 # web-app/
BOT_POR_DEFECTO = os.path.join(os.path.dirname(REPO), "Zeus-app", "zeus-bot")

# Opción de "Servicios que ofrece" en Airtable -> clave del rubro (la misma que usa el bot en servicios.py)
RUBRO_DE_OPCION = {
    "Electricista": "electricista",
    "Plomero": "plomero",
    "Gasista": "gasista",
    "Gasista Matriculado": "gasista",
    "Cerrajero": "cerrajero",
    "Técnico Electrodomésticos": "tecnico_electrodomesticos",
    "Técnico de Electrodomésticos": "tecnico_electrodomesticos",
    "Instalación de Aire Acondicionado": "instalacion_aire",
    "Técnico en Aire Acondicionado": "instalacion_aire",   # así lo escribe el formulario
    "Limpieza Profesional": "limpieza_profesional",
    "Limpieza Particular": "limpieza_particular",
    "Arreglatodo / Handyman": "arreglatodo",
    "Arreglatodo (Handyman)": "arreglatodo",
    "Armado de Muebles": "armado_muebles",
    "Mudanza": "mudanza",
    "Fletes y Mudanzas": "mudanza",
    "Pintor": "pintor",
    "Control de Plagas": "control_plagas",
    "Control de plagas": "control_plagas",                 # así lo escribe el formulario
    # "Paisajismo" no es un rubro del bot: si alguien solo ofrece eso, no aparece.
}


def zonas_para_web(zonas: list) -> str:
    """'Zona Norte (Palermo, ...)', 'Zona Centro (...)' -> 'Zona Norte y Centro'. Nada de barrios ni direcciones."""
    cortas = []
    for z in zonas or []:
        base = z.split(" (")[0].strip()
        if base == "Toda CABA":
            return "Toda CABA"
        base = base.replace("Microcentro / Zona Este", "Microcentro").replace("Zona ", "")
        if base not in cortas:
            cortas.append(base)
    if len(cortas) >= 5:
        return "Toda CABA"
    if not cortas:
        return ""
    lista = cortas[0] if len(cortas) == 1 else ", ".join(cortas[:-1]) + " y " + cortas[-1]
    return ("Zona " + lista) if cortas[0] != "Microcentro" else lista


ZONA_EN_FRASE = {
    "Norte": "zona norte",
    "Centro": "el centro",
    "Sur": "zona sur",
    "Oeste": "zona oeste",
    "Microcentro": "Microcentro y Recoleta",
}


def donde_trabaja(zonas: list) -> str:
    """Zonas de cobertura -> 'Trabaja en toda CABA.' / 'Trabaja en zona norte y el centro de CABA.'"""
    cortas = []
    for z in zonas or []:
        base = z.split(" (")[0].strip()
        if base == "Toda CABA":
            return "Trabaja en toda CABA."
        base = base.replace("Microcentro / Zona Este", "Microcentro").replace("Zona ", "")
        texto = ZONA_EN_FRASE.get(base)
        if texto and texto not in cortas:
            cortas.append(texto)
    if len(cortas) >= 4:
        return "Trabaja en toda CABA."
    if not cortas:
        return ""
    lista = cortas[0] if len(cortas) == 1 else ", ".join(cortas[:-1]) + " y " + cortas[-1]
    return f"Trabaja en {lista}." if "Microcentro" in lista else f"Trabaja en {lista} de CABA."


def frase_para_web(f: dict) -> str:
    """Frase armada sola cuando la persona no está en frases_web.json: experiencia y dónde trabaja."""
    partes = []
    anios = f.get("Años de experiencia")
    if isinstance(anios, (int, float)) and anios > 0:
        anios = int(anios)
        partes.append(f"{anios} año{'s' if anios != 1 else ''} de experiencia.")
    tapizados = [t.lower() for t in (f.get("Tipos de tapizado") or [])]
    if tapizados:
        lista = tapizados[0] if len(tapizados) == 1 else ", ".join(tapizados[:-1]) + " y " + tapizados[-1]
        partes.append(f"Limpia {lista}.")
    donde = donde_trabaja(f.get("Zonas de cobertura"))
    if donde:
        partes.append(donde)
    return " ".join(partes)


# ---------- Detalles: lo puntual que hace cada persona (para el buscador) ----------
#
# Cada renglón dice de qué campo de "Prestadores de Servicios" sale un detalle,
# para qué rubros vale y cómo se escribe en la página. Un detalle solo se
# publica si la persona ofrece alguno de esos rubros (un plomero que dejó
# marcado "planchado" no aparece planchando).
#
# Tres formas:
#   "casilla": el campo es una casilla; si está tildada se publica "texto".
#   "lista":   el campo tiene opciones; cada opción elegida se publica con
#              "plantilla": "{}" es la opción tal cual ("IKEA") y "{m}" la
#              opción con la primera letra en minúscula ("sillones y sofás").
#              Una opción NUEVA en Airtable aparece sola en la página, sin
#              tocar este archivo.
#   "opcion":  el campo tiene opciones que solas no dicen nada ("Ambos",
#              "Todo"); "valores" dice qué se publica para cada una. Una opción
#              que no esté en "valores" no se publica.
#
# Para sumar un campo: agregar un renglón acá. Antes, preguntarse si es algo que
# puede ver cualquiera (la página es pública) y si es un servicio que Zeus
# ofrece. Por eso NO están "Cuida niños", "Hace mandados o compras" ni
# "Experiencia con mascotas": hoy Zeus no ofrece esos servicios.

_AIRE = ["Instalación de aire acondicionado", "Service y reparación de aire acondicionado"]
_PLOMERIA = ["Instalaciones de plomería nuevas", "Reparaciones de plomería"]
_GAS = ["Instalaciones de gas nuevas", "Service y reparaciones de gas"]
_TIPO_GAS = ["Gas natural", "Gas envasado"]
_ELECTRICIDAD = ["Electricidad en casas", "Electricidad en comercios"]
_PINTURA = ["Pintura de interiores", "Pintura de exteriores"]

DETALLES = [
    # --- Limpieza ---
    {"campo": "Tipo de limpieza", "rubros": ["limpieza_particular", "limpieza_profesional"], "forma": "lista", "plantilla": "{}"},
    {"campo": "Tipos de tapizado", "rubros": ["limpieza_particular", "limpieza_profesional"], "forma": "lista", "plantilla": "Limpieza de {m}"},
    {"campo": "Hace planchado", "rubros": ["limpieza_particular"], "forma": "casilla", "texto": "Planchado"},
    # --- Plomero ---
    {"campo": "Tipo de trabajo plomero", "rubros": ["plomero"], "forma": "opcion",
     "valores": {"Instalaciones nuevas": _PLOMERIA[:1], "Reparaciones": _PLOMERIA[1:], "Ambas": _PLOMERIA}},
    {"campo": "Hace destapaciones", "rubros": ["plomero"], "forma": "casilla", "texto": "Destapaciones"},
    {"campo": "Hace calefones y termotanques", "rubros": ["plomero"], "forma": "casilla", "texto": "Calefones y termotanques"},
    {"campo": "Hace instalación de piletas", "rubros": ["plomero"], "forma": "casilla", "texto": "Instalación de piletas"},
    # --- Gasista ---
    {"campo": "Tipo de trabajo gasista", "rubros": ["gasista"], "forma": "opcion",
     "valores": {"Instalaciones nuevas": _GAS[:1], "Service y reparaciones": _GAS[1:],
                 "Mantenimiento y reparaciones": ["Mantenimiento y reparaciones de gas"], "Ambos": _GAS}},
    {"campo": "Gas que trabaja", "rubros": ["gasista"], "forma": "opcion",
     "valores": {"Gas natural": _TIPO_GAS[:1], "GLP (gas envasado)": _TIPO_GAS[1:], "Ambos": _TIPO_GAS}},
    # --- Electricista ---
    {"campo": "Tipo de trabajo electricista", "rubros": ["electricista"], "forma": "opcion",
     "valores": {"Domiciliario": _ELECTRICIDAD[:1], "Comercial": _ELECTRICIDAD[1:], "Ambos": _ELECTRICIDAD, "Todo": _ELECTRICIDAD}},
    {"campo": "Hace tableros eléctricos", "rubros": ["electricista"], "forma": "casilla", "texto": "Tableros eléctricos"},
    # --- Aire acondicionado ---
    {"campo": "Tipo de trabajo AC", "rubros": ["instalacion_aire"], "forma": "opcion",
     "valores": {"Instalación": _AIRE[:1], "Service y reparación": _AIRE[1:], "Ambos": _AIRE, "Todo": _AIRE}},
    {"campo": "Tipos de equipo AC", "rubros": ["instalacion_aire"], "forma": "lista", "plantilla": "Aire acondicionado: {m}"},
    {"campo": "Diagnóstico placas inverter", "rubros": ["instalacion_aire"], "forma": "casilla", "texto": "Diagnóstico de equipos inverter"},
    # --- Pintor ---
    {"campo": "Tipo de trabajo pintor", "rubros": ["pintor"], "forma": "opcion",
     "valores": {"Interiores": _PINTURA[:1], "Exteriores": _PINTURA[1:], "Ambos": _PINTURA, "Interior y exterior": _PINTURA}},
    {"campo": "Hace yeso y enduío", "rubros": ["pintor"], "forma": "casilla", "texto": "Yeso y enduido"},
    # --- Armado de muebles ---
    {"campo": "Marcas de muebles", "rubros": ["armado_muebles"], "forma": "lista", "plantilla": "Muebles de {}"},
    {"campo": "Hace anclaje a pared", "rubros": ["armado_muebles"], "forma": "casilla", "texto": "Anclaje de muebles a la pared"},
    # --- Cerrajero y electrodomésticos ---
    {"campo": "Servicios de cerrajería", "rubros": ["cerrajero"], "forma": "lista", "plantilla": "{}"},
    {"campo": "Electrodomésticos que repara", "rubros": ["tecnico_electrodomesticos"], "forma": "lista", "plantilla": "Reparación de {m}"},
]

# Opciones de las listas que no dicen nada puntual: no se publican.
OPCIONES_SIN_DETALLE = {"todo", "todas", "todos", "ambos", "ambas", "otro", "otros", "sin marca", "sin marca específica"}

# Opciones que en Airtable están escritas cortas o repetidas con dos nombres
# (las viejas y las del formulario): así se escriben en la página.
OPCION_PARA_WEB = {
    "Particular (casas y deptos)": "Limpieza de casas y departamentos",
    "Limpieza del hogar": "Limpieza de casas y departamentos",
    "Comercial (oficinas)": "Limpieza de oficinas",
    "Post-obra": "Limpieza post-obra",
    "Vidrios y ventanas": "Limpieza de vidrios y ventanas",
    "Limpieza de vidrios": "Limpieza de vidrios y ventanas",
    "Alfombras y tapizados": "Limpieza de alfombras y tapizados",
    "VRV / VRF (comercial)": "VRV / VRF",
}


def _en_minuscula(texto: str) -> str:
    """'Sillones y sofás' -> 'sillones y sofás'. Deja como están las siglas y marcas ('TV y electrónica', 'IKEA')."""
    primera = texto.split(" ")[0]
    if len(primera) > 1 and primera.isupper():
        return texto
    return texto[:1].lower() + texto[1:]


def detalles_para_web(f: dict, rubros: list) -> list:
    """
    Lo puntual que hace la persona, en frases cortas, a partir de las casillas y
    opciones de su ficha (ver DETALLES). Solo lo de los rubros que ofrece. Sin
    repetidos y en el orden de DETALLES.
    """
    salida = []

    def sumar(texto):
        texto = (texto or "").strip()
        if texto and texto.lower() not in [s.lower() for s in salida]:
            salida.append(texto)

    for d in DETALLES:
        if not any(r in rubros for r in d["rubros"]):
            continue
        valor = f.get(d["campo"])
        if not valor:
            continue
        if d["forma"] == "casilla":
            if valor is True:
                sumar(d["texto"])
        elif d["forma"] == "opcion":
            for texto in d["valores"].get(valor if isinstance(valor, str) else "", []):
                sumar(texto)
        elif d["forma"] == "lista":
            for opcion in (valor if isinstance(valor, list) else [valor]):
                if not isinstance(opcion, str) or opcion.strip().lower() in OPCIONES_SIN_DETALLE:
                    continue
                opcion = OPCION_PARA_WEB.get(opcion, opcion)
                sumar(d["plantilla"].format(opcion, m=_en_minuscula(opcion)))
    return salida


def nombre_para_web(completo: str) -> str:
    partes = [p for p in (completo or "").split() if p]
    if not partes:
        return ""
    nombre = partes[0].capitalize()
    if len(partes) == 1:
        return nombre
    return f"{nombre} {partes[-1][0].upper()}."


BANNER = """\
// ============================================================================
// ⚠️  ARCHIVO GENERADO AUTOMÁTICAMENTE — NO LO EDITES A MANO  ⚠️
// ============================================================================
//
// Lo reescribe entero herramientas/actualizar_profesionales.py, que corre solo
// todas las noches (20:00 de Buenos Aires) leyendo Airtable. Cualquier cambio
// que hagas acá se pierde en la próxima corrida, sin aviso y sin error.
//
// ¿Querés cambiar quién aparece en la web, su nombre, su foto o su zona?
//   → Se edita en AIRTABLE, tabla "Prestadores de Servicios".
//     La web muestra solo a los que están Estado=Activo y Disponibilidad=Disponible.
//   → Aparece al día siguiente. Para verlo ya: pestaña Actions del repo →
//     "Actualizar profesionales" → Run workflow.
//   → Guía paso a paso:
//     https://chiaradigi2.atlassian.net/wiki/spaces/Zeus/pages/98312
//
// Generado el {hoy}.
// ============================================================================
"""


TAM_FOTO = 400


def bajar_foto(record_id: str, adjuntos: list, origen: dict) -> str | None:
    """
    Deja fotos/<record_id>.jpg con el retrato del adjunto "Foto" de Airtable
    (recortado a cuadrado, 400x400). Devuelve la ruta relativa o None si no hay
    una imagen usable. `origen` es el dict {record_id: attachment_id} que evita
    volver a bajar lo que no cambio.
    """
    ruta_rel = f"fotos/{record_id}.jpg"
    ruta = os.path.join(WEB, ruta_rel)
    imagenes = [a for a in (adjuntos or []) if (a.get("type") or "").startswith("image/")]
    if not imagenes:
        # Sin imagen en Airtable: si hay una foto cargada a mano en fotos/, se respeta.
        return ruta_rel if os.path.exists(ruta) else None
    adj = imagenes[0]
    if origen.get(record_id) == adj.get("id") and os.path.exists(ruta):
        return ruta_rel
    try:
        r = requests.get(adj["url"], timeout=60)
        r.raise_for_status()
        im = ImageOps.exif_transpose(Image.open(io.BytesIO(r.content))).convert("RGB")
        w, h = im.size
        lado = min(w, h)
        top = int((h - lado) * 0.35) if h > w else 0   # las caras suelen estar arriba
        left = (w - lado) // 2 if w > h else 0
        im = im.crop((left, top, left + lado, top + lado)).resize((TAM_FOTO, TAM_FOTO), Image.LANCZOS)
        im.save(ruta, "JPEG", quality=85, optimize=True)
        origen[record_id] = adj.get("id")
        return ruta_rel
    except Exception as e:
        print(f"No se pudo bajar la foto de {record_id}: {e}")
        return ruta_rel if os.path.exists(ruta) else None


def frase_elegida(record_id: str, f: dict, frases: dict) -> str:
    """La frase escrita a mano (por id de Prestadores o de su alta en Onboarding) o, si no hay, la automática."""
    for clave in [record_id] + list(f.get("Onboarding Submissions") or []):
        texto = frases.get(clave)
        if isinstance(texto, str) and texto.strip():
            return texto.strip()
    return frase_para_web(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--bot", default=BOT_POR_DEFECTO,
                    help="carpeta zeus-bot del repo Zeus-app (de ahí se toma el .env)")
    args = ap.parse_args()

    sys.path.insert(0, args.bot)
    from dotenv import load_dotenv
    load_dotenv(os.path.join(args.bot, ".env"))
    from pyairtable import Api

    api = Api(os.environ["AIRTABLE_API_KEY"])
    tabla = api.table(os.environ["AIRTABLE_BASE_ID"], "tbltQHlUuIUI3Du2D")  # Prestadores de Servicios

    ruta_nombres = os.path.join(AQUI, "nombres_web.json")
    a_mano = {}
    if os.path.exists(ruta_nombres):
        a_mano = json.load(io.open(ruta_nombres, encoding="utf-8"))

    ruta_frases = os.path.join(AQUI, "frases_web.json")
    frases = {}
    if os.path.exists(ruta_frases):
        frases = json.load(io.open(ruta_frases, encoding="utf-8"))

    ruta_origen = os.path.join(WEB, "fotos", ".origen.json")
    origen = json.load(io.open(ruta_origen, encoding="utf-8")) if os.path.exists(ruta_origen) else {}

    salida, sin_rubro = [], []
    for r in tabla.all(formula="AND({Estado} = 'Activo', {Disponibilidad} = 'Disponible')"):
        f = r["fields"]
        rubros = []
        for opcion in f.get("Servicios que ofrece") or []:
            clave = RUBRO_DE_OPCION.get(opcion)
            if clave and clave not in rubros:
                rubros.append(clave)
        if not rubros:
            sin_rubro.append(f.get("Nombre completo", r["id"]))
            continue
        salida.append({
            "id": r["id"],
            "nombre": a_mano.get(r["id"]) or nombre_para_web(f.get("Nombre completo", "")),
            "rubros": rubros,
            "frase": frase_elegida(r["id"], f, frases),
            "detalles": detalles_para_web(f, rubros),
            "foto": bajar_foto(r["id"], f.get("Foto"), origen),
        })

    io.open(ruta_origen, "w", encoding="utf-8").write(json.dumps(origen, indent=2) + "\n")

    salida.sort(key=lambda p: (p["foto"] is None, p["nombre"]))
    hoy = datetime.date.today().isoformat()
    js = (
        BANNER.format(hoy=hoy)
        + f"window.ZEUS_PROFESIONALES = {json.dumps(salida, ensure_ascii=False, indent=2)};\n"
    )
    io.open(os.path.join(WEB, "datos", "profesionales.js"), "w", encoding="utf-8").write(js)

    con_foto = sum(1 for p in salida if p["foto"])
    print(f"{len(salida)} profesionales activos ({con_foto} con foto).")
    if sin_rubro:
        print("Sin ningún rubro que ofrezca el bot (no aparecen):", ", ".join(sin_rubro))
    sin_foto = [p["nombre"] for p in salida if not p["foto"]]
    if sin_foto:
        print("Sin foto en fotos/ (no aparecen en la página):", ", ".join(sin_foto))


if __name__ == "__main__":
    main()
