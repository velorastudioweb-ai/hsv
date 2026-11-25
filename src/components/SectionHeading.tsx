import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  center = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: ReactNode
  center?: boolean
}) {
  return (
    <div className={`section-heading${center ? ' section-heading--center' : ''}`} data-reveal>
      <div className="section-heading__main">
        {eyebrow && <p className="eyebrow eyebrow--line">{eyebrow}</p>}
        <h2>{title}</h2>
        {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  )
}
