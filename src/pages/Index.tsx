import { useState, useEffect } from "react";
import { SceneView } from "@/components/SceneView";
import { StoryData } from "@/types/story";

const Index = () => {
  const [story, setStory] = useState<StoryData | null>(null);
  const [currentSceneId, setCurrentSceneId] = useState<string>("");

  useEffect(() => {
    fetch("/story.json")
      .then((r) => r.json())
      .then((data: StoryData) => {
        setStory(data);
        setCurrentSceneId(data.start);
      });
  }, []);

  if (!story || !currentSceneId) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="font-display text-3xl text-foreground animate-wiggle">📖 Loading story…</p>
      </div>
    );
  }

  const scene = story.scenes[currentSceneId];
  if (!scene) return null;

  return (
    <SceneView
      scene={scene}
      sceneId={currentSceneId}
      onChoice={setCurrentSceneId}
    />
  );
};

export default Index;
