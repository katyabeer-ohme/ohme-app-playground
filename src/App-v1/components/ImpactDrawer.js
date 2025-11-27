import React from 'react';
import { X, Leaf, Cloud, Car, Droplet, Lightbulb } from 'lucide-react';

export default function ImpactDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const score = 3;
  const maxScore = 5;

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-slate-900 flex flex-col shadow-2xl rounded-t-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Your Environmental Impact</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {/* Score Display */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-6 border-2 border-emerald-500/40 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Leaf className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-xs text-emerald-300 font-semibold mb-1">Your Green Score</p>
                  <p className="text-5xl font-bold text-white">{score}<span className="text-2xl text-slate-400">/{maxScore}</span></p>
                </div>
                <Leaf className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="inline-block bg-emerald-500/30 border border-emerald-400/50 rounded-full px-4 py-1.5">
                <p className="text-sm font-bold text-emerald-300">Eco Champion</p>
              </div>
            </div>

            {/* Score Explanation */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">What does this mean?</h3>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your score of <span className="font-semibold text-emerald-400">{score}/{maxScore}</span> means you're doing a great job! You're actively reducing your carbon footprint by charging smart, using renewable energy, and avoiding peak grid hours.
                </p>
              </div>
            </div>

            {/* Environmental Metrics */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">This Month's Impact</h3>
              <div className="space-y-3">
                <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Trees Saved (Equivalent)</p>
                    <p className="text-2xl font-bold text-white">2.3 <span className="text-sm font-normal text-slate-400">trees</span></p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Cloud className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">CO₂ Offset</p>
                    <p className="text-2xl font-bold text-white">45.2 <span className="text-sm font-normal text-slate-400">kg</span></p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Equivalent Miles Not Driven</p>
                    <p className="text-2xl font-bold text-white">112 <span className="text-sm font-normal text-slate-400">miles</span></p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">Gallons of Gas Saved</p>
                    <p className="text-2xl font-bold text-white">4.5 <span className="text-sm font-normal text-slate-400">gal</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* How Score is Calculated */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">How is this calculated?</h3>
              <div className="bg-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-400">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Renewable Energy Usage</p>
                    <p className="text-xs text-slate-400 mt-1">Solar and off-peak charging maximizes clean energy</p>
                  </div>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-emerald-400">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Smart Charging Times</p>
                    <p className="text-xs text-slate-400 mt-1">Charging during off-peak hours reduces grid strain</p>
                  </div>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-slate-500">○</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">V2G Participation</p>
                    <p className="text-xs text-slate-400 mt-1">Not enabled - could boost your score!</p>
                  </div>
                </div>
                <div className="h-px bg-slate-700"></div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-slate-500">○</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Consistency</p>
                    <p className="text-xs text-slate-400 mt-1">Regular smart charging increases impact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips to Improve */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">How to improve your score</h3>
              <div className="space-y-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-300 mb-1">Enable V2G</p>
                    <p className="text-xs text-slate-400">Send power back to the grid during peak hours to earn rewards and reduce grid strain</p>
                  </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-300 mb-1">Charge consistently</p>
                    <p className="text-xs text-slate-400">Plug in daily to maximize solar usage and maintain your streak</p>
                  </div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-300 mb-1">Use more solar</p>
                    <p className="text-xs text-slate-400">Schedule more charging during peak solar hours (10 AM - 3 PM)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-700 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium text-sm transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

