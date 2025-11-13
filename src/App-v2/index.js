import React, { useState, useCallback, useEffect } from 'react';
import { Clock } from 'lucide-react';
import DashboardView from './views/DashboardView';
import RewardsView from './views/RewardsView';
import UsageView from './views/UsageView';
import AssetsView from './views/AssetsView';
import ProfileDrawer from './components/ProfileDrawer';
import ActivityDrawer from './components/ActivityDrawer';
import SchedulePanel from './components/SchedulePanel';
import AIChatModal from './components/AIChatModal';
import BottomNavigation from './components/BottomNavigation';
import { AI_RESPONSES } from './constants/data';

export default function EnergyHub() {
  const [view, setView] = useState('dashboard');
  const [usagePeriod, setUsagePeriod] = useState('today');
  const [usageType, setUsageType] = useState('cost');
  const [usageAsset, setUsageAsset] = useState('all');
  const [hoveredBar, setHoveredBar] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [goalsExpanded, setGoalsExpanded] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [rewardFilter, setRewardFilter] = useState('all');

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

  return (
    <div className="min-h-screen bg-slate-900 pt-[112px]">
      {/* Header */}
      <div className="bg-slate-900 fixed top-[56px] left-0 right-0 z-50 border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
          <button onClick={() => setProfileOpen(true)} className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 transition">
            <span className="text-sm font-bold">K</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">⛅</span>
              <div>
                <p className="text-xs font-bold text-white">17°C</p>
                <p className="text-xs text-slate-400">At home</p>
              </div>
            </div>
            <button onClick={() => setActivityDrawerOpen(true)} className="flex items-center gap-1.5 hover:opacity-80 transition">
              <div className="relative">
                <Clock className="w-4 h-4 text-emerald-400" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-400">Activity</p>
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
            goalsExpanded={goalsExpanded}
            setGoalsExpanded={setGoalsExpanded}
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
      </div>

      {/* FULL SCHEDULE PANEL */}
      <SchedulePanel isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />

      {/* ACTIVITY DRAWER */}
      <ActivityDrawer isOpen={activityDrawerOpen} onClose={() => setActivityDrawerOpen(false)} />

      {/* PROFILE DRAWER */}
      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* AI CHAT MODAL */}
      <AIChatModal 
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        messages={aiMessages}
        input={aiInput}
        onInputChange={setAiInput}
        onSend={handleAiSend}
      />

      {/* BOTTOM NAVIGATION */}
      <BottomNavigation view={view} setView={setView} setAiOpen={setAiOpen} />
    </div>
  );
}

