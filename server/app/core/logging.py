import logging


def getLogger():
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(levelname)s - %(message)s')
    logger = logging.getLogger('banco')
    logger.setLevel(logging.INFO)
    return logger
