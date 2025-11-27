import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

export default function CustomerServiceRatingDrawer({ isOpen, onClose, caseNumber, callSummary, actionsTaken }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Handle rating submission
    // TODO: Implement rating submission logic
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/60 animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="fixed left-0 right-0 bottom-0 max-h-[85vh] bg-brand-dark flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-text-primary">Rate Your Experience</h2>
            <p className="text-xs text-text-tertiary mt-0.5">Case #{caseNumber}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-text-tertiary hover:text-text-primary hover:bg-surface-elevated p-2 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Star Rating */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-text-primary mb-4 text-center">
              How well was your issue resolved?
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-brand-primary text-brand-primary'
                        : 'text-text-tertiary'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-text-tertiary mt-3">
                {rating === 5 && "Excellent! We're glad we could help."}
                {rating === 4 && "Great! Thanks for your feedback."}
                {rating === 3 && "Good. We'll work to improve."}
                {rating === 2 && "We're sorry. We'll do better."}
                {rating === 1 && "We apologize. Let us make this right."}
              </p>
            )}
          </div>

          {/* Discussion Summary */}
          {callSummary && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-text-primary mb-3">Discussion Summary</h3>
              <div className="bg-surface-card rounded-lg p-4 border border-border-light">
                <p className="text-sm text-text-secondary leading-relaxed">{callSummary}</p>
              </div>
            </div>
          )}

          {/* Actions Taken */}
          {actionsTaken && actionsTaken.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-text-primary mb-3">Actions Taken</h3>
              <div className="bg-surface-card rounded-lg p-4 border border-border-light">
                <ul className="space-y-2">
                  {actionsTaken.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-brand-primary mt-1">•</span>
                      <span className="flex-1">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-light bg-surface-elevated flex-shrink-0">
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full py-3 bg-brand-primary hover:bg-brand-primary-600 disabled:bg-surface-card disabled:text-text-tertiary disabled:cursor-not-allowed text-brand-dark rounded-lg font-medium text-sm transition"
          >
            {rating === 0 ? 'Please select a rating' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );
}

