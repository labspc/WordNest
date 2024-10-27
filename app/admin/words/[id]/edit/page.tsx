import { WordForm } from "@/components/words/word-form";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function EditWordPage({
  params,
}: {
  params: { id: string };
}) {
  const word = await prisma.word.findUnique({
    where: { id: params.id },
  });

  if (!word) {
    return <div>Word not found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Word</h1>
      <WordForm initialData={word} />
    </div>
  );
}