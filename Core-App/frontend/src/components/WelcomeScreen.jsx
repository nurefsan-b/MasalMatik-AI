import { useState } from "react";
import { startStory } from "../api";

const CHARACTERS = [
  { id: "robot", name: "Robot", emoji: "🤖", bg: "bg-blue-100", border: "border-blue-300" },
  { id: "uzayli", name: "Uzaylı", emoji: "👽", bg: "bg-purple-100", border: "border-purple-300" },
  { id: "prenses", name: "Prenses", emoji: "👸", bg: "bg-pink-100", border: "border-pink-300" },
  { id: "ejderha", name: "Ejderha", emoji: "🐉", bg: "bg-red-100", border: "border-red-300" },
  { id: "super-kahraman", name: "Süper Kahraman", emoji: "🦸", bg: "bg-yellow-100", border: "border-yellow-400" },
  { id: "peri", name: "Peri", emoji: "🧚", bg: "bg-teal-100", border: "border-teal-300" },
];

const THEMES = [
  { id: "uzay", name: "Uzay", emoji: "🚀", bg: "bg-indigo-100", border: "border-indigo-300" },
  { id: "orman", name: "Sihirli Orman", emoji: "🌳", bg: "bg-green-100", border: "border-green-300" },
  { id: "sualti", name: "Sualtı Dünyası", emoji: "🐠", bg: "bg-cyan-100", border: "border-cyan-300" },
  { id: "sato", name: "Büyülü Şato", emoji: "🏰", bg: "bg-amber-100", border: "border-amber-300" },
  { id: "ada", name: "Gizemli Ada", emoji: "🏝️", bg: "bg-emerald-100", border: "border-emerald-300" },
  { id: "bulutlar", name: "Bulutların Üstü", emoji: "☁️", bg: "bg-sky-100", border: "border-sky-300" },
];

export default function WelcomeScreen({ onStoryStart, onExit }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [childName, setChildName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!selectedCharacter || !selectedTheme) {
      setError("Lütfen bir kahraman ve bir mekân seçmeyi unutma! 🌟");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const char = CHARACTERS.find((c) => c.id === selectedCharacter);
      const theme = THEMES.find((t) => t.id === selectedTheme);
      await onStoryStart(char.name, theme.name, childName);
    } catch (err) {
      setError(err.message || "Eyvah, bir hata oluştu! Tekrar deneyelim.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 relative">
      {/* Çıkış Butonu (Bouncy) */}
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-4 left-4 md:top-8 md:left-8 bg-white text-gray-400 hover:text-gray-600 px-5 py-3 rounded-2xl font-black shadow-sm transition-all border-4 border-b-8 border-gray-200 active:border-b-4 active:translate-y-1 z-50 cursor-pointer"
        >
          ⬅️ ÇIKIŞ
        </button>
      )}

      {/* Logo & Title */}
      <div className="text-center mb-8 animate-fade-in-down flex flex-col items-center">
        <div className="relative mb-4">
          <img 
            src="/duki.png" 
            alt="Duki Maskot" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain animate-bounce-slow drop-shadow-xl"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-[#2E5A43] drop-shadow-sm tracking-tight">
          MasalMatik
        </h1>
        <p className="text-xl md:text-2xl text-[#2E5A43]/70 mt-2 font-bold tracking-wide">
          Kendi Maceranı Yarat! ✨
        </p>
      </div>

      {/* İsim Giriş Alanı */}
      <div className="w-full max-w-lg mb-12 animate-fade-in">
        <label className="block text-[#2E5A43] text-xl font-black mb-4 text-center">
          Adın ne, küçük kahraman?
        </label>
        <div className="relative">
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="İsmine buraya yaz..."
            className="w-full px-8 py-5 rounded-full bg-yellow-50 border-4 border-[#FFD54F] text-[#2E5A43] text-2xl text-center font-black placeholder-[#2E5A43]/30 shadow-inner focus:outline-none focus:border-orange-400 focus:ring-8 focus:ring-orange-400/20 transition-all duration-300"
          />
        </div>
      </div>

      {/* Karakter Seçimi */}
      <div className="w-full max-w-4xl mb-12 animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#2E5A43] mb-6 drop-shadow-sm">
          Kahramanın kim olsun?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedCharacter(char.id)}
              className={`group relative p-5 md:p-6 rounded-[2rem] transition-all duration-200 transform cursor-pointer border-4 border-b-8 active:border-b-4 active:translate-y-1 ${char.bg} ${char.border} ${
                selectedCharacter === char.id
                  ? `ring-8 ring-green-400 scale-105 z-10`
                  : "hover:-translate-y-1 hover:border-b-[10px]"
              }`}
            >
              <div className="text-4xl md:text-5xl w-20 h-20 md:w-24 md:h-24 bg-white/70 rounded-full mx-auto mb-4 shadow-inner flex items-center justify-center overflow-hidden border-4 border-white/50">
                {char.emoji}
                {/* <img src={`/assets/chars/${char.id}.png`} alt={char.name} className="w-full h-full object-cover" /> */}
              </div>
              <div className={`text-xl md:text-2xl font-black text-[#2E5A43] tracking-tight`}>
                {char.name}
              </div>
              {selectedCharacter === char.id && (
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-bounce-slow">
                  <span className="text-white text-2xl font-black">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tema Seçimi */}
      <div className="w-full max-w-4xl mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#2E5A43] mb-6 drop-shadow-sm">
          Nerede geçsin?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`group relative p-5 md:p-6 rounded-[2rem] transition-all duration-200 transform cursor-pointer border-4 border-b-8 active:border-b-4 active:translate-y-1 ${theme.bg} ${theme.border} ${
                selectedTheme === theme.id
                  ? `ring-8 ring-green-400 scale-105 z-10`
                  : "hover:-translate-y-1 hover:border-b-[10px]"
              }`}
            >
              <div className="text-4xl md:text-5xl w-20 h-20 md:w-24 md:h-24 bg-white/70 rounded-full mx-auto mb-4 shadow-inner flex items-center justify-center overflow-hidden border-4 border-white/50">
                {theme.emoji}
                {/* <img src={`/assets/themes/${theme.id}.png`} alt={theme.name} className="w-full h-full object-cover" /> */}
              </div>
              <div className={`text-xl md:text-2xl font-black text-[#2E5A43] tracking-tight`}>
                {theme.name}
              </div>
              {selectedTheme === theme.id && (
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-bounce-slow">
                  <span className="text-white text-2xl font-black">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Hata Mesajı */}
      {error && (
        <div className="mb-8 px-8 py-4 bg-red-100 border-4 border-red-300 rounded-3xl text-red-600 text-xl font-black animate-shake">
          {error}
        </div>
      )}

      {/* Dev Aksiyon Butonu */}
      <div className="relative mb-20 w-full max-w-sm">
        {/* CSS Sparkles */}
        <div className="absolute -top-6 -left-6 text-4xl animate-spin-slow">✨</div>
        <div className="absolute -bottom-4 -right-4 text-3xl animate-pulse">🌟</div>
        <div className="absolute top-1/2 -right-8 text-2xl animate-bounce">⭐</div>

        <button
          onClick={handleStart}
          disabled={loading}
          className={`w-full relative px-10 py-6 rounded-[2.5rem] text-3xl md:text-4xl font-black transition-all duration-200 transform cursor-pointer border-4 border-b-[12px] active:border-b-4 active:translate-y-2 ${
            loading
              ? "bg-gray-300 border-gray-400 text-gray-500 cursor-wait"
              : "bg-orange-400 border-orange-600 text-white hover:bg-orange-500 shadow-2xl hover:-translate-y-2 hover:border-b-[16px]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-4">
              <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Hazırlanıyor...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              BAŞLA!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
