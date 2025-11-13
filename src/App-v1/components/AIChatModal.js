import React, { useRef, useEffect } from 'react';
import { Sparkles, Send, X } from 'lucide-react';

export default function AIChatModal({ isOpen, onClose, messages, input, onInputChange, onSend }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed left-0 right-0 bottom-0 bg-slate-900 rounded-t-3xl flex flex-col max-h-2/3 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Energy Advisor</h2>
              <p className="text-xs text-slate-400">Powered by AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <Sparkles className="w-12 h-12 text-cyan-400 mb-4" />
              <p className="text-sm font-semibold text-white mb-6 text-center">What would you like to know?</p>
              <div className="grid grid-cols-1 gap-2 w-full">
                <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                  <p className="text-sm font-medium text-white">How can I save more money?</p>
                </button>
                <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                  <p className="text-sm font-medium text-white">What is V2G and how does it work?</p>
                </button>
                <button className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition">
                  <p className="text-sm font-medium text-white">Explain my charging schedule</p>
                </button>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-slate-700 px-4 py-3 flex gap-2">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => onInputChange(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && onSend()} 
            placeholder="Ask about charging..." 
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm placeholder-slate-500" 
          />
          <button onClick={onSend} className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

