import { SearchResponse } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export const githubApi = {
  /**
   * Busca repositórios no GitHub
   */
  async searchRepositories(
    query: string, 
    page: number = 1, 
    itemsPerPage: number = 10, 
    sortBy: string = 'stars', 
    language: string = 'all'
  ): Promise<SearchResponse> {
    if (!query.trim()) {
      return { items: [], total_count: 0 };
    }

    const sortParam = sortBy === 'stars' ? 'stars' : 'updated';
    const orderParam = 'desc';
    
    let queryString = query;
    if (language !== 'all') {
      queryString += ` language:${language}`;
    }

    const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(queryString)}&sort=${sortParam}&order=${orderParam}&page=${page}&per_page=${itemsPerPage}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error('Parâmetros de busca inválidos. Tente uma busca diferente.');
      } else if (response.status === 403) {
        throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
      } else if (response.status === 404) {
        throw new Error('Página não encontrada. Tente uma página anterior.');
      } else {
        throw new Error(`Erro ao buscar repositórios (${response.status})`);
      }
    }

    const data = await response.json();
    return data;
  }
};
