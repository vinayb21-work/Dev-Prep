import { codingProblems } from "@/lib/seed-data";
import { ProblemList } from "@/components/coding/ProblemList";

export const metadata = {
  title: "Coding Problems | Dev Prep",
  description:
    "Practice coding interview problems covering arrays, strings, trees, graphs, dynamic programming, and more.",
};

export default function CodingPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Coding Problems</h1>
        <p className="text-muted-foreground">
          Practice classic coding interview problems. Filter by difficulty, topic,
          or company. Each problem includes hints and detailed solutions.
        </p>
      </div>
      <ProblemList problems={codingProblems} />
    </div>
  );
}
