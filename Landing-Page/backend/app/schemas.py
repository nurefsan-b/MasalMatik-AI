"""
MasalMatik AI — Pydantic Şemaları

API request/response şemaları.
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ────────────────────────────────────────────────────
# User Şemaları
# ────────────────────────────────────────────────────
class UserCreate(BaseModel):
    username: str = Field(..., min_length=2, max_length=50)
    email: str
    age: Optional[int] = None
    parent_email: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    age: Optional[int]
    parent_email: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


# ────────────────────────────────────────────────────
# Story Şemaları
# ────────────────────────────────────────────────────
class GenerateStoryRequest(BaseModel):
    """Yeni hikâye başlatma isteği"""
    user_id: int = Field(..., description="Kullanıcı ID")
    theme: str = Field(default="orman", description="Hikâye teması: orman, deniz, uzay, şehir, dağ")
    character_name: str = Field(default="Küçük Kedi", description="Ana karakter adı")
    language: str = Field(default="tr", description="Hikâye dili: tr, en")


class NextStepRequest(BaseModel):
    """Sonraki adım isteği"""
    story_id: int = Field(..., description="Hikâye ID")
    choice_id: int = Field(..., description="Seçilen seçenek ID")


class ChoiceResponse(BaseModel):
    """Seçenek yanıtı"""
    id: int
    text: str
    selected: bool

    model_config = {"from_attributes": True}


class StoryNodeResponse(BaseModel):
    """Hikâye düğümü yanıtı"""
    id: int
    content: str
    image_prompt: Optional[str]
    is_end: bool
    depth_level: int
    choices: list[ChoiceResponse] = []

    model_config = {"from_attributes": True}


class StoryResponse(BaseModel):
    """Hikâye yanıtı"""
    id: int
    title: str
    theme: str
    language: str
    status: str
    created_at: datetime
    completed_at: Optional[datetime]
    current_node: Optional[StoryNodeResponse] = None

    model_config = {"from_attributes": True}


class GenerateStoryResponse(BaseModel):
    """Yeni hikâye başlatma yanıtı"""
    story: StoryResponse
    message: str = "Hikâye başarıyla oluşturuldu!"


class NextStepResponse(BaseModel):
    """Sonraki adım yanıtı"""
    story_id: int
    node: StoryNodeResponse
    is_story_complete: bool = False
    message: str = ""


class StoryTreeNode(BaseModel):
    """Hikâye ağacı düğümü (recursive)"""
    id: int
    content: str
    image_prompt: Optional[str]
    is_end: bool
    depth_level: int
    choices: list["StoryTreeChoice"] = []

    model_config = {"from_attributes": True}


class StoryTreeChoice(BaseModel):
    """Hikâye ağacı seçeneği"""
    id: int
    text: str
    selected: bool
    next_node: Optional[StoryTreeNode] = None

    model_config = {"from_attributes": True}


class StoryTreeResponse(BaseModel):
    """Hikâyenin tüm ağaç yapısı"""
    story_id: int
    title: str
    theme: str
    root_node: Optional[StoryTreeNode] = None


class WebhookPayload(BaseModel):
    """Webhook payload yapısı (n8n/Make uyumlu)"""
    event: str = "story_completed"
    story_id: int
    title: str
    user_id: int
    username: str
    parent_email: Optional[str]
    language: str
    theme: str
    full_text: str
    completed_at: str
    node_count: int
    choice_count: int
