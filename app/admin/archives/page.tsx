"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, Archive } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ArchivedWord {
  id: string;
  word: string;
  definition: string;
  notes?: string;
  createdAt: string;
  archivedAt: string;
}

type Archives = Record<string, ArchivedWord[]>;

export default function ArchivesPage() {
  const [archives, setArchives] = useState<Archives>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    try {
      const response = await fetch("/api/archive");
      const data = await response.json();
      setArchives(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch archives",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArchive = async () => {
    try {
      const response = await fetch("/api/archive", {
        method: "POST",
      });
      
      if (!response.ok) throw new Error("Failed to create archive");
      
      toast({
        title: "Success",
        description: "Archive created successfully",
      });
      
      fetchArchives();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create archive",
        variant: "destructive",
      });
    }
  };

  const downloadArchive = (date: string, words: ArchivedWord[]) => {
    const data = JSON.stringify(words, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vocabulary-archive-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Archives</h1>
        <Button onClick={handleCreateArchive}>
          <Archive className="w-4 h-4 mr-2" />
          Create Archive
        </Button>
      </div>

      {Object.keys(archives).length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No archives available</p>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {Object.entries(archives)
            .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
            .map(([date, words]) => (
              <AccordionItem key={date} value={date}>
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h2 className="text-lg font-semibold">
                            Archive {new Date(date).toLocaleDateString()}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {words.length} words
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadArchive(date, words)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      {words.map((word) => (
                        <div
                          key={word.id}
                          className="border-b pb-4 last:border-0 last:pb-0"
                        >
                          <h3 className="font-semibold">{word.word}</h3>
                          <p className="text-sm text-muted-foreground">
                            {word.definition}
                          </p>
                          {word.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Notes: {word.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
        </Accordion>
      )}
    </div>
  );
}