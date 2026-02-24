"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BehavioralQuestion } from "@/lib/seed-data";

interface QuestionCardProps {
  question: BehavioralQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTips, setShowTips] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="secondary">{question.category}</Badge>
            <CardTitle className="text-base leading-relaxed">
              {question.question}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tips */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTips(!showTips)}
          >
            {showTips ? "Hide Tips" : "Show Tips"}
          </Button>
          {showTips && (
            <ul className="mt-2 space-y-1 pl-4">
              {question.tips.map((tip, i) => (
                <li key={i} className="text-sm text-muted-foreground list-disc">
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sample Answer */}
        <div>
          <Button
            variant={showAnswer ? "default" : "outline"}
            size="sm"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? "Hide Sample Answer" : "Show Sample Answer"}
          </Button>
          {showAnswer && (
            <div className="mt-3 rounded-md bg-muted p-4 text-sm leading-relaxed whitespace-pre-wrap">
              {question.sampleAnswer}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
