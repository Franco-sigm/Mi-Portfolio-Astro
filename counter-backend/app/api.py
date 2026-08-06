import pymysql
from flask import Flask, jsonify
from flask_cors import CORS
import config

app = Flask(__name__)
CORS(app)  

def get_db_connection():
    return pymysql.connect(
        host=config.DB_HOST,
        user=config.DB_USER,
        password=config.DB_PASSWORD,
        database=config.DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

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