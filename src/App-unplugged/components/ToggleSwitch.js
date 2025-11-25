import React from 'react';

export default function ToggleSwitch({ on }) {
  return (
    <div className={`w-8 h-5 rounded-full flex items-center ${on ? 'bg-cyan-500' : 'bg-slate-600'}`}>
      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'ml-auto mr-0.5' : 'ml-0.5'}`}></div>
    </div>
  );
}

