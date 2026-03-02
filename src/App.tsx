import { useState } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { 
  Cpu, 
  Code2, 
  Figma, 
  Layers, 
  Zap, 
  Terminal, 
  Database, 
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Box,
  Workflow,
  Monitor,
  GitBranch,
  Sparkles,
  Layout,
  Palette,
  FileCode,
  Settings,
  Globe,
  Server,
  Play,
  Send,
  Loader2,
  Wand2,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

// CodeBlock Component
const CodeBlock = ({ code, language = 'typescript' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 bg-white/10 hover:bg-white/20"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="absolute left-2 top-2 text-xs text-muted-foreground font-mono">
        {language}
      </div>
      <pre className="code-block mt-6 text-xs sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  
  const sections = [
    { id: '/', label: 'Home', icon: Sparkles },
    { id: '/playground', label: 'Playground', icon: Play },
    { id: '/architecture', label: 'Architecture', icon: Cpu },
    { id: '/data-structure', label: 'Data Structure', icon: Database },
    { id: '/code-generation', label: 'Code Generation', icon: Code2 },
    { id: '/vscode-sync', label: 'VS Code Sync', icon: Terminal },
    { id: '/roadmap', label: 'Roadmap', icon: GitBranch },
    { id: '/tech-stack', label: 'Tech Stack', icon: Layers },
    { id: '/system-prompt', label: 'System Prompt', icon: FileCode },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-xl border-r border-border z-50 hidden lg:block">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="images/logo.svg" alt="Logo" className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-bold text-lg">AI Design→Code</h1>
            <p className="text-xs text-muted-foreground">Architecture Guide</p>
          </div>
        </Link>
        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = location.pathname === section.id;
              return (
                <Link
                  key={section.id}
                  to={section.id}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </nav>
  );
};

// Mobile Navigation
const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const sections = [
    { id: '/', label: 'Home' },
    { id: '/playground', label: 'Playground' },
    { id: '/architecture', label: 'Architecture' },
    { id: '/data-structure', label: 'Data Structure' },
    { id: '/code-generation', label: 'Code Gen' },
    { id: '/vscode-sync', label: 'VS Code' },
    { id: '/roadmap', label: 'Roadmap' },
    { id: '/tech-stack', label: 'Tech Stack' },
    { id: '/system-prompt', label: 'Prompt' },
  ];

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-b border-border z-50">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-bold">AI Design→Code</span>
        </Link>
        <select 
          value={location.pathname}
          onChange={(e) => navigate(e.target.value)}
          className="bg-background border border-border rounded px-3 py-1 text-sm"
        >
          {sections.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
    
    <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
      <Badge variant="outline" className="mb-6 px-4 py-1.5 border-blue-500/50 text-blue-400">
        <Sparkles className="w-3 h-3 mr-2" />
        Complete Technical Blueprint
      </Badge>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
        Build an AI-Powered
        <span className="gradient-text block">Design-to-Code Platform</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        A comprehensive technical roadmap for creating a Stitch-like application that generates 
        Figma-compatible designs and production-ready React code from natural language prompts.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/playground">
          <Button size="lg" className="gap-2">
            <Play className="w-4 h-4" /> Try Playground
          </Button>
        </Link>
        <Link to="/architecture">
          <Button size="lg" variant="outline" className="gap-2">
            Explore Architecture <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'System Design', value: '8 Modules' },
          { label: 'API Integration', value: 'Figma REST' },
          { label: 'Code Output', value: 'React + TS' },
          { label: 'Sync Method', value: 'VS Code Ext' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4">
            <div className="text-2xl font-bold gradient-text">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Playground Section - Interactive Demo
const PlaygroundSection = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | {
    designTokens: string;
    figmaJSON: string;
    reactCode: string;
  }>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResult({
      designTokens: `{
  "colors": {
    "primary": { "500": "#3b82f6", "600": "#2563eb" },
    "background": "#ffffff",
    "text": "#1f2937"
  },
  "typography": {
    "heading": { "fontSize": "2rem", "fontWeight": 700 },
    "body": { "fontSize": "1rem", "fontWeight": 400 }
  },
  "spacing": { "unit": 4, "scale": [0, 4, 8, 16, 24, 32, 48, 64] }
}`,
      figmaJSON: `{
  "document": {
    "type": "DOCUMENT",
    "children": [{
      "type": "CANVAS",
      "name": "Landing Page",
      "children": [
        {
          "type": "FRAME",
          "name": "Hero Section",
          "layout": { "mode": "VERTICAL", "gap": 24 },
          "children": [
            { "type": "TEXT", "name": "Headline", "characters": "Welcome" },
            { "type": "COMPONENT", "name": "CTA Button" }
          ]
        }
      ]
    }]
  }
}`,
      reactCode: `export function HeroSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome
        </h1>
        <Button variant="primary">
          Get Started
        </Button>
      </div>
    </section>
  );
}`
    });
    setIsGenerating(false);
  };

  const examplePrompts = [
    "Create a modern landing page for a coffee shop",
    "Design a login form with email and password fields",
    "Build a pricing table with 3 tiers",
    "Create a hero section with a call-to-action button"
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
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
            ) : (
              <><Send className="w-4 h-4" /> Generate Design & Code</>
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

// Architecture Section
const ArchitectureSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
      <p className="text-muted-foreground text-lg">
        High-level architecture showing how the LLM interacts with Figma API and the local development environment.
      </p>
    </div>

    <Card className="glass-card">
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Client Layer */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Monitor className="w-5 h-5" />
              Client Layer
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">Web Application</div>
                <div className="text-xs text-muted-foreground">React + Vite + Tailwind</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">Prompt Interface</div>
                <div className="text-xs text-muted-foreground">Natural language input</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">Live Preview</div>
                <div className="text-xs text-muted-foreground">Real-time rendering</div>
              </div>
            </div>
          </div>

          {/* AI/Backend Layer */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Server className="w-5 h-5" />
              AI & Backend Layer
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <div className="font-medium mb-1">LLM Engine</div>
                <div className="text-xs text-muted-foreground">GPT-4 / Claude / Gemini</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">Design Parser</div>
                <div className="text-xs text-muted-foreground">JSON schema generator</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">Code Generator</div>
                <div className="text-xs text-muted-foreground">React/TS transpiler</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">API Gateway</div>
                <div className="text-xs text-muted-foreground">Rate limiting, auth</div>
              </div>
            </div>
          </div>

          {/* Integration Layer */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Box className="w-5 h-5" />
              Integration Layer
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="font-medium mb-1 flex items-center gap-2">
                  <Figma className="w-4 h-4" /> Figma API
                </div>
                <div className="text-xs text-muted-foreground">REST API integration</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="font-medium mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> VS Code Ext
                </div>
                <div className="text-xs text-muted-foreground">Extension + CLI</div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="font-medium mb-1">WebSocket Server</div>
                <div className="text-xs text-muted-foreground">Real-time sync</div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Flow */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Workflow className="w-4 h-4" /> Data Flow Sequence
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'User submits prompt',
              '→',
              'LLM analyzes intent',
              '→',
              'Generate Design JSON',
              '→',
              'Create Figma file',
              '→',
              'Generate React code',
              '→',
              'Sync to VS Code',
              '→',
              'Live preview update'
            ].map((item, i) => (
              <span key={i} className={i % 2 === 0 ? 'px-3 py-1 rounded-full bg-primary/20 text-primary text-sm' : 'text-muted-foreground'}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            Data Flow: Prompt → Figma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`1. User: "Modern coffee shop landing page"

2. LLM Analysis:
   - Intent: Landing page
   - Industry: Food/Beverage  
   - Style: Modern, clean
   - Components: Hero, Features, CTA

3. Design JSON Generation:
   - Canvas structure
   - Component hierarchy
   - Style tokens (colors, typography)
   - Layout constraints

4. Figma API Call:
   POST /v1/files
   Body: { nodes, styles, components }

5. Response: File URL + File Key`} />
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            Data Flow: Design → Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`1. Parse Design JSON:
   - Extract component tree
   - Map styles to Tailwind
   - Identify layout patterns

2. Code Generation:
   - React component structure
   - TypeScript interfaces
   - Tailwind class mapping
   - Responsive breakpoints

3. Output Files:
   - Component.tsx
   - styles.ts (tokens)
   - index.ts (exports)

4. VS Code Sync:
   - WebSocket notification
   - File write operation
   - Hot reload trigger`} />
        </CardContent>
      </Card>
    </div>
  </div>
);

// Data Structure Section
const DataStructureSection = () => {
  const designTokenJSON = `{
  "version": "1.0.0",
  "designSystem": {
    "name": "CoffeeShop-Landing",
    "tokens": {
      "colors": {
        "primary": {
          "50": "#fdf8f6",
          "500": "#ea580c",
          "900": "#7c2d12"
        },
        "semantic": {
          "background": "{colors.primary.50}",
          "text": "{colors.primary.900}",
          "accent": "{colors.primary.500}"
        }
      },
      "typography": {
        "heading": {
          "fontFamily": "Inter",
          "fontSize": "2.5rem",
          "fontWeight": 700,
          "lineHeight": 1.2
        },
        "body": {
          "fontFamily": "Inter",
          "fontSize": "1rem",
          "fontWeight": 400,
          "lineHeight": 1.6
        }
      },
      "spacing": {
        "xs": "0.25rem",
        "sm": "0.5rem",
        "md": "1rem",
        "lg": "2rem",
        "xl": "4rem"
      },
      "borderRadius": {
        "sm": "0.25rem",
        "md": "0.5rem",
        "lg": "1rem",
        "full": "9999px"
      }
    }
  }
}`;

  const figmaNodeJSON = `{
  "document": {
    "type": "DOCUMENT",
    "children": [{
      "type": "CANVAS",
      "name": "Landing Page",
      "children": [
        {
          "type": "FRAME",
          "name": "Hero Section",
          "layout": {
            "mode": "VERTICAL",
            "padding": { "top": 80, "bottom": 80 },
            "gap": 32
          },
          "styles": {
            "fill": { "type": "SOLID", "color": "{colors.semantic.background}" }
          },
          "children": [
            {
              "type": "TEXT",
              "name": "Headline",
              "characters": "Craft Coffee, Perfected",
              "style": {
                "fontFamily": "{typography.heading.fontFamily}",
                "fontSize": { "value": "{typography.heading.fontSize}", "unit": "PIXELS" },
                "fontWeight": "{typography.heading.fontWeight}",
                "fills": [{ "type": "SOLID", "color": "{colors.semantic.text}" }]
              }
            },
            {
              "type": "COMPONENT",
              "name": "PrimaryButton",
              "componentProperties": {
                "label": "Order Now",
                "variant": "default"
              },
              "styles": {
                "fill": { "type": "SOLID", "color": "{colors.semantic.accent}" },
                "cornerRadius": "{borderRadius.md}",
                "padding": { "horizontal": 24, "vertical": 12 }
              }
            }
          ]
        }
      ]
    }]
  }
}`;

  const componentMappingJSON = `{
  "mapping": {
    "figma": {
      "TEXT": {
        "react": "p | h1-h6 | span",
        "tailwind": "text-{fontSize} font-{fontWeight} text-{color}"
      },
      "FRAME": {
        "react": "div | section | article",
        "tailwind": "flex {flexDirection} p-{padding} gap-{gap} bg-{color}"
      },
      "RECTANGLE": {
        "react": "div",
        "tailwind": "w-{width} h-{height} rounded-{radius} bg-{color}"
      },
      "COMPONENT": {
        "react": "CustomComponent",
        "props": "{componentProperties}",
        "import": "import { CustomComponent } from './components'"
      },
      "VECTOR": {
        "react": "svg",
        "tailwind": "w-{width} h-{height} text-{color}"
      },
      "IMAGE": {
        "react": "img",
        "props": "src, alt, loading"
      }
    },
    "layout": {
      "AUTO_LAYOUT": {
        "flex": "flex",
        "direction": {
          "VERTICAL": "flex-col",
          "HORIZONTAL": "flex-row"
        },
        "alignment": {
          "MIN": "items-start",
          "CENTER": "items-center",
          "MAX": "items-end"
        },
        "justify": {
          "MIN": "justify-start",
          "CENTER": "justify-center",
          "MAX": "justify-end",
          "SPACE_BETWEEN": "justify-between"
        }
      }
    }
  }
}`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Data Structure & Schema</h2>
        <p className="text-muted-foreground text-lg">
          JSON format to translate AI descriptions into Figma components and layers, 
          with bidirectional mapping to React code.
        </p>
      </div>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
          <TabsTrigger value="figma">Figma Node Schema</TabsTrigger>
          <TabsTrigger value="mapping">Component Mapping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Design Tokens Schema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Design tokens are the single source of truth for styling. They use a hierarchical structure 
                with primitive values and semantic aliases, compatible with W3C Design Tokens format.
              </p>
              <CodeBlock code={designTokenJSON} language="json" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="figma" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Figma className="w-5 h-5 text-purple-400" />
                Figma-Compatible Node Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This JSON structure mirrors Figma's document model with nodes, styles, and layout properties. 
                Token references use {"{path.to.token}"} syntax for resolution.
              </p>
              <CodeBlock code={figmaNodeJSON} language="json" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-cyan-400" />
                Figma-to-React Mapping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Bidirectional mapping rules that translate Figma node types to React components 
                and Tailwind CSS utility classes.
              </p>
              <CodeBlock code={componentMappingJSON} language="json" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Token Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Primitive tokens store raw values (hex, px, rem)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Semantic tokens reference primitives via aliases</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Component tokens bind semantics to contexts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Modes enable theme variations (light/dark)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Node Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Box className="w-4 h-4 text-blue-400 mt-0.5" />
                <span><strong>DOCUMENT</strong> - Root container</span>
              </li>
              <li className="flex items-start gap-2">
                <Layout className="w-4 h-4 text-purple-400 mt-0.5" />
                <span><strong>CANVAS</strong> - Page/artboard container</span>
              </li>
              <li className="flex items-start gap-2">
                <Monitor className="w-4 h-4 text-cyan-400 mt-0.5" />
                <span><strong>FRAME</strong> - Layout container with auto-layout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">T</span>
                <span><strong>TEXT</strong> - Typography elements</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Code Generation Section
const CodeGenerationSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">Code Generation Strategy</h2>
      <p className="text-muted-foreground text-lg">
        Best practices to ensure generated code matches the UI design 1:1 using a Design System approach.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Design System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">1. Token-First Approach</h4>
            <p className="text-sm text-muted-foreground">
              Generate design tokens first, then derive all component styles from tokens. 
              This ensures consistency and enables theming.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">2. Component Primitives</h4>
            <p className="text-sm text-muted-foreground">
              Build on unstyled primitive components (Radix UI) that handle accessibility 
              and behavior, styled with Tailwind.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">3. Layout System</h4>
            <p className="text-sm text-muted-foreground">
              Map Figma's auto-layout directly to CSS Flexbox with consistent gap, 
              padding, and alignment utilities.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">4. Responsive Strategy</h4>
            <p className="text-sm text-muted-foreground">
              Use mobile-first breakpoints that match Figma's breakpoint frames 
              (Mobile, Tablet, Desktop).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            Generated Code Example
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock code={`// Generated from Figma design tokens
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Token-mapped Tailwind classes
const buttonVariants = {
  primary: 'bg-orange-600 text-white hover:bg-orange-700',
  secondary: 'bg-orange-100 text-orange-900 hover:bg-orange-200',
  ghost: 'text-orange-600 hover:bg-orange-50'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-xl'
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children 
}: ButtonProps) {
  return (
    <button className={cn(
      'font-medium transition-colors',
      buttonVariants[variant],
      buttonSizes[size]
    )}>
      {children}
    </button>
  );
}`} />
        </CardContent>
      </Card>
    </div>

    <Card className="glass-card">
      <CardHeader>
        <CardTitle>1:1 Mapping Strategy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { 
              from: 'Figma Fill', 
              to: 'Tailwind Class',
              example: '#ea580c → bg-orange-600'
            },
            { 
              from: 'Auto Layout', 
              to: 'Flexbox',
              example: 'VERTICAL + gap:16 → flex-col gap-4'
            },
            { 
              from: 'Text Style', 
              to: 'Typography',
              example: 'Inter Bold 24px → text-2xl font-bold'
            },
            { 
              from: 'Constraints', 
              to: 'Responsive',
              example: 'Scale → w-full, Fixed → w-[px]'
            },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-muted-foreground mb-1">{item.from}</div>
              <ArrowRight className="w-4 h-4 text-primary my-2" />
              <div className="text-xs text-muted-foreground mb-1">{item.to}</div>
              <div className="text-sm font-mono text-cyan-400">{item.example}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// VS Code Sync Section
const VSCodeSyncSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">VS Code Integration</h2>
      <p className="text-muted-foreground text-lg">
        Two-pronged approach: VS Code Extension for IDE integration and CLI tool for automation.
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            VS Code Extension
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The extension provides real-time sync, design preview, and code diff visualization 
            directly in the IDE.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Features:</h4>
            <ul className="space-y-2">
              {[
                'Sidebar panel with design preview',
                'One-click code sync from Figma',
                'Design-to-code diff view',
                'Component import suggestions',
                'Token autocomplete',
                'Live reload on design changes'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <CodeBlock code={`// Extension manifest (package.json)
{
  "name": "ai-design-sync",
  "contributes": {
    "views": {
      "explorer": [{
        "id": "designPreview",
        "name": "Design Preview"
      }]
    },
    "commands": [{
      "command": "designSync.pull",
      "title": "Pull from Figma"
    },{
      "command": "designSync.sync",
      "title": "Sync Components"
    }]
  }
}`} />
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            CLI Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Command-line interface for CI/CD integration, batch operations, and headless environments.
          </p>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Commands:</h4>
            <CodeBlock code={`# Initialize design sync
$ ai-design init

# Pull components from Figma
$ ai-design pull --file KEY --output ./src

# Sync with watch mode
$ ai-design sync --watch

# Generate tokens only
$ ai-design tokens --format css,json,ts

# Validate design system
$ ai-design validate`} />
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold text-sm mb-2">Configuration (ai-design.config.json)</h4>
            <CodeBlock code={`{
  "figma": {
    "fileKey": "ABC123",
    "accessToken": "FIGMA_TOKEN_PLACEHOLDER"
  },
  "output": {
    "components": "./src/components",
    "tokens": "./src/tokens",
    "assets": "./public/assets"
  },
  "framework": "react",
  "styling": "tailwind"
}`} />
          </div>
        </CardContent>
      </Card>
    </div>

    <Card className="glass-card">
      <CardHeader>
        <CardTitle>WebSocket Sync Protocol</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Connection
            </h4>
            <CodeBlock code={`// Client connects
ws://api.ai-design.com/sync

Headers: {
  "Authorization": "Bearer TOKEN",
  "X-Project-ID": "proj_123"
}`} />
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Messages
            </h4>
            <CodeBlock code={`// Server → Client
{
  "type": "design.update",
  "fileKey": "ABC123",
  "changes": [...],
  "timestamp": "2024-01-15T..."
}

// Client → Server
{
  "type": "sync.request",
  "components": ["Button", "Card"]
}`} />
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Acknowledgment
            </h4>
            <CodeBlock code={`// Sync complete
{
  "type": "sync.complete",
  "filesWritten": [
    "src/components/Button.tsx",
    "src/tokens/colors.ts"
  ],
  "duration": 245
}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Roadmap Section
const RoadmapSection = () => {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      duration: 'Weeks 1-4',
      items: [
        'Set up project infrastructure (monorepo)',
        'Implement design token schema and parser',
        'Create Figma REST API client',
        'Build basic LLM prompt engineering pipeline',
        'Establish testing framework'
      ],
      status: 'Core'
    },
    {
      phase: 'Phase 2',
      title: 'AI Engine',
      duration: 'Weeks 5-8',
      items: [
        'Integrate LLM (OpenAI/Anthropic/Google)',
        'Build prompt templates for UI generation',
        'Implement design-to-JSON conversion',
        'Create feedback loop for iteration',
        'Add multi-variant generation'
      ],
      status: 'AI'
    },
    {
      phase: 'Phase 3',
      title: 'Code Generation',
      duration: 'Weeks 9-12',
      items: [
        'Build React component generator',
        'Implement Tailwind class mapper',
        'Create TypeScript definition generator',
        'Add responsive breakpoint handling',
        'Build component story generator'
      ],
      status: 'Code'
    },
    {
      phase: 'Phase 4',
      title: 'Figma Integration',
      duration: 'Weeks 13-16',
      items: [
        'Implement Figma file creation API',
        'Build component library sync',
        'Add style and variable sync',
        'Create design system publishing',
        'Implement version control'
      ],
      status: 'Design'
    },
    {
      phase: 'Phase 5',
      title: 'VS Code Extension',
      duration: 'Weeks 17-20',
      items: [
        'Create extension scaffold',
        'Build design preview panel',
        'Implement sync commands',
        'Add autocomplete for tokens',
        'Create diff visualization'
      ],
      status: 'IDE'
    },
    {
      phase: 'Phase 6',
      title: 'Polish & Launch',
      duration: 'Weeks 21-24',
      items: [
        'Performance optimization',
        'Error handling & recovery',
        'Documentation & examples',
        'Beta testing program',
        'Public release'
      ],
      status: 'Launch'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Technical Roadmap</h2>
        <p className="text-muted-foreground text-lg">
          24-week development plan from concept to production-ready platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phases.map((phase, i) => (
          <Card key={i} className="glass-card relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
              phase.status === 'Core' ? 'from-blue-500 to-cyan-500' :
              phase.status === 'AI' ? 'from-purple-500 to-pink-500' :
              phase.status === 'Code' ? 'from-cyan-500 to-emerald-500' :
              phase.status === 'Design' ? 'from-orange-500 to-red-500' :
              phase.status === 'IDE' ? 'from-emerald-500 to-green-500' :
              'from-yellow-500 to-orange-500'
            }`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{phase.phase}</Badge>
                <span className="text-xs text-muted-foreground">{phase.duration}</span>
              </div>
              <CardTitle className="text-xl mt-2">{phase.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Milestone Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500" />
            <div className="space-y-8 pl-12">
              {[
                { week: 'Week 4', title: 'MVP Token System', desc: 'Design tokens parsing and validation working' },
                { week: 'Week 8', title: 'AI Generation Alpha', desc: 'First end-to-end prompt-to-design working' },
                { week: 'Week 12', title: 'Code Gen Beta', desc: 'React components generating from Figma files' },
                { week: 'Week 16', title: 'Figma Sync Ready', desc: 'Bidirectional sync with Figma complete' },
                { week: 'Week 20', title: 'IDE Integration', desc: 'VS Code extension in beta' },
                { week: 'Week 24', title: 'Public Launch', desc: 'Production-ready platform release' },
              ].map((milestone, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[34px] w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-mono text-primary">{milestone.week}</span>
                    <span className="font-semibold">{milestone.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Tech Stack Section
const TechStackSection = () => {
  const stacks = {
    frontend: [
      { name: 'React 18', desc: 'UI library with concurrent features', icon: '⚛️' },
      { name: 'TypeScript', desc: 'Type-safe development', icon: '🔷' },
      { name: 'Vite', desc: 'Fast build tool and dev server', icon: '⚡' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling', icon: '🎨' },
      { name: 'shadcn/ui', desc: 'Accessible component primitives', icon: '🧩' },
      { name: 'Zustand', desc: 'Lightweight state management', icon: '🐻' },
    ],
    backend: [
      { name: 'Node.js', desc: 'Runtime environment', icon: '🟢' },
      { name: 'Fastify', desc: 'High-performance API framework', icon: '🚀' },
      { name: 'PostgreSQL', desc: 'Primary database', icon: '🐘' },
      { name: 'Redis', desc: 'Caching and sessions', icon: '🔴' },
      { name: 'Bull MQ', desc: 'Job queue for AI tasks', icon: '📬' },
      { name: 'Socket.io', desc: 'Real-time WebSocket comms', icon: '🔌' },
    ],
    ai: [
      { name: 'OpenAI GPT-4', desc: 'Primary LLM for generation', icon: '🧠' },
      { name: 'Claude 3', desc: 'Alternative LLM option', icon: '📚' },
      { name: 'Gemini Pro', desc: 'Google\'s multimodal model', icon: '♊' },
      { name: 'LangChain', desc: 'LLM orchestration framework', icon: '⛓️' },
      { name: 'Pinecone', desc: 'Vector DB for embeddings', icon: '🌲' },
      { name: 'Helicone', desc: 'LLM observability', icon: '📊' },
    ],
    devops: [
      { name: 'Docker', desc: 'Containerization', icon: '🐳' },
      { name: 'Kubernetes', desc: 'Container orchestration', icon: '☸️' },
      { name: 'GitHub Actions', desc: 'CI/CD pipelines', icon: '🔄' },
      { name: 'Vercel', desc: 'Frontend deployment', icon: '▲' },
      { name: 'AWS/GCP', desc: 'Cloud infrastructure', icon: '☁️' },
      { name: 'Terraform', desc: 'Infrastructure as code', icon: '🏗️' },
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Recommended Tech Stack</h2>
        <p className="text-muted-foreground text-lg">
          Modern, battle-tested technologies for each layer of the platform.
        </p>
      </div>

      <Tabs defaultValue="frontend" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="ai">AI/ML</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
        </TabsList>

        {Object.entries(stacks).map(([key, items]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <Card key={i} className="glass-card hover:border-primary/50 transition-all">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Architecture Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Why These Choices?
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>React + Vite:</strong> Fast HMR, optimized builds, large ecosystem</li>
                <li>• <strong>Tailwind:</strong> Perfect for programmatic style generation</li>
                <li>• <strong>Fastify:</strong> 2x faster than Express, built-in TypeScript</li>
                <li>• <strong>LangChain:</strong> Abstracts LLM provider differences</li>
                <li>• <strong>Redis + Bull:</strong> Reliable job queue for async AI tasks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Performance Considerations
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Edge Caching:</strong> Cache generated designs at CDN</li>
                <li>• <strong>Streaming:</strong> Stream LLM responses for faster UX</li>
                <li>• <strong>Incremental:</strong> Only sync changed components</li>
                <li>• <strong>Lazy Loading:</strong> Load design previews on demand</li>
                <li>• <strong>Web Workers:</strong> Offload parsing to background threads</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// System Prompt Section
const SystemPromptSection = () => {
  const systemPrompt = `You are an expert UI/UX Designer and Frontend Engineer specializing in converting natural language descriptions into structured design specifications and production-ready code.

## Your Role
Transform user prompts into:
1. Structured design JSON compatible with Figma's API
2. Production-ready React + TypeScript + Tailwind CSS code
3. Design token definitions for consistency

## Design Principles
- Follow modern UI/UX best practices
- Use consistent spacing (4px grid system)
- Ensure accessible color contrast (WCAG AA minimum)
- Design mobile-first with responsive breakpoints
- Use semantic HTML and ARIA labels

## Output Format
Always respond with a JSON object containing:

{
  "designTokens": {
    "colors": { "primary": "...", "secondary": "..." },
    "typography": { "heading": {...}, "body": {...} },
    "spacing": { "unit": 4, "scale": ["0.25rem", "0.5rem", ...] }
  },
  "figmaNodes": {
    "document": {
      "type": "DOCUMENT",
      "children": [...]
    }
  },
  "reactCode": {
    "components": [{
      "name": "ComponentName",
      "code": "export function...",
      "filePath": "src/components/ComponentName.tsx"
    }],
    "styles": "...",
    "imports": [...]
  },
  "explanation": "Brief description of design decisions"
}

## Figma Node Types
- DOCUMENT: Root container
- CANVAS: Page/artboard (e.g., "Desktop", "Mobile")
- FRAME: Layout container with auto-layout properties
- TEXT: Typography elements with fontFamily, fontSize, fontWeight
- RECTANGLE: Shapes with fills, strokes, cornerRadius
- COMPONENT: Reusable components with variants
- VECTOR: SVG icons and graphics
- IMAGE: Raster images with src and alt

## Layout Properties
For FRAME nodes, include:
- layout.mode: "VERTICAL" | "HORIZONTAL"
- layout.padding: { top, right, bottom, left }
- layout.gap: number (item spacing)
- layout.alignment: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN"
- layout.wrap: boolean (flex-wrap)

## Style Properties
- fills: [{ type: "SOLID" | "GRADIENT", color: string }]
- strokes: [{ color: string, weight: number }]
- cornerRadius: number | { topLeft, topRight, bottomLeft, bottomRight }
- effects: [{ type: "DROP_SHADOW" | "INNER_SHADOW", ... }]
- opacity: number (0-1)

## Tailwind Mapping Rules
- Colors: Use Tailwind palette (e.g., "#ea580c" → "orange-600")
- Spacing: Map to Tailwind scale (4px → "1", 8px → "2", etc.)
- Typography: Use text-{size}, font-{weight}, leading-{height}
- Layout: flex, flex-col, gap-{n}, p-{n}, items-{align}
- Responsive: prefix with sm:, md:, lg:, xl:

## Component Patterns
Button:
- Variants: primary, secondary, ghost, danger
- Sizes: sm (px-3 py-1.5), md (px-4 py-2), lg (px-6 py-3)
- States: hover, active, disabled, loading

Card:
- Structure: header, content, footer slots
- Styles: rounded-lg, shadow-md, border
- Variants: default, outlined, elevated

Input:
- States: default, focus, error, disabled
- Features: label, helper text, icon support
- Accessibility: aria-label, aria-describedby

## Accessibility Requirements
- Minimum contrast ratio: 4.5:1 for normal text
- Focus indicators: visible outline on interactive elements
- Semantic HTML: use correct heading hierarchy
- ARIA labels: for icons and non-text elements
- Keyboard navigation: all interactive elements focusable

## Example Response
User: "Create a modern login page with email and password fields"

Response: {
  "designTokens": {
    "colors": {
      "primary": { "500": "#3b82f6", "600": "#2563eb" },
      "gray": { "50": "#f9fafb", "900": "#111827" }
    },
    "typography": {
      "heading": { "fontSize": "1.5rem", "fontWeight": 700 },
      "body": { "fontSize": "1rem", "fontWeight": 400 }
    }
  },
  "figmaNodes": { ... },
  "reactCode": { ... },
  "explanation": "Clean, centered login form with clear visual hierarchy..."
}

## Constraints
- Use only standard web fonts (Inter, system-ui) unless specified
- Keep component hierarchy flat when possible (max 5 levels)
- Use auto-layout for all containers
- Export images at 2x resolution for retina displays
- Limit color palette to primary, secondary, neutral, and semantic colors`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">System Prompt</h2>
        <p className="text-muted-foreground text-lg">
          The internal LLM system prompt that handles design-to-code conversion. 
          Copy and customize for your AI engine.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary" />
              LLM System Prompt
            </CardTitle>
            <Badge variant="outline">Copy to use</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CodeBlock code={systemPrompt} language="markdown" />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              Token Generation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The prompt instructs the LLM to generate W3C-compliant design tokens 
              with primitive, semantic, and component-level hierarchies.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Figma className="w-4 h-4 text-blue-400" />
              Figma Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Defines the exact JSON schema for Figma nodes including layout properties, 
              styles, and component definitions.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Code Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Specifies React component patterns, Tailwind mapping rules, and 
              accessibility requirements for generated code.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Prompt Engineering Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <span className="font-medium">Be Explicit About Output Format</span>
                  <p className="text-sm text-muted-foreground">Define exact JSON schema to reduce parsing errors</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <span className="font-medium">Include Examples</span>
                  <p className="text-sm text-muted-foreground">Few-shot examples improve output consistency</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <span className="font-medium">Define Constraints</span>
                  <p className="text-sm text-muted-foreground">Limit options to ensure consistent output</p>
                </div>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">4</span>
                </div>
                <div>
                  <span className="font-medium">Use Chain-of-Thought</span>
                  <p className="text-sm text-muted-foreground">Ask LLM to explain decisions for better results</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">5</span>
                </div>
                <div>
                  <span className="font-medium">Version Your Prompts</span>
                  <p className="text-sm text-muted-foreground">Track changes and A/B test for improvements</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">6</span>
                </div>
                <div>
                  <span className="font-medium">Handle Errors Gracefully</span>
                  <p className="text-sm text-muted-foreground">Add retry logic and validation layers</p>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <MobileNav />
        
        {/* Main Content */}
        <main className="lg:ml-64 pt-16 lg:pt-0">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/playground" element={
              <div className="section-padding max-w-6xl mx-auto">
                <PlaygroundSection />
              </div>
            } />
            <Route path="/architecture" element={
              <div className="section-padding max-w-6xl mx-auto">
                <ArchitectureSection />
              </div>
            } />
            <Route path="/data-structure" element={
              <div className="section-padding max-w-6xl mx-auto">
                <DataStructureSection />
              </div>
            } />
            <Route path="/code-generation" element={
              <div className="section-padding max-w-6xl mx-auto">
                <CodeGenerationSection />
              </div>
            } />
            <Route path="/vscode-sync" element={
              <div className="section-padding max-w-6xl mx-auto">
                <VSCodeSyncSection />
              </div>
            } />
            <Route path="/roadmap" element={
              <div className="section-padding max-w-6xl mx-auto">
                <RoadmapSection />
              </div>
            } />
            <Route path="/tech-stack" element={
              <div className="section-padding max-w-6xl mx-auto">
                <TechStackSection />
              </div>
            } />
            <Route path="/system-prompt" element={
              <div className="section-padding max-w-6xl mx-auto">
                <SystemPromptSection />
              </div>
            } />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="lg:ml-64 border-t border-border py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">AI Design-to-Code Platform</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Complete technical blueprint for building a Stitch-like application
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
