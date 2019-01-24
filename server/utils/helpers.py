import jwt
import json
import hashlib
import asyncpg
from config import SECRET_KEY


def encode(data: str) -> str:
    return hashlib.md5(data).hexdigest()


def get_token(payload: dict) -> str:
    return jwt.encode(payload=payload, key=SECRET_KEY, algorithm='HS256')


def user_record_to_json(r: asyncpg.Record) -> dict:
    return {
        'name': r['name'],
        'email': r['email'],
        'country': r['country'],
        'age': r['age'],
        'balance': r['balance']
    }


def transfer_record_to_json(t: asyncpg.Record) -> dict:
    return {
        'master': t['master'],
        'whom': t['whom'],
        'amount': t['amount'],
        'time': str(t['time']),
        'transfer_hash': t['transfer_hash']
    }


def transfer_record_to_json_string(t: asyncpg.Record) -> str:
    return json.dumps(transfer_record_to_json(t), separators=(',', ':'))
