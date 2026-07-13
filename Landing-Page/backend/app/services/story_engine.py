"""
MasalMatik AI — Hikâye Dallanma Motoru

Hikâye üretim, dallanma ve tamamlama mantığını yönetir.
"""

import datetime
from sqlalchemy.orm import Session

from app.models import Story, StoryNode, Choice, User, StoryStatus
from app.schemas import (
    GenerateStoryRequest,
    GenerateStoryResponse,
    NextStepRequest,
    NextStepResponse,
    StoryResponse,
    StoryNodeResponse,
    ChoiceResponse,
    StoryTreeNode,
    StoryTreeChoice,
    StoryTreeResponse,
)
from app.utils.ai_mock import generate_opening, generate_next_content
from app.config import settings


# ────────────────────────────────────────────────────
# Hikâye Başlatma
# ────────────────────────────────────────────────────
def create_story(db: Session, request: GenerateStoryRequest) -> GenerateStoryResponse:
    """Yeni bir hikâye başlat"""

    # Kullanıcıyı kontrol et (yoksa oluştur — prototip için)
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        user = User(
            id=request.user_id,
            username=f"user_{request.user_id}",
            email=f"user_{request.user_id}@masalmatik.ai",
        )
        db.add(user)
        db.flush()

    # AI ile açılış metnini üret
    opening = generate_opening(request.theme, request.character_name)

    # Hikâyeyi oluştur
    story = Story(
        user_id=user.id,
        title=opening["title"],
        theme=request.theme,
        language=request.language,
        status=StoryStatus.ACTIVE.value,
    )
    db.add(story)
    db.flush()

    # İlk node'u oluştur
    root_node = StoryNode(
        story_id=story.id,
        parent_node_id=None,
        content=opening["content"],
        image_prompt=opening["image_prompt"],
        is_end=False,
        depth_level=0,
    )
    db.add(root_node)
    db.flush()

    # İlk seçenekleri üret
    next_content = generate_next_content(
        theme=request.theme,
        character_name=request.character_name,
        depth_level=1,
    )

    choices_db = []
    for choice_data in next_content["choices"]:
        choice = Choice(
            node_id=root_node.id,
            text=choice_data["text"],
            selected=False,
        )
        db.add(choice)
        choices_db.append(choice)

    db.commit()
    db.refresh(story)
    db.refresh(root_node)

    # Response oluştur
    choice_responses = [
        ChoiceResponse(id=c.id, text=c.text, selected=c.selected)
        for c in choices_db
    ]

    node_response = StoryNodeResponse(
        id=root_node.id,
        content=root_node.content,
        image_prompt=root_node.image_prompt,
        is_end=root_node.is_end,
        depth_level=root_node.depth_level,
        choices=choice_responses,
    )

    story_response = StoryResponse(
        id=story.id,
        title=story.title,
        theme=story.theme,
        language=story.language,
        status=story.status,
        created_at=story.created_at,
        completed_at=story.completed_at,
        current_node=node_response,
    )

    return GenerateStoryResponse(
        story=story_response,
        message="Hikâye başarıyla oluşturuldu! İlk seçimini yap ve maceraya başla! 🚀",
    )


# ────────────────────────────────────────────────────
# Sonraki Adım
# ────────────────────────────────────────────────────
def process_next_step(db: Session, request: NextStepRequest) -> NextStepResponse:
    """Kullanıcının seçimini işle ve sonraki adımı üret"""

    # Hikâyeyi bul
    story = db.query(Story).filter(Story.id == request.story_id).first()
    if not story:
        raise ValueError(f"Hikâye bulunamadı: {request.story_id}")

    if story.status == StoryStatus.COMPLETED.value:
        raise ValueError("Bu hikâye zaten tamamlanmış.")

    # Seçimi bul
    choice = db.query(Choice).filter(Choice.id == request.choice_id).first()
    if not choice:
        raise ValueError(f"Seçenek bulunamadı: {request.choice_id}")

    # Seçimi işaretle
    choice.selected = True
    db.flush()

    # Mevcut node'u bul
    current_node = db.query(StoryNode).filter(StoryNode.id == choice.node_id).first()

    # Yeni derinlik seviyesi
    new_depth = current_node.depth_level + 1

    # AI ile yeni içerik üret
    next_content = generate_next_content(
        theme=story.theme,
        character_name=story.title.split("'")[0] if "'" in story.title else "Kahraman",
        depth_level=new_depth,
        choice_text=choice.text,
    )

    # Yeni node oluştur
    new_node = StoryNode(
        story_id=story.id,
        parent_node_id=current_node.id,
        content=next_content["content"],
        image_prompt=next_content.get("image_prompt"),
        is_end=next_content["is_end"],
        depth_level=new_depth,
    )
    db.add(new_node)
    db.flush()

    # Choice'u yeni node'a bağla
    choice.next_node_id = new_node.id

    # Yeni seçenekleri oluştur (son sayfa değilse)
    new_choices = []
    if not next_content["is_end"]:
        for choice_data in next_content.get("choices", []):
            new_choice = Choice(
                node_id=new_node.id,
                text=choice_data["text"],
                selected=False,
            )
            db.add(new_choice)
            new_choices.append(new_choice)
    else:
        # Hikâye tamamlandı
        story.status = StoryStatus.COMPLETED.value
        story.completed_at = datetime.datetime.utcnow()

    db.commit()
    db.refresh(new_node)

    # Response
    choice_responses = [
        ChoiceResponse(id=c.id, text=c.text, selected=c.selected)
        for c in new_choices
    ]

    node_response = StoryNodeResponse(
        id=new_node.id,
        content=new_node.content,
        image_prompt=new_node.image_prompt,
        is_end=new_node.is_end,
        depth_level=new_node.depth_level,
        choices=choice_responses,
    )

    message = ""
    if next_content["is_end"]:
        message = "🎉 Masal tamamlandı! Harika bir macera oldu!"
    else:
        message = "Sıradaki seçimini yap ve maceraya devam et! ✨"

    return NextStepResponse(
        story_id=story.id,
        node=node_response,
        is_story_complete=next_content["is_end"],
        message=message,
    )


# ────────────────────────────────────────────────────
# Hikâye Ağacı
# ────────────────────────────────────────────────────
def get_story_tree(db: Session, story_id: int) -> StoryTreeResponse:
    """Hikâyenin tüm ağaç yapısını döndür"""
    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise ValueError(f"Hikâye bulunamadı: {story_id}")

    # Root node
    root = (
        db.query(StoryNode)
        .filter(StoryNode.story_id == story_id, StoryNode.parent_node_id == None)
        .first()
    )

    if not root:
        return StoryTreeResponse(
            story_id=story.id,
            title=story.title,
            theme=story.theme,
            root_node=None,
        )

    def build_tree_node(node: StoryNode) -> StoryTreeNode:
        choices = []
        for choice in node.choices:
            next_node = None
            if choice.next_node_id:
                child = db.query(StoryNode).filter(StoryNode.id == choice.next_node_id).first()
                if child:
                    next_node = build_tree_node(child)

            choices.append(StoryTreeChoice(
                id=choice.id,
                text=choice.text,
                selected=choice.selected,
                next_node=next_node,
            ))

        return StoryTreeNode(
            id=node.id,
            content=node.content,
            image_prompt=node.image_prompt,
            is_end=node.is_end,
            depth_level=node.depth_level,
            choices=choices,
        )

    root_tree = build_tree_node(root)

    return StoryTreeResponse(
        story_id=story.id,
        title=story.title,
        theme=story.theme,
        root_node=root_tree,
    )


# ────────────────────────────────────────────────────
# Kullanıcının hikâyeleri
# ────────────────────────────────────────────────────
def get_user_stories(db: Session, user_id: int) -> list[StoryResponse]:
    """Kullanıcının tüm hikâyelerini listele"""
    stories = db.query(Story).filter(Story.user_id == user_id).order_by(Story.created_at.desc()).all()

    return [
        StoryResponse(
            id=s.id,
            title=s.title,
            theme=s.theme,
            language=s.language,
            status=s.status,
            created_at=s.created_at,
            completed_at=s.completed_at,
        )
        for s in stories
    ]
