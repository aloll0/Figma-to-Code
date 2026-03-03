import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wand2,
  Loader2,
  Send,
  CheckCircle2,
  Code2,
  Figma,
  Palette,
  Eye,
  Download,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import CodeBlock from '@/components/CodeBlock';

const PlaygroundSection = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | {
    designTokens: string;
    figmaJSON: string;
    reactCode: string;
  }>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);

    const res = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data);

    setIsGenerating(false);
  };

  const examplePrompts = [
    'Create a modern landing page for a coffee shop',
    'Design a login form with email and password fields',
    'Build a pricing table with 3 tiers',
    'Create a hero section with a call-to-action button',
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">AI Playground</h2>
        <p className="text-muted-foreground text-lg">
          Try the design-to-code conversion. Enter a description and see the generated output.
        </p>
      </div>

      {/* Input Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Describe Your Design
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the UI you want to create... (e.g., 'A modern landing page for a coffee shop with a hero section, features grid, and contact form')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] bg-black/30 border-white/10 resize-none"
          />
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examplePrompts.map((ex, i) => (
              <button
                key={i}
                onClick={() => setPrompt(ex)}
                className="text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full gap-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Generate Design & Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output Section */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold">Generation Complete!</span>
          </div>

          <Tabs defaultValue="react" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="react">
                <Code2 className="w-4 h-4 mr-2" /> React Code
              </TabsTrigger>
              <TabsTrigger value="figma">
                <Figma className="w-4 h-4 mr-2" /> Figma JSON
              </TabsTrigger>
              <TabsTrigger value="tokens">
                <Palette className="w-4 h-4 mr-2" /> Design Tokens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="react" className="mt-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    Generated React Component
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" /> Preview
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" /> Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={result.reactCode} language="tsx" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="figma" className="mt-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Figma className="w-4 h-4 text-purple-400" />
                    Figma-Compatible JSON
                  </CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Figma className="w-4 h-4" /> Open in Figma
                  </Button>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={result.figmaJSON} language="json" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="mt-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Palette className="w-4 h-4 text-orange-400" />
                    Design Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={result.designTokens} language="json" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setResult(null)} className="gap-2">
              <RefreshCw className="w-4 h-4" /> New Generation
            </Button>
            <Link to="/architecture">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-4 h-4" /> Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaygroundSection;
