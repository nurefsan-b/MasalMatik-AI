# MasalMatik AI

Çocukların ve dil öğrenen bireylerin seçimleriyle anlık olarak şekillenen, üretken yapay zekâ destekli interaktif bir dijital hikâye platformu.

## 📁 Proje Yapısı

```
├── frontend/          # React + Vite + Tailwind CSS v3
│   └── src/
│       ├── components/   # UI Bileşenleri (12 adet)
│       ├── data/         # Demo masal verileri
│       └── ...
│
├── backend/           # Python FastAPI + SQLAlchemy
│   └── app/
│       ├── models.py     # Veritabanı modelleri
│       ├── routers/      # API endpoint'leri
│       ├── services/     # İş mantığı
│       └── utils/        # AI simülasyonu
│
└── README.md          # Bu dosya
```

## 🚀 Hızlı Başlangıç

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresine gidin.

### Backend

```bash
cd backend

# Sanal ortam oluştur
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Bağımlılıkları kur
pip install -r requirements.txt

# .env dosyasını oluştur
copy .env.example .env       # Windows
# cp .env.example .env       # macOS/Linux

# Sunucuyu başlat
uvicorn app.main:app --reload
```

API `http://localhost:8000` adresinde çalışır.
Swagger UI: `http://localhost:8000/docs`

## 🧩 Özellikler

- **Landing Page**: 12 bileşenli, animasyonlu, responsive tanıtım sitesi
- **Demo Masal**: İnteraktif dallanmalı hikâye (3 seviye, 7 son)
- **API**: `/generate-story`, `/next-step` endpoint'leri
- **Veritabanı**: User, Story, StoryNode, Choice modelleri
- **Webhook**: Masal tamamlandığında n8n/Make tetikleme
- **3D Maskot**: CSS ile interaktif baykuş karakteri

## 📌 Notlar

- Backend varsayılan olarak **SQLite** kullanır (geliştirme için)
- PostgreSQL için `.env` dosyasında `DATABASE_URL` değerini güncelleyin
- AI simülasyonu şablonlarla yapılır — gerçek AI için `ai_mock.py` değiştirin
