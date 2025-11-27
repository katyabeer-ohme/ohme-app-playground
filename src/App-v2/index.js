import React, { useState, useCallback, useEffect } from 'react';
import { Bell, User } from 'lucide-react';
import DashboardView from './views/DashboardView';
import RewardsView from './views/RewardsView';
import UsageView from './views/UsageView';
import AssetsView from './views/AssetsView';
import AIChatView from './views/AIChatView';
import ProfileDrawer from './components/ProfileDrawer';
import ActivityDrawer from './components/ActivityDrawer';
import SchedulePanel from './components/SchedulePanel';
import BottomNavigation from './components/BottomNavigation';
import AITroubleshootDrawer from './components/AITroubleshootDrawer';
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
  const [rewardFilter, setRewardFilter] = useState('all');
  const [errorCardState, setErrorCardState] = useState(null);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [aiTroubleshootOpen, setAiTroubleshootOpen] = useState(false);

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
  };

  const handleOpenAITroubleshoot = () => {
    setAiTroubleshootOpen(true);
  };

  const handleErrorResolved = () => {
    setShowErrorCard(false);
    setTimeout(() => {
      setErrorCardState(null);
    }, 300);
  };

  const handleDismiss = () => {
    setShowErrorCard(false);
    setTimeout(() => {
      setErrorCardState(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-[56px]">
      {/* Header */}
      <div className="bg-slate-900 fixed top-0 left-0 right-0 z-50 border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setProfileOpen(true)} className="w-9 h-9 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 hover:bg-cyan-500/30 hover:text-cyan-200 transition flex-shrink-0">
              <User className="w-4 h-4" />
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
            <button onClick={() => setActivityDrawerOpen(true)} className="flex items-center gap-1.5 transition">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-300 hover:bg-cyan-500/30 hover:text-cyan-200 transition">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
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
            onOpenAITroubleshoot={handleOpenAITroubleshoot}
            onDismissError={handleDismiss}
          />
        )}

        {/* Rewards View */}
        {view === 'rewards' && <RewardsView rewardFilter={rewardFilter} setRewardFilter={setRewardFilter} />}

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
      <ProfileDrawer 
        isOpen={profileOpen} 
        onClose={() => setProfileOpen(false)}
        onLogout={() => {
          sessionStorage.removeItem('ohmeFloAuth');
          window.location.reload();
        }}
      />

      {/* AI TROUBLESHOOT DRAWER */}
      <AITroubleshootDrawer 
        isOpen={aiTroubleshootOpen}
        onClose={() => setAiTroubleshootOpen(false)}
        onErrorResolved={handleErrorResolved}
      />

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation view={view} setView={setView} />
    </div>
  );
}

