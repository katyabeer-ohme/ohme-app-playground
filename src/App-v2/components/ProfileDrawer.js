import React from 'react';
import { ChevronRight, X } from 'lucide-react';

export default function ProfileDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed left-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 flex flex-col shadow-xl animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Account</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all"
            aria-label="Close profile drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl font-bold text-white">K</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Katya Johnson</p>
                    <p className="text-xs text-slate-400">katya.johnson@email.com</p>
                  </div>
                </div>
                <div className="mt-2 inline-block border border-slate-400 rounded-full px-2 py-0.5">
                  <p className="text-xs font-semibold text-slate-300">Parent Account</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">My Location</h3>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
              <p className="text-sm text-white">2A Lowther Hill</p>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Login & Security</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <p className="text-sm text-white">Change password</p>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <p className="text-sm text-white">Change login method</p>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Users</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <p className="text-sm text-white">Invite users</p>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <p className="text-sm text-white">Manage users</p>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">App Preferences</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <div>
                  <p className="text-sm text-white text-left">Preferred units</p>
                  <p className="text-xs text-slate-400 mt-0.5 text-left">km, °C</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <div>
                  <p className="text-sm text-white text-left">Notifications</p>
                  <p className="text-xs text-slate-400 mt-0.5 text-left">Alerts, optimizations, V2G</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Legal & Support</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <p className="text-sm text-white">Terms of service</p>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                <p className="text-sm text-white">Privacy policy</p>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 font-semibold px-2 mb-3">App</p>
            <p className="text-xs text-slate-400 px-3 py-2">v1.2.4 (Build 456)</p>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <p className="text-sm text-slate-300">Join Beta</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <p className="text-sm text-slate-300">Send feedback</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="space-y-2 pt-4 border-t border-red-900/30">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
              <p className="text-sm text-slate-300">Logout</p>
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-red-950/30 hover:bg-red-950/50 transition border border-red-900/30">
              <div className="flex items-center gap-2">
                <span className="text-lg">🗑️</span>
                <p className="text-sm text-red-400">Delete account</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

