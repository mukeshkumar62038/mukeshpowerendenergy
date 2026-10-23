import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EnquiryModal from './components/EnquiryModal'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BrandsPage from './pages/BrandsPage'
import ProductsPage from './pages/ProductsPage'
import ServicesPage from './pages/ServicesPage'
import WhyUsPage from './pages/WhyUsPage'
import FaqPage from './pages/FaqPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import { COMPANY_INFO } from './data/landingData'

function MainLayout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login'

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState('')

  const handleOpenQuoteModal = (category = '') => {
    setSelectedCategoryForModal(category)
    setIsQuoteModalOpen(true)
  }

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false)
    setSelectedCategoryForModal('')
  }

  const handleDownloadCatalogue = () => {
    const element = document.createElement('a')
    const file = new Blob([
      `MUKESH POWER & ENERGY - OFFICIAL 2026 PRODUCT CATALOGUE & WHOLESALE PRICE LIST\n` +
      `========================================================================\n\n` +
      `Company: ${COMPANY_INFO.name}\n` +
      `Tagline: ${COMPANY_INFO.tagline}\n` +
      `Direct Contact: ${COMPANY_INFO.phonePrimary} / ${COMPANY_INFO.phoneSecondary}\n` +
      `Email: ${COMPANY_INFO.email}\n` +
      `Address: ${COMPANY_INFO.address}, ${COMPANY_INFO.city}\n` +
      `GSTIN: ${COMPANY_INFO.gstin}\n\n` +
      `AUTHORISED BRANDS:\n` +
      `-----------------\n` +
      `• Polycab Wires & Cables\n` +
      `• KEI Wires & Cables\n` +
      `• Havells Switchgear, Wires & Appliances\n` +
      `• Anchor by Panasonic Modular Switches & Conduit Boxes\n` +
      `• Legrand Modular Systems & MCBs\n` +
      `• Jaquar Architectural Lighting\n` +
      `• Crompton & Usha BLDC Energy Saving Fans\n` +
      `• Bajaj & Havells Water Heaters & Geysers\n` +
      `• ABB & Schneider Industrial Switchgears\n\n` +
      `For customized contractor and project quotations, please call ${COMPANY_INFO.phonePrimary} or WhatsApp our desk.\n`
    ], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = 'Mukesh_Power_and_Energy_Catalogue_2026.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="landing-page-root">
      {/* Top Utility Header (Public Only) */}
      {!isAdminRoute && <TopBar onOpenQuoteModal={() => handleOpenQuoteModal('')} />}

      {/* Main Navigation Bar (Public Only) */}
      {!isAdminRoute && <Navbar onOpenQuoteModal={() => handleOpenQuoteModal('')} />}

      {/* Application Routes */}
      <Routes>
        {/* Public Website Routes */}
        <Route 
          path="/" 
          element={
            <HomePage 
              onOpenQuoteModal={handleOpenQuoteModal} 
              onDownloadCatalogue={handleDownloadCatalogue}
            />
          } 
        />
        <Route 
          path="/about" 
          element={
            <AboutPage 
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          } 
        />
        <Route 
          path="/brands" 
          element={
            <BrandsPage 
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProductsPage 
              onOpenQuoteModal={handleOpenQuoteModal}
              onDownloadCatalogue={handleDownloadCatalogue}
            />
          } 
        />
        <Route 
          path="/services" 
          element={
            <ServicesPage 
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          } 
        />
        <Route 
          path="/why-us" 
          element={
            <WhyUsPage 
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          } 
        />
        <Route 
          path="/faqs" 
          element={
            <FaqPage 
              onOpenQuoteModal={handleOpenQuoteModal}
            />
          } 
        />

        {/* Admin Portal Authentication & Dashboard Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Footer (Public Only) */}
      {!isAdminRoute && (
        <Footer 
          onOpenQuoteModal={() => handleOpenQuoteModal('')}
          onDownloadCatalogue={handleDownloadCatalogue}
        />
      )}

      {/* Universal Quotation Modal (Public Only) */}
      {!isAdminRoute && (
        <EnquiryModal 
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          initialCategory={selectedCategoryForModal}
        />
      )}

      {/* Floating WhatsApp & Call Buttons (Public Only) */}
      {!isAdminRoute && <FloatingWhatsApp />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App
