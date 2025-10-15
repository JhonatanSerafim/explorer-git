import { useState, useCallback } from 'react';
import { Repository, UseGithubSearchReturn } from '../types';
import { githubApi } from '../services/githubApi';

export const useGithubSearch = (): UseGithubSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('stars');
  const [sortOrder, setSortOrder] = useState('desc');
  const [language, setLanguage] = useState('all');
  const [minStars, setMinStars] = useState('');
  const [updatedAfter, setUpdatedAfter] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const itemsPerPage = 5;

  const searchRepositories = useCallback(async (query: string, page: number = 1) => {
    setLoading(true);
    setError('');

    try {
      const data = await githubApi.searchRepositories(
        query, 
        page, 
        itemsPerPage, 
        sortBy, 
        sortOrder,
        language, 
        minStars, 
        updatedAfter
      );
      setRepositories(data.items);
      
      // Limitar o número máximo de páginas (GitHub API tem limite de 1000 resultados)
      const maxResults = Math.min(data.total_count, 1000);
      const calculatedPages = Math.ceil(maxResults / itemsPerPage);
      setTotalPages(calculatedPages);
      
      // Se a página atual for maior que o total de páginas, voltar para a primeira
      if (page > calculatedPages) {
        setCurrentPage(1);
      }
    } catch (err) {
      setError('Erro ao buscar repositórios. Tente novamente.');
      setRepositories([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder, language, minStars, updatedAfter, itemsPerPage]);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setRepositories([]);
      setHasSearched(false);
      return;
    }
    
    // Resetar todos os filtros ao fazer uma nova busca
    setLanguage('all');
    setMinStars('');
    setUpdatedAfter('');
    setSortBy('stars');
    setSortOrder('desc');
    setCurrentPage(1);
    setHasSearched(true);
    
    // Fazer busca com filtros resetados
    // Usamos a API diretamente aqui para garantir que os filtros estão resetados
    setLoading(true);
    setError('');

    githubApi.searchRepositories(
      searchTerm, 
      1, 
      itemsPerPage, 
      'stars', 
      'desc',
      'all', 
      '', 
      ''
    ).then(data => {
      setRepositories(data.items);
      
      const maxResults = Math.min(data.total_count, 1000);
      const calculatedPages = Math.ceil(maxResults / itemsPerPage);
      setTotalPages(calculatedPages);
      
      if (1 > calculatedPages) {
        setCurrentPage(1);
      }
    }).catch(() => {
      setError('Erro ao buscar repositórios. Tente novamente.');
      setRepositories([]);
      setTotalPages(0);
    }).finally(() => {
      setLoading(false);
    });
  }, [searchTerm, itemsPerPage]);

  const handleApplyFilters = useCallback(() => {
    if (!searchTerm.trim()) {
      setRepositories([]);
      setHasSearched(false);
      return;
    }
    setCurrentPage(1);
    setHasSearched(true);
    // Aplica filtros com o termo de busca atual
    searchRepositories(searchTerm, 1);
  }, [searchTerm, searchRepositories]);

  const handlePageChange = useCallback((page: number) => {
    // Validar se a página está dentro dos limites
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
    searchRepositories(searchTerm, page);
  }, [searchTerm, searchRepositories, totalPages]);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
  }, []);

  const handleMinStarsChange = useCallback((stars: string) => {
    setMinStars(stars);
  }, []);

  const handleUpdatedAfterChange = useCallback((date: string) => {
    setUpdatedAfter(date);
  }, []);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
  }, []);

  const handleSortOrderChange = useCallback((newSortOrder: string) => {
    setSortOrder(newSortOrder);
  }, []);

  return {
    // Estados
    searchTerm,
    repositories,
    loading,
    currentPage,
    sortBy,
    sortOrder,
    language,
    minStars,
    updatedAfter,
    totalPages,
    error,
    hasSearched,
    
    // Funções
    setSearchTerm,
    handleSearch,
    handleApplyFilters,
    handlePageChange,
    handleLanguageChange,
    handleMinStarsChange,
    handleUpdatedAfterChange,
    handleSortChange,
    handleSortOrderChange,
  };
};
