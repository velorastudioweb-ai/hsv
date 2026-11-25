import { Link } from 'react-router-dom'
import { brand } from '../data/site'

export function LotusMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 10c3 8 3 13 0 18-3-5-3-10 0-18Z" />
        <path d="M32 28c5-6 11-6 15-3-3 7-9 9-15 7" />
        <path d="M32 28c-5-6-11-6-15-3 3 7 9 9 15 7" />
        <path d="M32 30c6 1 10 5 10 11-5 3-9 1-10-4-1 5-5 7-10 4 0-6 4-10 10-11Z" />
        <path d="M19 51c8 4 18 4 26 0" />
      </g>
      <circle cx="32" cy="41" r="2" fill="currentColor" />
    </svg>
  )
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand-mark" aria-label="HSV Sugandhika home">
      <span className="brand-mark__icon">
        <LotusMark />
      </span>
      <span className="brand-mark__text">
        <span className="brand-mark__name">{brand.logoText}</span>
        {!compact && (
          <span className="brand-mark__tagline">{brand.tagline}</span>
        )}
      </span>
    </Link>
  )
}
