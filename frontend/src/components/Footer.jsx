import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Heart
} from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function Footer({ onOpenQuoteModal, onDownloadCatalogue }) {
  const navigate = useNavigate()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main-grid">
          {/* Column 1: Brand & About */}
          <div className="footer-col brand-col">
            <div className="footer-logo" onClick={() => navigate('/')}>
              <img 
                src="/images/mukesh_logo.jpeg" 
                alt="Mukesh Power and Energy" 
                className="footer-logo-img"
              />
            </div>

            <p className="footer-about-text">
              Authorised stockist & project supplier for India's leading electrical brands. We deliver 100% genuine wires, modular switches, LED lighting, and switchgear with certified manufacturer warranties.
            </p>

            <div className="footer-gst-badge">
              <ShieldCheck size={16} className="gst-icon" />
              <span>GSTIN: <strong>{COMPANY_INFO.gstin}</strong></span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-link-list">
              <li><button onClick={() => navigate('/')}>Home</button></li>
              <li><button onClick={() => navigate('/about')}>About Us</button></li>
              <li><button onClick={() => navigate('/brands')}>Our Brands</button></li>
              <li><button onClick={() => navigate('/products')}>Product Catalogue</button></li>
              <li><button onClick={() => navigate('/services')}>Services & Solutions</button></li>
              <li><button onClick={() => navigate('/why-us')}>Why Choose Us</button></li>
              <li><button onClick={() => navigate('/faqs')}>FAQs & Estimation</button></li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Top Categories</h4>
            <ul className="footer-link-list">
              <li><button onClick={() => navigate('/products?category=wires')}>House Wires & Cables</button></li>
              <li><button onClick={() => navigate('/products?category=switches')}>Modular Switches & Plates</button></li>
              <li><button onClick={() => navigate('/products?category=conduit')}>GI Metal Concealed Boxes</button></li>
              <li><button onClick={() => navigate('/products?category=switchgear')}>MCBs, RCCBs & DBs</button></li>
              <li><button onClick={() => navigate('/products?category=lights')}>Commercial LED Lighting</button></li>
              <li><button onClick={() => navigate('/products?category=appliances')}>BLDC Energy Saving Fans</button></li>
              <li><button onClick={() => navigate('/products?category=appliances')}>Storage & Instant Geysers</button></li>
            </ul>
          </div>

          {/* Column 4: Contact & Store Location */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Store & Counter</h4>
            
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <div>
                <p>{COMPANY_INFO.address}</p>
                <p><strong>{COMPANY_INFO.city}</strong></p>
              </div>
            </div>

            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <a href={`tel:${COMPANY_INFO.phonePrimary}`}>{COMPANY_INFO.phonePrimary}</a>
                <a href={`tel:${COMPANY_INFO.phoneSecondary}`}>{COMPANY_INFO.phoneSecondary}</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <div>
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Clock size={18} className="contact-icon" />
              <div>
                <p>{COMPANY_INFO.timings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Mukesh Power & Energy. All rights reserved.</p>
          <div className="footer-legal-links">
            <span>Authorised Electrical Dealer</span>
            <span>•</span>
            <span>100% Genuine Guaranteed</span>
            <span>•</span>
            <span>Tax Invoices Provided</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
