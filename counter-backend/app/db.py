import os
from pathlib import Path
from urllib.parse import unquote, urlparse

import pymysql
from dotenv import load_dotenv

# Ruta absoluta y anclada a este archivo, no relativa al directorio de
# trabajo: bajo Passenger el proceso arranca desde otro sitio y un
# load_dotenv() a secas puede no encontrar el .env — o encontrar otro.
load_dotenv(Path(__file__).with_name('.env'))


def get_db_connection():
    database_ur

    # Validación de la existencia de la variable de entorno
    if not database_url:
        raise ValueError("La variable DATABASE_URL no está configurada en el archivo .env")

    # Descomposición de la URL de conexión (mysql://usuario:password@host:puerto/dbname)
    url = urlparse(database_url)

    return pymysql.connect(
        host=url.hostname,
        user=unquote(url.username or ''),
        # La contraseña viaja porcentaje-codificada dentro de la URL: sin
        # descodificarla, una clave con !, @ o : llegaría mal a MySQL.
        password=unquote(url.password or ''),
        database=url.path.lstrip('/'),
        port=url.port or 3306,
        cursorclass=pymysql.cursors.DictCursor
    )
