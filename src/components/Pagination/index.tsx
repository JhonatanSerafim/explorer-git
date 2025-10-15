import React from 'react';
import { PaginationProps } from '../../types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  // Detectar se é mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint do Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderPagination = () => {
    const pages = [];
    // Mobile: 3 páginas visíveis | Desktop: 7 páginas visíveis
    const maxVisiblePages = isMobile ? 3 : 7;
    
    // Calcular páginas visíveis
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão Previous
    pages.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">← Anterior</span>
        <span className="sm:hidden">←</span>
      </button>
    );

    // Primeira página (oculta em mobile se não for necessária)
    if (startPage > 1 && !isMobile) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-1 sm:px-3 py-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
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
          onClick={() => onPageChange(i)}
          className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
            i === currentPage
              ? 'text-white bg-blue-600 border border-blue-600'
              : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Última página (oculta em mobile se não for necessária)
    if (endPage < totalPages && !isMobile) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-1 sm:px-3 py-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Botão Next
    pages.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || totalPages === 0}
        className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline">Próximo →</span>
        <span className="sm:hidden">→</span>
      </button>
    );

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 sm:mt-8 flex justify-center px-2 sm:px-0">
      <nav className="flex flex-wrap justify-center gap-1 sm:gap-2">
        {renderPagination()}
      </nav>
    </div>
  );
};

export default Pagination;
