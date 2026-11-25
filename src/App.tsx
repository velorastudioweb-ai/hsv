import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { SearchOverlay } from './components/SearchOverlay'
import { WhatsAppButton } from './components/WhatsAppButton'
import { ScrollToTop } from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import { useReveal } from './hooks/useReveal'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Collections } from './pages/Collections'
import { ProductDetail } from './pages/ProductDetail'
import { Story } from './pages/Story'
import { Contact } from './pages/Contact'
import { Checkout } from './pages/Checkout'
import { PolicyPage } from './pages/PolicyPage'
import { useSEO } from './hooks/useSEO'

function NotFound() {
  useSEO({ title: 'Page not found', description: 'The page you requested was not found.', path: '' })
  return (
    <div className="page not-found">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page has wandered off</h1>
        <p>Let’s bring you back to something beautiful.</p>
        <Link to="/" className="button button--primary">Back to home</Link>
      </div>
    </div>
  )
}

function Site() {
  const [searchOpen, setSearchOpen] = useState(false)
  useReveal()

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [searchOpen])

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onSearch={() => setSearchOpen(true)} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/our-story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Site />
    </CartProvider>
  )
}
