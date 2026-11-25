import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { testimonials } from '../data/site'

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.testimonial-card')
    const amount = card ? card.offsetWidth + 22 : track.clientWidth * 0.85
    track.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  const [featured, ...rest] = testimonials

  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading
          eyebrow="Community"
          title="Words from Our Community"
          center
          action={
            <div className="carousel__controls carousel__controls--inline">
              <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonial">
                <ArrowLeft size={18} />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Next testimonial">
                <ArrowRight size={18} />
              </button>
            </div>
          }
        />
        <article className="testimonial-feature" data-reveal>
          <Quote className="testimonial-feature__quote" size={40} strokeWidth={1.2} />
          <p className="testimonial-feature__text">“{featured.quote}”</p>
          <footer>
            <span className="testimonial-feature__avatar" aria-hidden="true">
              {featured.name.charAt(0)}
            </span>
            <span>
              <strong>{featured.name}</strong>
              <small>{featured.role}</small>
            </span>
          </footer>
        </article>
        <div className="testimonial-track" ref={trackRef}>
          {rest.map((item) => (
            <article className="testimonial-card" key={item.name} data-reveal>
              <Quote className="testimonial-card__quote-icon" size={28} strokeWidth={1.2} />
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