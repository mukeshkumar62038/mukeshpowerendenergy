import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Coins,
  Calculator,
  Truck,
  Cpu,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  FileSpreadsheet,
  PackageCheck,
  ArrowRight
} from 'lucide-react'
import { getServices } from '../services/api'
import CtaBanner from '../components/CtaBanner'

export default function ServicesPage({ onOpenQuoteModal }) {
  const [services, setServices] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    getServices().then(data => setServices(data))
  }, [])

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck size={28} />
      case 'Coins': return <Coins size={28} />
      case 'Calculator': return <Calculator size={28} />
      case 'Truck': return <Truck size={28} />
      case 'Cpu': return <Cpu size={28} />
      case 'Sparkles': return <Sparkles size={28} />
      default: return <ShieldCheck size={28} />
    }
  }

  const steps = [
    {
      num: "01",
      title: "Share Your Requirement List",
      desc: "Send your Bill of Quantities (BOQ), architect layout, or rough list via WhatsApp or website form."
    },
    {
      num: "02",
      title: "Get Itemized Wholesale Quote",
      desc: "Our electrical estimation team provides brand-wise tiered contractor rates within 30 minutes."
    },
    {
      num: "03",
      title: "Quality Check & Packing",
      desc: "Materials are factory-batch verified, barcoded, and securely packaged to prevent site damage."
    },
    {
      num: "04",
      title: "On-Site Direct Delivery",
      desc: "Same-day or scheduled transport directly to your project location with 100% genuine GST tax invoices."
    }
  ]

  return (
    <div className="services-page-wrapper">
      {/* Header Banner */}
      <section className="about-header-banner">
        <div className="about-banner-texture"></div>
        <div className="section-container banner-content-wrap">
          <h1 className="about-page-title">Services & Solutions</h1>
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">
              <Sparkles size={14} className="breadcrumb-icon-spark" />
              Our Services
            </span>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="services-main-section">
        <div className="section-container">
          <div className="section-header-center">
            <div className="section-tag">
              <span>SPECIALIZED ELECTRICAL SERVICES</span>
            </div>
            <h2 className="section-heading">
              End-to-End Solutions for <br />
              <span className="text-green">Builders, Electricians & Homeowners</span>
            </h2>
            <p className="section-desc-center">
              Beyond product supply, we deliver engineering expertise, on-site logistics, and customized project support.
            </p>
          </div>

          <div className="services-cards-detailed-grid">
            {services.map((svc) => (
              <div key={svc.id || svc.title} className="service-detail-card">
                <div 
                  className="service-icon-wrap"
                  style={{ color: svc.color || '#16a34a', backgroundColor: `${svc.color || '#16a34a'}15` }}
                >
                  {getIcon(svc.icon)}
                </div>

                <h3 className="service-detail-title">{svc.title}</h3>
                <p className="service-detail-desc">{svc.desc}</p>

                {svc.features && (
                  <ul className="service-feature-checklist">
                    {svc.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle2 size={15} className="svc-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="service-detail-footer">
                  <button
                    type="button"
                    className="btn-svc-enquire"
                    onClick={() => onOpenQuoteModal(svc.title)}
                  >
                    <span>Request Consultation</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step How We Work Workflow */}
      <section className="how-we-work-section">
        <div className="section-container">
          <div className="section-header-center">
            <div className="section-tag">
              <span>SMOOTH & HASSLE-FREE SOURCING</span>
            </div>
            <h2 className="section-heading">
              How Project Procurement <span className="text-green">Works</span>
            </h2>
            <p className="section-desc-center">
              From estimate submission to site delivery in four seamless steps.
            </p>
          </div>

          <div className="workflow-steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="workflow-step-card">
                <div className="step-count-badge">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
