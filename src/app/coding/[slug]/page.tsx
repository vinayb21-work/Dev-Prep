import { notFound } from "next/navigation";
import { codingProblems } from "@/lib/seed-data";
import { ProblemView } from "@/components/coding/ProblemView";

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = codingProblems.find((p) => p.slug === slug);
  if (!problem) return { title: "Problem Not Found" };

  return {
    title: `${problem.title} | Dev Prep`,
    description: `${problem.difficulty} - ${problem.topics.join(", ")}`,
  };
}

export function generateStaticParams() {
  return codingProblems.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const problem = codingProblems.find((p) => p.slug === slug);

  if (!problem) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProblemView problem={problem} />
    </div>
  );
}
