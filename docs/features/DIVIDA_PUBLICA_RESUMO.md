# 💰 API de Dívida Pública - Resumo Executivo

## 🎯 O Que Foi Encontrado

Identifiquei **3 APIs governamentais** para dados de dívida pública brasileira:

### 1. ⭐ **Tesouro Nacional - SICONFI**
```
✅ Dados abertos (sem autenticação)
✅ Formato JSON
✅ Dívida de estados e municípios
⚠️ Muitos endpoints vazios
```

### 2. ⭐ **Tesouro Nacional - SADIPEM**
```
✅ Operações de crédito
✅ Capacidade de pagamento (CAPAG)
✅ Análise de dívida por ente
⚠️ Foco em análise prévia
```

### 3. ❌ **Portal da Transparência**
```
❌ Não possui endpoint de dívida pública
✅ Útil para outros dados (contratos, gastos)
```

## 📊 Dados Disponíveis

### **Dívida Pública Federal (2024)**
```
💰 Total:    R$ 7,316 trilhões
📈 Interna:  R$ 6,967 trilhões (+11,13%)
🌍 Externa:  R$ 349,19 bilhões (+38,87%)
📊 % PIB:    80%
```

### **Fontes Oficiais**
- ✅ Tesouro Transparente (dashboard web)
- ✅ Relatório Mensal da Dívida (RMD)
- ✅ Dados abertos em XLSX
- ✅ API SICONFI (estados/municípios)

## 💡 Como Integrar ao TaxHub

### **Opção Recomendada: Implementação em Fases** ⭐

#### **Fase 1 - Dados Estáticos** (1-2 horas)
```javascript
// Valores consolidados hardcoded
const DIVIDA_PUBLICA_2024 = {
  total: 7316000000000,
  interna: 6967000000000,
  externa: 349190000000,
  percentual_pib: 80
};
```

**Vantagens:**
- ✅ Implementação rápida
- ✅ Sem dependência de API externa
- ✅ Atualização manual mensal

#### **Fase 2 - API Estados/Municípios** (3-4 horas)
```javascript
// Consultar dívida de um estado
GET https://apidatalake.tesouro.gov.br/ords/siconfi/tt/rgf
  ?id_ente=35  // São Paulo
  &an_exercicio=2024
```

#### **Fase 3 - Web Scraping** (5-8 horas)
```javascript
// Scraping do Tesouro Transparente
// Valores sempre atualizados
```

## 🎯 Casos de Uso

### 1. **Contexto Econômico**
```
Pergunta: "Como está a situação fiscal do Brasil?"

TaxIA: "A dívida pública federal está em R$ 7,3 trilhões
(80% do PIB). Com SELIC a 10,5%, isso impacta os juros
disponíveis para crédito empresarial..."
```

### 2. **Análise por Estado**
```
Pergunta: "Quero abrir empresa em SP, como está a dívida?"

TaxIA: "São Paulo possui CAPAG A (melhor nota de
capacidade de pagamento). A situação fiscal é sólida..."
```

### 3. **Educação Tributária**
```
Pergunta: "Por que os impostos são altos?"

TaxIA: "O Brasil possui dívida de 80% do PIB, o que gera
despesas com juros. Para equilibrar as contas..."
```

## 🔧 Implementação Técnica

### **Arquivos a Criar:**
```
server/
├── services/
│   └── dividaPublicaAPI.js    (NOVO)
├── routes/
│   └── dividaPublicaRoutes.js (NOVO)
└── index.js                    (atualizar)
```

### **Código Base:**
```javascript
// server/services/dividaPublicaAPI.js
export function obterDividaPublicaFederal() {
  return {
    total: 7.316,          // trilhões
    interna: 6.967,
    externa: 0.349,
    percentual_pib: 80,
    ano: 2024,
    mes: 12,
    fonte: 'Tesouro Nacional'
  };
}

// Formatação para RAG
export function formatarDividaParaRAG(dados) {
  return `
📊 DÍVIDA PÚBLICA FEDERAL (${dados.ano}):
- Total: R$ ${dados.total} trilhões
- Percentual do PIB: ${dados.percentual_pib}%
`;
}
```

### **Integração ao Chat:**
```javascript
// Em buscarDadosPublicosRelevantes()
if (mensagem.includes('dívida')) {
  dados.divida = obterDividaPublicaFederal();
}
```

## 📈 Benefícios

### **Para Usuários:**
- ✅ Contexto econômico nas respostas
- ✅ Análise fiscal de estados/municípios
- ✅ Educação sobre impacto da dívida

### **Para TaxIA:**
- ✅ Respostas mais completas
- ✅ Dados oficiais do governo
- ✅ Análise econômica aprofundada

## ⚙️ Cache Recomendado

| Dado | Cache | Motivo |
|------|-------|--------|
| Dívida Federal | 30 dias | Atualização mensal |
| Dívida Estadual | 7 dias | Relatórios trimestrais |
| CAPAG | 90 dias | Revisão trimestral |

## ⚠️ Limitações

### **APIs Encontradas:**
- ⚠️ SICONFI: Muitos endpoints vazios
- ⚠️ Documentação incompleta
- ⚠️ Dados nem sempre atualizados

### **Solução:**
- ✅ Começar com dados estáticos confiáveis
- ✅ Adicionar APIs gradualmente
- ✅ Web scraping como fallback

## 🚀 Próximos Passos

### **Implementação Imediata (Recomendado):**

1. **Criar serviço básico** (30 min)
   ```bash
   # Criar arquivo com dados estáticos
   touch server/services/dividaPublicaAPI.js
   ```

2. **Adicionar ao RAG** (15 min)
   ```javascript
   // Detectar keyword "dívida"
   // Adicionar contexto ao prompt
   ```

3. **Testar** (15 min)
   ```
   "Como está a dívida pública brasileira?"
   → TaxIA responde com dados de 2024
   ```

### **Total de Esforço: ~1 hora**

## 📊 Impacto Esperado

```
Antes:
"Como está a dívida pública?"
→ Resposta genérica sem dados

Depois:
"Como está a dívida pública?"
→ "A dívida federal está em R$ 7,3 trilhões (80% do PIB).
   Isso representa um aumento de 12,2% em 2024..."
```

## 📚 Documentação Completa

- **[API_DIVIDA_PUBLICA_ANALISE.md](API_DIVIDA_PUBLICA_ANALISE.md)** - Análise técnica detalhada
- **[API_DIVIDA_PUBLICA_ANALISE.md](API_DIVIDA_PUBLICA_ANALISE.md#implementação-técnica)** - Código de exemplo

## ✅ Recomendação Final

**Implementar Fase 1 AGORA:**
- ✅ Rápido (1 hora)
- ✅ Impacto imediato
- ✅ Sem dependências externas
- ✅ Base para expansão futura

**Quer que eu implemente a Fase 1?**
Posso criar o código em ~1 hora e deixar funcionando! 🚀

---

**Status**: 📋 Análise concluída, pronto para implementação
**Esforço**: 1 hora (Fase 1)
**Impacto**: Médio-Alto (enriquece contexto econômico)
