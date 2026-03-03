import { FileCode, Palette, Figma, Code2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CodeBlock from '@/components/CodeBlock';

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

const SystemPromptSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">System Prompt</h2>
      <p className="text-muted-foreground text-lg">
        The internal LLM system prompt that handles design-to-code conversion. Copy and customize for
        your AI engine.
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
            The prompt instructs the LLM to generate W3C-compliant design tokens with primitive,
            semantic, and component-level hierarchies.
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
            Defines the exact JSON schema for Figma nodes including layout properties, styles, and
            component definitions.
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
            Specifies React component patterns, Tailwind mapping rules, and accessibility requirements
            for generated code.
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
            {[
              {
                n: 1,
                title: 'Be Explicit About Output Format',
                desc: 'Define exact JSON schema to reduce parsing errors',
              },
              {
                n: 2,
                title: 'Include Examples',
                desc: 'Few-shot examples improve output consistency',
              },
              {
                n: 3,
                title: 'Define Constraints',
                desc: 'Limit options to ensure consistent output',
              },
            ].map((tip) => (
              <li key={tip.n} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">{tip.n}</span>
                </div>
                <div>
                  <span className="font-medium">{tip.title}</span>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {[
              {
                n: 4,
                title: 'Use Chain-of-Thought',
                desc: 'Ask LLM to explain decisions for better results',
              },
              {
                n: 5,
                title: 'Version Your Prompts',
                desc: 'Track changes and A/B test for improvements',
              },
              {
                n: 6,
                title: 'Handle Errors Gracefully',
                desc: 'Add retry logic and validation layers',
              },
            ].map((tip) => (
              <li key={tip.n} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">{tip.n}</span>
                </div>
                <div>
                  <span className="font-medium">{tip.title}</span>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SystemPromptSection;
