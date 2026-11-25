export const SITE_URL = 'https://www.hsvsugandhika.shop/'

export const brand = {
  name: 'HSV Sugandhika',
  logoText: 'HSV SUGANDHIKA',
  tagline: 'Sacred Tradition',
  footerMessage: 'Crafted with devotion. Inspired by tradition.',
  whatsappNumber: '918125117683',
  whatsappUrl: 'https://wa.me/918125117683',
  whatsappMessage:
    'Hello HSV Sugandhika! I would like to know more about your products.',
  phoneDisplay: '+91 8125117683',
  email: 'hsvgrouphub@gmail.com',
  location: 'Beeramguda, Telangana, Hyderabad, India',
  hours: 'Monday–Saturday, 9:00 AM–7:00 PM',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
]

export const incentives = [
  {
    icon: 'truck' as const,
    title: 'Free Delivery',
    detail: 'On orders above ₹999',
  },
  {
    icon: 'gift' as const,
    title: 'Free Gift',
    detail: 'On orders above ₹1,999',
  },
  {
    icon: 'shield' as const,
    title: 'Secure Checkout',
    detail: 'Encrypted payments',
  },
]

/**
 * Testimonials are preserved reference content from the brand's
 * existing website. They are displayed as supplied reference text,
 * not as independently verified customer reviews.
 */
export const testimonials = [
  {
    quote:
      'The fragrance transports me instantly to the ancient temples of Madurai. It’s not just a scent, it’s a divine experience.',
    name: 'Arundhati K.',
    role: 'Spiritual Practitioner',
  },
  {
    quote:
      'I’ve tried many luxury agarbattis, but HSV Sugandhika’s purity is unmatched. The lingering sandalwood aroma brings such peace to my home.',
    name: 'Vikram M.',
    role: 'Yoga Instructor',
  },
  {
    quote:
      'The attention to detail, from the packaging to the zero-charcoal burn, makes this the only dhoop I will ever purchase again.',
    name: 'Priya S.',
    role: 'Interior Designer',
  },
]

export const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hsv_sugandhika_sticks?igsh=MWx6cmJ5cTNxNm01ZA%3D%3D&utm_source=qr',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1CW45q1MPi/?mibextid=wwXIfr',
  },
  {
    label: 'Youtube',
    href: 'https://youtube.com/@hsvsugandhika?si=7QwFKzXN68a8KuOw',
  },
]

export const policies = [
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'terms-and-conditions', title: 'Terms and Conditions' },
  { slug: 'shipping-policy', title: 'Shipping Policy' },
  { slug: 'return-policy', title: 'Return Policy' },
]

export const collections = [
  {
    title: 'Incense & Agarbatti',
    category: 'Incense',
    description: 'Handcrafted sticks for daily rituals and quiet moments.',
    image: '/images/incense-alt.jpg',
  },
  {
    title: 'Dhoop & Cups',
    category: 'Dhoop',
    description: 'Traditional dhoop cups for a serene devotional atmosphere.',
    image: '/images/dhoop-photo.jpg',
  },
  {
    title: 'Cotton Wicks',
    category: 'Wicks',
    description: 'Handmade wicks for diyas, temples and everyday worship.',
    image: '/images/wicks-365.jpg',
  },
  {
    title: 'Sacred Powders',
    category: 'Sacred Powders',
    description: 'Gandham and vibhuthi for traditional pooja practices.',
    image: '/images/gandham.jpg',
  },
  {
    title: 'Devotional',
    category: 'Devotional',
    description: 'Devotional essentials for sacred occasions.',
    image: '/images/flower-wicks.jpg',
  },
]
