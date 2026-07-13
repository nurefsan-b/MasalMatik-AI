/**
 * MasalMatik AI — Demo Masal Verileri
 *
 * Dallanmalı ağaç yapısında interaktif hikâye senaryosu.
 * Her düğümde 2 seçenek sunulur, 3 seviye derinlikte 7 benzersiz son.
 */

const demoStoryData = {
  // ──── GİRİŞ ────
  node_start: {
    text: "Bir varmış bir yokmuş, küçük ve cesur bir kedi olan Minnoş, büyülü ormanın kenarında yaşarmış. Bir gece gökyüzünde parlayan gizemli bir yıldız görmüş. Yıldız, ormanın derinliklerinden ışık saçıyormuş...",
    background: "from-indigo-950 via-purple-950 to-slate-950",
    emoji: "🌟",
    choices: [
      {
        text: "🌲 Yıldızı takip et ve ormana gir",
        nextNode: "node_1a",
        emoji: "🌲",
      },
      {
        text: "🏠 Önce eve dön ve hazırlan",
        nextNode: "node_1b",
        emoji: "🏠",
      },
    ],
  },

  // ──── SEVİYE 1A: Ormana girdi ────
  node_1a: {
    text: "Minnoş cesaretle ormanın içine adım atmış! Ağaçlar fısıldaşıyor, yapraklar dans ediyormuş. Bir süre yürüdükten sonra yolun ikiye ayrıldığını görmüş. Bir yolda parlayan mantarlar, diğer yolda ise gökkuşağı renkli bir nehir akıyormuş.",
    background: "from-emerald-950 via-green-950 to-teal-950",
    emoji: "🍄",
    choices: [
      {
        text: "🍄 Parlayan mantarların yolunu seç",
        nextNode: "node_2a",
        emoji: "🍄",
      },
      {
        text: "🌈 Gökkuşağı nehri takip et",
        nextNode: "node_2b",
        emoji: "🌈",
      },
    ],
  },

  // ──── SEVİYE 1B: Eve döndü ────
  node_1b: {
    text: "Minnoş eve dönüp sırt çantasına bir fener, biraz yiyecek ve sevdiği battaniyesini koymuş. Tam kapıdan çıkarken, komşu baykuş Bilge Bey pencereden seslenmiş: 'Minnoş, bu gece büyülü bir gece! Dikkatli ol ama cesaretli de ol!'",
    background: "from-amber-950 via-orange-950 to-yellow-950",
    emoji: "🦉",
    choices: [
      {
        text: "🦉 Bilge Bey'den tavsiye iste",
        nextNode: "node_2c",
        emoji: "🦉",
      },
      {
        text: "⭐ Hemen yıldızı takip etmeye başla",
        nextNode: "node_2d",
        emoji: "⭐",
      },
    ],
  },

  // ──── SEVİYE 2A: Mantar yolu ────
  node_2a: {
    text: "Parlayan mantarlar Minnoş'u bir peri çemberine götürmüş! Küçücük periler dans ediyor, şarkı söylüyorlarmış. Perilerin kralı, Minnoş'a dönmüş: 'Sevgili kedicik, seni bekliyorduk! Yıldız Çiçeği'ni bulmamıza yardım eder misin?'",
    background: "from-fuchsia-950 via-pink-950 to-purple-950",
    emoji: "🧚",
    choices: [
      {
        text: "✨ Perilere yardım et!",
        nextNode: "node_end_1",
        emoji: "✨",
      },
      {
        text: "💭 Yıldız Çiçeği hakkında daha fazla bilgi iste",
        nextNode: "node_end_2",
        emoji: "💭",
      },
    ],
  },

  // ──── SEVİYE 2B: Nehir yolu ────
  node_2b: {
    text: "Gökkuşağı nehri Minnoş'u büyülü bir şelaleye götürmüş. Şelalenin arkasında kristal bir mağara varmış! Mağaranın içinde konuşan bir balık, 'Hoş geldin Minnoş! Ben bu nehrin koruyucusuyum. Dilek taşını mı arıyorsun?' demiş.",
    background: "from-cyan-950 via-blue-950 to-indigo-950",
    emoji: "🐟",
    choices: [
      {
        text: "💎 Dilek taşını ara",
        nextNode: "node_end_3",
        emoji: "💎",
      },
      {
        text: "🏊 Nehirde balıkla birlikte yüz",
        nextNode: "node_end_4",
        emoji: "🏊",
      },
    ],
  },

  // ──── SEVİYE 2C: Baykuştan tavsiye ────
  node_2c: {
    text: "Bilge Bey kanatlarını açmış ve Minnoş'u sırtına almış! 'Seni yıldızın düştüğü yere götüreceğim' demiş. Birlikte gökyüzünde süzülürken, aşağıda tüm ormanı görmüşler. Ormanın tam ortasında parlayan bir açıklık varmış!",
    background: "from-violet-950 via-purple-950 to-blue-950",
    emoji: "🌙",
    choices: [
      {
        text: "🪂 Açıklığa doğru uç",
        nextNode: "node_end_5",
        emoji: "🪂",
      },
      {
        text: "🔭 Biraz daha yüksekten gözlemle",
        nextNode: "node_end_6",
        emoji: "🔭",
      },
    ],
  },

  // ──── SEVİYE 2D: Direkt yıldıza ────
  node_2d: {
    text: "Minnoş feneriyle ormana girmiş. Fenerin ışığı büyülü bir güce dönüşmüş — dokunduğu her şeyi aydınlatıyormuş! Ağaçların arasında gizlenen hayvanlar onu selamlıyormuş. Derken, bir sincap koşarak gelmiş: 'Hızlı ol! Yıldız çiçeği açmak üzere!'",
    background: "from-yellow-950 via-amber-950 to-orange-950",
    emoji: "🔦",
    choices: [
      {
        text: "🐿️ Sincabı takip et",
        nextNode: "node_end_7",
        emoji: "🐿️",
      },
      {
        text: "🌸 Kendi yolunu çizerek ilerle",
        nextNode: "node_end_1",
        emoji: "🌸",
      },
    ],
  },

  // ──── SONLAR ────
  node_end_1: {
    text: "Minnoş perilere yardım etmiş ve Yıldız Çiçeği'ni birlikte bulmuşlar! Çiçek açtığında, ormanın tamamı ışıkla dolmuş. Periler Minnoş'a teşekkür olarak büyülü bir kolye hediye etmişler. Artık Minnoş ne zaman cesarete ihtiyaç duysa, kolyesi parlamış. Ve Minnoş, ormanın en sevilen kahramanı olmuş! 🌟✨💖",
    background: "from-amber-900 via-yellow-900 to-orange-900",
    emoji: "👑",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Ormanın Kahramanı!",
  },

  node_end_2: {
    text: "Peri Kralı anlatmış: 'Yıldız Çiçeği, 100 yılda bir açar ve onu bulan kişiye bir dilek hakkı verir.' Minnoş dilemiş: 'Tüm orman sakinleri hep mutlu olsun!' Ve o andan itibaren ormanda hep bahar yaşanmış, kimse üzülmemiş. Minnoş'un cömert kalbi, tüm ormanı değiştirmiş! 🌺🌟💫",
    background: "from-rose-900 via-pink-900 to-fuchsia-900",
    emoji: "🌺",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Cömert Dilek!",
  },

  node_end_3: {
    text: "Minnoş mağaranın derinliklerinde parlayan Dilek Taşı'nı bulmuş! Taşa dokunduğunda tüm nehir gökkuşağı renklerinde parlamış. 'Sevgi ve arkadaşlık her zaman yanımda olsun' diye dilemiş. O günden sonra Minnoş'un etrafında her zaman iyi arkadaşlar olmuş ve nehir, her geceyi aydınlatmış! 💎🌊✨",
    background: "from-blue-900 via-cyan-900 to-teal-900",
    emoji: "💎",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Dilek Taşının Sırrı!",
  },

  node_end_4: {
    text: "Minnoş ve balık birlikte nehirde yüzmüş, su altı dünyasını keşfetmişler. Mercanların arasında gizli bir hazine sandığı bulmuşlar — içinde altın değil, tüm nehir canlılarının çizdiği resimler varmış! Her resim bir dostluk hikâyesi anlatıyormuş. Minnoş, en güzel hazinenin anılar olduğunu öğrenmiş! 🐠🖼️💝",
    background: "from-teal-900 via-emerald-900 to-green-900",
    emoji: "🐠",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Dostluk Hazinesi!",
  },

  node_end_5: {
    text: "Minnoş ve Bilge Bey açıklığa inmiş. Orada devasa bir Yıldız Ağacı varmış — dallarında gerçek yıldızlar asılıymış! Ağaç konuşmuş: 'Cesur kedicik, sen bu geceyi aydınlatan yıldızsın!' Minnoş ağaçtan bir yıldız alıp evine götürmüş. Artık her gece odası yıldızlarla parlamış! ⭐🌳💫",
    background: "from-indigo-900 via-violet-900 to-purple-900",
    emoji: "⭐",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Yıldız Ağacı!",
  },

  node_end_6: {
    text: "Yukarıdan bakan Minnoş, ormanın aslında dev bir yıldız şeklinde olduğunu görmüş! Bilge Bey gülmüş: 'İşte sır bu — ormanın kendisi bir yıldız! Ve sen, onun kalbinde parlayan ışıksın.' Minnoş o gece gökyüzünde dans etmiş, yıldızlarla arkadaş olmuş. Her gece gökyüzüne bakınca, yıldızlar ona göz kırparmış! 🌌🦉💖",
    background: "from-slate-900 via-indigo-900 to-violet-900",
    emoji: "🌌",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Gökyüzünün Sırrı!",
  },

  node_end_7: {
    text: "Sincap Minnoş'u ormanın en eski ve en büyük meşe ağacına götürmüş. Ağacın tepesinde, tam o anda Yıldız Çiçeği açmış! Çiçeğin tohumları rüzgârla tüm ormana dağılmış ve her yere küçük ışıklar ekilmiş. Orman sonsuza dek parlamış! Minnoş, 'Bazen doğru zamanda doğru yerde olmak, en büyük maceradır' demiş. 🌟🐿️🌸",
    background: "from-green-900 via-emerald-900 to-teal-900",
    emoji: "🌸",
    choices: [],
    isEnd: true,
    endTitle: "🎉 Doğru Zamanda, Doğru Yerde!",
  },
};

export default demoStoryData;
