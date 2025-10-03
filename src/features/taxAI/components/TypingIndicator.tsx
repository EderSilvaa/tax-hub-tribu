import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 max-w-4xl mr-auto justify-start">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <Bot className="w-4 h-4 text-accent-foreground" />
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div className="px-4 py-3 rounded-2xl bg-muted text-foreground mr-12">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">TaxIA está digitando</span>
            <div className="flex gap-1 ml-2">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;