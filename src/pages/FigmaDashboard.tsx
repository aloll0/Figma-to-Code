import { useState, useRef } from 'react';
import {
  Figma,
  Link2,
  Upload,
  Key,
  Play,
  Loader2,
  CheckCircle2,
  Code2,
  Palette,
  Eye,
  Download,
  Copy,
  AlertCircle,
  TreePine,
  FileCode2,
  Layers,
  ArrowRight,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CodeBlock from '@/components/CodeBlock';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DesignTokens {
  colors: string[];
  fontFamilies: string[];
  fontSizes: number[];
  borderRadii: number[];
}

interface FigmaResult {
  reactCode: string;
  htmlPreview: string;
  tailwindConfig: string;
  parsedTree: object[];
  designTokens: DesignTokens;
  figmaName: string;
}

// ─── Pipeline Steps ──────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { id: 1, icon: Figma, label: 'Fetch Figma Doc', desc: 'REST API call to retrieve raw JSON' },
  { id: 2, icon: TreePine, label: 'Traverse Node Tree', desc: 'Walk Frames → Groups → Vectors → Text' },
  { id: 3, icon: Layers, label: 'Map to Tailwind', desc: 'fills / strokes / effects → CSS classes' },
  { id: 4, icon: Sparkles, label: 'AI Component Polish', desc: 'LLM refines into clean React TSX' },
  { id: 5, icon: FileCode2, label: 'Export Code', desc: 'React + tailwind.config.js ready' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function downloadFile(content: string, filename: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Component ───────────────────────────────────────────────────────────────

const FigmaDashboard = () => {
  const [inputMode, setInputMode] = useState<'url' | 'json'>('url');
  const [fileUrl, setFileUrl] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('figma_token') || '');
  const [jsonContent, setJsonContent] = useState('');
  const [tokenSaved, setTokenSaved] = useState(() => !!localStorage.getItem('figma_token', ));
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FigmaResult | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, key: string) => {
    copyToClipboard(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const saveToken = (value: string) => {
    localStorage.setItem('figma_token', value);
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 2000);
  };

  const simulatePipeline = async (task: () => Promise<void>) => {
    for (let i = 1; i <= PIPELINE_STEPS.length; i++) {
      setActiveStep(i);
      if (i < PIPELINE_STEPS.length) {
        await new Promise((r) => setTimeout(r, 600));
      } else {
        await task();
      }
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setActiveStep(0);

    try {
      await simulatePipeline(async () => {
        const body: Record<string, string> =
          inputMode === 'url'
            ? { fileUrl, token }
            : { figmaJson: jsonContent };

        const res = await fetch('http://localhost:3001/api/figma', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResult(data);
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }

    setIsProcessing(false);
    setActiveStep(0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setJsonContent(ev.target?.result as string);
    reader.readAsText(file);
  };

  const canProcess =
    inputMode === 'url'
      ? fileUrl.trim() && token.trim()
      : jsonContent.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <Figma className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Figma-to-Code Dashboard</h1>
            <p className="text-muted-foreground text-sm">Parse any Figma file → production-ready React + Tailwind</p>
          </div>
        </div>

        {/* Flow badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {['Figma REST API', 'Node Traversal', 'Tailwind Mapping', 'AI Polish', 'React Export'].map(
            (label, i, arr) => (
              <span key={label} className="flex items-center gap-1">
                <Badge variant="secondary" className="font-mono">{label}</Badge>
                {i < arr.length - 1 && <ArrowRight className="w-3 h-3" />}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── Input Card ── */}
      <Card className="border-violet-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Link2 className="w-4 h-4 text-violet-400" />
            Input Source
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mode toggle */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={inputMode === 'url' ? 'default' : 'outline'}
              onClick={() => setInputMode('url')}
              className="gap-2"
            >
              <Link2 className="w-3 h-3" /> Figma URL
            </Button>
            <Button
              size="sm"
              variant={inputMode === 'json' ? 'default' : 'outline'}
              onClick={() => setInputMode('json')}
              className="gap-2"
            >
              <Upload className="w-3 h-3" /> Upload JSON
            </Button>
          </div>

          {inputMode === 'url' ? (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Figma File URL
                </label>
                <Input
                  placeholder="https://www.figma.com/file/ABC123/My-Design"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="w-3 h-3" /> Personal Access Token
                  {localStorage.getItem('figma_token') && (
                    <span className="text-green-400 text-xs normal-case font-normal">(محفوظ ✓)</span>
                  )}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    placeholder="figd_••••••••••••••••"
                    value={token}
                    onChange={(e) => { setToken(e.target.value); }}
                    className="font-mono text-sm flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => saveToken(token)}
                    disabled={!token.trim()}
                    className="shrink-0"
                  >
                    {tokenSaved ? '✓ Saved' : 'Save'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  من{' '}
                  <a
                    href="https://www.figma.com/settings"
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-400 hover:underline"
                  >
                    figma.com → Settings → Personal access tokens → Generate new token
                  </a>
                  {' '}(بيتحفظ تلقائياً في المتصفح)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border hover:border-violet-500/50 rounded-lg p-8 text-center cursor-pointer transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Click to upload Figma JSON export</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Export via Figma → Plugins → Export as JSON, or drag a .json file
                </p>
                {jsonContent && (
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> JSON loaded ({(jsonContent.length / 1024).toFixed(1)} KB)
                  </Badge>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
              <p className="text-xs text-muted-foreground">
                Or paste Figma JSON export directly — the parser handles both file and document-level exports.
              </p>
            </div>
          )}

          <Button
            onClick={handleProcess}
            disabled={!canProcess || isProcessing}
            className="w-full gap-2 bg-violet-600 hover:bg-violet-700 text-white"
            size="lg"
          >
            {isProcessing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
            ) : (
              <><Play className="w-4 h-4" /> Generate Code from Figma</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* ── Pipeline Tracker ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-primary" />
            Processing Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            {PIPELINE_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              const isDone = activeStep > step.id || (result && !isProcessing);
              return (
                <div key={step.id} className="flex-1 relative">
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                        : isDone
                        ? 'border-green-500/40 bg-green-500/5'
                        : 'border-border bg-card/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {isActive ? (
                        <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                      ) : isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-xs font-semibold ${isActive ? 'text-violet-300' : isDone ? 'text-green-400' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">{step.desc}</p>
                  </div>
                  {step.id < PIPELINE_STEPS.length && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground/30 absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── Error ── */}
      {error && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="pt-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-400">Processing failed</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4">
          {/* Summary bar */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">"{result.figmaName}" converted successfully</span>
            <div className="flex gap-2 ml-auto flex-wrap">
              <Badge variant="secondary">{result.designTokens.colors.length} Colors</Badge>
              <Badge variant="secondary">{result.designTokens.fontFamilies.length} Fonts</Badge>
              <Badge variant="secondary">{result.designTokens.fontSizes.length} Font Sizes</Badge>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => {
                  const win = window.open('', '_blank');
                  if (win) { win.document.write(result.htmlPreview); win.document.close(); }
                }}
              >
                <Eye className="w-3 h-3" /> فتح Preview في تاب جديد
              </Button>
            </div>
          </div>

          {/* ── Live Preview (always visible) ── */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">{result.figmaName} — preview</span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto gap-1.5 text-xs h-6 px-2"
                onClick={() => downloadFile(result.htmlPreview, 'preview.html', 'text/html')}
              >
                <Download className="w-3 h-3" /> HTML
              </Button>
            </div>
            <iframe
              title="HTML Preview"
              srcDoc={result.htmlPreview}
              className="w-full border-0"
              style={{ height: '600px' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>

          {/* Design Tokens Quick View */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-violet-400" />
                Extracted Design Tokens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Colors */}
              {result.designTokens.colors.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Colors</p>
                  <div className="flex flex-wrap gap-2">
                    {result.designTokens.colors.map((c) => (
                      <div key={c} className="flex items-center gap-1.5 text-xs bg-card border border-border rounded-md px-2 py-1">
                        <div className="w-3.5 h-3.5 rounded-sm border border-white/10" style={{ backgroundColor: c }} />
                        <span className="font-mono">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Fonts */}
              {result.designTokens.fontFamilies.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Font Families</p>
                  <div className="flex flex-wrap gap-2">
                    {result.designTokens.fontFamilies.map((f) => (
                      <Badge key={f} variant="outline" className="font-mono text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {/* Font sizes */}
              {result.designTokens.fontSizes.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Font Sizes (px)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.designTokens.fontSizes.map((s) => (
                      <Badge key={s} variant="secondary" className="font-mono text-xs">{s}px</Badge>
                    ))}
                  </div>
                </div>
              )}
              {/* Border radii */}
              {result.designTokens.borderRadii.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Border Radii (px)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.designTokens.borderRadii.map((r) => (
                      <Badge key={r} variant="secondary" className="font-mono text-xs">{r}px</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Code output tabs */}
          <Card>
            <CardContent className="pt-4">
              <Tabs defaultValue="react">
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="react" className="gap-1.5 text-xs">
                      <Code2 className="w-3 h-3" /> React TSX
                    </TabsTrigger>
                    <TabsTrigger value="tailwind" className="gap-1.5 text-xs">
                      <Palette className="w-3 h-3" /> tailwind.config
                    </TabsTrigger>
                    <TabsTrigger value="tree" className="gap-1.5 text-xs">
                      <TreePine className="w-3 h-3" /> Node Tree
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* React Code */}
                <TabsContent value="react" className="space-y-2">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      onClick={() => handleCopy(result.reactCode, 'react')}
                    >
                      {copied === 'react' ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied === 'react' ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      onClick={() => downloadFile(result.reactCode, 'FigmaComponent.tsx')}
                    >
                      <Download className="w-3 h-3" /> Download .tsx
                    </Button>
                  </div>
                  <CodeBlock code={result.reactCode} language="tsx" />
                </TabsContent>

                {/* Tailwind Config */}
                <TabsContent value="tailwind" className="space-y-2">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      onClick={() => handleCopy(result.tailwindConfig || '', 'tailwind')}
                    >
                      {copied === 'tailwind' ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied === 'tailwind' ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      onClick={() => downloadFile(result.tailwindConfig || '', 'tailwind.config.js')}
                    >
                      <Download className="w-3 h-3" /> Download
                    </Button>
                  </div>
                  <CodeBlock code={result.tailwindConfig || '// No config generated'} language="javascript" />
                </TabsContent>

                {/* Node Tree */}
                <TabsContent value="tree" className="space-y-2">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 text-xs"
                      onClick={() => handleCopy(JSON.stringify(result.parsedTree, null, 2), 'tree')}
                    >
                      {copied === 'tree' ? <CheckCircle2 className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied === 'tree' ? 'Copied!' : 'Copy JSON'}
                    </Button>
                  </div>
                  <CodeBlock code={JSON.stringify(result.parsedTree, null, 2)} language="json" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Reset */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => { setResult(null); setError(null); setFileUrl(''); setToken(''); setJsonContent(''); }}
            >
              <RefreshCw className="w-4 h-4" /> Start New Conversion
            </Button>
          </div>
        </div>
      )}

      {/* ── How It Works (always visible) ── */}
      {!result && !isProcessing && (
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">How the Parser Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium">Figma REST API Fetch</p>
                    <p className="text-xs text-muted-foreground">GET /v1/files/:key using your Personal Access Token. Returns the full document JSON tree.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium">Node Tree Traversal</p>
                    <p className="text-xs text-muted-foreground">Recursively walks Frames → Groups → Vectors/Rectangles → Text nodes, up to 6 levels deep.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium">Property Mapping</p>
                    <p className="text-xs text-muted-foreground">
                      <code className="bg-muted px-1 rounded">fills</code> → <code className="bg-muted px-1 rounded">bg-[#hex]</code>,{' '}
                      <code className="bg-muted px-1 rounded">cornerRadius</code> → <code className="bg-muted px-1 rounded">rounded-lg</code>,{' '}
                      <code className="bg-muted px-1 rounded">effects</code> → <code className="bg-muted px-1 rounded">shadow-md</code>
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-medium">Semantic Tag Inference</p>
                    <p className="text-xs text-muted-foreground">
                      Node named <code className="bg-muted px-1 rounded">"Primary Button"</code> → <code className="bg-muted px-1 rounded">&lt;button&gt;</code>. Heuristics cover 20+ component patterns.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <p className="font-medium">AI Refinement (Groq LLaMA 3)</p>
                    <p className="text-xs text-muted-foreground">The annotated tree is sent to the LLM which produces clean, idiomatic React TSX with proper composition.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div>
                    <p className="font-medium">Modular Export</p>
                    <p className="text-xs text-muted-foreground">React component (.tsx) + tailwind.config.js with custom design tokens + standalone HTML preview.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Node.js function */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Sample: Figma Fetch + LLM Handoff
              </p>
              <CodeBlock
                language="javascript"
                code={`// 1. Fetch Figma document
                const figmaRes = await fetch(
                  \`https://api.figma.com/v1/files/\${fileKey}\`,
                  { headers: { 'X-Figma-Token': token } }
                );
                const { document } = await figmaRes.json();

                // 2. Traverse and annotate nodes
                function traverseNodes(node, depth = 0) {
                  return {
                    name: node.name,
                    type: node.type,
                    semanticTag: inferSemanticTag(node),   // "button", "nav", "article"…
                    tailwindClasses: mapToTailwind(node),   // "bg-[#3B82F6] rounded-lg px-[16px]"
                    children: (node.children ?? [])
                      .slice(0, 20)
                      .map(c => traverseNodes(c, depth + 1)),
                  };
                }

                // 3. Hand annotated tree to LLM for clean React output
                const prompt = \`Convert this annotated Figma tree to a React TSX component.
                Use the tailwindClasses exactly as provided.
                Respect semanticTag for HTML elements.\n\n\${JSON.stringify(tree, null, 2)}\`;`}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FigmaDashboard;
