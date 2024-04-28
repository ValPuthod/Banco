from app.db.base import Base
from app.core.hashing import Hasher
from app.schemas.user import PasswordUpdate, UserCreate, UserProfileUpdate, ShowUser
from sqlalchemy.orm import Session
from sqlalchemy import Boolean, Column, Integer, String


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    company = Column(String, nullable=False)
    is_admin = Column(Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'company': self.company,
            'is_admin': self.is_admin,
        }


def create_new_user(user: UserCreate, db: Session):
    user = User(
        email=user.email,
        password=Hasher.get_password_hash(user.password),
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        company=user.company,
        is_admin=user.is_admin
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(user: ShowUser, user_payload: UserProfileUpdate, db: Session):
    for key, value in user_payload.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(email: str, db: Session):
    user = db.query(User).filter(User.email == email).first()
    return user if user else None


def update_password(email: str, password_payload: PasswordUpdate, db: Session):
    user = db.query(User).filter(User.email == email).first()

    if not user or not Hasher.verify_password(password_payload.current_password, user.password):
        return False

    user.password = Hasher.get_password_hash(password_payload.new_password)
    db.commit()
    db.refresh(user)
    return True
