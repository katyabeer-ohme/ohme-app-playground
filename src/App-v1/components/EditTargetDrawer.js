import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Sparkles } from 'lucide-react';

export default function EditTargetDrawer({ isOpen, onClose, currentTarget, currentDate, currentTime, onSave }) {
  const [target, setTarget] = useState(currentTarget);
  const [readyByDate, setReadyByDate] = useState(currentDate || '');
  const [readyByTime, setReadyByTime] = useState(currentTime || '08:00');
  const [preconditioningAdded, setPreconditioningAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTarget(currentTarget);
      setReadyByDate(currentDate || '');
      setReadyByTime(currentTime || '08:00');
      setPreconditioningAdded(false);
    }
  }, [isOpen, currentTarget, currentDate, currentTime]);

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

  const handleSave = () => {
    onSave({
      target,
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
      <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-slate-900 flex flex-col shadow-2xl rounded-t-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Edit Charging Target</h2>
          <button onClick={handleCancel} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
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
                  className="w-12 h-12 bg-brand-accent/10 hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-brand-accent/20 flex items-center justify-center"
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
                    className="w-full bg-slate-800 border border-brand-accent/30 rounded-lg px-4 py-3 text-3xl font-bold text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-tertiary">%</span>
                </div>
                
                <button
                  onClick={handleIncrement}
                  disabled={target >= 100}
                  className="w-12 h-12 bg-brand-accent/10 hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary rounded-lg font-bold text-xl transition border border-brand-accent/20 flex items-center justify-center"
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
                  className="bg-slate-800 border border-brand-accent/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="time"
                  value={readyByTime}
                  onChange={(e) => setReadyByTime(e.target.value)}
                  className="bg-slate-800 border border-brand-accent/30 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
                  className="w-full bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-3 px-4 rounded-lg font-medium text-sm transition border border-brand-accent/20"
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
        <div className="px-6 py-4 border-t border-slate-700 flex flex-col gap-3 flex-shrink-0">
          <button
            onClick={handleSave}
            className="w-full bg-brand-primary hover:bg-brand-primary-600 text-brand-dark py-3 px-4 rounded-lg font-medium text-sm transition"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="w-full bg-brand-accent/10 hover:bg-brand-accent/20 text-text-primary py-3 px-4 rounded-lg font-medium text-sm transition border border-brand-accent/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

