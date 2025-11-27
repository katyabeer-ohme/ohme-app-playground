import React, { useRef, useEffect } from 'react';
import { Sparkles, Send } from 'lucide-react';

export default function AIChatView({ messages, input, onInputChange, onSend }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 px-4 pt-6 pb-4 bg-slate-900 z-20 border-b border-slate-700">
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

      {/* Messages Area - Scrollable below header */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pt-28 pb-[88px]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center pt-4 pb-4">
            <Sparkles className="w-12 h-12 text-cyan-400 mb-3" />
            <p className="text-base font-semibold text-white mb-4 text-center">What would you like to know?</p>
            <div className="grid grid-cols-1 gap-2 w-full">
              <button 
                onClick={() => {
                  onInputChange('How can I save more money?');
                  setTimeout(onSend, 100);
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left transition text-xs font-medium text-slate-300"
              >
                How can I save more money?
              </button>
              <button 
                onClick={() => {
                  onInputChange('What is V2G and how does it work?');
                  setTimeout(onSend, 100);
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left transition text-xs font-medium text-slate-300"
              >
                What is V2G and how does it work?
              </button>
              <button 
                onClick={() => {
                  onInputChange('Explain my charging schedule');
                  setTimeout(onSend, 100);
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left transition text-xs font-medium text-slate-300"
              >
                Explain my charging schedule
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

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-[72px] left-0 right-0 px-3 py-2 border-t border-slate-700 bg-slate-900 z-30 shadow-lg">
        <div className="flex gap-2 items-center">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => onInputChange(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && onSend()} 
            placeholder="Ask about charging..." 
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
          />
          <button 
            onClick={onSend} 
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

