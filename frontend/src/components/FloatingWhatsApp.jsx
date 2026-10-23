import React from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function FloatingWhatsApp() {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Mukesh Power & Energy, I am looking for electrical supplies. Please share the wholesale price list.`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank')
  }

  return (
    <div className="floating-actions-container">
      <a 
        href={`tel:${COMPANY_INFO.phonePrimary}`} 
        className="floating-btn btn-floating-phone"
        title="Call Mukesh Power & Energy"
      >
        <Phone size={22} />
      </a>

      <button 
        type="button" 
        className="floating-btn btn-floating-whatsapp"
        onClick={handleWhatsApp}
        title="WhatsApp Quotation Desk"
      >
        <span className="floating-pulse"></span>
        <MessageCircle size={26} />
      </button>
    </div>
  )
}
