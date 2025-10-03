import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { searchRelevantDocs, formatContextForPrompt, initializeVectorStore } from './services/pdfProcessor.js';

// Carregar variáveis de ambiente (busca no diretório pai)
dotenv.config({ path: '../.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar OpenAI Client (seguindo boas práticas oficiais)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Sistema de prompt especializado em tributação brasileira com RAG
const SYSTEM_PROMPT = `Você é a TaxIA, uma assistente especializada em tributação brasileira.

CARACTERÍSTICAS:
- Especialista em regimes tributários (MEI, Simples Nacional, Lucro Presumido, Lucro Real)
- Conhece profundamente a legislação tributária brasileira, incluindo a Reforma Tributária
- Ajuda empresários a entender e escolher o melhor regime tributário
- Explica de forma clara e didática conceitos complexos
- Sempre contextualiza as respostas para a realidade brasileira
- Possui conhecimento técnico atualizado sobre tributação

DIRETRIZES:
1. SEMPRE priorize as informações do CONTEXTO RELEVANTE DOS DOCUMENTOS quando disponível
2. Integre naturalmente as informações dos documentos na sua resposta, sem citar fontes explicitamente
3. Responda como se o conhecimento fosse seu próprio, de forma fluida e orgânica
4. Use linguagem acessível, mas técnica quando necessário
5. Sempre mencione quando uma informação pode necessitar confirmação com contador
6. Forneça exemplos práticos quando relevante
7. Seja proativa em sugerir próximos passos ou simulações
8. Mantenha o foco em tributação e questões fiscais
9. Se houver conflito entre seu conhecimento base e os documentos, priorize SEMPRE os DOCUMENTOS

IMPORTANTE:
- NÃO cite fontes, documentos ou páginas nas suas respostas
- NÃO diga "de acordo com", "conforme documento", "segundo material"
- Apresente a informação de forma direta e confiante
- Fale como especialista que domina o assunto

LIMITAÇÕES:
- Não forneça conselhos jurídicos específicos
- Sempre recomende consultar um contador para decisões importantes

Responda de forma útil, clara e sempre pensando no melhor interesse do empresário brasileiro.`;

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint principal do chat com RAG
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Campo "message" é obrigatório e deve ser uma string'
      });
    }

    console.log(`\n💬 Nova mensagem: "${message.substring(0, 60)}..."`);

    // ETAPA 1: Buscar documentos relevantes (RAG)
    console.log('🔍 Buscando documentos relevantes...');
    const relevantDocs = await searchRelevantDocs(message, 4);
    console.log(`✓ ${relevantDocs.length} documentos encontrados`);

    // ETAPA 2: Formatar contexto com documentos
    const contextPrompt = formatContextForPrompt(relevantDocs);

    // ETAPA 3: Preparar mensagens para OpenAI com contexto RAG
    const systemPromptWithContext = SYSTEM_PROMPT + contextPrompt;

    const messages = [
      { role: 'system', content: systemPromptWithContext },
      ...history,
      { role: 'user', content: message }
    ];

    // ETAPA 4: Chamar OpenAI API usando SDK oficial
    console.log('🤖 Gerando resposta com IA...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1500, // Aumentado para respostas mais completas com RAG
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('Nenhuma resposta recebida da OpenAI');
    }

    console.log('✅ Resposta gerada com sucesso\n');

    // ETAPA 5: Retornar resposta com metadata
    res.json({
      message: assistantMessage,
      metadata: {
        model: completion.model,
        tokens_used: completion.usage?.total_tokens || 0,
        request_id: completion.id,
        sources: relevantDocs.map(doc => ({
          file: doc.source,
          page: doc.page
        }))
      }
    });

  } catch (error) {
    console.error('Erro ao processar chat:', error);

    // Error handling robusto (seguindo boas práticas da OpenAI)
    if (error.status === 401) {
      return res.status(500).json({
        error: 'Erro de autenticação com OpenAI. Verifique a API key.'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Limite de requisições atingido. Tente novamente em alguns instantes.'
      });
    }

    if (error.status === 500) {
      return res.status(503).json({
        error: 'Serviço da OpenAI temporariamente indisponível.'
      });
    }

    res.status(500).json({
      error: 'Erro ao processar sua mensagem. Tente novamente em alguns instantes.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Iniciar servidor e vector store
app.listen(PORT, async () => {
  console.log(`\n🚀 Servidor TaxIA rodando em http://localhost:${PORT}`);
  console.log(`📍 Endpoint de chat: http://localhost:${PORT}/api/chat`);
  console.log(`💚 Health check: http://localhost:${PORT}/health\n`);

  // Validar API key ao iniciar
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  AVISO: OPENAI_API_KEY não configurada no .env.local');
  }

  // Pré-carregar vector store para melhor performance
  console.log('🔄 Inicializando sistema RAG...');
  try {
    await initializeVectorStore();
    console.log('✅ Sistema RAG pronto!\n');
  } catch (error) {
    console.error('❌ Erro ao inicializar RAG:', error.message);
    console.warn('⚠️  O sistema continuará funcionando, mas sem acesso aos documentos.\n');
  }
});
