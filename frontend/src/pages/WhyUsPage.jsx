import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Award,
  Truck,
  Percent,
  CheckCircle2,
  Sparkles,
  Users,
  Building,
  HeartHandshake
} from 'lucide-react'
import Certifications from '../components/Certifications'
import StatsCounterBar from '../components/StatsCounterBar'
import Testimonials from '../components/Testimonials'
import CtaBanner from '../components/CtaBanner'

export default function WhyUsPage({ onOpenQuoteModal }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const coreDifferentiators = [
    {
      title: "100% Genuine & Factory Sealed",
      desc: "We follow a zero counterfeit policy. Every coil of wire and switchboard comes with intact manufacturer security seals, holograms, and verifiable test certificates.",
      icon: <ShieldCheck size={32} className="diff-icon" />
    },
    {
      title: "Direct Brand Warranty & Replacement",
      desc: "Enjoy hassle-free after-sales warranty coverage supported directly through our manufacturer desk for all appliances, geysers, fans, and switchgears.",
      icon: <Award size={32} className="diff-icon" />
    },
    {
      title: "Direct Wholesale Contractor Pricing",
      desc: "Transparent tiered discounts designed specifically for government contractors, builders, electricians, and bulk residential wiring projects.",
      icon: <Percent size={32} className="diff-icon" />
    },
    {
      title: "Dedicated On-Site Logistics",
      desc: "Careful material handling and prompt doorstep transport straight to construction sites, commercial towers, and industrial plants.",
      icon: <Truck size={32} className="diff-icon" />
    }
  ]

  return (
    <div className="why-us-page-wrapper">
      {/* Header Banner */}
      <section className="about-header-banner">
        <div className="about-banner-texture"></div>
        <div className="section-container banner-content-wrap">
          <h1 className="about-page-title">Why Choose Us</h1>
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">
              <Sparkles size={14} className="breadcrumb-icon-spark" />
              Why Choose Us
            </span>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="why-core-section">
        <div className="section-container">
          <div className="section-header-center">
            <div className="section-tag">
              <span>UNCOMPROMISING STANDARDS</span>
            </div>
            <h2 className="section-heading">
              Built on Quality, <br />
              <span className="text-green">Trusted for Over 15 Years</span>
            </h2>
            <p className="section-desc-center">
              Discover why thousands of electrical contractors, architects, and builders rely on Mukesh Power & Energy.
            </p>
          </div>

          <div className="diff-grid">
            {coreDifferentiators.map((diff, idx) => (
              <div key={idx} className="diff-card">
                <div className="diff-icon-box">
                  {diff.icon}
                </div>
                <h3 className="diff-title">{diff.title}</h3>
                <p className="diff-desc">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Component */}
      <Certifications />

      {/* Milestone Numbers Bar */}
      <StatsCounterBar />

      {/* Client Testimonials */}
      <Testimonials />

      {/* CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
