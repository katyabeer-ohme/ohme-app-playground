import React from 'react';

export default function WeekDayBox({ day, active }) {
  return (
    <div className="flex-1">
      <div className={`w-full aspect-square rounded-lg flex items-center justify-center font-semibold text-xs transition-all ${
        active
          ? 'bg-yellow-300/80 text-yellow-900 border-2 border-yellow-300/90 shadow-sm shadow-yellow-300/30'
          : 'bg-slate-700/50 text-slate-500 border border-slate-600'
      }`}>
        {day}
      </div>
    </div>
  );
}

