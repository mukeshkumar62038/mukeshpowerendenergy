import React from 'react'
import { BRAND_LOGOS } from '../data/landingData'

export default function BrandMarquee() {
  return (
    <section className="brand-marquee-section">
      <div className="marquee-label-wrap">
        <span className="marquee-label">Authorised Distributor & Stockist For:</span>
      </div>

      <div className="marquee-slider-track">
        <div className="marquee-content">
          {BRAND_LOGOS.concat(BRAND_LOGOS).map((brand, idx) => (
            <div key={`${brand.name}-${idx}`} className="brand-logo-card">
              <img 
                src={brand.image} 
                alt={`${brand.name} Authorized Dealer`} 
                className="brand-img"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline-block';
                }}
              />
              <span className="brand-fallback-text" style={{ display: 'none' }}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
