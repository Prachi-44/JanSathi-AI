from fastapi import APIRouter, Depends

from schemas.eligibility import EligibilityRequest, EligibilityResponse
from services.database import mongo_manager
from services.eligibility_engine import EligibilityEngine
from services.scheme_repository import SchemeRepository, get_scheme_repository

router = APIRouter(prefix="/eligibility", tags=["eligibility"])


@router.post("/check", response_model=EligibilityResponse)
async def check_eligibility(
    payload: EligibilityRequest,
    repository: SchemeRepository = Depends(get_scheme_repository),
) -> EligibilityResponse:
    engine = EligibilityEngine(repository.list_schemes())
    response = engine.evaluate(payload)
    await mongo_manager.save_eligibility_result(
        {
            "profile": payload.model_dump(),
            "eligible_scheme_names": [item.scheme.scheme_name for item in response.eligible_schemes],
            "ineligible_scheme_names": [item.scheme.scheme_name for item in response.ineligible_schemes],
        }
    )
    return response
