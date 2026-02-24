"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DifficultyBadge } from "@/components/coding/DifficultyBadge";
import { Timer } from "@/components/coding/Timer";
import type { CodingProblem } from "@/lib/seed-data";

interface ProblemViewProps {
  problem: CodingProblem;
}

export function ProblemView({ problem }: ProblemViewProps) {
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());
  const [showSolution, setShowSolution] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleHint = (index: number) => {
    setRevealedHints((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              {problem.id}. {problem.title}
            </h1>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {problem.topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
          {problem.companies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {problem.companies.map((company) => (
                <Badge key={company} variant="outline" className="text-xs">
                  {company}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Timer />
          <Button
            size="sm"
            variant={isBookmarked ? "default" : "outline"}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Problem Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Problem Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
            {problem.description}
          </div>
        </CardContent>
      </Card>

      {/* Hints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Hints ({problem.hints.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {problem.hints.map((hint, index) => (
            <div key={index} className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left"
                onClick={() => toggleHint(index)}
              >
                {revealedHints.has(index) ? "▼" : "▶"} Hint {index + 1}
              </Button>
              {revealedHints.has(index) && (
                <div className="ml-6 rounded-md bg-muted p-3 text-sm">
                  {hint}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Solution */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Solution</CardTitle>
            <Button
              variant={showSolution ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
          </div>
        </CardHeader>
        {showSolution && (
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {problem.solution}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
