import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { codingProblems, systemDesignTopics, behavioralQuestions } from "@/lib/seed-data";

export const metadata = {
  title: "Dashboard | DevPrep",
  description: "Track your interview preparation progress across coding, system design, and behavioral.",
};

const sections = [
  {
    title: "Coding Problems",
    href: "/coding",
    count: codingProblems.length,
    description: "Data structures & algorithms",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    title: "System Design",
    href: "/system-design",
    count: systemDesignTopics.length,
    description: "HLD & LLD topics",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Behavioral",
    href: "/behavioral",
    count: behavioralQuestions.length,
    description: "STAR method practice",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
];

export default function DashboardPage() {
  const totalItems = codingProblems.length + systemDesignTopics.length + behavioralQuestions.length;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your interview preparation progress.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className={`mb-1 text-3xl font-bold ${section.color}`}>
                  {section.count}
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Total content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
          <CardDescription>
            {totalItems} total items available for practice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{section.title}</span>
                <span className="text-muted-foreground">{section.count} items</span>
              </div>
              <Progress value={(section.count / totalItems) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Jump into a practice area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {sections.map((section) => (
              <Button key={section.href} variant="outline" asChild>
                <Link href={section.href}>{section.title}</Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
