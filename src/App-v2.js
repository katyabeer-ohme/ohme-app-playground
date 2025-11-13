import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronRight, Zap, Sun, Home, Battery, Clock, AlertCircle, TrendingDown, BarChart3, Sparkles, Send, X, Car, Award } from 'lucide-react';

// Constants
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PLUG_IN_STREAK = [true, true, true, false, true, false, false];

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
  const aiMessagesEndRef = useRef(null);

  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;

  const NavButton = ({ id, icon: Icon, label, onClick }) => (
    <button 
      onClick={onClick || (() => setView(id))} 
      className={`flex-1 py-3 flex flex-col items-center gap-1 border-t-2 ${
        view === id ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  const ToggleSwitch = ({ on }) => (
    <div className={`w-8 h-5 rounded-full flex items-center ${on ? 'bg-cyan-500' : 'bg-slate-600'}`}>
      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'ml-auto mr-0.5' : 'ml-0.5'}`}></div>
    </div>
  );

  const WeekDayBox = ({ day, active }) => (
    <div className="flex-1">
      <div className={`w-full aspect-square rounded-lg flex items-center justify-center font-semibold text-xs transition-all ${
        active
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
          : 'bg-slate-700/50 text-slate-500 border border-slate-600'
      }`}>
        {day}
      </div>
    </div>
  );

  const rewardsData = {
    totalEarned: 142.30,
    thisMonth: 42.30,
    weekStreak: 5,
    badges: [
      { name: 'Early Adopter', icon: '🌟', earned: true, date: 'Oct 2024' },
      { name: 'Flex Champion', icon: '💪', earned: true, date: 'Nov 2024' },
      { name: 'Solar Master', icon: '☀️', earned: true, date: 'Nov 2024' },
      { name: 'Week Warrior', icon: '🔥', earned: false, date: 'Lock in 7 days' },
    ],
    transactions: [
      { date: 'Nov 10', type: 'v2g', amount: 2.50, description: 'Peak Response - Evening window', status: 'pending' },
      { date: 'Nov 9', type: 'flex', amount: 1.80, description: 'Flexibility Service - Load shift', status: 'paid' },
      { date: 'Nov 8', type: 'v2g', amount: 3.20, description: 'Peak Response - Evening window', status: 'paid' },
      { date: 'Nov 7', type: 'bonus', amount: 5.00, description: 'Week Streak Bonus', status: 'paid' },
      { date: 'Nov 6', type: 'flex', amount: 1.95, description: 'Flexibility Service - Load shift', status: 'paid' },
      { date: 'Nov 5', type: 'v2g', amount: 2.80, description: 'Peak Response - Evening window', status: 'paid' },
    ],
  };

  useEffect(() => {
    aiMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const todaySchedule = [
    { timeSlot: 'Right now', action: 'Charging from solar', target: '+23%', cost: 'Free', reason: 'Utilising free energy', icon: 'solar', consumption: 7.2 },
    { timeSlot: '3:45 - 5:00 PM', action: 'Paused', target: '0%', cost: '£0.00', reason: 'High grid rate window', icon: 'pause', consumption: 0 },
    { timeSlot: '5:00 - 10:30 PM', action: 'Powering home with Tesla (V2H)', target: '-15%', cost: 'Save £0.80', reason: 'Peak rate avoidance', icon: 'v2h', consumption: -4.8 },
    { timeSlot: '10:30 PM - 6:00 AM', action: 'Off-peak charging', target: '+35%', cost: '£1.20', reason: 'Night rate advantage', icon: 'night', consumption: 11.2 },
    { timeSlot: '6:00 - 7:30 AM', action: 'Final top-up', target: '+8%', cost: '£0.30', reason: 'Ready for morning', icon: 'charge', consumption: 2.4 },
    { timeSlot: '7:30 - 8:00 AM', action: 'Preconditioning', target: '0%', cost: '£0.10', reason: 'Cabin heating', icon: 'precondition', consumption: 0.3 },
  ];

  const activityEvents = [
    {
      date: 'Today',
      events: [
        { time: '10:30 AM', type: 'plug-in', title: 'EV plugged in', details: 'Tesla Model 3 • Battery: 45%' },
        { time: '10:45 AM', type: 'solar', title: 'Solar peak detected', details: 'Charging initiated at 7.2kW • Weather: Clear' },
        { time: '12:00 PM', type: 'schedule-change', title: 'Schedule adjusted', details: 'Solar forecast dropped 20% • Added more grid charging' },
        { time: '1:00 PM', type: 'v2h', title: 'V2H activated', details: 'Discharging to home • Peak rate window active' },
        { time: '3:15 PM', type: 'alert', title: 'Minor alert resolved', details: 'Low voltage condition detected • Status: Fixed' },
      ]
    },
    {
      date: 'Yesterday',
      events: [
        { time: '9:15 PM', type: 'session-end', title: 'Charging session complete', details: 'Tesla Model 3 • Charged to 87% • Saved £1.80' },
        { time: '3:30 PM', type: 'schedule-change', title: 'Plan optimized', details: 'Better off-peak rates available' },
        { time: '10:15 AM', type: 'plug-in', title: 'EV plugged in', details: 'Tesla Model 3 • Battery: 62%' },
      ]
    }
  ];

  const usageData = [
    { time: '00:00', cost: 0.45, saving: 0, kwh: 1.5 },
    { time: '06:00', cost: 0.42, saving: 0, kwh: 1.4 },
    { time: '10:00', cost: 0.72, saving: 0, kwh: 2.3 },
    { time: '12:00', cost: 0, saving: 1.20, kwh: 0 },
    { time: '17:00', cost: 0.92, saving: 0, kwh: 3.0 },
    { time: '20:00', cost: 0, saving: 0.60, kwh: 0 },
    { time: '23:00', cost: 0.28, saving: 0, kwh: 0.9 },
  ];

  const getEventIcon = (type) => {
    if (type === 'plug-in' || type === 'session-end') return Zap;
    if (type === 'solar') return Sun;
    if (type === 'schedule-change') return TrendingDown;
    if (type === 'v2h') return Home;
    if (type === 'alert') return AlertCircle;
    return Clock;
  };

  const getEventColors = (type) => {
    if (type === 'plug-in' || type === 'session-end') return { bg: 'bg-cyan-500/20', text: 'text-cyan-400' };
    if (type === 'solar') return { bg: 'bg-yellow-500/20', text: 'text-yellow-400' };
    if (type === 'schedule-change') return { bg: 'bg-orange-500/20', text: 'text-orange-400' };
    if (type === 'v2h') return { bg: 'bg-emerald-500/20', text: 'text-emerald-400' };
    if (type === 'alert') return { bg: 'bg-red-500/20', text: 'text-red-400' };
    return { bg: 'bg-slate-700', text: 'text-slate-400' };
  };

  const AI_RESPONSES = useMemo(() => [
    'Based on current conditions, I would recommend charging now while solar is strong.',
    'You could save £0.50 more today by shifting usage 2–3 PM instead.',
    'V2G window opens at 5 PM. Your battery will be ready by then!',
  ], []);

  const handleAiSend = useCallback(() => {
    if (!aiInput.trim()) return;
    
    setAiMessages(prev => [...prev, { role: 'user', text: aiInput }]);
    setAiInput('');
    
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      setAiMessages(prev => [...prev, { role: 'assistant', text: randomResponse }]);
    }, 600);
  }, [aiInput, AI_RESPONSES]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-900 sticky top-[58px] z-50 border-b border-slate-800">
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
          <div className="pb-24">
            {/* HOME ENERGY */}
            <div className="px-4 mb-8 pt-4">
              <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="relative w-full h-64 flex items-center justify-center">
                  {/* Dotted Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {/* Solar to Charger (center) */}
                    <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
                    {/* Charger to Car */}
                    <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
                    {/* Battery to Home */}
                    <line x1="75%" y1="80%" x2="75%" y2="20%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
                    {/* Solar to Home */}
                    <line x1="25%" y1="20%" x2="75%" y2="20%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                  
                  <div className="absolute w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-0 left-8 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-yellow-500/50">
                      <Sun className="w-6 h-6 text-yellow-400" />
                    </div>
                    <p className="text-xs text-slate-400">Solar</p>
                    <p className="text-sm font-bold text-yellow-400">+4.2 kW</p>
                  </div>
                  <div className="absolute top-0 right-8 text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-orange-500/50">
                      <Home className="w-6 h-6 text-orange-400" />
                    </div>
                    <p className="text-xs text-slate-400">Home</p>
                    <p className="text-sm font-bold text-orange-400">2.1 kW</p>
                  </div>
                  <div className="absolute bottom-0 right-8 text-center">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-cyan-500/50">
                      <Battery className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-xs text-slate-400">Battery</p>
                    <p className="text-sm font-bold text-cyan-400">65%</p>
                  </div>
                  <div className="absolute bottom-0 left-8 text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/50">
                      <Zap className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400">Car</p>
                    <p className="text-sm font-bold text-emerald-400">2.1 kW</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SESSION TARGETS */}
            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
                <button onClick={() => setGoalsExpanded(!goalsExpanded)} className="w-full text-left p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h2 className="text-sm font-bold text-white">Session Targets</h2>
                      <p className="text-xs text-slate-400 mt-0.5">2 targets</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 px-2 py-1 rounded-full border border-slate-600 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Optimised
                      </span>
                      <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${goalsExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </button>

                {goalsExpanded && (
                  <div className="border-t border-slate-700">
                    <div className="px-4 py-3">
                      <div className="space-y-3 mb-3">
                        <div className="flex items-start gap-3">
                          <Car className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">Charge Tesla Model 3</p>
                            <p className="text-xs text-slate-400 mt-0.5">Min 80% by Tue 08:00 AM</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <TrendingDown className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">Optimise for savings</p>
                            <p className="text-xs text-slate-400 mt-0.5">Avoid peak charging</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full text-cyan-400 hover:text-cyan-300 font-medium text-sm py-2">
                        Edit targets →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* HAPPENING NOW */}
            <div className="px-4 mb-4">
              <h2 className="text-lg font-bold text-white mb-1">Happening now</h2>
            </div>

            {/* CHARGING TESLA CARD */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl p-5 shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 text-3xl">
                    <span>☀️</span>
                    <span className="text-slate-500 text-lg">→</span>
                    <span>🚗</span>
                  </div>
                  <span className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    Live
                  </span>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-bold text-white">Charging your Tesla with solar</h2>
                  <p className="text-xs text-slate-300">2.1 kW</p>
                </div>
                <p className="text-xs text-slate-300 mb-4">Adding +23% between 11 AM and ~3:45 PM</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-lg font-medium text-xs transition">Boost charge</button>
                  <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-3 rounded-lg font-medium text-xs transition">Stop</button>
                </div>
              </div>
            </div>

            {/* COMING UP NEXT */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-5 shadow-lg">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-white mb-3">Coming up next</h2>
                  <div className="bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 mb-4 flex gap-3">
                    <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-200 leading-relaxed">It's sunny today—I've optimised your schedule to max out solar charging from 10 AM–3 PM. Grid rates peak 5–9 PM, perfect for V2G earnings if you want to enable it.</p>
                  </div>
                </div>
                <div className="space-y-0 relative pl-6 mb-6">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-600"></div>
                  {todaySchedule.slice(1, 5).map((item, idx) => (
                    <div key={idx} className="relative pb-6 last:pb-0">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900"></div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 mb-1 font-medium">{item.timeSlot}</p>
                          <p className="text-sm font-semibold text-white mb-1">{item.action}</p>
                          <p className="text-xs text-slate-400">{item.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-400 mb-0.5">{item.target}</p>
                          <p className={`text-xs ${item.cost.includes('Save') ? 'text-emerald-400' : 'text-slate-400'}`}>{item.cost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* V2G Card */}
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-purple-400 mb-0.5">V2G Opportunity</p>
                      <p className="text-sm font-bold text-white">Earn £2.50</p>
                    </div>
                    <span className="text-lg">💰</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">National Grid • 5:00 PM - 9:00 PM</p>
                  <p className="text-xs text-slate-400 mb-3">Export to grid during peak hours when demand is high.</p>
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium text-xs transition">Add to schedule</button>
                </div>
                <button onClick={() => setScheduleOpen(true)} className="w-full text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                  View full schedule →
                </button>
              </div>
            </div>

            {/* PLUG-IN STREAK SECTION */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 shadow-lg border border-purple-500/30">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-white">This Week's Streak</h2>
                    <span className="text-2xl">🔥</span>
                  </div>
                  <p className="text-sm text-slate-300">{streakCount} out of 7 days plugged in</p>
                </div>

                {/* Week Days Grid */}
                <div className="flex gap-2 mb-6">
                {WEEK_DAYS.map((day, idx) => (
                  <WeekDayBox key={idx} day={day} active={PLUG_IN_STREAK[idx]} />
                ))}
                </div>

                {/* Rewards Strip */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Flex Rewards Earned</p>
                    <p className="text-2xl font-bold text-cyan-400">£18.50</p>
                  </div>
                  <button onClick={() => setView('rewards')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition">
                    View Rewards →
                  </button>
                </div>
              </div>
            </div>

            {/* Today So Far */}
            <div className="px-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-4 shadow-lg">
                  <p className="text-xs text-slate-400 mb-1">Energy Used</p>
                  <p className="text-2xl font-bold text-white mb-2">£0.95</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Sun className="w-3 h-3 text-yellow-400" />
                        <span className="text-slate-400">Solar</span>
                      </div>
                      <span className="text-white font-medium">11.4 kWh</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-orange-400" />
                        <span className="text-slate-400">Grid</span>
                      </div>
                      <span className="text-white font-medium">3.2 kWh</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-900/30 rounded-lg p-4 shadow-lg border border-emerald-500/20">
                  <p className="text-xs text-emerald-300 mb-1">Savings</p>
                  <p className="text-2xl font-bold text-emerald-400 mb-2">£2.35</p>
                  <p className="text-xs text-emerald-300">vs peak rates</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rewards View */}
        {view === 'rewards' && (
          <div className="pb-24">
            <div className="px-4 pt-6 pb-4">
              <h2 className="text-xl font-bold text-white mb-2">Rewards</h2>
              <p className="text-sm text-slate-400">Earn money by being flexible</p>
            </div>

            {/* Earnings Summary */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 shadow-lg border border-purple-500/30">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Total Earned</p>
                    <p className="text-3xl font-bold text-white">£{rewardsData.totalEarned.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">This Month</p>
                    <p className="text-3xl font-bold text-emerald-400">+£{rewardsData.thisMonth.toFixed(2)}</p>
                  </div>
                </div>
                <div className="bg-slate-900/30 rounded-lg p-3">
                  <p className="text-xs text-slate-300 mb-2">💡 Earning tip</p>
                  <p className="text-xs text-slate-400">Enable V2G during peak hours (5-9pm) to earn £2-3 more per day</p>
                </div>
              </div>
            </div>

            {/* Week Streak */}
            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">This Week's Streak</h3>
                    <p className="text-sm text-slate-400">{streakCount} out of 7 days plugged in</p>
                  </div>
                  <span className="text-3xl">🔥</span>
                </div>

                {/* Week Days Grid */}
                <div className="flex gap-2 mb-4">
                {WEEK_DAYS.map((day, idx) => (
                  <WeekDayBox key={idx} day={day} active={PLUG_IN_STREAK[idx]} />
                ))}
                </div>

                <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-500/20">
                  <p className="text-xs text-emerald-300 mb-1">Next reward unlocks at 7 days</p>
                  <p className="text-lg font-bold text-emerald-400">+£5.00 bonus</p>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {rewardsData.badges.map((badge, idx) => (
                  <div key={idx} className={`rounded-xl p-4 ${
                    badge.earned 
                      ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                      : 'bg-slate-800 border border-slate-700'
                  }`}>
                    <div className="text-3xl mb-2 text-center">{badge.icon}</div>
                    <p className={`text-sm font-semibold text-center mb-1 ${badge.earned ? 'text-white' : 'text-slate-500'}`}>
                      {badge.name}
                    </p>
                    <p className={`text-xs text-center ${badge.earned ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {badge.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="px-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Recent Earnings</h3>
                <select 
                  value={rewardFilter} 
                  onChange={(e) => setRewardFilter(e.target.value)}
                  className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer border border-slate-700"
                >
                  <option value="all">All</option>
                  <option value="v2g">V2G Only</option>
                  <option value="flex">Flex Only</option>
                  <option value="bonus">Bonuses Only</option>
                </select>
              </div>

              <div className="space-y-2">
                {rewardsData.transactions
                  .filter(tx => rewardFilter === 'all' || tx.type === rewardFilter)
                  .map((transaction, idx) => {
                    const typeColors = {
                      v2g: { bg: 'bg-purple-500/20', icon: '⚡' },
                      flex: { bg: 'bg-cyan-500/20', icon: '💪' },
                      bonus: { bg: 'bg-yellow-500/20', icon: '🎁' },
                    };
                    const colors = typeColors[transaction.type];
                    return (
                      <div key={idx} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                            <span className="text-lg">{colors.icon}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{transaction.description}</p>
                            <p className="text-xs text-slate-400">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-emerald-400">+£{transaction.amount.toFixed(2)}</p>
                          <p className={`text-xs ${transaction.status === 'paid' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                            {transaction.status === 'paid' ? '✓ Paid' : '⏱ Pending'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Payout Info */}
            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <h3 className="text-sm font-semibold text-white mb-3">Payout Information</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Next payout</span>
                    <span className="text-white font-medium">Dec 5, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pending amount</span>
                    <span className="text-yellow-400 font-medium">£2.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Payment method</span>
                    <span className="text-white font-medium">Bank •••• 4521</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-sm transition">
                  Update payment method
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Usage/History View */}
        {view === 'history' && (
          <div className="pb-24">
            <div className="px-4 pt-6 pb-2">
              <h2 className="text-xl font-bold text-white">Usage</h2>
            </div>
            <div className="px-4 pt-2 pb-4 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-400 mb-2">Period</p>
                  <select value={usagePeriod} onChange={(e) => setUsagePeriod(e.target.value)} className="w-full px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer">
                    <option value="today">Today</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-400 mb-2">Type</p>
                  <div className="flex gap-1">
                    <button onClick={() => setUsageType('cost')} className={usageType === 'cost' ? 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400'}>£</button>
                    <button onClick={() => setUsageType('kwh')} className={usageType === 'kwh' ? 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400'}>kWh</button>
                    <button onClick={() => setUsageType('carbon')} className={usageType === 'carbon' ? 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400'}>CO₂</button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-2">Asset</p>
                <select value={usageAsset} onChange={(e) => setUsageAsset(e.target.value)} className="w-full px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer">
                  <option value="all">All Assets</option>
                  <option value="solar">Solar Only</option>
                  <option value="tesla">Tesla Model 3</option>
                  <option value="house">House Only</option>
                </select>
              </div>
            </div>

            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-2xl p-4 shadow-lg">
                <p className="text-xs font-semibold text-slate-400 mb-4">24-Hour Cost Breakdown</p>
                <div className="h-48 flex items-end gap-0.5 pb-4 border-b border-slate-700 mb-4 relative bg-slate-900/50 rounded-lg p-2">
                  <div className="absolute left-2 top-2 text-xs text-slate-500">£1.0</div>
                  {usageData.map((bar, idx) => {
                    const costValue = bar.cost;
                    const savingValue = bar.saving;
                    const costHeight = (Math.abs(costValue) / 2 * 100);
                    const savingHeight = (Math.abs(savingValue) / 2 * 100);
                    return (
                      <div key={idx} className="flex-1 flex items-end gap-0.5 relative" onMouseEnter={() => setHoveredBar(idx)} onMouseLeave={() => setHoveredBar(null)} style={{ height: '100%' }}>
                        {costValue > 0 && <div className="flex-1 bg-orange-400 rounded-t cursor-pointer hover:opacity-80" style={{ height: `${costHeight}%`, minHeight: '4px' }}></div>}
                        {savingValue > 0 && <div className="flex-1 bg-emerald-400 rounded-t cursor-pointer hover:opacity-80" style={{ height: `${savingHeight}%`, minHeight: '4px' }}></div>}
                        {hoveredBar === idx && (
                          <div className="absolute bottom-full mb-2 bg-slate-950 text-white text-xs rounded-lg p-3 z-10 w-48 shadow-xl">
                            <p className="font-semibold mb-2">{bar.time}</p>
                            <p className="mb-1 text-slate-300">Cost: <span className="font-bold text-orange-400">£{bar.cost.toFixed(2)}</span></p>
                            <p className="mb-1 text-slate-300">Saving: <span className="font-bold text-emerald-400">£{bar.saving.toFixed(2)}</span></p>
                            <p className="text-slate-300">Energy: <span className="font-bold text-cyan-400">{bar.kwh.toFixed(1)} kWh</span></p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-slate-300">Cost</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-slate-300">Saving</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 shadow-lg">
                <p className="text-xs font-semibold text-slate-400 mb-3">Today's Summary</p>
                <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-slate-400">Total Cost</p>
                      <p className="text-lg font-bold text-white">£18.45</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Saving</p>
                      <p className="text-lg font-bold text-emerald-400">£2.35</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Energy</p>
                      <p className="text-lg font-bold text-white">38.2 kWh</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-white mb-2">💡 Smart Suggestion</p>
                  <p className="text-xs text-slate-300 leading-relaxed">Lower home consumption 5-6 PM and enable V2G to earn £1.50 more today.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assets View */}
        {view === 'settings' && (
          <div className="pb-24">
            <div className="px-4 pt-6 pb-6">
              <h2 className="text-xl font-bold text-white">Assets</h2>
            </div>
            <div className="px-4 pb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Assets & Devices</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-semibold text-white">Tesla Model 3</p>
                    <Car className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400 font-medium">✓ Paired</p>
                    <p className="text-2xl font-bold text-cyan-400 mt-2">23%</p>
                  </div>
                </button>
                <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-semibold text-white">BMW i3</p>
                    <Car className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Unpaired</p>
                  </div>
                </button>
                <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-semibold text-white">Home Pro</p>
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400 font-medium">● Online</p>
                  </div>
                </button>
                <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm font-semibold text-white">Home Battery</p>
                    <Battery className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400 font-medium">✓ Paired</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-2">49%</p>
                  </div>
                </button>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Solar</p>
                    <p className="text-xs text-slate-400 mt-1">5.5 kWp</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-yellow-400 font-medium">✓ Exporting now</p>
                    <Sun className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
                <div className="text-xs text-slate-300 mt-3">
                  <p>Min export: 4A</p>
                </div>
              </div>
            </div>

            {/* TARIFFS & PRICING */}
            <div className="px-4 pb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Tariffs & Pricing</h3>
              
              <div className="bg-slate-800 rounded-lg p-4 mb-3">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-white mb-1">Octopus Energy - Agile</p>
                  <p className="text-xs text-slate-400">Octopus Energy</p>
                </div>
                
                <div className="mb-4 p-3 bg-slate-700/30 rounded">
                  <p className="text-xs text-slate-300">Current rate:</p>
                  <p className="text-lg font-bold text-cyan-400 mt-1">28.5p/kWh</p>
                </div>

                <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                  Change tariff →
                </button>
              </div>

              <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium text-left">
                + Add export tariff
              </button>
            </div>

            {/* V2G & FLEX */}
            <div className="px-4 pb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">V2G & Flex Programs</h3>
              
              <div className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">National Grid - Peak Response</p>
                      <p className="text-xs text-slate-400 mt-1">Next payout: 5 Dec</p>
                    </div>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full font-semibold">Active</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-3">£42.30 earned • 28.5 kWh exported</p>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-sm font-semibold text-white mb-3">Local DNO - Flexibility</p>
                  <p className="text-xs text-slate-400 mb-3">Available to enroll</p>
                  <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                    Learn more →
                  </button>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">Battery health impact</p>
                  <p className="text-sm font-semibold text-white">~2% annual degradation</p>
                  <p className="text-xs text-slate-300 mt-2">Expected battery life: 8-10 years</p>
                </div>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="px-4 pb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Notifications</h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Rate changes', on: true },
                  { label: 'Charging complete', on: true },
                  { label: 'V2G opportunities', on: true },
                  { label: 'Low battery alerts', on: false },
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <p className="text-sm text-slate-300">{notif.label}</p>
                    <ToggleSwitch on={notif.on} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULL SCHEDULE PANEL */}
      {scheduleOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setScheduleOpen(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 w-full bg-slate-900 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
              <h2 className="text-lg font-bold text-white">Full Schedule</h2>
              <button onClick={() => setScheduleOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-4">
                {todaySchedule.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{item.timeSlot}</p>
                        <p className="text-sm font-semibold text-white">{item.action}</p>
                      </div>
                      <p className="text-sm font-bold text-cyan-400">{item.target}</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{item.reason}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400">{Math.abs(item.consumption)} kWh</span>
                      </div>
                      <p className={`text-xs font-semibold ${item.cost.includes('Save') ? 'text-emerald-400' : item.cost.includes('Free') ? 'text-yellow-400' : 'text-slate-400'}`}>
                        {item.cost}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY DRAWER */}
      {activityDrawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setActivityDrawerOpen(false)}></div>
          <div className="fixed left-0 top-0 bottom-0 w-full bg-slate-900 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
              <h2 className="text-lg font-bold text-white">Activity</h2>
              <button 
                onClick={() => setActivityDrawerOpen(false)} 
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all"
                aria-label="Close activity drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {activityEvents.map((dayGroup, dayIdx) => (
                <div key={dayIdx}>
                  <div className="sticky top-0 bg-slate-900 py-3 z-20">
                    <p className="text-xs font-semibold text-slate-400 uppercase">{dayGroup.date}</p>
                  </div>
                  <div className="space-y-4 relative pl-6 pb-6">
                    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-700"></div>
                    {dayGroup.events.map((event, idx) => {
                      const IconComponent = getEventIcon(event.type);
                      const colors = getEventColors(event.type);
                      return (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-slate-900 shadow-lg ${colors.text.replace('text-', 'bg-')}`}></div>
                          <div className="flex gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                              <IconComponent className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-slate-400 font-medium mb-1">{event.time}</p>
                              <p className="text-sm font-semibold text-white mb-1">{event.title}</p>
                              <p className="text-xs text-slate-300">{event.details}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROFILE DRAWER */}
      {profileOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setProfileOpen(false)}></div>
          <div className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
              <h2 className="text-lg font-bold text-white">Account</h2>
              <button onClick={() => setProfileOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold text-white">K</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">Katya Johnson</p>
                        <p className="text-xs text-slate-400">katya.johnson@email.com</p>
                      </div>
                    </div>
                    <div className="mt-2 inline-block border border-slate-400 rounded-full px-2 py-0.5">
                      <p className="text-xs font-semibold text-slate-300">Parent Account</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">My Location</h3>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                  <p className="text-sm text-white">2A Lowther Hill</p>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Login & Security</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <p className="text-sm text-white">Change password</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <p className="text-sm text-white">Change login method</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Users</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <p className="text-sm text-white">Invite users</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <p className="text-sm text-white">Manage users</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">App Preferences</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <div>
                      <p className="text-sm text-white text-left">Preferred units</p>
                      <p className="text-xs text-slate-400 mt-0.5 text-left">km, °C</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <div>
                      <p className="text-sm text-white text-left">Notifications</p>
                      <p className="text-xs text-slate-400 mt-0.5 text-left">Alerts, optimizations, V2G</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Legal & Support</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <p className="text-sm text-white">Terms of service</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                    <p className="text-sm text-white">Privacy policy</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 font-semibold px-2 mb-3">App</p>
                <p className="text-xs text-slate-400 px-3 py-2">v1.2.4 (Build 456)</p>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <p className="text-sm text-slate-300">Join Beta</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    <p className="text-sm text-slate-300">Send feedback</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="space-y-2 pt-4 border-t border-red-900/30">
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                  <p className="text-sm text-slate-300">Logout</p>
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-red-950/30 hover:bg-red-950/50 transition border border-red-900/30">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🗑️</span>
                    <p className="text-sm text-red-400">Delete account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI CHAT MODAL */}
      {aiOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/60" onClick={() => setAiOpen(false)}></div>
          <div className="fixed left-0 right-0 bottom-0 bg-slate-900 rounded-t-3xl flex flex-col max-h-2/3">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Energy Advisor</h2>
                  <p className="text-xs text-slate-400">Powered by AI</p>
                </div>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {aiMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <Sparkles className="w-12 h-12 text-cyan-400 mb-4" />
                  <p className="text-sm font-semibold text-white mb-6 text-center">What would you like to know?</p>
                  <div className="grid grid-cols-1 gap-2 w-full">
                    <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                      <p className="text-sm font-medium text-white">How can I save more money?</p>
                    </button>
                    <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                      <p className="text-sm font-medium text-white">What is V2G and how does it work?</p>
                    </button>
                    <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                      <p className="text-sm font-medium text-white">Explain my charging schedule</p>
                    </button>
                  </div>
                </div>
              ) : (
                aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={aiMessagesEndRef} />
            </div>
            <div className="border-t border-slate-700 px-4 py-3 flex gap-2">
              <input 
                type="text" 
                value={aiInput} 
                onChange={(e) => setAiInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && handleAiSend()} 
                placeholder="Ask about charging..." 
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm placeholder-slate-500" 
              />
              <button onClick={handleAiSend} className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40">
        <div className="max-w-md mx-auto flex">
          <NavButton id="dashboard" icon={Home} label="Hub" />
          <NavButton id="settings" icon={Battery} label="Assets" />
          <NavButton id="ai" icon={Sparkles} label="Ask AI" onClick={() => setAiOpen(true)} />
          <NavButton id="history" icon={BarChart3} label="Usage" />
          <NavButton id="rewards" icon={Award} label="Rewards" />
        </div>
      </div>
    </div>
  );
}