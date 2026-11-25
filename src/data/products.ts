/**
 * Central product catalogue.
 * ------------------------------------------------------------------
 * To add / edit / remove a product, change only this file. Prices and
 * names below are the inventory supplied by the brand owner. Do not
 * add unverified ingredients, weights, certifications or health claims.
 */

export type Category =
  | 'Incense'
  | 'Dhoop'
  | 'Wicks'
  | 'Sacred Powders'
  | 'Devotional';

export interface Product {
  /** Stable identifier, also used in the URL */
  slug: string
  name: string
  /** Price in Indian Rupees, as supplied by the brand */
  price: number
  category: Category
  /** Short line used on cards and search results */
  summary: string
  /** Honest, source-based product copy used on the detail page */
  description: string[]
  image: string
  imageAlt: string
  gallery: string[]
  badge?: string
  isNew?: boolean
  featured?: boolean
  /** Higher = shown first in "New Arrivals" */
  addedAt: string
}

export const CATEGORIES: Category[] = [
  'Incense',
  'Dhoop',
  'Wicks',
  'Sacred Powders',
  'Devotional',
]

export const products: Product[] = [
  {
    slug: 'gandham',
    name: 'Gandham',
    price: 170,
    category: 'Sacred Powders',
    summary: 'Traditional sandalwood powder for daily pooja and tilak.',
    description: [
      'Gandham is a traditional pooja essential used in Hindu rituals and spiritual ceremonies.',
      'It is commonly applied to deities, used for tilak, and offered during daily pooja, festivals, temple rituals and other auspicious occasions. Its traditional fragrance adds a devotional touch to the worship experience.',
    ],
    image: '/images/gandham.jpg',
    imageAlt: 'HSV Sugandhika Gandham sandalwood powder pouch with powder in a brass bowl',
    gallery: ['/images/gandham.jpg'],
    badge: 'Bestseller',
    isNew: true,
    featured: false,
    addedAt: '2026-01-05',
  },
  {
    slug: 'pure-handmade-cotton-wicks-365-vathulu',
    name: 'Pure Handmade Cotton Wicks (365 Vathulu)',
    price: 206,
    category: 'Wicks',
    summary: 'Handmade cotton wicks for daily pooja and diya lighting.',
    description: [
      'Premium handmade cotton wicks for daily pooja and diya lighting.',
      'Carefully handmade using cotton, these traditional wicks are ideal for lighting diyas during daily pooja, morning and evening prayers, festivals and other auspicious occasions.',
    ],
    image: '/images/wicks-365.jpg',
    imageAlt: 'Bundles of pure handmade cotton wicks by HSV Sugandhika',
    gallery: ['/images/wicks-365.jpg'],
    badge: 'Handmade',
    isNew: true,
    featured: false,
    addedAt: '2026-01-02',
  },
  {
    slug: 'pure-handmade-cotton-wicks-1000-vathulu',
    name: 'Pure Handmade Cotton Wicks (1000 Vathulu)',
    price: 429,
    category: 'Wicks',
    summary: 'Handmade cotton wicks for temples, festivals and everyday rituals.',
    description: [
      'Pure handmade cotton wicks, prepared for daily pooja, diyas, temples, aarti and festive rituals.',
      'Made from cotton, these wicks are a simple, traditional choice for creating a steady flame during devotional occasions.',
    ],
    image: '/images/wicks-1000.jpg',
    imageAlt: 'Pure handmade cotton wicks (1000 Vathulu) from HSV Sugandhika',
    gallery: ['/images/wicks-1000.jpg'],
    badge: 'Value Pack',
    isNew: true,
    featured: false,
    addedAt: '2025-12-20',
  },
  {
    slug: 'pure-cow-dung-javadhu-vibhuthi',
    name: 'Pure Cow Dung Javadhu Vibhuthi',
    price: 180,
    category: 'Sacred Powders',
    summary: 'Traditional vibhuthi with the fragrance of Javadhu.',
    description: [
      'A traditional vibhuthi prepared from cow dung and enriched with the fragrance of Javadhu.',
      'Suitable for daily pooja, meditation and other spiritual practices. Its smooth texture and pleasant aroma create a peaceful atmosphere while reflecting the essence of Indian tradition.',
    ],
    image: '/images/javadhu-vibhuthi.jpg',
    imageAlt: 'HSV Sugandhika Pure Cow Dung Javadhu Vibhuthi pouch and bowl',
    gallery: ['/images/javadhu-vibhuthi.jpg'],
    isNew: true,
    featured: false,
    addedAt: '2025-12-12',
  },
  {
    slug: 'pure-cow-dung-pineapple-incense-sticks',
    name: 'Pure Cow Dung Pineapple Incense Sticks',
    price: 160,
    category: 'Incense',
    summary: 'Traditional cow dung incense with a refreshing pineapple aroma.',
    description: [
      'Crafted using naturally sourced cow dung and infused with a refreshing pineapple-inspired fragrance.',
      'Ideal for the home, pooja room, meditation space or workplace. Place the stick securely in an incense holder, light the tip, allow it to catch fire briefly, then gently extinguish the flame and let it smoulder. Always use in a well-ventilated area and never leave burning incense unattended.',
    ],
    image: '/images/incense-pineapple.jpg',
    imageAlt: 'Pure cow dung pineapple incense sticks from HSV Sugandhika',
    gallery: ['/images/incense-pineapple.jpg', '/images/incense-alt.jpg', '/images/incense-poster2.jpg'],
    badge: 'Signature',
    isNew: false,
    featured: true,
    addedAt: '2025-10-01',
  },
  {
    slug: 'vaijayanthi-maala',
    name: 'Vaijayanthi Maala',
    price: 289,
    category: 'Devotional',
    summary: 'A traditional floral garland for devotional occasions.',
    description: [
      'Vaijayanthi Maala, a devotional garland offered for worship and sacred occasions.',
      'A traditional way to honour deities and adorn a pooja space with flowers.',
    ],
    // Visual stand-in from the brand's own floral devotional imagery.
    // Replace with a dedicated product photograph when one is available.
    image: '/images/flower-wicks.jpg',
    imageAlt: 'Floral devotional product imagery from HSV Sugandhika',
    gallery: ['/images/flower-wicks.jpg'],
    isNew: false,
    featured: true,
    addedAt: '2025-09-18',
  },
  {
    slug: 'normal-cow-dung-dhoop-cups',
    name: 'Normal Cow Dung Dhoop Cups',
    price: 199,
    category: 'Dhoop',
    summary: 'Traditional cow dung dhoop cups with aromatic Sambrani.',
    description: [
      'Traditional cow dung dhoop cups crafted from cow dung and aromatic Sambrani.',
      'When lit, the cups release a soothing natural fragrance, making them suitable for daily pooja, meditation and spiritual rituals at home, in temples and in yoga spaces.',
    ],
    image: '/images/dhoop-cups.jpg',
    imageAlt: 'Normal cow dung dhoop cups from HSV Sugandhika',
    gallery: ['/images/dhoop-cups.jpg', '/images/dhoop-photo.jpg'],
    isNew: false,
    featured: true,
    addedAt: '2025-09-02',
  },
  {
    slug: 'pure-handmade-big-size-wicks',
    name: 'Pure Handmade Big Size Wicks',
    price: 395,
    category: 'Wicks',
    summary: 'Pure handmade wicks in a larger size for diya lighting.',
    description: [
      'Pure handmade cotton wicks in a bigger size, prepared with care for devotional lamp lighting.',
      'A traditional choice for diyas used in daily worship, festivals and temple rituals.',
    ],
    // Visual stand-in from the brand's own handmade wick imagery.
    // Replace with a dedicated product photograph when one is available.
    image: '/images/kamalam-wicks.jpg',
    imageAlt: 'Handmade cotton wicks from HSV Sugandhika',
    gallery: ['/images/kamalam-wicks.jpg'],
    badge: 'Handmade',
    isNew: false,
    featured: true,
    addedAt: '2025-08-20',
  },
]

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

export const getProduct = (slug?: string) =>
  products.find((product) => product.slug === slug)

export const newArrivals = [...products]
  .filter((product) => product.isNew)
  .sort((a, b) => b.addedAt.localeCompare(a.addedAt))

export const featuredProducts = products.filter((product) => product.featured)

export const relatedProducts = (product: Product) =>
  products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const score = (item: Product) =>
        (item.category === product.category ? 2 : 0) +
        (item.featured === product.featured ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, 4)
