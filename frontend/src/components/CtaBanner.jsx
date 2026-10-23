import React from 'react'
import { Phone, MessageCircle, ArrowRight, Sparkles } from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function CtaBanner({ onOpenQuoteModal }) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Mukesh Power & Energy, I am looking for electrical supplies for my project. Please share your wholesale price list.`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank')
  }

  return (
    <section className="cta-banner-section">
      <div className="section-container">
        <div className="cta-banner-card">
          <div className="cta-content">
            <div className="cta-pill">
              <Sparkles size={14} />
              <span>DIRECT WHOLESALE DISPATCH</span>
            </div>
            <h2 className="cta-title">
              Looking for Genuine Electrical Products?
            </h2>
            <p className="cta-desc">
              Get authentic Polycab, Havells, Anchor & KEI materials delivered directly to your site at unbeatable contractor prices.
            </p>
          </div>

          <div className="cta-button-group">
            <button 
              type="button" 
              className="btn-cta-whatsapp"
              onClick={handleWhatsApp}
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </button>

            <a 
              href={`tel:${COMPANY_INFO.phonePrimary}`} 
              className="btn-cta-call"
            >
              <Phone size={18} />
              <span>Call: {COMPANY_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
