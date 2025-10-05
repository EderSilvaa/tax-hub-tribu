import { useState, useCallback } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatResponse {
  message: string;
  metadata?: {
    model: string;
    tokens_used: number;
    request_id: string;
  };
}

// URL do servidor backend
const API_URL = 'http://localhost:3001/api/chat';

export const useTaxAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Preparar histórico da conversa para contexto
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Chamar backend Express com timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar mensagem');
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);

      let errorMsg = 'Erro desconhecido';
      let userFriendlyMsg = 'Desculpe, ocorreu um erro temporário. Por favor, tente novamente em alguns instantes.';

      if (err instanceof Error) {
        errorMsg = err.message;

        if (err.name === 'AbortError') {
          errorMsg = 'Timeout: requisição demorou mais de 60 segundos';
          userFriendlyMsg = 'A requisição demorou muito tempo. Por favor, tente novamente com uma pergunta mais específica.';
        }
      }

      setError(errorMsg);

      // Fallback: resposta de erro amigável
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: userFriendlyMsg,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const retryLastMessage = useCallback(() => {
    if (messages.length >= 2) {
      const lastUserMessage = messages
        .slice()
        .reverse()
        .find(msg => msg.role === 'user');

      if (lastUserMessage) {
        // Remove a última resposta de erro e tenta novamente
        setMessages(prev => prev.slice(0, -1));
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  return {
    messages,
    sendMessage,
    clearMessages,
    retryLastMessage,
    isLoading,
    error
  };
};