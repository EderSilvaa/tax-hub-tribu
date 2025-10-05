import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { searchRelevantDocs, formatContextForPrompt, initializeVectorStore } from './services/pdfProcessor.js';
import { buscarDadosPublicosRelevantes, formatarDadosPublicosParaRAG } from './services/publicDataAPI.js';
import publicDataRoutes from './routes/publicDataRoutes.js';

// Carregar variáveis de ambiente (busca no diretório pai)
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar OpenAI Client (seguindo boas práticas oficiais)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Rotas de APIs públicas
app.use('/api/public-data', publicDataRoutes);

// Sistema de prompt especializado em tributação brasileira com RAG
const SYSTEM_PROMPT = `Você é a TaxIA, uma assistente especializada em tributação brasileira com ACESSO A DADOS PÚBLICOS EM TEMPO REAL.

CAPACIDADES ESPECIAIS:
✅ VOCÊ TEM ACESSO A APIs PÚBLICAS BRASILEIRAS:
- Consulta CNPJ via BrasilAPI (dados atualizados da Receita Federal)
- Índices econômicos do Banco Central (SELIC, IPCA, CDI, TJLP)
- Tabelas do Simples Nacional 2024 (todas as faixas e alíquotas)
- Lista de bancos e feriados nacionais

✅ VOCÊ PODE E DEVE:
- Consultar CNPJs quando solicitado
- Fornecer dados REAIS e ATUALIZADOS de empresas
- Usar tabelas oficiais do Simples Nacional
- Informar índices econômicos atuais

CARACTERÍSTICAS:
- Especialista em regimes tributários (MEI, Simples Nacional, Lucro Presumido, Lucro Real)
- Conhece profundamente a legislação tributária brasileira, incluindo a Reforma Tributária
- TEM ACESSO A DADOS PÚBLICOS OFICIAIS EM TEMPO REAL
- Ajuda empresários a entender e escolher o melhor regime tributário
- Explica de forma clara e didática conceitos complexos
- Sempre contextualiza as respostas para a realidade brasileira

DIRETRIZES:
1. SEMPRE priorize as informações de DADOS PÚBLICOS ATUALIZADOS quando disponíveis
2. Use dados REAIS de CNPJ, índices e tabelas oficiais
3. SEMPRE que houver dados públicos no contexto, USE-OS para responder
4. Integre naturalmente as informações dos documentos e APIs públicas
5. Responda como se o conhecimento fosse seu próprio, de forma fluida e orgânica
6. Use linguagem acessível, mas técnica quando necessário
7. Sempre mencione quando uma informação pode necessitar confirmação com contador
8. Forneça exemplos práticos quando relevante
9. Se houver DADOS PÚBLICOS ATUALIZADOS, priorize-os sobre conhecimento base

IMPORTANTE - SOBRE DADOS PÚBLICOS:
✅ VOCÊ TEM acesso a APIs públicas e PODE consultar CNPJs
✅ VOCÊ POSSUI dados atualizados do Simples Nacional, SELIC, IPCA
✅ Quando houver dados no "DADOS PÚBLICOS ATUALIZADOS" ou "CONTEXTO", USE-OS
❌ NÃO diga que "não pode consultar" quando os dados estão no contexto
❌ NÃO cite fontes, documentos ou páginas nas suas respostas
❌ NÃO diga "de acordo com", "conforme documento"
✅ Apresente os dados de forma direta e confiante

LIMITAÇÕES:
- Não forneça conselhos jurídicos específicos
- Sempre recomende consultar um contador para decisões importantes

Responda de forma útil, clara, usando DADOS REAIS quando disponíveis no contexto.`;

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

    // ETAPA 1: Buscar dados públicos relevantes
    console.log('🌐 Buscando dados públicos...');
    const dadosPublicos = await buscarDadosPublicosRelevantes(message);
    const publicDataContext = Object.keys(dadosPublicos).length > 0
      ? formatarDadosPublicosParaRAG(dadosPublicos)
      : '';

    if (publicDataContext) {
      console.log(`✓ Dados públicos obtidos: ${Object.keys(dadosPublicos).join(', ')}`);
    }

    // ETAPA 2: Buscar documentos relevantes (RAG)
    console.log('🔍 Buscando documentos relevantes...');
    const relevantDocs = await searchRelevantDocs(message, 4);
    console.log(`✓ ${relevantDocs.length} documentos encontrados`);

    // ETAPA 3: Formatar contexto com documentos
    const contextPrompt = formatContextForPrompt(relevantDocs);

    // ETAPA 4: Preparar mensagens para OpenAI com contexto RAG + dados públicos
    const systemPromptWithContext = SYSTEM_PROMPT + publicDataContext + contextPrompt;

    const messages = [
      { role: 'system', content: systemPromptWithContext },
      ...history,
      { role: 'user', content: message }
    ];

    // ETAPA 5: Chamar OpenAI API usando SDK oficial
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

    // ETAPA 6: Retornar resposta com metadata
    res.json({
      message: assistantMessage,
      metadata: {
        model: completion.model,
        tokens_used: completion.usage?.total_tokens || 0,
        request_id: completion.id,
        sources: relevantDocs.map(doc => ({
          file: doc.source,
          page: doc.page
        })),
        public_data_used: Object.keys(dadosPublicos)
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
