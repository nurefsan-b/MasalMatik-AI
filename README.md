<img width="202.5" height="215.5" alt="Ekran görüntüsü 2026-07-13 133716" src="https://github.com/user-attachments/assets/d5fcb396-347f-405b-9b44-5e828494dec3" />
 MasalMatik AI

*Bu repo, 4 - 12 Temmuz tarihleri arasında gerçekleşen **BTK Akademi MANİSA - Yapay Zekâ ile İçerik Üretimi Eğitimi** final projesi kapsamında geliştirilmiştir.*

## 🌟 Proje Özeti
MasalMatik AI, çocuklar için yapay zeka destekli, eğitici ve eğlenceli bir masal platformudur. Amacımız, çocukların hayal güçlerini beslerken, onlara güvenli, eğitici ve tamamen kişiselleştirilmiş hikayeler sunmaktır. Sevimli maskotumuz "Duki" rehberliğinde çocuklar kendi maceralarını seçerek hikayenin akışını belirlerler.

## 🎬 Proje Sunumu ve Görseller
Projemizin detaylı sunumuna, ekran görüntülerine ve çalışan demo videosuna aşağıdan ulaşabilirsiniz:
<img width="941" height="526" alt="Ekran görüntüsü 2026-07-13 133850" src="https://github.com/user-attachments/assets/292f95f1-940f-496f-b1ef-d25d1dea0757" />
<img width="945" height="531" alt="Ekran görüntüsü 2026-07-13 134039" src="https://github.com/user-attachments/assets/02754532-c482-4c84-b609-785c5a82cee1" />
<img width="941" height="531" alt="Ekran görüntüsü 2026-07-13 134059" src="https://github.com/user-attachments/assets/da7fd8d5-f23e-4d5a-b45e-06ac8a1ac2bb" />
<img width="943" height="529" alt="Ekran görüntüsü 2026-07-13 134114" src="https://github.com/user-attachments/assets/cd297a0e-eb8f-4d20-911b-0013cb2505eb" />
<img width="944" height="529" alt="Ekran görüntüsü 2026-07-13 134132" src="https://github.com/user-attachments/assets/9409b5f2-6511-48cd-8432-cbea44c967f8" />
<img width="946" height="530" alt="Ekran görüntüsü 2026-07-13 134147" src="https://github.com/user-attachments/assets/73682ce5-300d-42a7-bca8-7cb496e5c49d" />
<img width="945" height="533" alt="image" src="https://github.com/user-attachments/assets/76231d84-5331-4283-afd8-69fee07c275a" />
<img width="942" height="531" alt="image" src="https://github.com/user-attachments/assets/af8fd498-3600-4a80-a5ee-a6970443c5c0" />
<img width="941" height="528" alt="image" src="https://github.com/user-attachments/assets/707d9937-e199-4d10-8f6d-aa447b7d02dc" />
<img width="945" height="530" alt="image" src="https://github.com/user-attachments/assets/74bdfb06-9323-43dd-b5c2-9e6290500a96" />
<img width="941" height="530" alt="image" src="https://github.com/user-attachments/assets/e19feb61-e1b3-4235-a1cc-33a0e1f7f261" />
<img width="944" height="530" alt="image" src="https://github.com/user-attachments/assets/abc21a03-23a9-415e-b98d-46a5629e1d82" />


* **[Tanıtım Websitesi Demo Videosu (YouTube) İçin Tıklayın](https://youtu.be/POAXUmzv6JE)**
* **[Proje Demo Videosu (YouTube) İçin Tıklayın](https://youtu.be/l0A4cD-pCrQ)**


## 🏗️ Mimari Yapı (Decoupled Architecture)
Projemiz, yüksek trafik durumlarında bile ana sistemin kesintisiz çalışmasını sağlamak amacıyla, iki tamamen bağımsız modülden oluşan profesyonel bir Monorepo yapısı üzerine inşa edilmiştir:

1. **`Landing Page`**: Kullanıcıların projeyi tanıdığı, vizyonumuzu ve özelliklerimizi sergileyen hızlı ve SEO uyumlu ön yüz.
2. **`Core App`**: Kullanıcıların giriş yapıp AI ile etkileşime girdiği, masalların üretildiği ana uygulama.

**Neden bu mimariyi seçtik?**
* Geliştirme süreçlerini birbirinden izole ederek hızlandırmak.
* Farklı ölçeklenme (scaling) ihtiyaçlarına göre her modülü bağımsız yönetebilmek.
* Projenin vitrini (Landing) ile iş mantığını (Core) birbirinden ayırarak kod karmaşasını önlemek.

## 🚀 Teknolojiler
* **Landing Page:** React, Tailwind CSS
* **Core App Backend:** Python, FastAPI
* **Core App Frontend:** React 
* **AI Entegrasyonu:** OpenAI API (ve yapay zeka destekli görsel üretim araçları)
* **İş Akışı Otomasyonu:** Make.com / n8n

## ⚙️ Kurulum Adımları
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Depoyu Klonlayın
```bash
git clone <proje-repo-url>
cd MasalMatik-AI
