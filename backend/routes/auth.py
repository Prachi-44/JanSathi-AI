from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from schemas.auth import AuthResponse, UserCreate, UserLogin, UserPublic
from services.auth_service import authenticate_user, create_access_token, decode_access_token, register_user

router = APIRouter(prefix="/auth", tags=["auth"])
bearer_scheme = HTTPBearer(auto_error=True)


@router.post("/register", response_model=AuthResponse, status_code=201)
async def register(payload: UserCreate) -> AuthResponse:
    user = await register_user(payload)
    return AuthResponse(access_token=create_access_token(user), user=user)


@router.post("/login", response_model=AuthResponse)
async def login(payload: UserLogin) -> AuthResponse:
    user = await authenticate_user(payload)
    return AuthResponse(access_token=create_access_token(user), user=user)


@router.get("/me", response_model=UserPublic)
async def me(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> UserPublic:
    payload = decode_access_token(credentials.credentials)
    return UserPublic(
        id=str(payload["sub"]),
        full_name=str(payload["name"]),
        email=str(payload["email"]),
        state=str(payload["state"]),
    )
