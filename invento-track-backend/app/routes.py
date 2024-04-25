from app import app, db

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