from flask import request, jsonify
from flask_mail import Mail, Message
from app import app, db, mail
from app.models import Cliente, Vendedor, Administrador, Producto, Pedido, ProductoPedido
import google.generativeai as genai
from dotenv import load_dotenv
import os, json   

# inventotrack.mindsoft
# Univalle**2024

@app.route('/')
def index():
    return 'Hola, mundo!'

API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')


from sqlalchemy import text

@app.route('/api/gemini', methods=['POST'])
def gemini():
    try:
        
        data = request.json
        
        productos = Producto.get_all_products()
        

        lista_productos = [producto.to_dict() for producto in productos]
        lista_productos_texto = json.dumps(lista_productos)

        prompt = 'Necesito crear un json con esta estructura a partir del siguiente enunciado :' + data['text'] + '. Tengo una base de datos con los siguientes productos :'
        json_result = '. El json resultante debe tener la siguiente estructura : {"id_cliente": numero,"total_pedido": numero,"productos": [{"id_producto": numero,"cantidad_producto": numero},{"id_producto": numero,"cantidad_producto": numero}]}.'
        final = 'El campo id_cliente sera' + str(data['id_cliente']) + 'Dame solo el json resultante, sin texto adicional.'
        total = '. El campo total_pedido debe ser calculado multiplicando el precio de cada producto por su cantidad respectiva. Luego, suma todas estas multiplicaciones para obtener el total del pedido. Por ejemplo, si el pedido contiene 2 productos del id_producto 1 (cuyo precio es 10) y 3 productos del id_producto 2 (cuyo precio es 20), el total_pedido sería (2*10) + (3*20) = 80.'
        aclaracion = 'si el enunciado no se entiende, devolver en json un mensaje de error con el texto "No se pudo generar el pedido"'

        response = model.generate_content(prompt + lista_productos_texto + json_result + final + total + aclaracion)

        print(response.text)

        agregar_producto_gemini(response.text)
        
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rutas para autenticación
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


########################################################################################

# Rutas para clientes
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
    
@app.route('/clientes/<int:id>', methods=['DELETE'])
def eliminar_cliente(id):
    try:
        cliente = Cliente.query.get(id)
        if cliente:
            db.session.delete(cliente)
            db.session.commit()
            return jsonify({'mensaje': 'Cliente eliminado exitosamente!'})
        else:
            return jsonify({'error': 'Cliente no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

########################################################################################

# Rutas para vendedores
@app.route('/vendedores', methods=['GET'])
def list_sellers():
    try:
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
    
@app.route('/vendedores/<int:id>', methods=['DELETE'])
def eliminar_vendedor(id):
    try:
        vendedor = Vendedor.query.get(id)
        if vendedor:
            db.session.delete(vendedor)
            db.session.commit()
            return jsonify({'mensaje': 'Vendedor eliminado exitosamente!'})
        else:
            return jsonify({'error': 'Vendedor no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

########################################################################################


# Rutas para productos
@app.route('/productos', methods=['GET'])
def list_product():
    try:
        categoria = request.args.get('categoria')
        if categoria:
            productos = Producto.get_products_by_category(categoria)
        else:
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
    try:
        producto = Producto.query.get(id)
        if producto:
            db.session.delete(producto)
            db.session.commit()
            return jsonify({'mensaje': 'Producto eliminado exitosamente!'})
        else:
            return jsonify({'error': 'Producto no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500



########################################################################################


# Rutas para pedidos
def enviar_correo_pedido(cliente, total_pedido, productos_info):
    mensaje = Message('Detalles de su pedido', recipients=[app.config['MAIL_DEFAULT_SENDER']])
    mensaje.body = f"""
    ¡Hola {cliente.nombre}!

    Gracias por su compra. Aquí están los detalles de su pedido:

    Total del pedido: ${total_pedido}

    Productos comprados:
    """
    for producto in productos_info:
        mensaje.body += f"\n- {producto['nombre_producto']} x{producto['cantidad']} - ${producto['precio']} cada uno"

    mensaje.body += "\n\nGracias por su preferencia."

    mail.send(mensaje)


@app.route('/pedido', methods=['POST'])
def agregar_pedido():
    try:
        data = request.json

        id_cliente = data['id_cliente']
        total_pedido = data['total_pedido']

        nuevo_pedido = Pedido(
            id_cliente=id_cliente,
            total_pedido=total_pedido
        )
        db.session.add(nuevo_pedido)
        db.session.commit()

        productos_info = []

        for producto_pedido in data['productos']:
            nuevo_pedido_producto = ProductoPedido(
                id_pedido=nuevo_pedido.id_pedido,
                id_producto=producto_pedido['id_producto'],
                cantidad_producto=producto_pedido['cantidad_producto']
            )
            db.session.add(nuevo_pedido_producto)

            producto = db.session.query(Producto).filter_by(id=producto_pedido['id_producto']).first()
            productos_info.append({
                'nombre_producto': producto.nombre,
                'cantidad': producto_pedido['cantidad_producto'],
                'precio': producto.precio
            })

        db.session.commit()

        cliente = db.session.query(Cliente).filter_by(id=id_cliente).first()

        enviar_correo_pedido(cliente, total_pedido, productos_info)

        return jsonify({
            'mensaje': 'Pedido realizado exitosamente!'
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def agregar_producto_gemini(data_string):
    try:
        data = json.loads(data_string)
        id_cliente = data['id_cliente']
        total_pedido = data['total_pedido']

        nuevo_pedido = Pedido(
            id_cliente=id_cliente,
            total_pedido=total_pedido
        )
        db.session.add(nuevo_pedido)
        db.session.commit()

        productos_info = []
        for producto_pedido in data['productos']:
            nuevo_producto = ProductoPedido(
                id_pedido=nuevo_pedido.id_pedido,
                id_producto=producto_pedido['id_producto'],
                cantidad_producto=producto_pedido['cantidad_producto']
            )
            db.session.add(nuevo_producto)
        
        producto = db.session.query(Producto).filter_by(id=producto_pedido['id_producto']).first()
        productos_info.append({
            'nombre_producto': producto.nombre,
            'cantidad': producto_pedido['cantidad_producto'],
            'precio': producto.precio
        })

        db.session.commit()

        cliente = db.session.query(Cliente).filter_by(id=id_cliente).first()

        enviar_correo_pedido(cliente, total_pedido, productos_info)

        print('Pedido de Gemini agregado exitosamente!', total_pedido)
        return jsonify({'mensaje': 'Pedido de Gemini agregado exitosamente!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/pedido-producto', methods=['GET'])
def get_orders_products():
    orders = Pedido.get_all_orders()
    result = []

    for order in orders:
        for product_order in order.producto:
            result.append({
                'id_pedido': order.id_pedido,
                'id_cliente': order.id_cliente,
                'total_pedido': order.total_pedido,
                'fecha_pedido': order.fecha_pedido,
                "estado_pedido": order.estado_pedido,
                'id_producto': product_order.id_producto,
                'cantidad_producto': product_order.cantidad_producto
            })

    return jsonify(result)


@app.route('/pedido', methods=['GET'])
def get_orders():
    orders = Pedido.get_all_orders()
    result = []

    for order in orders:
        result.append({
            'id_pedido': order.id_pedido,
            'id_cliente': order.id_cliente,
            'total_pedido': order.total_pedido,
            'fecha_pedido': order.fecha_pedido,
            "estado_pedido": order.estado_pedido
        })

    return jsonify(result)