from pydantic import BaseModel, Field, HttpUrl


class Scheme(BaseModel):
    scheme_name: str
    category: str
    state: str
    eligibility: list[str] = Field(default_factory=list)
    income_limit: int = Field(ge=0)
    benefit: str
    documents: list[str] = Field(default_factory=list)
    application_process: str
    official_website: HttpUrl
    keywords: list[str] = Field(default_factory=list)
    summary: str
