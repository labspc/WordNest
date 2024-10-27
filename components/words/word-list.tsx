"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Word } from "@prisma/client";
import { DeleteWordDialog } from "./delete-word-dialog";

export function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteWordId, setDeleteWordId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch("/api/words");
      const data = await response.json();
      setWords(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch words",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteWordId) return;

    try {
      const response = await fetch(`/api/words/${deleteWordId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete word");

      setWords(words.filter((word) => word.id !== deleteWordId));
      toast({
        title: "Success",
        description: "Word deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete word",
        variant: "destructive",
      });
    } finally {
      setDeleteWordId(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Word</TableHead>
              <TableHead>Definition</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {words.map((word) => (
              <TableRow key={word.id}>
                <TableCell className="font-medium">{word.word}</TableCell>
                <TableCell>{word.definition}</TableCell>
                <TableCell>{word.notes}</TableCell>
                <TableCell>
                  {new Date(word.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link href={`/admin/words/${word.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteWordId(word.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteWordDialog
        open={!!deleteWordId}
        onOpenChange={() => setDeleteWordId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}