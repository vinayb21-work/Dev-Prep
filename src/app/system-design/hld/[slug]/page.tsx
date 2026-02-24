import { notFound } from "next/navigation";
import { systemDesignTopics } from "@/lib/seed-data";
import { TopicView } from "@/components/system-design/TopicView";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

const hldTopics = systemDesignTopics.filter((t) => t.type === "HLD");

export async function generateMetadata({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = hldTopics.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `${topic.title} (HLD) | DevPrep`,
    description: topic.description,
  };
}

export function generateStaticParams() {
  return hldTopics.map((topic) => ({ slug: topic.slug }));
}

export default async function HLDTopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = hldTopics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <TopicView topic={topic} />
    </div>
  );
}
