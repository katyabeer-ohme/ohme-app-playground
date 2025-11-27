import React, { useState, useMemo } from 'react';
import { usageData } from '../constants/data';
import { ChevronRight, Zap, Battery, Home, Sparkles } from 'lucide-react';

export default function UsageView({ usagePeriod, setUsagePeriod, usageType, setUsageType, usageAsset, setUsageAsset, hoveredBar, setHoveredBar }) {
  const [activeTab, setActiveTab] = useState('usage');

  // Mock session data - memoized to prevent recreation on every render
  const mockSessions = useMemo(() => [
    {
      id: 1,
      date: '2024-01-15',
      time: '22:30 - 06:15',
      duration: '7h 45m',
      energy: '42.5 kWh',
      cost: '£3.19',
      savings: '£1.25',
      asset: 'Tesla Model 3',
      icon: Zap
    },
    {
      id: 2,
      date: '2024-01-14',
      time: '23:00 - 07:30',
      duration: '8h 30m',
      energy: '48.2 kWh',
      cost: '£3.61',
      savings: '£1.42',
      asset: 'Tesla Model 3',
      icon: Zap
    },
    {
      id: 3,
      date: '2024-01-14',
      time: '14:00 - 16:30',
      duration: '2h 30m',
      energy: '15.8 kWh',
      cost: '£1.18',
      savings: '£0.32',
      asset: 'Home Battery',
      icon: Battery
    },
    {
      id: 4,
      date: '2024-01-13',
      time: '22:15 - 05:45',
      duration: '7h 30m',
      energy: '40.1 kWh',
      cost: '£3.01',
      savings: '£1.18',
      asset: 'Tesla Model 3',
      icon: Zap
    },
    {
      id: 5,
      date: '2024-01-13',
      time: '10:00 - 13:00',
      duration: '3h 0m',
      energy: '12.5 kWh',
      cost: '£0.94',
      savings: '£0.25',
      asset: 'Home',
      icon: Home
    }
  ], []);

  const renderSessionsView = () => (
    <div className="px-4 space-y-3">
      {mockSessions.map((session) => {
        const IconComponent = session.icon;
        return (
          <div
            key={session.id}
            className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700/50 hover:border-slate-600 transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{session.asset}</p>
                  <p className="text-xs text-slate-400">{session.date} • {session.time}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-700">
              <div>
                <p className="text-xs text-slate-400 mb-1">Duration</p>
                <p className="text-sm font-semibold text-white">{session.duration}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Energy</p>
                <p className="text-sm font-semibold text-white">{session.energy}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Savings</p>
                <p className="text-sm font-semibold text-emerald-400">{session.savings}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Total Cost</span>
                <span className="text-sm font-bold text-white">{session.cost}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-2">
        <h2 className="text-xl font-bold text-white">Usage</h2>
      </div>

      {/* Tab/Segmented Control */}
      <div className="px-4 pt-4 pb-4">
        <div className="bg-slate-800 rounded-xl p-1 flex gap-1">
          <button
            onClick={() => setActiveTab('usage')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition ${
              activeTab === 'usage'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Usage
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition ${
              activeTab === 'sessions'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sessions
          </button>
        </div>
      </div>

      {activeTab === 'sessions' ? (
        renderSessionsView()
      ) : (
        <>
      <div className="px-4 pt-2 pb-4">
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
            <p className="text-xs font-semibold text-slate-400 mb-2">Asset</p>
            <select value={usageAsset} onChange={(e) => setUsageAsset(e.target.value)} className="w-full px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer">
              <option value="all">All Assets</option>
              <option value="solar">Solar Only</option>
              <option value="tesla">Tesla Model 3</option>
              <option value="house">House Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Combined Summary and Graph Block */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 shadow-lg">
          {/* Today's Summary */}
          <p className="text-xs font-semibold text-slate-400 mb-3">Today's Summary</p>
          <div className="mb-4">
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

          {/* AI Insight */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-3 border border-cyan-500/30 mb-4">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-cyan-300 mb-1">AI Insight</p>
                <p className="text-xs text-slate-300 leading-relaxed">Lower home consumption 5-6 PM and enable V2G to earn £1.50 more today.</p>
              </div>
            </div>
          </div>

          {/* 24-Hour Cost Breakdown */}
          <div className="border-t border-slate-700/50 pt-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-slate-400">24-Hour Cost Breakdown</p>
              {/* Type Filter in top right */}
              <div className="flex gap-1">
                <button onClick={() => setUsageType('cost')} className={usageType === 'cost' ? 'px-2 py-1 rounded text-xs font-bold bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'px-2 py-1 rounded text-xs font-bold bg-slate-700 text-slate-400'}>£</button>
                <button onClick={() => setUsageType('kwh')} className={usageType === 'kwh' ? 'px-2 py-1 rounded text-xs font-bold bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'px-2 py-1 rounded text-xs font-bold bg-slate-700 text-slate-400'}>kWh</button>
                <button onClick={() => setUsageType('carbon')} className={usageType === 'carbon' ? 'px-2 py-1 rounded text-xs font-bold bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'px-2 py-1 rounded text-xs font-bold bg-slate-700 text-slate-400'}>CO₂</button>
              </div>
            </div>
            <div className="h-48 flex items-end gap-0.5 pb-4 border-b border-slate-700/50 mb-4 relative bg-slate-900/50 rounded-lg p-2">
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
            <div className="flex gap-4 text-xs">
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
      </div>
        </>
      )}
    </div>
  );
}

