import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/coding/DifficultyBadge";
import type { CodingProblem } from "@/lib/seed-data";

interface ProblemCardProps {
  problem: CodingProblem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link href={`/coding/${problem.slug}`}>
      <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">
              {problem.id}. {problem.title}
            </CardTitle>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {problem.topics.map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
          {problem.companies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {problem.companies.slice(0, 4).map((company) => (
                <Badge
                  key={company}
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  {company}
                </Badge>
              ))}
              {problem.companies.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  +{problem.companies.length - 4}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
