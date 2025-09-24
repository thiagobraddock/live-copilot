# Live Feedback App

Uma aplicação web para coletar feedback em tempo real durante lives, com cálculo automático do CSAT (Customer Satisfaction Score).

## 🚀 Funcionalidades

- **Formulário de Feedback**: Interface intuitiva com nome, avaliação por estrelas e comentários
- **CSAT em Tempo Real**: Cálculo automático da satisfação dos usuários
- **Atualizações Live**: Socket.IO para sincronização em tempo real
- **Interface Moderna**: Construída com React, Tailwind CSS e Radix UI
- **Backend Robusto**: Node.js com Express e SQLite

## 🛠️ Tecnologias

### Frontend (`/frontend`)
- React 18
- Vite
- Tailwind CSS
- Radix UI
- Socket.IO Client
- Axios
- Lucide React (ícones)

### Backend (`/backend`)
- Node.js
- Express
- SQLite3
- Socket.IO
- CORS

## 📊 CSAT (Customer Satisfaction Score)

O CSAT é calculado como a porcentagem de feedbacks satisfatórios (avaliações 4 e 5 estrelas) em relação ao total de feedbacks recebidos.

**Fórmula**: `CSAT = (Feedbacks 4-5 estrelas / Total de feedbacks) × 100`

## 🏃‍♂️ Como Executar Localmente

### Backend
```bash
cd backend
npm install
npm run dev
```
Servidor: http://localhost:3001

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Interface: http://localhost:5173

## 🚀 Deploy no Railway (Dois Serviços)

Esta aplicação deve ser deployada como **dois serviços separados** no Railway:

### � Serviço 1: Backend API

**Configurações no Railway:**
- **Root Directory**: `/backend`
- **Build Command**: `npm install`  
- **Start Command**: `npm start`

**Variáveis de Ambiente Obrigatórias:**
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://SEU-FRONTEND.railway.app
```

**Volume Necessário:**
- **Mount Path**: `/data`
- **Size**: 1GB (para SQLite)

### 🎨 Serviço 2: Frontend

**Configurações no Railway:**
- **Root Directory**: `/frontend`
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview`

**Variáveis de Ambiente Obrigatórias:**
```env
VITE_API_URL=https://SEU-BACKEND.railway.app/api
VITE_SOCKET_URL=https://SEU-BACKEND.railway.app
```

## 📁 Estrutura do Projeto

```
live-copilot/
├── backend/              # Serviço 1 - API
│   ├── src/
│   │   ├── database/
│   │   ├── routes/
│   │   └── server.js
│   ├── data/            # Volume SQLite
│   └── package.json
├── frontend/            # Serviço 2 - Interface
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🚀 Instruções de Deploy Detalhadas

### 1️⃣ Deploy do Backend
1. No Railway, crie um novo projeto
2. Conecte este repositório GitHub
3. Configure **Root Directory**: `backend`
4. Adicione as variáveis de ambiente listadas acima
5. **IMPORTANTE**: Configure volume em `/data` para persistir SQLite
6. Deploy automático

### 2️⃣ Deploy do Frontend  
1. Crie um segundo serviço no mesmo projeto Railway
2. Conecte o mesmo repositório
3. Configure **Root Directory**: `frontend`
4. Adicione as variáveis de ambiente (com URL do backend)
5. Deploy automático

### 🔗 Configuração de URLs
- Backend: `https://backend-xxx.railway.app`
- Frontend: `https://frontend-yyy.railway.app`

Substitua as URLs nas variáveis de ambiente após o primeiro deploy.

## ⚠️ Pontos Importantes

- **Volume no Backend**: Essencial para não perder dados SQLite
- **CORS**: Backend já configurado para aceitar frontend
- **Socket.IO**: Configurado para funcionar entre serviços
- **Build do Frontend**: Gera arquivos estáticos otimizados

## 🌟 Funcionalidades

✅ **Formulário de Feedback** com nome, estrelas e comentários  
✅ **CSAT em Tempo Real** calculado automaticamente  
✅ **Atualizações Live** via Socket.IO  
✅ **Interface Responsiva** para todos dispositivos  
✅ **Persistência de Dados** com SQLite  

---

Desenvolvido com ❤️ para melhorar a experiência das suas lives!
