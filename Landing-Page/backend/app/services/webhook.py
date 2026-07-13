"""
MasalMatik AI — Webhook Servisi

Masal tamamlandığında n8n veya Make otomasyon aracına
JSON formatında webhook gönderir.
"""

import httpx
import logging
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session

from app.config import settings
from app.models import Story, StoryNode, User
from app.schemas import WebhookPayload

logger = logging.getLogger(__name__)


def collect_story_text(db: Session, story: Story) -> str:
    """Hikâyenin tüm metnini topla (seçilen yol boyunca)"""
    nodes = (
        db.query(StoryNode)
        .filter(StoryNode.story_id == story.id)
        .order_by(StoryNode.depth_level, StoryNode.created_at)
        .all()
    )

    # Seçilen yolu takip ederek metni oluştur
    full_text_parts = []

    # Root node'u bul
    root = next((n for n in nodes if n.parent_node_id is None), None)
    if not root:
        return ""

    current_node = root
    while current_node:
        full_text_parts.append(current_node.content)

        # Seçilen choice'u bul
        selected_choice = next(
            (c for c in current_node.choices if c.selected), None
        )
        if selected_choice and selected_choice.next_node_id:
            current_node = next(
                (n for n in nodes if n.id == selected_choice.next_node_id), None
            )
        else:
            current_node = None

    return "\n\n".join(full_text_parts)


def build_webhook_payload(db: Session, story: Story) -> WebhookPayload:
    """Webhook payload'ını oluştur"""
    user = db.query(User).filter(User.id == story.user_id).first()
    full_text = collect_story_text(db, story)

    node_count = db.query(StoryNode).filter(StoryNode.story_id == story.id).count()
    from app.models import Choice
    choice_count = (
        db.query(Choice)
        .join(StoryNode)
        .filter(StoryNode.story_id == story.id, Choice.selected == True)
        .count()
    )

    return WebhookPayload(
        event="story_completed",
        story_id=story.id,
        title=story.title,
        user_id=story.user_id,
        username=user.username if user else "unknown",
        parent_email=user.parent_email if user else None,
        language=story.language,
        theme=story.theme,
        full_text=full_text,
        completed_at=story.completed_at.isoformat() if story.completed_at else datetime.utcnow().isoformat(),
        node_count=node_count,
        choice_count=choice_count,
    )


async def send_webhook(db: Session, story: Story) -> dict:
    """
    Masal tamamlandığında webhook gönder.

    Webhook URL'si .env dosyasında WEBHOOK_URL olarak tanımlanmalıdır.
    n8n veya Make ile uyumlu JSON payload gönderir.

    Returns:
        dict: Başarı durumu ve mesaj
    """
    webhook_url = settings.WEBHOOK_URL

    if not webhook_url or webhook_url == "https://your-n8n-instance.com/webhook/masalmatik":
        logger.warning("Webhook URL yapılandırılmamış. Webhook gönderilmedi.")
        return {
            "success": False,
            "message": "Webhook URL yapılandırılmamış. .env dosyasında WEBHOOK_URL değerini ayarlayın.",
        }

    payload = build_webhook_payload(db, story)

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                webhook_url,
                json=payload.model_dump(),
                headers={
                    "Content-Type": "application/json",
                    "X-MasalMatik-Event": "story_completed",
                    "X-MasalMatik-Story-ID": str(story.id),
                },
            )

        if response.status_code in (200, 201, 202, 204):
            logger.info(
                f"Webhook başarıyla gönderildi. Story ID: {story.id}, "
                f"Status: {response.status_code}"
            )
            return {
                "success": True,
                "message": f"Webhook gönderildi (HTTP {response.status_code})",
                "payload_preview": {
                    "story_id": payload.story_id,
                    "title": payload.title,
                    "node_count": payload.node_count,
                },
            }
        else:
            logger.error(
                f"Webhook hatası. Story ID: {story.id}, "
                f"Status: {response.status_code}, Body: {response.text[:200]}"
            )
            return {
                "success": False,
                "message": f"Webhook hatası: HTTP {response.status_code}",
            }

    except httpx.TimeoutException:
        logger.error(f"Webhook zaman aşımı. Story ID: {story.id}")
        return {"success": False, "message": "Webhook zaman aşımına uğradı (30s)"}

    except httpx.ConnectError as e:
        logger.error(f"Webhook bağlantı hatası. Story ID: {story.id}, Error: {e}")
        return {"success": False, "message": f"Webhook bağlantı hatası: {str(e)}"}

    except Exception as e:
        logger.error(f"Webhook beklenmeyen hata. Story ID: {story.id}, Error: {e}")
        return {"success": False, "message": f"Beklenmeyen hata: {str(e)}"}
