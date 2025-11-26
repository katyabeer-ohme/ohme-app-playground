import React, { useState } from 'react';
import { Zap, Sun, Clock, AlertCircle, TrendingDown, Home, X, MessageCircle } from 'lucide-react';
import { activityEvents } from '../constants/data';
import CustomerServiceRatingDrawer from './CustomerServiceRatingDrawer';

const getEventIcon = (type) => {
  if (type === 'plug-in' || type === 'session-end') return Zap;
  if (type === 'solar') return Sun;
  if (type === 'schedule-change') return TrendingDown;
  if (type === 'v2h') return Home;
  if (type === 'alert') return AlertCircle;
  if (type === 'customer-service') return MessageCircle;
  return Clock;
};

const getEventColors = (type) => {
  if (type === 'plug-in' || type === 'session-end') return { bg: 'bg-cyan-500/20', text: 'text-cyan-400' };
  if (type === 'solar') return { bg: 'bg-yellow-500/20', text: 'text-yellow-400' };
  if (type === 'schedule-change') return { bg: 'bg-orange-500/20', text: 'text-orange-400' };
  if (type === 'v2h') return { bg: 'bg-emerald-500/20', text: 'text-emerald-400' };
  if (type === 'alert') return { bg: 'bg-red-500/20', text: 'text-red-400' };
  if (type === 'customer-service') return { bg: 'bg-purple-500/20', text: 'text-purple-400' };
  return { bg: 'bg-slate-700', text: 'text-slate-400' };
};

export default function ActivityDrawer({ isOpen, onClose }) {
  const [ratingDrawerOpen, setRatingDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!isOpen) return null;

  const handleViewLog = (event) => {
    setSelectedEvent(event);
    setRatingDrawerOpen(true);
  };

  return (
    <>
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full bg-slate-900 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Activity</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all"
            aria-label="Close activity drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activityEvents.map((dayGroup, dayIdx) => (
            <div key={dayIdx}>
              <div className="sticky top-0 bg-slate-900 py-3 z-20">
                <p className="text-xs font-semibold text-slate-400 uppercase">{dayGroup.date}</p>
              </div>
              <div className="space-y-4 relative pl-6 pb-6">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-700"></div>
                {dayGroup.events.map((event, idx) => {
                  const IconComponent = getEventIcon(event.type);
                  const colors = getEventColors(event.type);
                  return (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-slate-900 shadow-lg ${colors.text.replace('text-', 'bg-')}`}></div>
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
                          <IconComponent className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-400 font-medium mb-1">{event.time}</p>
                          <p className="text-sm font-semibold text-white mb-1">{event.title}</p>
                          <p className="text-xs text-slate-300">{event.details}</p>
                          {event.cta && (
                            <button 
                              onClick={() => handleViewLog(event)}
                              className="mt-2 text-xs text-brand-primary hover:text-brand-primary-600 font-medium transition"
                            >
                              {event.cta} →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Customer Service Rating Drawer */}
    <CustomerServiceRatingDrawer
      isOpen={ratingDrawerOpen}
      onClose={() => setRatingDrawerOpen(false)}
      caseNumber={selectedEvent?.caseNumber || 'N/A'}
      callSummary={selectedEvent?.callSummary}
      actionsTaken={selectedEvent?.actionsTaken}
    />
    </>
  );
}

