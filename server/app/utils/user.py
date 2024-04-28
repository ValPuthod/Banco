from typing import Optional
from datetime import datetime
from datetime import timedelta
from jose import JWTError, jwt
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.hashing import Hasher
from app.db.models.user import get_user_by_email
from fastapi import Depends, HTTPException, Request, status


def authenticate_user_token(request: Request, db: Session = Depends(get_db)):
    try:
        email = decode_access_token(
            request.headers.get('Authorization', ''))
        user = get_user_by_email(email=email, db=db)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid access token!",
            )
        return user.to_dict()
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid access token!")


def authenticate_user_credentials(email: str, password: str, db: Session):
    user = get_user_by_email(email=email, db=db)
    if not user:
        return False
    if not Hasher.verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def decode_access_token(access_token: str):
    decoded_jwt = jwt.decode(access_token,
                             settings.SECRET_KEY, settings.ALGORITHM)
    return decoded_jwt['sub']
