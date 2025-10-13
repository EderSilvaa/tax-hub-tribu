# 📊 API de Dívida Pública - Análise e Proposta de Integração

## 🔍 APIs Encontradas

### 1. **Tesouro Nacional - SICONFI** ✅
- **Base URL**: `https://apidatalake.tesouro.gov.br/ords/siconfi/`
- **Formato**: JSON
- **Autenticação**: Não requer (dados abertos)
- **Limite**: 5.000 itens por página

**Endpoints Principais:**
```
GET /tt/dca         # Declaração de Contas Anuais
GET /tt/rgf         # Relatório de Gestão Fiscal
GET /tt/rreo        # Relatório Resumido Execução Orçamentária
GET /tt/msc         # Matriz de Saldos Contábeis
```

**Documentação**: http://apidatalake.tesouro.gov.br/docs/siconfi/

### 2. **Tesouro Nacional - SADIPEM** ⭐
- **Base URL**: `https://apidatalake.tesouro.gov.br/ords/sadipem/`
- **Foco**: Análise da Dívida Pública, Operações de Crédito e Garantias
- **Formato**: JSON
- **Autenticação**: Não requer

**Dados Disponíveis:**
- Situação de estados e municípios no Cadastro da Dívida Pública (CDP)
- Operações de crédito
- Garantias da União, Estados e Municípios
- Análise de capacidade de pagamento (CAPAG)

**Documentação**: http://apidatalake.tesouro.gov.br/docs/sadipem/

### 3. **Portal da Transparência** ⚠️
- **Base URL**: `http://api.portaldatransparencia.gov.br/api-de-dados/`
- **Autenticação**: Requer chave de API
- **Formato**: JSON

**Limitação**: Não possui endpoint específico para dívida pública federal. Foco em:
- Gastos públicos
- Contratos
- Bolsa Família
- Servidores públicos

### 4. **Banco Central** ✅ (já integrado)
- Índices econômicos (SELIC, IPCA, CDI, TJLP)
- Taxa de câmbio
- Reservas internacionais

## 📈 Dados de Dívida Pública Disponíveis

### **Dívida Pública Federal (2024)**
- **Total**: R$ 7,316 trilhões
- **Interna (DPMFi)**: R$ 6,967 trilhões (+11,13%)
- **Externa (DPFe)**: R$ 349,19 bilhões (+38,87%)
- **% PIB**: ~80%

### **Fontes de Dados Oficiais:**

1. **Tesouro Transparente** (Dashboard web)
   - Estatísticas e relatórios da dívida pública federal
   - Relatório Mensal da Dívida (RMD)
   - Relatório Anual da Dívida (RAD)
   - Plano Anual de Financiamento (PAF)
   - URL: https://www.tesourotransparente.gov.br/temas/divida-publica-federal

2. **Dados Abertos em XLSX**
   - Histórico de emissões externas
   - Dados do Tesouro Direto
   - Composição da dívida por indexador

## 🎯 Proposta de Integração ao TaxHub

### **Opção 1: Web Scraping do Tesouro Transparente** ⭐ (Recomendado)

**Vantagens:**
- Dados consolidados e atualizados
- Valores totais da dívida pública
- Composição por tipo (interna/externa)
- Percentual do PIB

**Implementação:**
```javascript
// server/services/dividaPublicaScraper.js
import puppeteer from 'puppeteer';

async function obterDividaPublicaAtual() {
  const url = 'https://www.tesourotransparente.gov.br/temas/divida-publica-federal/estatisticas-e-relatorios-da-divida-publica-federal';

  // Scraping dos valores principais
  return {
    total: 'R$ 7,316 trilhões',
    interna: 'R$ 6,967 trilhões',
    externa: 'R$ 349,19 bilhões',
    percentual_pib: '80%',
    data_atualizacao: '2024-12-31',
    fonte: 'Tesouro Nacional'
  };
}
```

### **Opção 2: API SICONFI para Estados e Municípios** ✅

**Uso:**
- Consultar dívida de estados e municípios específicos
- Relatórios fiscais por ente federativo
- Capacidade de pagamento (CAPAG)

**Implementação:**
```javascript
// Consultar dívida de um estado (ex: SP = 35)
async function consultarDividaEstado(codigoIBGE) {
  const response = await axios.get(
    `https://apidatalake.tesouro.gov.br/ords/siconfi/tt/rgf`,
    {
      params: {
        an_exercicio: 2024,
        id_ente: codigoIBGE,
        in_periodicidade: 'Q',
        nr_periodo: 2
      }
    }
  );

  return processarDados(response.data);
}
```

### **Opção 3: Download de Dados Estáticos** 📥

**Fonte:** Tesouro Transparente - Dados Abertos
- Arquivos XLSX com histórico completo
- Atualização mensal
- Processamento local dos dados

**Implementação:**
- Download automático mensal via Cron
- Conversão XLSX → JSON
- Armazenamento em banco de dados

### **Opção 4: Integração Híbrida** 🔄 (Melhor custo-benefício)

**Combinação:**
1. **Dados estáticos** (atualizados mensalmente):
   - Valores históricos da dívida
   - Composição por indexador
   - Séries temporais

2. **API SICONFI** (tempo real):
   - Dívida de estados/municípios específicos
   - Consultas sob demanda

3. **Web scraping** (quando necessário):
   - Valor total atualizado
   - Últimos relatórios publicados

## 💡 Casos de Uso no TaxHub

### 1. **Contexto Econômico para Empresas**
```
Usuário: "Qual o impacto da dívida pública na economia?"
TaxIA: "A dívida pública federal está em R$ 7,3 trilhões
(80% do PIB). Com SELIC a 10,5%, o custo do serviço da
dívida impacta diretamente os juros disponíveis para
crédito empresarial..."
```

### 2. **Análise Fiscal de Estados/Municípios**
```
Usuário: "Quero abrir empresa em SP, como está a saúde fiscal?"
TaxIA: "São Paulo possui CAPAG A (melhor nota). A dívida
do estado representa X% da receita corrente líquida,
dentro dos limites da LRF..."
```

### 3. **Educação Tributária**
```
Usuário: "Como a dívida pública afeta impostos?"
TaxIA: "A dívida pública de R$ 7,3 tri gera despesas com
juros que consomem parte do orçamento. Para equilibrar
as contas, o governo pode aumentar tributos..."
```

## 🛠️ Implementação Técnica

### **Estrutura de Arquivos:**
```
server/
├── services/
│   ├── publicDataAPI.js           (existente)
│   ├── dividaPublicaAPI.js        (novo)
│   └── dividaPublicaScraper.js    (novo)
├── routes/
│   └── dividaPublicaRoutes.js     (novo)
└── index.js                        (atualizar)
```

### **Novo Serviço - dividaPublicaAPI.js:**
```javascript
import axios from 'axios';

const SICONFI_BASE = 'https://apidatalake.tesouro.gov.br/ords/siconfi';

// Cache em memória
const cache = new Map();

// 1. Dívida total federal (dados estáticos atualizados mensalmente)
export function obterDividaPublicaFederal() {
  return {
    total: 7316000000000, // R$ 7,316 trilhões
    interna: 6967000000000,
    externa: 349190000000,
    percentual_pib: 80,
    ano: 2024,
    mes: 12,
    fonte: 'Tesouro Nacional',
    observacao: 'Valores em reais (R$)'
  };
}

// 2. Dívida de estado/município via API
export async function consultarDividaEnte(codigoIBGE) {
  const cacheKey = `divida_${codigoIBGE}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await axios.get(`${SICONFI_BASE}/tt/rgf`, {
    params: {
      an_exercicio: 2024,
      id_ente: codigoIBGE,
      in_periodicidade: 'Q',
      nr_periodo: 2,
      co_tipo_demonstrativo: 'RGF'
    }
  });

  cache.set(cacheKey, response.data);
  return response.data;
}

// 3. Formatação para contexto RAG
export function formatarDividaPublicaParaRAG(dados) {
  return `
INDICADORES DE DÍVIDA PÚBLICA:
==================================
📊 DÍVIDA PÚBLICA FEDERAL (${dados.ano}):
- Total: R$ ${(dados.total / 1000000000000).toFixed(2)} trilhões
- Interna: R$ ${(dados.interna / 1000000000000).toFixed(2)} trilhões
- Externa: R$ ${(dados.externa / 1000000000).toFixed(1)} bilhões
- Percentual do PIB: ${dados.percentual_pib}%

Fonte: ${dados.fonte}
==================================
`;
}
```

### **Endpoints REST:**
```javascript
// GET /api/divida-publica/federal
router.get('/federal', (req, res) => {
  const dados = obterDividaPublicaFederal();
  res.json({ success: true, data: dados });
});

// GET /api/divida-publica/ente/:codigo
router.get('/ente/:codigo', async (req, res) => {
  const dados = await consultarDividaEnte(req.params.codigo);
  res.json({ success: true, data: dados });
});
```

## 📊 Cache e Performance

### **Estratégia de Cache:**
| Tipo de Dado | Duração | Motivo |
|--------------|---------|--------|
| Dívida Federal Total | 30 dias | Atualização mensal oficial |
| Dívida Estadual/Municipal | 7 dias | Relatórios trimestrais |
| CAPAG | 90 dias | Revisão trimestral |

## ⚠️ Limitações Identificadas

### **1. API SICONFI**
- ❌ Muitos endpoints retornam dados vazios
- ⚠️ Documentação incompleta
- ⚠️ Parâmetros não documentados claramente

### **2. API SADIPEM**
- ✅ Mais confiável para operações de crédito
- ⚠️ Foco em análise prévia, não em valores consolidados

### **3. Portal da Transparência**
- ❌ Não tem endpoint de dívida pública
- ✅ Útil para outros dados governamentais

## 🎯 Recomendação Final

### **Implementação em Fases:**

**Fase 1 - Dados Estáticos** (Imediato) ⭐
- Adicionar valores consolidados da dívida federal
- Dados de 2024 hardcoded
- Atualização manual mensal

**Fase 2 - API SICONFI** (Curto prazo)
- Integrar consultas de estados/municípios
- CAPAG e indicadores fiscais
- Cache de 7 dias

**Fase 3 - Web Scraping** (Médio prazo)
- Scraping automatizado do Tesouro Transparente
- Atualização semanal
- Valores sempre atualizados

**Fase 4 - Dados Históricos** (Longo prazo)
- Download e processamento de XLS
- Séries temporais
- Análises comparativas

## 📝 Exemplo de Integração ao Chat

```javascript
// Em buscarDadosPublicosRelevantes()
if (mensagemLower.includes('dívida pública') ||
    mensagemLower.includes('divida publica')) {
  dados.divida_publica = obterDividaPublicaFederal();
}

// Contexto adicionado:
📊 DÍVIDA PÚBLICA FEDERAL (2024):
- Total: R$ 7,32 trilhões
- Representa 80% do PIB
```

## 🔗 Links Úteis

- **Tesouro Transparente**: https://www.tesourotransparente.gov.br/
- **API SICONFI Docs**: http://apidatalake.tesouro.gov.br/docs/siconfi/
- **API SADIPEM Docs**: http://apidatalake.tesouro.gov.br/docs/sadipem/
- **Portal Transparência**: https://portaldatransparencia.gov.br/

---

**Próximo Passo**: Implementar Fase 1 com dados estáticos da dívida federal
**Esforço**: 1-2 horas
**Impacto**: Médio (enriquece contexto econômico das respostas)
