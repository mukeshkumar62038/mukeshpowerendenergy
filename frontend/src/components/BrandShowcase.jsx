import React from 'react'
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'

export default function BrandShowcase({ onSelectBannerCategory }) {
  return (
    <section id="brands" className="brand-showcase-section">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-tag">
            <span>OFFICIAL PRODUCT LINES</span>
          </div>
          <h2 className="section-heading">
            Discover Our <span className="text-green">Brands & Categories</span>
          </h2>
          <p className="section-desc-center">
            Explore premium electrical ranges curated from India's most trusted manufacturers.
          </p>
        </div>

        <div className="showcase-bento-grid">
          {/* Top Row: 2 Cards */}
          <div className="showcase-row top-row">
            <div 
              className="showcase-card banner-wires"
              onClick={() => onSelectBannerCategory('Wires & Cables')}
            >
              <img 
                src="/images/banner_wires_cables.png" 
                alt="Wires and Cables by Polycab, KEI, Havells, Anchor" 
                className="showcase-img"
              />
              <div className="showcase-overlay">
                <div className="showcase-top">
                  <span className="badge-flame">🔥 Fire-Resistant & FRLS</span>
                  <span className="btn-explore-circle"><ArrowUpRight size={18} /></span>
                </div>
                <div className="showcase-bottom">
                  <h3>Wires & Cables</h3>
                  <p>Polycab • KEI • Havells • Anchor by Panasonic</p>
                </div>
              </div>
            </div>

            <div 
              className="showcase-card banner-modular"
              onClick={() => onSelectBannerCategory('Modular Switches')}
            >
              <img 
                src="/images/products/brandMd.png" 
                alt="Designer Modular Switches" 
                className="showcase-img"
              />
              <div className="showcase-overlay">
                <div className="showcase-top">
                  <span className="badge-luxury">✨ Luxury & Smart Touch</span>
                  <span className="btn-explore-circle"><ArrowUpRight size={18} /></span>
                </div>
                <div className="showcase-bottom">
                  <h3>Modular Switches</h3>
                  <p>Anchor Panasonic • Legrand • Schneider • Havells</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 Cards */}
          <div className="showcase-row bottom-row">
            <div 
              className="showcase-card banner-lights"
              onClick={() => onSelectBannerCategory('LED Lighting')}
            >
              <img 
                src="/images/banner_lights.png" 
                alt="Premium Lights Jaquar and Havells" 
                className="showcase-img"
              />
              <div className="showcase-overlay">
                <div className="showcase-top">
                  <span className="badge-amber">💡 Architectural LED</span>
                  <span className="btn-explore-circle"><ArrowUpRight size={18} /></span>
                </div>
                <div className="showcase-bottom">
                  <h3>Premium Lights</h3>
                  <p>Jaquar Lighting • Havells • Wipro</p>
                </div>
              </div>
            </div>

            <div 
              className="showcase-card banner-fans"
              onClick={() => onSelectBannerCategory('Fans & Geysers')}
            >
              <img 
                src="/images/banner_fans_geysers.png" 
                alt="Fans and Geysers Crompton Usha Bajaj Havells" 
                className="showcase-img"
              />
              <div className="showcase-overlay">
                <div className="showcase-top">
                  <span className="badge-blue">🌀 5-Star BEE Efficient</span>
                  <span className="btn-explore-circle"><ArrowUpRight size={18} /></span>
                </div>
                <div className="showcase-bottom">
                  <h3>Fans & Geysers</h3>
                  <p>Usha • Crompton • Bajaj • Havells</p>
                </div>
              </div>
            </div>

            <div 
              className="showcase-card banner-boxes"
              onClick={() => onSelectBannerCategory('Concealed Boxes')}
            >
              <img 
                src="/images/banner_metal_boxes.png" 
                alt="Metal & Concealed Gang Boxes Polycab Anchor" 
                className="showcase-img"
              />
              <div className="showcase-overlay">
                <div className="showcase-top">
                  <span className="badge-steel">🛡️ Heavy Gauge GI</span>
                  <span className="btn-explore-circle"><ArrowUpRight size={18} /></span>
                </div>
                <div className="showcase-bottom">
                  <h3>Metal & Concealed Boxes</h3>
                  <p>Polycab • Anchor by Panasonic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
