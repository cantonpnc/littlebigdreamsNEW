import { useState, useCallback } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { StoryPlayer } from "@/components/StoryPlayer";

const Index = () => {
  const [storyFile, setStoryFile] = useState<string | null>(null);

  const handleGoHome = useCallback(() => {
    setStoryFile(null);
  }, []);

  if (!storyFile) {
    return <HomeScreen onSelectStory={setStoryFile} />;
  }

  return <StoryPlayer storyFile={storyFile} onHome={handleGoHome} />;
};

export default Index;
