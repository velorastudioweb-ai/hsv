import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'
import { ProductCard } from './ProductCard'

interface ProductCarouselProps {
  products: Product[]
  /** Continuously drifts the track from right to left. */
  autoScroll?: boolean
  /** Pixels per second when auto-scrolling. */
  speed?: number
}

export function ProductCarousel({
  products,
  autoScroll = false,
  speed = 28,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  useEffect(() => {
    if (!autoScroll || reduceMotion || products.length < 2) return

    let frame = 0
    let last = performance.now()

    const tick = (now: number) => {
      const track = trackRef.current
      if (track && !pausedRef.current) {
        // The list is rendered twice. Wrapping by exactly one full set
        // (cards + gaps) keeps the loop visually seamless.
        const firstSlide = track.querySelector<HTMLElement>('.carousel__slide')
        const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0') || 0
        const oneSet = firstSlide
          ? (firstSlide.offsetWidth + gap) * products.length
          : track.scrollWidth / 2
        track.scrollLeft += ((now - last) / 1000) * speed
        if (oneSet > 0 && track.scrollLeft >= oneSet) {
          track.scrollLeft -= oneSet
        }
      }
      last = now
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [autoScroll, reduceMotion, speed, products.length])

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.product-card')
    const amount = card ? card.offsetWidth + 22 : track.clientWidth * 0.8
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  const slides = autoScroll ? [...products, ...products] : products

  return (
    <div className="carousel">
      <div
        className={`carousel__track${autoScroll ? ' carousel__track--auto' : ''}`}
        ref={trackRef}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
        onFocusCapture={() => { pausedRef.current = true }}
        onBlurCapture={() => { pausedRef.current = false }}
      >
        {slides.map((product, index) => {
          const isClone = autoScroll && index >= products.length
          return (
            <div
              className={`carousel__slide${isClone ? ' carousel__slide--clone' : ''}`}
              key={`${product.slug}-${index}`}
              aria-hidden={isClone || undefined}
              ref={
                isClone
                  ? (node) => {
                      if (node) node.inert = true
                    }
                  : undefined
              }
            >
              <ProductCard product={product} priority={index < 2} />
            </div>
          )
        })}
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
