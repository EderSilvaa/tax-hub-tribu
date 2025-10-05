# 🚀 Como Usar o TaxHub com APIs Públicas

## ✅ Status Atual

- ✅ **APIs Públicas**: Integradas (CNPJ, Simples, Banco Central)
- ✅ **RAG System**: 10 PDFs, 80 chunks, embeddings
- ✅ **OpenAI**: Configurado e funcionando
- ✅ **Timeout**: 60 segundos adicionado ao frontend

## 🏃 Quick Start

### 1. Iniciar Backend

```bash
# Terminal 1: Backend (porta 3001)
cd server
node index.js
```

**Aguarde ver:**
```
🚀 Servidor TaxIA rodando em http://localhost:3001
✅ Sistema RAG pronto!
```

### 2. Iniciar Frontend

```bash
# Terminal 2: Frontend (porta 8080)
npm run dev
```

**Aguarde ver:**
```
VITE v5.4.19 ready in XXXms
➜ Local: http://localhost:8080/
```

### 3. Abrir no Navegador

```
http://localhost:8080
```

### 4. Testar TaxIA

Clique em "Chat com TaxIA" e teste:

**Mensagens de teste:**

1. ✅ **Simples:**
   ```
   olá
   ```
   ⏱️ Deve responder em ~5 segundos

2. ✅ **Com CNPJ:**
   ```
   Consulte o CNPJ 00.394.460/0058-87
   ```
   ⏱️ Deve responder em ~7 segundos com dados do Ministério da Fazenda

3. ✅ **Simples Nacional:**
   ```
   Qual a alíquota para comércio com faturamento de R$ 250.000?
   ```
   ⏱️ Deve responder em ~6 segundos com faixa e alíquota

## ⏱️ Tempos Normais

| Situação | Tempo Esperado |
|----------|----------------|
| Primeira mensagem | 5-10s (carregando RAG) |
| Mensagens normais | 3-7s |
| Com consulta CNPJ | 5-12s |
| Timeout do frontend | 60s (máximo) |

## ❌ Se Ficar Carregando

### Opção 1: Aguardar
- Frontend agora tem timeout de 60s
- Se demorar, mostrará erro automático

### Opção 2: Verificar Console (F12)
1. Abrir DevTools (F12)
2. Ir em **Network**
3. Enviar mensagem
4. Ver requisição `POST /api/chat`

**Status normais:**
- `Pending` → Aguardando (normal)
- `200 OK` → Sucesso
- `Failed` → Ver erro no Console

### Opção 3: Testar Backend Direto

```bash
# Teste rápido
curl http://localhost:3001/health
# Deve retornar: {"status":"ok",...}

# Teste de chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"olá\"}"
# Deve retornar resposta em 5-10s
```

**Se curl funcionar mas frontend não:**
→ Problema no frontend (recarregar página: Ctrl+Shift+R)

**Se curl também demorar:**
→ OpenAI está lenta (normal em picos)

## 🔧 Troubleshooting Rápido

### Backend não inicia
```bash
# Erro: OPENAI_API_KEY missing
# Solução: Verificar .env.local
cat .env.local | grep OPENAI

# Erro: Port 3001 already in use
# Solução: Matar processo
netstat -ano | findstr :3001
# Anotar PID e matar pelo Gerenciador de Tarefas
```

### Frontend não conecta
```bash
# 1. Verificar URL em useTaxAI.ts
# Deve ser: http://localhost:3001/api/chat

# 2. Recarregar página
Ctrl + Shift + R

# 3. Limpar cache
DevTools → Application → Clear storage
```

### Respostas muito lentas
```bash
# Possíveis causas:
1. OpenAI em horário de pico → Aguardar
2. Histórico muito grande → Limpar chat (botão "Limpar")
3. PDFs muito grandes → Reduzir chunks (pdfProcessor.js)
```

## 📊 O Que Foi Implementado

### 1. **Detecção Automática**
A TaxIA detecta:
- **CNPJs** → Consulta BrasilAPI
- **"simples", "faixa"** → Usa tabelas 2024
- **"selic", "ipca"** → Consulta Banco Central

### 2. **Sistema RAG Híbrido**
```
Mensagem do usuário
    ↓
Buscar APIs Públicas (CNPJ, índices)
    ↓
Buscar PDFs relevantes (4 documentos)
    ↓
Combinar tudo no contexto
    ↓
Enviar para OpenAI GPT-4o-mini
    ↓
Resposta enriquecida
```

### 3. **Cache Inteligente**
- CNPJ: 24 horas
- Índices: 1 hora
- Simples: 24 horas

### 4. **Metadata na Resposta**
Cada resposta inclui:
```json
{
  "message": "...",
  "metadata": {
    "model": "gpt-4o-mini",
    "tokens_used": 874,
    "sources": [
      {"file": "simples.pdf", "page": 5}
    ],
    "public_data_used": ["cnpj", "simples"]
  }
}
```

## 🎯 Exemplos de Uso

### Exemplo 1: Consulta Simples
**Usuário:**
> "Como funciona o Simples Nacional?"

**TaxIA:**
> Usa PDFs do RAG + tabelas 2024
> Responde em ~5s

### Exemplo 2: Consulta com CNPJ
**Usuário:**
> "Consulte o CNPJ 45.814.695/0001-83"

**TaxIA:**
> 1. Detecta CNPJ
> 2. Consulta BrasilAPI
> 3. Combina com PDFs
> 4. Responde com dados da empresa + orientação tributária

### Exemplo 3: Cálculo de Faixa
**Usuário:**
> "Faturei R$ 300.000 em comércio, qual minha alíquota?"

**TaxIA:**
> 1. Detecta "faixa" e "comércio"
> 2. Usa tabela Anexo I
> 3. Calcula: Faixa 2, alíquota 7,3%
> 4. Explica cálculo com dedução

## 📚 Documentação Completa

- **[PUBLIC_DATA_INTEGRATION.md](PUBLIC_DATA_INTEGRATION.md)** - Detalhes técnicos das APIs
- **[EXEMPLO_USO_APIS.md](EXEMPLO_USO_APIS.md)** - Casos de uso práticos
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solução de problemas
- **[INTEGRACAO_APIS_RESUMO.md](INTEGRACAO_APIS_RESUMO.md)** - Resumo executivo

## 🆘 Suporte

### Logs do Backend
Mostram o que está acontecendo:
```
💬 Nova mensagem: "..."
🌐 Buscando dados públicos...
✓ Dados públicos obtidos: cnpj
🔍 Buscando documentos relevantes...
✓ 4 documentos encontrados
🤖 Gerando resposta com IA...
✅ Resposta gerada com sucesso
```

### Console do Frontend
F12 → Console
- ❌ Erros em vermelho
- ℹ️ Logs de debug
- ⚠️ Warnings

### Network Tab
F12 → Network → POST /api/chat
- Ver tempo de resposta
- Ver payload enviado
- Ver resposta recebida

---

**Desenvolvido para TaxHub** | Outubro 2024
