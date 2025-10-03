# 🤖 TaxIA Setup Guide

Guia completo para configurar a TaxIA (assistente de IA especializada em tributação) no TaxHub.

## ✅ Status Atual

- [x] Supabase configurado
- [x] Edge function criada
- [x] Client-side integration implementada
- [ ] OpenAI API Key configurada
- [ ] Edge function deployada
- [ ] Tabelas criadas no Supabase

## 🚀 Próximos Passos para Ativar

### 1. **Configurar OpenAI API Key no Supabase**

1. Acesse o [dashboard do Supabase](https://app.supabase.com)
2. Vá para seu projeto: `nfnyetjuhacerxsbkeag`
3. No menu lateral, clique em **Settings** → **Edge Functions**
4. Clique em **Manage secrets**
5. Adicione a secret:
   ```
   Name: OPENAI_API_KEY
   Value: sk-your-openai-api-key-here
   ```

### 2. **Criar Tabelas no Banco de Dados**

1. No dashboard do Supabase, vá para **SQL Editor**
2. Execute o SQL do arquivo: `supabase/migrations/001_create_tax_ai_tables.sql`
3. Ou execute comando por comando:

```sql
-- Copie e cole o conteúdo do arquivo de migração
```

### 3. **Deploy da Edge Function**

Execute no terminal:

```bash
# Instalar Supabase CLI globalmente
npm install -g supabase

# Login no Supabase
npx supabase login

# Link com o projeto
npx supabase link --project-ref nfnyetjuhacerxsbkeag

# Deploy da edge function
npx supabase functions deploy tax-ai-chat
```

### 4. **Obter uma OpenAI API Key**

1. Acesse https://platform.openai.com
2. Crie uma conta ou faça login
3. Vá para **API Keys**
4. Clique **Create new secret key**
5. Copie a chave (começa com `sk-`)
6. Configure no Supabase (passo 1)

## 🏗️ Arquitetura Implementada

```
Frontend (React)
    ↓
useTaxAI Hook
    ↓
Supabase Client
    ↓
Edge Function (tax-ai-chat)
    ↓
OpenAI API (GPT-4o-mini)
    ↓
Response + Database Save
```

## 📁 Arquivos Criados/Modificados

### **Configuração**
- `.env.local` - Credenciais do Supabase
- `src/lib/supabase.ts` - Cliente Supabase + tipos

### **Edge Function**
- `supabase/functions/tax-ai-chat/index.ts` - Processamento IA
- `supabase/migrations/001_create_tax_ai_tables.sql` - Schema DB

### **Frontend**
- `src/features/taxAI/hooks/useTaxAI.ts` - Hook atualizado
- `src/features/taxAI/components/TaxAIChat.tsx` - Interface

## 🔧 Funcionalidades Implementadas

### **IA Especializada**
- ✅ Prompt especializado em tributação brasileira
- ✅ Contexto de conversa mantido
- ✅ Respostas focadas em regimes tributários
- ✅ Linguagem técnica mas acessível

### **Persistência**
- ✅ Sessões de conversa salvas
- ✅ Histórico de mensagens
- ✅ Metadata de uso (tokens, modelo, tempo)
- ✅ Row Level Security (RLS)

### **UX Avançada**
- ✅ Estado de loading
- ✅ Tratamento de erros
- ✅ Retry automático
- ✅ Fallback para falhas
- ✅ Context awareness

### **Segurança**
- ✅ API key segura (server-side only)
- ✅ CORS configurado
- ✅ RLS no banco
- ✅ Rate limiting implícito (OpenAI)

## 📊 Custos Estimados

### **OpenAI (GPT-4o-mini)**
- ~$0.15 / 1M tokens input
- ~$0.60 / 1M tokens output
- Estimativa: ~$2-5/mês para uso moderado

### **Supabase**
- Free tier: 500MB storage, 2GB transfer
- Suficiente para milhares de conversas

## 🧪 Como Testar

1. Complete o setup acima
2. Acesse `/taxia` no app
3. Faça uma pergunta: *"Qual o melhor regime para uma startup?"*
4. Verifique se a resposta é contextual e especializada

## 🔍 Troubleshooting

### **Erro: "Missing Supabase environment variables"**
- Verifique se `.env.local` está configurado
- Restart do dev server: `npm run dev`

### **Erro: "OpenAI API error"**
- Verifique se a API key está configurada no Supabase
- Verifique se tem créditos na OpenAI

### **Erro: "Database save error"**
- Execute as migrações SQL
- Verifique se as tabelas existem

### **Edge function não encontrada**
- Execute o deploy: `npx supabase functions deploy tax-ai-chat`
- Verifique se está logado: `npx supabase login`

## 🎯 Próximas Melhorias

### **Phase 1 - Atual** ✅
- [x] IA básica funcionando
- [x] Persistência de conversas
- [x] Interface polida

### **Phase 2 - Sugerida**
- [ ] Integração com dados do simulador
- [ ] Sugestões baseadas em histórico
- [ ] Templates de perguntas personalizadas
- [ ] Análise de tendências de dúvidas

### **Phase 3 - Avançada**
- [ ] Voice-to-text
- [ ] Exportar conversas para PDF
- [ ] Agendamento de consultorias
- [ ] Multi-language support

---

**Status**: ✅ Pronto para deploy
**Última atualização**: Setembro 2024
**Desenvolvido por**: TaxHub Team