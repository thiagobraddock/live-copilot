# Configuração do Backend no Railway

## 🔧 Configurações do Serviço

**Root Directory:** `backend`
**Build Command:** `npm install`
**Start Command:** `npm start`

## 🔐 Variáveis de Ambiente

Configure apenas no painel do Railway:

```env
FRONTEND_URL=https://SEU-FRONTEND.railway.app
```

⚠️ **ATENÇÃO**: URL sem barra final! Exemplo correto:
`FRONTEND_URL=https://refreshing-unity-production.up.railway.app`

**Automáticas (Railway define sozinho):**
- `PORT` → 8080 (automático)
- `NODE_ENV` → production (automático)

**Não precisa de arquivo `.env`** - configure direto no Railway Dashboard.

## 💾 Volume Obrigatório

- **Mount Path**: `/data`
- **Size**: 1GB (mínimo)
- **Função**: Persistir banco SQLite

## 📊 Monitoramento

Logs esperados após deploy:
```
Caminho do banco: /data/database.sqlite
Conectado ao banco SQLite
Tabela de feedbacks criada/verificada com sucesso
Servidor rodando na porta 8080
```

**Importante**: Railway usa a porta 8080 automaticamente, não 3001.

## 🔗 Endpoints Disponíveis

- `GET /api/feedback` - Listar feedbacks
- `POST /api/feedback` - Criar feedback
- `GET /api/feedback/stats` - Estatísticas CSAT
- WebSocket em `/socket.io/`