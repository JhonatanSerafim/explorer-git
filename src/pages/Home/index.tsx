import React from 'react';
import { useGithubSearch } from '../../hooks/useGithubSearch';
import SearchBar from '../../components/SearchBar';
import Filters from '../../components/Filters';
import RepositoryTable from '../../components/RepositoryTable';
import Pagination from '../../components/Pagination';

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
    handleApplyFilters,
    handlePageChange,
    handleLanguageChange,
    handleMinStarsChange,
    handleUpdatedAfterChange,
    handleSortChange,
    handleSortOrderChange,
  } = useGithubSearch();


  return (
    <div className="h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-full overflow-y-auto">
        {/* Search Section */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          loading={loading}
        />

        {/* Filters */}
        {hasSearched && (
          <Filters
            language={language}
            minStars={minStars}
            updatedAfter={updatedAfter}
            onLanguageChange={handleLanguageChange}
            onMinStarsChange={handleMinStarsChange}
            onUpdatedAfterChange={handleUpdatedAfterChange}
            onApplyFilters={handleApplyFilters}
          />
        )}

        {/* Results */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-100 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {repositories.length > 0 ? (
          <>
            <RepositoryTable
              repositories={repositories}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onSortOrderChange={handleSortOrderChange}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : !loading && hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-600 dark:text-gray-400 text-lg">Nenhum repositório encontrado</div>
            <div className="text-gray-500 dark:text-gray-500 text-sm mt-2">Tente ajustar sua busca</div>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-600 dark:text-gray-400 text-lg">Digite um termo para buscar repositórios</div>
            <div className="text-gray-500 dark:text-gray-500 text-sm mt-2">Exemplo: react, vue, angular</div>
            <div className="text-gray-600 dark:text-gray-600 text-xs mt-4 max-w-md mx-auto">
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
