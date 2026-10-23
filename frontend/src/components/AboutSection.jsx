import React from 'react'
import {
  CheckCircle2,
  Building2,
  Truck,
  ShieldAlert,
  Award,
  ArrowRight
} from 'lucide-react'

export default function AboutSection({ onOpenQuoteModal }) {
  return (
    <section id="about" className="about-store-section">
      <div className="section-container">
        <div className="about-grid">
          {/* Left Column: Store Product Collage */}
          <div className="about-image-column">
            <div className="about-image-wrapper">
              <img 
                src="/images/about_store_showcase.jpg" 
                alt="Mukesh Power & Energy Electrical Supplies Warehouse" 
                className="about-main-img"
              />
              <div className="about-floating-experience">
                <div className="exp-number">15+</div>
                <div className="exp-text">Years of Trusted Supply</div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Highlights */}
          <div className="about-content-column">
            <div className="section-tag">
              <span>WHOLESALE & RETAIL COUNTER</span>
            </div>

            <h2 className="section-heading">
              Your neighbourhood store, <br />
              <span className="text-green">now a professional supplier</span>
            </h2>

            <p className="about-lead">
              Since 2008, <strong>Mukesh Power & Energy</strong> has been the go-to destination for electricians, builders, architects, and homeowners seeking authentic electrical materials.
            </p>

            <p className="about-body">
              We eliminate middlemen by directly stocking original products from certified national manufacturing units. From residential home wiring and luxury designer switches to industrial distribution panels and HT/LT cables, we guarantee 100% genuine products with manufacturer warranty.
            </p>

            {/* Feature Bullets */}
            <div className="about-feature-list">
              <div className="about-feature-item">
                <CheckCircle2 className="feat-icon" />
                <div>
                  <strong>100% Genuine Branded Products</strong>
                  <p>Guaranteed authentic cables, modular plates & switchgear with factory seals.</p>
                </div>
              </div>

              <div className="about-feature-item">
                <CheckCircle2 className="feat-icon" />
                <div>
                  <strong>Wholesale & Contractor Slab Pricing</strong>
                  <p>Transparent tiered discounts for builders, electrical contractors & bulk buyers.</p>
                </div>
              </div>

              <div className="about-feature-item">
                <CheckCircle2 className="feat-icon" />
                <div>
                  <strong>On-Site Delivery & Project Estimation</strong>
                  <p>Technical guidance on load calculation, cable sizing & prompt site logistics.</p>
                </div>
              </div>
            </div>

            {/* Counter Stats Bar */}
            <div className="about-counters-row">
              <div className="about-counter-item">
                <div className="counter-val">15+</div>
                <div className="counter-lbl">Years Trust</div>
              </div>
              <div className="about-counter-divider"></div>
              <div className="about-counter-item">
                <div className="counter-val">50+</div>
                <div className="counter-lbl">Brand Partners</div>
              </div>
              <div className="about-counter-divider"></div>
              <div className="about-counter-item">
                <div className="counter-val">10,000+</div>
                <div className="counter-lbl">Projects Supplied</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
