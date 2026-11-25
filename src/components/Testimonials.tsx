import { Quote } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { testimonials } from '../data/site'

export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading
          eyebrow="Community"
          title="Words from Our Community"
          subtitle="Heartfelt words from those who bring our fragrances into their daily rituals."
          center
        />
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <article
              className={`testimonial-card${index === 0 ? ' testimonial-card--featured' : ''}`}
              key={item.name}
              data-reveal
            >
              <Quote className="testimonial-card__quote-icon" size={32} strokeWidth={1.2} />
              <p className="testimonial-card__text">“{item.quote}”</p>
              <footer>
                <span className="testimonial-card__avatar" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </footer>
            </article>
          ))}
        </div>
        <p className="testimonials-note">
          Testimonials shown as supplied reference content from the brand’s existing website.
        </p>
      </div>
    </section>
  )
}
