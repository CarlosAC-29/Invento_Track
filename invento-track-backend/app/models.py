from app import db

#Este es un ejemplo xde modelo de base de datos
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
