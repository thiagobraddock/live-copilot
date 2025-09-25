# Troubleshooting Railway

## 🚨 Problemas Comuns e Soluções

### ❌ Erro: "ENOENT: no such file or directory, stat '/frontend/dist/index.html'"

**Causa**: O backend está tentando servir arquivos do frontend que não existem no serviço separado.

**Solução**: ✅ Já corrigido! O backend agora funciona apenas como API.

### ❌ Porta incorreta (3001 vs 8080)

**Problema**: Railway usa porta 8080, não 3001.

**Solução**: 
- ✅ Não defina `PORT` nas variáveis de ambiente
- ✅ Railway configura automaticamente (`PORT=8080`)
- ✅ Código já usa `process.env.PORT || 3001` corretamente
- ✅ Não precisa de arquivo `.env` no backend

### ❌ CORS Error

**Problema**: Frontend não consegue acessar backend.

**Solução**:
1. Configure `FRONTEND_URL` no backend
2. Configure `VITE_API_URL` no frontend
3. ⚠️ **IMPORTANTE**: URLs sem barra final!

   ```env
   # Backend
   FRONTEND_URL=https://refreshing-unity-production.up.railway.app
   
   # Frontend  
   VITE_API_URL=https://live-copilot-production.up.railway.app/api
   VITE_SOCKET_URL=https://live-copilot-production.up.railway.app
   ```

**Erro comum**: Adicionar `/` no final da URL do frontend causa erro de CORS.

### ❌ Socket.IO não conecta

**Problema**: WebSocket não funciona entre serviços.

**Solução**:
1. Configure `VITE_SOCKET_URL` no frontend:
   ```env
   VITE_SOCKET_URL=https://backend-xyz.railway.app
   ```

### ❌ Dados perdidos após redeploy

**Problema**: Volume SQLite não configurado.

**Solução**:
1. No backend Railway, vá em Settings > Volumes
2. Add Volume: Mount Path = `/data`, Size = 1GB
3. Redeploy o backend

### ❌ Build do frontend falha

**Problema**: Variáveis de ambiente não configuradas durante build.

**Solução**:
1. Configure `VITE_*` antes do primeiro build
2. Ou faça build inicial sem variáveis, depois configure e redeploy

## ✅ Verificação Pós-Deploy

### Backend Saudável:
```bash
curl https://SEU-BACKEND.railway.app/health
# Resposta: {"status":"OK","service":"Live Feedback API"}
```

### Frontend Saudável:
- Interface carrega sem erros no navegador
- Console não mostra erros de rede
- Formulário funciona

### Integração Funcionando:
- Feedbacks são salvos
- CSAT é calculado
- Atualizações em tempo real funcionam

## 📞 Suporte

Se o problema persistir:
1. Verifique logs no Railway Dashboard
2. Confirme URLs nas variáveis de ambiente
3. Teste endpoints manualmente com curl/Postman