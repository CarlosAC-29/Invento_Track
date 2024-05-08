from flask import request, jsonify
from app import app, db
from app.models import Cliente, Vendedor, Administrador, Producto

@app.route('/')
def index():
    return 'Hola, mundo!'

from sqlalchemy import text


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json 
        email = data.get('email') 

        vendedor = Vendedor.query.filter_by(email=email).first()
        if vendedor:
            return jsonify({'id': vendedor.id, 'rol': 'vendedor'})

        administrador = Administrador.query.filter_by(email=email).first()
        if administrador:
            return jsonify({'id': administrador.id, 'rol': 'admin'})  

        return jsonify({'error': 'Usuario no encontrado'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/test-db')
def test_db_connection():
    try:
        db.session.execute(text('SELECT 1'))
        return 'Conexión exitosa con la base de datos!'
    except Exception as e:
        return f'Error en la conexión con la base de datos: {e}'

@app.route('/clientes', methods=['GET'])
def list_clients():
    try:
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
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/vendedores', methods=['GET'])
def list_sellers():
    try:
        vendedores = Vendedor.get_all_sellers()
        vendedores_json = [{
            'id': vendedor.id,
            'nombre': vendedor.nombre,
            'apellido': vendedor.apellido,
            'email': vendedor.email,
            'estado': vendedor.estado
        } for vendedor in vendedores]

        return jsonify(vendedores_json)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clientes', methods=['POST'])
def agregar_cliente():
    try:
        data = request.json

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
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/vendedores', methods=['POST'])
def agregar_vendedor():
    try:
        data = request.json

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
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clientes/<int:id>', methods=['PUT'])
def editar_cliente(id):
    try:
        data = request.json

        cliente = Cliente.query.get(id)
        cliente.nombre = data['nombre']
        cliente.apellido = data['apellido']
        cliente.email = data['email']
        cliente.direccion = data['direccion']
        cliente.telefono = data['telefono']

        db.session.commit()

        return jsonify({
            'mensaje': 'Cliente actualizado exitosamente!'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/vendedores/<int:id>', methods=['PUT'])
def editar_vendedor(id):
    try:
        data = request.json

        vendedor = Vendedor.query.get(id)
        vendedor.nombre = data['nombre']
        vendedor.apellido = data['apellido']
        vendedor.email = data['email']
        vendedor.password = data['password']

        db.session.commit()

        return jsonify({
            'mensaje': 'Vendedor actualizado exitosamente!'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/productos', methods=['GET'])
def list_product():
    try:
        productos = Producto.get_all_products()
        productos_json = [{
            'id': producto.id,
            'nombre': producto.nombre,
            'precio': producto.precio,
            'stock': producto.stock,
            'descripcion': producto.descripcion,
            'categoria': producto.categoria,
            'referencia': producto.referencia,
            'imagen': producto.imagen
        } for producto in productos]
        
        return jsonify(productos_json)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/productos', methods=['POST'])
def agregar_producto():
    try:
        data = request.json

        nuevo_producto = Producto(
            nombre=data['nombre'],
            precio=data['precio'],
            stock=data['stock'],
            descripcion=data['descripcion'],
            categoria=data['categoria'],
            referencia=data['referencia'],
            imagen=data['imagen']
        )

        db.session.add(nuevo_producto)
        db.session.commit()

        return jsonify({
            'mensaje': 'Producto agregado exitosamente!'
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    data = request.json

    producto = Producto.query.get_or_404(id)

    if 'nombre' in data:
        producto.nombre = data['nombre']
    if 'precio' in data:
        producto.precio = data['precio']
    if 'stock' in data:
        producto.stock = data['stock']
    if 'descripcion' in data:
        producto.descripcion = data['descripcion']
    if 'categoria' in data:
        producto.categoria = data['categoria']
    if 'referencia' in data:
        producto.referencia = data['referencia']
    if 'imagen' in data:
        producto.imagen = data['imagen']

    db.session.commit()

    return 'Producto actualizado correctamente', 200

@app.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    producto = Producto.query.get_or_404(id)

    db.session.delete(producto)
    db.session.commit()

    return 'Producto eliminado correctamente', 200

