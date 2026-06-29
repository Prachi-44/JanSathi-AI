from fastapi import APIRouter, Depends

from models.scheme import Scheme
from services.scheme_repository import SchemeRepository, get_scheme_repository

router = APIRouter(prefix="/schemes", tags=["schemes"])


@router.get("", response_model=list[Scheme])
async def list_schemes(repository: SchemeRepository = Depends(get_scheme_repository)) -> list[Scheme]:
    return repository.list_schemes()
