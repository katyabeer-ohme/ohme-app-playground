import React from 'react';
import { Zap, Sun, Sparkles } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import { WEEK_DAYS, PLUG_IN_STREAK, todaySchedule } from '../constants/data';

export default function DashboardView({ setScheduleOpen, setView }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;
  const currentBattery = 45;
  const targetBattery = 80;
  const batteryProgress = currentBattery;

  // Energy sources
  const gridPower = '3.1 kW';
  const solarPower = '1.6 kW';

  const currentRate = {
    price: 7.5,
    period: 'Now until 04:00 AM'
  };

  const planSummary = {
    totalCost: '£4.57',
    totalEnergy: '68 kWh'
  };

  return (
    <div className="pb-24">
      {/* SESSION STATUS */}
      <div className="px-4 mb-6 pt-6">
        <div className="bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 rounded-xl p-4 shadow-lg border border-brand-primary/20">
        {/* SECTION 1: LIVE STATUS */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-3xl">
              <span>☀️</span>
              <span className="text-slate-500 text-lg">→</span>
              <span>🚗</span>
            </div>
            <span className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full font-semibold flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-emerald-300" />
                <span className="text-xs font-semibold">{gridPower}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sun className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-400">{solarPower}</span>
              </div>
            </span>
          </div>
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Charging your Tesla with grid and solar</h2>
          </div>

          {/* Current Battery Level */}
          <div className="mb-4">
            <p className="text-xs text-text-tertiary mb-1">Currently at</p>
            <p className="text-4xl font-bold text-text-primary mb-3">{currentBattery}%</p>
            <div className="relative">
              <div className="bg-brand-dark-900/40 rounded-full h-2 overflow-hidden border border-brand-accent/30">
                <div 
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500"
                  style={{ width: `${batteryProgress}%` }}
                ></div>
              </div>
              {/* Target marker at 80% */}
              <div 
                className="absolute -top-1 bottom-0 w-0.5 h-4 bg-text-primary rounded-full"
                style={{ left: `${targetBattery}%` }}
              ></div>
            </div>
          </div>

          {/* SECTION 2: FINAL TARGET */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-text-secondary">Charging to <span className="text-text-primary font-semibold">{targetBattery}%</span> ready by <span className="text-text-primary font-semibold">Wed 8:00</span></p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="bg-brand-primary hover:bg-brand-primary-600 text-brand-dark py-1.5 px-2 rounded-lg font-medium text-xs transition">
                Max charge
              </button>
              <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
                Edit target
              </button>
              <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S PLAN */}
      <div className="px-4 mb-6">
        <div className="bg-surface-card rounded-2xl p-5 shadow-lg border border-border-light">
          <h2 className="text-lg font-bold text-text-primary mb-2">Today's Plan</h2>
          
          {/* Smart Suggestion Inside Card */}
          <div className="bg-brand-secondary/15 border border-brand-secondary/30 rounded-lg p-3 mb-4 flex gap-3">
            <Sparkles className="w-4 h-4 text-brand-secondary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">Charging dynamically is going to save you <span className="font-semibold text-brand-primary">£1.57</span>.</p>
          </div>

          <div className="space-y-0 relative pl-6 mb-4">
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
                    <p className="text-sm font-bold text-brand-primary mb-0.5">{item.power}</p>
                    <p className="text-xs text-text-tertiary">{item.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Plan Summary */}
          <div className="pt-4 mt-4 border-t border-border-light">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-text-tertiary mb-1">Estimated total cost</p>
                <p className="text-text-primary font-semibold">{planSummary.totalCost}</p>
              </div>
              <div>
                <p className="text-text-tertiary mb-1">Total energy to use</p>
                <p className="text-text-primary font-semibold">{planSummary.totalEnergy}</p>
              </div>
            </div>
          </div>

          <button onClick={() => setScheduleOpen(true)} className="w-full text-brand-secondary hover:text-brand-secondary-300 font-medium text-sm mt-4">
            View full plan →
          </button>
        </div>
      </div>

      {/* CURRENT RATE */}
      <div className="px-4 mb-6">
        <div className="bg-surface-card rounded-lg p-4 shadow-lg border border-brand-primary/30 shadow-glow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-tertiary mb-1">Current electricity rate</p>
              <p className="text-2xl font-bold text-text-primary">{currentRate.price}p <span className="text-sm font-normal text-text-tertiary">per kWh</span></p>
              <p className="text-xs text-text-tertiary mt-0.5">{currentRate.period}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Today So Far */}
      <div className="px-4 mb-6 hidden">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-card rounded-lg p-4 shadow-lg">
            <p className="text-xs text-text-tertiary mb-1">Energy Used</p>
            <p className="text-2xl font-bold text-text-primary mb-2">£0.95</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-yellow-400" />
                  <span className="text-text-tertiary">Solar</span>
                </div>
                <span className="text-text-primary font-medium">11.4 kWh</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-text-tertiary">Grid</span>
                </div>
                <span className="text-text-primary font-medium">3.2 kWh</span>
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

      {/* PLUG-IN STREAK SECTION */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 rounded-2xl p-5 shadow-lg border border-brand-secondary/30">
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

          {/* Smart Suggestion Inside Card */}
          <div className="bg-brand-primary/15 border border-brand-primary/30 rounded-lg p-3 mb-4 flex gap-3">
            <Sparkles className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">Customers who plug in every day tend to save more money. Keep your car plugged in as long as possible to maximise your savings.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
