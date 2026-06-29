# JanSathi AI Architecture

```text
React + Vite Frontend
        |
        v
FastAPI Backend
        |
        +--> Eligibility Engine
        +--> Scheme Dataset
        +--> MongoDB Atlas
        +--> OCR Service (Phase 5)
        +--> RAG Service + ChromaDB (Phase 6)
        +--> Gemini Service (Phase 7)
```

## First Milestone Boundary

The first working version intentionally uses no LLM for eligibility. Eligibility decisions are deterministic, explainable, and based on rules mapped to `data/schemes.json`.

## Security Baseline

- Pydantic request validation
- CORS allow-list
- Lightweight in-memory rate limiting
- Structured request logging without sensitive payloads
- Environment-variable based secrets
- Fernet utility for future encrypted fields
- No permanent raw document storage
