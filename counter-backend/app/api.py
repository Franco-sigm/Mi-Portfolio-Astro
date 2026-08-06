import os

from flask import Flask, jsonify
from flask_cors import CORS

# Importar db también carga el .env (load_dotenv), así que las
# variables de entorno ya están disponibles más abajo.
from db import get_db_connection

app = Flask(__name__)

# Solo estos orígenes pueden llamar a la API desde un navegador.
# Se definen en el .env (CORS_ORIGINS, separados por coma) para no
# tener que tocar el código al desplegar:
#
#   CORS_ORIGINS=https://portfolio-personal.surcode.cl,http://localhost:4321
#
ORIGENES_PERMITIDOS = [
    origen.strip()
    for origen in os.getenv("CORS_ORIGINS", "https://portfolio-personal.surcode.cl").split(",")
    if origen.strip()
]

CORS(app, resources={r"/api/*": {"origins": ORIGENES_PERMITIDOS}})


# Obtener estadísticas actuales
@app.route('/api/stats', methods=['GET'])
def get_stats():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT visitas, corazones FROM metricas WHERE id = 1;")
            result = cursor.fetchone()
            return jsonify(result), 200
    finally:
        connection.close()

# Registrar una nueva visita (+1)
@app.route('/api/visit', methods=['POST'])
def register_visit():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("UPDATE metricas SET visitas = visitas + 1 WHERE id = 1;")
            connection.commit()
            cursor.execute("SELECT visitas FROM metricas WHERE id = 1;")
            result = cursor.fetchone()
            return jsonify(result), 200
    finally:
        connection.close()

# Registrar un corazón/like (+1)
@app.route('/api/like', methods=['POST'])
def add_like():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("UPDATE metricas SET corazones = corazones + 1 WHERE id = 1;")
            connection.commit()
            cursor.execute("SELECT corazones FROM metricas WHERE id = 1;")
            result = cursor.fetchone()
            return jsonify(result), 200
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)