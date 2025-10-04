import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfa]">
      <Header />
      <main className="py-12">
        <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
          <div className="max-w-[800px] bg-white p-12 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)] border border-[rgba(94,82,64,0.12)] mx-auto">
            <h1 className="text-[#13323b] text-[32px] mb-6 text-center">Terms of Service</h1>
            <p className="text-[#62708d] leading-[1.6] mb-4">By using our website and services, you agree to the following terms:</p>

            <ul className="mb-6 pl-5">
              <li className="text-[#62708d] leading-[1.6] mb-2">Our guidance is informational and not a substitute for medical advice.</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">We do not guarantee outcomes or endorse specific agencies.</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">You are responsible for your decisions based on our information.</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">We may update these terms at any time.</li>
            </ul>

            <p className="text-[#62708d] leading-[1.6] mb-4">Contact us for questions about these terms.</p>

            <div className="text-center mt-8">
              <Link className="text-[#62708d] no-underline font-medium hover:text-[#2185a1]" to="/">← Back to Home</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Terms
