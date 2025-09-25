import React from 'react'
import '../styles/TrustSection.css'

const TrustSection = () => {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-content">
          <div className="trust-item">
            <h3>How We Help Families</h3>
            <p>We provide independent hospice guidance and connect families with quality agencies at no cost. Our licensed professionals help you understand options, navigate Medicare, and make informed decisions.</p>
          </div>
          <div className="trust-item">
            <h3>Our Promise to You</h3>
            <ul>
              <li>No cost to families</li>
              <li>Independent, unbiased guidance</li>
              <li>HIPAA-compliant privacy protection</li>
              <li>Licensed healthcare professionals only</li>
              <li>24/7 crisis support available</li>
            </ul>
          </div>
          <div className="trust-item">
            <h3>How We're Supported</h3>
            <p>Family Hospice Support Network is supported by participating hospice agencies who value our pre-qualification and family education services. This allows us to provide free guidance to families.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
