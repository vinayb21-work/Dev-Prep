"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/behavioral/QuestionCard";
import type { BehavioralQuestion } from "@/lib/seed-data";

interface QuestionListProps {
  questions: BehavioralQuestion[];
}

export function QuestionList({ questions }: QuestionListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    questions.forEach((q) => set.add(q.category));
    return Array.from(set).sort();
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        search === "" ||
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "All" || q.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [questions, search, category]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm"
        />

        <div className="flex flex-wrap gap-1.5">
          <Button
            size="sm"
            variant={category === "All" ? "default" : "outline"}
            onClick={() => setCategory("All")}
          >
            All
          </Button>
          {allCategories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {questions.length} questions
      </p>

      {/* Question list */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No questions match your filters. Try adjusting your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
