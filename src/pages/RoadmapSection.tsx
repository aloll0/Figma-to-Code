import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      'Establish testing framework',
    ],
    status: 'Core',
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
      'Add multi-variant generation',
    ],
    status: 'AI',
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
      'Build component story generator',
    ],
    status: 'Code',
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
      'Implement version control',
    ],
    status: 'Design',
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
      'Create diff visualization',
    ],
    status: 'IDE',
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
      'Public release',
    ],
    status: 'Launch',
  },
];

const RoadmapSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">Technical Roadmap</h2>
      <p className="text-muted-foreground text-lg">
        24-week development plan from concept to production-ready platform.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phases.map((phase, i) => (
        <Card
          key={i}
          className="glass-card relative overflow-hidden group hover:border-primary/50 transition-all"
        >
          <div
            className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
              phase.status === 'Core'
                ? 'from-blue-500 to-cyan-500'
                : phase.status === 'AI'
                ? 'from-purple-500 to-pink-500'
                : phase.status === 'Code'
                ? 'from-cyan-500 to-emerald-500'
                : phase.status === 'Design'
                ? 'from-orange-500 to-red-500'
                : phase.status === 'IDE'
                ? 'from-emerald-500 to-green-500'
                : 'from-yellow-500 to-orange-500'
            }`}
          />
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {phase.phase}
              </Badge>
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
              {
                week: 'Week 4',
                title: 'MVP Token System',
                desc: 'Design tokens parsing and validation working',
              },
              {
                week: 'Week 8',
                title: 'AI Generation Alpha',
                desc: 'First end-to-end prompt-to-design working',
              },
              {
                week: 'Week 12',
                title: 'Code Gen Beta',
                desc: 'React components generating from Figma files',
              },
              {
                week: 'Week 16',
                title: 'Figma Sync Ready',
                desc: 'Bidirectional sync with Figma complete',
              },
              { week: 'Week 20', title: 'IDE Integration', desc: 'VS Code extension in beta' },
              {
                week: 'Week 24',
                title: 'Public Launch',
                desc: 'Production-ready platform release',
              },
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

export default RoadmapSection;
