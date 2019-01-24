import logging
import time


logger = logging.getLogger()

if logger.handlers:
    for handler in logger.handlers:
        logger.removeHandler(handler)

logging.basicConfig(
        filename='log.txt',
        level=logging.DEBUG,
        format='%(levelname)-8s [%(asctime)s.%(msecs)03d]' '(%(name)s): %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
)

logging.Formatter.converter = time.gmtime

log_format = '%a (%{X-Real-IP}i) %t "%r" %s %b %Tf ' '"%{Referrer}i" "%{User-Agent}i"'
