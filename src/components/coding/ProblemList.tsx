"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProblemCard } from "@/components/coding/ProblemCard";
import type { CodingProblem } from "@/lib/seed-data";

interface ProblemListProps {
  problems: CodingProblem[];
}

const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

export function ProblemList({ problems }: ProblemListProps) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [topic, setTopic] = useState<string>("All");

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    problems.forEach((p) => p.topics.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [problems]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.topics.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        ) ||
        p.companies.some((c) =>
          c.toLowerCase().includes(search.toLowerCase())
        );

      const matchesDifficulty =
        difficulty === "All" || p.difficulty === difficulty;

      const matchesTopic =
        topic === "All" || p.topics.includes(topic);

      return matchesSearch && matchesDifficulty && matchesTopic;
    });
  }, [problems, search, difficulty, topic]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search problems, topics, or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />

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

        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Topics</SelectItem>
            {allTopics.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {problems.length} problems
      </p>

      {/* Problem grid */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No problems match your filters. Try adjusting your search.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}
