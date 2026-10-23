import React from 'react'
import {
  ShieldCheck,
  Award,
  Truck,
  Percent,
  CheckCircle2
} from 'lucide-react'

export default function WhyChooseUs({ onOpenQuoteModal }) {
  const pillars = [
    {
      title: "100% Certified Genuine",
      desc: "Zero tolerance for duplicates. Sourced directly from brand manufacturing plants.",
      icon: <ShieldCheck size={28} className="why-icon" />
    },
    {
      title: "Direct Brand Warranty",
      desc: "Complete after-sales replacement and manufacturer warranty support on all appliances and switchgear.",
      icon: <Award size={28} className="why-icon" />
    },
    {
      title: "Fast On-Site Delivery",
      desc: "Reliable logistics straight to your ongoing construction site or retail shop counter.",
      icon: <Truck size={28} className="why-icon" />
    },
    {
      title: "Guaranteed Best Pricing",
      desc: "Transparent wholesale slabs with official GST input tax credit invoices.",
      icon: <Percent size={28} className="why-icon" />
    }
  ]

  return (
    <section id="why-us" className="why-choose-section">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-tag">
            <span>UNMATCHED TRUST & CREDIBILITY</span>
          </div>
          <h2 className="section-heading">
            Why Thousands Choose <br />
            <span className="text-green">Mukesh Power & Energy</span>
          </h2>
          <p className="section-desc-center">
            Serving contractors, builders, electricians, and homeowners with unwavering reliability since 2008.
          </p>
        </div>

        <div className="why-pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon-wrap">
                {pillar.icon}
              </div>
              <h3 className="why-title">{pillar.title}</h3>
              <p className="why-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
