import { useEffect } from 'react'
import { SITE_URL } from '../data/site'

interface SEOOptions {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'product'
}

/**
 * Keeps document title, description, canonical and social tags in sync
 * with the active route. No router dependency beyond a path string.
 */
export function useSEO({
  title,
  description,
  path = '',
  image = '/images/hero-og.jpg',
  type = 'website',
}: SEOOptions) {
  useEffect(() => {
    const fullTitle =
      title === 'HSV Sugandhika'
        ? title
        : `${title} | HSV Sugandhika`
    document.title = fullTitle

    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.slice(11, -2))
        } else {
          element.setAttribute('property', selector.slice(15, -2))
        }
        document.head.appendChild(element)
      }
      element.setAttribute(attribute, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:type"]', 'content', type)
    setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)

    const canonicalUrl = new URL(path, SITE_URL).toString()
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
  }, [title, description, path, image, type])
}

/** Structured data helper for product detail pages. */
export function ProductJsonLd({
  name,
  description,
  image,
  price,
  slug,
}: {
  name: string
  description: string
  image: string
  price: number
  slug: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: new URL(image, SITE_URL).toString(),
    brand: { '@type': 'Brand', name: 'HSV Sugandhika' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price,
      availability: 'https://schema.org/InStock',
      url: new URL(`products/${slug}`, SITE_URL).toString(),
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
