import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/products'
import { collections } from '../data/site'
import { useSEO } from '../hooks/useSEO'

export function Collections() {
  useSEO({
    title: 'Collections',
    description:
      'Explore HSV Sugandhika collections: incense, dhoop, cotton wicks, sacred powders and devotional essentials.',
    path: 'collections',
  })

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--line">Curated with care</p>
          <h1>Collections</h1>
          <p>Discover the essentials that shape a sacred space, ritual by ritual.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="collection-grid collection-grid--large">
            {collections.map((collection) => (
              <Link
                key={collection.category}
                to={`/shop?category=${encodeURIComponent(collection.category)}`}
                className="collection-card collection-card--large"
                data-reveal
              >
                <div className="collection-card__image">
                  <img src={collection.image} alt="" loading="lazy" />
                </div>
                <div className="collection-card__body">
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                  <span>Explore <ArrowRight size={15} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="The complete range"
            title="Every Product, One Place"
            subtitle="Browse the entire handcrafted catalogue."
            action={<Link to="/shop" className="text-link">Go to Shop <ArrowRight size={16} /></Link>}
          />
          <div className="product-grid product-grid--four">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
