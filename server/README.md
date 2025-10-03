# 🚀 TaxIA Backend - Servidor Express + OpenAI

Backend seguro para integração com OpenAI API seguindo as melhores práticas oficiais.

## 📋 Pré-requisitos

- Node.js 20+ LTS
- OpenAI API Key
- Variáveis de ambiente configuradas em `.env.local`

## 🔧 Como Usar

### 1. Iniciar apenas o servidor backend:
```bash
npm run server
```

### 2. Iniciar frontend + backend juntos:
```bash
npm run dev:all
```

### 3. Rodar em terminais separados (recomendado):

**Terminal 1 (Backend):**
```bash
npm run server
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

## 🌐 Endpoints

### Health Check
```
GET http://localhost:3001/health
```

### Chat com TaxIA
```
POST http://localhost:3001/api/chat

Body:
{
  "message": "Qual o melhor regime tributário para uma startup?",
  "history": [
    { "role": "user", "content": "Mensagem anterior..." },
    { "role": "assistant", "content": "Resposta anterior..." }
  ]
}

Response:
{
  "message": "Resposta da TaxIA...",
  "metadata": {
    "model": "gpt-4o-mini",
    "tokens_used": 234,
    "request_id": "chatcmpl-xyz123"
  }
}
```

## 🔒 Segurança

✅ **API Key nunca exposta no frontend**
✅ **CORS configurado para localhost**
✅ **Error handling robusto**
✅ **Validação de entrada**

## 🐛 Troubleshooting

### Erro: "OPENAI_API_KEY não configurada"
- Verifique se `.env.local` existe na raiz do projeto
- Confirme que `OPENAI_API_KEY` está definida

### Erro: "EADDRINUSE"
- Porta 3001 já está em uso
- Altere `PORT` no `.env.local` ou mate o processo na porta 3001

### Erro de CORS
- Verifique se o frontend está rodando em `http://localhost:8080`
- Ajuste o CORS em `server/index.js` se necessário
