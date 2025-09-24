# Live Feedback App

Uma aplicação web para coletar feedback em tempo real durante lives, com cálculo automático do CSAT (Customer Satisfaction Score).

## 🚀 Funcionalidades

- **Formulário de Feedback**: Interface intuitiva com nome, avaliação por estrelas e comentários
- **CSAT em Tempo Real**: Cálculo automático da satisfação dos usuários
- **Atualizações Live**: Socket.IO para sincronização em tempo real
- **Interface Moderna**: Construída com React, Tailwind CSS e Radix UI
- **Backend Robusto**: Node.js com Express e SQLite

## 🛠️ Tecnologias

### Frontend
- React 18
- Vite
- Tailwind CSS
- Radix UI
- Socket.IO Client
- Axios
- Lucide React (ícones)

### Backend
- Node.js
- Express
- SQLite3
- Socket.IO
- CORS

## 📊 CSAT (Customer Satisfaction Score)

O CSAT é calculado como a porcentagem de feedbacks satisfatórios (avaliações 4 e 5 estrelas) em relação ao total de feedbacks recebidos.

**Fórmula**: `CSAT = (Feedbacks 4-5 estrelas / Total de feedbacks) × 100`

## 🏃‍♂️ Como Executar

### Desenvolvimento

1. **Instalar dependências**:
```bash
npm run install:all
```

2. **Executar em modo desenvolvimento**:
```bash
npm run dev
```

Isso iniciará:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Produção

1. **Build da aplicação**:
```bash
npm run build
```

2. **Executar em produção**:
```bash
npm start
```

## 🚀 Deploy no Railway

### Configuração para Deploy

1. **Variáveis de Ambiente**:
   - `NODE_ENV=production`
   - `PORT` (configurado automaticamente pelo Railway)
   - `FRONTEND_URL` (URL do seu domínio no Railway)

2. **Volume Persistente**:
   - **IMPORTANTE**: Configure um volume no Railway montado em `/data`
   - O banco SQLite será armazenado em `/data/database.sqlite`
   - Sem o volume, os dados serão perdidos a cada deploy

3. **Estrutura para Deploy**:
   - O backend serve os arquivos estáticos do frontend em produção
   - SQLite será criado automaticamente no volume `/data`
   - Socket.IO configurado para funcionar com Railway

### Deploy Automático

1. Conecte seu repositório ao Railway
2. Railway detectará automaticamente o `package.json` principal
3. Configure as variáveis de ambiente necessárias
4. Deploy será feito automaticamente

## 📁 Estrutura do Projeto

```
live-copilot/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   └── db.js
│   │   ├── routes/
│   │   │   └── feedback.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.jsx
│   │   │   ├── FeedbackList.jsx
│   │   │   ├── CSATDisplay.jsx
│   │   │   └── StarRating.jsx
│   │   ├── hooks/
│   │   │   └── useFeedback.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
├── package.json (principal)
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa frontend e backend em desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Executa em produção
- `npm run install:all` - Instala todas as dependências

## 🌟 Características da Interface

### Formulário de Feedback
- Campo obrigatório para nome
- Sistema de avaliação por estrelas interativo
- Campo opcional para comentários
- Validação em tempo real
- Estados de loading durante envio

### Dashboard de Feedbacks
- Lista de feedbacks em tempo real
- Informações do usuário e timestamp
- Visualização das avaliações por estrelas
- CSAT calculado automaticamente

### Estatísticas CSAT
- Score visual com cores indicativas
- Distribuição das avaliações
- Média geral das avaliações
- Total de feedbacks recebidos

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- Desktop
- Tablets
- Smartphones

## 🔒 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Headers de segurança configurados
- CORS configurado adequadamente

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Desenvolvido com ❤️ para melhorar a experiência das suas lives!
