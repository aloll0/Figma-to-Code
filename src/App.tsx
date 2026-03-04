import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from '@/components/Navigation';
import MobileNav from '@/components/MobileNav';

import HeroSection from '@/pages/HeroSection';
import PlaygroundSection from '@/pages/PlaygroundSection';
import ArchitectureSection from '@/pages/ArchitectureSection';
import DataStructureSection from '@/pages/DataStructureSection';
import CodeGenerationSection from '@/pages/CodeGenerationSection';
import VSCodeSyncSection from '@/pages/VSCodeSyncSection';
import RoadmapSection from '@/pages/RoadmapSection';
import TechStackSection from '@/pages/TechStackSection';
import SystemPromptSection from '@/pages/SystemPromptSection';
import FigmaDashboard from '@/pages/FigmaDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <MobileNav />
        
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
            <Route path="/figma-dashboard" element={
              <div className="section-padding max-w-6xl mx-auto">
                <FigmaDashboard />
              </div>
            } />
          </Routes>
        </main>

        <footer className="lg:ml-64 border-t border-border py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img className="w-10 h-10" src="/images/logo.svg" alt="" />
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
