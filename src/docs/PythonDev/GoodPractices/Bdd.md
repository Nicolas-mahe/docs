# Base de donnée

### 1. Configuration de la base de données (`utils/db_connection.py`)
```python
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')

DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

def init_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
```

### 2. Modèles (`models/user.py`)
```python
from utils.db_connection import db
from typing import Optional

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    
    def __init__(self, name: str, email: str, phone: Optional[str] = None):
        self.name = name
        self.email = email
        self.phone = phone
```

### 3. Initialisation de l'application (`app.py`)
```python
from flask import Flask
from utils.db_connection import init_database

from models.user import User

app = Flask(__name__)

init_database(app)

```

## Points clés de cette architecture

- **Instance unique** : Une seule instance `db` dans `utils/db_connection.py`
- **Import direct** : Chaque modèle importe `db` depuis `utils.db_connection`
- **Import explicite** : Tous les modèles sont importés dans `app.py` de manière claire pour la création des tables
- **Types annotés** : Paramètres typés avec `Optional` pour les champs optionnels
- **Séparation claire** : Configuration DB séparée de la logique métier, permettant un gestion des objets simple à maintenir