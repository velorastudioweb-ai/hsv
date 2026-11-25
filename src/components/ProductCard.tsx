import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Plus, Zap, ZoomIn, ZoomOut } from 'lucide-react'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

const MIN_ZOOM = 1
const MAX_ZOOM = 2.5
const ZOOM_STEP = 0.25

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem, buyNow } = useCart()
  const navigate = useNavigate()
  const [zoom, setZoom] = useState(MIN_ZOOM)

  const changeZoom = (delta: number) =>
    setZoom((current) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((current + delta).toFixed(2)))),
    )

  const handleBuyNow = () => {
    buyNow(product.slug)
    navigate('/checkout')
  }

  return (
    <article className="product-card" data-reveal>
      <div className="product-card__media">
        <Link to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.imageAlt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={zoom > MIN_ZOOM ? { transform: `scale(${zoom})` } : undefined}
          />
        </Link>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}

        <div className="product-card__zoom" role="group" aria-label={`Zoom controls for ${product.name}`}>
          <button
            type="button"
            onClick={() => changeZoom(-ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label={`Zoom out of ${product.name}`}
            title="Zoom out"
          >
            <ZoomOut size={15} />
          </button>
          {zoom > MIN_ZOOM && (
            <span className="product-card__zoom-level">{Math.round(zoom * 100)}%</span>
          )}
          <button
            type="button"
            onClick={() => changeZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label={`Zoom in on ${product.name}`}
            title="Zoom in"
          >
            <ZoomIn size={15} />
          </button>
        </div>

        <div className="product-card__actions">
          <button
            type="button"
            className="product-card__action product-card__action--cart"
            onClick={() => addItem(product.slug)}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} /> Add to Cart
          </button>
          <button
            type="button"
            className="product-card__action product-card__action--buy"
            onClick={handleBuyNow}
            aria-label={`Buy ${product.name} now`}
          >
            <Zap size={16} /> Buy Now
          </button>
        </div>
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="product-card__summary">{product.summary}</p>
        <div className="product-card__foot">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <Link to={`/products/${product.slug}`} className="product-card__view">
            View Product <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}
