import React, { useState } from 'react';
import { Zap, Home, Car, Sparkles, TrendingDown, Leaf } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import CarDetailOverlay from '../components/CarDetailOverlay';
import UsageSavingsDrawer from '../components/UsageSavingsDrawer';
import ImpactDrawer from '../components/ImpactDrawer';
import EnergyTodayDrawer from '../components/EnergyTodayDrawer';
import ErrorCard from '../components/ErrorCard';
import { WEEK_DAYS, PLUG_IN_STREAK, todaySchedule } from '../constants/data';

export default function DashboardView({ setScheduleOpen, setView, errorCardState, showErrorCard, onOpenAITroubleshoot, onDismissError }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;
  const [carDetailOpen, setCarDetailOpen] = useState(false);
  const [targetBattery, setTargetBattery] = useState(80);
  const [minBattery, setMinBattery] = useState(50);
  const [readyByDate, setReadyByDate] = useState('');
  const [readyByTime, setReadyByTime] = useState('08:00');
  const [readyByDay, setReadyByDay] = useState('Wed');
  const [usageSavingsDrawerOpen, setUsageSavingsDrawerOpen] = useState(false);
  const [impactDrawerOpen, setImpactDrawerOpen] = useState(false);
  const [energyTodayDrawerOpen, setEnergyTodayDrawerOpen] = useState(false);

  const handleSaveTarget = (values) => {
    setTargetBattery(values.target);
    setMinBattery(values.minBatteryLevel);
    setReadyByDate(values.readyByDate);
    setReadyByTime(values.readyByTime);
    // Update day display based on date if needed
    if (values.readyByDate) {
      const date = new Date(values.readyByDate);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      setReadyByDay(days[date.getDay()]);
    }
  };

  return (
    <div className="pb-24">
      {/* ERROR CARD */}
      {showErrorCard && (
        <div className="pt-3">
          <ErrorCard 
            state={errorCardState}
            isVisible={showErrorCard}
            onOpenAITroubleshoot={onOpenAITroubleshoot}
            onDismiss={onDismissError}
          />
        </div>
      )}

      {/* Today So Far */}
      <div className="mb-6">
        <div className="bg-slate-800 p-5 shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Total Cost - Left */}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold text-slate-400 mb-2">Today's usage</p>
                <p className="text-3xl font-bold text-white mb-1">£4.56</p>
                <p className="text-xs text-slate-400">38.2 kWh</p>
              </div>

              {/* Usage Breakdown - Right */}
              <div className="flex flex-col justify-center space-y-3">
                {/* Home Usage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-white">Home</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">£1.82 <span className="text-xs font-normal text-slate-400">/ 15.2 kWh</span></p>
                  </div>
                </div>
                
                <div className="h-px bg-slate-700"></div>
                
                {/* Car Usage */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-white">Car</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">£2.74 <span className="text-xs font-normal text-slate-400">/ 23.0 kWh</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insight */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-purple-300 mb-1">AI Insight</p>
                  <p className="text-xs text-slate-300 leading-relaxed">Based on your usage history, you can get paid to charge your car and save up to £3.20 per charge with a dynamic tariff.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SESSION STATUS */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/25 to-blue-500/25 rounded-md p-4 shadow-lg shadow-purple-500/20 border-2 border-purple-500/40">
        {/* SECTION 1: LIVE STATUS */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-3xl">
              <span>🚗</span>
              <span className="text-slate-500 text-lg">→</span>
              <span>🏠</span>
            </div>
            <span className="text-xs bg-purple-500/40 text-purple-300 px-3 py-1.5 rounded-full font-semibold flex items-center gap-2 border border-purple-400/30 shadow-lg shadow-purple-500/30">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-300" />
                <span className="text-xs font-semibold">Discharging at 2.1 kW</span>
              </div>
            </span>
          </div>
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">Powering your home with Tesla</h2>
          </div>

          {/* Current Battery Level */}
          <div className="mb-4">
            <p className="text-xs text-text-tertiary mb-1">Currently at</p>
            <div className="flex items-baseline gap-3 mb-3">
              <p className="text-4xl font-bold text-purple-300">54%</p>
              <p className="text-xs text-text-tertiary">Don't go below  {minBattery}%</p>
            </div>
            <div className="relative">
              <div className="bg-slate-900/60 rounded-full h-4 overflow-hidden border border-purple-500/40">
                <div 
                  className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: '54%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-rtl"></div>
                </div>
              </div>
              {/* Minimum battery marker */}
              <div 
                className="absolute -top-1 bottom-0 w-0.5 h-6 bg-orange-400 rounded-full shadow-lg shadow-orange-500/50"
                style={{ left: `${minBattery}%` }}
              ></div>
              {/* Target marker */}
              <div 
                className="absolute -top-1 bottom-0 w-0.5 h-6 bg-text-primary rounded-full shadow-lg shadow-white/50"
                style={{ left: `${targetBattery}%` }}
              ></div>
            </div>
          </div>

          {/* SECTION 2: FINAL TARGET */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-text-secondary">Car will be at <span className="text-text-primary font-semibold">{targetBattery}%</span> by <span className="text-text-primary font-semibold">{readyByDay} {readyByTime}</span></p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
                Max charge
              </button>
              <button 
                onClick={() => setCarDetailOpen(true)}
                className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20"
              >
                Edit session
              </button>
              <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's plan */}
      <div className="px-4 mb-6">
        <div className="bg-slate-800 rounded-md p-5 shadow-lg">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-text-primary mb-3">Today's schedule</h2>
            <div className="bg-brand-secondary/15 border border-brand-secondary/30 rounded-lg p-3 mb-4 flex gap-3">
              <Sparkles className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-text-secondary leading-relaxed">It's sunny today—I've optimised your schedule to max out solar charging from 10 AM–3 PM. Grid rates peak 5–9 PM, perfect for V2G earnings if you want to enable it.</p>
            </div>
          </div>
          <div className="space-y-0 relative pl-6 mb-6">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-brand-accent"></div>
            {todaySchedule.slice(0, 3).map((item, idx) => (
              <div key={idx} className="relative pb-6 last:pb-0">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-brand-primary border-2 border-brand-dark"></div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-text-tertiary mb-1 font-medium">{item.timeSlot}</p>
                    <p className="text-sm font-semibold text-text-primary mb-1">{item.action}</p>
                    <p className="text-xs text-text-tertiary">{item.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-primary mb-0.5">{item.target}</p>
                    <p className={`text-xs ${item.cost.includes('Save') ? 'text-emerald-400' : 'text-text-tertiary'}`}>{item.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* V2G Card */}
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-0.5">5:00 PM - 9:00 PM</p>
                <p className="text-sm font-bold text-text-primary">💰 Send electricity to the grid</p>
              </div>
              <span className="text-sm font-bold text-emerald-400 mb-0.5">+£2.50</span>
            </div>
            <p className="text-xs text-text-tertiary mb-3">Export to grid during peak hours when demand is high.</p>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium text-xs transition">Add to schedule</button>
          </div>

          {/* Plan Summary */}
          <div className="pt-0 mt-0">
            <button onClick={() => setScheduleOpen(true)} className="w-full bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-2.5 px-4 rounded-lg font-medium text-sm mb-4 transition">
              View full schedule →
            </button>
            <div className="border-t border-border-light pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                  <p className="text-xs text-text-tertiary mb-2 font-medium">Estimated total cost</p>
                  <p className="text-xl font-bold text-text-primary">£4.57</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                  <p className="text-xs text-text-tertiary mb-2 font-medium">Total energy to use</p>
                  <p className="text-xl font-bold text-text-primary">68 kWh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SESSION SAVINGS & CURRENT RATE */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {/* Session Savings Card */}
          <button 
            onClick={() => setUsageSavingsDrawerOpen(true)}
            className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-md p-4 shadow-lg hover:from-emerald-500/25 hover:to-cyan-500/25 transition text-left"
          >
            <div className="flex flex-col gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-emerald-300 mb-1 font-semibold">Session savings</p>
                <p className="text-xl font-bold text-white">£1.57</p>
                <p className="text-xs text-emerald-400 mt-0.5">Tap to view →</p>
              </div>
            </div>
          </button>

          {/* Current Rate Card */}
          <button 
            onClick={() => setEnergyTodayDrawerOpen(true)}
            className="bg-slate-800 rounded-md p-4 shadow-lg hover:bg-slate-700 transition text-left"
          >
            <div className="flex flex-col gap-2">
              <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Current rate</p>
                <p className="text-xl font-bold text-text-primary">7.5p</p>
                <p className="text-xs text-text-tertiary mt-0.5">Until 04:00 AM</p>
                <p className="text-xs text-brand-primary mt-1.5 font-medium">View rates →</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* YOUR IMPACT CARD */}
      <div className="px-4 mb-6">
        <button 
          onClick={() => setImpactDrawerOpen(true)}
          className="w-full bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-md p-5 shadow-lg hover:from-emerald-500/25 hover:to-green-500/25 transition text-left"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Impact</h3>
                <p className="text-xs text-emerald-300 font-semibold">Eco Champion</p>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-baseline gap-1 bg-emerald-500/30 border border-emerald-400/50 rounded-lg px-3 py-1.5">
                <span className="text-3xl font-bold text-white">3</span>
                <span className="text-lg text-slate-300">/5</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="pl-3 border-l-2 border-emerald-500 py-2">
              <p className="text-slate-400 mb-0.5">Trees saved</p>
              <p className="text-white font-semibold">2.3 trees</p>
            </div>
            <div className="pl-3 border-l-2 border-emerald-500 py-2">
              <p className="text-slate-400 mb-0.5">CO₂ offset</p>
              <p className="text-white font-semibold">45.2 kg</p>
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-3 text-center">Tap to see full impact report →</p>
        </button>
      </div>

      {/* PLUG-IN STREAK SECTION */}
      <div className="px-4 mb-6">
        <div className="bg-slate-800 rounded-md p-5 shadow-lg">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-text-primary">This Week's Streak</h2>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-sm text-text-secondary">{streakCount} out of 7 days plugged in</p>
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
              <p className="text-xs text-text-tertiary mb-1">Flex Rewards Earned</p>
              <p className="text-2xl font-bold text-brand-primary">£11.40</p>
            </div>
            <button onClick={() => setView('rewards')} className="bg-brand-primary hover:bg-brand-primary-600 text-brand-dark px-4 py-2 rounded-lg font-medium text-sm transition">
              View Rewards →
            </button>
          </div>
        </div>
      </div>

      {/* CAR DETAIL OVERLAY */}
      <CarDetailOverlay 
        isOpen={carDetailOpen} 
        onClose={() => setCarDetailOpen(false)}
        currentTarget={targetBattery}
        currentMinBattery={minBattery}
        currentDate={readyByDate}
        currentTime={readyByTime}
        onSave={handleSaveTarget}
      />

      {/* USAGE SAVINGS DRAWER */}
      <UsageSavingsDrawer 
        isOpen={usageSavingsDrawerOpen}
        onClose={() => setUsageSavingsDrawerOpen(false)}
        setView={setView}
      />

      {/* IMPACT DRAWER */}
      <ImpactDrawer 
        isOpen={impactDrawerOpen}
        onClose={() => setImpactDrawerOpen(false)}
      />

      {/* ENERGY TODAY DRAWER */}
      <EnergyTodayDrawer 
        isOpen={energyTodayDrawerOpen}
        onClose={() => setEnergyTodayDrawerOpen(false)}
      />

    </div>
  );
}
