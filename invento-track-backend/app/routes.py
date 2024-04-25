from flask import request, jsonify
from app import app, db
from app.models import Cliente, Vendedor

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

@app.route('/vendedores', methods=['GET'])
def list_sellers():
    vendedores = Vendedor.get_all_sellers()
    vendedores_json = [{
        'id': vendedor.id,
        'nombre': vendedor.nombre,
        'apellido': vendedor.apellido,
        'email': vendedor.email,
        'estado': vendedor.estado,
        'password': vendedor.password
    } for vendedor in vendedores]

    return jsonify(vendedores_json)

@app.route('/clientes', methods=['POST'])
def agregar_cliente():
    data = request.json()

    nuevo_cliente = Cliente(
        nombre=data['nombre'],
        apellido=data['apellido'],
        email=data['email'],
        direccion=data['direccion'],
        telefono=data['telefono']
    )

    db.session.add(nuevo_cliente)
    db.session.commit()

    return jsonify({
        'mensaje': 'Cliente agregado exitosamente!'
    }), 201

@app.route('/vendedores', methods=['POST'])
def agregar_vendedor():
    data = request.json()

    nuevo_vendedor = Vendedor(
        nombre=data['nombre'],
        apellido=data['apellido'],
        email=data['email'],
        password=data['password']
    )

    db.session.add(nuevo_vendedor)
    db.session.commit()

    return jsonify({
        'mensaje': 'Vendedor agregado exitosamente!'
    }), 201