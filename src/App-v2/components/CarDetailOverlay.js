import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Sparkles } from 'lucide-react';

export default function CarDetailOverlay({ isOpen, onClose, currentTarget, currentMinBattery, currentDate, currentTime, onSave }) {
  const [target, setTarget] = useState(currentTarget || 80);
  const [minBatteryLevel, setMinBatteryLevel] = useState(currentMinBattery || 50);
  const [readyByDate, setReadyByDate] = useState(currentDate || '');
  const [readyByTime, setReadyByTime] = useState(currentTime || '08:00');
  const [preconditioningAdded, setPreconditioningAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTarget(currentTarget || 80);
      setMinBatteryLevel(currentMinBattery || 50);
      setReadyByDate(currentDate || '');
      setReadyByTime(currentTime || '08:00');
      setPreconditioningAdded(false);
    }
  }, [isOpen, currentTarget, currentMinBattery, currentDate, currentTime]);

  if (!isOpen) return null;

  const handleIncrement = () => {
    if (target < 100) {
      setTarget(target + 1);
    }
  };

  const handleDecrement = () => {
    if (target > 0) {
      setTarget(target - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setTarget(value);
    } else if (e.target.value === '') {
      setTarget(0);
    }
  };

  const handleMinIncrement = () => {
    if (minBatteryLevel < 100) {
      setMinBatteryLevel(minBatteryLevel + 1);
    }
  };

  const handleMinDecrement = () => {
    if (minBatteryLevel > 0) {
      setMinBatteryLevel(minBatteryLevel - 1);
    }
  };

  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setMinBatteryLevel(value);
    } else if (e.target.value === '') {
      setMinBatteryLevel(0);
    }
  };

  const handleSave = () => {
    onSave({
      target,
      minBatteryLevel,
      readyByDate,
      readyByTime,
      preconditioning: preconditioningAdded
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleUpdateTo70 = () => {
    setTarget(70);
  };

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={handleCancel}></div>
      <div className="fixed left-0 right-0 bottom-0 max-h-[90vh] bg-brand-dark flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light flex-shrink-0">
          <h2 className="text-lg font-bold text-text-primary">Edit Charging Target</h2>
          <button 
            onClick={handleCancel} 
            className="text-text-tertiary hover:text-text-primary hover:bg-surface-elevated p-2 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* AI Insight */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-4 border border-cyan-500/30">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You usually use 10% between charges. Target 70% to save money and be greener.
                  </p>
                </div>
              </div>
              <button
                onClick={handleUpdateTo70}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition"
              >
                Update target to 70%
              </button>
            </div>

            {/* Charge Target Section */}
            <div>
              <label className="text-sm font-semibold text-text-primary mb-3 block">
                Charge my battery to:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  disabled={target <= 0}
                  className="w-12 h-12 bg-surface-card hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-border-light flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={target}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-3xl font-bold text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-tertiary">%</span>
                </div>
                
                <button
                  onClick={handleIncrement}
                  disabled={target >= 100}
                  className="w-12 h-12 bg-surface-card hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-border-light flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Minimum Battery Level Section */}
            <div>
              <label className="text-sm font-semibold text-text-primary mb-3 block">
                Minimum battery level
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMinDecrement}
                  disabled={minBatteryLevel <= 0}
                  className="w-12 h-12 bg-surface-card hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-border-light flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="number"
                    value={minBatteryLevel}
                    onChange={handleMinInputChange}
                    min="0"
                    max="100"
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-3xl font-bold text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-tertiary">%</span>
                </div>
                
                <button
                  onClick={handleMinIncrement}
                  disabled={minBatteryLevel >= 100}
                  className="w-12 h-12 bg-surface-card hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-border-light flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Ready By Section */}
            <div>
              <label className="text-sm font-semibold text-text-primary mb-3 block">
                Car ready by
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={readyByDate}
                  onChange={(e) => setReadyByDate(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="time"
                  value={readyByTime}
                  onChange={(e) => setReadyByTime(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            {/* Preconditioning Section */}
            <div>
              <label className="text-sm font-semibold text-text-primary mb-3 block">
                Add cabin preconditioning to the charging plan
              </label>
              {!preconditioningAdded ? (
                <button
                  onClick={() => setPreconditioningAdded(true)}
                  className="w-full bg-surface-card hover:bg-surface-hover text-text-primary py-3 px-4 rounded-lg font-medium text-sm transition border border-border-light"
                >
                  + Add Preconditioning
                </button>
              ) : (
                <div className="bg-brand-primary/15 border border-brand-primary/30 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-sm text-text-primary font-medium">✓ Preconditioning added</span>
                  <button
                    onClick={() => setPreconditioningAdded(false)}
                    className="text-xs text-brand-accent hover:text-brand-primary transition"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border-light bg-surface-elevated flex-shrink-0">
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleSave}
              className="w-full py-3 bg-brand-primary hover:bg-brand-primary-600 text-brand-dark rounded-lg font-medium text-sm transition"
            >
              Save
            </button>
            <button 
              onClick={handleCancel}
              className="w-full py-3 bg-surface-card hover:bg-surface-hover text-text-primary rounded-lg font-medium text-sm transition border border-border"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

