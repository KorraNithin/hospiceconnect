import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/Terms.css'

const Terms = () => {
  return (
    <div className="terms">
      <Header />
      <main className="terms-content">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>By using our website and services, you agree to the following terms:</p>

          <ul>
            <li>Our guidance is informational and not a substitute for medical advice.</li>
            <li>We do not guarantee outcomes or endorse specific agencies.</li>
            <li>You are responsible for your decisions based on our information.</li>
            <li>We may update these terms at any time.</li>
          </ul>

          <p>Contact us for questions about these terms.</p>

          <div className="back-link">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Terms
