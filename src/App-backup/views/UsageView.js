import React from 'react';
import { usageData } from '../constants/data';

export default function UsageView({ usagePeriod, setUsagePeriod, usageType, setUsageType, usageAsset, setUsageAsset, hoveredBar, setHoveredBar }) {
  return (
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
  );
}

