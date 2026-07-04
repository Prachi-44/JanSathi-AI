# JanSathi AI — Software Architecture and Technical Documentation

> Document Type: Developer and Architecture Reference
> Version: 1.0
> Date: July 2026
> Audience: Development Teams, Hackathon Evaluators, Academic Reviewers, Future Contributors

---

## 1. Project Overview

JanSathi AI is an AI-assisted government-scheme discovery and eligibility guidance platform for Indian citizens. It is designed to help users understand which public welfare schemes they may qualify for, receive deterministic eligibility assessments, upload identity documents for OCR-based autofill, and ask for plain-language explanations of scheme details.

### What JanSathi AI Is
JanSathi AI combines a deterministic eligibility engine, a scheme repository, a retrieval-augmented explanation layer, and an OCR intake workflow into a single citizen-facing application. The system does not make high-stakes decisions autonomously; instead, it provides transparent, explainable recommendations based on structured rules and retrieved scheme context.

### Why It Was Built
The project addresses the gap between citizens and government welfare systems. Many schemes are publicly announced, but citizens struggle to identify relevant options, understand eligibility criteria, and navigate paperwork. JanSathi AI was built to reduce this friction through a guided digital experience.

### Social Problem It Solves
India has many welfare schemes, but awareness and access remain uneven. Citizens often encounter:
- limited awareness of available schemes
- difficulty interpreting eligibility requirements
- language barriers in official documentation
- lack of digital fluency
- fragmented information across multiple portals

### Target Audience
- citizens seeking welfare support
- first-time digital users
- low-literacy and non-technical users
- NGOs and field workers assisting citizens
- administrators responsible for scheme catalog maintenance

### Project Goals
- reduce time spent discovering relevant government schemes
- provide transparent eligibility assessment
- simplify document-based profile completion
- explain schemes in simple language
- offer a secure and auditable workflow for citizen data handling

### Why AI Is Used
AI is used to make the experience more accessible and conversational. Specifically:
- Gemini powers the explanation experience and OCR extraction
- RAG helps retrieve the most relevant scheme context
- AI assists with document parsing and citizen-friendly summaries

### Why RAG Is Used
Retrieval-Augmented Generation is used because government scheme information changes over time and must remain grounded in a curated dataset. RAG allows the system to retrieve relevant scheme text and then generate an explanation based on that retrieval rather than relying on the model to invent policy details.

### Why Deterministic Eligibility Is Used
The system uses deterministic rules instead of AI-driven eligibility decisions because welfare eligibility is policy-sensitive and legally consequential. Deterministic logic is:
- transparent
- auditable
- easy to test
- consistent across users
- suitable for explainable governance workflows

In short, AI supports understanding and interaction, while the eligibility result is produced by explicit business rules.

---

## 2. Problem Statement

Citizens often face a difficult journey when trying to access welfare benefits.

### Current Problems Citizens Face
1. Awareness Gap
   - Many citizens are unaware of schemes that may apply to them.
   - Public information is scattered across multiple departments and websites.

2. Documentation Complexity
   - Government schemes often require specific documents such as Aadhaar, income proof, caste certificate, land records, or disability proof.
   - The list of documents is confusing for first-time users.

3. Language Barriers
   - Official scheme language can be technical and inaccessible.
   - Users may not understand eligibility terms or procedural steps.

4. Digital Literacy Issues
   - Some citizens are not comfortable using web portals or digital forms.
   - A guided experience lowers this barrier.

5. Manual Eligibility Checking
   - Eligibility is often checked manually through phone calls, field visits, or portal exploration.
   - This is slow and inconsistent.

6. Multiple Government Portals
   - Citizens often need to visit many portals with different interfaces and login requirements.

7. Lack of Personalized Recommendations
   - Generic scheme lists do not reflect a citizen’s demographic profile.
   - A personalized recommendation engine improves usefulness.

---

## 3. Proposed Solution

JanSathi AI offers a unified digital assistant to help citizens discover and understand schemes.

### Core Solution Components
- AI-powered recommendation and ranking
- deterministic eligibility evaluation
- OCR-based document extraction
- RAG-based explanation system
- secure document processing and masking
- citizen dashboard and admin dashboard

### AI-Powered Recommendation
The app evaluates a citizen profile against the scheme dataset and assigns a compatibility score. The result is a ranked list of schemes with reasons for eligibility or ineligibility.

### Eligibility Engine
A deterministic rule engine evaluates profiles against scheme-specific logic. It uses structured fields such as age, income, state, occupation, category, disability, and student/farmer status.

### OCR
The OCR workflow accepts uploaded identity documents, extracts structured fields, and uses those values to autofill the eligibility profile.

### RAG
The RAG layer retrieves scheme-specific context from a curated scheme dataset and passes it to Gemini to generate plain-language explanations.

### Explain-With-AI
Users can open a contextual explanation drawer for any scheme and receive an AI-generated explanation based on the retrieved scheme details.

### Secure Document Processing
Sensitive document data is masked and encrypted in memory before being returned to the client. OCR payloads are treated as temporary processing artifacts rather than persistent storage objects.

### Multilingual Support
The current implementation supports language-aware explanation generation through the backend service, but the frontend does not yet implement a full translation layer such as i18next. Multilingual support is therefore present as an extensible capability rather than a complete production localization framework.

### User Dashboard
The dashboard shows eligibility history, saved schemes, profile summary, and the ability to start a new evaluation.

### Admin Dashboard
Admins can review analytics, audit logs, feedback, and manage the scheme catalog through CRUD operations.

---

## 4. Complete Technology Stack

| Technology | Version | Why Used | Purpose | Alternative Considered | Why Selected |
|---|---:|---|---|---|---|
| Python | 3.12.4 (local runtime) | Mature ecosystem for AI services and web APIs | Backend runtime | Node.js | Better fit for the existing service design and rapid API development |
| FastAPI | 0.115.6 | High-performance async API framework | REST API layer | Flask | Faster development, built-in validation, better async support |
| Pydantic | 2.10.4 | Strong request/response validation | Schema enforcement | Marshmallow | Better integration with FastAPI |
| Uvicorn | 0.34.0 | ASGI server | Run backend service | Gunicorn | Simple local development and production-ready deployment |
| Motor | 3.6.0 | Async MongoDB driver | Database access | PyMongo | Native async support fits FastAPI |
| Python-dotenv | 1.0.1 | Environment loading | Configuration | hardcoded config | Cleaner deployment portability |
| cryptography | 44.0.0 | Encryption and Fernet support | Sensitive data protection | custom hashing only | Provides robust symmetric encryption |
| python-multipart | 0.0.20 | File upload parsing | OCR upload handling | manual multipart parsing | Standard FastAPI-compatible solution |
| httpx | 0.28.1 | Async HTTP client | Gemini API calls | requests | Better async compatibility |
| pytest | 8.3.4 | Testing framework | Unit and security tests | unittest | Better ecosystem and fixtures |
| React | 18.3.1 | Component-driven UI | Frontend application | Angular | Smaller learning curve and better developer ergonomics |
| TypeScript | 5.7.2 | Strong typing | Frontend reliability | JavaScript | Safer refactoring and better maintainability |
| Vite | 6.0.5 | Build tooling | Frontend bundling and dev server | Webpack | Faster development cycles |
| Tailwind CSS | 3.4.17 | Utility-first styling | UI design | Bootstrap | More flexible and modern design system |
| React Router | 7.1.1 | Client-side routing | Page navigation | plain anchors | Better SPA experience |
| React Hook Form | 7.54.2 | Form state management | Input handling | Formik | Lightweight and performant |
| Axios | 1.7.9 | HTTP client | Frontend API communication | Fetch API | Cleaner request abstraction |
| Zod | 3.24.1 | Schema validation | Client-side form validation | manual validation | Strong typing and validation consistency |
| MongoDB Atlas | N/A | Cloud document database | Persistent storage | PostgreSQL | Better fit for flexible citizen profile and audit data |
| Gemini 2.5 Flash | configured via API | LLM model | OCR and explanation generation | OpenAI GPT | Existing project preference and good multimodal support |
| Google Generative AI SDK | 0.8.3 | Access Gemini APIs | AI service integration | direct REST calls | Simplifies response handling |
| Sentence Transformers | 3.3.1 | Embedding generation | Planned/optional semantic retrieval | TF-IDF only | Better semantic retrieval quality |
| ChromaDB | 0.5.23 | Vector index store | Planned/optional retrieval | local JSON cache | Better vector search once scaled |
| JWT (custom implementation) | custom | Stateless auth | User access tokens | session-based auth | Simpler stateless architecture |
| PBKDF2 | built-in | Password hashing | Secure credential storage | bcrypt | Available in Python stdlib and sufficient for this project |
| Fernet | cryptography | Symmetric encryption | Sensitive field protection | plaintext storage | Stronger privacy controls |

> Note: Some packages such as ChromaDB, Sentence Transformers, and PaddleOCR are listed in the requirements but are not part of the active runtime path in the current implementation. The live system currently uses Gemini embeddings, a local JSON embedding cache, and a lexical fallback.

---

## 5. Folder Structure

### Overview
The repository is split into a frontend application, a backend service, a static scheme dataset, and test coverage.

### Top-Level Structure
```text
JanSathi-AI/
├── backend/
├── frontend/
├── data/
├── docs/
├── tests/
└── vector_db/
```

### Backend Folder
```text
backend/
├── middleware/
├── models/
├── routes/
├── schemas/
├── services/
├── utils/
├── config.py
└── main.py
```

### Why Each Folder Exists
- backend/: contains the API server and all core business logic
- middleware/: request logging, rate limiting, and cross-cutting concerns
- models/: domain models and Pydantic/DB schema definitions
- routes/: HTTP endpoints grouped by domain
- schemas/: validation DTOs for request and response payloads
- services/: reusable application services such as OCR, RAG, auth, database, and engines
- utils/: security helpers and encryption logic
- config.py: central configuration loading from environment variables
- main.py: application bootstrap and middleware setup

### Frontend Folder
```text
frontend/src/
├── components/
├── context/
├── hooks/
├── lib/
├── pages/
├── services/
└── types.ts
```

### Why Each Frontend Folder Exists
- components/: reusable UI building blocks
- context/: auth and theme state providers
- hooks/: custom hooks, such as toast handling
- lib/: general helpers such as class-name utilities
- pages/: route-level screens and business views
- services/: API clients and client-side integration layer
- types.ts: shared TypeScript interfaces for data models

### Data and Storage Folders
- data/: JSON-based scheme dataset used by the repository layer
- vector_db/: local persistence directory for embedding cache files
- tests/: automated verification of eligibility, recommendation, and security behavior

---

## 6. System Architecture

### High-Level Layered Architecture
```text
User / Citizen
    ↓
React + TypeScript Frontend
    ↓
FastAPI Backend
    ↓
Eligibility Engine
    ↓
Recommendation Engine
    ↓
RAG + Gemini Explanation Layer
    ↓
OCR Service
    ↓
MongoDB / In-Memory Fallback
    ↓
Response to UI
```

### Layer Responsibilities
1. Frontend Layer
   - collects citizen input
   - displays eligibility results
   - manages authentication state
   - uploads files for OCR

2. Backend API Layer
   - exposes REST endpoints
   - validates input
   - routes requests to the appropriate service
   - manages auth and audit logging

3. Eligibility and Recommendation Layer
   - evaluates profile data using deterministic rules
   - calculates match scores and ranks schemes

4. RAG and AI Layer
   - retrieves scheme context from the repository
   - uses Gemini to generate human-readable explanations

5. Data Layer
   - stores users, feedback, saved schemes, history, and audit logs
   - supports in-memory fallbacks when MongoDB is unavailable

### Request Flow Example
```text
Citizen submits profile
    → Frontend validates local fields
    → POST /api/v1/eligibility/check
    → FastAPI validates request schema
    → EligibilityEngine evaluates profile
    → RecommendationEngine ranks matched schemes
    → Response returned to frontend
```

---

## 7. Detailed Module Explanation

### Module 1: Landing Page
Purpose:
- introduce the product to new users
- provide links to register, login, and browse schemes

Files:
- frontend/src/pages/LandingPage.tsx

Features:
- hero section
- product value proposition
- route links

### Module 2: Authentication
Purpose:
- register and authenticate citizens and admins

Workflow:
1. User submits registration or login payload
2. Backend validates credentials
3. Passwords are hashed with PBKDF2
4. A signed JWT is created
5. The token is stored in browser storage and sent on subsequent requests

Important implementation details:
- JWTs are stateless and signed with HMAC-SHA256
- tokens contain user identity, email, name, and state
- auth routes are defined in backend/routes/auth.py

### Module 3: Eligibility Engine
Purpose:
- evaluate whether a profile meets the conditions of a scheme

Inputs:
- age
- gender
- occupation
- income
- state
- category
- disability status
- student/farmer/employment flags
- housing and banking flags

Validation:
- request schema uses Pydantic validation
- consent is required before evaluation

Matching Logic:
- each scheme has a dedicated rule or a generic fallback rule
- the engine evaluates all schemes in the repository

Outputs:
- eligible_schemes
- ineligible_schemes
- profile_summary

### Module 4: Recommendation Engine
Purpose:
- rank the schemes most relevant to the citizen profile

How It Works:
- the engine scores each scheme using a weighted heuristic across five dimensions
- score is capped between 0 and 100

Current Formula:
$$
Score = Occupation(30) + Income(25) + State(20) + Age(15) + Category(10)
$$

This is implemented deterministically and is not a machine-learning model.

### Module 5: Scheme Repository
Purpose:
- load the curated scheme dataset

Dataset Source:
- data/schemes.json

Schema:
- scheme_name
- category
- state
- eligibility
- income_limit
- benefit
- documents
- application_process
- official_website
- keywords
- summary

Admin operations:
- create/update/delete scheme entries through admin routes

### Module 6: Explain-with-AI
Purpose:
- provide a citizen-friendly explanation of any scheme

Workflow:
1. user selects a scheme
2. backend uses RAG to retrieve relevant scheme context
3. Gemini produces a plain-language explanation
4. the frontend displays the result in a drawer UI

Implementation details:
- explanation prompts are grounded in the retrieved context
- if Gemini is unavailable, a local template fallback is used

### Module 7: OCR Module
Purpose:
- extract structured profile fields from identity documents

Supported Files:
- PNG, JPEG, WebP, PDF

Processing:
- file bytes are read from upload
- Gemini multimodal model attempts extraction
- results are returned as structured JSON
- sensitive values are masked and encrypted

Confidence:
- OCR response includes a confidence score
- if the API fails, a mock fallback returns deterministic sample data

### Module 8: MongoDB and Persistence
Purpose:
- persist users, eligibility history, saved schemes, feedback, and audit logs

Collections:
- users
- eligibility_history
- saved_schemes
- feedback
- audit_logs

### Module 9: Admin Dashboard
Purpose:
- expose governance and maintenance tooling

Features:
- analytics overview
- scheme CRUD
- feedback review
- audit log inspection

### Module 10: User Dashboard
Purpose:
- help citizens manage saved schemes and view previous evaluations

Features:
- eligibility history cards
- saved scheme library
- profile summary
- navigation to reevaluate eligibility

---

## 8. AI Pipeline

```text
Citizen Question
    ↓
RAG Search over Scheme Repository
    ↓
Retrieved Scheme Context
    ↓
Gemini Explanation Generation
    ↓
Formatted Markdown Response
```

### Stage Breakdown
1. Citizen Question
   - The user asks for an explanation related to a scheme.

2. Query Processing
   - The backend builds a retrieval query based on the scheme name and language preference.

3. Embedding and Similarity Search
   - The system uses Gemini embeddings if configured.
   - If embeddings are unavailable, the service falls back to lexical matching.

4. Retrieved Context
   - The system composes a context block from the matched scheme’s metadata.

5. Gemini Generation
   - Gemini uses the context to produce a concise explanation.

6. Response Rendering
   - The frontend displays the explanation in the drawer UI.

---

## 9. Eligibility Pipeline

```text
User Profile Input
    ↓
Form Validation
    ↓
EligibilityEngine
    ↓
RecommendationEngine
    ↓
Response with Eligible and Ineligible Schemes
```

### Detailed Flow
1. Citizen fills out the profile form or uploads an identity document.
2. Frontend validates the data using Zod.
3. Backend receives the request and verifies consent.
4. EligibilityEngine evaluates scheme-specific rules.
5. RecommendationEngine ranks the results.
6. The response is returned with reasons and reasoning.

---

## 10. OCR Pipeline

```text
Upload File
    ↓
MIME Validation
    ↓
OCR Extraction via Gemini
    ↓
PII Masking and Encryption
    ↓
Auto-fill Profile Form
    ↓
Temporary Cleanup
```

### Notes
- file type validation occurs before processing
- OCR extraction returns structured fields such as name, age, income, state, and occupation
- masked Aadhaar and PAN values are returned to the client for transparency without exposing raw identifiers
- the system deletes the raw in-memory file payload after processing

---

## 11. Recommendation Algorithm

The current recommendation engine is a weighted heuristic.

### Scoring Dimensions
- Occupation: 30 points
- Income: 25 points
- State: 20 points
- Age: 15 points
- Category: 10 points

### Example
If a user is a farmer with low income in Maharashtra, the engine will likely prioritize schemes related to agriculture, rural welfare, or state-specific support.

### Practical Interpretation
- a high occupation match increases relevance
- a low income relative to a scheme limit improves score
- state alignment improves ranking for state-specific schemes
- age and category filters help prioritize schemes that are more relevant to the profile

---

## 12. Database Design

### Collection Design

| Collection | Purpose | Key Fields |
|---|---|---|
| users | stores citizen/admin users | _id, full_name, email, state, password_hash, created_at |
| eligibility_history | stores evaluation sessions | _id, user_id, profile, eligible_scheme_names, ineligible_scheme_names, created_at |
| saved_schemes | stores saved bookmarks | _id, user_id, schemes |
| feedback | stores user feedback | _id, rating, comment, user_name, scheme_name, created_at |
| audit_logs | stores audit events | _id, user_id, action, details, created_at |

### Relationships
- users ↔ eligibility_history via user_id
- users ↔ saved_schemes via user_id
- feedback is mostly standalone but can be linked to a user or scheme by metadata

### Indexes
- users.email unique
- users.mobile_hash unique (sparse)
- schemes.scheme_name unique
- eligibility_history.created_at
- feedback.created_at
- audit_logs.created_at

### Notes on Storage Mode
When MongoDB is not configured, the backend uses in-memory fallback storage so the app remains functional in demo mode.

---

## 13. API Documentation

### Health
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | /health | service health check | none |

### Authentication
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | /api/v1/auth/register | register a new user | none |
| POST | /api/v1/auth/login | authenticate a user | none |
| GET | /api/v1/auth/me | fetch current authenticated user | JWT |

### Eligibility
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | /api/v1/eligibility/check | evaluate scheme eligibility for a profile | optional JWT |
| GET | /api/v1/eligibility/history | retrieve historical eligibility checks | optional JWT |

### Schemes
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | /api/v1/schemes | list all schemes | none |
| POST | /api/v1/schemes/save | save a scheme to the user library | JWT |
| POST | /api/v1/schemes/unsave | remove a saved scheme | JWT |
| GET | /api/v1/schemes/saved | list saved schemes | JWT |
| POST | /api/v1/schemes/explain | generate AI explanation for a scheme | none |

### Feedback and OCR
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | /api/v1/feedback | submit feedback | none |
| GET | /api/v1/feedback | list feedback | none |
| POST | /api/v1/ocr/upload | upload a document and extract structured fields | optional JWT |

### Admin
| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | /api/v1/admin/schemes | create a scheme | admin (not enforced in code) |
| PUT | /api/v1/admin/schemes/{scheme_name} | update a scheme | admin (not enforced in code) |
| DELETE | /api/v1/admin/schemes/{scheme_name} | delete a scheme | admin (not enforced in code) |
| GET | /api/v1/admin/analytics | retrieve analytics summary | none |
| GET | /api/v1/admin/audit-logs | retrieve audit logs | none |

### Example Request
```json
{
  "name": "Prachi Dudhankar",
  "consent": true,
  "age": 38,
  "gender": "female",
  "occupation": "farmer",
  "income": 150000,
  "state": "Maharashtra",
  "category": "OBC",
  "student_status": false,
  "farmer_status": true,
  "employment_status": "self_employed",
  "has_pucca_house": false,
  "rural_resident": true,
  "has_bank_account": true
}
```

### Example Response
```json
{
  "eligible_schemes": [
    {
      "scheme": {
        "scheme_name": "PM Kisan Samman Nidhi"
      },
      "reasons": ["Applicant is marked as a farmer or has agriculture-related occupation."],
      "score": 86,
      "match_percentage": 86.0
    }
  ],
  "ineligible_schemes": []
}
```

---

## 14. Security Architecture

### Password Hashing
- passwords are hashed using PBKDF2 with SHA-256
- the storage format is pbkdf2_sha256$salt$digest

### Encryption
- sensitive values such as Aadhaar and PAN are encrypted with Fernet
- encryption keys are derived from the application secret or provided via FERNET_KEY

### JWT
- access tokens are JWT-like signed tokens using HMAC-SHA256
- tokens contain a short user identity payload and an expiry timestamp

### Consent
- eligibility checks and OCR uploads require explicit citizen consent
- this is enforced in the route layer

### Audit Logging
- every key event such as login, registration, OCR process, and eligibility check is logged
- audit logs support traceability and future compliance reviews

### Input Validation
- Pydantic schemas validate incoming payloads
- request bodies are constrained by field lengths and selection enums

### Rate Limiting
- requests are capped per IP using a simple in-memory middleware

### CORS
- CORS is configured from environment settings to allow trusted frontend origins only

### Secure File Processing
- files are processed in memory
- raw file data is not persisted to disk
- sensitive identifiers are masked before display

---

## 15. Multilingual Architecture

The current multilingual implementation is partial and should be considered an extensible layer rather than a full localization framework.

### Current State
- the backend accepts a language parameter for explanation generation
- Gemini is instructed to answer in the requested language
- frontend does not currently implement a dedicated translation framework such as i18next

### Design Direction
Future iterations should add:
- locale files for the frontend
- persistent language preference in user settings
- localized error messages and onboarding content
- region-specific scheme explanation templates

### Fallback Behavior
If the language-specific response is unavailable, the system falls back to the local explanation template in English.

---

## 16. Deployment Architecture

### Current Development Model
- frontend runs via Vite dev server
- backend runs via Uvicorn
- MongoDB is optional and falls back to in-memory mode

### Recommended Production Layout
```text
Client Browser
    ↓
Vercel (Frontend)
    ↓
Railway or similar host (FastAPI backend)
    ↓
MongoDB Atlas
    ↓
Gemini API
```

### Environment Variables
- SECRET_KEY
- FERNET_KEY
- BACKEND_HOST / BACKEND_PORT
- FRONTEND_ORIGIN
- MONGODB_URI / MONGODB_DB
- GEMINI_API_KEY
- GOOGLE_AI_MODEL
- SCHEMES_DATA_PATH
- CHROMA_PERSIST_DIR

### Deployment Notes
- the backend and frontend are decoupled and can be deployed independently
- the frontend uses a configurable API base URL from environment variables
- the backend should be configured with a long-lived secret key and a valid FERNET_KEY

---

## 17. Why Every Technology Was Selected

### Why React?
React offers a fast, component-based development experience and suits a dashboard-driven citizen application.

### Why TypeScript?
TypeScript improves maintainability, refactoring safety, and developer clarity.

### Why Vite?
Vite provides fast development startup and efficient production builds.

### Why FastAPI?
FastAPI is ideal for building APIs quickly with strong validation and async support.

### Why MongoDB?
MongoDB is a good fit for flexible JSON-like document structures such as profiles, history logs, and audit metadata.

### Why Gemini?
Gemini was chosen because the project needs multimodal OCR and contextual explanation generation.

### Why RAG Instead of Fine-Tuning?
RAG is better because the scheme dataset changes regularly and the system must remain grounded in policy text rather than model memory.

### Why Deterministic Eligibility Instead of AI Decisions?
Eligibility is policy-sensitive and needs transparency and explainability. Deterministic logic is safer and more auditable.

### Why JWT?
JWT enables stateless authentication that works naturally with SPA frontends and simple API deployments.

### Why Tailwind?
Tailwind accelerates UI work while keeping the presentation layer modern and composable.

### Why PBKDF2?
PBKDF2 is available in the Python standard library and is sufficient for secure password hashing in this project.

---

## 18. Future Enhancements

The current implementation is a strong first milestone, but several features are natural next steps.

### Planned Enhancements
- WhatsApp bot for scheme guidance
- DigiLocker integration for document retrieval
- government API integration for live scheme updates
- voice assistant for audio-first support
- expanded regional language support
- push notifications and reminders
- mobile app version
- offline mode for low-connectivity users
- advanced analytics and policy dashboards

---

## 19. Project Workflow

```text
Citizen
    ↓
Register or Login
    ↓
Choose Language / Start Journey
    ↓
Open Dashboard
    ↓
Check Eligibility
    ↓
View Ranked Recommendations
    ↓
Ask for Explain-with-AI
    ↓
Save Relevant Schemes
    ↓
Navigate to Official Portal
```

---

## 20. Complete Feature List

### Current Features
- citizen registration and login
- JWT-based session handling
- deterministic eligibility evaluation
- weighted recommendation scoring
- OCR upload and autofill
- scheme explanation via AI
- saved schemes library
- eligibility history
- feedback submission
- admin analytics and scheme CRUD
- audit logging

### Upcoming Features
- full multilingual frontend experience
- richer policy integrations
- WhatsApp and voice interfaces
- advanced recommendation personalization

### Hackathon Features
- fast demo workflow
- AI-powered explanation drawer
- OCR-assisted form filling
- secure in-memory masking

### AI Features
- Gemini-driven explanation generation
- multimodal OCR extraction
- context-grounded RAG conversational support

### Security Features
- password hashing
- encryption for sensitive fields
- consent enforcement
- audit logging
- rate limiting

### Admin Features
- scheme management
- feedback inspection
- analytics overview
- audit log visibility

---

## 21. Advantages

### Technical Advantages
- modular backend and frontend separation
- deterministic logic for transparency
- easy extension of the scheme repository
- strong type-safe frontend contracts

### Social Advantages
- helps citizens discover relevant welfare support faster
- reduces dependence on manual portal navigation
- improves public service accessibility

### Scalability
- backend services can be expanded independently
- new schemes can be added without structural changes
- future AI services can be introduced behind the existing interface

### Maintainability
- simple service-oriented organization
- clear route and service boundaries
- test coverage for critical rules

### Security
- consent-based processing
- sensitive data masking and encryption
- traceable logs

---

## 22. Limitations

The current implementation is intentionally pragmatic and should be understood as a strong first version rather than a full production-grade welfare platform.

### Current Limitations
- no full multilingual frontend translation layer yet
- no real government API integration for live scheme updates
- scheme rules are heuristic and simplified rather than policy-exact
- OCR accuracy depends on document quality and Gemini availability
- the system currently uses an in-memory rate limiter and local fallback storage when MongoDB is unavailable
- admin access is not enforced at the route level in the current code path

---

## 23. Conclusion

JanSathi AI is a practical, explainable, and extensible platform for making welfare scheme discovery easier for citizens. Its architecture combines deterministic public-policy logic, AI-assisted explanation, OCR intake, and a modern web interface into a focused solution for the challenge of welfare access and awareness.

The system is designed not to replace policy decision-making, but to make it easier for citizens and administrators to navigate the complexity of government benefits. Its modular design makes it suitable for future growth into a broader GovTech assistant platform.

---

## 24. Appendix

### Acronyms
- AI: Artificial Intelligence
- API: Application Programming Interface
- OCR: Optical Character Recognition
- RAG: Retrieval-Augmented Generation
- JWT: JSON Web Token
- PII: Personally Identifiable Information
- GovTech: Government Technology

### Glossary
- Scheme Repository: curated list of government schemes and their attributes
- Eligibility Engine: deterministic evaluator for profile-to-scheme compatibility
- Recommendation Engine: ranking mechanism for matched schemes
- Explain-with-AI: contextual explanation layer powered by RAG and Gemini

### Dataset Sources
- scheme data is stored in data/schemes.json
- the implementation is designed around curated government scheme metadata rather than live external scraping

### Government Portals
- the system references official scheme websites through the stored scheme metadata

### References
- FastAPI documentation
- React and Vite documentation
- MongoDB Motor documentation
- Google Gemini API documentation

### Documentation Requirements for Future Contributors
- keep the scheme dataset synchronized with current policy intent
- preserve the deterministic nature of eligibility outcomes
- avoid introducing unchecked AI decisions into eligibility results
- log security-relevant events and preserve auditability

