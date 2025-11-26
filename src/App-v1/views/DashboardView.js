import React, { useState } from 'react';
import { Zap, Sun, Sparkles } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import EditTargetDrawer from '../components/EditTargetDrawer';
import ErrorCard from '../components/ErrorCard';
import { WEEK_DAYS, PLUG_IN_STREAK, todaySchedule } from '../constants/data';

export default function DashboardView({ setScheduleOpen, setView, errorCardState, showErrorCard, onResolveError, onDismissError, isMaxCharging, maxChargeTarget, maxChargeTimeRemaining, onOpenMaxCharge, onStopMaxCharge }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;
  const currentBattery = 45;
  const [targetBattery, setTargetBattery] = useState(80);
  const [readyByDate, setReadyByDate] = useState('');
  const [readyByTime, setReadyByTime] = useState('08:00');
  const [readyByDay, setReadyByDay] = useState('Wed');
  const [editTargetOpen, setEditTargetOpen] = useState(false);
  const batteryProgress = currentBattery;
  const gridPower = '3.1 kW';
  const solarPower = '1.6 kW';

  const handleSaveTarget = (values) => {
    setTargetBattery(values.target);
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
          onResolve={onResolveError}
          onDismiss={onDismissError}
        />
      </div>

      {/* SESSION STATUS */}
      <div className={`px-4 mb-6 ${showErrorCard ? 'pt-0' : 'pt-3'}`}>
        <div className={`rounded-md p-4 shadow-lg transition-all duration-500 ${isMaxCharging ? 'bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/20 animate-in fade-in zoom-in-95' : 'bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 border border-brand-primary/20 animate-in fade-in zoom-in-95'}`}>
        {/* SECTION 1: LIVE STATUS */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-3xl">
              {isMaxCharging ? (
                <div key="max-charging" className="animate-in fade-in zoom-in-50 duration-500 flex items-center gap-2">
                  <span>⚡</span>
                  <span className="text-slate-500 text-lg">→</span>
                  <span>🚗</span>
                </div>
              ) : (
                <div key="smart-charging" className="animate-in fade-in zoom-in-50 duration-500 flex items-center gap-2">
                  <span>☀️</span>
                  <span className="text-slate-500 text-lg">→</span>
                  <span>🚗</span>
                </div>
              )}
            </div>
            {!isMaxCharging && (
              <span key="power-stats" className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-1 rounded-full font-semibold flex items-center gap-2 animate-in fade-in zoom-in-95 duration-500">
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
            )}
          </div>
          <div className="flex items-start justify-between mb-4">
            {isMaxCharging ? (
              <h2 key="max-charge-title" className="text-lg font-bold text-white animate-in fade-in zoom-in-95 duration-500">
                Max charging your Tesla
              </h2>
            ) : (
              <h2 key="smart-charge-title" className="text-lg font-bold text-white animate-in fade-in zoom-in-95 duration-500">
                Charging your Tesla with grid and solar
              </h2>
            )}
          </div>

          {/* Current Battery Level */}
          <div className="mb-4">
            <p className="text-xs text-text-tertiary mb-1">Currently at</p>
            <p className="text-4xl font-bold text-text-primary mb-3">{currentBattery}%</p>
            <div className="relative">
              <div className="bg-brand-dark-900/40 rounded-full h-4 overflow-hidden border border-brand-accent/30">
                <div 
                  className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
                  style={{ width: `${batteryProgress}%` }}
                >
                  {isMaxCharging ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-red-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-ltr"></div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-ltr"></div>
                    </>
                  )}
                </div>
              </div>
              {/* Target marker at 80% */}
              <div 
                className="absolute -top-1 bottom-0 w-0.5 h-6 bg-text-primary rounded-full transition-all duration-700"
                style={{ left: `${isMaxCharging ? maxChargeTarget : targetBattery}%` }}
              ></div>
            </div>
          </div>

          {/* SECTION 2: FINAL TARGET */}
          <div>
            <div className="flex items-center justify-between mb-3">
              {isMaxCharging ? (
                <p key="max-charge-info" className="text-sm text-text-secondary animate-in fade-in zoom-in-95 duration-500">Max charging to <span className="text-text-primary font-semibold">{maxChargeTarget}%</span>. Ready in <span className="text-text-primary font-semibold">{maxChargeTimeRemaining}</span></p>
              ) : (
                <p key="smart-charge-info" className="text-sm text-text-secondary animate-in fade-in zoom-in-95 duration-500">Charging to <span className="text-text-primary font-semibold">{targetBattery}%</span> ready by <span className="text-text-primary font-semibold">{readyByDay} {readyByTime}</span></p>
              )}
            </div>

            {isMaxCharging ? (
              <div key="max-charge-buttons" className="grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-500">
                <button 
                  onClick={onStopMaxCharge}
                  className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20"
                >
                  Smart charge
                </button>
                <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
                  Stop
                </button>
              </div>
            ) : (
              <div key="smart-charge-buttons" className="grid grid-cols-3 gap-2 animate-in fade-in zoom-in-95 duration-500">
                <button 
                  onClick={onOpenMaxCharge}
                  className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20"
                >
                  Max charge
                </button>
                <button 
                  onClick={() => setEditTargetOpen(true)}
                  className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20"
                >
                  Edit target
                </button>
                <button className="bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-1.5 px-2 rounded-lg font-medium text-xs transition border border-brand-accent/20">
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TODAY'S PLAN */}
      {!isMaxCharging && (
      <div key="todays-plan" className="px-4 mb-6 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-surface-card rounded-md p-5 shadow-lg">
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
                <p className="text-text-primary font-semibold">£4.57</p>
              </div>
              <div>
                <p className="text-text-tertiary mb-1">Total energy to use</p>
                <p className="text-text-primary font-semibold">68 kWh</p>
              </div>
            </div>
          </div>

          <button onClick={() => setScheduleOpen(true)} className="w-full text-brand-secondary hover:text-brand-secondary-300 font-medium text-sm mt-4">
          View full plan →
        </button>
      </div>
    </div>
    )}

    {/* CURRENT RATE */}
      <div className="px-4 mb-6">
        <div className="bg-surface-card rounded-md p-4 shadow-lg shadow-glow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-text-tertiary mb-1">Current electricity rate</p>
              <p className="text-2xl font-bold text-text-primary">7.5p <span className="text-sm font-normal text-text-tertiary">per kWh</span></p>
              <p className="text-xs text-text-tertiary mt-0.5">Now until 04:00 AM</p>
            </div>
          </div>
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

          {/* Smart Suggestion Inside Card */}
          <div className="bg-brand-primary/15 border border-brand-primary/30 rounded-lg p-3 mb-4 flex gap-3">
            <Sparkles className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">Customers who plug in every day tend to save more money. Keep your car plugged in as long as possible to maximise your savings.</p>
          </div>
        </div>
      </div>

      {/* EDIT TARGET DRAWER */}
      <EditTargetDrawer 
        isOpen={editTargetOpen}
        onClose={() => setEditTargetOpen(false)}
        currentTarget={targetBattery}
        currentDate={readyByDate}
        currentTime={readyByTime}
        onSave={handleSaveTarget}
      />
    </div>
  );
}
