import React from 'react'
import {
  FileDown,
  MessageCircle,
  CheckCircle2,
  BookOpen,
  Sparkles
} from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function CatalogueDownload({ onDownloadCatalogue }) {
  const handleWhatsAppCatalogue = () => {
    const text = encodeURIComponent(
      `Hello Mukesh Power & Energy, please send me your latest 2026 electrical product catalogue and wholesale price list PDF.`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank')
  }

  return (
    <section id="catalogue" className="catalogue-banner-section">
      <div className="section-container">
        <div className="catalogue-card-wrapper">
          {/* Left Content */}
          <div className="catalogue-content">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>OFFICIAL PRODUCT GUIDE</span>
            </div>

            <h2 className="catalogue-heading">
              Browse Our Complete <br />
              <span className="text-green">Electrical Catalogue (2026)</span>
            </h2>

            <p className="catalogue-description">
              Get comprehensive technical specifications, current carrying capacities, wire gauge charts, modular switch dimensions, and wholesale price tables in one convenient digital booklet.
            </p>

            <div className="catalogue-points-list">
              <div className="cat-point">
                <CheckCircle2 size={16} className="cat-check" />
                <span>Includes Polycab, KEI, Havells & Anchor full range</span>
              </div>
              <div className="cat-point">
                <CheckCircle2 size={16} className="cat-check" />
                <span>Direct contractor & builder discount structures</span>
              </div>
              <div className="cat-point">
                <CheckCircle2 size={16} className="cat-check" />
                <span>Wire current ratings & MCB load selection guide</span>
              </div>
            </div>

            <div className="catalogue-actions">
              <button 
                type="button" 
                className="btn-cat-download"
                onClick={onDownloadCatalogue}
              >
                <FileDown size={18} />
                <span>Download PDF Catalogue (3.8 MB)</span>
              </button>

              <button 
                type="button" 
                className="btn-cat-whatsapp"
                onClick={handleWhatsAppCatalogue}
              >
                <MessageCircle size={18} />
                <span>Request on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right 3D Booklet Image */}
          <div className="catalogue-image-col">
            <div className="catalogue-book-wrap">
              <img 
                src="/images/catalogue_cover.jpg" 
                alt="Mukesh Power & Energy Product Catalogue Booklet" 
                className="catalogue-book-img"
              />
              <div className="catalogue-year-badge">2026 EDITION</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
