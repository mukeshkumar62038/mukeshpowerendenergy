import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Phone,
  Menu,
  X,
  MessageSquare
} from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function Navbar({ onOpenQuoteModal }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (path) => {
    setMobileMenuOpen(false)
    navigate(path)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Official Brand Logo */}
        <div className="brand-logo-wrap" onClick={() => handleNavClick('/')}>
          <img 
            src="/images/mukesh_logo.jpeg" 
            alt="Mukesh Power and Energy" 
            className="brand-logo-img"
          />
        </div>

        {/* Desktop Navigation Links (Single Line) */}
        <nav className="desktop-nav">
          <button 
            className={`nav-link ${isActive('/') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${isActive('/about') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/about')}
          >
            About Us
          </button>
          <button 
            className={`nav-link ${isActive('/brands') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/brands')}
          >
            Our Brands
          </button>
          <button 
            className={`nav-link ${isActive('/products') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/products')}
          >
            Products
          </button>
          <button 
            className={`nav-link ${isActive('/services') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/services')}
          >
            Services
          </button>
          <button 
            className={`nav-link ${isActive('/why-us') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/why-us')}
          >
            Why Us
          </button>
          <button 
            className={`nav-link ${isActive('/faqs') ? 'active-link' : ''}`}
            onClick={() => handleNavClick('/faqs')}
          >
            FAQs
          </button>
        </nav>

        {/* Action Button: Get a Quote */}
        <div className="nav-actions">
          <button 
            type="button" 
            className="btn-quote"
            onClick={onOpenQuoteModal}
          >
            <MessageSquare size={16} />
            <span>Get a Quote</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            type="button" 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button className={`mobile-nav-link ${isActive('/') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/')}>Home</button>
          <button className={`mobile-nav-link ${isActive('/about') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/about')}>About Us</button>
          <button className={`mobile-nav-link ${isActive('/brands') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/brands')}>Our Brands</button>
          <button className={`mobile-nav-link ${isActive('/products') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/products')}>Products</button>
          <button className={`mobile-nav-link ${isActive('/services') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/services')}>Services</button>
          <button className={`mobile-nav-link ${isActive('/why-us') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/why-us')}>Why Us</button>
          <button className={`mobile-nav-link ${isActive('/faqs') ? 'active-mobile' : ''}`} onClick={() => handleNavClick('/faqs')}>FAQs</button>

          <div className="mobile-drawer-footer">
            <button 
              type="button" 
              className="btn-drawer-quote"
              onClick={() => { setMobileMenuOpen(false); onOpenQuoteModal(); }}
            >
              <MessageSquare size={18} />
              Request Instant Quote
            </button>
            <a 
              href={`tel:${COMPANY_INFO.phonePrimary}`} 
              className="btn-drawer-call"
            >
              <Phone size={18} />
              Call {COMPANY_INFO.phonePrimary}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
