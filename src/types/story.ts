export interface Choice {
  label: string;
  next: string;
}

export interface Scene {
  id: string;
  text: string;
  image: string;
  audio: string;
  choices: Choice[];
}

export interface StoryData {
  start: string;
  scenes: Record<string, Scene>;
}
