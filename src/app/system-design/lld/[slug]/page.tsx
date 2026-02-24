import { notFound } from "next/navigation";
import { systemDesignTopics } from "@/lib/seed-data";
import { TopicView } from "@/components/system-design/TopicView";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

const lldTopics = systemDesignTopics.filter((t) => t.type === "LLD");

export async function generateMetadata({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = lldTopics.find((t) => t.slug === slug);
  if (!topic) return { title: "Topic Not Found" };

  return {
    title: `${topic.title} (LLD) | DevPrep`,
    description: topic.description,
  };
}

export function generateStaticParams() {
  return lldTopics.map((topic) => ({ slug: topic.slug }));
}

export default async function LLDTopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = lldTopics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <TopicView topic={topic} />
    </div>
  );
}
