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
      throw new Error('Erro ao buscar repositórios');
    }

    const data = await response.json();
    return data;
  }
};
