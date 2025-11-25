import React from 'react';
import { Home, Zap, Sparkles, BarChart3 } from 'lucide-react';
import NavButton from './NavButton';

export default function BottomNavigation({ view, setView }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40">
      <div className="max-w-md mx-auto flex">
        <NavButton id="dashboard" icon={Home} label="Home" onClick={() => setView('dashboard')} view={view} />
        <NavButton id="settings" icon={Zap} label="My Hub" onClick={() => setView('settings')} view={view} />
        <NavButton id="ai" icon={Sparkles} label="Ask AI" onClick={() => setView('ai')} view={view} />
        <NavButton id="history" icon={BarChart3} label="Usage" onClick={() => setView('history')} view={view} />
      </div>
    </div>
  );
}

