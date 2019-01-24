import aiohttp_cors
from asyncpg import create_pool
from aiohttp import web
from aiojobs.aiohttp import setup
from routes.router import routes
from config import SQLALCHEMY_DATABASE_URI


async def engine_pool(app: web.Application):
    app['pool'] = await create_pool(SQLALCHEMY_DATABASE_URI)
    yield
    await app['pool'].close()


async def init_app() -> web.Application:
    app = web.Application()
    app.add_routes(routes)
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })
    for route in list(app.router.routes()):
        cors.add(route)
    setup(app)
    app.cleanup_ctx.append(engine_pool)
    return app
