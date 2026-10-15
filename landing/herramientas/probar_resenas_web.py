# ============================================
# Zeus ⚡ web — Pruebas de cómo se arman las reseñas para la página
# ============================================
# Controla las reglas de resenas_por_prestador() en actualizar_profesionales.py
# con reseñas inventadas, sin Airtable:
#   - solo cuentan las reseñas de clientes (Origen = Cliente) con puntaje;
#   - el promedio es sobre TODAS las de clientes, publicadas o no;
#   - se publica solo lo que tiene "Visible al público" tildado;
#   - el nombre de pila sale solo con "Permiso para publicar" = Sí;
#   - nunca sale el comentario crudo, solo "Texto público";
#   - la fecha es solo el mes.
#
# Cómo se corre (desde landing/):  python herramientas/probar_resenas_web.py
# Corre sola en cada Pull Request que toca landing/ (probar-buscador.yml).

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from actualizar_profesionales import resenas_por_prestador, nombre_de_pila, NOMBRE_SIN_PERMISO  # noqa: E402

FALLAS = []


def revisar(nombre, condicion, detalle=""):
    print(f"  [{'OK  ' if condicion else 'FALLA'}] {nombre}" + (f"  -> {detalle}" if detalle and not condicion else ""))
    if not condicion:
        FALLAS.append(nombre)


def resena(prestador, puntaje, origen="Cliente", visible=False, permiso=None, texto="", cliente="recC1", fecha="2026-08-31T00:00:00.000Z", comentario="comentario crudo con el teléfono 11-5555-5555"):
    f = {"Prestador": [prestador], "Comentario": comentario, "Fecha": fecha, "Cliente": [cliente]}
    if puntaje is not None:
        f["Puntaje"] = puntaje
    if origen:
        f["Origen"] = origen
    if visible:
        f["Visible al público"] = True
    if permiso:
        f["Permiso para publicar"] = permiso
    if texto:
        f["Texto público"] = texto
    return {"id": "rec" + str(abs(hash(str(f))))[:8], "createdTime": fecha, "fields": f}


NOMBRES = {"recC1": "Santiago", "recC2": "Claudia"}

print("\nPromedio y cantidad")
datos = resenas_por_prestador([
    resena("recLUCAS", 5),
    resena("recLUCAS", 4, visible=True, permiso="Sí", texto="muy puntual"),
    resena("recLUCAS", 3, origen="Equipo Zeus", visible=True, permiso="Sí", texto="del equipo"),   # no cuenta
    resena("recLUCAS", None, visible=True, texto="sin puntaje"),                                    # no cuenta
    resena("recLUCAS", 5, origen=None),                                                            # sin Origen: no cuenta
], NOMBRES)
lucas = datos.get("recLUCAS", {})
revisar("promedio sobre las de clientes con puntaje (5 y 4 → 4,5)", lucas.get("promedio") == 4.5, str(lucas))
revisar("cantidad = 2 (no cuenta la del equipo, la sin puntaje ni la sin Origen)", lucas.get("cantidad") == 2, str(lucas.get("cantidad")))
revisar("publicada solo la que tiene Visible al público (y es de cliente con puntaje)", len(lucas.get("publicas", [])) == 1, str(lucas.get("publicas")))
pub = (lucas.get("publicas") or [{}])[0]
revisar("con el nombre de pila porque dio permiso", pub.get("nombre") == "Santiago", str(pub))
revisar("con el Texto público, nunca el comentario crudo", pub.get("texto") == "muy puntual" and "teléfono" not in str(pub))
revisar("solo el mes, no el día", pub.get("fecha") == "2026-08", str(pub.get("fecha")))
revisar("puntaje entero", pub.get("puntaje") == 4)

print("\nPermiso y nombre")
datos = resenas_por_prestador([
    resena("recMARCELA", 5, visible=True, permiso="No", texto="excelente", cliente="recC2"),
    resena("recMARCELA", 5, visible=True, permiso="Sin preguntar", texto="todo bien", cliente="recC2"),
    resena("recMARCELA", 5, visible=True, texto="prolija", cliente="recC9"),
], NOMBRES)
pubs = datos["recMARCELA"]["publicas"]
revisar("sin permiso (No / Sin preguntar / vacío) el nombre es genérico", all(p["nombre"] == NOMBRE_SIN_PERMISO for p in pubs), str(pubs))
revisar("tres publicadas, promedio 5,0", len(pubs) == 3 and datos["recMARCELA"]["promedio"] == 5.0)

print("\nCasos borde")
revisar("sin reseñas de clientes, la persona no aparece", resenas_por_prestador([resena("recX", 5, origen="Equipo Zeus")], {}) == {})
datos = resenas_por_prestador([resena("recY", 4, visible=True, permiso="Sí", cliente="recC1")], NOMBRES)
revisar("publicada sin Texto público: queda con texto vacío (solo estrellas)", datos["recY"]["publicas"][0]["texto"] == "")
datos = resenas_por_prestador([resena("recZ", 5, visible=True, fecha=f"2026-{m:02d}-01T00:00:00.000Z") for m in range(1, 13)], {})
revisar("como mucho 10 publicadas, las más nuevas primero", len(datos["recZ"]["publicas"]) == 10 and datos["recZ"]["publicas"][0]["fecha"] == "2026-12")
revisar("nombre de pila: primera palabra, con mayúscula", nombre_de_pila("santiago harriague") == "Santiago")
revisar("'Cliente sin nombre' no se usa como nombre", nombre_de_pila("Cliente sin nombre") == "")

print(f"\n{'Todo OK' if not FALLAS else str(len(FALLAS)) + ' pruebas fallaron'}")
sys.exit(1 if FALLAS else 0)
