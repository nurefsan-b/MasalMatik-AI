"""
MasalMatik AI — Yapay Zekâ Simülasyonu

Prototip aşamasında gerçek bir AI API (OpenAI vb.) yerine
önceden hazırlanmış şablonlarla hikâye üretimi yapılır.

Gerçek entegrasyon için bu dosyayı değiştirmeniz yeterlidir.
"""

import random
from typing import Optional


# ────────────────────────────────────────────────────
# Tema bazlı hikâye şablonları
# ────────────────────────────────────────────────────
STORY_TEMPLATES = {
    "orman": {
        "title_template": "{character}'in Orman Macerası",
        "opening": (
            "Bir varmış bir yokmuş, {character} adında cesur bir kahraman varmış. "
            "Bir gün büyülü ormanın derinliklerine doğru yürümeye karar vermiş. "
            "Ağaçların arasından süzülen altın ışıklar, yolunu aydınlatıyormuş."
        ),
        "nodes": {
            1: {
                "content_options": [
                    "{character} ormanda parıldayan bir nehirle karşılaşmış. Nehrin suları gökkuşağı renklerinde akıyormuş!",
                    "{character} ormanda devasa bir meşe ağacının içinde küçük bir kapı görmüş. Kapının etrafı parlayan mantarlarla çevriliymiş.",
                ],
                "choices": [
                    ["Nehri takip et ve kaynağını bul", "Köprüden karşıya geç ve çiçek tarlasını keşfet"],
                    ["Kapıyı aç ve içeri gir", "Ağacın tepesine tırman ve etrafı gözle"],
                ],
            },
            2: {
                "content_options": [
                    "{character} yolda konuşan bir sincap ile karşılaşmış. Sincap, 'Büyülü meyveyi arıyorsan, sana yardım edebilirim!' demiş.",
                    "{character} parlayan bir mağara girişi bulmuş. İçeriden tatlı bir müzik sesi geliyormuş.",
                    "{character} bir peri çemberi görmüş! Küçük periler dans edip şarkı söylüyorlarmış.",
                    "{character} yaşlı ve bilge bir baykuşla tanışmış. Baykuş, 'Bu ormanda kaybolanlar, kalplerinin sesini dinleyerek yollarını bulurlar' demiş.",
                ],
                "choices": [
                    ["Sincapla arkadaş ol ve birlikte yola çık", "Sincaba teşekkür et ve kendi yoluna devam et"],
                    ["Mağaranın içine gir", "Müzik sesini dışarıdan dinle"],
                    ["Perilerin dansına katıl", "Perilere selam ver ve yoluna devam et"],
                    ["Baykuştan tavsiye iste", "Kendi içgüdülerine güven ve yürü"],
                ],
            },
            3: {
                "content_options": [
                    "{character} sonunda büyülü bir göle ulaşmış. Gölün ortasında parlayan bir nilüfer çiçeği varmış. Bu çiçek bir dilek gerçekleştirebilirmiş!",
                    "{character} ormanın kalbinde antik bir tapınak keşfetmiş. Tapınağın duvarlarında hayvan resimleri parlıyormuş.",
                    "{character} bir gökkuşağı köprüsü bulmuş. Köprünün sonunda bulutların üzerinde bir krallık görünüyormuş!",
                    "{character} ormandaki tüm hayvanlarla arkadaş olmuş. Hep birlikte büyük bir kutlama yapmışlar!",
                ],
                "choices": [
                    ["Nilüfer çiçeğine dokunup dilek tut", "Çiçeğe dokunma ve güzelliğini seyret"],
                    ["Tapınağın sırrını çöz", "Duvardaki resimleri çiz"],
                    ["Gökkuşağı köprüsünden geç", "Köprünün önünde bir mektup bırak"],
                    ["Kutlamada şarkı söyle", "Hayvanlarla bir oyun oyna"],
                ],
            },
        },
        "endings": [
            "{character} dilekçiçeğine dokunmuş ve 'Tüm çocuklar mutlu olsun!' diye dilek tutmuş. O andan itibaren orman her gece yıldızlarla parlamış ve {character} her zaman bu büyülü yere geri dönmüş. Masalımız burada biter, ama {character}'in maceraları hep devam eder! 🌟",
            "{character} tapınağın sırrını çözmüş: İçindeki ışık, sevgi ve cesaretin gücüymüş! Bu güçle ormanı sonsuza dek koruma sözü vermiş. Artık {character} ormanın koruyucusuymuş! 🦉",
            "{character} gökkuşağı köprüsünden geçip bulut krallığına ulaşmış. Orada bulut insanlarıyla arkadaş olmuş ve her akşam yıldızlarla oynamış. Ama evini de hiç unutmamış ve her gece rüyalarında ailesini ziyaret etmiş! ☁️",
            "{character} ormanın tüm hayvanlarıyla kutlama yapmış. Herkes dans etmiş, şarkı söylemiş! O günden sonra {character} ormandaki en sevilen kahraman olmuş. Hep birlikte, mutlu sonsuza dek yaşamışlar! 🎉",
            "Ve böylece {character} ormanın en büyük sırrını öğrenmiş: Gerçek macera, paylaştıkça büyürmüş! {character} evine döndüğünde, kalbinde büyülü ormanın sıcaklığını hep taşımış. 💖",
            "{character} büyülü nehrin kaynağını bulmuş: Bir gökkuşağı şelalesi! Şelalenin suyu, her şeye hayat veriyormuş. {character} bu sırrı korumuş ve ormandaki tüm canlılarla paylaşmış. 🌈",
            "{character} ağacın tepesine tırmanıp tüm ormanı görmüş. Ufukta parlayan bir ışık, onu yeni maceralara çağırıyormuş. Ama şimdilik, güvenle evine dönüp, yarınki maceralarını planlamış! 🌅",
        ],
    },
    "deniz": {
        "title_template": "{character}'in Deniz Macerası",
        "opening": (
            "Bir varmış bir yokmuş, {character} adında meraklı bir kahraman varmış. "
            "Bir gün sahilde yürürken, dalgaların arasından parlayan bir şişe bulmuş. "
            "Şişenin içinde eski bir harita varmış — Kayıp Mercan Adası'nın haritası!"
        ),
        "nodes": {
            1: {
                "content_options": [
                    "{character} haritayı takip ederek küçük bir tekneye binmiş. Denizin ortasında yunuslar onu karşılamış!",
                    "{character} sahilde büyülü bir deniz kabuğu bulmuş. Kabuğu kulağına tutunca, denizin altından bir ses duymuş!",
                ],
                "choices": [
                    ["Yunuslarla birlikte yüz", "Tekneyle adaya doğru devam et"],
                    ["Sesi takip et ve suya dal", "Kabuğa cevap ver ve konuş"],
                ],
            },
            2: {
                "content_options": [
                    "{character} denizin altında kristal bir saray görmüş. Sarayda nazik bir deniz kızı yaşıyormuş!",
                    "{character} batık bir korsan gemisi bulmuş. Geminin içinde parlayan bir hazine sandığı varmış!",
                    "{character} renkli mercanların arasında yüzerken, konuşan bir ahtapotla tanışmış. Ahtapot sekiz kolunun her birinde farklı bir hediye tutuyormuş!",
                    "{character} devasa bir deniz kaplumbağasının sırtında yolculuk etmiş. Kaplumbağa onu gizli bir lagüne götürmüş!",
                ],
                "choices": [
                    ["Deniz kızıyla arkadaş ol", "Sarayı keşfet"],
                    ["Hazine sandığını aç", "Geminin güvertesini keşfet"],
                    ["Ahtapotun hediyelerinden birini seç", "Ahtapota bir hikâye anlat"],
                    ["Lagünde yüz ve keşfet", "Kaplumbağaya teşekkür et ve sahile dön"],
                ],
            },
            3: {
                "content_options": [
                    "{character} Kayıp Mercan Adası'na ulaşmış! Ada, gökkuşağı renkli mercanlarla kaplıymış ve her mercan bir melodi çalıyormuş!",
                    "{character} denizin en derin noktasında parlayan bir inci bulmuş. Bu inci, denizin tüm canlılarına mutluluk veriyormuş!",
                    "{character} deniz altı krallığında büyük bir festival olduğunu öğrenmiş. Tüm deniz canlıları kutlama yapıyormuş!",
                    "{character} büyülü bir deniz atı ordusunun lideriyle tanışmış. Lider, 'Sen cesur bir kalptesin, gel bizimle dans et!' demiş.",
                ],
                "choices": [
                    ["Mercanların melodisini dinle", "Adayı baştan sona keşfet"],
                    ["İnciyi koru ve taşı", "İnciyi denize geri bırak"],
                    ["Festivale katıl ve dans et", "Festival için bir şarkı yaz"],
                    ["Deniz atlarıyla dans et", "Lidere hikâyeni anlat"],
                ],
            },
        },
        "endings": [
            "{character} Mercan Adası'nda mercanların melodisini dinlemiş. Bu müzik, denizin en güzel şarkısıymış. {character} bu şarkıyı öğrenmiş ve her gece sahilde söylemiş. Deniz, ona hep teşekkür etmiş! 🐚",
            "{character} büyülü inciyi denize geri bırakmış. O andan itibaren deniz daha da güzel parlamış. {character} gerçek hazinenin paylaşmak olduğunu öğrenmiş! 🌊",
            "{character} deniz altı festivalinde dans etmiş ve tüm deniz canlılarıyla arkadaş olmuş. Artık her yaz, deniz altı dostlarını ziyaret ediyor! 🐠",
            "{character} sahile döndüğünde, cebinde büyülü deniz kabuğu hâlâ duruyormuş. Her kulağına tuttuğunda, deniz altı arkadaşlarının sesini duyuyormuş. Macera hiç bitmemiş! 🐬",
            "{character} deniz atlarıyla muhteşem bir gösteri yapmış. Tüm okyanus alkışlamış! O günden sonra {character}, 'Denizlerin Kahramanı' olarak anılmış! 🌟",
        ],
    },
    "uzay": {
        "title_template": "{character}'in Uzay Macerası",
        "opening": (
            "Bir varmış bir yokmuş, {character} adında hayalperest bir kahraman varmış. "
            "Bir gece gökyüzüne bakarken, parlayan bir yıldız ışığı {character}'in odasına düşmüş. "
            "Işığın içinde minik bir uzay gemisi belirmiş — ve macera başlamış!"
        ),
        "nodes": {
            1: {
                "content_options": [
                    "{character} uzay gemisine binmiş ve yıldızların arasında uçmaya başlamış. İlk durak: Ay! Ay'ın yüzeyinde parlayan kristaller varmış!",
                    "{character} uzay gemisiyle bir asteroit kuşağına ulaşmış. Her asteroitin üzerinde farklı renkli çiçekler açmış!",
                ],
                "choices": [
                    ["Ay kristallerini topla", "Ay'ın karanlık yüzünü keşfet"],
                    ["Çiçekleri kokla ve incele", "Asteroidler arasında yarış yap"],
                ],
            },
            2: {
                "content_options": [
                    "{character} mor bir gezegende inmiş. Burada her şey ters düz: ağaçlar aşağı doğru büyüyor, yağmur yukarı yağıyormuş!",
                    "{character} bir uzay istasyonuna ulaşmış. İstasyonda farklı gezegenlerden gelen dostça uzaylılar yaşıyormuş!",
                    "{character} bir nebula bulutunun içinden geçmiş. Bulutun içi gökkuşağı renklerinde parlıyormuş ve yıldız tozu her yere saçılıyormuş!",
                    "{character} konuşan bir robot ile tanışmış. Robot, 'Ben kayboldum, bana evimi bulmamda yardım eder misin?' demiş.",
                ],
                "choices": [
                    ["Ters düz dünyayı keşfet", "Yerçekimini düzeltmeye çalış"],
                    ["Uzaylılarla arkadaş ol", "Uzaylıların dilini öğren"],
                    ["Yıldız tozlarından bir resim yap", "Nebulanın en parlak yıldızına uç"],
                    ["Robota yardım et", "Robotla birlikte yeni gezegenler keşfet"],
                ],
            },
            3: {
                "content_options": [
                    "{character} evrenin en büyük yıldızına ulaşmış. Yıldız aslında devasa bir dilek feneriymiş!",
                    "{character} galaksinin merkezinde bir uzay bahçesi keşfetmiş. Bahçede her gezegenin tohumları yetişiyormuş!",
                    "{character} uzayda bir müzik konseri bulmuş. Gezegenler orkestra gibi çalıyormuş!",
                    "{character} tüm uzay arkadaşlarıyla birlikte dünyaya dönmüş. Arkadaşları dünyayı görmeye çok heyecanlıymış!",
                ],
                "choices": [
                    ["Dilek fenerine bir dilek tut", "Yıldızın ışığını dünyaya gönder"],
                    ["Bir tohum al ve dünyada ek", "Bahçeyi koruma altına al"],
                    ["Gezegen konserini dinle", "Konsere katıl ve bir enstrüman çal"],
                    ["Arkadaşlarına dünyayı gezdır", "Birlikte bir uzay-dünya festivali yap"],
                ],
            },
        },
        "endings": [
            "{character} dilek yıldızına 'Tüm çocuklar yıldızlara ulaşabilsin!' diye dilek tutmuş. O geceden sonra her çocuk rüyasında yıldızlarla dans edebilmiş! ⭐",
            "{character} uzay bahçesinden bir tohum getirmiş. Tohumdan dünyada da yıldız çiçekleri açmış. Artık her gece bahçesi gökyüzü kadar parlıyormuş! 🌱",
            "{character} gezegen konserinde şarkı söylemiş. Sesi tüm evrende yankılanmış! O günden sonra 'Evrenin Şarkıcısı' olarak bilinmiş! 🎵",
            "{character} uzay arkadaşlarıyla dünyada bir festival düzenlemiş. İnsanlar ve uzaylılar dans etmiş, birlikte yemek yemiş. Artık evren bir büyük aileymiş! 🚀",
            "{character} dünyaya döndüğünde, uzay gemisi masasının üzerinde bekliyormuş. Her gece yeni bir maceraya çıkabilirmiş. Ama en güzel macera, eve dönmekmiş! 🌍",
        ],
    },
}


def generate_opening(theme: str, character_name: str) -> dict:
    """Hikâyenin açılış metnini üret"""
    template = STORY_TEMPLATES.get(theme, STORY_TEMPLATES["orman"])
    title = template["title_template"].format(character=character_name)
    content = template["opening"].format(character=character_name)

    return {
        "title": title,
        "content": content,
        "image_prompt": f"A cute {character_name} character starting an adventure in a magical {theme}, children's book illustration style, colorful and whimsical",
    }


def generate_next_content(
    theme: str,
    character_name: str,
    depth_level: int,
    choice_text: Optional[str] = None,
) -> dict:
    """Sonraki hikâye düğümünü üret"""
    template = STORY_TEMPLATES.get(theme, STORY_TEMPLATES["orman"])
    max_depth = 3

    # Son seviyeye ulaştıysa, son sayfayı döndür
    if depth_level >= max_depth:
        ending = random.choice(template["endings"]).format(character=character_name)
        return {
            "content": ending,
            "image_prompt": f"A beautiful happy ending scene for {character_name} in a magical {theme}, children's book illustration style, warm and joyful",
            "is_end": True,
            "choices": [],
        }

    # Mevcut seviye için içerik seç
    level_data = template["nodes"].get(depth_level, template["nodes"][1])
    option_index = random.randint(0, len(level_data["content_options"]) - 1)

    content = level_data["content_options"][option_index].format(character=character_name)
    choices = level_data["choices"][option_index]

    return {
        "content": content,
        "image_prompt": f"Scene: {content[:80]}... children's book illustration style, magical and colorful",
        "is_end": False,
        "choices": [{"text": c} for c in choices],
    }
