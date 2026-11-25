import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { formatPrice, products } from '../data/products'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.summary.toLowerCase().includes(term),
    )
  }, [query])

  if (!open) return null

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search products">
      <button type="button" className="search-overlay__backdrop" onClick={onClose} aria-label="Close search" />
      <div className="search-overlay__panel">
        <div className="container search-overlay__inner">
          <div className="search-overlay__head">
            <p className="eyebrow">Find your ritual essential</p>
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close search">
              <X size={22} />
            </button>
          </div>
          <div className="search-field">
            <Search size={22} strokeWidth={1.6} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product name, e.g. Gandham, wicks, dhoop"
              aria-label="Search products"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="search-results">
            {!query.trim() && (
              <div className="search-suggestions">
                <span>Popular searches</span>
                {['Gandham', 'Cotton Wicks', 'Dhoop', 'Incense'].map((term) => (
                  <button key={term} type="button" onClick={() => setQuery(term)}>
                    {term}
                  </button>
                ))}
              </div>
            )}
            {query.trim() && results.length === 0 && (
              <p className="search-empty">
                No products matched “{query}”. Try a shorter name or browse the full collection.
              </p>
            )}
            {results.map((product) => (
              <Link
                key={product.slug}
                to={`/products/${product.slug}`}
                className="search-result"
                onClick={onClose}
              >
                <img src={product.image} alt={product.imageAlt} />
                <span className="search-result__body">
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                </span>
                <span className="search-result__price">{formatPrice(product.price)}</span>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          {query.trim() && (
            <Link to={`/shop?q=${encodeURIComponent(query)}`} className="text-button" onClick={onClose}>
              View all results in the shop
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
