import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'
import { ProductCard } from './ProductCard'

export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.product-card')
    const amount = card ? card.offsetWidth + 22 : track.clientWidth * 0.8
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef}>
        {products.map((product, index) => (
          <div className="carousel__slide" key={product.slug}>
            <ProductCard product={product} priority={index < 2} />
          </div>
        ))}
      </div>
      <div className="carousel__controls">
        <button type="button" onClick={() => scroll(-1)} aria-label="Previous products">
          <ArrowLeft size={18} />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Next products">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
