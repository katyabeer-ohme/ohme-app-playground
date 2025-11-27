import React, { useState } from 'react';
import { X, Bot } from 'lucide-react';

export default function AITroubleshootDrawer({ isOpen, onClose, onErrorResolved }) {
  const [step, setStep] = useState(1);
  const [conversationHistory, setConversationHistory] = useState([
    { role: 'ai', text: 'I can see there is an issue with the car response. Lets try to resolve it. First, can you please check if your car fulll?' }
  ]);

  if (!isOpen) return null;

  const addMessage = (role, text) => {
    setConversationHistory(prev => [...prev, { role, text }]);
  };

  const handleCarFull = (isFull) => {
    addMessage('user', isFull ? 'Yes' : 'No');
    
    if (isFull) {
      // Car is full
      addMessage('ai', "Ohme couldn't tell that your car is full. Please unplug your car.");
      setStep('ended');
    } else {
      // Car not full
      addMessage('ai', "You may have some conflicting settings in your car's app. Can you check?");
      setStep(2);
    }
  };

  const handleCanCheck = (canCheck) => {
    addMessage('user', canCheck ? 'Yes' : 'No');
    
    if (canCheck) {
      addMessage('ai', 'Did you find any issues?');
      setStep(3);
    } else {
      addMessage('ai', "No problem. You can contact support at support@ohme.com or try again later.");
      setStep('ended');
    }
  };

  const handleFoundIssues = (resolved) => {
    addMessage('user', resolved ? 'Yes, I resolved them' : 'No');
    
    if (resolved) {
      addMessage('ai', 'Great! Resuming charging');
      onErrorResolved();
      setStep('ended');
    } else {
      onErrorResolved();
      setStep('ended');
    }
  };

  const handleClose = () => {
    // Reset for next time
    setStep(1);
    setConversationHistory([{ role: 'ai', text: 'Is your car full?' }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={handleClose}></div>
      <div className="fixed left-0 right-0 bottom-0 max-h-[85vh] bg-brand-dark flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-brand-primary" />
            </div>
            <h2 className="text-lg font-bold text-text-primary">AI Assistant</h2>
          </div>
          <button 
            onClick={handleClose} 
            className="text-text-tertiary hover:text-text-primary hover:bg-surface-elevated p-2 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Chat Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-4">
            {conversationHistory.map((message, idx) => (
              <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'ai' && (
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div className="bg-surface-card border border-border-light rounded-lg px-4 py-3">
                      <p className="text-sm text-text-primary">{message.text}</p>
                    </div>
                  </div>
                )}
                {message.role === 'user' && (
                  <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-lg px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-text-primary">{message.text}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Action Buttons */}
            {step === 1 && (
              <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-bottom duration-300">
                <button
                  onClick={() => handleCarFull(true)}
                  className="bg-brand-primary hover:bg-brand-primary-600 text-brand-dark px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleCarFull(false)}
                  className="bg-surface-card hover:bg-surface-hover border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  No
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-bottom duration-300">
                <button
                  onClick={() => handleCanCheck(true)}
                  className="bg-brand-primary hover:bg-brand-primary-600 text-brand-dark px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleCanCheck(false)}
                  className="bg-surface-card hover:bg-surface-hover border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  No
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-bottom duration-300">
                <button
                  onClick={() => handleFoundIssues(true)}
                  className="bg-brand-primary hover:bg-brand-primary-600 text-brand-dark px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Yes, I resolved them
                </button>
                <button
                  onClick={() => handleFoundIssues(false)}
                  className="bg-surface-card hover:bg-surface-hover border border-border text-text-primary px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

