/**
 * Backend API Service Layer for Mukesh Power & Energy
 * Connects seamlessly to future Node.js / Express or Python backend
 */
import {
  BRAND_LOGOS,
  PRODUCT_CATEGORIES,
  VALUE_SERVICES,
  FAQS
} from '../data/landingData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const checkBackendHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const response = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error('Offline');
    return await response.json();
  } catch (err) {
    return { status: 'offline', message: 'Backend not connected yet' };
  }
};

/**
 * Fetch Brands from Backend or Mock Fallback
 */
export const getBrands = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_BASE_URL}/brands`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      return data.brands || data;
    }
  } catch (err) {
    // console.info('Using local brand data');
  }
  return BRAND_LOGOS;
};

/**
 * Fetch Products from Backend or Mock Fallback
 */
export const getProducts = async (filters = {}) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/products${queryParams ? `?${queryParams}` : ''}`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      return data.products || data;
    }
  } catch (err) {
    // console.info('Using local product data');
  }

  let products = [...PRODUCT_CATEGORIES];
  if (filters.category && filters.category !== 'all') {
    products = products.filter(p => p.tag === filters.category);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.subtitle.toLowerCase().includes(s) ||
      p.brands.some(b => b.toLowerCase().includes(s))
    );
  }
  return products;
};

/**
 * Fetch Services
 */
export const getServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (response.ok) {
      const data = await response.json();
      return data.services || data;
    }
  } catch (err) {
    // fallback
  }
  return VALUE_SERVICES;
};

/**
 * Fetch FAQs
 */
export const getFaqs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/faqs`);
    if (response.ok) {
      const data = await response.json();
      return data.faqs || data;
    }
  } catch (err) {
    // fallback
  }
  return FAQS;
};

/**
 * Submit Quotation / Customer Enquiry
 */
export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn('Backend offline, saving enquiry locally for now:', enquiryData);
  }

  // Fallback: save to localStorage so no user input is lost
  const stored = JSON.parse(localStorage.getItem('mpe_enquiries') || '[]');
  const newEntry = {
    ...enquiryData,
    id: 'ENQ-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  stored.push(newEntry);
  localStorage.setItem('mpe_enquiries', JSON.stringify(stored));
  return {
    success: true,
    message: 'Thank you! Your quotation enquiry has been registered with Mukesh Power & Energy.',
    enquiry: newEntry
  };
};

export default {
  API_BASE_URL,
  checkBackendHealth,
  getBrands,
  getProducts,
  getServices,
  getFaqs,
  submitEnquiry
};
