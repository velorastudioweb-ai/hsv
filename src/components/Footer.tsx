import { Link } from 'react-router-dom'
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { LotusMark } from './BrandMark'
import { brand, navLinks, policies, socialLinks } from '../data/site'

const socialIcons = {
  Instagram,
  Facebook,
  Youtube,
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-incentives">
          <span>Free delivery above ₹999</span>
          <i />
          <span>Free gift above ₹1,999</span>
          <i />
          <span>Secure checkout with encrypted payments</span>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand__mark">
              <LotusMark />
            </div>
            <h2>{brand.logoText}</h2>
            <p className="footer-brand__tagline">{brand.tagline}</p>
            <p className="footer-brand__message">{brand.footerMessage}</p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Reach Us</h3>
            <ul className="footer-contact">
              <li><MapPin size={16} /><span>{brand.location}</span></li>
              <li>
                <Phone size={16} />
                <a href={`tel:${brand.phoneDisplay.replace(/\s/g, '')}`}>{brand.phoneDisplay}</a>
              </li>
              <li><Mail size={16} /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li><Clock size={16} /><span>{brand.hours}</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Follow the Journey</h3>
            <p className="footer-column__note">Stories, rituals and new creations from our workshop.</p>
            <div className="social-row">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} HSV Sugandhika. All rights reserved.</p>
          <nav aria-label="Legal">
            {policies.map((policy) => (
              <Link key={policy.slug} to={`/policies/${policy.slug}`}>
                {policy.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
