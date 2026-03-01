import { useState, useEffect, useCallback } from "react";
import { Scene } from "@/types/story";
import { sceneImages } from "@/data/storyImages";
import { ChoiceButton } from "./ChoiceButton";

interface SceneViewProps {
  scene: Scene;
  sceneId: string;
  onChoice: (nextId: string) => void;
  onHome: () => void;
}

export function SceneView({ scene, sceneId, onChoice, onHome }: SceneViewProps) {
  const [showChoices, setShowChoices] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [hasStartedStory, setHasStartedStory] = useState(false);

  const isFirstScene = sceneId === "scene-01";
  const shouldShowStartButton = isFirstScene && !hasStartedStory;

  useEffect(() => {
    setShowChoices(false);
    setTransitioning(false);

    if (shouldShowStartButton) return;

    const audio = new Audio(scene.audio);

    const playAudio = async () => {
      try {
        await audio.play();
        audio.onended = () => setShowChoices(true);
      } catch (err) {
        console.error("Audio playback error:", err);
        setTimeout(() => setShowChoices(true), 5000);
      }
    };

    const delay = isFirstScene ? 100 : 600;
    const timer = setTimeout(() => {
      void playAudio();
    }, delay);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [sceneId, scene.audio, shouldShowStartButton, isFirstScene]);

  const handleStartStory = useCallback(() => {
    setHasStartedStory(true);
  }, []);

  const handleChoice = useCallback((nextId: string) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => onChoice(nextId), 400);
  }, [transitioning, onChoice]);

  const imageSrc = sceneImages[scene.image];
  const isEnding = scene.choices.length === 1 && scene.choices[0].next === "home";

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden transition-opacity duration-400 ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "hsl(45 80% 94%)" }}
      key={sceneId}
    >
      {/* Back button */}
      <button
        onClick={onHome}
        className="absolute top-4 left-4 z-30 font-display text-lg md:text-xl bg-white/80 hover:bg-white/95 active:scale-95 rounded-full px-4 py-2 shadow-md transition-all duration-200"
      >
        ← Home
      </button>

      {/* Landscape layout: image takes top portion */}
      <div className="h-[55vh] md:h-[60vh] w-full relative bg-black">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Story scene"
            className="w-full h-full object-contain animate-scene-enter"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl animate-wiggle">📖</span>
          </div>
        )}
      </div>

      {/* Text area below image */}
      <div className="h-[45vh] md:h-[40vh] w-full flex flex-col items-center overflow-y-auto">
        <div className="flex-1 w-full max-w-4xl px-6 py-4 md:py-5 flex items-start justify-center">
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-foreground text-center leading-relaxed animate-fade-up">
            {scene.text}
          </p>
        </div>

        {/* Start Story Button - First Scene */}
        {shouldShowStartButton && (
          <div className="w-full px-6 pb-6 md:pb-8 flex justify-center">
            <ChoiceButton
              label="▶️ Start the Story"
              index={0}
              isRestart
              onClick={handleStartStory}
            />
          </div>
        )}

        {/* The End message */}
        {isEnding && showChoices && (
          <p className="font-display text-3xl md:text-4xl text-foreground animate-bounce-in mb-2">
            🎉 The End! 🎉
          </p>
        )}

        {/* Choices */}
        {showChoices && (
          <div className="w-full px-6 pb-6 md:pb-8 flex flex-wrap gap-4 md:gap-6 justify-center">
            {scene.choices.map((choice, i) => (
              <ChoiceButton
                key={choice.next}
                label={isEnding ? "📖 Read Again!" : choice.label}
                index={i}
                isRestart={isEnding}
                onClick={() => handleChoice(choice.next)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
