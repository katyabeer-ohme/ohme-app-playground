import React, { useMemo } from 'react';
import { usageData } from '../constants/data';

export default function UsageView({ usagePeriod, setUsagePeriod, usageType, setUsageType }) {
  const currentPeriodData = usagePeriod === 'week' ? usageData.week : usageData.month;

  const stats = useMemo(() => {
    let totalKwh = 0;
    let totalCost = 0;
    let totalCarbon = 0;
    let peakKwh = 0;
    let offPeakKwh = 0;

    currentPeriodData.forEach(data => {
      totalKwh += (data.peakKwh || 0) + (data.offPeakKwh || 0);
      totalCost += (data.peakCost || 0) + (data.offPeakCost || 0);
      totalCarbon += (data.peakCarbon || 0) + (data.offPeakCarbon || 0);
      peakKwh += data.peakKwh || 0;
      offPeakKwh += data.offPeakKwh || 0;
    });

    const avgRate = totalKwh > 0 ? ((totalCost / totalKwh) * 100).toFixed(1) : '0';
    const offPeakPct = totalKwh > 0 ? Math.round((offPeakKwh / totalKwh) * 100) : 0;
    
    // Estimate savings vs if all was charged at peak rate (45p/kWh)
    const peakRate = 0.45;
    const actualCost = totalCost;
    const allPeakCost = totalKwh * peakRate;
    const savings = (allPeakCost - actualCost).toFixed(2);

    return {
      totalKwh: totalKwh.toFixed(1),
      totalCost: totalCost.toFixed(2),
      totalCarbon: totalCarbon.toFixed(1),
      avgRate,
      offPeakPct,
      savings
    };
  }, [currentPeriodData]);

  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xl font-bold text-white mb-2">Usage</h2>
        <select 
          value={usagePeriod} 
          onChange={(e) => setUsagePeriod(e.target.value)} 
          className="w-full px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-white cursor-pointer mt-3 border border-slate-700"
        >
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
          
          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-xs text-slate-400">Peak Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span className="text-xs text-slate-400">Off-Peak Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tip */}
      <div className="px-4 mb-6">
        <div className="bg-cyan-500/15 border border-cyan-500/30 rounded-xl p-4">
          <p className="text-xs text-cyan-400 font-semibold mb-1">💡 Smart Charging Tip</p>
          <p className="text-xs text-slate-200">You're saving {stats.offPeakPct}% by charging off-peak. Keep it up!</p>
        </div>
      </div>
    </div>
  );
}
