import { WordForm } from "@/components/words/word-form";

export default function NewWordPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add New Word</h1>
      <WordForm />
    </div>
  );
}