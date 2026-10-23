import React from 'react'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import { TESTIMONIALS } from '../data/landingData'

export default function Testimonials() {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-tag">
            <span>CLIENT EXPERIENCES</span>
          </div>
          <h2 className="section-heading">
            What Our <span className="text-green">Customers Say</span>
          </h2>
          <p className="section-desc-center">
            Real feedback from government electrical contractors, interior architects, and builders.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testi-header">
                <div className="testi-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <Quote size={24} className="testi-quote-icon" />
              </div>

              <p className="testi-comment">"{item.comment}"</p>

              <div className="testi-author-row">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="testi-avatar"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="testi-fallback-avatar" style={{ display: 'none' }}>
                  {item.name.charAt(0)}
                </div>

                <div className="testi-author-info">
                  <div className="author-name">
                    {item.name}
                    <CheckCircle2 size={14} className="verified-icon" title="Verified Customer" />
                  </div>
                  <div className="author-role">{item.role}</div>
                  <div className="author-company">{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
