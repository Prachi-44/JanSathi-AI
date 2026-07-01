import pytest
from pathlib import Path
from schemas.eligibility import EligibilityRequest
from services.recommendation_engine import RecommendationEngine
from services.scheme_repository import SchemeRepository

def _repository() -> SchemeRepository:
    return SchemeRepository(Path(__file__).resolve().parents[1] / "data" / "schemes.json")

def test_recommendation_calculation_is_accurate() -> None:
    profile = EligibilityRequest(
        name="Test Farmer",
        consent=True,
        age=35,
        gender="male",
        occupation="farmer",
        income=120000,
        state="Maharashtra",
        disability_status=False,
        category="General",
        student_status=False,
        farmer_status=True,
        employment_status="self_employed",
        rural_resident=True,
        has_pucca_house=False,
        has_bank_account=True,
    )
    
    repo = _repository()
    pm_kisan = repo.get_by_name("PM Kisan Samman Nidhi")
    assert pm_kisan is not None
    
    rec_engine = RecommendationEngine(profile)
    score, breakdown = rec_engine.score_scheme(pm_kisan)
    
    # Assert breakdown has all required keys
    for key in ["occupation", "income", "state", "age", "category"]:
        assert key in breakdown
        
    # Since profile occupation is farmer and PM Kisan is for farmers, occupation should be True
    assert breakdown["occupation"] is True
    # Since PM Kisan has no income limit, income should match
    assert breakdown["income"] is True
    # Since PM Kisan is All India, state should match
    assert breakdown["state"] is True
    
    # Total score should be a valid percentage
    assert 0 <= score <= 100
