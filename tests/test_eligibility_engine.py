from pathlib import Path

from schemas.eligibility import EligibilityRequest
from services.eligibility_engine import EligibilityEngine
from services.scheme_repository import SchemeRepository


def _engine() -> EligibilityEngine:
    repository = SchemeRepository(Path(__file__).resolve().parents[1] / "data" / "schemes.json")
    return EligibilityEngine(repository.list_schemes())


def test_farmer_in_maharashtra_receives_pm_kisan_and_health_options() -> None:
    profile = EligibilityRequest(
        age=38,
        gender="female",
        occupation="farmer",
        income=150000,
        state="Maharashtra",
        disability_status=False,
        category="OBC",
        student_status=False,
        farmer_status=True,
        employment_status="self_employed",
        rural_resident=True,
        has_pucca_house=False,
        has_bank_account=True,
    )

    result = _engine().evaluate(profile)
    names = {decision.scheme.scheme_name for decision in result.eligible_schemes}

    assert "PM Kisan Samman Nidhi" in names
    assert "Ayushman Bharat PM-JAY" in names
    assert "Pradhan Mantri Awas Yojana - Gramin" in names
    assert "Mahatma Jyotirao Phule Jan Arogya Yojana" not in names


def test_sc_student_receives_sc_scholarships() -> None:
    profile = EligibilityRequest(
        age=19,
        gender="male",
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

    result = _engine().evaluate(profile)
    names = {decision.scheme.scheme_name for decision in result.eligible_schemes}

    assert "National Scholarship Portal - Post-Matric Scholarship for SC Students" in names
    assert "National Scholarship Portal - Post-Matric Scholarship for OBC Students" not in names
