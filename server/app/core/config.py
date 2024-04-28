import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    PROJECT_NAME: str = "Banco"
    PROJECT_VERSION: str = "1.0.0"

    DATABASE_URL = os.getenv("DATABASE_URL")

    SECRET_KEY: str = os.getenv("SECRET_KEY", "DEFAULT_KEY")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30000


settings = Settings()
