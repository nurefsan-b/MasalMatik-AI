import { useState, useEffect } from "react";

// Confetti particle component
function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = [
      "bg-amber-400", "bg-pink-400", "bg-cyan-400",
      "bg-green-400", "bg-purple-400", "bg-red-400",
      "bg-blue-400", "bg-yellow-400", "bg-rose-400",
    ];
    const shapes = ["rounded-full", "rounded-sm", "rounded-none"];

    const newParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      shape: shapes[i % shapes.length],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.color} ${p.shape} animate-confetti`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function EndingScreen({ endData, onRestart }) {
  const [showContent, setShowContent] = useState(false);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <Confetti />

      {/* Trophy */}
      <div className={`text-8xl md:text-9xl mb-4 transition-all duration-1000 ${showContent ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        🏆
      </div>

      {/* Title */}
      <div className={`text-center mb-6 transition-all duration-700 delay-300 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <h1 className="text-4xl md:text-5xl font-black text-[#2E5A43] mb-3 drop-shadow-sm">
          Tebrikler! 🎉
        </h1>
        <p className="text-xl md:text-2xl text-[#2E5A43]/80 font-bold">
          Masalın tamamlandı!
        </p>
      </div>

      {/* Story Title */}
      {endData?.title && (
        <div className={`mb-6 transition-all duration-700 delay-500 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <div className="bg-white rounded-[2rem] px-8 py-5 border-4 border-[#FFD54F] shadow-lg shadow-[#FFD54F]/20 relative">
            <div className="absolute -top-4 -left-2 text-3xl bg-white rounded-full p-1 shadow-sm">📚</div>
            <p className="text-[#FF9800] text-sm font-bold mb-1 uppercase tracking-wider text-center">Masalın Adı</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#2E5A43] text-center">
              {endData.title}
            </h2>
          </div>
        </div>
      )}

      {/* Webhook Status */}
      <div className={`mb-6 w-full max-w-lg transition-all duration-700 delay-700 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className={`rounded-3xl px-6 py-4 text-center ${
          endData?.webhook_sent
            ? "bg-[#2E5A43]/10 border-4 border-[#2E5A43]/30"
            : "bg-blue-100 border-4 border-blue-300"
        }`}>
          <p className="text-lg font-bold text-[#2E5A43]">
            {endData?.webhook_sent ? "📧" : "✅"}{" "}
            {endData?.message || "Masalın tamamlandı! Otomasyon tetiklendi ve ailene e-posta olarak gönderildi."}
          </p>
        </div>
      </div>

      {/* Toggle Full Story */}
      <div className={`w-full max-w-2xl mb-8 transition-all duration-700 delay-900 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <button
          onClick={() => setShowStory(!showStory)}
          className="w-full py-4 rounded-full bg-white border-4 border-[#FFD54F] text-[#2E5A43] font-black text-lg hover:bg-[#FFD54F]/20 transition-all cursor-pointer shadow-sm"
        >
          {showStory ? "📖 Masalı Gizle ▲" : "📖 Tüm Masalı Oku ▼"}
        </button>

        {showStory && endData?.full_story && (
          <div className="mt-4 bg-white rounded-[2rem] p-6 md:p-8 border-4 border-[#FFD54F]/40 shadow-xl shadow-[#FFD54F]/10 animate-fade-in relative">
            <div className="absolute top-4 right-4 text-4xl opacity-20">🦆</div>
            <div className="text-lg md:text-xl leading-relaxed text-[#2E5A43] font-bold whitespace-pre-line relative z-10">
              {endData.full_story}
            </div>
            
            {/* Paylaşım ve İndirme Butonları */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button 
                onClick={() => window.print()}
                className="px-6 py-4 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-full border-2 border-red-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                📄 PDF Olarak Kaydet
              </button>
              <a 
                href={`mailto:?subject=${encodeURIComponent("MasalMatik: " + (endData.title || "Yeni Masal"))}&body=${encodeURIComponent(endData.full_story)}`}
                className="px-6 py-4 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-full border-2 border-blue-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                ✉️ E-posta Gönder
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Restart Button */}
      <div className={`transition-all duration-700 delay-1000 ${showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <button
          onClick={onRestart}
          className="group px-10 py-5 rounded-full bg-[#FFD54F] border-b-8 border-[#E6BC3C] text-[#2E5A43] text-2xl font-black hover:scale-105 hover:bg-[#FFDF70] shadow-xl shadow-[#FFD54F]/30 active:border-b-0 active:translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <span className="flex items-center gap-3">
            🌟 Yeni Masal Başlat 🌟
            <span className="group-hover:rotate-12 transition-transform">🚀</span>
          </span>
        </button>
      </div>
    </div>
  );
}
