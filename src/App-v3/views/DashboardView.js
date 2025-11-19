import React from 'react';
import { Zap, Sun, Car, Sparkles, Home } from 'lucide-react';
import WeekDayBox from '../components/WeekDayBox';
import { WEEK_DAYS, PLUG_IN_STREAK } from '../constants/data';

export default function DashboardView({ setScheduleOpen, setView }) {
  const streakCount = PLUG_IN_STREAK.filter(Boolean).length;
  const currentBattery = 45;
  const targetBattery = 80;
  const batteryProgress = (currentBattery / targetBattery) * 100;

  // Hub status data
  const hubStatus = {
    charger: { status: 'Online', rate: '7 kW' },
    grid: { power: '1.1 kW' },
    solar: { export: '1.6 kW' },
    home: { consumption: '2.1 kW' },
    vehicles: [
      { name: 'Tesla Model 3', status: 'Charging', battery: 45 },
      { name: 'BMW i3', status: 'Unplugged', battery: 78 }
    ]
  };

  const todaySchedule = [
    { timeSlot: 'Right now', action: 'Paused', rate: 'Peak', cost: '£0.00', reason: 'Waiting for off-peak', power: 0 },
    { timeSlot: '11:00 PM - 6:00 AM', action: 'Charging at off-peak rate', rate: 'Off-peak', cost: '£1.20', reason: 'Cheapest window', power: 11.2 },
    { timeSlot: '6:00 - 7:30 AM', action: 'Final top-up', rate: 'Off-peak', cost: '£0.30', reason: 'Ready for morning', power: 2.4 },
  ];

  return (
    <div className="pb-24">
      {/* HUB STATUS WIDGET */}
      <div className="px-4 mb-6 pt-4">
        <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase">Hub Status</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Charger */}
          <div className="flex-shrink-0 bg-slate-800 rounded-lg p-3 border border-cyan-500/30 min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Charger</p>
                <p className="text-sm font-bold text-cyan-400">{hubStatus.charger.status}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">{hubStatus.charger.rate}</p>
          </div>

          {/* Grid */}
          <div className="flex-shrink-0 bg-slate-800 rounded-lg p-3 border border-slate-600 min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Grid</p>
                <p className="text-sm font-bold text-slate-300">Import</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">{hubStatus.grid.power}</p>
          </div>

          {/* Solar */}
          <div className="flex-shrink-0 bg-slate-800 rounded-lg p-3 border border-yellow-500/30 min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Sun className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Solar</p>
                <p className="text-sm font-bold text-yellow-400">Export</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">{hubStatus.solar.export}</p>
          </div>

          {/* Home */}
          <div className="flex-shrink-0 bg-slate-800 rounded-lg p-3 border border-orange-500/30 min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Home className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Home</p>
                <p className="text-sm font-bold text-orange-400">Using</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">{hubStatus.home.consumption}</p>
          </div>

          {/* Car 1 */}
          <div className="flex-shrink-0 bg-slate-800 rounded-lg p-3 border border-emerald-500/30 min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Car className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">{hubStatus.vehicles[0].name}</p>
                <p className="text-sm font-bold text-emerald-400">{hubStatus.vehicles[0].status}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">{hubStatus.vehicles[0].battery}%</p>
          </div>

          {/* Car 2 */}
          <div className="flex-shrink-0 bg-slate-800 rounded-lg p-3 border border-slate-600 min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <Car className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">{hubStatus.vehicles[1].name}</p>
                <p className="text-sm font-bold text-slate-400">{hubStatus.vehicles[1].status}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">{hubStatus.vehicles[1].battery}%</p>
          </div>
        </div>
      </div>

      {/* SESSION STATUS */}
      <div className="px-4 mb-6 pt-0">
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
              <p className="text-2xl font-bold text-white">{currentBattery}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Target</p>
              <p className="text-2xl font-bold text-emerald-400">{targetBattery}%</p>
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
              Edit target
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-2 rounded-lg font-medium text-xs transition">
              Stop
            </button>
          
          </div>
        </div>
      </div>

      {/* TODAY'S PLAN */}
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
          <button onClick={() => setScheduleOpen(true)} className="w-full text-cyan-400 hover:text-cyan-300 font-medium text-sm mt-4">
            View full plan →
          </button>
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

          {/* Smart Suggestion Inside Card */}
          <div className="bg-cyan-500/15 border border-cyan-500/30 rounded-lg p-3 mb-4 flex gap-3">
            <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-200 leading-relaxed">Customers who plug in every day tend to save more money. Keep your car plugged in as long as possible to maximise your savings.</p>
          </div>

        </div>
      </div>

    </div>
  );
}
