import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  Phone,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { getFaqs, submitEnquiry } from '../services/api'
import { COMPANY_INFO } from '../data/landingData'
import CtaBanner from '../components/CtaBanner'

export default function FaqPage({ onOpenQuoteModal }) {
  const [faqs, setFaqs] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Wires & Cables',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    getFaqs().then(data => setFaqs(data))
  }, [])

  const categories = ['All', 'General', 'Wholesale & Discounts', 'Delivery & Logistics', 'Brands & Products', 'Technical Specifications', 'Payment & Invoicing']

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeCategory)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number.')
      return
    }
    setIsSubmitting(true)
    const res = await submitEnquiry(formData)
    setIsSubmitting(false)
    setSubmitResult(res)
    setFormData({ name: '', phone: '', category: 'Wires & Cables', message: '' })
  }

  return (
    <div className="faq-page-wrapper">
      {/* Header Banner */}
      <section className="about-header-banner">
        <div className="about-banner-texture"></div>
        <div className="section-container banner-content-wrap">
          <h1 className="about-page-title">Frequently Asked Questions</h1>
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">
              <Sparkles size={14} className="breadcrumb-icon-spark" />
              FAQs & Estimation
            </span>
          </div>
        </div>
      </section>

      {/* Main FAQ & Form Section */}
      <section className="faq-main-section">
        <div className="section-container">
          {/* Category Tabs */}
          <div className="filter-tabs-wrapper">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat); setOpenIndex(0); }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="faq-main-grid">
            {/* Left FAQ Accordion */}
            <div className="faq-left-col">
              <div className="section-tag">
                <HelpCircle size={14} />
                <span>QUESTIONS & ANSWERS</span>
              </div>

              <h2 className="section-heading">
                Help & Answers for <br />
                <span className="text-green">Your Electrical Purchases</span>
              </h2>

              <div className="faq-accordion-list">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index
                  return (
                    <div key={faq.id || index} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                      <button
                        type="button"
                        className="faq-question-btn"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <span className="faq-q-text">{faq.question}</span>
                        <span className="faq-chevron-box">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer-pane">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Quick Quotation Form Card */}
            <div className="faq-right-col">
              <div className="quick-quote-card">
                <div className="quote-card-header">
                  <div className="quote-badge">
                    <MessageSquare size={16} />
                    <span>Instant Estimate</span>
                  </div>
                  <h3>Submit Project Requirement</h3>
                  <p>Send your list or BOQ to receive custom wholesale pricing.</p>
                </div>

                {submitResult ? (
                  <div className="quote-success-box">
                    <CheckCircle2 size={36} className="success-icon" />
                    <h4>Quotation Request Received!</h4>
                    <p>{submitResult.message}</p>
                    <p className="contact-soon">Our technical sales executive will contact you at your phone number shortly.</p>
                    <button 
                      type="button" 
                      className="btn-quote-again"
                      onClick={() => setSubmitResult(null)}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form className="quote-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Your Full Name *</label>
                      <input 
                        type="text" 
                        placeholder="Mukesh Kumar"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>WhatsApp / Phone Number *</label>
                      <input 
                        type="tel" 
                        placeholder="98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Product Category Needed</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Wires & Cables">Wires & Cables (Polycab / KEI / Havells)</option>
                        <option value="Modular Switches">Modular Switches & Sockets</option>
                        <option value="MCBs & Distribution Boards">MCBs & Distribution Boards</option>
                        <option value="LED Lighting & Panels">LED Lighting & Panels</option>
                        <option value="Fans & Geysers">Fans & Geysers</option>
                        <option value="Metal & Conduit Pipes">Metal Boxes & Conduit Pipes</option>
                        <option value="Complete Project Combo">Complete Project Package (BOQ)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Requirement Details / Quantities (Optional)</label>
                      <textarea 
                        rows="3" 
                        placeholder="e.g. 10 coils 1.5mm wire, 20 modular switches, 4 MCBs..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-submit-quote"
                      disabled={isSubmitting}
                    >
                      <Send size={16} />
                      <span>{isSubmitting ? 'Sending Request...' : 'Get Instant Wholesale Rates'}</span>
                    </button>
                  </form>
                )}

                <div className="quote-direct-contact">
                  <span>Or connect directly via phone:</span>
                  <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="phone-link">
                    <Phone size={14} />
                    <strong>{COMPANY_INFO.phonePrimary}</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner onOpenQuoteModal={() => onOpenQuoteModal('')} />
    </div>
  )
}
