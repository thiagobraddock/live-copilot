# Configuração do Backend no Railway

## 🔧 Configurações do Serviço

**Root Directory:** `backend`
**Build Command:** `npm install`
**Start Command:** `npm start`

## 🔐 Variáveis de Ambiente

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://SEU-FRONTEND.railway.app
```

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
Servidor rodando na porta 3001
```

## 🔗 Endpoints Disponíveis

- `GET /api/feedback` - Listar feedbacks
- `POST /api/feedback` - Criar feedback
- `GET /api/feedback/stats` - Estatísticas CSAT
- WebSocket em `/socket.io/`