import { useState } from 'react'
import Header from './components/Header'
import { Repository, SearchResponse } from './types'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('stars')
  const [language, setLanguage] = useState('all')
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState('')

  const itemsPerPage = 10

  const searchRepositories = async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setRepositories([])
      return
    }

    setLoading(true)
    setError('')

    try {
      const sortParam = sortBy === 'stars' ? 'stars' : 'updated'
      const orderParam = sortBy === 'stars' ? 'desc' : 'desc'
      
      let queryString = `${query}`
      if (language !== 'all') {
        queryString += ` language:${language}`
      }

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(queryString)}&sort=${sortParam}&order=${orderParam}&page=${page}&per_page=${itemsPerPage}`
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar repositórios')
      }

      const data: SearchResponse = await response.json()
      setRepositories(data.items)
      setTotalPages(Math.ceil(data.total_count / itemsPerPage))
    } catch (err) {
      setError('Erro ao buscar repositórios. Tente novamente.')
      setRepositories([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    searchRepositories(searchTerm, 1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    searchRepositories(searchTerm, page)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else if (diffInHours < 48) {
      return 'yesterday'
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 7
    
    // Calcular páginas visíveis
    let startPage = Math.max(1, currentPage - 3)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Botão Previous
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>
    )

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
      )
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-400">
            ...
          </span>
        )
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
      )
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-400">
            ...
          </span>
        )
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          {totalPages}
        </button>
      )
    }

    // Botão Next
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    )

    return pages
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  placeholder="Search for repositories..."
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <div className="flex space-x-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Language: All</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="php">PHP</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="stars">Sort by: Most Stars</option>
                  <option value="updated">Sort by: Recently Updated</option>
                </select>
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
                        REPOSITORY
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        DESCRIPTION
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        STARS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        LAST UPDATED
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {repositories.map((repo) => (
                      <tr key={repo.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{repo.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 max-w-md truncate">
                            {repo.description || 'No description available'}
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
                            View
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
        ) : !loading && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Nenhum repositório encontrado</div>
            <div className="text-gray-500 text-sm mt-2">Tente ajustar sua busca</div>
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Digite um termo para buscar repositórios</div>
            <div className="text-gray-500 text-sm mt-2">Exemplo: react, vue, angular</div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
