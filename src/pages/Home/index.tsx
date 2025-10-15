import React from 'react';
import { useGithubSearch } from '../../hooks/useGithubSearch';
import { Repository } from '../../types';

const Home: React.FC = () => {
  const {
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
    setSearchTerm,
    handleSearch,
    handlePageChange,
    handleLanguageChange,
    handleMinStarsChange,
    handleUpdatedAfterChange,
    handleSortChange,
    handleSortOrderChange,
  } = useGithubSearch();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} horas atrás`;
    } else if (diffInHours < 48) {
      return 'ontem';
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} dias atrás`;
    }
  };

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const truncateName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) {
      return name;
    }
    return name.substring(0, maxLength) + '...';
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 7;
    
    // Calcular páginas visíveis
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão Previous
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Anterior
      </button>
    );

    // Primeira página
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-400">
            ...
          </span>
        );
      }
    }

    // Páginas visíveis
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium rounded-lg ${
            i === currentPage
              ? 'text-white bg-blue-600 border border-blue-600'
              : 'text-gray-500 bg-gray-800 border border-gray-600 hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-400">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          {totalPages}
        </button>
      );
    }

    // Botão Next
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || totalPages === 0}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próximo →
      </button>
    );

    return pages;
  };

  return (
    <div className="h-full bg-gray-900 text-white overflow-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-full overflow-auto">
        {/* Search Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar repositórios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {/* Filters */}
          {repositories.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Filtros</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {/* Filtro de Linguagem */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">Linguagem</label>
                  <select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todas</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                    <option value="php">PHP</option>
                  </select>
                </div>

                {/* Filtro de Estrelas Mínimas */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">Estrelas Mínimas</label>
                  <input
                    type="number"
                    value={minStars}
                    onChange={(e) => handleMinStarsChange(e.target.value)}
                    placeholder="Ex: 100"
                    className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  />
                </div>

                {/* Filtro de Data de Atualização */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">Atualizado Após</label>
                  <input
                    type="date"
                    value={updatedAfter}
                    onChange={(e) => handleUpdatedAfterChange(e.target.value)}
                    className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filtro de Ordenação */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">Ordenar Por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="stars">Estrelas</option>
                    <option value="updated">Data de Atualização</option>
                    <option value="name">Nome (A-Z)</option>
                  </select>
                </div>

                {/* Filtro de Ordem */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400 mb-1">Ordem</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => handleSortOrderChange(e.target.value)}
                    className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Decrescente</option>
                    <option value="asc">Crescente</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {repositories.length > 0 ? (
          <>
            {/* Repository Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => {
                            if (sortBy === 'name') {
                              handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              handleSortChange('name');
                              handleSortOrderChange('asc');
                            }
                          }}
                          className="flex items-center space-x-1 hover:text-white transition-colors"
                        >
                          <span>REPOSITÓRIO</span>
                          <svg className={`w-4 h-4 ${sortBy === 'name' ? 'text-blue-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortBy === 'name' && sortOrder === 'asc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            )}
                          </svg>
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        DESCRIÇÃO
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => {
                            if (sortBy === 'stars') {
                              handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              handleSortChange('stars');
                              handleSortOrderChange('desc');
                            }
                          }}
                          className="flex items-center space-x-1 hover:text-white transition-colors"
                        >
                          <span>ESTRELAS</span>
                          <svg className={`w-4 h-4 ${sortBy === 'stars' ? 'text-blue-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortBy === 'stars' && sortOrder === 'desc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            )}
                          </svg>
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        <button
                          onClick={() => {
                            if (sortBy === 'updated') {
                              handleSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                            } else {
                              handleSortChange('updated');
                              handleSortOrderChange('desc');
                            }
                          }}
                          className="flex items-center space-x-1 hover:text-white transition-colors"
                        >
                          <span>ÚLTIMA ATUALIZAÇÃO</span>
                          <svg className={`w-4 h-4 ${sortBy === 'updated' ? 'text-blue-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sortBy === 'updated' && sortOrder === 'desc' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            )}
                          </svg>
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        AÇÃO
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {repositories.map((repo: Repository) => (
                      <tr key={repo.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{truncateName(repo.name)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 max-w-md truncate">
                            {repo.description || 'Nenhuma descrição disponível'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-300">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {formatStars(repo.stargazers_count)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(repo.updated_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            Ver
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex space-x-2">
                  {renderPagination()}
                </nav>
              </div>
            )}
          </>
        ) : !loading && hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Nenhum repositório encontrado</div>
            <div className="text-gray-500 text-sm mt-2">Tente ajustar sua busca</div>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Digite um termo para buscar repositórios</div>
            <div className="text-gray-500 text-sm mt-2">Exemplo: react, vue, angular</div>
            <div className="text-gray-600 text-xs mt-4 max-w-md mx-auto">
              💡 <strong>Dica:</strong> A API do GitHub tem limite de 60 requisições por hora. 
              Use os filtros para refinar sua busca e evitar muitas consultas.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
