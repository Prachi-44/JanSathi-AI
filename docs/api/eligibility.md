# Eligibility API

## `POST /api/v1/eligibility/check`

Checks a citizen profile against the curated MVP scheme dataset.

### Request

```json
{
  "age": 38,
  "gender": "female",
  "occupation": "farmer",
  "income": 150000,
  "state": "Maharashtra",
  "disability_status": false,
  "category": "OBC",
  "student_status": false,
  "farmer_status": true,
  "employment_status": "self_employed"
}
```

### Response

```json
{
  "eligible_schemes": [],
  "ineligible_schemes": [],
  "profile_summary": {
    "state": "Maharashtra",
    "income": 150000
  }
}
```
