import React from 'react';
import { Car, Zap, Plus } from 'lucide-react';
import ToggleSwitch from '../components/ToggleSwitch';

export default function AssetsView() {
  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-6">
        <h2 className="text-xl font-bold text-white">My Hub</h2>
      </div>
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-white">Tesla Model 3</p>
              <Car className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-emerald-400 font-medium">✓ Paired</p>
              <p className="text-2xl font-bold text-cyan-400 mt-2">23%</p>
            </div>
          </button>
          <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-white">BMW i3</p>
              <Car className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Unpaired</p>
            </div>
          </button>
          <button className="bg-slate-800 rounded-lg p-4 text-left hover:bg-slate-750 transition flex flex-col justify-between">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm font-semibold text-white">Home Pro</p>
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-emerald-400 font-medium">● Online</p>
            </div>
          </button>
          <button className="bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-lg p-4 text-left hover:bg-slate-700/50 hover:border-cyan-500 transition flex flex-col items-center justify-center">
            <Plus className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-300">Add an asset</p>
          </button>
        </div>
      </div>

      {/* TARIFFS & PRICING */}
      <div className="px-4 pb-6">
        <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Tariffs & Pricing</h3>
        
        <div className="bg-slate-800 rounded-lg p-4 mb-3">
          <div className="mb-4">
            <p className="text-sm font-semibold text-white mb-1">Octopus Energy - Agile</p>
            <p className="text-xs text-slate-400">Octopus Energy</p>
          </div>
          
          <div className="mb-4 p-3 bg-slate-700/30 rounded">
            <p className="text-xs text-slate-300">Current rate:</p>
            <p className="text-lg font-bold text-cyan-400 mt-1">28.5p/kWh</p>
          </div>

          <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium">
            Change tariff →
          </button>
        </div>

        <button className="w-full text-sm text-cyan-400 hover:text-cyan-300 font-medium text-left">
          + Add export tariff
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="px-4 pb-6">
        <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase">Notifications</h3>
        
        <div className="space-y-3">
          {[
            { label: 'Rate changes', on: true },
            { label: 'Charging complete', on: true },
            { label: 'V2G opportunities', on: true },
            { label: 'Low battery alerts', on: false },
          ].map((notif, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-300">{notif.label}</p>
              <ToggleSwitch on={notif.on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

