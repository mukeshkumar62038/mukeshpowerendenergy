import React from 'react'
import {
  ShieldCheck,
  Coins,
  Calculator,
  Truck,
  CheckCircle2
} from 'lucide-react'
import { VALUE_SERVICES } from '../data/landingData'

export default function ValueServices({ onOpenQuoteModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={28} />
      case 'Coins': return <Coins size={28} />
      case 'Calculator': return <Calculator size={28} />
      case 'Truck': return <Truck size={28} />
      default: return <ShieldCheck size={28} />
    }
  }

  return (
    <section id="services" className="value-services-section">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-tag">
            <span>ADDED VALUE ADVANTAGES</span>
          </div>
          <h2 className="section-heading">
            More than a <span className="text-green">shop counter</span>
          </h2>
          <p className="section-desc-center">
            Comprehensive support tailored for electricians, contractors, architects, and builders.
          </p>
        </div>

        <div className="services-grid">
          {VALUE_SERVICES.map((svc, idx) => (
            <div key={idx} className="service-card">
              <div 
                className="service-icon-wrap"
                style={{ color: svc.color, backgroundColor: `${svc.color}15` }}
              >
                {getIcon(svc.icon)}
              </div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-status">
                <CheckCircle2 size={14} className="service-check" />
                <span>Verified Benefit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
