export interface Choice {
  label: string;
  next: string;
}

export interface Scene {
  text: string;
  image: string;
  choices: Choice[];
}

export interface StoryData {
  start: string;
  scenes: Record<string, Scene>;
}
