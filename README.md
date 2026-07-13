# MasalMatik AI

## Proje Özeti
**MasalMatik AI**, çocuklar için yapay zeka destekli, eğitici ve eğlenceli bir masal platformudur. Amacımız, çocukların hayal güçlerini beslerken, onlara güvenli, eğitici ve tamamen kişiselleştirilmiş hikayeler sunmaktır.

## Mimari
Projemiz, birbirinden tamamen bağımsız (decoupled) iki ana modülden oluşan profesyonel bir Monorepo yapısı üzerine inşa edilmiştir:

1. **Landing Page:** Kullanıcıların projeyi tanıdığı, vizyonumuzu ve özelliklerimizi sergileyen hızlı ve SEO uyumlu ön yüz.
2. **Core App:** Kullanıcıların giriş yapıp AI ile etkileşime girdiği, masalların üretildiği ana uygulama.

**Neden bu mimariyi seçtik?**
- Geliştirme süreçlerini birbirinden izole ederek hızlandırmak.
- Farklı ölçeklenme (scaling) ihtiyaçlarına göre her modülü bağımsız yönetebilmek.
- Projenin vitrini (Landing) ile iş mantığını (Core) birbirinden ayırarak kod karmaşasını önlemek.

## Teknolojiler
- **Landing Page:** React, Tailwind CSS
- **Core App Backend:** Python, FastAPI
- **Core App Frontend:** React (veya projenin gereksinimlerine göre ilgili framework)
- **AI Entegrasyonu:** OpenAI API

## Kurulum Adımları

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Depoyu Klonlayın
```bash
git clone <proje-repo-url>
cd MasalMatik-AI
```

### 2. Landing Page Kurulumu
```bash
cd Landing-Page
npm install
# .env dosyasını oluşturun
cp .env.example .env
# Uygulamayı başlatın
npm run dev
```

### 3. Core App Kurulumu
```bash
cd ../Core-App
# Sanal ortamı oluşturun ve aktif edin
python -m venv venv
# Windows için: venv\Scripts\activate
# Mac/Linux için: source venv/bin/activate

# Gerekli kütüphaneleri yükleyin
pip install -r requirements.txt

# .env dosyasını oluşturun
cp .env.example .env

# API'yi başlatın
uvicorn main:app --reload
```

## Ekip
- **Geliştirici Ekibi:** Bu bölüm ekibinizin bilgileriyle güncellenecektir.
