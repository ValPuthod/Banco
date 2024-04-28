from pydantic import BaseModel
from app.schemas.token import Token
from app.schemas.user import ShowUser


class UserToken(BaseModel):
    token: Token
    user: ShowUser
