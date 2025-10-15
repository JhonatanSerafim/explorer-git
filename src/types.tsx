// ==========================================
// TIPOS DE DADOS DA API GITHUB
// ==========================================

/**
 * Interface que representa um repositório do GitHub
 */
export interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  updated_at: string
  html_url: string
  language: string
}

/**
 * Interface que representa a resposta da API de busca do GitHub
 */
export interface SearchResponse {
  items: Repository[]
  total_count: number
}

// ==========================================
// TIPOS DE TEMA
// ==========================================

/**
 * Tipo que representa os temas disponíveis
 */
export type Theme = 'light' | 'dark'

/**
 * Interface do contexto de tema
 */
export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

/**
 * Props do ThemeProvider
 */
export interface ThemeProviderProps {
  children: React.ReactNode
}

// ==========================================
// TIPOS DE FILTROS E ORDENAÇÃO
// ==========================================

/**
 * Tipo que representa as opções de ordenação
 */
export type SortBy = 'stars' | 'updated' | 'name'

/**
 * Tipo que representa a ordem de ordenação
 */
export type SortOrder = 'asc' | 'desc'

/**
 * Tipo que representa as linguagens de programação disponíveis
 */
export type Language = 'all' | 'javascript' | 'typescript' | 'python' | 'java' | 'go' | 'rust' | 'php'

/**
 * Interface que representa os filtros de busca
 */
export interface SearchFilters {
  language: Language
  minStars: string
  updatedAfter: string
  sortBy: SortBy
  sortOrder: SortOrder
}

// ==========================================
// PROPS DOS COMPONENTES
// ==========================================

/**
 * Props do componente SearchBar
 */
export interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleSearch: () => void
  loading: boolean
}

/**
 * Props do componente Filters
 */
export interface FiltersProps {
  language: string
  minStars: string
  updatedAfter: string
  onLanguageChange: (language: string) => void
  onMinStarsChange: (stars: string) => void
  onUpdatedAfterChange: (date: string) => void
  onApplyFilters: () => void
}

/**
 * Props do componente RepositoryTable
 */
export interface RepositoryTableProps {
  repositories: Repository[]
  sortBy: string
  sortOrder: string
  onSortChange: (sortBy: string) => void
  onSortOrderChange: (sortOrder: string) => void
}

/**
 * Props do componente Pagination
 */
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// ==========================================
// TIPOS DE RETORNO DE HOOKS
// ==========================================

/**
 * Interface que representa o retorno do hook useGithubSearch
 */
export interface UseGithubSearchReturn {
  // Estados
  searchTerm: string
  repositories: Repository[]
  loading: boolean
  currentPage: number
  sortBy: string
  sortOrder: string
  language: string
  minStars: string
  updatedAfter: string
  totalPages: number
  error: string
  hasSearched: boolean
  
  // Funções
  setSearchTerm: (term: string) => void
  handleSearch: () => void
  handleApplyFilters: () => void
  handlePageChange: (page: number) => void
  handleLanguageChange: (language: string) => void
  handleMinStarsChange: (stars: string) => void
  handleUpdatedAfterChange: (date: string) => void
  handleSortChange: (sortBy: string) => void
  handleSortOrderChange: (sortOrder: string) => void
}

// ==========================================
// TIPOS DE PARÂMETROS DE API
// ==========================================

/**
 * Interface que representa os parâmetros da busca de repositórios
 */
export interface SearchRepositoriesParams {
  query: string
  page?: number
  itemsPerPage?: number
  sortBy?: string
  sortOrder?: string
  language?: string
  minStars?: string
  updatedAfter?: string
}