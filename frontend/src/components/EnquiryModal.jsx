import React, { useState } from 'react'
import {
  X,
  Send,
  MessageCircle,
  Phone,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react'
import { COMPANY_INFO } from '../data/landingData'
import { submitEnquiry } from '../services/api'

export default function EnquiryModal({ isOpen, onClose, initialCategory = '' }) {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: initialCategory || 'Wires & Cables',
    quantity: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and contact number.')
      return
    }

    setIsSubmitting(true)
    await submitEnquiry(formData)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Mukesh Power & Energy,\n\nI want a quotation for:\n• Name: ${formData.name || 'Not provided'}\n• Phone: ${formData.phone || 'Not provided'}\n• Category: ${formData.category}\n• Details: ${formData.message || 'Please send wholesale catalog'}`
    )
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank')
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="modal-success-pane">
            <div className="success-icon-badge">
              <CheckCircle2 size={42} className="modal-check" />
            </div>
            <h3>Enquiry Registered Successfully!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. Our electrical estimation team has received your details and will call you with wholesale rates shortly.
            </p>

            <div className="modal-success-actions">
              <button 
                type="button" 
                className="btn-success-whatsapp"
                onClick={handleSendViaWhatsApp}
              >
                <MessageCircle size={18} />
                <span>Instant WhatsApp Connect</span>
              </button>

              <button 
                type="button" 
                className="btn-success-close"
                onClick={onClose}
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-form-pane">
            <div className="modal-header">
              <div className="modal-badge">
                <Zap size={15} />
                <span>Mukesh Power & Energy</span>
              </div>
              <h2>Request Wholesale Quotation</h2>
              <p>Get authentic branded materials at direct contractor prices.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Mukesh Kumar"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>WhatsApp / Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="98765 43210"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label>Product Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Wires & Cables">Wires & Cables (Polycab / KEI / Havells)</option>
                    <option value="Modular Switches">Modular Switches & Sockets</option>
                    <option value="Concealed & Conduit">Concealed Boxes & Conduit</option>
                    <option value="MCBs & Distribution Boards">MCBs & DB Switchgear</option>
                    <option value="LED Lighting">Commercial & Home LED Lighting</option>
                    <option value="Fans & Geysers">Fans & Water Heaters</option>
                    <option value="Complete BOQ Project">Full Project Package (BOQ)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Estimated Quantity / Units</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 50 coils / Full 3BHK"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Specific Requirements / Brand Preferences</label>
                <textarea 
                  rows="2" 
                  placeholder="e.g. Polycab 1.5 sq mm red/black wire, Anchor Roma plates..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-actions-row">
                <button 
                  type="submit" 
                  className="btn-modal-submit"
                  disabled={isSubmitting}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Quotation Request'}</span>
                </button>

                <button 
                  type="button" 
                  className="btn-modal-whatsapp"
                  onClick={handleSendViaWhatsApp}
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </form>

            <div className="modal-trust-footnote">
              <ShieldCheck size={14} className="footnote-icon" />
              <span>100% Genuine Branded Products • GST Invoiced • Direct Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
