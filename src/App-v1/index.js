import React, { useState, useCallback, useEffect } from 'react';
import { Bell } from 'lucide-react';
import DashboardView from './views/DashboardView';
import UsageView from './views/UsageView';
import AssetsView from './views/AssetsView';
import AIChatView from './views/AIChatView';
import ProfileDrawer from './components/ProfileDrawer';
import ActivityDrawer from './components/ActivityDrawer';
import SchedulePanel from './components/SchedulePanel';
import BottomNavigation from './components/BottomNavigation';
import MaxChargeDrawer from './components/MaxChargeDrawer';
import { AI_RESPONSES } from './constants/data';

export default function EnergyHub({ currentVersion, setCurrentVersion }) {
  const [view, setView] = useState('dashboard');
  const [usagePeriod, setUsagePeriod] = useState('today');
  const [usageType, setUsageType] = useState('cost');
  const [usageAsset, setUsageAsset] = useState('all');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [errorCardState, setErrorCardState] = useState(null);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [maxChargeDrawerOpen, setMaxChargeDrawerOpen] = useState(false);
  const [isMaxCharging, setIsMaxCharging] = useState(false);
  const [maxChargeTarget, setMaxChargeTarget] = useState(100);
  const [maxChargeTimeRemaining, setMaxChargeTimeRemaining] = useState('3h 56m');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleAiSend = useCallback(() => {
    if (!aiInput.trim()) return;
    
    setAiMessages(prev => [...prev, { role: 'user', text: aiInput }]);
    setAiInput('');
    
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setAiMessages(prev => [...prev, { role: 'assistant', text: randomResponse }]);
    }, 600);
  }, [aiInput]);

  const handleErrorDemo = () => {
    setErrorCardState('error');
    setShowErrorCard(true);
    // Automatically transition to loading after 3 seconds
    setTimeout(() => {
      handleResolve();
    }, 3000);
  };

  const handleResolve = () => {
    setErrorCardState('loading');
    setTimeout(() => {
      setErrorCardState('resolved');
    }, 2000);
  };

  const handleDismiss = () => {
    setShowErrorCard(false);
    setTimeout(() => {
      setErrorCardState(null);
    }, 300);
  };

  const handleOpenMaxCharge = () => {
    setMaxChargeDrawerOpen(true);
  };

  const handleStartMaxCharge = (config) => {
    setIsMaxCharging(true);
    setMaxChargeTarget(config.target);
    // Calculate time remaining based on target (simplified calculation)
    const currentBattery = 45; // This should come from actual state
    const chargeNeeded = config.target - currentBattery;
    const hours = Math.floor(chargeNeeded / 15); // Assuming 15% per hour
    const minutes = Math.round(((chargeNeeded / 15) - hours) * 60);
    setMaxChargeTimeRemaining(`${hours}h ${minutes}m`);
  };

  const handleStopMaxCharge = () => {
    setIsMaxCharging(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-[56px]">
      {/* Header */}
      <div className="bg-slate-900 fixed top-0 left-0 right-0 z-50 border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setProfileOpen(true)} className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 transition flex-shrink-0">
              <span className="text-sm font-bold">K</span>
            </button>
            {/* Version Switcher */}
            <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
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
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleErrorDemo} className="text-xs text-slate-500 hover:text-slate-400 transition">
              Error
            </button>
            <button onClick={() => setActivityDrawerOpen(true)} className="flex items-center gap-1.5 hover:opacity-80 transition">
              <div className="relative flex-shrink-0">
                <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-slate-300" />
                </div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Dashboard View */}
        {view === 'dashboard' && (
          <DashboardView 
            setScheduleOpen={setScheduleOpen} 
            setView={setView}
            errorCardState={errorCardState}
            showErrorCard={showErrorCard}
            onResolveError={handleResolve}
            onDismissError={handleDismiss}
            isMaxCharging={isMaxCharging}
            maxChargeTarget={maxChargeTarget}
            maxChargeTimeRemaining={maxChargeTimeRemaining}
            onOpenMaxCharge={handleOpenMaxCharge}
            onStopMaxCharge={handleStopMaxCharge}
          />
        )}

        {/* Usage/History View */}
        {view === 'history' && (
          <UsageView 
            usagePeriod={usagePeriod}
            setUsagePeriod={setUsagePeriod}
            usageType={usageType}
            setUsageType={setUsageType}
            usageAsset={usageAsset}
            setUsageAsset={setUsageAsset}
            hoveredBar={hoveredBar}
            setHoveredBar={setHoveredBar}
          />
        )}

        {/* Assets View */}
        {view === 'settings' && <AssetsView />}

        {/* AI Chat View */}
        {view === 'ai' && (
          <AIChatView 
            messages={aiMessages}
            input={aiInput}
            onInputChange={setAiInput}
            onSend={handleAiSend}
          />
        )}
      </div>

      {/* FULL SCHEDULE PANEL */}
      <SchedulePanel isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />

      {/* ACTIVITY DRAWER */}
      <ActivityDrawer isOpen={activityDrawerOpen} onClose={() => setActivityDrawerOpen(false)} />

      {/* PROFILE DRAWER */}
      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* MAX CHARGE DRAWER */}
      <MaxChargeDrawer
        isOpen={maxChargeDrawerOpen}
        onClose={() => setMaxChargeDrawerOpen(false)}
        onStartMaxCharge={handleStartMaxCharge}
        currentBattery={45}
      />

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation view={view} setView={setView} />
    </div>
  );
}

