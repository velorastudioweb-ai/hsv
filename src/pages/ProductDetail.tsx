import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, Minus, Plus, ShoppingBag, Zap } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import {
  formatPrice,
  getProduct,
  relatedProducts,
} from '../data/products'
import { ProductJsonLd, useSEO } from '../hooks/useSEO'
import { brand } from '../data/site'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProduct(slug)
  const { addItem, buyNow } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setQuantity(1)
    setActiveImage(0)
  }, [slug])

  useSEO({
    title: product?.name ?? 'Product not found',
    description: product?.summary ?? 'This product is no longer in the catalogue.',
    path: product ? `products/${product.slug}` : 'shop',
    image: product?.image,
    type: 'product',
  })

  if (!product) {
    return (
      <div className="page not-found">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>Product not found</h1>
          <p>This product is no longer in the catalogue.</p>
          <Link to="/shop" className="button button--primary">Browse all products</Link>
        </div>
      </div>
    )
  }

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image]

  return (
    <div className="page product-page">
      <ProductJsonLd
        name={product.name}
        description={product.summary}
        image={product.image}
        price={product.price}
        slug={product.slug}
      />
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><ChevronRight size={14} />
          <Link to="/shop">Shop</Link><ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="product-detail__gallery">
            <div className="product-detail__main-image">
              <img src={gallery[activeImage]} alt={product.imageAlt} />
              {product.badge && <span className="product-card__badge">{product.badge}</span>}
            </div>
            {gallery.length > 1 && (
              <div className="product-detail__thumbs">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={index === activeImage ? 'is-active' : ''}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail__info">
            <p className="eyebrow eyebrow--line">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="product-detail__price">{formatPrice(product.price)}</p>
            <p className="product-detail__intro">{product.summary}</p>

            <div className="product-detail__buy">
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(99, current + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                className="button button--primary button--full"
                onClick={() => addItem(product.slug, quantity)}
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button
                type="button"
                className="button button--ghost button--full"
                onClick={() => {
                  buyNow(product.slug, quantity)
                  navigate('/checkout')
                }}
              >
                <Zap size={18} /> Buy Now
              </button>
            </div>

            <div className="product-detail__assurances">
              <span><Check size={15} /> Free delivery above ₹999</span>
              <span><Check size={15} /> Free gift above ₹1,999</span>
            </div>
            <p className="product-detail__help">
              Need help with this product?{' '}
              <a
                href={`${brand.whatsappUrl}?text=${encodeURIComponent(`Hello HSV Sugandhika! I would like to know more about ${product.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat with us
              </a>
            </p>

            <div className="product-detail__description">
              <h2>About this product</h2>
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section section--cream">
        <div className="container">
          <SectionHeadingLite title="You may also like" />
          <div className="product-grid product-grid--four">
            {relatedProducts(product).map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
          <div className="section__cta">
            <Link to="/shop" className="text-link">View All Products <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function SectionHeadingLite({ title }: { title: string }) {
  return <h2 className="simple-section-title" data-reveal>{title}</h2>
}
