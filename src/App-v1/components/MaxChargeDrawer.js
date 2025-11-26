import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';

export default function MaxChargeDrawer({ isOpen, onClose, onStartMaxCharge, currentBattery }) {
  const [mode, setMode] = useState('target'); // 'target' or 'time'
  const [targetValue, setTargetValue] = useState(100);
  const [timeOption, setTimeOption] = useState(null); // '2h', '3h', '4h', or custom
  const [customTime, setCustomTime] = useState('02:00');

  if (!isOpen) return null;

  const handleIncrement = () => {
    if (targetValue < 100) {
      setTargetValue(targetValue + 1);
    }
  };

  const handleDecrement = () => {
    if (targetValue > currentBattery) {
      setTargetValue(targetValue - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= currentBattery && value <= 100) {
      setTargetValue(value);
    } else if (e.target.value === '') {
      setTargetValue(currentBattery);
    }
  };

  const handleStartCharge = () => {
    const config = {
      mode,
      target: targetValue,
      time: mode === 'time' ? (timeOption === 'custom' ? customTime : timeOption) : null
    };
    onStartMaxCharge(config);
    onClose();
  };

  const isValid = mode === 'target' || (mode === 'time' && timeOption !== null);

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-slate-900 flex flex-col shadow-2xl rounded-t-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Max Charge</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setMode('target')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                  mode === 'target'
                    ? 'bg-brand-primary text-brand-dark'
                    : 'text-text-primary hover:text-white'
                }`}
              >
                Set target
              </button>
              <button
                onClick={() => setMode('time')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                  mode === 'time'
                    ? 'bg-brand-primary text-brand-dark'
                    : 'text-text-primary hover:text-white'
                }`}
              >
                Set time
              </button>
            </div>

            {/* Set Target Mode */}
            {mode === 'target' && (
              <div>
                <label className="text-sm font-semibold text-text-primary mb-3 block">
                  Max charge to:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrement}
                    disabled={targetValue <= currentBattery}
                    className="w-12 h-12 bg-brand-accent/10 hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-brand-accent/20 flex items-center justify-center"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={targetValue}
                      onChange={handleInputChange}
                      min={currentBattery}
                      max="100"
                      className="w-full bg-slate-800 border border-brand-accent/30 rounded-lg px-4 py-3 text-3xl font-bold text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-tertiary">%</span>
                  </div>
                  
                  <button
                    onClick={handleIncrement}
                    disabled={targetValue >= 100}
                    className="w-12 h-12 bg-brand-accent/10 hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-brand-accent/20 flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-text-tertiary mt-3">
                  Currently at {currentBattery}%. Charging to {targetValue}% will add approximately {Math.round((targetValue - currentBattery) * 0.75)} kWh.
                </p>
              </div>
            )}

            {/* Set Time Mode */}
            {mode === 'time' && (
              <div>
                <label className="text-sm font-semibold text-text-primary mb-3 block">
                  Max charge for:
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {['2h', '3h', '4h'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setTimeOption(option)}
                      className={`py-3 px-4 rounded-lg font-medium text-sm transition ${
                        timeOption === option
                          ? 'bg-brand-primary text-brand-dark'
                          : 'bg-slate-800 border border-slate-700 text-text-primary hover:border-brand-primary'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                  <button
                    onClick={() => setTimeOption('custom')}
                    className={`py-3 px-4 rounded-lg font-medium text-sm transition ${
                      timeOption === 'custom'
                        ? 'bg-brand-primary text-brand-dark'
                        : 'bg-slate-800 border border-slate-700 text-text-primary hover:border-brand-primary'
                    }`}
                  >
                    Select time
                  </button>
                </div>

                {timeOption === 'custom' && (
                  <div>
                    <label className="text-xs font-semibold text-text-tertiary mb-2 block">
                      Custom duration:
                    </label>
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="w-full bg-slate-800 border border-brand-accent/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-700 flex flex-col gap-3 flex-shrink-0">
          <button
            onClick={handleStartCharge}
            disabled={!isValid}
            className="w-full bg-brand-primary hover:bg-brand-primary-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-brand-dark py-3 px-4 rounded-lg font-medium text-sm transition"
          >
            Start max charge
          </button>
          <button
            onClick={onClose}
            className="w-full bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-3 px-4 rounded-lg font-medium text-sm transition border border-brand-accent/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

