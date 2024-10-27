"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Word } from "@prisma/client";

export default function StudyPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
    setShowDefinition(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    setShowDefinition(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">No Words Available</h2>
          <p className="text-muted-foreground">
            Please add some words to start studying.
          </p>
        </Card>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Study Mode</h1>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {words.length}
          </div>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{currentWord.word}</h2>
              <Button variant="ghost" size="icon">
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>

            <div
              className={`transition-opacity duration-300 ${
                showDefinition ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Definition:</h3>
                  <p className="text-lg">{currentWord.definition}</p>
                </div>
                {currentWord.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Notes:</h3>
                    <p className="text-muted-foreground">{currentWord.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowDefinition(!showDefinition)}
              >
                {showDefinition ? "Hide" : "Show"} Definition
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex justify-between items-center pt-4">
          <Button onClick={handlePrevious} variant="outline">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}