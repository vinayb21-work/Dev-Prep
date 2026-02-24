import { behavioralQuestions } from "@/lib/seed-data";
import { QuestionList } from "@/components/behavioral/QuestionList";

export const metadata = {
  title: "Behavioral Prep | DevPrep",
  description: "Practice behavioral interview questions using the STAR method with sample answers and tips.",
};

export default function BehavioralPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Behavioral Prep</h1>
        <p className="text-muted-foreground">
          Practice common behavioral interview questions. Each question includes
          tips and a sample STAR-format answer you can reveal when ready.
        </p>
      </div>
      <QuestionList questions={behavioralQuestions} />
    </div>
  );
}
