# JanSathi AI

AI Powered Government Scheme Assistant for discovering relevant Indian government schemes.

The current milestone implements the mandatory Day 1 flow:

1. User fills an eligibility form in the React frontend.
2. Frontend validates the profile with Zod.
3. FastAPI receives the request.
4. A deterministic rule-based engine checks a curated MVP dataset.
5. Eligible and ineligible schemes are returned with reasons.

AI, OCR, RAG, multilingual, and voice modules are separated into service files and will be enabled after this milestone remains stable.

## Project Structure

```text
jansathi-ai/
├── frontend/
├── backend/
├── data/
├── vector_db/
├── docs/
└── tests/
```

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r ..\requirements.txt
uvicorn main:app --reload
```

OpenAPI docs: `http://localhost:8000/docs`

MongoDB Atlas is optional for local demos. Set `MONGODB_URI` in `.env` to persist eligibility results.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Environment

Copy `.env.example` to `.env` at the project root or backend directory and set required secrets for production.

## Privacy

The first milestone does not accept document uploads. Future OCR handling is designed to process uploads, extract structured fields, and immediately delete raw files.
