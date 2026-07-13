"""
MasalMatik AI — Uygulama Konfigürasyonu
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# .env dosyasını yükle
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    """Uygulama ayarları"""

    # Veritabanı
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", "sqlite:///./masalmatik.db"
    )

    # Webhook
    WEBHOOK_URL: str = os.getenv(
        "WEBHOOK_URL", "https://your-n8n-instance.com/webhook/masalmatik"
    )

    # Uygulama
    APP_ENV: str = os.getenv("APP_ENV", "development")
    APP_DEBUG: bool = os.getenv("APP_DEBUG", "true").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")

    # Hikâye ayarları
    MAX_STORY_DEPTH: int = 5
    CHOICES_PER_NODE: int = 2

    @property
    def is_sqlite(self) -> bool:
        return self.DATABASE_URL.startswith("sqlite")


settings = Settings()
