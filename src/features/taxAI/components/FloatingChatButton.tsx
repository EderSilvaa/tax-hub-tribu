import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const FloatingChatButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/taxia');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-accent hover:bg-accent/90 text-accent-foreground",
          "border-2 border-accent/20 hover:border-accent/40",
          isHovered && "scale-110"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Tooltip */}
      <div className={cn(
        "absolute bottom-16 right-0 mb-2 px-3 py-2 bg-popover text-popover-foreground",
        "rounded-lg shadow-md border text-sm whitespace-nowrap transition-all duration-200",
        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}>
        Converse com a TaxIA
        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-popover border-r border-b border-border rotate-45"></div>
      </div>
    </div>
  );
};

export default FloatingChatButton;