from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "JanSathi AI"
    app_env: str = Field(default="development", alias="APP_ENV")
    secret_key: str = Field(default="change-this-long-random-secret", alias="SECRET_KEY")
    fernet_key: str | None = Field(default=None, alias="FERNET_KEY")

    backend_host: str = Field(default="0.0.0.0", alias="BACKEND_HOST")
    backend_port: int = Field(default=8000, alias="BACKEND_PORT")
    frontend_origin: str = Field(default="http://localhost:5173", alias="FRONTEND_ORIGIN")

    mongodb_uri: str | None = Field(default=None, alias="MONGODB_URI")
    mongodb_db: str = Field(default="jansathi_ai", alias="MONGODB_DB")

    schemes_data_path: Path = Field(default=Path("../data/schemes.json"), alias="SCHEMES_DATA_PATH")
    chroma_persist_dir: Path = Field(default=Path("../vector_db"), alias="CHROMA_PERSIST_DIR")
    gemini_api_key: str | None = Field(default=None, alias="GEMINI_API_KEY")
    google_ai_model: str = Field(default="gemini-2.5-flash", alias="GOOGLE_AI_MODEL")

    rate_limit_per_minute: int = 60
    access_token_expire_minutes: int = 720

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origin.split(",") if origin.strip()]

    @property
    def resolved_schemes_path(self) -> Path:
        if self.schemes_data_path.is_absolute():
            return self.schemes_data_path
        backend_dir = Path(__file__).resolve().parent
        return (backend_dir / self.schemes_data_path).resolve()


@lru_cache
def get_settings() -> Settings:
    return Settings()
