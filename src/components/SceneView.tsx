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

    // Longer delay for first scene load, shorter for transitions
    const delay = sceneId === "scene-01" ? 3000 : 600;
    const timer = setTimeout(() => {
      playAudio();
    }, delay);

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
      className={`relative h-screen w-screen bg-background overflow-hidden transition-opacity duration-400 ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
      key={sceneId}
    >
      {/* Full Screen Background Image */}
      <img
        src={imageSrc}
        alt="Story scene"
        className="absolute inset-0 w-full h-full object-cover animate-scene-enter"
      />

      {/* Text Overlay - Top Center */}
      <div className="absolute inset-x-0 top-0 p-6 md:p-12 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex flex-col items-center justify-start min-h-[40vh]">
        <p className="font-display text-xl md:text-2xl lg:text-3xl text-white text-center leading-relaxed max-w-4xl animate-fade-up drop-shadow-md">
          {scene.text}
        </p>
      </div>

      {/* Choices - Bottom Center */}
      {showChoices && (
        <div className="absolute inset-x-0 bottom-0 p-6 pb-8 md:pb-20 flex flex-wrap gap-4 md:gap-6 justify-center bg-gradient-to-t from-black/60 to-transparent">
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
  );
}
