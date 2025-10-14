import { useState, useCallback } from 'react';
import { Repository } from '../types';
import { githubApi } from '../services/githubApi';

export const useGithubSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('stars');
  const [language, setLanguage] = useState('all');
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');

  const itemsPerPage = 10;

  const searchRepositories = useCallback(async (query: string, page: number = 1) => {
    setLoading(true);
    setError('');

    try {
      const data = await githubApi.searchRepositories(query, page, itemsPerPage, sortBy, language);
      setRepositories(data.items);
      setTotalPages(Math.ceil(data.total_count / itemsPerPage));
    } catch (err) {
      setError('Erro ao buscar repositórios. Tente novamente.');
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, language, itemsPerPage]);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setRepositories([]);
      return;
    }
    setCurrentPage(1);
    searchRepositories(searchTerm, 1);
  }, [searchTerm, searchRepositories]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    searchRepositories(searchTerm, page);
  }, [searchTerm, searchRepositories]);

  const handleLanguageChange = useCallback((newLanguage: string) => {
    setLanguage(newLanguage);
    if (searchTerm.trim()) {
      setCurrentPage(1);
      searchRepositories(searchTerm, 1);
    }
  }, [searchTerm, searchRepositories]);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
    if (searchTerm.trim()) {
      setCurrentPage(1);
      searchRepositories(searchTerm, 1);
    }
  }, [searchTerm, searchRepositories]);

  return {
    // Estados
    searchTerm,
    repositories,
    loading,
    currentPage,
    sortBy,
    language,
    totalPages,
    error,
    
    // Funções
    setSearchTerm,
    handleSearch,
    handlePageChange,
    handleLanguageChange,
    handleSortChange,
  };
};
