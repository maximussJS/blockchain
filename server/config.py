import os
from dotenv import load_dotenv


dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

DEBUG = True

SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

SQLALCHEMY_TRACK_MODIFICATIONS = False

SECRET_KEY = os.getenv('SECRET_KEY')

SECURITY_PASSWORD_SALT = 'SALT'

DATABASE = {
    'drivername': 'postgresql',
    'host': 'localhost',
    'username': os.getenv('DATABASE_USERNAME'),
    'password': os.getenv('DATABASE_PASSWORD'),
    'database': os.getenv('DATABASE_NAME')
}
