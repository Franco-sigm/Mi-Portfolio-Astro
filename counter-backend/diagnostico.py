"""Diagnóstico de la conexión, para ejecutar en el servidor.

DirectAdmin → pantalla de la app Python → «Ejecutar script python»,
indicando la ruta:  diagnostico.py

Imprime qué configuración ve la aplicación realmente y dónde falla.
No muestra contraseñas: solo su longitud y sus últimos caracteres.
"""
import os
import sys
from urllib.parse import unquote, urlparse

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

print("=" * 55)
print("Python:", sys.version.split()[0])

# ¿De dónde salen las variables? El panel gana sobre el .env.
url_env = os.environ.get('DATABASE_URL')
print("DATABASE_URL en el entorno del panel:", "SÍ" if url_env else "no")

try:
    from dotenv import load_dotenv
    ruta = os.path.join(os.path.dirname(__file__), 'app', '.env')
    print("app/.env existe:", os.path.exists(ruta))
    load_dotenv(ruta)
except Exception as e:
    print("dotenv:", e)

url = os.getenv('DATABASE_URL')
if not url:
    print("\n❌ No hay DATABASE_URL por ningún lado.")
    raise SystemExit

u = urlparse(url)
clave = unquote(u.password or '')
print("\n--- lo que la aplicación va a usar ---")
print("  usuario  :", unquote(u.username or ''))
print("  host     :", u.hostname)
print("  puerto   :", u.port or 3306)
print("  base     :", u.path.lstrip('/'))
print(f"  password : {len(clave)} caracteres, termina en …{clave[-3:]}")

print("\n--- intento de conexión ---")
try:
    import pymysql
    c = pymysql.connect(
        host=u.hostname, user=unquote(u.username or ''), password=clave,
        database=u.path.lstrip('/'), port=u.port or 3306, connect_timeout=8,
    )
    cur = c.cursor()
    cur.execute("SHOW TABLES;")
    print("  ✅ CONECTA. Tablas:", cur.fetchall())
    cur.execute("SELECT * FROM metricas;")
    print("  metricas:", cur.fetchall())
    c.close()
except Exception as e:
    print(f"  ❌ {type(e).__name__}: {e}")
print("=" * 55)
