import os


#cambiar la secret, username y password
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key_here'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://username:password@localhost:5432/inventoTrack'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
