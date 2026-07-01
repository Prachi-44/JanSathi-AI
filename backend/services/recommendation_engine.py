import re
from typing import Any
from models.scheme import Scheme

class RecommendationEngine:
    def __init__(self, profile) -> None:
        self.profile = profile

    def score_scheme(self, scheme: Scheme) -> tuple[int, dict[str, bool]]:
        """
        Calculates match score out of 100 based on formula:
        Score = Occupation (30) + Income (25) + State (20) + Age (15) + Category (10)
        """
        breakdown = {
            "occupation": False,
            "income": False,
            "state": False,
            "age": False,
            "category": False
        }
        
        # 1. Occupation Match (Max 30)
        occ_score = 0
        user_occ = self.profile.occupation.lower()
        
        scheme_keywords = [k.lower() for k in scheme.keywords]
        scheme_text = (scheme.scheme_name + " " + scheme.summary + " " + " ".join(scheme.eligibility)).lower()
        
        if any(kw in user_occ or user_occ in kw for kw in scheme_keywords if len(kw) > 2):
            occ_score = 30
            breakdown["occupation"] = True
        elif any(term in scheme_text for term in user_occ.split()):
            occ_score = 20
            breakdown["occupation"] = True
        elif self.profile.farmer_status and scheme.category.lower() == "farmer":
            occ_score = 30
            breakdown["occupation"] = True
        elif self.profile.student_status and "student" in scheme_text:
            occ_score = 30
            breakdown["occupation"] = True
        else:
            occ_score = 10
            
        # 2. Income Match (Max 25)
        inc_score = 0
        if not scheme.income_limit or scheme.income_limit == 0:
            inc_score = 25
            breakdown["income"] = True
        elif self.profile.income <= scheme.income_limit:
            ratio = self.profile.income / scheme.income_limit
            inc_score = int((1.0 - ratio) * 15) + 10  # range 10 to 25
            breakdown["income"] = True
            
        # 3. State Match (Max 20)
        state_score = 0
        if scheme.state == "All India":
            state_score = 15  
            breakdown["state"] = True
        elif scheme.state.lower() == self.profile.state.lower():
            state_score = 20  
            breakdown["state"] = True
            
        # 5. Age Match (Max 15)
        age_score = 0
        user_age = self.profile.age
        
        is_senior = user_age >= 60
        is_child = user_age <= 18
        
        scheme_lower = scheme.scheme_name.lower()
        
        if "senior" in scheme_lower or "old age" in scheme_lower:
            if is_senior:
                age_score = 15
                breakdown["age"] = True
            else:
                age_score = 0
        elif "scholarship" in scheme_lower or "student" in scheme_lower:
            if user_age <= 25:
                age_score = 15
                breakdown["age"] = True
            else:
                age_score = 5
        elif "sukanya" in scheme_lower:
            if user_age <= 10:
                age_score = 15
                breakdown["age"] = True
            else:
                age_score = 0
        else:
            age_score = 15
            breakdown["age"] = True
            
        # 6. Category Match (Max 10)
        cat_score = 0
        user_cat = self.profile.category.lower()
        
        scheme_el_text = " ".join(scheme.eligibility).lower() + " " + scheme.scheme_name.lower()
        
        if user_cat in scheme_el_text:
            cat_score = 10
            breakdown["category"] = True
        elif user_cat == "general":
            if not any(x in scheme_el_text for x in ["sc student", "obc student", "st student", "scheduled caste", "scheduled tribe", "backward class"]):
                cat_score = 10
                breakdown["category"] = True
            else:
                cat_score = 2
        else:
            cat_score = 8
            breakdown["category"] = True
            
        total_score = occ_score + inc_score + state_score + age_score + cat_score
        total_score = max(0, min(100, total_score))
        
        return total_score, breakdown
