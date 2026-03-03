import { Settings, Code2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CodeBlock from '@/components/CodeBlock';

const CodeGenerationSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">Code Generation Strategy</h2>
      <p className="text-muted-foreground text-lg">
        Best practices to ensure generated code matches the UI design 1:1 using a Design System
        approach.
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
              Generate design tokens first, then derive all component styles from tokens. This ensures
              consistency and enables theming.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">2. Component Primitives</h4>
            <p className="text-sm text-muted-foreground">
              Build on unstyled primitive components (Radix UI) that handle accessibility and
              behavior, styled with Tailwind.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">3. Layout System</h4>
            <p className="text-sm text-muted-foreground">
              Map Figma's auto-layout directly to CSS Flexbox with consistent gap, padding, and
              alignment utilities.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">4. Responsive Strategy</h4>
            <p className="text-sm text-muted-foreground">
              Use mobile-first breakpoints that match Figma's breakpoint frames (Mobile, Tablet,
              Desktop).
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
          <CodeBlock
            code={`// Generated from Figma design tokens
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
}`}
          />
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
            { from: 'Figma Fill', to: 'Tailwind Class', example: '#ea580c → bg-orange-600' },
            { from: 'Auto Layout', to: 'Flexbox', example: 'VERTICAL + gap:16 → flex-col gap-4' },
            { from: 'Text Style', to: 'Typography', example: 'Inter Bold 24px → text-2xl font-bold' },
            {
              from: 'Constraints',
              to: 'Responsive',
              example: 'Scale → w-full, Fixed → w-[px]',
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

export default CodeGenerationSection;
