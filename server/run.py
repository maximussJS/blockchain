import asyncio
from aiohttp import web
from app import init_app
from logs.logger import logger, log_format


if __name__ == '__main__':
    try:
        loop = asyncio.get_event_loop()
        app = loop.run_until_complete(init_app())
        logger.info('Server started')
        web.run_app(app, access_log=logger, access_log_format=log_format)
        logger.info('Server was stopped')
    except Exception as e:
        logger.warning(e)
