import React, { useState } from 'react';
import { Zap, Home, Car, Sparkles } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import CarDetailOverlay from '../components/CarDetailOverlay';
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
      <div className="pt-3">
        <ErrorCard 
          state={errorCardState}
          isVisible={showErrorCard}
          onOpenAITroubleshoot={onOpenAITroubleshoot}
          onDismiss={onDismissError}
        />
      </div>

      {/* Today So Far */}
      <div className={`px-4 mb-6 ${showErrorCard ? 'pt-0' : 'pt-6'}`}>
        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-md p-4 shadow-lg border border-purple-500/20">
          <div className="grid grid-cols-2 gap-4 mb-3">
            {/* Total Cost - Left */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold text-text-tertiary mb-2">Today's usage</p>
              <p className="text-3xl font-bold text-text-primary mb-1">£4.56</p>
              <p className="text-xs text-text-tertiary">38.2 kWh</p>
            </div>

            {/* Usage Breakdown - Right */}
            <div className="flex flex-col justify-center space-y-3">
              {/* Home Usage */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-text-primary">Home</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary">£1.82 <span className="text-xs font-normal text-text-tertiary">/ 15.2 kWh</span></p>
                </div>
              </div>
              
              <div className="h-px bg-border"></div>
              
              {/* Car Usage */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-text-primary">Car</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-text-primary">£2.74 <span className="text-xs font-normal text-text-tertiary">/ 23.0 kWh</span></p>
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
                <p className="text-xs text-text-secondary leading-relaxed">Based on your usage history, you can get paid to charge your car and save up to £3.20 per charge with a dynamic tariff.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SESSION STATUS */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 rounded-md p-4 shadow-lg border border-brand-primary/20">
        {/* SECTION 1: LIVE STATUS */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-3xl">
              <span>🚗</span>
              <span className="text-slate-500 text-lg">→</span>
              <span>🏠</span>
            </div>
            <span className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full font-semibold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-emerald-300" />
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
              <p className="text-4xl font-bold text-text-primary">54%</p>
              <p className="text-xs text-text-tertiary">Don't go below  {minBattery}%</p>
            </div>
            <div className="relative">
              <div className="bg-brand-dark-900/40 rounded-full h-4 overflow-hidden border border-brand-accent/30">
                <div 
                  className="h-full rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: '54%' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-rtl"></div>
                </div>
              </div>
              {/* Minimum battery marker */}
              <div 
                className="absolute -top-1 bottom-0 w-0.5 h-6 bg-orange-400 rounded-full"
                style={{ left: `${minBattery}%` }}
              ></div>
              {/* Target marker */}
              <div 
                className="absolute -top-1 bottom-0 w-0.5 h-6 bg-text-primary rounded-full"
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
                Edit target
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
        <div className="bg-surface-card rounded-md p-5 shadow-lg">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-text-primary mb-3">Today's plan</h2>
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
          <div className="pt-4 mt-4 border-t border-border-light">
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <p className="text-text-tertiary mb-1">Estimated total cost</p>
                <p className="text-text-primary font-semibold">£4.57</p>
              </div>
              <div>
                <p className="text-text-tertiary mb-1">Total energy to use</p>
                <p className="text-text-primary font-semibold">68 kWh</p>
              </div>
            </div>
            <div className="border-t border-border-light"></div>
          </div>

          <button onClick={() => setScheduleOpen(true)} className="w-full text-brand-secondary hover:text-brand-secondary-300 font-medium text-sm mt-4">
            View full schedule →
          </button>
        </div>
      </div>

      {/* PLUG-IN STREAK SECTION */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 rounded-md p-5 shadow-lg">
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

    </div>
  );
}
