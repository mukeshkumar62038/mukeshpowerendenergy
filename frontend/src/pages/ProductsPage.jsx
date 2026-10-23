import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Home,
  ChevronRight,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react'
import { getProducts } from '../services/api'
import CatalogueDownload from '../components/CatalogueDownload'
import CtaBanner from '../components/CtaBanner'

export default function ProductsPage({ onOpenQuoteModal, onDownloadCatalogue }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialBrand = searchParams.get('brand') || ''

  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState(initialBrand)
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchFilteredProducts()
  }, [activeCategory, searchTerm])

  const fetchFilteredProducts = async () => {
    setLoading(true)
    const data = await getProducts({ category: activeCategory, search: searchTerm })
    setProducts(data)
    setLoading(false)
  }

  const filterTabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'wires', label: 'Wires & Cables' },
    { id: 'switches', label: 'Modular Switches' },
    { id: 'switchgear', label: 'MCBs & DBs' },
    { id: 'lights', label: 'LED Lighting' },
    { id: 'appliances', label: 'Fans & Geysers' },
    { id: 'conduit', label: 'Conduit & Boxes' },
    { id: 'bundles', label: 'Project Packages' }
  ]

  return (
    <div className="products-page-wrapper">
      {/* Header Banner */}
      <section className="about-header-banner">
        <div className="about-banner-texture"></div>
        <div className="section-container banner-content-wrap">
          <h1 className="about-page-title">Electrical Products</h1>
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">
              <Sparkles size={14} className="breadcrumb-icon-spark" />
              Products Catalogue
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog & Search Section */}
      <section className="products-main-section">
        <div className="section-container">
          {/* Search & Filter Toolbar */}
          <div className="catalog-toolbar">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by product name, wire size, brand (e.g. Polycab, 1.5 sq mm, MCB)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                  Clear
                </button>
              )}
            </div>

            <div className="toolbar-stats-text">
              Showing <strong>{products.length}</strong> items available in inventory
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-tabs-wrapper">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                className={`filter-tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Items Grid */}
          {loading ? (
            <div className="products-loading-state">
              <Zap className="loading-spin-icon" />
              <p>Loading electrical products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="products-empty-state">
              <p>No products found matching "<strong>{searchTerm}</strong>".</p>
              <button 
                className="btn-reset-filters"
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="product-cards-grid">
              {products.map((prod) => {
                const brandList = Array.isArray(prod.brands) && prod.brands.length > 0 
                  ? prod.brands 
                  : (prod.brand ? [prod.brand] : ['Mukesh Power']);
                
                const displayPrice = prod.price || prod.startingPrice || 'Wholesale Rate on Request';
                const displayDesc = prod.shortDescription || prod.subtitle || prod.fullDescription || 'Authorised electrical supplies & wholesale inventory.';
                
                const specsList = Array.isArray(prod.specs) 
                  ? prod.specs 
                  : (typeof prod.specs === 'string' && prod.specs.length > 0 
                      ? prod.specs.split(',').map(s => s.trim()) 
                      : []);

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
                      {prod.stockStatus && (
                        <span className={`prod-stock-pill ${prod.stockStatus === 'Out of Stock' ? 'out' : 'in'}`}>
                          {prod.stockStatus}
                        </span>
                      )}
                    </div>

                    <div className="prod-content">
                      <span className="prod-category-label">{prod.category}</span>
                      <h3 className="prod-card-title">{prod.title || prod.name}</h3>
                      <p className="prod-card-desc">{displayDesc}</p>

                      {/* Specs List */}
                      {specsList.length > 0 && (
                        <ul className="prod-specs-mini-list">
                          {specsList.slice(0, 3).map((spec, sIdx) => (
                            <li key={sIdx}>
                              <CheckCircle2 size={12} className="spec-check-icon" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      )}

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
                          onClick={() => onOpenQuoteModal(prod.title || prod.name || prod.category)}
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
          )}
        </div>
      </section>

      {/* Catalogue Download Section */}
      <CatalogueDownload onDownloadCatalogue={onDownloadCatalogue} />

      {/* CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
