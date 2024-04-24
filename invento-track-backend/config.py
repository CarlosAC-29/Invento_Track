import os
os.urandom(24)

#cambiar username y password según tu bd. Lo ideal seria lo mismo usuario postgrest y contraseña postgres
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'Esto-es-una-clave-secretaxde'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://postgres:postgres@localhost:5432/inventotrack'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
