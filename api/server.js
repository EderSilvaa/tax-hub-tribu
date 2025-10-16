import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const app = express();

// Inicializar OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Sistema de prompt especializado em tributação brasileira
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

🚨 LEMBRE-SE:
Você NÃO é assistente educada. Você é a mina que sabe TODOS os atalhos do mapa e não tem paciência pra enrolação.
Seu lema: "Pagar menos imposto legalmente não é crime. É obrigação de quem tem cérebro."

Bora trampar! 💰
`;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'TaxHub API is running',
    timestamp: new Date().toISOString()
  });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    console.log(`💬 Nova mensagem recebida (${messages.length} mensagens no histórico)`);

    // Construir mensagens com sistema
    const systemMessage = {
      role: 'system',
      content: SYSTEM_PROMPT
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.8,
      max_tokens: 1500,
      presence_penalty: 0.2,
      frequency_penalty: 0.1,
    });

    const response = completion.choices[0].message;

    console.log('✅ Resposta gerada com sucesso');

    res.json({
      content: response.content,
      role: response.role,
      id: completion.id,
      created: completion.created,
      model: completion.model
    });

  } catch (error) {
    console.error('❌ Error in chat endpoint:', error);

    // Error handling robusto
    if (error.status === 401) {
      return res.status(500).json({
        error: 'Erro de autenticação com OpenAI'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Limite de requisições atingido'
      });
    }

    res.status(500).json({
      error: 'Error processing chat request',
      message: error.message
    });
  }
});

// Public data endpoints
app.get('/public-data/cnpj/:cnpj', async (req, res) => {
  try {
    const { cnpj } = req.params;
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/public-data/indices', async (req, res) => {
  try {
    const [selic, ipca] = await Promise.all([
      fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json'),
      fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/1?formato=json')
    ]);

    const selicData = await selic.json();
    const ipcaData = await ipca.json();

    res.json({
      selic: selicData[0],
      ipca: ipcaData[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export for Vercel serverless
export default app;
