import os
import re
import smtplib
import ssl
from email.message import EmailMessage

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix

# Importar db también carga el .env (load_dotenv), así que las
# variables de entorno ya están disponibles más abajo.
from db import get_db_connection

app = Flask(__name__)

# En el hosting compartido, Flask corre detrás de Apache/LiteSpeed. Sin esto
# request.remote_addr sería 127.0.0.1 para TODOS los visitantes y el límite
# por IP se convertiría en un límite global: el primero en gastarlo dejaría
# fuera a todo el mundo. ProxyFix lee la IP real de X-Forwarded-For.
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)

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

# Datos del buzón desde el que sale el correo del formulario.
# Todos viven en el .env; ninguno se escribe en el código.
SMTP_HOST = os.getenv("SMTP_HOST", "mail.surcode.cl")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
CONTACT_TO = os.getenv("CONTACT_TO", "")

EMAIL_VALIDO = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# -------------------------------------------------------------------
#  Límite de peticiones por IP. CORS solo lo respetan los navegadores;
#  esto es lo que frena a quien llame la API con curl o un script.
#  El almacenamiento va en memoria: suficiente aquí, pero ojo — si el
#  hosting levanta varios procesos, cada uno lleva su propia cuenta.
# -------------------------------------------------------------------
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per hour"],
    storage_uri="memory://",
    strategy="fixed-window",
)


# Flask-Limiter responde HTML por defecto; el frontend espera JSON.
@app.errorhandler(429)
def demasiadas_peticiones(e):
    return jsonify({'error': 'Demasiados intentos. Espera un momento antes de reintentar.'}), 429


# Obtener estadísticas actuales
@app.route('/api/stats', methods=['GET'])
@limiter.limit("60 per minute")  # solo lectura: generoso
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
# Una visita por pestaña: un mismo usuario puede abrir varias, pero no 30
@limiter.limit("30 per hour")
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
# El localStorage ya evita el doble clic honesto; esto frena al que lo borra
@limiter.limit("10 per hour")
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

# Recibir un mensaje del formulario de contacto y reenviarlo por correo
@app.route('/api/contact', methods=['POST'])
# El más estricto: cada petición que pasa termina en tu bandeja de entrada
@limiter.limit("3 per hour; 8 per day")
def send_email():
    datos = request.get_json(silent=True) or {}

    # Honeypot: campo oculto por CSS que un humano nunca ve ni rellena.
    # Si viene con contenido es un bot; devolvemos éxito para no darle
    # pistas de que lo detectamos, pero no enviamos nada.
    if datos.get('web'):
        return jsonify({'ok': True}), 200

    nombre = (datos.get('nombre') or '').strip()
    correo = (datos.get('email') or '').strip()
    mensaje = (datos.get('mensaje') or '').strip()

    if not nombre or not correo or not mensaje:
        return jsonify({'error': 'Faltan campos obligatorios.'}), 400
    if not EMAIL_VALIDO.match(correo):
        return jsonify({'error': 'El correo no tiene un formato válido.'}), 400
    if len(nombre) > 120 or len(correo) > 200 or len(mensaje) > 5000:
        return jsonify({'error': 'El contenido es demasiado largo.'}), 400

    if not (SMTP_USER and SMTP_PASSWORD and CONTACT_TO):
        app.logger.error('Faltan variables SMTP en el .env')
        return jsonify({'error': 'El servidor de correo no está configurado.'}), 500

    aviso = EmailMessage()
    aviso['Subject'] = f'Portfolio — mensaje de {nombre}'
    # El remitente debe ser nuestro propio buzón: si pusiéramos aquí el
    # correo del visitante, SPF/DKIM lo marcarían como suplantación y
    # terminaría en spam. Su dirección va en Reply-To, así responder
    # es un clic y la respuesta le llega a él.
    aviso['From'] = f'Portfolio <{SMTP_USER}>'
    aviso['To'] = CONTACT_TO
    aviso['Reply-To'] = f'{nombre} <{correo}>'
    aviso.set_content(f'De: {nombre} <{correo}>\n\n{mensaje}')

    try:
        contexto = ssl.create_default_context()
        if SMTP_PORT == 465:
            # Puerto 465: la conexión nace cifrada (SSL implícito)
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=contexto, timeout=15) as servidor:
                servidor.login(SMTP_USER, SMTP_PASSWORD)
                servidor.send_message(aviso)
        else:
            # Puerto 587 u otro: se abre en claro y se cifra con STARTTLS
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as servidor:
                servidor.starttls(context=contexto)
                servidor.login(SMTP_USER, SMTP_PASSWORD)
                servidor.send_message(aviso)
    except Exception:
        # El detalle va al log del servidor, nunca al navegador
        app.logger.exception('Falló el envío del correo de contacto')
        return jsonify({'error': 'No se pudo enviar el mensaje. Inténtalo más tarde.'}), 502

    return jsonify({'ok': True}), 200

if __name__ == '__main__':
    app.run(debug=True)