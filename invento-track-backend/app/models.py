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

# Editar datos cliente
def editar_cliente(cliente_id, nombre, apellido, email, direccion, telefono):
    cliente = Cliente.query.get(cliente_id)
    if cliente:
        cliente.nombre = nombre
        cliente.apellido = apellido
        cliente.email = email
        cliente.direccion = direccion
        cliente.telefono = telefono
        db.session.commit()
        return True
    return False

# Editar datos vendedor
def editar_vendedor(vendedor_id, nombre, apellido, email, estado, password):
    vendedor = Vendedor.query.get(vendedor_id)
    if vendedor:
        vendedor.nombre = nombre
        vendedor.apellido = apellido
        vendedor.email = email
        vendedor.estado = estado
        vendedor.password = password
        db.session.commit()
        return True
    return False