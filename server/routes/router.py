from aiohttp.web import RouteTableDef, json_response
from aiohttp.web_request import Request
from aiojobs.aiohttp import atomic
from logs.logger import logger
from models.user import User
from models.transfer import Transfer
from utils.responses import success_response, failure_response, server_error_response
from utils.helpers import user_record_to_json, encode, get_token, \
                          transfer_record_to_json, transfer_record_to_json_string

routes = RouteTableDef()


@routes.get('/')
@atomic
async def home(request: Request) -> json_response:
    try:
        pool = request.app['pool']
        async with pool.acquire() as conn:
            transfers = await conn.fetch('SELECT * FROM transfers')
            return success_response(200, 'ok', data=list(map(lambda t: transfer_record_to_json(t), transfers)))
    except Exception as e:
        return server_error_response(e)


@routes.post('/login')
@atomic
async def login(request: Request) -> json_response:
    try:
        user = await request.json()
        if 8 > len(user['email']) > 20:
            return failure_response(400, 'Invalid email length')
        if 8 > len(user['password']) > 20:
            return failure_response(400, 'Invalid password length')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            users = await conn.fetch('SELECT * FROM users WHERE email=\'{}\''.format(user['email']))
            if len(users) == 0:
                return failure_response(401, 'Invalid email or password')
            else:
                if users[0]['password'] != encode(str(user['password']).encode('utf-8')):
                    return failure_response(401, 'Invalid email or password')
                else:
                    token = get_token({'user': user_record_to_json(users[0]), 'key': users[0]['key']})
                    logger.info('User {} login at site'.format(user['email']))
                    return success_response(200, 'ok', token=token)
    except Exception as e:
        return server_error_response(e)


@routes.post('/register')
@atomic
async def register(request: Request) -> json_response:
    try:
        user = await request.json()
        if 8 > len(user['name']) > 20:
            return failure_response(400, 'Invalid name length')
        if 8 > len(user['email']) > 20:
            return failure_response(400, 'Invalid email length')
        if 8 > len(user['password']) > 20:
            return failure_response(400, 'Invalid email length')
        if 3 > len(user['country']) > 15:
            return failure_response(400, 'Invalid country')
        if user['age'] is None or 6 > int(user['age']) > 65:
            return failure_response(400, 'Invalid age')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            async with conn.transaction():
                usr = await conn.fetch('SELECT * FROM users WHERE email=\'{}\''.format(user['email']))
                if len(usr) == 0:
                    password_hash = encode(str(user['password']).encode('utf-8'))
                    u = User(name=user['name'], email=user['email'], password=password_hash,
                             age=user['age'], country=user['country'])
                    await conn.fetch('''INSERT INTO users (name,email,password,age,country,balance,key)
                                        VALUES (\'{}\', \'{}\', \'{}\', {}, \'{}\', {}, \'{}\')'''
                                     .format(u.name, u.email, u.password, u.age, u.country, u.balance, u.key))
                    token = get_token({'user': u.to_json(), 'key': u.key})
                    logger.info('Registrate new User(name={}, email={}, age={}, country={})'
                                .format(u.name, u.email, u.age, u.country))
                    return success_response(200, 'ok', token=token)
                else:
                    return failure_response(200, 'This login is already taken')
    except Exception as e:
        return server_error_response(e)


@routes.post('/transfer')
@atomic
async def new_transfer(request: Request) -> json_response:
    try:
        transfer = await request.json()
        if len(transfer['master']) < 0:
            return failure_response(403, 'Authorize please')
        if 8 > len(transfer['whom']) > 20:
            return failure_response(400, 'Invalid length of destination email')
        if transfer['amount'] is None or int(transfer['amount']) < 0:
            return failure_response(400, 'Invalid amount')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            async with conn.transaction():
                users = await conn.fetch('SELECT * FROM users WHERE key=\'{}\''.format(transfer['master']))
                if len(users) == 0:
                    return failure_response(403, 'Authorize please')
                else:
                    if users[0]['email'] == transfer['whom']:
                        return failure_response(400, 'Not bad')
                    if int(users[0]['balance']) < 0:
                        return failure_response(402, 'There is no money in your account')
                    if users[0]['balance'] < int(transfer['amount']):
                        return failure_response(400, 'There is not enough money in your account')
                    u_dests = await conn.fetch('SELECT * FROM users WHERE email=\'{}\''.format(transfer['whom']))
                    if len(u_dests) == 0:
                        return failure_response(400, 'No such destination email')
                    else:
                        dest = u_dests[0]
                        # how to get last element FUCK (MAX & LIMIT didn't work)
                        transfers = await conn.fetch('''SELECT * FROM transfers''')
                        t = Transfer(master=transfer['master'], amount=transfer['amount'],
                                     whom=transfer['whom'], prev=transfer_record_to_json_string(transfers[-1]))
                        await conn.fetch('''
                        INSERT INTO transfers (transfer_hash, master, whom, amount, time)
                        VALUES (\'{}\', \'{}\', \'{}\', {}, \'{}\')
                        '''.format(t.transfer_hash, users[0]['email'], t.whom, t.amount, t.time))
                        await conn.fetch('UPDATE users SET balance={}  WHERE email=\'{}\''
                                         .format((users[0]['balance'] - int(transfer['amount'])), users[0]['email']))
                        await conn.fetch('UPDATE users SET balance={}  WHERE email=\'{}\''
                                         .format((dest['balance'] + int(transfer['amount'])), dest['email']))
                        logger.info('New Transfer {} send {} to {}'
                                    .format(users[0]['email'], transfer['amount'], transfer['whom']))
                        return success_response(200, 'ok')
    except Exception as e:
        return server_error_response(e)


@routes.post('/token')
@atomic
async def get_token_by_key(request: Request) -> json_response:
    try:
        data = await request.json()
        if data['key'] is None or len(data['key']) < 10:
            return failure_response(401, 'Authorize please')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            users = await conn.fetch('SELECT * FROM users WHERE key=\'{}\''.format(data['key']))
            if len(users) == 0:
                return failure_response(401, 'Authorize please')
            else:
                token = get_token({'user': user_record_to_json(users[0]), 'key': users[0]['key']})
                return success_response(200, 'ok', token=token)
    except Exception as e:
        return server_error_response(e)


@routes.post('/transfers')
@atomic
async def get_user_transfers(request: Request) -> json_response:
    try:
        data = await request.json()
        if data['key'] is None or len(data['key']) < 10:
            return failure_response(401, 'Authorize please')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            users = await conn.fetch('SELECT * FROM users WHERE key=\'{}\''.format(data['key']))
            if len(users) == 0:
                return failure_response(401, 'Authorize please')
            else:
                transfers = await conn.fetch('SELECT * FROM transfers WHERE master=\'{}\''.format(users[0]['email']))
                return success_response(200, 'ok', data=list(map(lambda t: transfer_record_to_json(t), transfers)))
    except Exception as e:
        return server_error_response(e)


@routes.delete('/delete')
@atomic
async def delete_user(request: Request) -> json_response:
    try:
        data = await request.json()
        if data['key'] is None or len(data['key']) < 10:
            return failure_response(401, 'Authorize please')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            async with conn.transaction():
                users = await conn.fetch('SELECT * FROM users WHERE key=\'{}\''.format(data['key']))
                if len(users) == 0:
                    return failure_response(401, 'Authorize please')
                else:
                    await conn.fetch('''
                    DELETE FROM users WHERE email=\'{}\';
                    DELETE FROM transfers WHERE master=\'{}\'
                    '''.format(users[0]['email'], users[0]['email']))
                    logger.info('User {} was deleted (key={})'.format(users[0]['email'], data['key']))
                    return success_response(200, 'ok')
    except Exception as e:
        return server_error_response(e)


@routes.patch('/update')
@atomic
async def update_user(request: Request) -> json_response:
    try:
        data = await request.json()
        if data['key'] is None or len(data['key']) < 10:
            return failure_response(401, 'Authorize please')
        if len(data['update'].items()) == 0:
            return failure_response(400, 'Nothing to update')
        pool = request.app['pool']
        async with pool.acquire() as conn:
            async with conn.transaction():
                users = await conn.fetch('SELECT * FROM users WHERE key=\'{}\''.format(data['key']))
                if len(users) == 0:
                    return failure_response(401, 'Authorize please')
                else:
                    u = user_record_to_json(users[0])
                    u.update(data['update'])
                    await conn.fetch('''UPDATE users SET name=\'{}\',email=\'{}\',country=\'{}\',age={}
                                        WHERE key=\'{}\';'''
                                     .format(u['name'], u['email'], u['country'], u['age'], data['key']))
                token = get_token({'user': u, 'key': data['key']})
                return success_response(200, 'ok', token=token)
    except Exception as e:
        return server_error_response(e)


@routes.get('/check')
@atomic
async def check(request: Request) -> json_response:
    try:
        pool = request.app['pool']
        async with pool.acquire() as conn:
            tr = await conn.fetch('SELECT * FROM transfers')
            for i in range(1, len(tr)):
                if tr[i]['transfer_hash'] == encode(transfer_record_to_json_string(tr[i - 1]).encode('utf-8')):
                    logger.info(str(tr[i - 1]['id']) + ' : OK')
                else:
                    logger.info(str(tr[i - 1]['id']) + ' : WRONG')
        return success_response(200, 'ok')
    except Exception as e:
        return server_error_response(e)
