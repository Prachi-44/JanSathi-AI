import json
from pathlib import Path

def main():
    data_path = Path("../data/schemes.json")
    if not data_path.exists():
        data_path = Path("data/schemes.json")
        
    with open(data_path, "r", encoding="utf-8") as f:
        schemes = json.load(f)
        
    names = {s["scheme_name"] for s in schemes}
    
    new_schemes = [
        {
            "scheme_name": "Mukhyamantri Majhi Ladki Bahin Yojana",
            "category": "Women Welfare",
            "state": "Maharashtra",
            "eligibility": ["Maharashtra resident", "Woman aged 21 to 65 years", "Income below Rs. 2.5 Lakh per year", "Valid bank account linked with Aadhaar"],
            "income_limit": 250000,
            "benefit": "Rs. 1,500 per month financial assistance",
            "documents": ["Aadhaar", "Ration card", "Domicile certificate", "Income certificate", "Bank details"],
            "application_process": "Apply online through the Nari Shakti Doot App or local Anganwadi/social welfare office.",
            "official_website": "https://ladkibahin.maharashtra.gov.in/",
            "keywords": ["ladki bahin", "women support", "Maharashtra", "monthly assistance", "cash transfer"],
            "summary": "Monthly financial support of Rs. 1500 for eligible women residents of Maharashtra."
        },
        {
            "scheme_name": "Namo Shetkari Mahasaman Yojana",
            "category": "Farmer",
            "state": "Maharashtra",
            "eligibility": ["Maharashtra resident", "Landholder farmer", "Registered under PM-Kisan scheme"],
            "income_limit": 0,
            "benefit": "Rs. 6,000 per year in three equal instalments",
            "documents": ["Aadhaar", "Land records (7/12 & 8A)", "PM Kisan registration details", "Bank details"],
            "application_process": "Register on the Namo Shetkari portal; eligible PM-Kisan farmers from Maharashtra are automatically matched and verified.",
            "official_website": "https://nsmy.maharashtra.gov.in/",
            "keywords": ["farmer", "Maharashtra", "income support", "PM Kisan", "shetkari"],
            "summary": "Additional direct income support of Rs. 6000 per year for farmers of Maharashtra."
        },
        {
            "scheme_name": "Ramai Awas Yojana",
            "category": "Housing",
            "state": "Maharashtra",
            "eligibility": ["Maharashtra resident", "SC or ST or Neo-Buddhist category", "Low income household", "No pucca house"],
            "income_limit": 120000,
            "benefit": "Financial assistance for construction of a pucca house in rural/urban areas",
            "documents": ["Aadhaar", "Caste certificate", "Income certificate", "Ration card", "Land/residence proof"],
            "application_process": "Apply online through the Maha Awas portal or submit application to Gram Panchayat / Block Development Officer.",
            "official_website": "https://rdd.maharashtra.gov.in/",
            "keywords": ["housing", "Maharashtra", "SC", "ST", "pucca house", "Ramai"],
            "summary": "Housing assistance for Scheduled Caste and Scheduled Tribe families in Maharashtra."
        }
    ]
    
    added_count = 0
    for ns in new_schemes:
        if ns["scheme_name"] not in names:
            schemes.append(ns)
            added_count += 1
            print(f"Added scheme: {ns['scheme_name']}")
            
    if added_count > 0:
        with open(data_path, "w", encoding="utf-8") as f:
            json.dump(schemes, f, indent=2, ensure_ascii=False)
        print(f"Successfully added {added_count} schemes. Total schemes: {len(schemes)}")
    else:
        print("All schemes already exist in dataset.")

if __name__ == "__main__":
    main()
