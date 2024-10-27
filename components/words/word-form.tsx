"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface WordFormProps {
  initialData?: {
    id?: string;
    word: string;
    definition: string;
    notes?: string;
  };
}

export function WordForm({ initialData }: WordFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    word: initialData?.word || "",
    definition: initialData?.definition || "",
    notes: initialData?.notes || "",
  });
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData?.id
        ? `/api/words/${initialData.id}`
        : "/api/words";
      const method = initialData?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save word");

      toast({
        title: "Success",
        description: `Word ${initialData?.id ? "updated" : "added"} successfully`,
      });

      router.push("/admin/words");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save word",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="word">Word</Label>
          <Input
            id="word"
            value={formData.word}
            onChange={(e) =>
              setFormData({ ...formData, word: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="definition">Definition</Label>
          <Textarea
            id="definition"
            value={formData.definition}
            onChange={(e) =>
              setFormData({ ...formData, definition: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : initialData?.id
              ? "Update Word"
              : "Add Word"}
          </Button>
        </div>
      </form>
    </Card>
  );
}