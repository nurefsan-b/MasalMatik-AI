import { useState } from "react";

export default function ParentLoginScreen({ onLogin }) {
  const [email, setEmail] = useState("ornek@mail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate simple login
      onLogin();
    } else {
      setError("Lütfen e-posta ve şifrenizi girin.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white relative z-20">
      {/* 1. Sol Kolon - Video Alanı */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden bg-gray-900">
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* Opsiyonel: Üzerine hafif bir karartma eklenebilir */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 2. Sağ Kolon - Form Alanı */}
      <div className="w-full md:w-1/2 min-h-screen md:min-h-0 h-auto md:h-screen flex items-center justify-center bg-[#FFD54F] px-8 py-16 md:px-12 md:py-0">
        <div className="bg-white/80 backdrop-blur-md p-10 md:px-16 md:py-16 rounded-[2.5rem] shadow-2xl w-full max-w-xl border border-white/50">
          
          {/* Logo ile başlık arası boşluk (mb-10) */}
          <div className="flex justify-center mb-10">
            <img src="/logo.png" alt="MasalMatik Logo" className="h-24 md:h-28 object-contain drop-shadow-md" />
          </div>

          {/* Başlık ile form arası boşluk (mb-12) */}
          <h2 className="text-3xl md:text-5xl font-black text-[#2E5A43] text-center mb-12">
            Ebeveyn Girişi
          </h2>
          
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-center font-bold animate-shake">
              {error}
            </div>
          )}
          
          {/* Form container: flex flex-col ve gap-8 kullanımı */}
          <form onSubmit={handleLogin} className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-[#2E5A43] text-xl font-bold ml-2">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-3xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#2E5A43] focus:ring-4 focus:ring-[#2E5A43]/10 outline-none transition-all text-xl text-[#2E5A43] font-semibold placeholder-[#2E5A43]/40"
                placeholder="ornek@mail.com"
              />
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-[#2E5A43] text-xl font-bold ml-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-3xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#2E5A43] focus:ring-4 focus:ring-[#2E5A43]/10 outline-none transition-all text-xl text-[#2E5A43] font-semibold placeholder-[#2E5A43]/40"
                placeholder="••••••••"
              />
            </div>
            
            {/* Şifre ile buton arası ekstra boşluk (mt-6) */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-5 bg-[#2E5A43] hover:bg-[#1f3f2e] text-white font-black rounded-full text-2xl shadow-lg shadow-[#2E5A43]/30 hover:shadow-xl hover:shadow-[#2E5A43]/40 transform hover:-translate-y-1 active:translate-y-0 active:shadow-md transition-all cursor-pointer"
              >
                Giriş Yap
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
