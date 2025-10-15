import React from 'react';
import { Repository, RepositoryTableProps } from '../../types';

const RepositoryTable: React.FC<RepositoryTableProps> = ({
  repositories,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange
}) => {
  // Ordenar repositórios localmente
  const sortedRepositories = React.useMemo(() => {
    const sorted = [...repositories];
    
    if (sortBy === 'name') {
      // Ordenação alfabética por nome
      return sorted.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        
        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
    } else if (sortBy === 'stars') {
      // Ordenação por número de estrelas
      return sorted.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.stargazers_count - b.stargazers_count;
        } else {
          return b.stargazers_count - a.stargazers_count;
        }
      });
    } else if (sortBy === 'updated') {
      // Ordenação por data de atualização
      return sorted.sort((a, b) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        
        if (sortOrder === 'asc') {
          return dateA - dateB; // Mais antiga primeiro
        } else {
          return dateB - dateA; // Mais recente primeiro
        }
      });
    }
    
    return repositories;
  }, [repositories, sortBy, sortOrder]);

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button
                  onClick={() => {
                    if (sortBy === 'name') {
                      onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      onSortChange('name');
                      onSortOrderChange('asc');
                    }
                  }}
                  className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>REPOSITÓRIO</span>
                  <svg className={`w-4 h-4 ${sortBy === 'name' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortBy === 'name' && sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    )}
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                DESCRIÇÃO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button
                  onClick={() => {
                    if (sortBy === 'stars') {
                      onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      onSortChange('stars');
                      onSortOrderChange('desc');
                    }
                  }}
                  className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>ESTRELAS</span>
                  <svg className={`w-4 h-4 ${sortBy === 'stars' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortBy === 'stars' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    )}
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <button
                  onClick={() => {
                    if (sortBy === 'updated') {
                      onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      onSortChange('updated');
                      onSortOrderChange('desc');
                    }
                  }}
                  className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>ÚLTIMA ATUALIZAÇÃO</span>
                  <svg className={`w-4 h-4 ${sortBy === 'updated' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortBy === 'updated' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    )}
                  </svg>
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                AÇÃO
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedRepositories.map((repo: Repository) => (
              <tr key={repo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{truncateName(repo.name)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 max-w-md truncate">
                    {repo.description || 'Nenhuma descrição disponível'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {formatStars(repo.stargazers_count)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {formatDate(repo.updated_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm font-medium"
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
  );
};

export default RepositoryTable;
