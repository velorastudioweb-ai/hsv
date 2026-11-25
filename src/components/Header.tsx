import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { useCart } from '../context/CartContext'
import { brand, navLinks } from '../data/site'

interface HeaderProps {
  onSearch: () => void
}

export function Header({ onSearch }: HeaderProps) {
  const { count, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen)
    return () => document.body.classList.remove('mobile-menu-open')
  }, [menuOpen])

  return (
    <>
      <div className="announce-bar">
        <div className="announce-bar__track">
          {[0, 1].map((repeat) => (
            <div className="announce-bar__group" key={repeat} aria-hidden={repeat === 1}>
              <span>Free delivery above ₹999</span>
              <i />
              <span>Free gift above ₹1,999</span>
              <i />
              <span>Secure checkout</span>
              <i />
            </div>
          ))}
        </div>
      </div>

      <header className={`site-header${scrolled ? ' site-header--stuck' : ''}`}>
        <div className="container site-header__inner">
          <BrandMark />

          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `desktop-nav__link${isActive ? ' is-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={onSearch}
              aria-label="Search products"
              title="Search products"
            >
              <Search size={20} strokeWidth={1.7} />
            </button>

            <button
              type="button"
              className="icon-button cart-button"
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
              title="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.7} />
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>

            <button
              type="button"
              className="icon-button menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `mobile-nav__link${isActive ? ' is-active' : ''}`
              }
              style={{ transitionDelay: `${index * 40}ms` }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-nav__footer">
          <a href={`tel:${brand.phoneDisplay.replace(/\s/g, '')}`}>
            {brand.phoneDisplay}
          </a>
          <span>{brand.hours}</span>
        </div>
      </div>
    </>
  )
}
