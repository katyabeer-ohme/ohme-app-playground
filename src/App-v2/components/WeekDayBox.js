import React from 'react';

export default function WeekDayBox({ day, active }) {
  return (
    <div className="flex-1">
      <div className={`w-full aspect-square rounded-lg flex items-center justify-center font-semibold text-xs transition-all ${
        active
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
          : 'bg-slate-700/50 text-slate-500 border border-slate-600'
      }`}>
        {day}
      </div>
    </div>
  );
}

