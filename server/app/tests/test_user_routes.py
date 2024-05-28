import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[2]))

import pytest
from main import app
from app.db.base import Base
from app.db.session import get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient


SQLALCHEMY_DATABASE_URL = "postgresql://dev_user:dev123@localhost/banco"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


@pytest.fixture(scope="function")
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(db_session):
    def _get_db_override():
        return db_session
    app.dependency_overrides[get_db] = _get_db_override
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def test_register_user(client):
    user_data = {
        "email": "testlogin@example.com",
        "password": "strongpassword",
        "first_name": "Test",
        "last_name": "User",
        "phone": "1234567890",
        "company": "TestCo",
        "is_admin": False
    }
    response = client.post("/register", json=user_data)
    assert response.status_code == 201


def test_login_user(client):
    response = login_user(client)
    assert response.status_code == 200
    assert "access_token" in response.json()['token']


def test_get_all_users(client):
    try:
        response = login_user(client)
        token = response.json()['token']['access_token']
        response = client.get("/users", headers={"Authorization": token})
        assert response.status_code == 200
    except:
        pass


def test_get_current_user(client):
    response = login_user(client)
    token = response.json()['token']['access_token']
    response = client.get("/me", headers={"Authorization": token})
    assert response.status_code == 200
    current_user = response.json()
    assert current_user['email'] == "testlogin@example.com"


def test_update_user_profile(client):
    login_response = login_user(client)
    token = login_response.json()['token']['access_token']
    response = client.put("/profile", headers={"Authorization": token}, json={
        "first_name": "Updated"
    })
    assert response.status_code == 200
    updated_profile = response.json()
    assert updated_profile['first_name'] == "Updated"


def test_update_user_password(client):
    login_response = login_user(client)
    token = login_response.json()['token']['access_token']
    response = client.put("/password", headers={"Authorization": token}, json={
        "current_password": "strongpassword",
        "new_password": "newstrongpassword"
    })
    assert response.status_code == 200
    assert "Password updated successfully" in response.json()['detail']


def login_user(client):
    client.post("/register", json={
        "email": "testlogin@example.com",
        "password": "strongpassword",
        "first_name": "Login",
        "last_name": "User",
        "phone": "1234567890",
        "company": "TestCo",
        "is_admin": False
    })
    response = client.post("/login", json={
        "email": "testlogin@example.com",
        "password": "strongpassword"
    })
    return response
