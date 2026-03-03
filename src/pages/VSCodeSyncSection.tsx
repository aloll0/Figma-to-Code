import { Monitor, Terminal, CheckCircle2, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CodeBlock from '@/components/CodeBlock';

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
                'Live reload on design changes',
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <CodeBlock
            code={`// Extension manifest (package.json)
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
}`}
          />
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
            <CodeBlock
              code={`# Initialize design sync
$ ai-design init

# Pull components from Figma
$ ai-design pull --file KEY --output ./src

# Sync with watch mode
$ ai-design sync --watch

# Generate tokens only
$ ai-design tokens --format css,json,ts

# Validate design system
$ ai-design validate`}
            />
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold text-sm mb-2">
              Configuration (ai-design.config.json)
            </h4>
            <CodeBlock
              code={`{
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
}`}
            />
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
            <CodeBlock
              code={`// Client connects
ws://api.ai-design.com/sync

Headers: {
  "Authorization": "Bearer TOKEN",
  "X-Project-ID": "proj_123"
}`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Messages
            </h4>
            <CodeBlock
              code={`// Server → Client
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
}`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Acknowledgment
            </h4>
            <CodeBlock
              code={`// Sync complete
{
  "type": "sync.complete",
  "filesWritten": [
    "src/components/Button.tsx",
    "src/tokens/colors.ts"
  ],
  "duration": 245
}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default VSCodeSyncSection;
