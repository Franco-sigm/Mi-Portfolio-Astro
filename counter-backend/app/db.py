import os
from urllib.parse import unquote, urlparse

import pymysql
from dotenv import load_dotenv

load_dotenv()


def get_db_connection():
    database_url = os.getenv("DATABASE_URL")

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
