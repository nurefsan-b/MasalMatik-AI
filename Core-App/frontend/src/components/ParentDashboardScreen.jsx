import { useState } from "react";

export default function ParentDashboardScreen({ onSetupComplete }) {
  const [lesson, setLesson] = useState("");
  const [maxSteps, setMaxSteps] = useState(4);

  const handleStart = () => {
    onSetupComplete({ lesson, maxSteps });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-transparent relative z-20 p-4 md:p-8">
      {/* Kapsayıcı Büyük Kart */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-6xl min-h-[75vh] flex flex-col md:flex-row overflow-hidden border border-white/50">
        
        {/* 1. Sol Kolon - Video Alanı */}
        <div className="w-full md:w-1/2 h-[35vh] md:h-auto relative bg-gray-100">
          <video
            src="/05_Video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Sağ Kolon - Form Alanı */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
          
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#2E5A43] mb-2">
              ⚙️ Ebeveyn Kontrol Paneli
            </h2>
            <p className="text-gray-500 font-medium">
              Çocuğunuz için özel bir masal deneyimi oluşturun.
            </p>
          </div>

          <div className="flex flex-col gap-8 flex-1">
            {/* Girdi 1: Teması / Öğüt */}
            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-black text-[#2E5A43] uppercase tracking-wider ml-1">
                MASALIN TEMASI / VERİLECEK ÖĞÜT
              </label>
              <textarea
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                className="w-full p-5 rounded-2xl bg-gray-100 border-none outline-none focus:ring-4 focus:ring-[#2E5A43]/10 transition-all text-[#2E5A43] font-medium resize-none min-h-[140px] placeholder-gray-400"
                placeholder="Örn: Paylaşmanın önemi, dürüstlük, cesaret ve arkadaşlık..."
              />
            </div>

            {/* Girdi 2: Uzunluk */}
            <div className="flex flex-col gap-3">
              <label className="text-xs md:text-sm font-black text-[#2E5A43] uppercase tracking-wider ml-1">
                MASAL UZUNLUĞU
              </label>
              <select
                value={maxSteps}
                onChange={(e) => setMaxSteps(Number(e.target.value))}
                className="w-full p-5 rounded-2xl bg-gray-100 border-none outline-none focus:ring-4 focus:ring-[#2E5A43]/10 transition-all text-[#2E5A43] font-medium cursor-pointer appearance-none"
              >
                <option value={0} disabled hidden>Bir uzunluk seçin...</option>
                <option value={3}>Kısa (3 Adım)</option>
                <option value={4}>Orta (4 Adım)</option>
                <option value={6}>Uzun (6 Adım)</option>
                <option value={8}>Çok Uzun (8 Adım)</option>
              </select>
            </div>

            <div className="mt-8 mb-6">
              <button
                onClick={handleStart}
                className="w-full py-5 bg-[#2E5A43] hover:bg-[#234533] text-white font-black rounded-full text-xl md:text-2xl shadow-xl shadow-[#2E5A43]/20 hover:shadow-2xl hover:shadow-[#2E5A43]/30 transform hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer"
              >
                Masalı Hazırla ve Ekranı Çocuğa Ver 🪄
              </button>
            </div>
          </div>

          <div className="mt-auto pt-6 text-center">
            <p className="text-xs text-gray-400 font-medium">
              Masalınız yapay zeka tarafından çocuğunuza özel oluşturulacaktır 🌟
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
