from app import db

#Cliente model
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    apellido = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    direccion = db.Column(db.String(128))
    telefono = db.Column(db.String(128))

    @staticmethod
    def get_all_clients():
        return Cliente.query.all()

class Vendedor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    apellido = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    estado = db.Column(db.String(128), default='ACTIVO')
    password = db.Column(db.String(128))
    role = db.Column(db.String(128), default='vendedor')

    @staticmethod
    def get_all_sellers():
        return Vendedor.query.all()

class Administrador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    apellido = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(128))
    role = db.Column(db.String(128), default='admin')