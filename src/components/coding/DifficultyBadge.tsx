import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard";
  className?: string;
}

const difficultyConfig = {
  Easy: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  Hard: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
} as const;

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(difficultyConfig[difficulty], className)}
    >
      {difficulty}
    </Badge>
  );
}
