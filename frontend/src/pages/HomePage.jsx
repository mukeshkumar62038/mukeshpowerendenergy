import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import BrandMarquee from '../components/BrandMarquee'
import AboutSection from '../components/AboutSection'
import Certifications from '../components/Certifications'
import BrandShowcase from '../components/BrandShowcase'
import CategoryCatalogue from '../components/CategoryCatalogue'
import ValueServices from '../components/ValueServices'
import CatalogueDownload from '../components/CatalogueDownload'
import StatsCounterBar from '../components/StatsCounterBar'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import FaqSection from '../components/FaqSection'
import CtaBanner from '../components/CtaBanner'

export default function HomePage({ onOpenQuoteModal, onDownloadCatalogue }) {
  const navigate = useNavigate()

  const handleExploreClick = () => {
    const el = document.getElementById('categories')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectBannerCategory = (categoryName) => {
    const el = document.getElementById('categories')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectProductForQuote = (product) => {
    onOpenQuoteModal(product.category)
  }

  return (
    <div className="home-page-wrapper">
      {/* Hero Banner */}
      <Hero 
        onOpenQuoteModal={() => onOpenQuoteModal('')}
        onExploreClick={handleExploreClick}
      />

      {/* Brand Partner Logos Marquee */}
      <BrandMarquee />

      {/* About Highlights */}
      <AboutSection onOpenQuoteModal={() => onOpenQuoteModal('')} />

      {/* Certifications & Quality */}
      <Certifications />

      {/* Bento Brands Showcase */}
      <BrandShowcase onSelectBannerCategory={handleSelectBannerCategory} />

      {/* Everything Electrical Product Grid */}
      <CategoryCatalogue 
        onSelectProductForQuote={handleSelectProductForQuote}
        onDownloadCatalogue={onDownloadCatalogue}
      />

      {/* Added Value Services */}
      <ValueServices onOpenQuoteModal={() => onOpenQuoteModal('')} />

      {/* Complete Catalogue Download */}
      <CatalogueDownload onDownloadCatalogue={onDownloadCatalogue} />

      {/* Milestone Stats Bar */}
      <StatsCounterBar />

      {/* Why Choose Us */}
      <WhyChooseUs onOpenQuoteModal={() => onOpenQuoteModal('')} />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* FAQ & Instant Quotation Form */}
      <FaqSection onOpenQuoteModal={() => onOpenQuoteModal('')} />

      {/* CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
