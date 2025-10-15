import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Home />
      </div>
      <Footer />
    </div>
  )
}

export default App
