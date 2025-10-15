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
    sortOrder: string = 'desc',
    language: string = 'all',
    minStars: string = '',
    updatedAfter: string = ''
  ): Promise<SearchResponse> {
    if (!query.trim()) {
      return { items: [], total_count: 0 };
    }

    const sortParam = sortBy === 'stars' ? 'stars' : sortBy === 'updated' ? 'updated' : 'stars';
    const orderParam = sortOrder;
    
    let queryString = query;
    if (language !== 'all') {
      queryString += ` language:${language}`;
    }
    if (minStars && !isNaN(Number(minStars))) {
      const starsNum = Number(minStars);
      // Busca por valor exato de estrelas (range mínimo de ±1)
      const minRange = Math.max(0, starsNum - 1);
      const maxRange = starsNum + 1;
      queryString += ` stars:${minRange}..${maxRange}`;
    }
    if (updatedAfter) {
      queryString += ` pushed:>=${updatedAfter}`;
    }

    const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(queryString)}&sort=${sortParam}&order=${orderParam}&page=${page}&per_page=${itemsPerPage}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error('Parâmetros de busca inválidos. Tente uma busca diferente.');
      } else if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        
        if (resetTime) {
          const resetDate = new Date(parseInt(resetTime) * 1000);
          const now = new Date();
          const diffMinutes = Math.ceil((resetDate.getTime() - now.getTime()) / (1000 * 60));
          
          throw new Error(`Limite de requisições excedido. Tente novamente em ${diffMinutes} minutos.`);
        } else {
          throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
        }
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
