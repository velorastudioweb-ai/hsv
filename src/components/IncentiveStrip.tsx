import { Gift, ShieldCheck, Truck } from 'lucide-react'
import { incentives } from '../data/site'

const icons = {
  truck: Truck,
  gift: Gift,
  shield: ShieldCheck,
}

export function IncentiveStrip() {
  return (
    <section className="incentives" aria-label="Shopping benefits">
      <div className="container incentives__inner">
        {incentives.map((item) => {
          const Icon = icons[item.icon]
          return (
            <div className="incentive" key={item.title} data-reveal>
              <span className="incentive__icon"><Icon size={22} strokeWidth={1.5} /></span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
