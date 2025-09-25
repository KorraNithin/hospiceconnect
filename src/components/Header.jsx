import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  const handleLoginClick = () => {
    window.open('http://localhost:5502', '_blank')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="company-name">hospiceconnectdallas</h1>
            <p className="company-tagline">Connecting Dallas Families with Quality Hospice Care</p>
          </div>
          <div className="header-right">
            <div className="trust-indicators">
              <span className="trust-badge">HIPAA Secure</span>
              <span className="trust-badge">We Care For You</span>
              <button className="trust-badge login-btn" onClick={handleLoginClick} type="button">
                Local Healthcare Professional Login
              </button>
            </div>
            <div className="contact-info">
              <div className="phone-section">
                <span className="phone-label">24/7 Support:</span>
                <a href="tel:+12145552273" className="main-phone">(214) 555-CARE (2273)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
