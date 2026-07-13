"""
MasalMatik AI — Hikâye API Router

/generate-story, /next-step ve ilgili endpoint'ler.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    GenerateStoryRequest,
    GenerateStoryResponse,
    NextStepRequest,
    NextStepResponse,
    StoryTreeResponse,
    StoryResponse,
)
from app.services.story_engine import (
    create_story,
    process_next_step,
    get_story_tree,
    get_user_stories,
)
from app.services.webhook import send_webhook
from app.models import Story, StoryStatus

router = APIRouter(prefix="/api", tags=["story"])


@router.post("/generate-story", response_model=GenerateStoryResponse)
def generate_story(request: GenerateStoryRequest, db: Session = Depends(get_db)):
    """
    Yeni bir hikâye başlat.

    Kullanıcının seçtiği tema ve karakter ile bir hikâye oluşturur.
    İlk sahneyi ve iki seçenek döndürür.
    """
    try:
        result = create_story(db, request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/next-step", response_model=NextStepResponse)
async def next_step(request: NextStepRequest, db: Session = Depends(get_db)):
    """
    Kullanıcının seçimini işle ve hikâyenin sonraki adımını üret.

    Eğer hikâye tamamlandıysa, webhook tetiklenir.
    """
    try:
        result = process_next_step(db, request)

        # Hikâye tamamlandıysa webhook gönder
        if result.is_story_complete:
            story = db.query(Story).filter(Story.id == request.story_id).first()
            if story:
                webhook_result = await send_webhook(db, story)
                result.message += f"\n📬 Webhook: {webhook_result['message']}"

        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/story/{story_id}", response_model=StoryTreeResponse)
def get_story(story_id: int, db: Session = Depends(get_db)):
    """
    Hikâyenin tüm ağaç yapısını döndür.

    Seçilen ve seçilmeyen tüm dalları içerir.
    """
    try:
        return get_story_tree(db, story_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/stories", response_model=list[StoryResponse])
def list_stories(user_id: int, db: Session = Depends(get_db)):
    """Kullanıcının tüm hikâyelerini listele"""
    return get_user_stories(db, user_id)


@router.get("/health")
def health_check():
    """API sağlık kontrolü"""
    return {
        "status": "healthy",
        "service": "MasalMatik AI API",
        "version": "1.0.0",
    }
