"""
MasalMatik AI - Story Engine
OpenAI API entegrasyonu ve hikâye üretim mantığı
"""

import json
import uuid
from typing import Dict, Any, Optional
from openai import AsyncOpenAI
from models import StoryChoice


# ─── In-Memory Session Store ─────────────────────────────────────

sessions: Dict[str, Dict[str, Any]] = {}


def create_session(character: str, theme: str, child_name: Optional[str] = None, max_steps: int = 4, lesson: Optional[str] = None) -> str:
    """Yeni bir hikâye oturumu oluşturur"""
    session_id = str(uuid.uuid4())
    sessions[session_id] = {
        "character": character,
        "theme": theme,
        "child_name": child_name or "küçük kahraman",
        "step": 0,
        "max_steps": max_steps,
        "lesson": lesson,
        "paragraphs": [],
        "choices_history": [],
        "title": "",
    }
    return session_id


def get_session(session_id: str) -> Optional[Dict[str, Any]]:
    """Oturum bilgisini döndürür"""
    return sessions.get(session_id)


def delete_session(session_id: str):
    """Oturumu siler"""
    sessions.pop(session_id, None)


# ─── OpenAI Prompt Builder ───────────────────────────────────────

SYSTEM_PROMPT = """Sen çocuklar için masallar yazan yaratıcı bir masal anlatıcısısın. 
Kurallar:
- Türkçe yaz, sade ve anlaşılır bir dil kullan (5-10 yaş grubu).
- Her paragraf 3-5 cümle olsun, çok uzun olmasın.
- Hikâye heyecanlı, eğlenceli ve eğitici olsun.
- Yanıtını MUTLAKA aşağıdaki JSON formatında ver, başka hiçbir şey yazma:

{
  "paragraph": "Hikâyenin bu bölümünün metni...",
  "choices": [
    {"emoji": "🌟", "text": "Seçenek A açıklaması"},
    {"emoji": "🔮", "text": "Seçenek B açıklaması"}
  ],
  "image_prompt": "Bu sahneyi betimleyen İngilizce görsel üretim promptu, children book illustration style"
}"""

FINAL_STEP_SYSTEM_PROMPT = """Sen çocuklar için masallar yazan yaratıcı bir masal anlatıcısısın. 
Kurallar:
- Türkçe yaz, sade ve anlaşılır bir dil kullan (5-10 yaş grubu).
- Bu hikâyenin SON bölümü. Hikâyeyi güzel ve tatmin edici bir şekilde bitir.
- Bir ders veya moral ile bitir.
- Yanıtını MUTLAKA aşağıdaki JSON formatında ver, başka hiçbir şey yazma:

{
  "paragraph": "Hikâyenin bu son bölümünün metni... Ve böylece... (güzel bir son)",
  "title": "Masalın başlığı",
  "image_prompt": "Bu sahneyi betimleyen İngilizce görsel üretim promptu, children book illustration style"
}"""


def build_start_prompt(character: str, theme: str, child_name: str, lesson: Optional[str] = None) -> str:
    """İlk hikâye başlangıcı için prompt oluşturur"""
    prompt = (
        f"'{child_name}' adlı bir çocuk için interaktif bir masal başlat.\n"
        f"Ana karakter: {character}\n"
        f"Masalın geçtiği yer/tema: {theme}\n\n"
    )
    if lesson:
        prompt += f"Bu masalın ana fikri/öğüdü şu olmalı: {lesson}\n\n"
    prompt += "Masalın ilk paragrafını yaz ve çocuğun seçebileceği 2 farklı seçenek sun."
    return prompt


def build_continue_prompt(session: Dict[str, Any], chosen_option: str) -> str:
    """Hikâye devamı için prompt oluşturur"""
    story_so_far = "\n\n".join(session["paragraphs"])
    is_final = session["step"] + 1 >= session["max_steps"]

    prompt = (
        f"Ana karakter: {session['character']}\n"
        f"Mekan/Tema: {session['theme']}\n"
        f"Şimdiye kadarki hikâye:\n{story_so_far}\n\n"
        f"Çocuk şu seçeneği seçti: \"{chosen_option}\"\n\n"
    )

    if is_final:
        prompt += "Bu hikâyenin SON bölümü. Hikâyeyi güzel bir şekilde bitir ve masala bir başlık ver."
        if session.get("lesson"):
            prompt += f" Hikâyenin sonunda şu öğüdü güzelce vurgula: {session['lesson']}"
    else:
        prompt += "Hikâyenin bir sonraki paragrafını yaz ve 2 yeni seçenek sun."

    return prompt


# ─── OpenAI API Calls ─────────────────────────────────────────────

async def generate_story_start(
    client: AsyncOpenAI,
    character: str,
    theme: str,
    child_name: str,
    session_id: str
) -> Dict[str, Any]:
    """İlk hikâye paragrafını üretir"""
    session = sessions[session_id]

    user_prompt = build_start_prompt(character, theme, child_name, session.get("lesson"))

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9,
        max_tokens=800,
        response_format={"type": "json_object"}
    )

    result = json.loads(response.choices[0].message.content)

    # Session güncelle
    session["step"] = 1
    session["paragraphs"].append(result["paragraph"])

    return {
        "session_id": session_id,
        "paragraph": result["paragraph"],
        "choices": result.get("choices", []),
        "image_prompt": result.get("image_prompt", ""),
        "step": 1,
        "is_final_step": False
    }


async def generate_story_continuation(
    client: AsyncOpenAI,
    session_id: str,
    chosen_option: str
) -> Dict[str, Any]:
    """Hikâyenin devamını üretir"""
    session = sessions[session_id]
    session["choices_history"].append(chosen_option)

    is_final = session["step"] + 1 >= session["max_steps"]
    system_prompt = FINAL_STEP_SYSTEM_PROMPT if is_final else SYSTEM_PROMPT
    user_prompt = build_continue_prompt(session, chosen_option)

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9,
        max_tokens=800,
        response_format={"type": "json_object"}
    )

    result = json.loads(response.choices[0].message.content)

    # Session güncelle
    session["step"] += 1
    session["paragraphs"].append(result["paragraph"])

    if is_final and "title" in result:
        session["title"] = result["title"]

    response_data = {
        "session_id": session_id,
        "paragraph": result["paragraph"],
        "choices": result.get("choices", []),
        "image_prompt": result.get("image_prompt", ""),
        "step": session["step"],
        "is_final_step": is_final
    }

    return response_data


def compile_full_story(session_id: str) -> Dict[str, str]:
    """Masalın tam metnini derler"""
    session = sessions.get(session_id)
    if not session:
        return {"title": "Bilinmeyen Masal", "full_story": ""}

    title = session.get("title", f"{session['character']} ve {session['theme']} Macerası")
    full_story = f"🌟 {title} 🌟\n\n"
    full_story += "\n\n".join(session["paragraphs"])

    return {"title": title, "full_story": full_story}
