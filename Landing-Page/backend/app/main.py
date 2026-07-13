"""
MasalMatik AI — FastAPI Ana Uygulama

CORS, router ve veritabanı başlatma.
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.routers import story
from app.config import settings

# Logging
logging.basicConfig(
    level=logging.DEBUG if settings.APP_DEBUG else logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Uygulama yaşam döngüsü — başlangıçta DB tablolarını oluştur"""
    logger.info("🚀 MasalMatik AI API başlatılıyor...")
    init_db()
    logger.info("✅ Veritabanı tabloları oluşturuldu.")
    yield
    logger.info("👋 MasalMatik AI API kapatılıyor...")


app = FastAPI(
    title="MasalMatik AI API",
    description=(
        "Çocukların ve dil öğrenen bireylerin seçimleriyle anlık olarak "
        "şekillenen, üretken yapay zekâ destekli interaktif hikâye platformu."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — Frontend'in API'ye erişebilmesi için
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # Alternatif
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router'ları ekle
app.include_router(story.router)


@app.get("/")
def root():
    """API kök endpoint'i"""
    return {
        "message": "🧸 MasalMatik AI API'ye Hoş Geldiniz!",
        "docs": "/docs",
        "version": "1.0.0",
    }
