import os
import sys

# abspath() es importante: Passenger carga este archivo con una ruta
# relativa ('wsgi.py'), así que dirname(__file__) quedaría vacío y la
# ruta a app/ dependería del directorio de trabajo del proceso.
BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(BASE, 'app'))

from api import app as application  # noqa: E402
