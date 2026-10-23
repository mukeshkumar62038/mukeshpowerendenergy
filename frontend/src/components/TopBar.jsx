import React from 'react'
import { Phone, Mail, Clock, MapPin, ShieldCheck } from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'

export default function TopBar({ onOpenQuoteModal }) {
  return (
    <div className="topbar-wrapper">
      <div className="topbar-inner">
        <div className="topbar-left">
          <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="topbar-item">
            <Phone size={14} className="topbar-icon" />
            <span>{COMPANY_INFO.phonePrimary}</span>
          </a>
          <span className="topbar-divider">|</span>
          <a href={`mailto:${COMPANY_INFO.email}`} className="topbar-item">
            <Mail size={14} className="topbar-icon" />
            <span>{COMPANY_INFO.email}</span>
          </a>
          <span className="topbar-divider hide-mobile">|</span>
          <div className="topbar-item hide-mobile">
            <Clock size={14} className="topbar-icon" />
            <span>{COMPANY_INFO.timings}</span>
          </div>
        </div>

        <div className="topbar-right">
          <div className="topbar-item">
            <ShieldCheck size={14} className="topbar-icon highlight-green" />
            <span>GSTIN: <strong>{COMPANY_INFO.gstin}</strong></span>
          </div>
          <span className="topbar-divider">|</span>
          <button 
            type="button" 
            className="topbar-action-link"
            onClick={onOpenQuoteModal}
          >
            Wholesale Contractor Rates &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
