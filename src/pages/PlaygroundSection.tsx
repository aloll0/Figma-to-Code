import { useState } from 'react';
import {
  Wand2,
  Loader2,
  Send,
  CheckCircle2,
  Code2,
  Palette,
  Eye,
  Download,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import CodeBlock from '@/components/CodeBlock';

const PlaygroundSection = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<null | {
    htmlPreview: string;
    reactCode: string;
    designTokens: string | object;
  }>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error – is the server running?');
    }

    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!result?.htmlPreview) return;
    const blob = new Blob([result.htmlPreview], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-design.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tokensString =
    typeof result?.designTokens === 'object'
      ? JSON.stringify(result.designTokens, null, 2)
      : (result?.designTokens ?? '');

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
          Describe any UI and get a live preview, React code, and design tokens.
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleGenerate();
            }}
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
                <Loader2 className="w-4 h-4 animate-spin" /> Generating with AI…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Generate Design & Code
              </>
            )}
          </Button>
          {isGenerating && (
            <p className="text-center text-xs text-muted-foreground">
              ⏳ Usually takes 5–15 seconds…
            </p>
          )}
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-red-500/40 bg-red-500/10">
          <CardContent className="pt-4 text-sm text-red-400">
            ❌ {error}
          </CardContent>
        </Card>
      )}

      {/* Output Section */}
      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold">تم التوليد بنجاح!</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" /> تحميل HTML
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  const win = window.open('', '_blank');
                  if (win) { win.document.write(result.htmlPreview); win.document.close(); }
                }}
              >
                <Eye className="w-4 h-4" /> فتح في تاب جديد
              </Button>
              <Button variant="outline" size="sm" onClick={() => setResult(null)} className="gap-2">
                <RefreshCw className="w-4 h-4" /> جديد
              </Button>
            </div>
          </div>

          {/* ── Live Preview (always visible, full width) ── */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">preview</span>
            </div>
            <iframe
              srcDoc={result.htmlPreview}
              title="Generated Design Preview"
              className="w-full border-0"
              style={{ height: '650px' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          {/* ── Code Tabs below preview ── */}
          <Tabs defaultValue="react" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="react">
                <Code2 className="w-4 h-4 mr-2" /> React Code
              </TabsTrigger>
              <TabsTrigger value="tokens">
                <Palette className="w-4 h-4 mr-2" /> Design Tokens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="react" className="mt-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" /> React Component
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(result.reactCode)}>
                    Copy
                  </Button>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={result.reactCode} language="tsx" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="mt-4">
              <Card className="glass-card">
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Palette className="w-4 h-4 text-orange-400" /> Design Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={tokensString} language="json" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PlaygroundSection;
