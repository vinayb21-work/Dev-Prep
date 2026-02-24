export type Difficulty = "Easy" | "Medium" | "Hard";
export type ProblemStatus = "attempted" | "solved" | "unsolved";
export type DesignType = "HLD" | "LLD";
export type ItemType = "coding" | "hld" | "lld" | "behavioral";

export interface CodingProblem {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topics: string[];
  hints: string[];
  solution: string;
  companies: string[];
}

export interface SystemDesignTopic {
  id: string;
  slug: string;
  title: string;
  type: DesignType;
  description: string;
  content: string;
  difficulty: Difficulty;
}

export interface BehavioralQuestion {
  id: string;
  question: string;
  category: string;
  sampleAnswer: string;
  tips: string[];
}

export interface UserProgress {
  id: string;
  userId: string;
  problemId: string;
  problemType: ItemType;
  status: ProblemStatus;
  timeSpent: number;
  solvedAt: Date | null;
}

export interface Bookmark {
  id: string;
  userId: string;
  itemId: string;
  itemType: ItemType;
}

export interface DashboardStats {
  totalSolved: number;
  codingSolved: number;
  systemDesignCompleted: number;
  behavioralPracticed: number;
  currentStreak: number;
  totalTimeSpent: number;
}
