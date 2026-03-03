import { Link, useLocation, useNavigate } from 'react-router-dom';

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    { id: '/', label: 'Home' },
    { id: '/playground', label: 'Playground' },
    { id: '/architecture', label: 'Architecture' },
    { id: '/data-structure', label: 'Data Structure' },
    { id: '/code-generation', label: 'Code Gen' },
    { id: '/vscode-sync', label: 'VS Code' },
    { id: '/roadmap', label: 'Roadmap' },
    { id: '/tech-stack', label: 'Tech Stack' },
    { id: '/system-prompt', label: 'Prompt' },
  ];

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-b border-border z-50">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="images/logo.svg" alt="Logo" className="w-13 h-14" />
        </Link>
        <select
          value={location.pathname}
          onChange={(e) => navigate(e.target.value)}
          className="bg-background border border-border rounded px-3 py-1 text-sm"
        >
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MobileNav;
