import React from 'react'
import {
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  Users,
  Layers
} from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function Hero({ onOpenQuoteModal, onExploreClick }) {
  return (
    <section id="hero" className="hero-section">
      {/* Background Decorative Mesh & Energy Waves */}
      <div className="hero-bg-accent circle-1"></div>
      <div className="hero-bg-accent circle-2"></div>
      <div className="hero-curved-line"></div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Top Tag */}
          <div className="hero-pill-badge">
            <Sparkles size={14} className="pill-icon" />
            <span>AUTHORISED ELECTRICAL DISTRIBUTOR & WHOLESALER</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-main-title">
            Power your home with <span className="title-highlight">certified electricals</span> that last
          </h1>

          {/* Subtitle */}
          <p className="hero-subtext">
            Direct authorised partner for <strong>Polycab, Havells, Anchor by Panasonic, KEI, Legrand, Crompton & Jaquar</strong>. 
            Supplying 100% genuine house wires, modular switchboards, LED lighting, and industrial switchgears at honest wholesale rates.
          </p>

          {/* CTA Buttons */}
          <div className="hero-btn-group">
            <button 
              type="button" 
              className="btn-hero-primary"
              onClick={onExploreClick}
            >
              <span>Explore Products</span>
              <ArrowRight size={18} />
            </button>

            <button 
              type="button" 
              className="btn-hero-secondary"
              onClick={onOpenQuoteModal}
            >
              <PhoneCall size={18} />
              <span>Get Wholesale Quote</span>
            </button>
          </div>

          {/* Key Assurance Features */}
          <div className="hero-assurances">
            <div className="assurance-item">
              <CheckCircle2 size={16} className="assurance-icon" />
              <span>100% Original Guarantee</span>
            </div>
            <div className="assurance-item">
              <CheckCircle2 size={16} className="assurance-icon" />
              <span>Direct Brand Warranty</span>
            </div>
            <div className="assurance-item">
              <CheckCircle2 size={16} className="assurance-icon" />
              <span>On-Site Project Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Hero Floating Showcase Card */}
        <div className="hero-showcase-column">
          <div className="hero-widget-card">
            <div className="widget-header">
              <div className="widget-badge">
                <Zap size={15} />
                <span>Mukesh Power & Energy</span>
              </div>
              <span className="widget-live-dot"></span>
            </div>

            <div className="widget-stats-grid">
              <div className="widget-stat-box">
                <div className="stat-num">15+</div>
                <div className="stat-desc">Years of Industry Trust</div>
              </div>
              <div className="widget-stat-box">
                <div className="stat-num">500+</div>
                <div className="stat-desc">Verified Products In Stock</div>
              </div>
              <div className="widget-stat-box">
                <div className="stat-num">50+</div>
                <div className="stat-desc">National & Global Brands</div>
              </div>
              <div className="widget-stat-box">
                <div className="stat-num">10k+</div>
                <div className="stat-desc">Projects Powered Successfully</div>
              </div>
            </div>

            {/* Quick Contractor Estimation Strip */}
            <div className="widget-action-strip">
              <div className="strip-info">
                <ShieldCheck size={20} className="strip-icon" />
                <div>
                  <strong>Contractor & Builder Desk</strong>
                  <p>Send your BOQ sheet for instant rate calculation</p>
                </div>
              </div>
              <button 
                type="button" 
                className="btn-widget-quote"
                onClick={onOpenQuoteModal}
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
