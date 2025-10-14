# Repo Explorer

Uma aplicação web moderna para explorar repositórios do GitHub, construída com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e dev server ultra-rápido
- **GitHub API** - API para buscar repositórios
- **ESLint** - Linter para qualidade de código

## ✨ Funcionalidades

### 🔍 Busca de Repositórios
- Campo de busca intuitivo com placeholder
- Integração completa com a GitHub API
- Busca em tempo real por nome de repositório

### 📊 Exibição de Resultados
- Tabela responsiva com informações dos repositórios:
  - Nome do repositório
  - Descrição (truncada para melhor visualização)
  - Número de estrelas com formatação (ex: 215k)
  - Data da última atualização (formato relativo)
  - Link direto para o repositório no GitHub

### 🔧 Filtros e Ordenação
- **Filtro por Linguagem**: JavaScript, TypeScript, Python, Java, Go, Rust, PHP
- **Ordenação**: Por estrelas ou por data de atualização
- Aplicação de filtros em tempo real

### 📄 Paginação Inteligente
- Sistema de paginação completo
- Navegação com botões Previous/Next
- Exibição inteligente de páginas (com ellipsis)
- 10 repositórios por página

### 🎨 Interface Moderna
- Tema escuro elegante
- Design responsivo para desktop e mobile
- Estados de loading e error
- Animações e transições suaves
- Ícones SVG integrados

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd explorer-git
```

2. Instale as dependências:
```bash
npm install
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter ESLint

## 🚀 Como Executar

Execute o comando para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
explorer-git/
├── src/
│   ├── App.tsx          # Componente principal com toda a lógica
│   ├── App.css          # Estilos customizados
│   ├── main.tsx         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais com Tailwind
├── public/              # Arquivos estáticos
├── index.html           # Template HTML
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
├── tailwind.config.js   # Configuração do Tailwind
├── postcss.config.js    # Configuração do PostCSS
├── vite.config.ts       # Configuração do Vite
└── README.md           # Documentação do projeto
```

## 🔧 Arquitetura e Decisões Técnicas

### Interface TypeScript
```typescript
interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  updated_at: string
  html_url: string
  language: string
}
```

### Estados da Aplicação
- `searchTerm`: Termo de busca atual
- `repositories`: Lista de repositórios encontrados
- `loading`: Estado de carregamento
- `currentPage`: Página atual da paginação
- `sortBy`: Critério de ordenação
- `language`: Filtro de linguagem
- `totalPages`: Total de páginas disponíveis
- `error`: Mensagens de erro

### Integração com GitHub API
- Endpoint: `https://api.github.com/search/repositories`
- Parâmetros de busca dinâmicos
- Tratamento de erros robusto
- Formatação de dados otimizada

### Sistema de Paginação
- Algoritmo inteligente para exibição de páginas
- Suporte a ellipsis para grandes quantidades de páginas
- Navegação com Previous/Next
- Estado persistente da página atual

## 🎯 Funcionalidades Implementadas

- ✅ Busca de repositórios por nome
- ✅ Exibição de informações completas
- ✅ Filtros por linguagem de programação
- ✅ Ordenação por estrelas ou data de atualização
- ✅ Sistema de paginação completo
- ✅ Interface responsiva e moderna
- ✅ Estados de loading e error
- ✅ Formatação inteligente de números e datas
- ✅ Links diretos para repositórios
- ✅ Tema escuro elegante

## 🚀 Melhorias Futuras

- [ ] Cache de resultados para melhor performance
- [ ] Busca em tempo real (debounce)
- [ ] Favoritos locais
- [ ] Histórico de buscas
- [ ] Filtros avançados (tamanho, licença, etc.)
- [ ] Modo claro/escuro toggle
- [ ] Testes unitários e de integração
- [ ] PWA (Progressive Web App)

---

Desenvolvido com ❤️ como parte de um desafio de programação, demonstrando as melhores práticas de desenvolvimento React com TypeScript.
