# 🚀 Explorer Git

Uma aplicação web moderna e completa para explorar repositórios do GitHub, construída com React, TypeScript e Tailwind CSS.

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
- **Filtro por Estrelas**: Busca repositórios com quantidade específica de estrelas (±1)
- **Filtro por Data**: Repositórios atualizados após uma data específica
- **Ordenação na Tabela**: 
  - Alfabética (A-Z / Z-A)
  - Por estrelas (crescente/decrescente)
  - Por data de atualização (mais recente/mais antiga)
- Componente de filtros expansível/recolhível

### 📄 Paginação Inteligente
- Sistema de paginação completo
- Navegação com botões Previous/Next e números de página
- Exibição inteligente de páginas (com ellipsis)
- 5 repositórios por página
- Limite de 1000 resultados (API GitHub)

### 🎨 Interface Moderna
- **Tema Dark/Light** com toggle no header
- Design responsivo para desktop e mobile
- Estados de loading e error
- Animações e transições suaves
- Ícones SVG integrados
- Componentes modularizados e reutilizáveis

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
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header/          # Cabeçalho com logo e tema
│   │   ├── Footer/          # Rodapé com informações
│   │   ├── SearchBar/       # Barra de busca
│   │   ├── Filters/         # Componente de filtros
│   │   ├── RepositoryTable/ # Tabela de repositórios
│   │   ├── Pagination/      # Controles de paginação
│   │   └── ThemeToggle/     # Toggle dark/light mode
│   ├── contexts/            # Context API
│   │   └── ThemeContext.tsx # Gerenciamento de tema
│   ├── hooks/               # Custom hooks
│   │   └── useGithubSearch.ts # Hook de busca
│   ├── pages/               # Páginas da aplicação
│   │   └── Home/            # Página principal
│   ├── services/            # Serviços e APIs
│   │   └── githubApi.ts     # Integração GitHub API
│   ├── types.tsx            # Definições TypeScript
│   ├── App.tsx              # Componente raiz
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais Tailwind
├── public/                  # Arquivos estáticos
├── index.html               # Template HTML
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
├── tailwind.config.js       # Configuração Tailwind
├── postcss.config.js        # Configuração PostCSS
├── vite.config.ts           # Configuração Vite
└── README.md                # Documentação
```

## 🔧 Arquitetura e Decisões Técnicas

### Padrões de Projeto Utilizados
- **Component-based Architecture**: Separação em componentes reutilizáveis
- **Custom Hooks**: Lógica de negócio isolada em hooks
- **Context API**: Gerenciamento de estado global para tema
- **Service Layer**: Isolamento da comunicação com APIs
- **TypeScript**: Tipagem forte para maior segurança

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

interface SearchResponse {
  items: Repository[]
  total_count: number
}
```

### Custom Hook: useGithubSearch
Gerencia todo o estado e lógica da busca:
- `searchTerm`: Termo de busca atual
- `repositories`: Lista de repositórios encontrados
- `loading`: Estado de carregamento
- `currentPage`: Página atual da paginação
- `sortBy` / `sortOrder`: Critérios de ordenação
- `language`: Filtro de linguagem de programação
- `minStars`: Filtro de quantidade de estrelas
- `updatedAfter`: Filtro de data de atualização
- `totalPages`: Total de páginas disponíveis
- `error`: Mensagens de erro
- `hasSearched`: Controla exibição de mensagens

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
- ✅ Exibição de informações completas (nome, descrição, estrelas, data)
- ✅ Filtros avançados:
  - Por linguagem de programação
  - Por quantidade específica de estrelas
  - Por data de atualização
- ✅ Ordenação na tabela:
  - Alfabética (A-Z / Z-A)
  - Por estrelas (crescente/decrescente)
  - Por data (mais recente/mais antiga)
- ✅ Sistema de paginação completo com navegação inteligente
- ✅ Interface responsiva e moderna
- ✅ **Tema Dark/Light** com toggle persistente
- ✅ Estados de loading e error com mensagens informativas
- ✅ Formatação inteligente de números (6.1k) e datas (X dias atrás)
- ✅ Links diretos para repositórios no GitHub
- ✅ Componentes modularizados e reutilizáveis
- ✅ Tratamento de rate limit da API do GitHub
- ✅ Filtro de estrelas com busca exata (±1 estrela)
- ✅ Componente de filtros expansível/recolhível
- ✅ Truncamento de nomes longos (20 caracteres)
- ✅ Limite de 1000 resultados respeitado (API GitHub)

## 🚀 Melhorias Futuras

- [ ] Cache de resultados para melhor performance
- [ ] Histórico de buscas recentes
- [ ] Favoritos locais com localStorage
- [ ] Filtros adicionais (tamanho do repo, licença, forks)
- [ ] Testes unitários e de integração
- [ ] PWA (Progressive Web App)
- [ ] Modo offline básico
- [ ] Exportação de resultados (CSV, JSON)
- [ ] Gráficos e estatísticas dos repositórios

## 👨‍💻 Autor

**Jhonatan Serfim**

Desenvolvido com ❤️ demonstrando as melhores práticas de desenvolvimento com React, TypeScript e Tailwind CSS.

---

## 📝 Licença

Este projeto está sob a licença MIT.
