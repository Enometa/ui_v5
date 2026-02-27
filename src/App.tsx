import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Rocket, Code, Layers, Zap } from 'lucide-react';

export default function App() {
  const [message, setMessage] = useState('Initializing...');

  useEffect(() => {
    // Demonstrate Axios usage
    setMessage('Axios is ready!');
    console.log('Axios initialized:', axios.VERSION);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">React Basic Project</CardTitle>
          <CardDescription>
            Initialized with Shadcn UI, Tailwind CSS, and Axios.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-card/50">
            <Code className="w-5 h-5 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-semibold">Framework:</span> React 19 + Vite
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-card/50">
            <Layers className="w-5 h-5 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-semibold">UI Library:</span> Shadcn UI
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-lg bg-card/50">
            <Zap className="w-5 h-5 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-semibold">Status:</span> {message}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted/50 rounded border border-dashed">
            Note: Project initialized as React to match the environment and detailed instructions.
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => alert('Everything is working!')}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
