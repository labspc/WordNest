import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Brain, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Vocabulary Learning Platform
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enhance your vocabulary with our modern learning platform. Study, track,
            and master new words efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Study Words</h2>
              <p className="text-muted-foreground">
                Access your vocabulary list and start learning new words
              </p>
              <Link href="/study" className="mt-2">
                <Button>Start Studying</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Practice Mode</h2>
              <p className="text-muted-foreground">
                Test your knowledge with interactive exercises
              </p>
              <Link href="/practice" className="mt-2">
                <Button>Start Practice</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <p className="text-muted-foreground">
                Manage vocabulary and system settings
              </p>
              <Link href="/admin" className="mt-2">
                <Button variant="outline">Access Admin</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}