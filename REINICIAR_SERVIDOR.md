# 🔄 Como Reiniciar o Servidor TaxHub

## ❗ IMPORTANTE: Você precisa reiniciar o servidor!

Atualizamos o **SYSTEM_PROMPT** para que a TaxIA saiba que tem acesso a dados públicos. O servidor antigo está rodando sem essa atualização.

## 🛑 Passo 1: Parar o servidor antigo

### Windows (Terminal):

```bash
# Encontrar o processo na porta 3001
netstat -ano | findstr :3001

# Vai mostrar algo como:
# TCP    0.0.0.0:3001    LISTENING    37068
#                                      ↑
#                                     PID

# Abrir Gerenciador de Tarefas (Ctrl+Shift+Esc)
# → Detalhes → Procurar PID 37068 → Finalizar Tarefa
```

**OU pelo terminal:**

```bash
# No PowerShell (como administrador)
Stop-Process -Id 37068 -Force

# OU
taskkill /F /PID 37068
```

## ▶️ Passo 2: Iniciar servidor ATUALIZADO

```bash
cd c:/Users/EDER/tribu/tax-hub-tribu/server
node index.js
```

**Aguarde ver:**
```
✅ Sistema RAG pronto!
```

## ✅ Passo 3: Testar

### Teste 1: Health check
```bash
curl http://localhost:3001/health
```

### Teste 2: Chat com CNPJ
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"Consulte o CNPJ 45.814.695/0001-83\"}"
```

**Agora deve responder:**
> "A empresa [NOME] (CNPJ 45.814.695/0001-83) é..."

**NÃO mais:**
> "Não consigo realizar buscas em tempo real..."

## 🔍 Como saber se está usando servidor correto?

### Logs do servidor devem mostrar:

```
💬 Nova mensagem: "Consulte o CNPJ..."
🌐 Buscando dados públicos...
🌐 Consultando CNPJ: 45814695000183
✓ Dados públicos obtidos: cnpj        ← DEVE APARECER ISSO
🔍 Buscando documentos relevantes...
✓ 4 documentos encontrados
🤖 Gerando resposta com IA...
✅ Resposta gerada com sucesso
```

**Se NÃO aparecer "🌐 Consultando CNPJ":**
→ Servidor antigo rodando, reiniciar!

## 📝 Mudanças no SYSTEM_PROMPT

### ❌ Antes (servidor antigo):
```
Você é a TaxIA, uma assistente especializada em tributação brasileira.
...
```

### ✅ Agora (servidor atualizado):
```
Você é a TaxIA com ACESSO A DADOS PÚBLICOS EM TEMPO REAL.

✅ VOCÊ TEM ACESSO A APIs PÚBLICAS BRASILEIRAS:
- Consulta CNPJ via BrasilAPI
- Índices econômicos do Banco Central
- Tabelas do Simples Nacional 2024
...
```

## 🐛 Troubleshooting

### Erro: "Port 3001 already in use"

```bash
# Matar todos os processos na porta 3001
netstat -ano | findstr :3001
# Finalizar cada PID pelo Gerenciador de Tarefas
```

### Erro: "Cannot find module"

```bash
# Reinstalar dependências
npm install
```

### TaxIA ainda diz "não posso consultar"

1. ✅ Verificar que servidor foi reiniciado
2. ✅ Ver logs do servidor (deve mostrar "Consultando CNPJ")
3. ✅ Limpar cache do navegador (Ctrl+Shift+R)
4. ✅ Abrir DevTools → Application → Clear storage

## 🚀 Script Completo de Reinício

```bash
# 1. Parar servidor (se souber o PID)
Stop-Process -Id 37068 -Force

# 2. Navegar para pasta do servidor
cd c:/Users/EDER/tribu/tax-hub-tribu/server

# 3. Iniciar servidor atualizado
node index.js

# 4. Aguardar mensagem de sucesso
# ✅ Sistema RAG pronto!

# 5. Em outro terminal, testar
curl -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Consulte CNPJ 45.814.695/0001-83\"}"

# 6. Deve retornar dados da empresa, NÃO "não posso consultar"
```

---

**Após reiniciar, a TaxIA vai:**
- ✅ Consultar CNPJs em tempo real
- ✅ Usar dados do Simples Nacional 2024
- ✅ Fornecer índices econômicos atuais
- ✅ Responder com dados REAIS das empresas

**Arquivo atualizado**: `server/index.js` (SYSTEM_PROMPT melhorado)
