import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Explorer Git
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Projeto React com TypeScript e Tailwind CSS
            </p>
            <div className="flex justify-center space-x-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                React
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                TypeScript
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Vite
              </span>
            </div>
          </div>

          {/* Card Principal */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Contador Interativo
              </h2>
              <div className="mb-8">
                <div className="text-6xl font-bold text-indigo-600 mb-4">
                  {count}
                </div>
                <p className="text-gray-600 mb-6">
                  Clique nos botões abaixo para interagir
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setCount(count - 1)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Diminuir
                </button>
                <button
                  onClick={() => setCount(0)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Resetar
                </button>
                <button
                  onClick={() => setCount(count + 1)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Aumentar
                </button>
              </div>
            </div>
          </div>

          {/* Cards de Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-blue-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Rápido
              </h3>
              <p className="text-gray-600">
                Desenvolvido com Vite para uma experiência de desenvolvimento ultra-rápida.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Type-Safe
              </h3>
              <p className="text-gray-600">
                TypeScript garante que seu código seja mais seguro e fácil de manter.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-purple-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Responsivo
              </h3>
              <p className="text-gray-600">
                Tailwind CSS torna fácil criar designs responsivos e modernos.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-600">
              Projeto criado com ❤️ usando as melhores tecnologias
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
