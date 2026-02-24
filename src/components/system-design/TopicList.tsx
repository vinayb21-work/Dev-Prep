"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TopicCard } from "@/components/system-design/TopicCard";
import type { SystemDesignTopic } from "@/lib/seed-data";

interface TopicListProps {
  topics: SystemDesignTopic[];
}

const types = ["All", "HLD", "LLD"] as const;
const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

export function TopicList({ topics }: TopicListProps) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");

  const filtered = useMemo(() => {
    return topics.filter((t) => {
      const matchesSearch =
        search === "" ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "All" || t.type === type;
      const matchesDifficulty = difficulty === "All" || t.difficulty === difficulty;

      return matchesSearch && matchesType && matchesDifficulty;
    });
  }, [topics, search, type, difficulty]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />

        <div className="flex gap-1.5">
          {types.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={type === t ? "default" : "outline"}
              onClick={() => setType(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {difficulties.map((d) => (
            <Button
              key={d}
              size="sm"
              variant={difficulty === d ? "default" : "outline"}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {topics.length} topics
      </p>

      {/* Topic grid */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No topics match your filters. Try adjusting your search.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}
