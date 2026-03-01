import { useState, useEffect } from "react";
import { SceneView } from "@/components/SceneView";
import { StoryData } from "@/types/story";

interface StoryPlayerProps {
  storyFile: string;
  onHome: () => void;
}

export function StoryPlayer({ storyFile, onHome }: StoryPlayerProps) {
  const [story, setStory] = useState<StoryData | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState<string>("");

  useEffect(() => {
    setStory(null);
    setCurrentSceneId("");
    fetch(storyFile)
      .then((r) => r.json())
      .then((data: StoryData) => {
        setStory(data);
        setCurrentSceneId(data.start);
      });
  }, [storyFile]);

  if (!story || !currentSceneId) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="font-display text-3xl text-foreground animate-wiggle">📖 Loading story…</p>
      </div>
    );
  }

  const scene = story.scenes[currentSceneId];
  if (!scene) return null;

  const handleChoice = (nextId: string) => {
    if (nextId === "home") {
      onHome();
    } else {
      setCurrentSceneId(nextId);
    }
  };

  return (
    <SceneView
      scene={scene}
      sceneId={currentSceneId}
      onChoice={handleChoice}
      onHome={onHome}
    />
  );
}
