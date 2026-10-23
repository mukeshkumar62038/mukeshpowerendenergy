import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Inbox,
  FolderTree,
  Tags,
  Package,
  User,
  Key,
  LogOut,
  Search,
  Eye,
  Trash2,
  Plus,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  X,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  Filter,
  RefreshCw,
  Edit,
  Sparkles
} from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('enquiries') // 'dashboard' | 'enquiries' | 'categories' | 'brands' | 'products' | 'profile' | 'password'
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const navigate = useNavigate()

  // Data states
  const [enquiries, setEnquiries] = useState([])
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState(null)
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [productViewMode, setProductViewMode] = useState('add') // 'add' | 'list'
  const [productSuccessMsg, setProductSuccessMsg] = useState('')
  const [isSavingProduct, setIsSavingProduct] = useState(false)

  // Add Product Form State matching exact uploaded design
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    category: 'Wires & Cables',
    brand: 'Polycab',
    price: '0.00',
    stockStatus: 'In Stock',
    isFeatured: false,
    shortDescription: '',
    fullDescription: '',
    image: '',
    galleryImages: [],
    specs: ''
  })
  const [customSlugEdited, setCustomSlugEdited] = useState(false)

  const [newBrand, setNewBrand] = useState({
    name: '',
    category: 'Wires & Cables',
    badge: 'Authorised Partner',
    tagline: '',
    description: ''
  })
  const [newCategory, setNewCategory] = useState({ name: '' })
  const [dbStatus, setDbStatus] = useState(null)

  const token = localStorage.getItem('mpe_admin_token')

  // Auth check
  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchDbStatus()
    fetchEnquiries()
    fetchProducts()
    fetchBrands()
    fetchCategories()
  }, [])

  const fetchDbStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`)
      if (res.ok) {
        const data = await res.json()
        setDbStatus(data.database)
      }
    } catch (e) {
      setDbStatus({ connected: false, type: 'Offline' })
    }
  }

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setEnquiries(data.enquiries || [])
      } else {
        // Fallback from localStorage
        const stored = JSON.parse(localStorage.getItem('mpe_enquiries') || '[]')
        setEnquiries(stored)
      }
    } catch (err) {
      const stored = JSON.parse(localStorage.getItem('mpe_enquiries') || '[]')
      setEnquiries(stored)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data.products || [])
      }
    } catch (err) {}
  }

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/brands`)
      if (res.ok) {
        const data = await res.json()
        setBrands(data.brands || [])
      }
    } catch (err) {}
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`)
      if (res.ok) {
        const data = await res.json()
        setCategories(data.categories || [])
      }
    } catch (err) {}
  }

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await fetch(`${API_BASE_URL}/enquiries/${enquiryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      setEnquiries(prev =>
        prev.map(e => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      )
    } catch (err) {
      setEnquiries(prev =>
        prev.map(e => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      )
    }
  }

  const handleDeleteEnquiry = async (enquiryId) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return
    try {
      await fetch(`${API_BASE_URL}/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      setEnquiries(prev => prev.filter(e => e.id !== enquiryId))
    } catch (err) {
      setEnquiries(prev => prev.filter(e => e.id !== enquiryId))
    }
  }

  const handleProductNameChange = (val) => {
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setNewProduct(prev => ({
      ...prev,
      name: val,
      slug: customSlugEdited ? prev.slug : autoSlug
    }))
  }

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Image size exceeds 3MB. Please choose a smaller image.')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryImagesUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      if (file.size <= 3 * 1024 * 1024) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setNewProduct(prev => ({
            ...prev,
            galleryImages: [...(prev.galleryImages || []), reader.result]
          }))
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleAddProductSubmit = async (e) => {
    e.preventDefault()
    if (!newProduct.name) {
      alert('Please enter a Product Name.')
      return
    }
    setIsSavingProduct(true)
    setProductSuccessMsg('')

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          title: newProduct.name
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setProductSuccessMsg(`"${data.product.title}" has been successfully saved to MongoDB Database and is now LIVE on the website!`)
        setProducts([data.product, ...products])
        
        // Reset form
        setNewProduct({
          name: '',
          slug: '',
          category: categories[0]?.name || 'Wires & Cables',
          brand: brands[0]?.name || 'Polycab',
          price: '0.00',
          stockStatus: 'In Stock',
          isFeatured: false,
          shortDescription: '',
          fullDescription: '',
          image: '',
          galleryImages: [],
          specs: ''
        })
        setCustomSlugEdited(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        alert(data.message || 'Failed to add product.')
      }
    } catch (err) {
      alert('Error connecting to backend server.')
    } finally {
      setIsSavingProduct(false)
    }
  }

  const handleAddBrand = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE_URL}/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newBrand)
      })
      if (res.ok) {
        const data = await res.json()
        setBrands([...brands, data.brand])
        setIsAddBrandOpen(false)
        setNewBrand({ name: '', category: 'Wires & Cables', badge: 'Authorised Partner', tagline: '', description: '' })
      }
    } catch (err) {}
  }

  const handleLogout = () => {
    localStorage.removeItem('mpe_admin_token')
    localStorage.removeItem('mpe_admin_user')
    navigate('/admin/login')
  }

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesStatus =
      statusFilter === 'All Status' ||
      statusFilter === 'All' ||
      enq.status?.toLowerCase() === statusFilter.toLowerCase()

    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !searchQuery ||
      (enq.name && enq.name.toLowerCase().includes(q)) ||
      (enq.phone && enq.phone.includes(q)) ||
      (enq.email && enq.email.toLowerCase().includes(q)) ||
      (enq.category && enq.category.toLowerCase().includes(q))

    return matchesStatus && matchesSearch
  })

  return (
    <div className="admin-dashboard-layout">
      {/* 1. Left Sidebar */}
      <aside className="admin-sidebar">
        {/* Logo Header */}
        <div className="sidebar-brand-box" onClick={() => navigate('/')}>
          <img 
            src="/images/mukesh_logo.jpeg" 
            alt="Mukesh Power & Energy" 
            className="sidebar-logo-img"
          />
        </div>

        {/* Navigation Groups */}
        <nav className="sidebar-nav-menu">
          {/* MAIN */}
          <div className="nav-group">
            <span className="nav-group-title">MAIN</span>
            <button
              className={`sidebar-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
          </div>

          {/* ENQUIRIES */}
          <div className="nav-group">
            <span className="nav-group-title">ENQUIRIES</span>
            <button
              className={`sidebar-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('enquiries')}
            >
              <Inbox size={18} />
              <span>Enquiry Details</span>
              {enquiries.length > 0 && (
                <span className="sidebar-counter-badge">{enquiries.length}</span>
              )}
            </button>
          </div>

          {/* CATALOG */}
          <div className="nav-group">
            <span className="nav-group-title">CATALOG</span>
            <button
              className={`sidebar-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <FolderTree size={18} />
              <span>Product Category</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'brands' ? 'active' : ''}`}
              onClick={() => setActiveTab('brands')}
            >
              <Tags size={18} />
              <span>Brands</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={18} />
              <span>Products</span>
            </button>
          </div>

          {/* ACCOUNT */}
          <div className="nav-group">
            <span className="nav-group-title">ACCOUNT</span>
            <button
              className={`sidebar-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              <span>Profile Settings</span>
            </button>
            <button
              className={`sidebar-nav-item ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <Key size={18} />
              <span>Change Password</span>
            </button>
            <button className="sidebar-nav-item logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Top Header */}
        <header className="admin-topbar">
          <div className="topbar-page-heading">
            <h2>
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'enquiries' && 'Enquiry Details'}
              {activeTab === 'categories' && 'Product Categories'}
              {activeTab === 'brands' && 'Brand Management'}
              {activeTab === 'products' && (productViewMode === 'add' ? 'Add Product' : 'Product Catalog Management')}
              {activeTab === 'profile' && 'Profile Settings'}
              {activeTab === 'password' && 'Change Password'}
            </h2>
          </div>

          <div className="topbar-right-user">
            {/* Live Database Status Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: dbStatus?.connected ? '#ecfdf5' : '#fef2f2',
              color: dbStatus?.connected ? '#047857' : '#b91c1c',
              border: `1px solid ${dbStatus?.connected ? '#a7f3d0' : '#fecaca'}`,
              letterSpacing: '0.01em'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: dbStatus?.connected ? '#10b981' : '#ef4444',
                boxShadow: dbStatus?.connected ? '0 0 8px rgba(16, 185, 129, 0.8)' : 'none'
              }}></span>
              <span>{dbStatus?.connected ? 'MongoDB Atlas Live' : 'Connecting DB...'}</span>
            </div>

            <button 
              className="btn-back-web" 
              onClick={() => navigate('/')}
              title="Visit Live Website"
            >
              <ExternalLink size={15} />
              <span>Live Website</span>
            </button>

            {/* User Profile Badge */}
            <div className="user-profile-relative">
              <div 
                className="user-badge-trigger"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="admin-avatar">A</div>
                <span className="admin-name-text">Admin</span>
                <ChevronDown size={14} />
              </div>

              {userDropdownOpen && (
                <div className="admin-dropdown-menu">
                  <div className="dropdown-user-info">
                    <strong>Mukesh Admin</strong>
                    <p>admin@mukeshpower.com</p>
                  </div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Body Content based on Tab */}
        <main className="admin-body-content">
          {/* TAB 1: ENQUIRIES (Main View from Image 2) */}
          {activeTab === 'enquiries' && (
            <div className="admin-card-container">
              {/* Table Toolbar */}
              <div className="table-header-toolbar">
                <div className="table-title">
                  <h3>All Enquiries ({filteredEnquiries.length})</h3>
                </div>

                <div className="table-filters-row">
                  <div className="admin-search-box">
                    <input 
                      type="text" 
                      placeholder="Search name, phone, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <select 
                    className="admin-select-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All Status">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button className="btn-filter-search" onClick={fetchEnquiries}>
                    <Search size={16} />
                  </button>
                </div>
              </div>

              {/* Enquiries Table */}
              <div className="admin-table-wrapper">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NAME</th>
                      <th>PHONE</th>
                      <th>EMAIL</th>
                      <th>SUBJECT</th>
                      <th>FORM TYPE</th>
                      <th>CATEGORY</th>
                      <th>STATUS</th>
                      <th>ENQ. DATE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="table-empty-row">
                          No enquiries found.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq, index) => (
                        <tr key={enq.id || index}>
                          <td>{index + 1}</td>
                          <td className="font-semibold">{enq.name}</td>
                          <td>
                            <a href={`tel:${enq.phone}`} className="table-phone-link">
                              {enq.phone}
                            </a>
                          </td>
                          <td>{enq.email}</td>
                          <td>{enq.subject || 'Product Query'}</td>
                          <td>
                            <span className="form-type-tag">{enq.formType || 'get quote'}</span>
                          </td>
                          <td>{enq.category}</td>
                          <td>
                            <select
                              className={`status-pill-select ${enq.status?.toLowerCase() || 'pending'}`}
                              value={enq.status || 'Pending'}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="table-date">
                            {enq.createdAt
                              ? new Date(enq.createdAt).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : '06 Aug 2026'}
                          </td>
                          <td>
                            <div className="action-buttons-group">
                              <button
                                type="button"
                                className="btn-action-icon view"
                                onClick={() => setSelectedEnquiry(enq)}
                                title="View Details"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                type="button"
                                className="btn-action-icon delete"
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                title="Delete Enquiry"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-overview-tab">
              <div className="overview-stats-cards">
                <div className="stat-overview-box">
                  <div className="stat-overview-title">Total Enquiries</div>
                  <div className="stat-overview-num">{enquiries.length}</div>
                  <div className="stat-overview-sub">From website visitors</div>
                </div>

                <div className="stat-overview-box">
                  <div className="stat-overview-title">Pending Quotes</div>
                  <div className="stat-overview-num">
                    {enquiries.filter(e => e.status === 'Pending').length}
                  </div>
                  <div className="stat-overview-sub text-amber">Needs follow up</div>
                </div>

                <div className="stat-overview-box">
                  <div className="stat-overview-title">Active Products</div>
                  <div className="stat-overview-num">{products.length}</div>
                  <div className="stat-overview-sub">In catalogue</div>
                </div>

                <div className="stat-overview-box">
                  <div className="stat-overview-title">Partner Brands</div>
                  <div className="stat-overview-num">{brands.length}</div>
                  <div className="stat-overview-sub">Authorised Stockist</div>
                </div>
              </div>

              <div className="overview-recent-card">
                <div className="recent-card-header">
                  <h3>Recent Customer Inquiries</h3>
                  <button className="btn-link-action" onClick={() => setActiveTab('enquiries')}>
                    View All Enquiries &rarr;
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>PHONE</th>
                        <th>CATEGORY</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.slice(0, 5).map((enq, i) => (
                        <tr key={i}>
                          <td className="font-semibold">{enq.name}</td>
                          <td>{enq.phone}</td>
                          <td>{enq.category}</td>
                          <td>
                            <span className={`status-pill ${enq.status?.toLowerCase() || 'pending'}`}>
                              {enq.status || 'Pending'}
                            </span>
                          </td>
                          <td>
                            {enq.createdAt
                              ? new Date(enq.createdAt).toLocaleDateString('en-GB')
                              : 'Recent'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT (Exact Add Product Form from User's Screenshot) */}
          {activeTab === 'products' && (
            <div className="add-product-container">
              {/* Header Navigation & View Toggle */}
              <div className="product-admin-header-tabs">
                <div className="product-mode-toggle">
                  <button 
                    type="button"
                    className={`btn-mode-tab ${productViewMode === 'add' ? 'active' : ''}`}
                    onClick={() => setProductViewMode('add')}
                  >
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                  <button 
                    type="button"
                    className={`btn-mode-tab ${productViewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setProductViewMode('list')}
                  >
                    <Package size={16} />
                    <span>Catalog List ({products.length})</span>
                  </button>
                </div>

                <div className="header-actions">
                  <a 
                    href="/products" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-back-web"
                    title="View Public Catalog"
                  >
                    <ExternalLink size={14} />
                    <span>View Public Store</span>
                  </a>
                </div>
              </div>

              {/* Success Notification Alert */}
              {productSuccessMsg && (
                <div className="admin-success-banner">
                  <CheckCircle2 size={20} />
                  <span>{productSuccessMsg}</span>
                </div>
              )}

              {/* VIEW 1: ADD PRODUCT FORM (Exact Match to User Image) */}
              {productViewMode === 'add' && (
                <form onSubmit={handleAddProductSubmit} className="add-product-form-layout">
                  {/* Top Image Notice & Main Image Upload */}
                  <div className="admin-input-block">
                    <p className="form-instruction-notice">
                      JPG, PNG or WEBP. Max 3MB. This shows on product cards & gallery thumbnail #1.
                    </p>
                    <div className="admin-image-upload-card">
                      <div className="image-preview-wrapper">
                        {newProduct.image ? (
                          <img 
                            src={newProduct.image} 
                            alt="Main Preview" 
                            className="uploaded-thumb-preview"
                          />
                        ) : (
                          <div className="uploaded-thumb-preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#94a3b8' }}>
                            <Package size={32} />
                          </div>
                        )}
                        <div style={{ textAlign: 'left' }}>
                          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>
                            Main Product Image
                          </label>
                          <input 
                            type="file" 
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleMainImageUpload}
                            className="file-input-custom"
                          />
                          <p className="field-helper-subtext">Click to choose image from your computer</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 1: Product Name & Slug */}
                  <div className="admin-form-grid-2">
                    <div className="admin-input-block">
                      <label>Product Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Polycab House Wire 1.5 SQ MM"
                        value={newProduct.name}
                        onChange={(e) => handleProductNameChange(e.target.value)}
                      />
                    </div>

                    <div className="admin-input-block">
                      <label>Slug (URL)</label>
                      <input 
                        type="text" 
                        placeholder="auto-generated-from-name"
                        value={newProduct.slug}
                        onChange={(e) => {
                          setCustomSlugEdited(true)
                          setNewProduct({ ...newProduct, slug: e.target.value })
                        }}
                      />
                      <span className="field-helper-subtext">
                        Leave blank to auto-generate. Used as: product-details.php?slug=this-value
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Product Category & Brand */}
                  <div className="admin-form-grid-2">
                    <div className="admin-input-block">
                      <label>Product Category *</label>
                      <select 
                        required
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id || c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-input-block">
                      <label>Brand *</label>
                      <select 
                        required
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                      >
                        <option value="">Select Brand</option>
                        {brands.map((b) => (
                          <option key={b.id || b.name} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Price & Stock Status */}
                  <div className="admin-form-grid-2">
                    <div className="admin-input-block">
                      <label>Price (₹)</label>
                      <input 
                        type="text" 
                        placeholder="0.00"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      />
                    </div>

                    <div className="admin-input-block">
                      <label>Stock Status</label>
                      <select 
                        value={newProduct.stockStatus}
                        onChange={(e) => setNewProduct({ ...newProduct, stockStatus: e.target.value })}
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Pre-Order">Pre-Order</option>
                        <option value="Low Stock">Low Stock</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Mark as Featured Checkbox */}
                  <label className="admin-checkbox-card">
                    <input 
                      type="checkbox" 
                      checked={newProduct.isFeatured}
                      onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                    />
                    <span>Mark as Featured (shows "Featured" badge)</span>
                  </label>

                  {/* Row 5: Short Description */}
                  <div className="admin-input-block">
                    <label>Short Description</label>
                    <textarea 
                      rows={2}
                      placeholder="1-2 line summary shown at the top of product detail page"
                      value={newProduct.shortDescription}
                      onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                    />
                  </div>

                  {/* Row 6: Full Description */}
                  <div className="admin-input-block">
                    <label>Full Description</label>
                    <textarea 
                      rows={4}
                      placeholder="Detailed description shown in the Description tab"
                      value={newProduct.fullDescription}
                      onChange={(e) => setNewProduct({ ...newProduct, fullDescription: e.target.value })}
                    />
                  </div>

                  {/* Row 7: Specifications / Key Highlights */}
                  <div className="admin-input-block">
                    <label>Specifications / Features (Comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 100% Electrolytic Copper, 1100V Grade, ISI Certified, Flame Retardant"
                      value={newProduct.specs}
                      onChange={(e) => setNewProduct({ ...newProduct, specs: e.target.value })}
                    />
                  </div>

                  {/* Row 8: Gallery Images (multiple) */}
                  <div className="admin-input-block">
                    <label>Gallery Images (for product detail page thumbnails)</label>
                    <div style={{ marginTop: '0.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', color: '#475569', marginBottom: '0.4rem' }}>
                        Upload Gallery Images (multiple)
                      </label>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleGalleryImagesUpload}
                        className="file-input-custom"
                      />
                      <p className="field-helper-subtext">
                        Select multiple images. JPG, PNG or WEBP, max 3MB each.
                      </p>
                    </div>

                    {newProduct.galleryImages && newProduct.galleryImages.length > 0 && (
                      <div className="gallery-thumbs-row">
                        {newProduct.galleryImages.map((gImg, gIdx) => (
                          <img key={gIdx} src={gImg} alt={`Thumbnail ${gIdx}`} className="gallery-mini-thumb" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form Submission Buttons */}
                  <div className="admin-form-actions-row">
                    <button 
                      type="submit" 
                      className="btn-save-product-main"
                      disabled={isSavingProduct}
                    >
                      <Plus size={18} />
                      <span>{isSavingProduct ? 'Saving to Catalog...' : 'Save & Publish Product'}</span>
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn-reset-form"
                      onClick={() => {
                        setNewProduct({
                          name: '',
                          slug: '',
                          category: categories[0]?.name || 'Wires & Cables',
                          brand: brands[0]?.name || 'Polycab',
                          price: '0.00',
                          stockStatus: 'In Stock',
                          isFeatured: false,
                          shortDescription: '',
                          fullDescription: '',
                          image: '',
                          galleryImages: [],
                          specs: ''
                        })
                        setCustomSlugEdited(false)
                      }}
                    >
                      Reset Form
                    </button>
                  </div>
                </form>
              )}

              {/* VIEW 2: PRODUCT CATALOG TABLE */}
              {productViewMode === 'list' && (
                <div className="admin-table-wrapper" style={{ marginTop: '1rem' }}>
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>PRODUCT</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>PRICE</th>
                        <th>STOCK STATUS</th>
                        <th>BADGE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="table-empty-row">No products in catalog. Click "Add Product" to add your first product.</td>
                        </tr>
                      ) : (
                        products.map((p, i) => (
                          <tr key={p.id || i}>
                            <td>{i + 1}</td>
                            <td>
                              <div className="table-product-item">
                                <img src={p.image || '/images/products/wires.png'} alt={p.title || p.name} className="table-prod-img" />
                                <div>
                                  <strong>{p.title || p.name}</strong>
                                  {p.shortDescription && <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.shortDescription.slice(0, 45)}...</p>}
                                </div>
                              </div>
                            </td>
                            <td>{p.category}</td>
                            <td><strong>{p.brand}</strong></td>
                            <td>{p.price}</td>
                            <td>
                              <span className={`stock-in-tag ${p.stockStatus === 'Out of Stock' ? 'text-amber' : ''}`}>
                                {p.stockStatus || 'In Stock'}
                              </span>
                            </td>
                            <td>
                              <span className="prod-badge-mini">{p.badge || (p.featured ? 'Featured' : 'Certified')}</span>
                            </td>
                            <td>
                              <button 
                                className="btn-action-icon delete" 
                                title="Delete Product"
                                onClick={async () => {
                                  if (window.confirm(`Are you sure you want to delete "${p.title || p.name}"?`)) {
                                    await fetch(`${API_BASE_URL}/products/${p.id}`, {
                                      method: 'DELETE',
                                      headers: { Authorization: `Bearer ${token}` }
                                    })
                                    setProducts(products.filter(item => item.id !== p.id))
                                  }
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BRANDS MANAGEMENT */}
          {activeTab === 'brands' && (
            <div className="admin-card-container">
              <div className="table-header-toolbar">
                <div className="table-title">
                  <h3>Partner Brands ({brands.length})</h3>
                </div>
                <button 
                  className="btn-add-primary"
                  onClick={() => setIsAddBrandOpen(true)}
                >
                  <Plus size={16} />
                  <span>Add Brand</span>
                </button>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>BRAND</th>
                      <th>CATEGORY</th>
                      <th>BADGE</th>
                      <th>PRODUCTS</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((b, i) => (
                      <tr key={b.id || i}>
                        <td>
                          <div className="table-product-item">
                            <img src={b.image} alt={b.name} className="table-brand-img" />
                            <strong>{b.name}</strong>
                          </div>
                        </td>
                        <td>{b.category}</td>
                        <td><span className="brand-badge-mini">{b.badge}</span></td>
                        <td>{b.productsCount || '10+ Items'}</td>
                        <td><span className="status-pill resolved">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="admin-card-container">
              <div className="table-header-toolbar">
                <div className="table-title">
                  <h3>Product Categories ({categories.length})</h3>
                </div>
                <button 
                  className="btn-add-primary"
                  onClick={() => setIsAddCategoryOpen(true)}
                >
                  <Plus size={16} />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>CATEGORY NAME</th>
                      <th>SLUG</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c, i) => (
                      <tr key={c.id || i}>
                        <td>{i + 1}</td>
                        <td className="font-semibold">{c.name}</td>
                        <td><code>{c.slug}</code></td>
                        <td><span className="status-pill resolved">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="admin-card-container">
              <div className="profile-edit-box">
                <h3>Admin Profile Settings</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Mukesh Admin" />
                </div>
                <div className="form-group">
                  <label>Admin Email</label>
                  <input type="email" defaultValue="admin@mukeshpower.com" disabled />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" defaultValue="Super Administrator" disabled />
                </div>
                <button className="btn-add-primary" onClick={() => alert('Profile updated successfully.')}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: CHANGE PASSWORD */}
          {activeTab === 'password' && (
            <div className="admin-card-container">
              <div className="profile-edit-box">
                <h3>Change Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button className="btn-add-primary" onClick={() => alert('Password updated successfully.')}>
                  Update Password
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: VIEW ENQUIRY DETAILS */}
      {selectedEnquiry && (
        <div className="modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-content admin-enq-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedEnquiry(null)}>
              <X size={20} />
            </button>

            <div className="modal-form-pane">
              <div className="modal-header">
                <div className="modal-badge">
                  <span>Enquiry #{selectedEnquiry.id}</span>
                </div>
                <h2>Customer Requirement Details</h2>
              </div>

              <div className="enquiry-view-grid">
                <div className="view-field">
                  <label>Customer Name:</label>
                  <strong>{selectedEnquiry.name}</strong>
                </div>
                <div className="view-field">
                  <label>Phone / WhatsApp:</label>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-green font-bold">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div className="view-field">
                  <label>Email Address:</label>
                  <span>{selectedEnquiry.email || 'N/A'}</span>
                </div>
                <div className="view-field">
                  <label>Category:</label>
                  <span>{selectedEnquiry.category}</span>
                </div>
                <div className="view-field full-width">
                  <label>Quantity / Units Required:</label>
                  <p className="enquiry-text-block">{selectedEnquiry.quantity || 'Not specified'}</p>
                </div>
                <div className="view-field full-width">
                  <label>Message / Notes:</label>
                  <p className="enquiry-text-block">{selectedEnquiry.message || 'No additional notes.'}</p>
                </div>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-modal-submit"
                  onClick={() => {
                    handleStatusChange(selectedEnquiry.id, 'Contacted')
                    setSelectedEnquiry(null)
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Mark as Contacted</span>
                </button>
                <a
                  href={`https://wa.me/${String(selectedEnquiry?.phone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedEnquiry?.name || '')},%20this%20is%20Mukesh%20Power%20%26%20Energy%20regarding%20your%20electrical%20quotation%20request.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-modal-whatsapp"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD BRAND MODAL */}
      {isAddBrandOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddBrandOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddBrandOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-form-pane">
              <div className="modal-header">
                <h2>Add Partner Brand</h2>
              </div>

              <form onSubmit={handleAddBrand} className="modal-form">
                <div className="form-field">
                  <label>Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Finolex / Schneider"
                    value={newBrand.name}
                    onChange={e => setNewBrand({ ...newBrand, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="Wires & Switchgear"
                    value={newBrand.category}
                    onChange={e => setNewBrand({ ...newBrand, category: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label>Tagline</label>
                  <input
                    type="text"
                    placeholder="Be Bright, Think Right"
                    value={newBrand.tagline}
                    onChange={e => setNewBrand({ ...newBrand, tagline: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-modal-submit">
                  <span>Save Brand</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD CATEGORY */}
      {isAddCategoryOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddCategoryOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddCategoryOpen(false)}>
              <X size={20} />
            </button>

            <div className="modal-form-pane">
              <div className="modal-header">
                <h2>Add Product Category</h2>
              </div>

              <form
                onSubmit={async e => {
                  e.preventDefault()
                  if (!newCategory.name) return
                  const res = await fetch(`${API_BASE_URL}/categories`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(newCategory)
                  })
                  if (res.ok) {
                    const data = await res.json()
                    setCategories([...categories, data.category])
                    setIsAddCategoryOpen(false)
                    setNewCategory({ name: '' })
                  }
                }}
                className="modal-form"
              >
                <div className="form-field">
                  <label>Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Solar Cables & Inverters"
                    value={newCategory.name}
                    onChange={e => setNewCategory({ name: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-modal-submit">
                  <span>Create Category</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
