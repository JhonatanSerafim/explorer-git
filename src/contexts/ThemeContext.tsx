import React, { createContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType, ThemeProviderProps } from '../types';

/**
 * Contexto de tema da aplicação
 * Exportado para ser usado pelo hook useTheme
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider do contexto de tema
 * Gerencia o estado do tema e persiste no localStorage
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Verificar preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Aplicar tema ao documento
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Salvar no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
