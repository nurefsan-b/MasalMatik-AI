"""
MasalMatik AI - Pydantic Models
Request ve Response modelleri
"""

from pydantic import BaseModel, Field
from typing import List, Optional


# ─── Request Models ───────────────────────────────────────────────

class StartStoryRequest(BaseModel):
    """Hikâye başlatma isteği"""
    character: str = Field(..., description="Ana karakter (örn. Robot, Uzaylı, Prenses)")
    theme: str = Field(..., description="Tema/Mekan (örn. Uzay, Orman, Sualtı Dünyası)")
    child_name: Optional[str] = Field(None, description="Çocuğun adı (opsiyonel)")
    lesson: Optional[str] = Field(None, description="Ebeveynin belirlediği ana tema veya öğüt")
    max_steps: Optional[int] = Field(4, description="Masalın maksimum adım sayısı")


class ContinueStoryRequest(BaseModel):
    """Hikâye devam ettirme isteği"""
    session_id: str = Field(..., description="Oturum kimliği")
    chosen_option: str = Field(..., description="Çocuğun seçtiği seçenek metni")


class EndStoryRequest(BaseModel):
    """Hikâye sonlandırma isteği"""
    session_id: str = Field(..., description="Oturum kimliği")
    email: Optional[str] = Field(None, description="E-posta adresi (webhook için)")


# ─── Response Models ──────────────────────────────────────────────

class StoryChoice(BaseModel):
    """Hikâye seçenek modeli"""
    emoji: str = Field(..., description="Seçenek emojisi")
    text: str = Field(..., description="Seçenek metni")


class StoryResponse(BaseModel):
    """Hikâye adımı yanıtı"""
    session_id: str = Field(..., description="Oturum kimliği")
    paragraph: str = Field(..., description="Hikâyenin mevcut paragrafı")
    choices: List[StoryChoice] = Field(..., description="2 seçenek")
    image_prompt: str = Field("", description="Sahne için görsel üretim promptu")
    step: int = Field(..., description="Mevcut adım numarası")
    is_final_step: bool = Field(False, description="Son adım mı?")


class EndStoryResponse(BaseModel):
    """Hikâye bitiş yanıtı"""
    session_id: str
    full_story: str = Field(..., description="Masalın tam metni")
    title: str = Field(..., description="Masalın başlığı")
    webhook_sent: bool = Field(False, description="Webhook başarıyla gönderildi mi?")
    message: str = Field("", description="Kullanıcıya mesaj")
