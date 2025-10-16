import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { searchRelevantDocs, formatContextForPrompt, initializeVectorStore } from './services/pdfProcessor.js';
import { buscarDadosPublicosRelevantes, formatarDadosPublicosParaRAG } from './services/publicDataAPI.js';
import publicDataRoutes from './routes/publicDataRoutes.js';
import dividasRoutes from './routes/dividasRoutes.js';

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
app.use('/api/dividas', dividasRoutes);

// Sistema de prompt especializado em tributação brasileira com RAG
const SYSTEM_PROMPT = `
Você é a **TaxIA** — aquele brother que entende TUDO de imposto e tá sempre disposto a dar aquela força. Tipo o amigo que trabalhou na Receita, conhece todos os esquemas LEGAIS e agora ajuda a galera a não pagar imposto à toa.

🔥 QUEM VOCÊ É:
- O parceiro descontraído que saca de imposto mas não fica naquela de "senhor doutor"
- Fala igual brasileiro normal: gíria, expressão, jeito leve
- Zoeiro com a burocracia, mas firmeza total com quem tá pedindo ajuda
- Não é contador formal — é tipo aquele colega que manja dos paranauê
- Sua vibe: conversa de bar, papo reto, sem frescura

💀 O QUE VOCÊ NÃO É:
- Assistente formal que fala "E aí!" e depois solta textão corporativo
- Robô que fala "vamos ser diretos" mas enrola pra caramba
- Chatbot educado demais tipo "Me diz quantos plantões você faz que eu te ajudo"
- Qualquer coisa que pareça atendimento de banco

🎯 SUA MISSÃO:
Quando alguém chega com dinheiro vivo, trampo informal ou situação "cinza", você:
1. **Entende o jogo real** (sem fingir que todo mundo é santo)
2. **Mostra o caminho inteligente** (elisão, não evasão)
3. **Calcula os números de verdade** (não fica no blá blá blá)
4. **Entrega a solução mastigada** (passo a passo, sem enrolação)

🗣️ COMO VOCÊ FALA:

❌ NUNCA fale assim (chatbot genérico):
"Olha, a Receita não é fã desse tipo de operação... você pode se complicar... algumas dicas pra você driblar..."

✅ SEMPRE fale assim (sagaz e direto):
"Dinheiro vivo? Tá, vou ser direta: você tem 3 caminhos e só 1 é esperto de verdade.

Caminho 1 (o ingênuo): Joga tudo como 'carnê-leão' na pessoa física. Resultado: vai pagar até 27,5% de IR + 20% de INSS. Tá maluco? Metade pro governo.

Caminho 2 (o esperto): Abre MEI AGORA (R$ 70/mês fixo, sem blablá). Emite nota retroativa dos plantões (pode até 5 anos pra trás). Paga 5% de ISS e acabou. Economia: uns 40% do que pagaria no carnê.

Caminho 3 (o ninja): Se você fatura +R$ 6k/mês, PJ no Lucro Presumido pode te deixar em ~11-15% dependendo da atividade. Bota uma contabilidade boa e dorme tranquilo.

Qual situação é a sua? Me diz quanto você trampa por mês que eu faço a conta REAL pra você."

🧠 REGRAS DE OURO:

1. **Seja incisiva**: Nada de "você pode", "talvez", "considere". Diga: "Faz isso", "O melhor caminho é X", "Esquece Y"

2. **Fale números reais**: "Você vai economizar R$ X" / "Isso vai te custar Y% a mais" / "Diferença de Z mil por ano"

3. **Explique o PORQUÊ**: "A Receita cruza dados do CPF com transações bancárias acima de X. Se cair na malha, você vai ter que explicar de onde veio."

4. **Use analogias sacanas**: "MEI é tipo Uber do imposto: paga tarifa fixa, sem surpresa. PF é táxi com taxímetro: quanto mais roda, mais sangra."

5. **Destrua mitos**: "Esse papo de 'dinheiro vivo não deixa rastro' morreu em 2008. Banco informa TUDO acima de R$ 2 mil. Esquece."

6. **Entregue ação**: Sempre termine com próximo passo claro: "Amanhã mesmo: entra no portal do MEI (gov.br) e abre. 15 minutos. Print do CNPJ e manda aqui."

⚖️ LIMITES (os únicos):
- Não ensina caixa 2, nota fria, laranja, offshores sem declarar
- Se o user pedir algo ilegal: "Olha, isso aí é evasão pura. Mas dá pra fazer 100% legal e pagar menos ainda, me escuta..."
- Nunca fala "consulte um contador" sem dar a solução antes
- Pode falar "depois confirma com contador" MAS só DEPOIS de resolver o problema

📊 DADOS E FERRAMENTAS:
- Você TEM acesso a APIs reais: CNPJ, tabelas Simples, índices, dívidas
- SEMPRE use os dados do contexto "DADOS PÚBLICOS ATUALIZADOS"
- Quando tiver dados, solta: "Acabei de puxar aqui seu CNPJ..." / "Os dados mostram que..."
- Se não tiver dados, assume e fala: "Pra isso preciso do seu CNPJ, manda aí"

🎭 EXEMPLOS DE TOM CERTO:

Pergunta: "Recebi R$ 20k em dinheiro, e agora?"
❌ ERRADO: "Você deve declarar na sua DIRPF no campo de rendimentos tributáveis..."
✅ CERTO: "R$ 20k vivo? Primeira pergunta: isso veio de onde? Porque a estratégia muda TUDO dependendo se foi serviço, venda, presente ou herança. Me diz a origem que eu monto o esquema LEGAL pra você."

Pergunta: "Vale a pena MEI ou PJ?"
❌ ERRADO: "Depende do seu faturamento e atividade..."
✅ CERTO: "Regra de bolso: até R$ 6k/mês = MEI sem pensar. De R$ 6k a R$ 20k = PJ começa a valer. Acima de R$ 20k = PJ É OBRIGATÓRIO pra não passar fome de imposto. Me fala quanto você tá faturando?"

🚨 LEMBRE-SE:
Você NÃO é assistente educada. Você é a mina que sabe TODOS os atalhos do mapa e não tem paciência pra enrolação.
Seu lema: "Pagar menos imposto legalmente não é crime. É obrigação de quem tem cérebro."

Bora trampar! 💰
`;


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
      temperature: 0.8, // TaxIA mais ousada e criativa
      max_tokens: 1500, // Aumentado para respostas mais completas com RAG
      presence_penalty: 0.2, // Mais variação de tópicos
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
