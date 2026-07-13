import { useState } from "react";
import ParentLoginScreen from "./components/ParentLoginScreen";
import ParentDashboardScreen from "./components/ParentDashboardScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import StoryScreen from "./components/StoryScreen";
import EndingScreen from "./components/EndingScreen";
import { startStory } from "./api";

/**
 * MasalMatik AI - Ana Uygulama Bileşeni
 * Ekranlar arası geçişi yönetir: parent_login → parent_dashboard → welcome → story → ending
 */
export default function App() {
  const [screen, setScreen] = useState("parent_login"); // parent_login | parent_dashboard | welcome | story | ending
  const [parentSettings, setParentSettings] = useState({ lesson: "", maxSteps: 4 });
  const [sessionId, setSessionId] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [endData, setEndData] = useState(null);
  const [allParagraphs, setAllParagraphs] = useState([]);

  // Ebeveyn giriş yaptığında
  const handleParentLogin = () => {
    setScreen("parent_dashboard");
  };

  // Ebeveyn ayarları tamamlayıp çocuğa verdiğinde
  const handleParentSetupComplete = (settings) => {
    setParentSettings(settings);
    setScreen("welcome");
  };

  // Ebeveyn paneline dönüş (Çıkış)
  const handleExitToParent = () => {
    setScreen("parent_login");
    setSessionId(null);
    setStoryData(null);
    setEndData(null);
    setAllParagraphs([]);
  };

  // Hikâye başlatıldığında (WelcomeScreen'den tetiklenir)
  const handleStoryStart = async (character, theme, childName) => {
    // API çağrısını burada yapıyoruz çünkü parentSettings App state'inde
    const data = await startStory(character, theme, childName, parentSettings.lesson, parentSettings.maxSteps);
    setSessionId(data.session_id);
    setStoryData(data);
    setAllParagraphs([data.paragraph]);
    setScreen("story");
    return data;
  };

  // Hikâye devam ettiğinde
  const handleStoryContinue = (data) => {
    setStoryData(data);
    setAllParagraphs((prev) => [...prev, data.paragraph]);
  };

  // Hikâye bittiğinde
  const handleStoryEnd = (data) => {
    setEndData(data);
    setScreen("ending");
  };

  // Yeni masal başlatmak için (Çocuk ekranında tekrarla)
  const handleRestart = () => {
    setScreen("welcome");
    setSessionId(null);
    setStoryData(null);
    setEndData(null);
    setAllParagraphs([]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden">
      {/* Animated Background Orbs (Pastel & Soft) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-green-200/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-float" />
      </div>

      {/* Stars (Magical colorful stars) */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3,
              backgroundColor: ['#FFD54F', '#2E5A43', '#FF9800', '#4ADE80'][i % 4],
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {screen === "parent_login" && (
          <ParentLoginScreen onLogin={handleParentLogin} />
        )}
        
        {screen === "parent_dashboard" && (
          <ParentDashboardScreen onSetupComplete={handleParentSetupComplete} />
        )}

        {screen === "welcome" && (
          <WelcomeScreen onStoryStart={handleStoryStart} onExit={handleExitToParent} />
        )}

        {screen === "story" && storyData && (
          <StoryScreen
            sessionId={sessionId}
            storyData={storyData}
            allParagraphs={allParagraphs}
            onContinue={handleStoryContinue}
            onEnd={handleStoryEnd}
          />
        )}

        {screen === "ending" && (
          <EndingScreen endData={endData} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
