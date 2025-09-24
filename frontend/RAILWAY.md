# Configuração do Frontend no Railway

## 🔧 Configurações do Serviço

**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Start Command:** `npm run preview`

## 🔐 Variáveis de Ambiente

```env
VITE_API_URL=https://SEU-BACKEND.railway.app/api
VITE_SOCKET_URL=https://SEU-BACKEND.railway.app
```

## 📝 Passo a Passo

1. **Primeiro Deploy**: Deploy sem as variáveis para obter a URL
2. **Obter URLs**: Anote as URLs geradas pelo Railway
3. **Configurar Backend**: Adicione a URL do frontend na variável `FRONTEND_URL`
4. **Configurar Frontend**: Adicione a URL do backend nas variáveis `VITE_*`
5. **Redeploy**: Ambos os serviços para aplicar as configurações

## 🎯 Resultado Final

- Interface disponível em: `https://frontend-xxx.railway.app`
- Conectada ao backend: `https://backend-yyy.railway.app`
- Funcionalidades em tempo real ativas

## 🔍 Verificação

Após deploy, verifique:
- ✅ Interface carrega sem erros
- ✅ Formulário de feedback funciona
- ✅ CSAT é calculado e exibido
- ✅ Feedbacks aparecem em tempo real