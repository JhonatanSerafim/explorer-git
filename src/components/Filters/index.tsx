import React, { useState } from 'react';
import { FiltersProps } from '../../types';

const Filters: React.FC<FiltersProps> = ({
  language,
  minStars,
  updatedAfter,
  onLanguageChange,
  onMinStarsChange,
  onUpdatedAfterChange,
  onApplyFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header com título e ícone */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filtros</h2>
        <button
          onClick={toggleExpanded}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filtros em linha horizontal */}
      {isExpanded && (
        <div className="flex flex-wrap items-end gap-4">
          {/* Filtro de Linguagem */}
          <div className="flex flex-col min-w-[140px]">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Linguagem</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 pr-8 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filtro de Estrelas */}
          <div className="flex flex-col min-w-[140px]">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantidade de Estrelas</label>
            <input
              type="number"
              min="0"
              value={minStars}
              onChange={(e) => onMinStarsChange(e.target.value)}
              placeholder="Ex: 87, 394, 1000..."
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Filtro de Data de Atualização */}
          <div className="flex flex-col min-w-[140px]">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Atualizado Após</label>
            <input
              type="date"
              value={updatedAfter}
              onChange={(e) => onUpdatedAfterChange(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:dark:invert [&::-webkit-calendar-picker-indicator]:dark:opacity-80 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>


          {/* Botão Aplicar Filtros */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-transparent mb-2">Aplicar</label>
            <button
              onClick={onApplyFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
