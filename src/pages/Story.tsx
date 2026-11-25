import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Leaf, Sparkles } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { useSEO } from '../hooks/useSEO'

export function Story() {
  useSEO({
    title: 'Our Story',
    description:
      'The story of HSV Sugandhika: a legacy of sacred devotion, handcrafted incense-making and a connection between tradition, nature and spirituality.',
    path: 'our-story',
  })

  return (
    <div className="page">
      <div className="page-hero page-hero--story">
        <div className="container">
          <p className="eyebrow eyebrow--line">Our Heritage</p>
          <h1>A Legacy of Sacred Devotion</h1>
          <p>
            Traditions woven into every fragrance. Devotion in every handcrafted detail.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container story-page__intro">
          <div className="story-page__image" data-reveal>
            <img
              src="/images/u-1608571423902-eed4a5ad8108.jpg"
              alt="Warm sunlight falling across a natural amber vessel and botanical shadows"
            />
          </div>
          <div className="story-page__copy" data-reveal>
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
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHeading
            eyebrow="What guides us"
            title="The Values Behind the Fragrance"
            center
          />
          <div className="value-grid">
            <article className="value-card" data-reveal>
              <Flame size={28} strokeWidth={1.4} />
              <h3>Handcrafted Devotion</h3>
              <p>The timeless art of incense-making, honoured in every creation.</p>
            </article>
            <article className="value-card" data-reveal>
              <Leaf size={28} strokeWidth={1.4} />
              <h3>Nature & Tradition</h3>
              <p>Sandalwood, natural resins and ingredients drawn from tradition.</p>
            </article>
            <article className="value-card" data-reveal>
              <Sparkles size={28} strokeWidth={1.4} />
              <h3>Peace in Every Moment</h3>
              <p>Fragrance made for prayer, reflection and the spaces we share.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="story-quote">
        <div className="container" data-reveal>
          <blockquote>Crafted with devotion. Inspired by tradition.</blockquote>
          <Link to="/shop" className="button button--primary">
            Explore the Collection <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
