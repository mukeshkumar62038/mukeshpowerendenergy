import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { COMPANY_INFO } from '../../data/landingData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  // If already logged in, go straight to dashboard
  React.useEffect(() => {
    const existingToken = localStorage.getItem('mpe_admin_token')
    if (existingToken) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('mpe_admin_token', data.token)
        localStorage.setItem('mpe_admin_user', JSON.stringify(data.user))
        window.location.href = '/admin/dashboard'
      } else {
        setErrorMsg(data.message || 'Invalid email or password.')
      }
    } catch (err) {
      setErrorMsg('Could not connect to server. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      {/* Background Glow */}
      <div className="admin-login-bg-glow glow-1"></div>
      <div className="admin-login-bg-glow glow-2"></div>

      <div className="admin-login-wrapper">
        {/* Split Card Container */}
        <div className="admin-login-card">
          {/* Left Column: Brand & Glowing Spark */}
          <div className="admin-login-left">
            <div className="admin-brand-header">
              <img 
                src="/images/mukesh_logo.jpeg" 
                alt="Mukesh Power and Energy" 
                className="admin-login-logo"
              />
            </div>

            <div className="admin-energy-visual">
              <div className="radar-circle-outer">
                <div className="radar-circle-inner">
                  <div className="spark-center-glow">
                    <Zap size={38} className="spark-bolt-svg" />
                  </div>
                </div>
                <div className="radar-node node-1"></div>
                <div className="radar-node node-2"></div>
                <div className="radar-node node-3"></div>
                <div className="radar-node node-4"></div>
              </div>
            </div>

            <div className="admin-left-footer">
              <h3>Powering Every Connection</h3>
              <p>SECURE ADMIN PORTAL</p>
            </div>
          </div>

          {/* Right Column: Sign In Form */}
          <div className="admin-login-right">
            <div className="admin-access-badge">
              <ShieldCheck size={14} />
              <span>Admin Access</span>
            </div>

            <h2 className="admin-welcome-title">Welcome Back</h2>
            <p className="admin-welcome-sub">
              Sign in to continue to the Mukesh Power & Energy Admin Dashboard.
            </p>

            {errorMsg && (
              <div className="admin-error-alert">
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="admin-auth-form">
              <div className="admin-form-field">
                <label>Email Address</label>
                <div className="admin-input-group">
                  <input 
                    type="email" 
                    required 
                    placeholder="admin@mukeshpower.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-form-field">
                <label>Password</label>
                <div className="admin-input-group password-group">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn-toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="admin-options-row">
                <label className="remember-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-pass-link" onClick={(e) => { e.preventDefault(); alert('Please contact an administrator to reset your password.'); }}>
                  Forgot Password?
                </a>
              </div>

              <button 
                type="submit" 
                className="btn-admin-submit"
                disabled={loading}
              >
                <LogIn size={18} />
                <span>{loading ? 'Authenticating...' : 'Login to Dashboard'}</span>
              </button>
            </form>

            <div className="admin-card-footer">
              <p>© {new Date().getFullYear()} Mukesh Power and Energy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
