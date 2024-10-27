import { WordList } from "@/components/words/word-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function WordsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vocabulary Words</h1>
        <Link href="/admin/words/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Word
          </Button>
        </Link>
      </div>
      <WordList />
    </div>
  );
}