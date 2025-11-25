import React, { useState } from 'react';
import { X, Battery, Zap } from 'lucide-react';

export default function CarDetailOverlay({ isOpen, onClose }) {
  const [targetCharge, setTargetCharge] = useState(80);
  const [readyBy, setReadyBy] = useState('08:00');

  if (!isOpen) return null;

  const tesla = {
    name: 'Tesla Model 3',
    currentCharge: 45,
    maxCapacity: 75,
    range: 245,
    batteryHealth: 97,
    onboardCharger: '7kW',
    vin: '5YJ3E1EA0JF456789',
  };

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed left-0 right-0 bottom-0 max-h-[90vh] bg-brand-dark flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light flex-shrink-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Edit Charging Target</h2>
            <p className="text-xs text-text-tertiary mt-0.5">{tesla.name}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-tertiary hover:text-text-primary hover:bg-surface-elevated p-2 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Current Status */}
          <div className="bg-surface-card rounded-xl p-4 mb-6 border border-border-light">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-brand-primary" />
                <span className="text-sm text-text-secondary">Current Status</span>
              </div>
              <span className="text-2xl font-bold text-brand-primary">{tesla.currentCharge}%</span>
            </div>
            <div className="relative">
              <div className="bg-brand-dark-900/40 rounded-full h-2 overflow-hidden border border-brand-accent/30">
                <div 
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500"
                  style={{ width: `${tesla.currentCharge}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="text-text-tertiary">{tesla.range} miles range</span>
              <span className="text-text-tertiary">{tesla.currentCharge} kWh</span>
            </div>
          </div>

          {/* Target Charge */}
          <div className="bg-surface-card rounded-xl p-4 mb-6 border border-border-light">
            <label className="text-sm font-semibold text-text-primary mb-3 block">Target Charge Level</label>
            <div className="flex items-center gap-4 mb-4">
              <input 
                type="range" 
                min="20" 
                max="100" 
                value={targetCharge} 
                onChange={(e) => setTargetCharge(e.target.value)}
                className="flex-1 h-2 bg-brand-dark-900 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00FFD6 0%, #00FFD6 ${targetCharge}%, #0A161D ${targetCharge}%, #0A161D 100%)`
                }}
              />
              <div className="text-right min-w-[60px]">
                <p className="text-2xl font-bold text-brand-primary">{targetCharge}%</p>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">Setting to {targetCharge}% will add approximately {Math.round((targetCharge - tesla.currentCharge) * 0.75)} kWh</p>
          </div>

          {/* Ready By Time */}
          <div className="bg-surface-card rounded-xl p-4 mb-6 border border-border-light">
            <label className="text-sm font-semibold text-text-primary mb-3 block">Ready By</label>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-brand-secondary" />
              <input 
                type="time" 
                value={readyBy} 
                onChange={(e) => setReadyBy(e.target.value)}
                className="flex-1 bg-surface-elevated border border-border text-text-primary px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-primary transition"
              />
            </div>
            <p className="text-xs text-text-tertiary mt-3">We'll optimize charging to have your car ready by this time</p>
          </div>

          {/* Quick Presets */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-text-primary mb-3 block">Quick Presets</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setTargetCharge(80)}
                className={`py-3 px-4 rounded-lg font-medium text-sm transition ${
                  targetCharge === 80 
                    ? 'bg-brand-primary text-brand-dark' 
                    : 'bg-surface-elevated border border-border text-text-primary hover:border-brand-primary'
                }`}
              >
                Daily (80%)
              </button>
              <button 
                onClick={() => setTargetCharge(100)}
                className={`py-3 px-4 rounded-lg font-medium text-sm transition ${
                  targetCharge === 100 
                    ? 'bg-brand-primary text-brand-dark' 
                    : 'bg-surface-elevated border border-border text-text-primary hover:border-brand-primary'
                }`}
              >
                Full (100%)
              </button>
            </div>
          </div>

          {/* Car Details */}
          <div className="bg-surface-card rounded-xl p-4 border border-border-light">
            <h3 className="text-sm font-bold text-text-primary mb-4">Vehicle Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Battery Health</span>
                <span className="text-text-primary font-medium">{tesla.batteryHealth}%</span>
              </div>
              <div className="h-px bg-border-light"></div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Onboard Charger</span>
                <span className="text-text-primary font-medium">{tesla.onboardCharger}</span>
              </div>
              <div className="h-px bg-border-light"></div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">VIN</span>
                <span className="text-text-primary font-medium font-mono">{tesla.vin.slice(-6)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border-light bg-surface-elevated flex-shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onClose}
              className="py-3 bg-surface-card hover:bg-surface-hover text-text-primary rounded-lg font-medium text-sm transition border border-border"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="py-3 bg-brand-primary hover:bg-brand-primary-600 text-brand-dark rounded-lg font-medium text-sm transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

