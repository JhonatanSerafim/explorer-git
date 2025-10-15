import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ThemeProvider } from './contexts/ThemeContext'

/**
 * Componente principal da aplicação Explorer Git
 * Gerencia o layout geral e o tema (dark/light)
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Cabeçalho com logo e toggle de tema */}
        <Header />
        
        {/* Conteúdo principal - Home page */}
        <div className="flex-1 overflow-hidden">
          <Home />
        </div>
        
        {/* Rodapé com informações do desenvolvedor */}
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
