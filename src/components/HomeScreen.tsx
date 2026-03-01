import { useState } from "react";
import { usePwaInstall } from "@/hooks/use-pwa-install";

interface HomeScreenProps {
  onSelectStory: (storyFile: string) => void;
}

export function HomeScreen({ onSelectStory }: HomeScreenProps) {
  const { install, canInstall, isIos, showInstallOption, isInstalled } = usePwaInstall();
  const [showIosHint, setShowIosHint] = useState(false);

  const handleInstall = async () => {
    if (isIos) {
      setShowIosHint(true);
    } else if (canInstall) {
      await install();
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8 p-6 relative"
      style={{ background: "linear-gradient(180deg, hsl(199 80% 85%) 0%, hsl(199 70% 92%) 50%, hsl(45 80% 92%) 100%)" }}
    >
      {/* Decorative clouds */}
      <div className="absolute top-8 left-10 text-5xl md:text-7xl opacity-40 animate-wiggle">☁️</div>
      <div className="absolute top-16 right-16 text-4xl md:text-6xl opacity-30 animate-wiggle" style={{ animationDelay: "0.5s" }}>☁️</div>
      <div className="absolute top-6 left-1/2 text-3xl md:text-5xl opacity-25 animate-wiggle" style={{ animationDelay: "1s" }}>☁️</div>

      {/* Title */}
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground drop-shadow-sm animate-fade-up text-center">
        📚 Story Time!
      </h1>

      <p className="font-body text-lg md:text-2xl text-muted-foreground animate-fade-up text-center" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
        Pick a story to read!
      </p>

      {/* Story buttons */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 mt-4 w-full max-w-3xl px-4">
        <button
          onClick={() => onSelectStory("/andani.json")}
          className="flex-1 font-display text-2xl md:text-3xl lg:text-4xl px-8 py-7 md:py-8 rounded-[2rem] shadow-lg bg-choice-a text-choice-a-foreground hover:brightness-110 active:scale-95 transition-all duration-200 animate-bounce-in"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          ✈️ Andani's Adventure to Chicago
        </button>

        <button
          onClick={() => onSelectStory("/caleb-jackson.json")}
          className="flex-1 font-display text-2xl md:text-3xl lg:text-4xl px-8 py-7 md:py-8 rounded-[2rem] shadow-lg bg-choice-b text-choice-b-foreground hover:brightness-110 active:scale-95 transition-all duration-200 animate-bounce-in"
          style={{ animationDelay: "600ms", animationFillMode: "both" }}
        >
          🏙️ Caleb & Jackson's Willis Tower Adventure
        </button>
      </div>

      {/* Install to Home Screen button */}
      {showInstallOption && (
        <button
          onClick={handleInstall}
          className="font-display text-lg md:text-xl px-6 py-3 rounded-full shadow-md bg-accent text-accent-foreground hover:brightness-110 active:scale-95 transition-all duration-200 animate-fade-up flex items-center gap-2"
          style={{ animationDelay: "800ms", animationFillMode: "both" }}
        >
          📲 Add to Home Screen
        </button>
      )}

      {isInstalled && (
        <p className="font-body text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "800ms", animationFillMode: "both" }}>
          ✅ Installed on your device!
        </p>
      )}

      {/* iOS install instructions modal */}
      {showIosHint && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setShowIosHint(false)}>
          <div className="bg-background rounded-3xl p-6 max-w-sm w-full shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-2xl mb-4">📲 Install Story Time!</p>
            <p className="font-body text-base text-muted-foreground mb-3">
              Tap the <strong>Share</strong> button <span className="text-xl">⬆️</span> at the bottom of Safari, then tap <strong>"Add to Home Screen"</strong>.
            </p>
            <button
              onClick={() => setShowIosHint(false)}
              className="font-display text-lg px-6 py-2 rounded-full bg-accent text-accent-foreground mt-2"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Footer decoration */}
      <div className="absolute bottom-6 text-3xl md:text-4xl opacity-50">🌈</div>
    </div>
  );
}
