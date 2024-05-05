from typing import List
from fastapi import status
from fastapi import Depends
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.schemas.user_token import UserToken
from fastapi import APIRouter, HTTPException
from app.db.models.user import User, create_new_user, update_password, update_user
from app.schemas.user import PasswordUpdate, ShowUser, UserCreate, UserLogin, UserProfileUpdate
from app.utils.user import authenticate_user_token, create_access_token, authenticate_user_credentials

router = APIRouter()


@router.post("/register", response_model=UserToken, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    is_exist = db.query(User).filter(User.email == user.email).first()
    if is_exist:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exist with this email!",
        )

    user = create_new_user(user=user, db=db)
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user.to_dict()}


@router.post("/login", response_model=UserToken)
def login_for_access_token(user_data: UserLogin, db: Session = Depends(get_db)):
    is_exist = db.query(User).filter(User.email == user_data.email).first()
    if not is_exist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No user exist with this email!",
        )

    user = authenticate_user_credentials(
        user_data.email, user_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password!",
        )
    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user.to_dict()}


@router.get("/me", response_model=ShowUser, status_code=status.HTTP_200_OK)
def get_current_user(current_user: ShowUser = Depends(authenticate_user_token)):

    return current_user.to_dict()


@router.put("/profile", response_model=ShowUser, status_code=status.HTTP_200_OK)
def update_user_profile(user_payload: UserProfileUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    user = update_user(current_user, user_payload, db)

    return user


@router.put("/password", status_code=status.HTTP_200_OK)
def update_user_password(password_payload: PasswordUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    is_updated = update_password(current_user.email, password_payload, db)

    if not is_updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to updated password!",
        )

    return {"detail": "Password updated successfully!"}


@router.get("/users", response_model=List[ShowUser], status_code=status.HTTP_200_OK)
def get_all_users(current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    users = db.query(User).filter(
        User.email != current_user.email).order_by(User.id).all()

    return [user.to_dict() for user in users]
