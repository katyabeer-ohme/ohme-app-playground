import React from 'react';
import { Zap, X } from 'lucide-react';
import { todaySchedule } from '../constants/data';

export default function SchedulePanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full bg-slate-900 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Full Schedule</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {todaySchedule.map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{item.timeSlot}</p>
                    <p className="text-sm font-semibold text-white">{item.action}</p>
                  </div>
                  <p className="text-sm font-bold text-cyan-400">{item.target}</p>
                </div>
                <p className="text-xs text-slate-400 mb-3">{item.reason}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-slate-500" />
                    <span className="text-xs text-slate-400">{Math.abs(item.consumption)} kWh</span>
                  </div>
                  <p className={`text-xs font-semibold ${item.cost.includes('Save') ? 'text-emerald-400' : item.cost.includes('Free') ? 'text-yellow-400' : 'text-slate-400'}`}>
                    {item.cost}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

