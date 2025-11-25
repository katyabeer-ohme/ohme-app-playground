import React, { useState } from 'react';
import AppV1 from './App-v1/index';
import AppV3 from './App-v3/index';
import AppV2 from './App-v2/index';
import PasswordProtection from './PasswordProtection';

export default function App() {
  const [currentVersion, setCurrentVersion] = useState('v1');

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-slate-900">
      {/* Version Switcher Header */}
      <div className="bg-slate-800 fixed top-0 left-0 right-0 z-[100] border-b border-slate-700">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">⚡</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">OhmeFlo</p>
              <p className="text-xs text-slate-400">Prototype</p>
            </div>
          </div>
          
          {/* Version Switcher */}
          <div className="flex gap-1 bg-slate-900 rounded-lg p-1">
            <button
              onClick={() => setCurrentVersion('v1')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                currentVersion === 'v1'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              V1
            </button>
            <button
              onClick={() => setCurrentVersion('v2')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                currentVersion === 'v2'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              V2
            </button>
            <button
              onClick={() => setCurrentVersion('v3')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                currentVersion === 'v3'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              V3
            </button>
          </div>
        </div>
      </div>

      {/* Render the selected version */}
      {currentVersion === 'v1' ? <AppV1 /> : currentVersion === 'v2' ? <AppV2 /> : <AppV3 />}
      </div>
    </PasswordProtection>
  );
}