from app import db
from datetime import datetime
from sqlalchemy import func

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

#Vendedor model
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

#Administrador model
class Administrador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    apellido = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(128))
    role = db.Column(db.String(128), default='admin')

#Producto model
class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    precio = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    descripcion = db.Column(db.String(500))
    categoria = db.Column(db.String(128))
    referencia = db.Column(db.String(128))
    imagen = db.Column(db.String(500))

    @staticmethod
    def get_all_products():
        return Producto.query.all()
    
    @staticmethod
    def get_products_by_category(categoria):
        return Producto.query.filter(func.lower(Producto.categoria) == categoria.lower()).all()

#Pedido model
class Pedido(db.Model):
    id_pedido = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.Integer, db.ForeignKey('cliente.id'))
    id_producto = db.Column(db.Integer, db.ForeignKey('producto.id'))
    total_pedido = db.Column(db.Integer)
    fecha_pedido = db.Column(db.DateTime, default=datetime.utcnow)
    cantidad_producto = db.Column(db.Integer)