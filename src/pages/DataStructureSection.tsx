import { Palette, Figma, Layout, CheckCircle2, Box, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from '@/components/CodeBlock';

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

const DataStructureSection = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold mb-4">Data Structure & Schema</h2>
      <p className="text-muted-foreground text-lg">
        JSON format to translate AI descriptions into Figma components and layers, with bidirectional
        mapping to React code.
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
              Design tokens are the single source of truth for styling. They use a hierarchical
              structure with primitive values and semantic aliases, compatible with W3C Design Tokens
              format.
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
              This JSON structure mirrors Figma's document model with nodes, styles, and layout
              properties. Token references use {'{path.to.token}'} syntax for resolution.
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
              Bidirectional mapping rules that translate Figma node types to React components and
              Tailwind CSS utility classes.
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
              <span>
                <strong>DOCUMENT</strong> - Root container
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Layout className="w-4 h-4 text-purple-400 mt-0.5" />
              <span>
                <strong>CANVAS</strong> - Page/artboard container
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Monitor className="w-4 h-4 text-cyan-400 mt-0.5" />
              <span>
                <strong>FRAME</strong> - Layout container with auto-layout
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">T</span>
              <span>
                <strong>TEXT</strong> - Typography elements
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DataStructureSection;
