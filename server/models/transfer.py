import datetime
from utils.helpers import encode
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
base = declarative_base()


class Transfer(base):
    __tablename__ = 'transfers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    transfer_hash = Column(String)
    master = Column(String)
    whom = Column(String)
    amount = Column(Integer)
    time = Column(String)

    def __init__(self, master, whom, amount, prev=''):
        self.master = master
        self.whom = whom
        self.amount = amount
        self.time = str(datetime.datetime.now())
        self.transfer_hash = encode(prev.encode('utf-8'))

    def __repr__(self):
        return '<Transfer(master={}, whom={}, amount={}, at={} hash={})>'\
               .format(self.master, self.whom, self.amount, self.time, self.transfer_hash)

    def to_json(self):
        return {
            'master': self.master,
            'whom': self.whom,
            'amount': self.amount,
            'time': self.time,
            'hash': self.transfer_hash
        }


base.metadata.create_all(engine)
