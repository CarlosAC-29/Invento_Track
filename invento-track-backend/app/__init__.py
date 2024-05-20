from flask import Flask
from flask_mail import Mail, Message
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
mail = Mail()

CORS(app)
app.config.from_object(Config)
mail.init_app(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models
