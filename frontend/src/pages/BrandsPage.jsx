import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
  CheckCircle2,
  PhoneCall
} from 'lucide-react'
import { getBrands } from '../services/api'
import BrandMarquee from '../components/BrandMarquee'
import CtaBanner from '../components/CtaBanner'

export default function BrandsPage({ onOpenQuoteModal }) {
  const [brands, setBrands] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    getBrands().then((data) => {
      setBrands(data)
      setLoading(false)
    })
  }, [])

  const categories = ['All', 'Wires & Cables', 'Modular Switches & Conduits', 'Switchgear & Appliances', 'Architectural Lighting', 'Fans & Home Appliances', 'Industrial Switchgears']

  const filteredBrands = activeCategory === 'All'
    ? brands
    : brands.filter(b => b.category === activeCategory)

  const handleBrandProductClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`)
  }

  return (
    <div className="brands-page-wrapper">
      {/* Header Banner */}
      <section className="about-header-banner">
        <div className="about-banner-texture"></div>
        <div className="section-container banner-content-wrap">
          <h1 className="about-page-title">Authorised Brands</h1>
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">
              <Sparkles size={14} className="breadcrumb-icon-spark" />
              Our Brands
            </span>
          </div>
        </div>
      </section>

      {/* Main Brands Section */}
      <section className="brands-main-section">
        <div className="section-container">
          <div className="section-header-center">
            <div className="section-tag">
              <span>CERTIFIED MANUFACTURER PARTNERS</span>
            </div>
            <h2 className="section-heading">
              Direct Distributorship for <br />
              <span className="text-green">India's Leading Electrical Brands</span>
            </h2>
            <p className="section-desc-center">
              We stock 100% genuine, factory-sealed products directly sourced from verified parent companies.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="filter-tabs-wrapper">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Brands Grid */}
          <div className="brands-detailed-grid">
            {filteredBrands.map((brand) => (
              <div key={brand.id || brand.name} className="brand-detail-card">
                <div className="brand-card-top">
                  <div className="brand-logo-frame">
                    <img 
                      src={brand.image} 
                      alt={`${brand.name} Authorized Dealer`} 
                      className="brand-card-img"
                    />
                  </div>
                  <div className="brand-badge-pill">
                    <ShieldCheck size={13} />
                    <span>{brand.badge || 'Authorised'}</span>
                  </div>
                </div>

                <div className="brand-card-body">
                  <span className="brand-category-tag">{brand.category}</span>
                  <h3 className="brand-card-name">{brand.name}</h3>
                  <p className="brand-tagline">"{brand.tagline}"</p>
                  <p className="brand-card-desc">{brand.description}</p>

                  <div className="brand-specs-row">
                    <div className="spec-badge">
                      <Layers size={13} />
                      <span>{brand.productsCount || 'Available In Stock'}</span>
                    </div>
                    <div className="spec-badge warranty">
                      <Award size={13} />
                      <span>{brand.warranty || 'Direct Warranty'}</span>
                    </div>
                  </div>
                </div>

                <div className="brand-card-actions">
                  <button
                    type="button"
                    className="btn-brand-explore"
                    onClick={() => handleBrandProductClick(brand.name)}
                  >
                    <span>View Products</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    className="btn-brand-quote"
                    onClick={() => onOpenQuoteModal(brand.name)}
                  >
                    Get Rates
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partner Marquee */}
      <BrandMarquee />

      {/* CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
