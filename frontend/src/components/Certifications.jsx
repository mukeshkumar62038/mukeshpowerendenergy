import React from 'react'
import { ShieldCheck, CheckCircle, Flame, Award, Shield } from 'lucide-react'
import { CERTIFICATIONS } from '../data/landingData'

export default function Certifications() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={32} className="cert-icon-svg" />
      case 'CheckCircle': return <CheckCircle size={32} className="cert-icon-svg" />
      case 'Flame': return <Flame size={32} className="cert-icon-svg" />
      case 'Award': return <Award size={32} className="cert-icon-svg" />
      default: return <Shield size={32} className="cert-icon-svg" />
    }
  }

  return (
    <section className="certifications-section">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-tag">
            <span>GOVERNMENT & QUALITY STANDARDS</span>
          </div>
          <h2 className="section-heading">
            Certifications & <span className="text-green">Authorisation</span>
          </h2>
          <p className="section-desc-center">
            Every electrical meter of wire and switchboard adheres to strict national & international safety certifications.
          </p>
        </div>

        <div className="certifications-grid">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-icon-box">
                {getIcon(cert.icon)}
              </div>
              <div className="cert-code-pill">{cert.code}</div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
