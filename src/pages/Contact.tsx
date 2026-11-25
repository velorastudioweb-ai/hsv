import { useState, type FormEvent } from 'react'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { brand } from '../data/site'
import { useSEO } from '../hooks/useSEO'

export function Contact() {
  useSEO({
    title: 'Contact',
    description:
      'Contact HSV Sugandhika in Beeramguda, Hyderabad. Call +91 8125117683, email hsvgrouphub@gmail.com or chat on WhatsApp.',
    path: 'contact',
  })

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = [
      'Hello HSV Sugandhika!',
      name.trim() ? `My name is ${name.trim()}.` : '',
      message.trim(),
    ]
      .filter(Boolean)
      .join('\n')
    window.open(
      `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--line">Reach us</p>
          <h1>We’d Love to Hear From You</h1>
          <p>Questions about a product, an order or a ritual? We’re here to help.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-details" data-reveal>
            <h2>Visit or connect</h2>
            <div className="contact-details__list">
              <div><MapPin size={20} /><span><strong>Location</strong>{brand.location}</span></div>
              <div>
                <Phone size={20} />
                <span>
                  <strong>Phone</strong>
                  <a href={`tel:${brand.phoneDisplay.replace(/\s/g, '')}`}>{brand.phoneDisplay}</a>
                </span>
              </div>
              <div>
                <Mail size={20} />
                <span><strong>Email</strong><a href={`mailto:${brand.email}`}>{brand.email}</a></span>
              </div>
              <div><Clock size={20} /><span><strong>Business hours</strong>{brand.hours}</span></div>
            </div>
            <a
              className="button button--primary"
              href={`${brand.whatsappUrl}?text=${encodeURIComponent(brand.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          <form className="contact-form" onSubmit={submit} data-reveal>
            <h2>Send an enquiry</h2>
            <p>Your message opens in WhatsApp so you can send it directly to our team.</p>
            <label>
              Your name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Optional"
              />
            </label>
            <label>
              Your message
              <textarea
                required
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us what you would like to know"
              />
            </label>
            <button type="submit" className="button button--primary button--full">
              Continue to WhatsApp
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
