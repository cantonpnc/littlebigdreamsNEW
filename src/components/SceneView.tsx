import { useState, useEffect, useCallback } from "react";
import { Scene } from "@/types/story";
import { sceneImages } from "@/data/storyImages";
import { ChoiceButton } from "./ChoiceButton";

interface SceneViewProps {
  scene: Scene;
  sceneId: string;
  onChoice: (nextId: string) => void;
}

export function SceneView({ scene, sceneId, onChoice }: SceneViewProps) {
  const [showChoices, setShowChoices] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setShowChoices(false);
    setTransitioning(false);

    // Audio Narration
    const audio = new Audio(scene.audio);
    
    const playAudio = async () => {
      try {
        await audio.play();
        audio.onended = () => setShowChoices(true);
      } catch (err) {
        console.error("Audio playback error:", err);
        // Fallback: show choices after timeout if audio fails
        setTimeout(() => setShowChoices(true), 5000);
      }
    };

    // Small delay to allow scene transition to complete
    const timer = setTimeout(() => {
      playAudio();
    }, 600);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [sceneId, scene.text, scene.audio]);

  const handleChoice = useCallback((nextId: string) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => onChoice(nextId), 400);
  }, [transitioning, onChoice]);

  const imageSrc = sceneImages[scene.image];
  const isEnding = scene.choices.length === 1 && scene.choices[0].next === "scene-01";

  return (
    <div
      className={`flex flex-col h-screen w-screen bg-background transition-opacity duration-400 ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
      key={sceneId}
    >
      {/* Illustration - 60% of screen */}
      <div className="relative flex-[6] min-h-0 overflow-hidden">
        <img
          src={imageSrc}
          alt="Story scene"
          className="w-full h-full object-cover animate-scene-enter"
        />
      </div>

      {/* Text + Choices - 40% of screen */}
      <div className="flex-[4] flex flex-col items-center justify-center gap-4 md:gap-6 px-6 md:px-12 py-4 bg-background">
        <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground text-center leading-relaxed max-w-4xl animate-fade-up">
          {scene.text}
        </p>

        {showChoices && (
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center mt-2">
            {scene.choices.map((choice, i) => (
              <ChoiceButton
                key={choice.next}
                label={choice.label}
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
