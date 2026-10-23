import React, { useState, useEffect } from 'react'
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react'
import { PRODUCT_CATEGORIES } from '../data/landingData'
import { getProducts } from '../services/api'

export default function CategoryCatalogue({ onSelectProductForQuote, onDownloadCatalogue }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [allProducts, setAllProducts] = useState(PRODUCT_CATEGORIES)

  useEffect(() => {
    const loadProds = async () => {
      try {
        const data = await getProducts()
        if (data && data.length > 0) {
          setAllProducts(data)
        }
      } catch (e) {}
    }
    loadProds()
  }, [])

  const filterTabs = [
    { id: 'all', label: 'All Products' },
    { id: 'wires', label: 'Wires & Cables' },
    { id: 'switches', label: 'Modular Switches' },
    { id: 'switchgear', label: 'MCBs & DBs' },
    { id: 'lights', label: 'LED Lighting' },
    { id: 'appliances', label: 'Fans & Geysers' },
    { id: 'conduit', label: 'Concealed & Conduit' }
  ]

  const filteredProducts = activeFilter === 'all'
    ? allProducts
    : allProducts.filter(p => {
        const cat = (p.category || '').toLowerCase()
        const tag = (p.tag || '').toLowerCase()
        return cat.includes(activeFilter) || tag === activeFilter
      })

  return (
    <section id="categories" className="category-catalogue-section">
      <div className="section-container">
        <div className="section-header-center">
          <div className="section-tag">
            <span>COMPLETE ELECTRICAL INVENTORY</span>
          </div>
          <h2 className="section-heading">
            Everything electrical, <span className="text-green">under one roof</span>
          </h2>
          <p className="section-desc-center">
            Comprehensive range of residential, commercial, and industrial electrical supplies.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="filter-tabs-wrapper">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="product-cards-grid">
          {filteredProducts.map((prod) => {
            const brandList = Array.isArray(prod.brands) && prod.brands.length > 0 
              ? prod.brands 
              : (prod.brand ? [prod.brand] : ['Mukesh Power']);
            const displayPrice = prod.price || prod.startingPrice || 'Wholesale Rate on Request';
            const displayDesc = prod.shortDescription || prod.subtitle || prod.fullDescription || 'Authorised electrical supplies & wholesale inventory.';

            return (
              <div key={prod.id || prod.slug} className="product-item-card">
                <div className="prod-badge-tag">{prod.badge || (prod.featured ? 'Featured' : 'Certified')}</div>

                <div className="prod-img-container">
                  <img 
                    src={prod.image || '/images/products/wires.png'} 
                    alt={prod.title || prod.name} 
                    className="prod-thumbnail" 
                    loading="lazy"
                    onError={(e) => { e.target.src = '/images/products/wires.png'; }}
                  />
                </div>

                <div className="prod-content">
                  <span className="prod-category-label">{prod.category}</span>
                  <h3 className="prod-card-title">{prod.title || prod.name}</h3>
                  <p className="prod-card-desc">{displayDesc}</p>

                  {/* Associated Brands */}
                  <div className="prod-brand-pills">
                    {brandList.map((b, i) => (
                      <span key={i} className="prod-brand-tag">{b}</span>
                    ))}
                  </div>

                  <div className="prod-card-footer">
                    <div className="price-indicator">
                      <span className="price-label">Pricing:</span>
                      <span className="price-val">{displayPrice}</span>
                    </div>

                    <button
                      type="button"
                      className="btn-prod-enquire"
                      onClick={() => onSelectProductForQuote(prod)}
                    >
                      <span>Enquire Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Catalogue Download Bar */}
        <div className="catalogue-footer-action">
          <button 
            type="button" 
            className="btn-full-catalogue"
            onClick={onDownloadCatalogue}
          >
            <FileText size={18} />
            <span>Download Complete 2026 Price List & Catalogue (PDF)</span>
          </button>
        </div>
      </div>
    </section>
  )
}
