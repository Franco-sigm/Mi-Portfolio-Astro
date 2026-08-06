import sys
import os

# Añadir el directorio actual al Path de Python
sys.path.insert(0, os.path.dirname(__file__))

from app import app as application