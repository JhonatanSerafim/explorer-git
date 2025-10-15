import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Hook customizado para acessar o contexto de tema
 * @returns {ThemeContextType} Objeto contendo o tema atual e função para alternar
 * @throws {Error} Se usado fora do ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

