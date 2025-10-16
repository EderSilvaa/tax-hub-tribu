import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, SendHorizontal, Plus, ArrowLeft, RotateCcw, Trash2, Sparkles, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { useTaxAI } from '../hooks/useTaxAI';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const TaxAIChat: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, clearMessages, isLoading } = useTaxAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 3);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messages.length]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsTyping(true);

    try {
      await sendMessage(userMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Deseja limpar toda a conversa?')) {
      clearMessages();
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const quickQuestions = [
    "Qual o melhor regime tributário para minha startup?",
    "Como funciona o Simples Nacional?",
    "Posso migrar do MEI para outro regime?",
    "Quais são os principais tributos para empresas?"
  ];

  return (
    <div className="flex flex-col h-screen bg-background safe-area-top safe-area-bottom">
      {/* Header - Otimizado para Mobile */}
      <div className="border-b bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoHome}
                className="hover:bg-accent/50 touch-target flex-shrink-0"
                aria-label="Voltar para início"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2 min-w-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-accent-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                    TaxIA
                    <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Assistente especializada em tributação
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 touch-target"
                  aria-label="Limpar conversa"
                >
                  <Trash2 className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Limpar</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto scroll-smooth relative">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            // Welcome Screen - Otimizado para Mobile
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div className="mb-6 sm:mb-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent to-accent-foreground/20 flex items-center justify-center mb-4 animate-scale-in">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Como a TaxIA pode te ajudar?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Sou uma assistente especializada em tributação brasileira. Posso te ajudar com
                  regimes tributários, cálculos, dúvidas fiscais e muito mais.
                </p>
              </div>

              {/* Quick Questions - Pills para Mobile */}
              <div className="w-full max-w-2xl space-y-3 animate-fade-in">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Perguntas frequentes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setMessage(question);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="touch-target px-4 py-3 text-left text-sm bg-accent/5 hover:bg-accent/10 border border-accent/20 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 no-select group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex-1 text-foreground group-hover:text-accent transition-colors">
                          {question}
                        </span>
                        <SendHorizontal className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Messages List
            <div className="space-y-6">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                />
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <div className="absolute bottom-6 right-6 animate-scale-in">
            <Button
              size="icon"
              onClick={scrollToBottom}
              className="rounded-full shadow-lg bg-accent text-accent-foreground hover:bg-accent/90 h-12 w-12"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Input Area - Otimizado para Mobile */}
      <div className="border-t bg-card/95 backdrop-blur-sm p-3 sm:p-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pergunte sobre tributação..."
                className="pr-12 sm:pr-14 py-3 sm:py-6 text-sm sm:text-base bg-background border-border/50 focus:border-accent focus:ring-accent shadow-sm touch-friendly"
                disabled={isLoading}
                aria-label="Digite sua pergunta"
              />

              <div className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "touch-target h-9 w-9 sm:h-10 sm:w-10 rounded-lg",
                    message.trim() && !isLoading
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm"
                      : "text-muted-foreground cursor-not-allowed"
                  )}
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  aria-label={isLoading ? "Enviando mensagem" : "Enviar mensagem"}
                >
                  {isLoading ? (
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <SendHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Info - Responsivo */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 px-1">
            <p className="text-xs text-muted-foreground">
              A TaxIA pode cometer erros. Verifique informações importantes.
            </p>
            {messages.length > 0 && (
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {messages.length} {messages.length === 1 ? 'mensagem' : 'mensagens'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxAIChat;