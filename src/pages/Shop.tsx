import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { CATEGORIES, products } from '../data/products'
import { useSEO } from '../hooks/useSEO'

type SortKey = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name'
type PriceBand = 'all' | 'under-200' | '200-400' | 'above-400'

const sortLabels: Array<{ value: SortKey; label: string }> = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
]

const priceBands: Array<{ value: PriceBand; label: string }> = [
  { value: 'all', label: 'Any price' },
  { value: 'under-200', label: 'Under ₹200' },
  { value: '200-400', label: '₹200 – ₹400' },
  { value: 'above-400', label: 'Above ₹400' },
]

export function Shop() {
  const [params, setParams] = useSearchParams()

  useSEO({
    title: 'Shop All Products',
    description:
      'Browse the full HSV Sugandhika collection of incense, dhoop, cotton wicks, sacred powders and devotional essentials.',
    path: 'shop',
  })

  const query = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const sort = (params.get('sort') as SortKey) || 'featured'
  const band = (params.get('price') as PriceBand) || 'all'

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'all' && value !== 'featured') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase()
    const filtered = products.filter((product) => {
      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.summary.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      const matchesCategory = !category || product.category === category
      const matchesBand =
        band === 'all' ||
        (band === 'under-200' && product.price < 200) ||
        (band === '200-400' && product.price >= 200 && product.price <= 400) ||
        (band === 'above-400' && product.price > 400)
      return matchesTerm && matchesCategory && matchesBand
    })

    return filtered.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'newest') return b.addedAt.localeCompare(a.addedAt)
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    })
  }, [query, category, band, sort])

  const hasFilters = Boolean(query || category || band !== 'all')

  return (
    <div className="page shop-page">
      <div className="page-hero page-hero--shop">
        <div className="container">
          <p className="eyebrow eyebrow--line">The Collection</p>
          <h1>Handcrafted for Every Ritual</h1>
          <p>
            Explore sacred fragrances, traditional dhoop, cotton wicks and
            devotional essentials — all in one place.
          </p>
        </div>
      </div>

      <div className="container shop-layout">
        <aside className="shop-filters" aria-label="Product filters">
          <div className="shop-filters__head">
            <h2><SlidersHorizontal size={18} /> Filters</h2>
            {hasFilters && (
              <button type="button" onClick={() => setParams({})}>Clear all</button>
            )}
          </div>

          <div className="filter-group">
            <h3>Search</h3>
            <label className="filter-search">
              <Search size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => setParam('q', event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
              />
              {query && (
                <button type="button" onClick={() => setParam('q', '')} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-options">
              <button
                type="button"
                className={!category ? 'is-active' : ''}
                onClick={() => setParam('category', '')}
              >
                All categories
              </button>
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? 'is-active' : ''}
                  onClick={() => setParam('category', category === item ? '' : item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <div className="filter-options">
              {priceBands.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={band === item.value ? 'is-active' : ''}
                  onClick={() => setParam('price', item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-note">
            <p>Looking for something specific?</p>
            <a href="https://wa.me/918125117683?text=Hello%20HSV%20Sugandhika!%20I%20would%20like%20to%20know%20more%20about%20your%20products." target="_blank" rel="noopener noreferrer">
              Ask us on WhatsApp
            </a>
          </div>
        </aside>

        <div className="shop-results">
          <SectionHeading
            eyebrow={`${visibleProducts.length} products`}
            title={category || 'All Sacred Essentials'}
            subtitle="Quietly made, thoughtfully chosen."
          />
          <div className="shop-toolbar">
            <span>Showing {visibleProducts.length} of {products.length}</span>
            <label>
              Sort by
              <select
                value={sort}
                onChange={(event) => setParam('sort', event.target.value)}
                aria-label="Sort products"
              >
                {sortLabels.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try a different search term or clear your filters to see the full collection.</p>
              <button type="button" className="button button--primary" onClick={() => setParams({})}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
