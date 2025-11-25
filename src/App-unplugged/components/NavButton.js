import React from 'react';

export default function NavButton({ id, icon: Icon, label, onClick, view }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex-1 py-3 flex flex-col items-center gap-1 border-t-2 ${
        view === id ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

