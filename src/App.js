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
      {/* Render the selected version */}
      {currentVersion === 'v1' ? (
        <AppV1 currentVersion={currentVersion} setCurrentVersion={setCurrentVersion} />
      ) : currentVersion === 'v2' ? (
        <AppV2 currentVersion={currentVersion} setCurrentVersion={setCurrentVersion} />
      ) : (
        <AppV3 currentVersion={currentVersion} setCurrentVersion={setCurrentVersion} />
      )}
      </div>
    </PasswordProtection>
  );
}