from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    first_name: str = None
    last_name: str = None
    phone: str = None
    company: str = None
    is_admin: bool = False


class UserProfileUpdate(BaseModel):
    first_name: str = None
    last_name: str = None
    phone: str = None
    company: str = None


class ShowUser(BaseModel):
    id: int
    email: EmailStr
    first_name: str = None
    last_name: str = None
    phone: str = None
    company: str = None
    is_admin: bool = False

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=4)


class PasswordUpdate(BaseModel):
    current_password: str = Field(min_length=6)
    new_password: str = Field(min_length=6)
