import React, { useRef, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function AIChatView({ messages, input, onInputChange, onSend }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="pb-24 flex flex-col" style={{ minHeight: 'calc(100vh - 112px)' }}>
      {/* Header */}
      <div className="px-4 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Energy Advisor</h2>
            <p className="text-xs text-slate-400">Powered by AI</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 mb-4 pb-24">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-8">
            <Sparkles className="w-16 h-16 text-cyan-400 mb-4" />
            <p className="text-base font-semibold text-white mb-6 text-center">What would you like to know?</p>
            <div className="grid grid-cols-1 gap-3 w-full">
              <button 
                onClick={() => {
                  onInputChange('How can I save more money?');
                  setTimeout(onSend, 100);
                }}
                className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition"
              >
                <p className="text-sm font-medium text-white">How can I save more money?</p>
              </button>
              <button 
                onClick={() => {
                  onInputChange('What is V2G and how does it work?');
                  setTimeout(onSend, 100);
                }}
                className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition"
              >
                <p className="text-sm font-medium text-white">What is V2G and how does it work?</p>
              </button>
              <button 
                onClick={() => {
                  onInputChange('Explain my charging schedule');
                  setTimeout(onSend, 100);
                }}
                className="px-4 py-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-left transition"
              >
                <p className="text-sm font-medium text-white">Explain my charging schedule</p>
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-lg ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sticky */}
      <div className="fixed bottom-24 left-0 right-0 px-4 border-t border-slate-700 pt-3 pb-2 bg-slate-900 z-10">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => onInputChange(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && onSend()} 
            placeholder="Ask about charging..." 
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
          />
          <button 
            onClick={onSend} 
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

