import { systemDesignTopics } from "@/lib/seed-data";
import { TopicList } from "@/components/system-design/TopicList";

export const metadata = {
  title: "System Design | DevPrep",
  description: "Practice high-level and low-level system design interview topics.",
};

export default function SystemDesignPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">System Design</h1>
        <p className="text-muted-foreground">
          Study high-level (HLD) and low-level (LLD) system design topics.
          Each topic includes architecture breakdowns and key concepts.
        </p>
      </div>
      <TopicList topics={systemDesignTopics} />
    </div>
  );
}
