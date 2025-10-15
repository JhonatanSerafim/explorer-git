import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * Ponto de entrada da aplicação React
 * Renderiza o componente App no elemento root do HTML
 * React.StrictMode ativa verificações e avisos adicionais no desenvolvimento
 */
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento root não encontrado no HTML')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
