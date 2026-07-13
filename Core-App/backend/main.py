"""
MasalMatik AI - FastAPI Backend
Çocuklar için interaktif masal uygulaması API'si
"""

import os
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI

from models import (
    StartStoryRequest,
    ContinueStoryRequest,
    EndStoryRequest,
    StoryResponse,
    StoryChoice,
    EndStoryResponse,
)
from story_engine import (
    create_session,
    get_session,
    generate_story_start,
    generate_story_continuation,
    compile_full_story,
)

# ─── Environment ──────────────────────────────────────────────────

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "")

# ─── FastAPI App ──────────────────────────────────────────────────

app = FastAPI(
    title="MasalMatik AI",
    description="Çocuklar için interaktif masal uygulaması API'si",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── OpenAI Client ────────────────────────────────────────────────

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)


# ─── Health Check ─────────────────────────────────────────────────

@app.get("/")
async def health_check():
    return {"status": "ok", "app": "MasalMatik AI", "version": "1.0.0"}


# ─── POST /start-story ────────────────────────────────────────────

@app.post("/start-story", response_model=StoryResponse)
async def start_story(request: StartStoryRequest):
    """
    Yeni bir interaktif masal başlatır.
    Karakter ve temaya göre ilk paragrafı ve 2 seçeneği döner.
    """
    try:
        # Yeni oturum oluştur
        session_id = create_session(
            character=request.character,
            theme=request.theme,
            child_name=request.child_name,
            max_steps=request.max_steps or 4,
            lesson=request.lesson,
        )

        # OpenAI ile ilk paragrafı üret
        result = await generate_story_start(
            client=openai_client,
            character=request.character,
            theme=request.theme,
            child_name=request.child_name or "küçük kahraman",
            session_id=session_id,
        )

        return StoryResponse(
            session_id=result["session_id"],
            paragraph=result["paragraph"],
            choices=[StoryChoice(**c) for c in result["choices"]],
            image_prompt=result.get("image_prompt", ""),
            step=result["step"],
            is_final_step=result["is_final_step"],
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hikâye başlatılamadı: {str(e)}")


# ─── POST /continue-story ─────────────────────────────────────────

@app.post("/continue-story", response_model=StoryResponse)
async def continue_story(request: ContinueStoryRequest):
    """
    Çocuğun seçtiği seçeneğe göre hikâyeyi devam ettirir.
    Bir sonraki paragrafı, 2 yeni seçeneği ve görsel promptunu döner.
    """
    # Oturum kontrolü
    session = get_session(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Oturum bulunamadı. Yeni bir masal başlatın.")

    try:
        result = await generate_story_continuation(
            client=openai_client,
            session_id=request.session_id,
            chosen_option=request.chosen_option,
        )

        return StoryResponse(
            session_id=result["session_id"],
            paragraph=result["paragraph"],
            choices=[StoryChoice(**c) for c in result.get("choices", [])],
            image_prompt=result.get("image_prompt", ""),
            step=result["step"],
            is_final_step=result["is_final_step"],
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hikâye devam ettirilemedi: {str(e)}")


# ─── POST /end-story ──────────────────────────────────────────────

@app.post("/end-story", response_model=EndStoryResponse)
async def end_story(request: EndStoryRequest):
    """
    Hikâyeyi sonlandırır, tam metni derler ve webhook'a POST eder.
    n8n / Make üzerinden PDF oluşturup e-posta gönderilmesini tetikler.
    """
    session = get_session(request.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Oturum bulunamadı.")

    # Tam hikâyeyi derle
    compiled = compile_full_story(request.session_id)
    title = compiled["title"]
    full_story = compiled["full_story"]

    # Webhook'a POST et
    webhook_sent = False
    webhook_message = ""

    if WEBHOOK_URL:
        try:
            webhook_payload = {
                "title": title,
                "full_story": full_story,
                "character": session["character"],
                "theme": session["theme"],
                "child_name": session.get("child_name", ""),
                "email": request.email or "",
                "total_steps": session["step"],
            }

            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(WEBHOOK_URL, json=webhook_payload)
                if response.status_code in (200, 201, 202):
                    webhook_sent = True
                    webhook_message = "Masalın başarıyla ailene e-posta olarak gönderildi! 📧"
                else:
                    webhook_message = "Masal tamamlandı ama e-posta gönderilemedi. Daha sonra tekrar deneyin."

        except Exception as e:
            webhook_message = f"Masal tamamlandı ama e-posta gönderilemedi: Webhook hatası."
            print(f"Webhook error: {e}")
    else:
        webhook_message = "Masalın tamamlandı! 🎉 (Webhook URL yapılandırılmamış)"

    return EndStoryResponse(
        session_id=request.session_id,
        full_story=full_story,
        title=title,
        webhook_sent=webhook_sent,
        message=webhook_message,
    )


# ─── Uvicorn Runner ──────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
