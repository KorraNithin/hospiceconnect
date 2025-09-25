import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Family Hospice Support Network</h4>
            <p>Independent resource center helping Dallas families navigate hospice care decisions</p>
            <p className="phone-footer">24/7 Support: <a href="tel:+12145552273">(214) 555-CARE (2273)</a></p>
          </div>
          <div className="footer-section">
            <h5>Our Services</h5>
            <ul>
              <li>Hospice care guidance</li>
              <li>Medicare navigation</li>
              <li>Agency matching</li>
              <li>Crisis support</li>
            </ul>
          </div>
          <div className="footer-section">
            <h5>Privacy & Compliance</h5>
            <ul>
              <li><a href="/privacy" target="_blank">HIPAA Privacy Notice</a></li>
              <li><a href="/privacy" target="_blank">Privacy Policy</a></li>
              <li><a href="/terms" target="_blank">Terms of Service</a></li>
              <li>Licensed Healthcare Professionals</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2020-2025 Family Hospice Support Network. All rights reserved. | Serving Dallas-Fort Worth Area</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
