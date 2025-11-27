import React from 'react';
import { X, Zap, Sun, TrendingDown } from 'lucide-react';

export default function UsageSavingsDrawer({ isOpen, onClose, setView }) {
  if (!isOpen) return null;

  const handleViewFullUsage = () => {
    setView('history');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-slate-900 flex flex-col shadow-2xl rounded-t-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Session Savings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Total Savings Banner */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl p-5 border border-emerald-500/30">
              <p className="text-xs text-emerald-300 font-semibold mb-2">Total Savings This Session</p>
              <p className="text-4xl font-bold text-white mb-1">£1.57</p>
              <p className="text-sm text-slate-300">vs. standard charging</p>
            </div>

            {/* Session Details */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Session Details</h3>
              <div className="bg-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Duration</span>
                  <span className="text-sm font-semibold text-white">4h 30m</span>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Started</span>
                  <span className="text-sm font-semibold text-white">11:30 PM</span>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Ending</span>
                  <span className="text-sm font-semibold text-white">04:00 AM</span>
                </div>
              </div>
            </div>

            {/* Energy Breakdown */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Energy Used</h3>
              <div className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Grid</p>
                      <p className="text-xs text-slate-400">Off-peak rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">8.9 kWh</p>
                    <p className="text-xs text-emerald-400">£0.67</p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Sun className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Solar</p>
                      <p className="text-xs text-slate-400">Free energy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">3.6 kWh</p>
                    <p className="text-xs text-emerald-400">FREE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Comparison */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Cost Comparison</h3>
              <div className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Smart charging (actual)</span>
                    <span className="text-lg font-bold text-emerald-400">£0.67</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Standard charging</span>
                    <span className="text-lg font-bold text-slate-400">£2.24</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-slate-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-xs text-emerald-300">You saved 70% by charging dynamically during off-peak hours and using solar energy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-700 flex flex-col gap-3 flex-shrink-0">
          <button
            onClick={handleViewFullUsage}
            className="w-full bg-brand-primary hover:bg-brand-primary-600 text-brand-dark py-3 px-4 rounded-lg font-medium text-sm transition"
          >
            View Full Usage History →
          </button>
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

