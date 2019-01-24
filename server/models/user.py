from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from utils.helpers import encode
from config import SQLALCHEMY_DATABASE_URI

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class User(base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    age = Column(Integer, default=18)
    country = Column(String)
    balance = Column(Integer)
    key = Column(String)

    def __init__(self, name, email, password, country, age):
        self.name = name
        self.email = email
        self.password = password
        self.country = country
        self.age = age
        self.balance = 1000
        self.key = encode(str('{}:{}'.format(self.email, self.password)).encode('utf-8'))

    def __repr__(self):
        return '<User(name={}, email={}, password={}, country={}, age={}, balance={})>'\
            .format(self.name, self.email, self.password, self.country, self.age, self.balance)

    def to_json(self):
        return {
            'name': self.name,
            'email': self.email,
            'country': self.country,
            'age': self.age,
            'balance': self.balance
        }


base.metadata.create_all(engine)
