import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DifficultyBadge } from "@/components/coding/DifficultyBadge";
import type { SystemDesignTopic } from "@/lib/seed-data";

interface TopicCardProps {
  topic: SystemDesignTopic;
}

const typeConfig = {
  HLD: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  LLD: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
} as const;

export function TopicCard({ topic }: TopicCardProps) {
  const href =
    topic.type === "HLD"
      ? `/system-design/hld/${topic.slug}`
      : `/system-design/lld/${topic.slug}`;

  return (
    <Link href={href} className="block">
      <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className={typeConfig[topic.type]}>
              {topic.type}
            </Badge>
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>
          <CardTitle className="text-lg">{topic.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {topic.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
