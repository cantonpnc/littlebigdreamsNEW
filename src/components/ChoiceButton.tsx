import { cn } from "@/lib/utils";

interface ChoiceButtonProps {
  label: string;
  index: number;
  onClick: () => void;
  isRestart?: boolean;
}

export function ChoiceButton({ label, index, onClick, isRestart }: ChoiceButtonProps) {
  const colorClass = isRestart
    ? "bg-choice-restart text-choice-restart-foreground hover:brightness-110 active:scale-95"
    : index === 0
    ? "bg-choice-a text-choice-a-foreground hover:brightness-110 active:scale-95"
    : "bg-choice-b text-choice-b-foreground hover:brightness-110 active:scale-95";

  return (
    <button
      onClick={onClick}
      className={cn(
        "font-display text-2xl md:text-3xl lg:text-4xl",
        "px-8 py-5 md:py-6 rounded-[2rem]",
        "shadow-lg transition-all duration-200",
        "min-w-[200px] md:min-w-[280px]",
        "animate-bounce-in",
        colorClass
      )}
      style={{ animationDelay: `${index * 150 + 400}ms`, animationFillMode: "both" }}
    >
      {label}
    </button>
  );
}
