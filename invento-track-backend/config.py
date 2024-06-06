import os
from dotenv import load_dotenv
os.urandom(24)

#cambiar username y password según tu bd. Lo ideal seria lo mismo usuario postgrest y contraseña postgres
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'Esto-es-una-clave-secretaxde'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://inventotrack_user:0KmVK1O3r76xdcLQoaJRXUNStVGJQzw2@dpg-cokluu63e1ms73e6dj60-a.oregon-postgres.render.com/inventotrack'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'inventotrack.mindsoft@gmail.com'
    MAIL_PASSWORD = 'cejl ynvc ktwv fzcf'
    MAIL_DEFAULT_SENDER = 'inventotrack.mindsoft@gmail.com'

    GOOGLE_APPLICATION_CREDENTIALS = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
