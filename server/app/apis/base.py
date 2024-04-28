from app.apis import user_routes
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(user_routes.router, tags=["user"])
