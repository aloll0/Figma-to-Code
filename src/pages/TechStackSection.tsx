import { CheckCircle2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    { name: 'Gemini Pro', desc: "Google's multimodal model", icon: '♊' },
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
  ],
};

const TechStackSection = () => (
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
              <li>
                • <strong>React + Vite:</strong> Fast HMR, optimized builds, large ecosystem
              </li>
              <li>
                • <strong>Tailwind:</strong> Perfect for programmatic style generation
              </li>
              <li>
                • <strong>Fastify:</strong> 2x faster than Express, built-in TypeScript
              </li>
              <li>
                • <strong>LangChain:</strong> Abstracts LLM provider differences
              </li>
              <li>
                • <strong>Redis + Bull:</strong> Reliable job queue for async AI tasks
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Performance Considerations
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • <strong>Edge Caching:</strong> Cache generated designs at CDN
              </li>
              <li>
                • <strong>Streaming:</strong> Stream LLM responses for faster UX
              </li>
              <li>
                • <strong>Incremental:</strong> Only sync changed components
              </li>
              <li>
                • <strong>Lazy Loading:</strong> Load design previews on demand
              </li>
              <li>
                • <strong>Web Workers:</strong> Offload parsing to background threads
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TechStackSection;
