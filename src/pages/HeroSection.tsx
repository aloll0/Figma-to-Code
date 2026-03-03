import { Link } from 'react-router-dom';
import { Sparkles, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F26B21]/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F2A821]/20 rounded-full blur-3xl animate-pulse delay-1000" />

    <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
      <Badge variant="outline" className="mb-6 px-4 py-1.5 border-[#F26B21]/50 text-[#F26B21] inline-flex items-center">
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

export default HeroSection;
