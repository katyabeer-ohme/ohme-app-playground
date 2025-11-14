import React from 'react';
import { Zap, Sun, Home, Battery, Car, Sparkles, ChevronRight, TrendingDown } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import { WEEK_DAYS, PLUG_IN_STREAK, todaySchedule } from '../constants/data';

export default function DashboardView({ setScheduleOpen, setView, goalsExpanded, setGoalsExpanded }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;

  return (
    <div className="pb-24">
      {/* HOME ENERGY */}
      <div className="px-4 mb-8 pt-4">
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="relative w-full h-64 flex items-center justify-center">
            {/* Dotted Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="75%" y1="80%" x2="75%" y2="20%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
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
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
              Boost charge
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
              Change target
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
              Stop session
            </button>
          
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
  );
}
