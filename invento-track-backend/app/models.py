from app import db

#Cliente model
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    apellido = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    direccion = db.Column(db.String(128))
    telefono = db.Column(db.String(128))
