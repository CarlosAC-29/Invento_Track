from flask import jsonify
from app import app, db
from app.models import Cliente

@app.route('/')
def index():
    return 'Hola, mundo!'

from sqlalchemy import text

@app.route('/test-db')
def test_db_connection():
    try:
        db.session.execute(text('SELECT 1'))
        return 'Conexión exitosa con la base de datos!'
    except Exception as e:
        return f'Error en la conexión con la base de datos: {e}'

@app.route('/clientes', methods=['GET'])
def list_clients():
    clientes = Cliente.get_all_clients()
    clientes_json = [{
        'id': cliente.id,
        'nombre': cliente.nombre,
        'apellido': cliente.apellido,
        'email': cliente.email,
        'direccion': cliente.direccion,
        'telefono': cliente.telefono
    } for cliente in clientes]
    
    return jsonify(clientes_json)