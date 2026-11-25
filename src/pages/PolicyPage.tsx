import { Link, useParams } from 'react-router-dom'
import { brand, policies } from '../data/site'
import { useSEO } from '../hooks/useSEO'

export function PolicyPage() {
  const { slug } = useParams<{ slug: string }>()
  const policy = policies.find((item) => item.slug === slug)

  useSEO({
    title: policy?.title ?? 'Policy',
    description: `${policy?.title ?? 'Policy'} information for HSV Sugandhika.`,
    path: `policies/${slug ?? ''}`,
  })

  if (!policy) {
    return (
      <div className="page not-found">
        <div className="container">
          <h1>Page not found</h1>
          <Link to="/" className="button button--primary">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page policy-page">
      <div className="page-hero">
        <div className="container">
          <p className="eyebrow eyebrow--line">Customer information</p>
          <h1>{policy.title}</h1>
        </div>
      </div>
      <section className="section">
        <div className="container policy-content">
          <p>
            The full {policy.title.toLowerCase()} is maintained by the brand and
            is available on request. To avoid sharing incomplete or inaccurate
            terms, we have not reproduced a policy document on this website.
          </p>
          <p>
            Please contact our team and we will share the current document and
            answer any questions you may have.
          </p>
          <div className="policy-actions">
            <a
              href={`${brand.whatsappUrl}?text=${encodeURIComponent(`Hello HSV Sugandhika! Please share your ${policy.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              Request on WhatsApp
            </a>
            <a href={`mailto:${brand.email}?subject=${encodeURIComponent(policy.title)}`} className="text-link">
              Email us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
