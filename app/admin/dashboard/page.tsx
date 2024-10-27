import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Archive, 
  Settings, 
  Plus,
  Download
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/words/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Word
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Manage Words</h2>
              <p className="text-muted-foreground">Add, edit, or delete words</p>
            </div>
          </div>
          <Link href="/admin/words" className="mt-4 block">
            <Button variant="outline" className="w-full">View Words</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Archive className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Archives</h2>
              <p className="text-muted-foreground">View and manage archives</p>
            </div>
          </div>
          <Link href="/admin/archives" className="mt-4 block">
            <Button variant="outline" className="w-full">View Archives</Button>
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Export Data</h2>
              <p className="text-muted-foreground">Download vocabulary data</p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">Export</Button>
        </Card>
      </div>
    </div>
  );
}