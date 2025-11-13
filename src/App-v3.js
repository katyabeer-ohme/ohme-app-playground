import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronRight, Zap, Clock, TrendingDown, BarChart3, Sparkles, Send, X, Car, Award, Settings } from 'lucide-react';

// Constants
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PLUG_IN_STREAK = [true, true, true, false, true, false, false];
const CURRENT_BATTERY = 45;
const TARGET_BATTERY = 80;

export default function SimpleEVApp() {
  const [view, setView] = useState('dashboard');
  const [usagePeriod, setUsagePeriod] = useState('week');
  const [usageType, setUsageType] = useState('cost');
  const [profileOpen, setProfileOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const aiMessagesEndRef = useRef(null);

  const batteryProgress = (CURRENT_BATTERY / TARGET_BATTERY) * 100;
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;

  // Mock data for different periods
  const usageDataByPeriod = {
    week: [
      { day: 'Mon', peakCost: 1.35, offPeakCost: 0.36, peakKwh: 3, offPeakKwh: 3, peakCarbon: 0.9, offPeakCarbon: 0.9 },
      { day: 'Tue', peakCost: 0.90, offPeakCost: 0.48, peakKwh: 2, offPeakKwh: 4, peakCarbon: 0.6, offPeakCarbon: 1.2 },
      { day: 'Wed', peakCost: 0.45, offPeakCost: 0.60, peakKwh: 1, offPeakKwh: 5, peakCarbon: 0.3, offPeakCarbon: 1.5 },
      { day: 'Thu', peakCost: 1.80, offPeakCost: 0.24, peakKwh: 4, offPeakKwh: 2, peakCarbon: 1.2, offPeakCarbon: 0.6 },
      { day: 'Fri', peakCost: 0.90, offPeakCost: 0.36, peakKwh: 2, offPeakKwh: 3, peakCarbon: 0.6, offPeakCarbon: 0.9 },
      { day: 'Sat', peakCost: 1.35, offPeakCost: 0.12, peakKwh: 3, offPeakKwh: 1, peakCarbon: 0.9, offPeakCarbon: 0.3 },
      { day: 'Sun', peakCost: 0.45, offPeakCost: 0.48, peakKwh: 1, offPeakKwh: 4, peakCarbon: 0.3, offPeakCarbon: 1.2 },
    ],
    month: [
      { day: 'Week 1', peakCost: 6.75, offPeakCost: 2.04, peakKwh: 15, offPeakKwh: 17, peakCarbon: 4.5, offPeakCarbon: 5.1 },
      { day: 'Week 2', peakCost: 5.85, offPeakCost: 2.40, peakKwh: 13, offPeakKwh: 20, peakCarbon: 3.9, offPeakCarbon: 6.0 },
      { day: 'Week 3', peakCost: 7.20, offPeakCost: 1.92, peakKwh: 16, offPeakKwh: 16, peakCarbon: 4.8, offPeakCarbon: 4.8 },
      { day: 'Week 4', peakCost: 5.40, offPeakCost: 2.64, peakKwh: 12, offPeakKwh: 22, peakCarbon: 3.6, offPeakCarbon: 6.6 },
    ],
  };

  const chargeSessionsData = [
    { date: 'Nov 13', time: '10:30 AM - 6:45 PM', duration: '8h 15m', kwh: 28.5, cost: 4.80, offPeakPct: 65, status: 'In progress' },
    { date: 'Nov 12', time: '11:15 PM - 7:30 AM', duration: '8h 15m', kwh: 32.1, cost: 3.40, offPeakPct: 100, status: 'Completed' },
    { date: 'Nov 11', time: '2:00 PM - 9:30 PM', duration: '7h 30m', kwh: 26.8, cost: 5.20, offPeakPct: 40, status: 'Completed' },
    { date: 'Nov 10', time: '11:00 PM - 6:00 AM', duration: '7h', kwh: 29.4, cost: 3.10, offPeakPct: 100, status: 'Completed' },
    { date: 'Nov 9', time: '1:30 PM - 8:15 PM', duration: '6h 45m', kwh: 24.2, cost: 4.95, offPeakPct: 35, status: 'Completed' },
  ];

  const currentPeriodData = usageDataByPeriod[usagePeriod] || usageDataByPeriod.week;
  
  const stats = useMemo(() => {
    const totalCost = currentPeriodData.reduce((sum, d) => sum + d.peakCost + d.offPeakCost, 0);
    const totalKwh = currentPeriodData.reduce((sum, d) => sum + d.peakKwh + d.offPeakKwh, 0);
    const totalCarbon = currentPeriodData.reduce((sum, d) => sum + d.peakCarbon + d.offPeakCarbon, 0);
    const offPeakCost = currentPeriodData.reduce((sum, d) => sum + d.offPeakCost, 0);
    const peakCost = currentPeriodData.reduce((sum, d) => sum + d.peakCost, 0);
    const avgRate = totalKwh > 0 ? ((totalCost / totalKwh) * 100).toFixed(1) : 0;
    const potentialOverspend = peakCost * 1.8;
    const savings = (potentialOverspend - totalCost).toFixed(2);
    const offPeakPct = totalCost > 0 ? ((offPeakCost / totalCost) * 100).toFixed(0) : 0;
    
    return { 
      totalCost: totalCost.toFixed(2), 
      totalKwh: totalKwh.toFixed(1), 
      totalCarbon: totalCarbon.toFixed(1), 
      avgRate, 
      offPeakPct, 
      savings 
    };
  }, [currentPeriodData]);

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

  const todaySchedule = [
    { timeSlot: 'Right now', action: 'Charging', rate: 'Peak', cost: '£0.00', reason: 'Waiting for off-peak', power: 0 },
    { timeSlot: '11:00 PM - 6:00 AM', action: 'Charging at off-peak rate', rate: 'Off-peak', cost: '£1.20', reason: 'Cheapest window', power: 11.2 },
    { timeSlot: '6:00 - 7:30 AM', action: 'Final top-up', rate: 'Off-peak', cost: '£0.30', reason: 'Ready for morning', power: 2.4 },
  ];

  const activityEvents = [
    {
      date: 'Today',
      events: [
        { time: '3:45 PM', type: 'plug-in', title: 'Car plugged in', details: 'Tesla Model 3 • Battery: 45%' },
        { time: '4:00 PM', type: 'tariff', title: 'Peak rate detected', details: 'Grid rate: 45p/kWh • Charging paused' },
        { time: '11:00 PM', type: 'rate-drop', title: 'Off-peak rate active', details: 'Grid rate: 12p/kWh • Charging started' },
      ]
    }
  ];

  useEffect(() => {
    aiMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const getEventIcon = (type) => {
    if (type === 'plug-in') return Zap;
    if (type === 'tariff' || type === 'rate-drop') return TrendingDown;
    return Clock;
  };

  const getEventColors = (type) => {
    if (type === 'plug-in') return { bg: 'bg-cyan-500/20', text: 'text-cyan-400' };
    if (type === 'tariff') return { bg: 'bg-orange-500/20', text: 'text-orange-400' };
    if (type === 'rate-drop') return { bg: 'bg-emerald-500/20', text: 'text-emerald-400' };
    return { bg: 'bg-slate-700', text: 'text-slate-400' };
  };

  const AI_RESPONSES = useMemo(() => [
    'Off-peak rates start at 11 PM. You\'ll save £0.45 by waiting.',
    'Your cheapest window tomorrow is 12 AM - 6 AM. Consider charging then.',
    'If you enable V2G, you could earn £2-3 during tonight\'s peak window.',
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
            {/* Grid - Charger - Car Triangle */}
            <div className="px-4 mb-6 pt-4">
              <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">
                <div className="relative w-full h-56 flex items-center justify-center">
                  {/* SVG Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {/* Grid to Charger */}
                    <line x1="15%" y1="80%" x2="50%" y2="20%" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
                    {/* Charger to Car */}
                    <line x1="50%" y1="20%" x2="85%" y2="80%" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
                    {/* Car to Grid */}
                    <line x1="85%" y1="80%" x2="15%" y2="80%" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
                  </svg>
                  
                  {/* Grid (Bottom Left) */}
                  <div className="absolute bottom-0 left-8 text-center">
                    <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-slate-600">
                      <Zap className="w-7 h-7 text-slate-300" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Grid</p>
                    <p className="text-sm font-bold text-slate-300">45p/kWh</p>
                  </div>
                  
                  {/* Charger (Top Center) */}
                  <div className="absolute top-0 text-center">
                    <div className="w-14 h-14 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-cyan-500">
                      <Zap className="w-7 h-7 text-cyan-400" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Charger</p>
                    <p className="text-sm font-bold text-cyan-400">Paused</p>
                  </div>
                  
                  {/* Car (Bottom Right) */}
                  <div className="absolute bottom-0 right-8 text-center">
                    <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-emerald-500">
                      <Car className="w-7 h-7 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Car</p>
                    <p className="text-sm font-bold text-emerald-400">45%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mb-6 pt-0">
              {/* SESSION STATUS */}
              <div className="bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 rounded-xl p-4 shadow-lg border border-emerald-500/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-emerald-400" />
                    <p className="text-xs font-medium text-slate-300">Tesla Model 3</p>
                    <span className="text-xs bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded-full font-semibold">Plugged in</span>
                  </div>
                  <span className="text-xl">🔌</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Current</p>
                    <p className="text-2xl font-bold text-white">{CURRENT_BATTERY}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Target</p>
                    <p className="text-2xl font-bold text-emerald-400">{TARGET_BATTERY}%</p>
                  </div>
                </div>

                <div className="mb-3 bg-slate-900/40 rounded-full h-2 overflow-hidden border border-slate-700/50">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${batteryProgress}%` }}
                  ></div>
                </div>

                <p className="text-xs text-slate-400 mb-3">Ready by <span className="text-white font-medium">Wed 8:00 AM</span></p>

                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
                    Boost charge
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
                    Stop session
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
                    Change target
                  </button>
                </div>
              </div>
            </div>

            {/* TODAY'S SCHEDULE */}
            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-700">
                <h2 className="text-lg font-bold text-white mb-2">Today's Plan</h2>
                
                {/* Smart Suggestion Inside Card */}
                <div className="bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 mb-4 flex gap-3">
                  <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-200 leading-relaxed">Wait until 11 PM for off-peak rates (12p/kWh). You'll save <span className="font-semibold text-emerald-400">£0.75</span>.</p>
                </div>

                <div className="space-y-0 relative pl-6 mb-4">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-600"></div>
                  {todaySchedule.map((item, idx) => (
                    <div key={idx} className="relative pb-6 last:pb-0">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-900"></div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 mb-1 font-medium">{item.timeSlot}</p>
                          <p className="text-sm font-semibold text-white mb-1">{item.action}</p>
                          <p className="text-xs text-slate-400">{item.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-cyan-400 mb-0.5">{item.cost}</p>
                          <p className="text-xs text-slate-500">{item.rate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* V2G Opportunity - Embedded at Bottom */}
                <div className="border-t border-slate-600 pt-4 mt-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-semibold text-purple-400 mb-0.5">V2G Opportunity</p>
                      <p className="text-sm font-bold text-white">Earn £2.50 Tonight</p>
                    </div>
                    <span className="text-lg">💰</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">National Grid Peak Response • 5:00 PM - 9:00 PM</p>
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium text-xs transition">
                    Add to plan
                  </button>
                </div>
              </div>
            </div>

            {/* Current Grid Rate */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-5 shadow-lg border border-orange-500/20">
                <p className="text-xs text-slate-400 mb-1">Current Grid Rate</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-orange-400">45p</span>
                  <span className="text-sm text-slate-400">/kWh</span>
                </div>
                <p className="text-xs text-orange-300">Peak rate active until 11:00 PM</p>
              </div>
            </div>

            {/* PLUG-IN STREAK SECTION */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-5 shadow-lg border border-purple-500/30">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-white">This Week's Streak</h2>
                    <span className="text-xl">🔥</span>
                  </div>
                  <p className="text-xs text-slate-300">{streakCount} out of 7 days plugged in</p>
                </div>

                {/* Week Days Grid */}
                <div className="flex gap-2 mb-4">
                {WEEK_DAYS.map((day, idx) => (
                  <WeekDayBox key={idx} day={day} active={PLUG_IN_STREAK[idx]} />
                ))}
                </div>

                {/* Earnings from flex */}
                <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3">
                  <p className="text-xs text-emerald-300 mb-1">Earning from flexibility</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-emerald-400">£7.50</span>
                    <span className="text-xs text-emerald-300">this week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SAVINGS TODAY */}
            <div className="px-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Est. Cost (by 80%)</p>
                  <p className="text-2xl font-bold text-white mb-2">£1.50</p>
                  <p className="text-xs text-slate-500">vs £2.25 at peak rates</p>
                </div>

                <div className="bg-emerald-900/30 rounded-lg p-4 shadow-lg border border-emerald-500/20">
                  <p className="text-xs text-emerald-300 mb-1">Savings</p>
                  <p className="text-2xl font-bold text-emerald-400 mb-2">£0.75</p>
                  <p className="text-xs text-emerald-300">by waiting for off-peak</p>
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
              <p className="text-sm text-slate-400">Money earned by exporting to grid</p>
            </div>

            {/* Earnings Summary */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 shadow-lg border border-purple-500/30">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Total Earned</p>
                    <p className="text-3xl font-bold text-white">£42.30</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">This Month</p>
                    <p className="text-3xl font-bold text-emerald-400">+£12.50</p>
                  </div>
                </div>
                <div className="bg-slate-900/30 rounded-lg p-3">
                  <p className="text-xs text-slate-300 mb-2">💡 Tips to earn more</p>
                  <p className="text-xs text-slate-400">Enable V2G during peak hours (5-9pm) for best earnings. More frequent participation increases rewards.</p>
                </div>
              </div>
            </div>

            {/* V2G Programs */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Active Programs</h3>
              <div className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">National Grid - Peak Response</p>
                    <p className="text-xs text-slate-400 mt-1">DSR Program</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full font-semibold">Active</span>
                </div>
                <p className="text-xs text-slate-300">£42.30 earned • 28.5 kWh exported this month</p>
              </div>
            </div>

            {/* Transaction History */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Recent Earnings</h3>
              <div className="space-y-2">
                {[
                  { date: 'Nov 10', amount: 2.50, desc: 'Peak Response - Evening window', status: 'pending' },
                  { date: 'Nov 9', amount: 1.80, desc: 'Peak Response - Evening window', status: 'paid' },
                  { date: 'Nov 8', amount: 3.20, desc: 'Peak Response - Evening window', status: 'paid' },
                ].map((transaction, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between border border-slate-700">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/20">
                        <span className="text-lg">⚡</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{transaction.desc}</p>
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
                ))}
              </div>
            </div>

            {/* Battery Health */}
            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <h3 className="text-sm font-semibold text-white mb-3">Battery Health</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Annual degradation estimate</span>
                    <span className="text-white font-medium">~2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Expected lifespan</span>
                    <span className="text-white font-medium">8-10 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage/History View */}
        {view === 'history' && (
          <div className="pb-24">
            <div className="px-4 pt-6 pb-4">
              <h2 className="text-xl font-bold text-white mb-2">Usage</h2>
              <select value={usagePeriod} onChange={(e) => setUsagePeriod(e.target.value)} className="w-full px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer mt-3 border border-slate-700">
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Top Stats */}
            <div className="px-4 mb-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-white">£{stats.totalCost}</p>
                  <p className="text-xs text-slate-500 mt-2">{stats.offPeakPct}% off-peak</p>
                </div>
                <div className="bg-emerald-900/30 rounded-lg p-4 border border-emerald-500/20">
                  <p className="text-xs text-emerald-300 mb-1">Estimated Savings</p>
                  <p className="text-2xl font-bold text-emerald-400">£{stats.savings}</p>
                  <p className="text-xs text-emerald-300 mt-2">vs peak rates</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Energy Used</p>
                  <p className="text-lg font-bold text-white">{stats.totalKwh}</p>
                  <p className="text-xs text-slate-500">kWh</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Avg Rate</p>
                  <p className="text-lg font-bold text-cyan-400">{stats.avgRate}p</p>
                  <p className="text-xs text-slate-500">per kWh</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">CO₂ Saved</p>
                  <p className="text-lg font-bold text-green-400">{stats.totalCarbon}</p>
                  <p className="text-xs text-slate-500">kg</p>
                </div>
              </div>
            </div>

            {/* Type Toggle */}
            <div className="px-4 mb-6">
              <div className="flex gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
                <button 
                  onClick={() => setUsageType('cost')} 
                  className={`flex-1 py-2 rounded-lg font-medium text-xs transition ${usageType === 'cost' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  £
                </button>
                <button 
                  onClick={() => setUsageType('kwh')} 
                  className={`flex-1 py-2 rounded-lg font-medium text-xs transition ${usageType === 'kwh' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  kWh
                </button>
                <button 
                  onClick={() => setUsageType('carbon')} 
                  className={`flex-1 py-2 rounded-lg font-medium text-xs transition ${usageType === 'carbon' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  CO₂
                </button>
              </div>
            </div>

            {/* Chart - Peak vs Off-Peak */}
            <div className="px-4 mb-6">
              <div className="bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-700">
                <p className="text-sm font-semibold text-white mb-4">Peak vs Off-Peak Charging</p>
                <div className="space-y-3">
                  {currentPeriodData.map((data, idx) => {
                    let peakValue = usageType === 'cost' ? data.peakCost : usageType === 'kwh' ? data.peakKwh : data.peakCarbon;
                    let offPeakValue = usageType === 'cost' ? data.offPeakCost : usageType === 'kwh' ? data.offPeakKwh : data.offPeakCarbon;
                    const maxValue = Math.max(...currentPeriodData.map(d => (usageType === 'cost' ? d.peakCost + d.offPeakCost : usageType === 'kwh' ? d.peakKwh + d.offPeakKwh : d.peakCarbon + d.offPeakCarbon)));
                    const peakWidth = (peakValue / maxValue) * 100;
                    const offPeakWidth = (offPeakValue / maxValue) * 100;
                    
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-slate-400 font-medium">{data.day}</p>
                          <p className="text-xs text-slate-300 font-semibold">
                            {usageType === 'cost' ? `£${(peakValue + offPeakValue).toFixed(2)}` : usageType === 'kwh' ? `${(peakValue + offPeakValue).toFixed(1)} kWh` : `${(peakValue + offPeakValue).toFixed(1)} kg CO₂`}
                          </p>
                        </div>
                        <div className="flex gap-1 h-6 rounded-lg overflow-hidden bg-slate-900">
                          <div 
                            className="bg-orange-500 rounded-l" 
                            style={{ width: `${peakWidth}%` }}
                            title={`Peak: ${usageType === 'cost' ? '£' + peakValue.toFixed(2) : peakValue.toFixed(1)}`}
                          ></div>
                          <div 
                            className="bg-emerald-500 rounded-r" 
                            style={{ width: `${offPeakWidth}%` }}
                            title={`Off-peak: ${usageType === 'cost' ? '£' + offPeakValue.toFixed(2) : offPeakValue.toFixed(1)}`}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-300">Peak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-300">Off-peak</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="px-4 mb-6">
              <div className="bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-white mb-2">💡 Smart Insight</p>
                <p className="text-xs text-slate-300 leading-relaxed">You're doing great! {stats.offPeakPct}% of your charging was during off-peak hours. If you charged everything at peak rates, it would cost £{(parseFloat(stats.totalCost) + parseFloat(stats.savings)).toFixed(2)} instead of £{stats.totalCost}.</p>
              </div>
            </div>

            {/* Recent Charging Sessions */}
            <div className="px-4 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Recent Charging Sessions</h3>
              <div className="space-y-2">
                {chargeSessionsData.map((session, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-white">{session.date}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{session.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">£{session.cost.toFixed(2)}</p>
                        <p className={`text-xs font-medium ${session.status === 'In progress' ? 'text-cyan-400' : 'text-emerald-400'}`}>
                          {session.status === 'In progress' ? '⚡ ' : '✓ '}{session.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex gap-3">
                        <span>{session.duration}</span>
                        <span>{session.kwh} kWh</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full font-medium ${session.offPeakPct >= 70 ? 'bg-emerald-500/20 text-emerald-400' : session.offPeakPct >= 40 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-orange-500/20 text-orange-400'}`}>
                        {session.offPeakPct}% off-peak
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings View */}
        {view === 'settings' && (
          <div className="pb-24">
            <div className="px-4 pt-6 pb-6">
              <h2 className="text-xl font-bold text-white">My Hub</h2>
            </div>

            {/* Car Status */}
            <div className="px-4 mb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">My Vehicle</h3>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Tesla Model 3</p>
                    <p className="text-xs text-slate-400 mt-1">Connected</p>
                  </div>
                  <Car className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-slate-400 mb-1">Battery</p>
                    <p className="font-bold text-white">82 kWh</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Range (est)</p>
                    <p className="font-bold text-white">310 miles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tariff Settings */}
            <div className="px-4 mb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Tariff</h3>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 mb-3">
                <div className="mb-3">
                  <p className="text-sm font-semibold text-white mb-1">Octopus Energy - Agile</p>
                  <p className="text-xs text-slate-400">Half-hourly pricing</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded mb-3">
                  <p className="text-xs text-slate-300 mb-1">Current rate</p>
                  <p className="text-lg font-bold text-cyan-400">45p/kWh</p>
                </div>
                <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                  Change tariff →
                </button>
              </div>
            </div>

            {/* V2G Settings */}
            <div className="px-4 mb-6">
              <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">V2G Program</h3>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white">National Grid - Peak Response</p>
                    <p className="text-xs text-slate-400 mt-1">DSR Provider</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full font-semibold">Active</span>
                </div>
                <p className="text-xs text-slate-300 mb-3">Battery impact: ~2% annual degradation</p>
                <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                  View programs →
                </button>
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
                      <p className="text-sm font-bold text-cyan-400">{item.cost}</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{item.reason}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full font-semibold ${item.rate === 'Off-peak' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {item.rate}
                        </span>
                      </div>
                      <span className="text-slate-400">{item.power > 0 ? `+${item.power} kWh` : `${item.power} kWh`}</span>
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
              {/* User Profile */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-white">K</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Katya Beer</p>
                    <p className="text-xs text-slate-400">katya.beer@email.com</p>
                  </div>
                </div>
              </div>

              {/* My Location */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">My Location</h3>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                  <p className="text-sm text-white">2A Lowther Hill</p>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Login & Security */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Login & Security</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <p className="text-sm text-white">Change password</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <p className="text-sm text-white">Change login method</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Users */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Users</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <p className="text-sm text-white">Invite users</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <p className="text-sm text-white">Manage users</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* App Preferences */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">App Preferences</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <div>
                      <p className="text-sm text-white">Preferred units</p>
                      <p className="text-xs text-slate-400 mt-0.5">km, °C</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <div>
                      <p className="text-sm text-white">Notifications</p>
                      <p className="text-xs text-slate-400 mt-0.5">Alerts, optimizations, V2G</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  </button>
                </div>
              </div>

              {/* Legal & Support */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Legal & Support</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <p className="text-sm text-white">Terms of service</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                    <p className="text-sm text-white">Privacy policy</p>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* App */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500 font-semibold px-3">App</p>
                <p className="text-xs text-slate-400 px-3 py-2">v1.2.4 (Build 456)</p>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <p className="text-sm text-slate-300">Join Beta</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    <p className="text-sm text-slate-300">Send feedback</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Logout and Delete */}
              <div className="space-y-2 pt-4 border-t border-red-900/30">
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-left">
                  <p className="text-sm text-slate-300">Logout</p>
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-red-950/30 hover:bg-red-950/50 transition border border-red-900/30 text-left">
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
                  <h2 className="text-sm font-bold text-white">Charging Advisor</h2>
                  <p className="text-xs text-slate-400">AI Assistant</p>
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
                  <p className="text-sm font-semibold text-white mb-6 text-center">How can I help with your charging?</p>
                  <div className="grid grid-cols-1 gap-2 w-full">
                    <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                      <p className="text-sm font-medium text-white">When's the best time to charge?</p>
                    </button>
                    <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                      <p className="text-sm font-medium text-white">How do I earn with V2G?</p>
                    </button>
                    <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                      <p className="text-sm font-medium text-white">What are off-peak rates?</p>
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
                placeholder="Ask me anything..." 
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm placeholder-slate-500 border border-slate-700" 
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
          <NavButton id="dashboard" icon={Zap} label="Home" />
          <NavButton id="history" icon={BarChart3} label="Usage" />
          <NavButton id="rewards" icon={Award} label="Rewards" />
          <NavButton id="ai" icon={Sparkles} label="Ask AI" onClick={() => setAiOpen(true)} />
          <NavButton id="settings" icon={Settings} label="Settings" />
        </div>
      </div>
    </div>
  );
}