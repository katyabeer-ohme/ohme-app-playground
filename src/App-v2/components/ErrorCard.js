import React from 'react';
import { AlertCircle, CheckCircle, X, Loader2 } from 'lucide-react';

export default function ErrorCard({ state, onDismiss, isVisible, onOpenAITroubleshoot }) {
  if (!isVisible) return null;

  return (
    <div className={`animate-in slide-in-from-top duration-300 ${!isVisible && 'animate-out slide-out-to-top'}`}>
      {state === 'error' && (
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4 mx-4 mb-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-text-primary mb-1">Suspended EV</h3>
              <p className="text-xs text-text-secondary mb-3">
                Your vehicle has been temporarily suspended. Let's troubleshoot this together.
              </p>
              {onOpenAITroubleshoot && (
                <button
                  onClick={onOpenAITroubleshoot}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition"
                >
                  Resolve Issue
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {state === 'loading' && (
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4 mx-4 mb-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-text-primary mb-1">Resolving Issue...</h3>
              <p className="text-xs text-text-secondary">
                Please wait while we verify your account and restore access.
              </p>
            </div>
          </div>
        </div>
      )}

      {state === 'resolved' && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-lg p-4 mx-4 mb-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-text-primary mb-1">Issue Resolved</h3>
              <p className="text-xs text-text-secondary">
                Your vehicle has been restored. Smart charging is now active.
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="text-text-tertiary hover:text-text-primary transition flex-shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

