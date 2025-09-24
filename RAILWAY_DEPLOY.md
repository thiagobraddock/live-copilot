# Instruções para Deploy no Railway

## 📋 Pré-requisitos

1. **Conta no Railway**: Acesse [railway.app](https://railway.app)
2. **Repositório Git**: Conecte este repositório ao Railway

## 🚀 Configuração do Deploy

### 1. Criar Novo Projeto
- Acesse o Railway Dashboard
- Clique em "New Project"
- Selecione "Deploy from GitHub repo"
- Escolha este repositório (`live-copilot`)

### 2. Configurar Variáveis de Ambiente
Adicione as seguintes variáveis no Railway:

```
NODE_ENV=production
FRONTEND_URL=https://SEU-DOMINIO.railway.app
```

### 3. **IMPORTANTE: Configurar Volume**
⚠️ **CRÍTICO**: Sem o volume, todos os dados serão perdidos a cada deploy!

1. No painel do seu serviço no Railway:
   - Vá em "Settings" > "Volumes"
   - Clique em "Add Volume"
   - **Mount Path**: `/data`
   - **Size**: 1GB (ou conforme necessário)
   - Salve a configuração

### 4. Deploy
- O Railway fará o deploy automaticamente
- O build seguirá os comandos em `railway.toml`:
  - Instalar dependências: `npm run install:all`
  - Build: `npm run build`
  - Start: `npm start`

## 📁 Estrutura de Arquivos no Railway

```
/app/                          # Código da aplicação
├── backend/
├── frontend/
└── ...

/data/                         # Volume persistente
└── database.sqlite           # Banco de dados (persistente)
```

## 🔍 Verificação do Deploy

Após o deploy, verifique:

1. **Logs do Servidor**: 
   ```
   Caminho do banco: /data/database.sqlite
   Conectado ao banco SQLite
   Servidor rodando na porta XXXX
   ```

2. **Volume Funcionando**:
   - Crie alguns feedbacks de teste
   - Faça um redeploy
   - Verifique se os dados persistiram

## 🐛 Troubleshooting

### Erro: "ENOENT: no such file or directory '/data'"
- **Causa**: Volume não configurado
- **Solução**: Configure o volume conforme instruções acima

### Dados perdidos após deploy
- **Causa**: Volume não está funcionando
- **Solução**: Verifique se o volume está montado em `/data`

### Frontend não carrega
- **Causa**: Build do frontend falhou
- **Solução**: Verifique logs de build e variáveis de ambiente

## 📊 Monitoramento

- **Logs**: Acesse "Deployments" > "View Logs"
- **Métricas**: Railway fornece CPU, RAM e Network usage
- **Database**: Arquivo estará em `/data/database.sqlite`

## 🔒 Backup

Para backup do banco de dados:
1. Acesse o terminal do Railway (se disponível)
2. Execute: `cp /data/database.sqlite /tmp/backup.sqlite`
3. Ou use ferramentas de backup do Railway

---

🎉 **Sua aplicação estará disponível em**: `https://SEU-PROJETO.railway.app`