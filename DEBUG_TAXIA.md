# 🐛 Debug TaxIA - Checklist

## ❌ **Erros Identificados:**

### **1. Edge Function não existe (404)**
```
Failed to load resource: net::ERR_FAILED
taxia:1 Access to fetch at 'https://nfnyetjuhacerxsbkeag.supabase.co/functions/v1/tax-ai-chat'
```

### **2. Tabelas não existem (404)**
```
nfnyetjuhacerxsbkeag...sessions?select=*:1 Failed to load resource: the server responded with a status of 404
```

---

## ✅ **CHECKLIST - Verifique AGORA:**

### **Passo 1: Verificar Edge Function**
1. Acesse: https://app.supabase.com/project/nfnyetjuhacerxsbkeag/functions
2. Você vê a function `tax-ai-chat` listada?
   - ❌ **NÃO**: Precisa criar - veja instruções abaixo
   - ✅ **SIM**: Verifique se está deployada

### **Passo 2: Verificar Tabelas**
1. Acesse: https://app.supabase.com/project/nfnyetjuhacerxsbkeag/editor
2. Você vê as tabelas `tax_ai_sessions` e `tax_ai_messages`?
   - ❌ **NÃO**: Precisa executar SQL - veja instruções abaixo
   - ✅ **SIM**: Ok, problema é só a function

### **Passo 3: Verificar API Key**
1. Acesse: https://app.supabase.com/project/nfnyetjuhacerxsbkeag/settings/edge-functions
2. Você vê `OPENAI_API_KEY` nas secrets?
   - ❌ **NÃO**: Precisa adicionar
   - ✅ **SIM**: Ok

---

## 🚀 **SOLUÇÕES RÁPIDAS:**

### **Criar Edge Function (Se não existe)**
1. Vá para: https://app.supabase.com/project/nfnyetjuhacerxsbkeag/functions
2. Clique **"Create function"**
3. Nome: `tax-ai-chat`
4. Cole o código do arquivo: `tax-ai-chat-function.ts`
5. Clique **"Deploy"**

### **Criar Tabelas (Se não existem)**
1. Vá para: https://app.supabase.com/project/nfnyetjuhacerxsbkeag/sql/new
2. Cole este SQL e execute:

```sql
-- Criar tabela para sessões de conversa
CREATE TABLE IF NOT EXISTS tax_ai_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT,
  message_count INTEGER DEFAULT 0
);

-- Criar tabela para mensagens
CREATE TABLE IF NOT EXISTS tax_ai_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES tax_ai_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Políticas RLS básicas (permitir tudo por enquanto)
ALTER TABLE tax_ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_ai_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for now" ON tax_ai_sessions FOR ALL TO anon USING (true);
CREATE POLICY "Allow all for now" ON tax_ai_messages FOR ALL TO anon USING (true);
```

### **Adicionar OpenAI API Key (Se não existe)**
1. Vá para: https://app.supabase.com/project/YOUR_PROJECT_ID/settings/edge-functions
2. Clique **"Add new secret"**
3. Nome: `OPENAI_API_KEY`
4. Valor: `sua-chave-openai-aqui`

---

## 📞 **PRÓXIMOS PASSOS:**

1. **Verifique os 3 itens** acima no dashboard Supabase
2. **Execute as soluções** para os itens que estão faltando
3. **Teste novamente** em `/taxia`
4. **Me diga** quais itens estavam faltando

**A TaxIA vai funcionar assim que esses 3 itens estiverem configurados!**