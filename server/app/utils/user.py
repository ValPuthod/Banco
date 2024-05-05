from typing import Optional
from jose import JWTError, jwt
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.core.hashing import Hasher
from app.core.config import settings
from datetime import datetime, timedelta
from app.db.models.user import get_user_by_email
from fastapi import Depends, HTTPException, Request, status


def authenticate_user_token(request: Request, db: Session = Depends(get_db)):
    """
    Authenticate user based on the JWT token passed in the request headers.
    Raises HTTPException if token is invalid or user does not exist.
    """
    try:
        # Decode the JWT to extract user email
        email = decode_access_token(
            request.headers.get('Authorization', ''))
        # Retrieve user by email from the database
        user = get_user_by_email(email=email, db=db)
        if not user:
            # User not found or token was invalid
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid access token!",
            )
        return user
    except JWTError:
        # Error in decoding the JWT, likely due to manipulation or expiration
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token!")


def authenticate_user_credentials(email: str, password: str, db: Session):
    """
    Authenticate user credentials by verifying the email and password.
    Returns the user object if authentication is successful, False otherwise.
    """
    # Retrieve user by email from the database
    user = get_user_by_email(email=email, db=db)
    if not user:
        # No user found with the given email
        return False
    if not Hasher.verify_password(password, user.password):
        # Password does not match
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create a JWT access token that expires in a given timedelta or the default set in settings.
    """
    to_encode = data.copy()
    if expires_delta:
        # Set expiration with provided delta
        expire = datetime.utcnow() + expires_delta
    else:
        # Default expiration time from settings
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode.update({"exp": expire})
    # Encode the JWT token
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def decode_access_token(access_token: str):
    """
    Decode the JWT access token to extract the subject (sub) which contains the user's email.
    """
    # Decode the JWT
    decoded_jwt = jwt.decode(access_token,
                             settings.SECRET_KEY, settings.ALGORITHM)
    return decoded_jwt['sub']
