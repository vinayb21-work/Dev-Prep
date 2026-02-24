"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DifficultyBadge } from "@/components/coding/DifficultyBadge";
import { DiagramView } from "@/components/system-design/DiagramView";
import type { SystemDesignTopic } from "@/lib/seed-data";

interface TopicViewProps {
  topic: SystemDesignTopic;
}

const typeConfig = {
  HLD: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  LLD: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
} as const;

export function TopicView({ topic }: TopicViewProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{topic.title}</h1>
            <Badge variant="outline" className={typeConfig[topic.type]}>
              {topic.type}
            </Badge>
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>
          <p className="text-muted-foreground">{topic.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant={isBookmarked ? "default" : "outline"}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/system-design">Back to Topics</Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <DiagramView content={topic.content} />
    </div>
  );
}
