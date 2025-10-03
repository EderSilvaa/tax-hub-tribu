import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  message: string;
  conversation_history?: ChatMessage[];
  session_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, conversation_history = [], session_id } = await req.json() as ChatRequest;

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Sistema de prompt especializado em tributação brasileira
    const systemPrompt = `Você é a TaxIA, uma assistente especializada em tributação brasileira.

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

    // Preparar mensagens para OpenAI
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversation_history,
      { role: 'user', content: message }
    ];

    // Chamar OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const openAIData = await openAIResponse.json();
    const assistantMessage = openAIData.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from OpenAI');
    }

    // Salvar a conversa no Supabase (opcional)
    if (session_id) {
      try {
        // Salvar mensagem do usuário
        await supabaseClient
          .from('tax_ai_messages')
          .insert({
            session_id,
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
          });

        // Salvar resposta da IA
        await supabaseClient
          .from('tax_ai_messages')
          .insert({
            session_id,
            role: 'assistant',
            content: assistantMessage,
            timestamp: new Date().toISOString(),
            metadata: {
              model_used: 'gpt-4o-mini',
              tokens_used: openAIData.usage?.total_tokens || 0,
              response_time_ms: Date.now()
            }
          });
      } catch (dbError) {
        console.error('Database save error:', dbError);
        // Não falha a requisição se o DB falhar
      }
    }

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        session_id,
        metadata: {
          model: 'gpt-4o-mini',
          tokens_used: openAIData.usage?.total_tokens || 0
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'Ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});