# GTM Equipe Tech

Plataforma de apresentação e estratégia de Go-to-Market (GTM) para a Equipe Tech, com assistente de IA integrado para consultoria em vendas e estratégia comercial.

## 🎯 Sobre o Projeto

Sistema desenvolvido para elevar o processo de prospecção, qualificação e conversão comercial da Equipe Tech através de:

- Frameworks de vendas consultivas
- Ativos personalizados
- Abordagem segmentada
- Inteligência de mercado
- Assistente de IA para suporte estratégico

## 🚀 Tecnologias

- **React 19** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Google Gemini AI** - Assistente de IA
- **Lucide React** - Ícones

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd andressa-gtm-equipe-tech
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo .env.local e adicione sua API key do Gemini
GEMINI_API_KEY=sua_chave_aqui
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Acesse no navegador:
```
http://localhost:3000
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Preview do build de produção

## 🎨 Estrutura do Projeto

```
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx       # Layout principal
│   └── Navigation.tsx   # Navegação entre telas
├── screens/             # Telas da aplicação
│   ├── LandingScreen.tsx
│   ├── ObjectiveScreen.tsx
│   ├── AgentScreen.tsx  # Chat com IA
│   └── ...
├── services/            # Serviços externos
│   └── geminiService.ts # Integração com Gemini AI
├── types.ts             # Definições de tipos TypeScript
└── App.tsx              # Componente raiz
```

## 🎯 Funcionalidades

### Telas Disponíveis

- **Landing** - Tela inicial com branding
- **Objetivo** - Apresentação do objetivo da estratégia GTM
- **Founder** - Informações sobre o fundador/equipe
- **Sprints** - Estrutura de sprints
- **Etapas** - Etapas do processo
- **ICP** - Ideal Customer Profile sugerido
- **Definição** - Detalhamento do ICP
- **Mercado** - Funnel de mercado
- **Proposta** - Link para proposta
- **Valores** - Detalhes de investimento
- **Agent** - Chat com IA para consultoria GTM
- **Contato** - Formulário de contato

### Core Revenue AI Agent

Assistente de IA integrado que oferece:
- Consultoria estratégica em GTM
- Respostas baseadas em frameworks de vendas
- Limite de 5 perguntas por sessão
- Integração direta com WhatsApp após limite

## 🔐 Configuração da API Key

Para obter sua API key do Google Gemini:

1. Acesse: https://aistudio.google.com/apikey
2. Faça login com sua conta Google
3. Crie uma nova API key
4. Copie a chave e adicione no arquivo `.env.local`

📖 Para instruções detalhadas, consulte [SETUP_API_KEY.md](./SETUP_API_KEY.md)

## 🚢 Deploy

### Build de Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

### Serviços Recomendados

- **Vercel** - Deploy automático via Git
- **Netlify** - Deploy com CI/CD
- **GitHub Pages** - Hospedagem estática

Configure a variável `GEMINI_API_KEY` nas variáveis de ambiente do serviço escolhido.

## 📝 Licença

Este projeto é privado e de uso interno.

## 👥 Equipe

Desenvolvido por **CORE REVENUE** para a **Equipe Tech**.

---

Para mais informações sobre configuração da API key, consulte [SETUP_API_KEY.md](./SETUP_API_KEY.md)
