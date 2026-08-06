import os
from urllib.parse import urlparse

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
        user=url.username,
        password=url.password,
        database=url.path.lstrip('/'),
        port=url.port or 3306,
        cursorclass=pymysql.cursors.DictCursor
    )
