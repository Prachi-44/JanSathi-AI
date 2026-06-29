import logging
from datetime import UTC, datetime
from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from config import get_settings

logger = logging.getLogger("jansathi.database")


class MongoManager:
    def __init__(self) -> None:
        self._client: AsyncIOMotorClient | None = None
        self._db: AsyncIOMotorDatabase | None = None

    @property
    def is_connected(self) -> bool:
        return self._db is not None

    @property
    def db(self) -> AsyncIOMotorDatabase:
        if self._db is None:
            raise RuntimeError("MongoDB is not configured")
        return self._db

    async def connect(self) -> None:
        settings = get_settings()
        if not settings.mongodb_uri:
            logger.warning("MONGODB_URI is not set; persistence is disabled for local demo mode")
            return

        self._client = AsyncIOMotorClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)
        await self._client.admin.command("ping")
        self._db = self._client[settings.mongodb_db]
        await self.ensure_indexes()
        logger.info("Connected to MongoDB database '%s'", settings.mongodb_db)

    async def close(self) -> None:
        if self._client:
            self._client.close()
        self._client = None
        self._db = None

    async def ensure_indexes(self) -> None:
        if self._db is None:
            return
        await self._db.users.create_index("email", unique=True)
        await self._db.users.create_index("mobile_hash", unique=True, sparse=True)
        await self._db.schemes.create_index("scheme_name", unique=True)
        await self._db.eligibility_results.create_index("created_at")
        await self._db.feedback.create_index("created_at")

    async def save_eligibility_result(self, payload: dict[str, Any]) -> str | None:
        if self._db is None:
            return None
        document = {
            **payload,
            "created_at": datetime.now(UTC),
        }
        result = await self._db.eligibility_results.insert_one(document)
        return str(result.inserted_id)


mongo_manager = MongoManager()
