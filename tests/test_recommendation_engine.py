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

    for key in ["occupation", "income", "state", "age", "category", "gender", "special_flags"]:
        assert key in breakdown

    assert breakdown["occupation"] is True
    assert breakdown["income"] is True
    assert breakdown["state"] is True
    assert 0 <= score <= 100


def test_student_profile_prioritizes_scholarships_over_farmer_schemes() -> None:
    profile = EligibilityRequest(
        name="Student Citizen",
        consent=True,
        age=19,
        gender="female",
        occupation="student",
        income=90000,
        state="Maharashtra",
        disability_status=False,
        category="SC",
        student_status=True,
        farmer_status=False,
        employment_status="student",
        rural_resident=False,
        has_pucca_house=True,
        has_bank_account=True,
    )

    repo = _repository()
    scholarship = repo.get_by_name("National Scholarship Portal - Post-Matric Scholarship for SC Students")
    pm_kisan = repo.get_by_name("PM Kisan Samman Nidhi")
    assert scholarship is not None
    assert pm_kisan is not None

    rec_engine = RecommendationEngine(profile)
    scholarship_score, _ = rec_engine.score_scheme(scholarship)
    pm_kisan_score, _ = rec_engine.score_scheme(pm_kisan)

    assert scholarship_score >= 70
    assert pm_kisan_score <= 40
