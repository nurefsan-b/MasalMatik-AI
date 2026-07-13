"""
MasalMatik AI — Veritabanı Modelleri

User, Story, StoryNode ve Choice modelleri.
Hikâyenin dallanma yapısı StoryNode'ların parent-child ilişkisiyle sağlanır.
"""

import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Enum
)
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class StoryStatus(str, enum.Enum):
    """Hikâye durumu"""
    ACTIVE = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"


class StoryTheme(str, enum.Enum):
    """Hikâye temaları"""
    ORMAN = "orman"
    DENIZ = "deniz"
    UZAY = "uzay"
    SEHIR = "şehir"
    DAG = "dağ"


# ────────────────────────────────────────────────────
# User — Kullanıcı modeli
# ────────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(120), unique=True, nullable=False)
    age = Column(Integer, nullable=True)
    parent_email = Column(String(120), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # İlişkiler
    stories = relationship("Story", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"


# ────────────────────────────────────────────────────
# Story — Hikâye modeli
# ────────────────────────────────────────────────────
class Story(Base):
    __tablename__ = "stories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(200), nullable=False)
    theme = Column(String(50), default="orman")
    language = Column(String(10), default="tr")
    status = Column(String(20), default=StoryStatus.ACTIVE.value)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    # İlişkiler
    user = relationship("User", back_populates="stories")
    nodes = relationship("StoryNode", back_populates="story", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Story(id={self.id}, title='{self.title}')>"


# ────────────────────────────────────────────────────
# StoryNode — Hikâye düğümü (her bir sayfa/sahne)
# ────────────────────────────────────────────────────
class StoryNode(Base):
    __tablename__ = "story_nodes"

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("stories.id"), nullable=False)
    parent_node_id = Column(Integer, ForeignKey("story_nodes.id"), nullable=True)
    content = Column(Text, nullable=False)
    image_prompt = Column(Text, nullable=True)
    is_end = Column(Boolean, default=False)
    depth_level = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # İlişkiler
    story = relationship("Story", back_populates="nodes")
    parent_node = relationship("StoryNode", remote_side=[id], backref="child_nodes")
    choices = relationship("Choice", back_populates="node", cascade="all, delete-orphan",
                           foreign_keys="Choice.node_id")

    def __repr__(self):
        return f"<StoryNode(id={self.id}, depth={self.depth_level}, is_end={self.is_end})>"


# ────────────────────────────────────────────────────
# Choice — Kullanıcıya sunulan seçenek
# ────────────────────────────────────────────────────
class Choice(Base):
    __tablename__ = "choices"

    id = Column(Integer, primary_key=True, index=True)
    node_id = Column(Integer, ForeignKey("story_nodes.id"), nullable=False)
    text = Column(String(300), nullable=False)
    selected = Column(Boolean, default=False)
    next_node_id = Column(Integer, ForeignKey("story_nodes.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # İlişkiler
    node = relationship("StoryNode", back_populates="choices", foreign_keys=[node_id])
    next_node = relationship("StoryNode", foreign_keys=[next_node_id])

    def __repr__(self):
        return f"<Choice(id={self.id}, text='{self.text[:30]}...', selected={self.selected})>"
