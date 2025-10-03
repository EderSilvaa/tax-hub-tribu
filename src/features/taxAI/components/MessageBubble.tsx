import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 max-w-4xl animate-fade-in",
      isUser ? "ml-auto justify-end" : "mr-auto justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Bot className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>
      )}

      <div className={cn(
        "flex flex-col",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "px-4 py-3 rounded-2xl max-w-2xl",
          isUser
            ? "bg-accent text-accent-foreground ml-12"
            : "bg-muted text-foreground mr-12"
        )}>
          <div className={cn(
            "text-sm leading-relaxed",
            !isUser && "prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2 prose-strong:font-semibold prose-strong:text-foreground prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-a:text-accent-foreground prose-a:underline"
          )}>
            {isUser ? (
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-1 px-2">
          {formatDistanceToNow(message.timestamp, {
            addSuffix: true,
            locale: ptBR
          })}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;