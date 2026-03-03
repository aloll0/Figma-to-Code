import {
  Monitor,
  Server,
  Box,
  Figma,
  Terminal,
  Workflow,
  Database,
  Code2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CodeBlock from '@/components/CodeBlock';

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
              'Live preview update',
            ].map((item, i) => (
              <span
                key={i}
                className={
                  i % 2 === 0
                    ? 'px-3 py-1 rounded-full bg-primary/20 text-primary text-sm'
                    : 'text-muted-foreground'
                }
              >
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
          <CodeBlock
            code={`1. User: "Modern coffee shop landing page"

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

5. Response: File URL + File Key`}
          />
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
          <CodeBlock
            code={`1. Parse Design JSON:
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
   - Hot reload trigger`}
          />
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ArchitectureSection;
