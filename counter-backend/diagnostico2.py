"""Arranca la app igual que lo hace Passenger y llama a las rutas.

Ejecutar en el servidor:
  DirectAdmin → app Python → «Ejecutar script python» → diagnostico2.py

Si la aplicación falla al importar o al responder, aquí se ve el motivo
completo, cosa que la respuesta HTTP 500 no muestra.
"""
import os
import sys
import traceback

print("=" * 55)
print("Python:", sys.version.split()[0])
print("Directorio:", os.path.dirname(os.path.abspath(__file__)))

# 1) Importar como lo hace passenger_wsgi.py
print("\n--- 1. importando wsgi.application ---")
try:
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from wsgi import application
    print("  ✅ importa:", application)
except Exception:
    print("  ❌ falla el import:")
    traceback.print_exc()
    raise SystemExit

# 2) Llamar a las rutas con el cliente de pruebas de Flask (sin HTTP)
print("\n--- 2. llamando a las rutas ---")
cliente = application.test_client()
for metodo, ruta in [('GET', '/api/stats'), ('POST', '/api/visit')]:
    try:
        r = cliente.open(ruta, method=metodo, headers={'Origin': 'https://portafolio.surcode.cl'})
        cuerpo = r.get_data(as_text=True)[:200]
        print(f"  {metodo} {ruta} → {r.status_code}  {cuerpo}")
    except Exception:
        print(f"  {metodo} {ruta} → excepción:")
        traceback.print_exc()

print("=" * 55)
