import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Play,
  Cpu,
  Database,
  Code2,
  Terminal,
  GitBranch,
  Layers,
  FileCode,
  ChevronRight,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </nav>
  );
};

export default Navigation;
