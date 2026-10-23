import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Compass,
  Eye,
  ShieldCheck,
  Award,
  Truck,
  Coins,
  Calculator,
  Phone,
  MessageSquare,
  Home,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import BrandMarquee from '../components/BrandMarquee'
import CtaBanner from '../components/CtaBanner'
import { COMPANY_INFO } from '../data/landingData'

export default function AboutPage({ onOpenQuoteModal }) {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleExploreProducts = () => {
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('categories')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const handleContactClick = () => {
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('faq')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  const whyTrustPillars = [
    { title: "Genuine Products", desc: "100% manufacturer sealed & verified cables, switches and switchgear." },
    { title: "12+ Premium Brands", desc: "Direct authorized stockist for Polycab, Havells, Anchor, KEI, Legrand & more." },
    { title: "Expert Guidance", desc: "Technical load estimation, circuit sizing and wire gauge recommendations." },
    { title: "Bulk & Contractor Supply", desc: "Special tiered wholesale slab discounts for builders and electrical contractors." },
    { title: "Competitive Pricing", desc: "Honest transparent rates with 100% genuine GST tax invoices." },
    { title: "Fast On-Site Delivery", desc: "Doorstep delivery directly to your project site or commercial premise." }
  ]

  return (
    <div className="about-page-wrapper">
      {/* 1. Page Header & Breadcrumb Banner */}
      <section className="about-header-banner">
        <div className="about-banner-texture"></div>
        <div className="section-container banner-content-wrap">
          <h1 className="about-page-title">About Us</h1>
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">
              <Sparkles size={14} className="breadcrumb-icon-spark" />
              About Us
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main About Company Section */}
      <section className="about-company-section">
        <div className="section-container">
          <div className="about-company-grid">
            {/* Left: Company Product Brochure Showcase */}
            <div className="about-brochure-col">
              <div className="about-brochure-card">
                <img 
                  src="/images/about_company_brochure.jpg" 
                  alt="Mukesh Power & Energy Complete Electrical Solutions" 
                  className="about-brochure-img"
                />
                <div className="brochure-edition-pill">OFFICIAL DISTRIBUTOR</div>
              </div>
            </div>

            {/* Right: Company Profile Info */}
            <div className="about-profile-col">
              <div className="section-tag">
                <span>ABOUT COMPANY</span>
              </div>

              <h2 className="section-heading">
                Your Trusted Partner in <br />
                <span className="text-green">Electrical Solutions</span>
              </h2>

              <p className="about-profile-lead">
                <strong>Mukesh Power & Energy</strong> is one of the most trusted destinations for genuine electrical supplies and heavy power products. We supply premium-quality house wires, industrial cables, modular switches, MCBs, conduit pipes, lighting solutions, fans, geysers, and accessories from India's leading brands.
              </p>

              <p className="about-profile-body">
                Whether you're wiring a dream home, renovating an office complex, or managing large-scale commercial & industrial infrastructure projects, our experienced team helps you choose dependable products backed by trusted manufacturer warranties and professional technical guidance.
              </p>

              {/* 4 Feature Checkmarks Grid */}
              <div className="about-checks-grid">
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon-green" />
                  <span>Genuine & Certified Products</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon-green" />
                  <span>12+ Trusted Brand Partners</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon-green" />
                  <span>Expert Product Guidance</span>
                </div>
                <div className="check-item">
                  <CheckCircle2 size={18} className="check-icon-green" />
                  <span>Bulk & Contractor Supply</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="about-action-btns">
                <button 
                  type="button" 
                  className="btn-about-explore"
                  onClick={handleExploreProducts}
                >
                  <span>Explore Products</span>
                  <ArrowRight size={16} />
                </button>

                <button 
                  type="button" 
                  className="btn-about-contact"
                  onClick={handleContactClick}
                >
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Purpose: Mission & Vision */}
      <section className="about-purpose-section">
        <div className="section-container">
          <div className="section-header-center">
            <div className="section-tag">
              <span>OUR PURPOSE</span>
            </div>
            <h2 className="section-heading">
              Driven by Quality, <span className="text-green">Guided by Trust</span>
            </h2>
          </div>

          <div className="purpose-cards-grid">
            {/* Mission Card */}
            <div className="purpose-card mission-card">
              <div className="purpose-icon-box">
                <Compass size={28} className="purpose-icon" />
              </div>
              <div className="purpose-pill">OUR MISSION</div>
              <h3 className="purpose-title">Deliver Genuine Electrical Solutions</h3>
              <p className="purpose-desc">
                To provide reliable electrical products from trusted brands with expert guidance, competitive wholesale pricing, and dependable customer service for homes, businesses, and industrial projects.
              </p>
            </div>

            {/* Vision Card */}
            <div className="purpose-card vision-card">
              <div className="purpose-icon-box">
                <Eye size={28} className="purpose-icon" />
              </div>
              <div className="purpose-pill">OUR VISION</div>
              <h3 className="purpose-title">Become the Most Trusted Electrical Partner</h3>
              <p className="purpose-desc">
                To build lasting customer relationships through certified quality products, prompt logistics, and service excellence while remaining the preferred single-source destination for complete electrical requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Customers Trust Us (6 Pillars) */}
      <section className="about-trust-section">
        <div className="section-container">
          <div className="section-header-center">
            <div className="section-tag">
              <span>WHY CHOOSE US</span>
            </div>
            <h2 className="section-heading">
              Why Customers Trust <br />
              <span className="text-green">Mukesh Power & Energy</span>
            </h2>
            <p className="section-desc-center">
              Trusted products, expert guidance and reliable service for every project.
            </p>
          </div>

          <div className="trust-pillars-grid">
            {whyTrustPillars.map((pillar, idx) => (
              <div key={idx} className="trust-pillar-card">
                <div className="pillar-header">
                  <CheckCircle2 size={20} className="pillar-check" />
                  <h4>{pillar.title}</h4>
                </div>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Authorised Brand Partners Marquee */}
      <BrandMarquee />

      {/* 6. Need Help CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
