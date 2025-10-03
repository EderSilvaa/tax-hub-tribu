// 🔑 OpenAI Client - Shared utility for Edge Functions
//
// INSTRUÇÕES PARA CONFIGURAR A API KEY:
//
// 1. Vá para o dashboard do Supabase:
//    https://app.supabase.com/project/nfnyetjuhacerxsbkeag/settings/edge-functions
//
// 2. Clique em "Add new secret"
//
// 3. Configure:
//    Name: OPENAI_API_KEY
//    Value: sua-chave-openai-aqui
//
// 4. Clique "Save"
//
// A API key será acessível via Deno.env.get('OPENAI_API_KEY') nas edge functions

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
  usage: {
    total_tokens: number;
    prompt_tokens: number;
    completion_tokens: number;
  };
}

export class OpenAIClient {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    // A API key vem das environment variables do Supabase
    // Configure em: Settings → Edge Functions → Secrets
    this.apiKey = Deno.env.get('OPENAI_API_KEY') || '';

    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY não configurada no Supabase Secrets');
    }
  }

  async createChatCompletion(
    messages: ChatMessage[],
    options: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
      presence_penalty?: number;
      frequency_penalty?: number;
    } = {}
  ): Promise<OpenAIResponse> {
    const {
      model = 'gpt-4o-mini',
      temperature = 0.7,
      max_tokens = 1000,
      presence_penalty = 0.1,
      frequency_penalty = 0.1,
    } = options;

    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        presence_penalty,
        frequency_penalty,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    return await response.json();
  }
}

// Tax-specific prompts
export const TAX_SYSTEM_PROMPT = `Você é a TaxIA, uma assistente especializada em tributação brasileira.

CARACTERÍSTICAS:
- Especialista em regimes tributários (MEI, Simples Nacional, Lucro Presumido, Lucro Real)
- Conhece as particularidades da legislação tributária brasileira
- Ajuda empresários a entender e escolher o melhor regime tributário
- Explica de forma clara e didática conceitos complexos
- Sempre contextualiza as respostas para a realidade brasileira

DIRETRIZES:
1. Seja precisa e atualizada com a legislação brasileira
2. Use linguagem acessível, mas técnica quando necessário
3. Sempre mencione quando uma informação pode necessitar confirmação com contador
4. Forneça exemplos práticos quando relevante
5. Seja proativa em sugerir próximos passos ou simulações
6. Mantenha o foco em tributação e questões fiscais

LIMITAÇÕES:
- Não forneça conselhos jurídicos específicos
- Sempre recomende consultar um contador para decisões importantes
- Mantenha-se atualizada apenas com informações até sua data de corte

Responda de forma útil, clara e sempre pensando no melhor interesse do empresário brasileiro.`;

// Utility function to prepare messages for tax consultation
export function prepareTaxMessages(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): ChatMessage[] {
  return [
    { role: 'system', content: TAX_SYSTEM_PROMPT },
    ...conversationHistory.slice(-10), // Keep last 10 messages for context
    { role: 'user', content: userMessage }
  ];
}