# 🔧 Troubleshooting - TaxHub

## ❌ Problema: "TaxIA está digitando..." fica carregando indefinidamente

### 🔍 Diagnóstico

#### 1. Verificar se o servidor backend está rodando

```bash
# Windows
netstat -ano | findstr :3001

# Deve mostrar algo como:
# TCP    0.0.0.0:3001    0.0.0.0:0    LISTENING    37068
```

**Se NÃO aparecer nada:**
```bash
# Iniciar servidor backend
cd server
node index.js

# Ou (se tiver script npm)
npm run dev
```

#### 2. Testar servidor diretamente

```bash
# Teste simples
curl http://localhost:3001/health

# Deve retornar:
# {"status":"ok","timestamp":"2024-10-05T..."}
```

```bash
# Teste de chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "olá"}'

# Deve retornar uma resposta da TaxIA em 5-10 segundos
```

**Se demorar mais de 30 segundos:** OpenAI pode estar lenta, ou há problema na API key.

#### 3. Verificar configuração da OpenAI

```bash
# Verificar se a chave existe
cat .env.local | grep OPENAI_API_KEY

# Deve mostrar:
# OPENAI_API_KEY=sk-proj-...
```

**Se NÃO aparecer ou estiver vazia:**
1. Obtenha uma chave em https://platform.openai.com/api-keys
2. Adicione ao arquivo `.env.local`:
   ```
   OPENAI_API_KEY=sk-proj-sua-chave-aqui
   ```
3. Reinicie o servidor

#### 4. Verificar logs do servidor

No terminal onde você iniciou `node index.js`, procure por:

✅ **Servidor OK:**
```
🚀 Servidor TaxIA rodando em http://localhost:3001
✅ Sistema RAG pronto!

💬 Nova mensagem: "olá"
🌐 Buscando dados públicos...
✓ 4 documentos encontrados
🤖 Gerando resposta com IA...
✅ Resposta gerada com sucesso
```

❌ **Problemas comuns:**
```
❌ Erro ao inicializar RAG: ...
   → PDFs podem estar faltando na pasta TAX-HUB/

❌ OpenAIError: Missing credentials
   → OPENAI_API_KEY não configurada

❌ Error: connect ECONNREFUSED
   → OpenAI está inacessível (firewall/proxy?)
```

### 🔨 Soluções

#### Solução 1: Timeout no Frontend (IMPLEMENTADO)

Adicionamos timeout de 60 segundos ao fetch. Se a requisição demorar muito:

```typescript
// src/features/taxAI/hooks/useTaxAI.ts
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 60000);
```

Agora o frontend vai mostrar erro após 60s.

#### Solução 2: Aumentar timeout do OpenAI (se necessário)

Se respostas demorarem muito, edite `server/index.js`:

```javascript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
  temperature: 0.7,
  max_tokens: 1500,
  timeout: 120000, // ← 120 segundos (padrão é 60s)
});
```

#### Solução 3: Verificar Network no DevTools

1. Abra o navegador → F12 → Network
2. Envie uma mensagem na TaxIA
3. Procure pela requisição `POST http://localhost:3001/api/chat`

**Status possíveis:**

| Status | Significado | Solução |
|--------|-------------|---------|
| `Pending` | Esperando resposta | Normal, aguardar até 60s |
| `200 OK` | Sucesso | Verificar se resposta está chegando no frontend |
| `500 Error` | Erro no servidor | Ver logs do servidor |
| `Failed` (CORS) | Problema de CORS | Verificar se servidor está em :3001 |
| `Failed` (Network) | Servidor não responde | Verificar se servidor está rodando |

#### Solução 4: Limpar cache do navegador

```bash
# Forçar recarregamento
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

#### Solução 5: Verificar porta do frontend

O frontend deve estar em:
- **Vite dev**: http://localhost:8080 ou http://localhost:5173

O backend deve estar em:
- **Node server**: http://localhost:3001

Se estiverem em portas diferentes, verifique `useTaxAI.ts`:
```typescript
const API_URL = 'http://localhost:3001/api/chat'; // ← Deve estar correto
```

### 🐛 Debug Avançado

#### Ver console do navegador

1. F12 → Console
2. Procure por erros em vermelho

**Erros comuns:**

```javascript
// CORS error
Access to fetch at 'http://localhost:3001/api/chat' from origin 'http://localhost:8080'
has been blocked by CORS policy
→ Solução: Reiniciar servidor backend

// Network error
Failed to fetch
→ Solução: Verificar se servidor está rodando

// Timeout
The user aborted a request
→ Solução: Aumentar timeout ou otimizar prompt
```

#### Ver requisições no terminal

```bash
# Instalar e usar curl com verbose
curl -v -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "teste"}'
```

### ✅ Checklist Completo

- [ ] Servidor backend rodando em :3001?
- [ ] Frontend rodando em :8080 ou :5173?
- [ ] OPENAI_API_KEY configurada no .env.local?
- [ ] Pasta TAX-HUB com PDFs existe?
- [ ] CORS está OK (curl -i)?
- [ ] Timeout adicionado ao fetch?
- [ ] Console do navegador sem erros?
- [ ] Logs do servidor mostram sucesso?

### 🚀 Restart Completo

Se nada funcionar, faça restart total:

```bash
# 1. Parar todos os processos
# Ctrl+C em todos os terminais

# 2. Limpar portas (Windows)
netstat -ano | findstr :3001
taskkill /PID [número_do_pid] /F

netstat -ano | findstr :8080
taskkill /PID [número_do_pid] /F

# 3. Reiniciar backend
cd server
node index.js
# Aguardar: ✅ Sistema RAG pronto!

# 4. Reiniciar frontend (em outro terminal)
npm run dev
# Aguardar: VITE ready...

# 5. Abrir navegador
http://localhost:8080 (ou porta mostrada pelo Vite)

# 6. Testar com mensagem simples
"olá"
```

### 📊 Tempos Esperados

| Operação | Tempo Normal | Tempo Máximo |
|----------|--------------|--------------|
| Startup servidor | 5-10s | 30s |
| Primeira mensagem | 5-10s | 20s |
| Mensagens seguintes | 3-7s | 15s |
| Com CNPJ | 5-12s | 25s |

**Se passar desses tempos:**
1. OpenAI está lenta (normal em horários de pico)
2. Modelo muito grande (trocar gpt-4 → gpt-4o-mini)
3. Histórico muito grande (limpar chat)

### 🔗 Links Úteis

- [OpenAI Status](https://status.openai.com/)
- [BrasilAPI Status](https://brasilapi.com.br/)
- [Documentação APIs](PUBLIC_DATA_INTEGRATION.md)

---

**Última atualização**: Outubro 2024
