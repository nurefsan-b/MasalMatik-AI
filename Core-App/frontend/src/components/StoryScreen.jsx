import { useState } from "react";
import { continueStory, endStory } from "../api";

const SCENE_GRADIENTS = [
  "from-amber-200 via-yellow-100 to-orange-200",
  "from-green-200 via-emerald-100 to-teal-200",
  "from-blue-200 via-cyan-100 to-sky-200",
  "from-pink-200 via-rose-100 to-red-200",
  "from-purple-200 via-fuchsia-100 to-pink-200",
];

const SCENE_EMOJIS = ["🌟", "🏰", "🌈", "⚡", "🔮", "🌙", "🦋", "🎭"];

export default function StoryScreen({
  sessionId,
  storyData,
  allParagraphs,
  onContinue,
  onEnd,
}) {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const gradientIndex = (storyData.step - 1) % SCENE_GRADIENTS.length;
  const sceneEmoji = SCENE_EMOJIS[(storyData.step - 1) % SCENE_EMOJIS.length];

  const handleChoice = async (choiceText) => {
    setLoading(true);
    setFadeIn(false);

    try {
      const data = await continueStory(sessionId, choiceText);

      // Eğer son adımsa, hikâyeyi bitir
      if (data.is_final_step) {
        // end-story endpoint'ini çağır
        const endData = await endStory(sessionId);
        // Son paragrafı ekleyelim
        onContinue(data);
        setTimeout(() => onEnd(endData), 500);
      } else {
        setTimeout(() => {
          onContinue(data);
          setFadeIn(true);
          setLoading(false);
        }, 300);
      }
    } catch (err) {
      console.error("Hikâye devam hatası:", err);
      setLoading(false);
      setFadeIn(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 py-6 transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-4">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 shadow-sm border-2 ${
              step < storyData.step
                ? "bg-[#2E5A43] text-white border-[#1A3828] shadow-[#2E5A43]/30"
                : step === storyData.step
                ? "bg-[#FFD54F] text-[#2E5A43] border-[#E6BC3C] shadow-[#FFD54F]/40 scale-110"
                : "bg-white/50 text-[#2E5A43]/30 border-transparent"
            }`}
          >
            {step < storyData.step ? "✨" : step}
          </div>
        ))}
      </div>

      {/* Scene Illustration Placeholder */}
      <div className={`w-full max-w-2xl aspect-video rounded-3xl bg-gradient-to-br ${SCENE_GRADIENTS[gradientIndex]} p-2 mb-6 shadow-xl animate-fade-in`}>
        <div className="w-full h-full rounded-[20px] bg-white/40 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden border-2 border-white/50">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl md:text-5xl opacity-40 animate-float"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                }}
              >
                {SCENE_EMOJIS[i % SCENE_EMOJIS.length]}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center h-40 md:h-56 mb-2 animate-bounce-slow relative z-10 drop-shadow-md">
            <img 
              src="/prenses.png" 
              alt="Masal Görseli" 
              className="h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="hidden text-7xl md:text-8xl">
              {sceneEmoji}
            </div>
          </div>
          {storyData.image_prompt && (
            <p className="text-[#2E5A43]/60 font-bold text-sm md:text-base px-6 text-center italic relative z-10 max-w-md bg-white/50 rounded-xl py-2 mt-2">
              🎨 {storyData.image_prompt}
            </p>
          )}
        </div>
      </div>

      {/* Story Text */}
      <div className="w-full max-w-2xl mb-6 animate-fade-in-up">
        <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-[#FFD54F]/30 shadow-xl shadow-[#FFD54F]/10 relative">
          <div className="absolute -top-4 -left-4 text-4xl bg-white rounded-full p-1 shadow-sm">📖</div>
          <p className="text-xl md:text-2xl leading-relaxed text-[#2E5A43] font-black text-center pt-2">
            {storyData.paragraph}
          </p>
        </div>
      </div>

      {/* Choice Buttons */}
      {!storyData.is_final_step && storyData.choices && storyData.choices.length > 0 && (
        <div className="w-full max-w-2xl space-y-4 animate-fade-in-up mb-8" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-center text-xl text-[#2E5A43] font-black mb-4">
            🤔 Ne yapmak istersin?
          </h3>
          {storyData.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice.text)}
              disabled={loading}
              className={`group w-full p-5 md:p-6 rounded-[2rem] text-left transition-all duration-300 transform cursor-pointer border-b-8 active:border-b-0 active:translate-y-2 ${
                loading
                  ? "bg-gray-300 text-gray-500 border-gray-400 cursor-wait"
                  : index === 0
                  ? "bg-[#2E5A43] text-white border-[#1A3828] hover:bg-[#3B7054] shadow-lg shadow-[#2E5A43]/20"
                  : "bg-[#FF9800] text-white border-[#CC7A00] hover:bg-[#FFA726] shadow-lg shadow-[#FF9800]/20"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl group-hover:animate-wiggle flex-shrink-0 bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                  {choice.emoji || (index === 0 ? "1️⃣" : "2️⃣")}
                </span>
                <span className="text-lg md:text-xl font-black leading-snug">
                  {choice.text}
                </span>
                <span className="ml-auto text-3xl opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-2 transform flex-shrink-0 font-black">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-6 flex flex-col items-center gap-4 animate-fade-in bg-white/80 p-4 rounded-3xl backdrop-blur-md shadow-sm border-2 border-white">
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-[#FFD54F] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-5 h-5 bg-[#2E5A43] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-5 h-5 bg-[#FF9800] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-[#2E5A43] text-xl font-black">
            Duki masalı yazıyor... ✨
          </p>
        </div>
      )}
    </div>
  );
}
