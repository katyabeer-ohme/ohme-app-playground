import React, { useMemo } from 'react';
import { X } from 'lucide-react';

export default function EnergyTodayDrawer({ isOpen, onClose }) {
  // Rate data matching the tariff screen
  const rateData = useMemo(() => [
    { time: '00:00', rate: 28.5, type: 'off-peak' },
    { time: '02:00', rate: 26.2, type: 'off-peak' },
    { time: '04:00', rate: 24.8, type: 'off-peak' },
    { time: '06:00', rate: 31.5, type: 'standard' },
    { time: '08:00', rate: 45.2, type: 'peak' },
    { time: '10:00', rate: 52.1, type: 'peak' },
    { time: '12:00', rate: 48.5, type: 'peak' },
    { time: '14:00', rate: 38.2, type: 'standard' },
    { time: '16:00', rate: 55.8, type: 'peak' },
    { time: '18:00', rate: 62.3, type: 'peak' },
    { time: '20:00', rate: 41.5, type: 'standard' },
    { time: '22:00', rate: 29.4, type: 'off-peak' },
  ], []);

  // Find max rate value for scaling bars
  const maxRate = useMemo(() => Math.max(...rateData.map(d => d.rate)), [rateData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-slate-900 flex flex-col shadow-2xl rounded-t-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Energy today</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-3xl font-bold text-white">28.5p</p>
              <p className="text-sm text-slate-400">/kWh</p>
            </div>
            <p className="text-xs text-slate-500 mt-1">as of 10:00</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Today's rates graph - matching tariff screen */}
          <div className="border border-slate-700 rounded-xl p-4">
            <div className="h-40 flex items-end gap-1 pb-4 border-b border-slate-700 mb-4">
              {rateData.map((bar, idx) => {
                const height = (bar.rate / maxRate) * 100;
                const barColor = bar.type === 'peak' ? 'bg-red-500' : bar.type === 'standard' ? 'bg-orange-500' : 'bg-emerald-500';
                return (
                  <div key={idx} className="flex-1 flex flex-col items-end justify-end relative group h-full">
                    <div
                      className={`w-full rounded-t transition-opacity hover:opacity-80 cursor-pointer ${barColor}`}
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                        {bar.time}: {bar.rate}p
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-400">Off-peak</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-slate-400">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-slate-400">Peak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-700 flex flex-col gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-3 px-4 rounded-lg font-medium text-sm transition border border-brand-accent/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

