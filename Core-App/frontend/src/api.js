/**
 * MasalMatik AI - API İstemci Modülü
 * Backend API çağrılarını yönetir
 */

const API_BASE = "http://localhost:8000";
const USE_MOCK = true; // Demo için aktif edildi, API kullanılmadan çalışmasını sağlar

// Mock verileri için basit bir state
const mockState = {
  step: 1,
  fullStory: "",
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Yeni bir masal başlatır
 * @param {string} character - Ana karakter
 * @param {string} theme - Tema/Mekan
 * @param {string} childName - Çocuğun adı
 * @param {string} lesson - Öğüt (Ebeveyn ayarı)
 * @param {number} maxSteps - Maksimum adım (Ebeveyn ayarı)
 * @returns {Promise<Object>} İlk paragraf ve seçenekler
 */
export async function startStory(character, theme, childName, lesson, maxSteps) {
  if (USE_MOCK) {
    await delay(1500); // Gerçekçi bir gecikme
    mockState.step = 1;
    const namePart = childName ? `${childName} adında bir ` : "Bir ";
    const paragraph = `Bir varmış bir yokmuş... Büyülü ${theme} diyarında, ${namePart}${character} yaşarmış. Bir gün uzaklardan gizemli bir ses duymuş ve maceraya atılmaya karar vermiş. Yolda karşısına iki farklı yön çıkmış.`;
    mockState.fullStory = paragraph;
    
    return {
      session_id: "mock-session-123",
      step: mockState.step,
      paragraph: paragraph,
      image_prompt: `${theme} diyarında macera arayan sevimli ${character}`,
      choices: [
        { text: "Sesin geldiği karanlık mağaraya gitmek", emoji: "🦇" },
        { text: "Işıltılı nehir boyunca yürümek", emoji: "🌊" }
      ]
    };
  }

  const response = await fetch(`${API_BASE}/start-story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      character,
      theme,
      child_name: childName || undefined,
      lesson: lesson || undefined,
      max_steps: maxSteps ? parseInt(maxSteps, 10) : 4,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Hikâye başlatılamadı");
  }

  return response.json();
}

/**
 * Hikâyeyi devam ettirir
 * @param {string} sessionId - Oturum kimliği
 * @param {string} chosenOption - Seçilen seçenek metni
 * @returns {Promise<Object>} Sonraki paragraf ve seçenekler
 */
export async function continueStory(sessionId, chosenOption) {
  if (USE_MOCK) {
    await delay(2000);
    mockState.step += 1;
    
    const isFinal = mockState.step >= 3; // 3 adımda bitsin
    let paragraph = "";
    let choices = [];
    
    if (mockState.step === 2) {
      paragraph = `${chosenOption} kararını verdikten sonra yola koyulmuş. İlerledikçe karşısına konuşan sevimli bir baykuş çıkmış. Baykuş ona bir bilmece sormuş ve "Eğer bilirsen sana sihirli bir eşya veririm" demiş.`;
      choices = [
        { text: "Bilmecenin cevabını düşünmek", emoji: "🤔" },
        { text: "Baykuşla arkadaş olmaya çalışmak", emoji: "🦉" }
      ];
    } else {
      paragraph = `${chosenOption}... Bu harika bir seçimdi! Sonunda aradığı büyülü hazineyi bulmuş ve herkesin mutlu olduğu büyük bir şenlik düzenlenmiş. Gökyüzünde havai fişekler patlarken kahramanımız eve dönmüş.`;
    }
    
    mockState.fullStory += "\n\n" + paragraph;
    
    return {
      step: mockState.step,
      paragraph: paragraph,
      image_prompt: `Masal dünyasında epik bir an, ${chosenOption}`,
      choices: choices,
      is_final_step: isFinal
    };
  }

  const response = await fetch(`${API_BASE}/continue-story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      chosen_option: chosenOption,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Hikâye devam ettirilemedi");
  }

  return response.json();
}

/**
 * Hikâyeyi sonlandırır ve webhook tetikler
 * @param {string} sessionId - Oturum kimliği
 * @param {string} email - E-posta adresi (opsiyonel)
 * @returns {Promise<Object>} Tam hikâye ve webhook durumu
 */
export async function endStory(sessionId, email) {
  if (USE_MOCK) {
    await delay(1500);
    return {
      title: "Büyülü Ormanın Sırrı",
      webhook_sent: true,
      message: "Masalın tamamlandı! (Mock Demo: Webhook tetiklendi gibi davranıldı)",
      full_story: mockState.fullStory
    };
  }

  const response = await fetch(`${API_BASE}/end-story`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      email: email || undefined,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Hikâye sonlandırılamadı");
  }

  return response.json();
}
