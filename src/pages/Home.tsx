import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Leaf, Plus } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { useCart } from '../context/CartContext'

import { IncentiveStrip } from '../components/IncentiveStrip'
import { Testimonials } from '../components/Testimonials'
import { ProductCard } from '../components/ProductCard'
import { featuredProducts, newArrivals, formatPrice } from '../data/products'
import { collections } from '../data/site'
import { useSEO } from '../hooks/useSEO'

export function Home() {
  useSEO({
    title: 'HSV Sugandhika',
    description:
      'Discover handcrafted incense, dhoop, cotton wicks and devotional essentials from HSV Sugandhika. Sacred tradition, handcrafted purity, delivered across India.',
    path: '',
  })

  const { addItem } = useCart()
  const featuredArrival = newArrivals[0]
  const otherArrivals = newArrivals.slice(1)

  return (
    <>
      {/* ---------------------------- HERO ---------------------------- */}
      <section className="hero hero--cinematic">
        <div className="hero__bg" aria-hidden="true">
          <img
            src="/images/heritage-opt.png"
            alt=""
            loading="eager"
            decoding="async"
          />
          <span className="hero__bg-veil" aria-hidden="true" />
        </div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__label">
              <span className="hero__label-dot" />
              Sacred Tradition · Handcrafted Purity
            </p>
            <h1>
              Purity in <em>Every</em> Breath
            </h1>
            <p className="hero__text">
              Discover the timeless beauty of handcrafted sacred fragrances and
              devotional essentials, created to bring purity, peace and
              tradition into every moment.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="button button--primary">
                Explore Collection <ArrowRight size={17} />
              </Link>
              <Link to="/our-story" className="button button--ghost">
                Discover Tradition
              </Link>
            </div>
            <div className="hero__proof">
              <span><Flame size={16} /> Handcrafted with care</span>
              <span><Leaf size={16} /> Charcoal-free rituals</span>
            </div>
          </div>

          <div className="hero__visual" aria-label="Handcrafted incense and pooja essentials">
            <div className="hero__frame hero__frame--main">
              <img
                src="/images/heritage-opt.png"
                alt="Artisan hand-rolling incense sticks beside sandalwood, brass diyas and flowers"
                loading="eager"
              />
              <span className="hero__frame-shine" aria-hidden="true" />
            </div>
            <div className="hero__frame hero__frame--top">
              <img src="/images/gandham.jpg" alt="HSV Sugandhika Gandham sandalwood powder" />
            </div>
            <div className="hero__frame hero__frame--bottom">
              <img src="/images/wicks-365.jpg" alt="Pure handmade cotton wicks" loading="lazy" />
            </div>
            <div className="hero__seal" aria-hidden="true">
              <span>100%</span>
              <small>Charcoal Free</small>
            </div>
          </div>
        </div>
        <div className="hero__scroll" aria-hidden="true"><span /></div>
      </section>

      <IncentiveStrip />

      {/* ------------------------ NEW ARRIVALS ------------------------ */}
      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="Just landed"
            title="New Arrivals"
            subtitle="Our latest creations, crafted with devotion and care."
            action={
              <Link to="/shop?sort=newest" className="text-link">
                View All Products <ArrowRight size={16} />
              </Link>
            }
          />
          {featuredArrival && (
            <div className="arrivals-editorial" data-reveal>
              <article className="arrival-feature">
                <Link to={`/products/${featuredArrival.slug}`} className="arrival-feature__media">
                  <img
                    src={featuredArrival.image}
                    alt={featuredArrival.imageAlt}
                    loading="eager"
                  />
                </Link>
                <div className="arrival-feature__body">
                  <span className="arrival-feature__eyebrow">{featuredArrival.category}</span>
                  <h3 className="arrival-feature__title">
                    <Link to={`/products/${featuredArrival.slug}`}>{featuredArrival.name}</Link>
                  </h3>
                  <p className="arrival-feature__summary">{featuredArrival.summary}</p>
                  <div className="arrival-feature__foot">
                    <span className="arrival-feature__price">{formatPrice(featuredArrival.price)}</span>
                    <button
                      type="button"
                      className="button button--primary arrival-feature__add"
                      onClick={() => addItem(featuredArrival.slug)}
                    >
                      Add to Cart
                    </button>
                    <Link to={`/products/${featuredArrival.slug}`} className="text-link">
                      View Product <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
              <div className="arrival-side">
                {otherArrivals.map((product) => (
                  <div className="arrival-side__item" key={product.slug}>
                    <Link
                      to={`/products/${product.slug}`}
                      className="arrival-side__media"
                      aria-label={`View ${product.name}`}
                    >
                      <img src={product.image} alt={product.imageAlt} loading="lazy" />
                    </Link>
                    <Link to={`/products/${product.slug}`} className="arrival-side__body">
                      <span className="arrival-side__category">{product.category}</span>
                      <strong className="arrival-side__name">{product.name}</strong>
                      <span className="arrival-side__price">{formatPrice(product.price)}</span>
                    </Link>
                    <button
                      type="button"
                      className="arrival-side__add"
                      onClick={() => addItem(product.slug)}
                      aria-label={`Add ${product.name} to cart`}
                      title="Add to cart"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* -------------------------- COLLECTIONS ----------------------- */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Shop by ritual"
            title="Collections for Every Moment"
            subtitle="From the first diya of the morning to the quiet of evening prayer."
          />
          <div className="collection-grid">
            {collections.map((collection) => (
              <Link
                key={collection.category}
                to={`/shop?category=${encodeURIComponent(collection.category)}`}
                className="collection-card"
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

      {/* ----------------------- FEATURED PRODUCTS -------------------- */}
      <section className="section section--sand">
        <div className="container">
          <SectionHeading
            eyebrow="Most loved"
            title="Sacred Essentials"
            subtitle="Time-honoured essentials for the rituals that matter most."
            center
          />
          <div className="product-grid product-grid--four">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="section__cta">
            <Link to="/shop" className="button button--primary">
              View All Products <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------- BRAND STORY ----------------------- */}
      <section className="section story-section" id="story">
        <div className="container story-section__inner">
          <div className="story-section__visual" data-reveal>
            <div className="story-section__image">
              <img
                src="/images/u-1608571423902-eed4a5ad8108.jpg"
                alt="Warm sunlight and botanical shadows on a natural amber vessel"
                loading="lazy"
              />
            </div>
            <div className="story-section__inset">
              <img src="/images/incense-alt.jpg" alt="Natural handcrafted incense sticks" loading="lazy" />
            </div>
            <span className="story-section__line" aria-hidden="true" />
          </div>
          <div className="story-section__copy" data-reveal>
            <p className="eyebrow eyebrow--line">Our Heritage</p>
            <h2>A Legacy of Sacred Devotion</h2>
            <p>
              Our traditions are woven into every fragrance we create. Inspired
              by generations of sacred rituals and the timeless art of
              incense-making, HSV Sugandhika celebrates the purity of
              handcrafted devotion.
            </p>
            <p>
              From authentic sandalwood and natural resins to the delicate art
              of hand-rolling agarbatti, every creation reflects a connection
              between tradition, nature and spirituality.
            </p>
            <p>
              Our products are inspired by the rituals that bring families
              together, the moments that invite peace and the fragrances that
              connect us to the divine.
            </p>
            <Link to="/our-story" className="text-link">
              Read Our Full Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------- EXPERIENCE ------------------------ */}
      <section className="section experience-section section--cream">
        <div className="container">
          <div className="experience-section__intro" data-reveal>
            <p className="eyebrow eyebrow--line">The Experience</p>
            <h2>A Symphony for the Senses</h2>
            <p>
              Let every fragrance transform your surroundings into a space of
              calm, devotion and serenity.
            </p>
            <p>
              Inspired by sandalwood, temple traditions and natural aromatic
              elements, our fragrances are crafted to create a meaningful
              sensory experience.
            </p>
          </div>
          <div className="experience-panels">
            <article className="experience-panel" data-reveal>
              <div className="experience-panel__media">
                <img src="/images/incense-pineapple.jpg" alt="Charcoal-free incense sticks" loading="lazy" />
              </div>
              <div className="experience-panel__body">
                <p className="eyebrow eyebrow--line">Cleaner burn</p>
                <h3>100% Charcoal Free</h3>
                <p>
                  A cleaner, more mindful fragrance experience rooted in the
                  brand’s charcoal-free commitment.
                </p>
              </div>
            </article>
            <article className="experience-panel" data-reveal>
              <div className="experience-panel__media">
                <img src="/images/dhoop-photo.jpg" alt="Natural aromatic resins" loading="lazy" />
              </div>
              <div className="experience-panel__body">
                <p className="eyebrow eyebrow--line">From nature</p>
                <h3>Pure Natural Resins</h3>
                <p>
                  Natural aromatic resins and traditional ingredients, chosen
                  for a fragrance that feels close to nature.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* --------------------------- CLOSING CTA ---------------------- */}
      <section className="closing-cta">
        <div className="container closing-cta__inner" data-reveal>
          <span className="closing-cta__rule" aria-hidden="true" />
          <h2>Bring Purity Into Your Everyday Rituals</h2>
          <p>Handcrafted devotion, ready to find a place in your home.</p>
          <Link to="/shop" className="button button--primary">
            Shop the Collection <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}