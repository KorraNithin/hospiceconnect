import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfa]">
      <Header />
      <main className="py-12">
        <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
          <div className="max-w-[800px] bg-white p-12 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)] border border-[rgba(94,82,64,0.12)] mx-auto">
            <h1 className="text-[#13323b] text-[32px] mb-6 text-center">Privacy Policy</h1>
            <p className="text-[#62708d] leading-[1.6] mb-4">Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our services.</p>

            <h2 className="text-[#13323b] text-[20px] mt-8 mb-4 font-semibold">Information We Collect</h2>
            <ul className="mb-6 pl-5">
              <li className="text-[#62708d] leading-[1.6] mb-2">Personal information you provide via forms (name, phone, email, etc.)</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">Usage data (browser, device, IP address)</li>
            </ul>

            <h2 className="text-[#13323b] text-[20px] mt-8 mb-4 font-semibold">How We Use Your Information</h2>
            <ul className="mb-6 pl-5">
              <li className="text-[#62708d] leading-[1.6] mb-2">To provide hospice guidance and connect you with agencies</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">To communicate with you and respond to your requests</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">To improve our services</li>
            </ul>

            <h2 className="text-[#13323b] text-[20px] mt-8 mb-4 font-semibold">How We Protect Your Information</h2>
            <ul className="mb-6 pl-5">
              <li className="text-[#62708d] leading-[1.6] mb-2">HIPAA-compliant security practices</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">Encryption and secure storage</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">Access limited to authorized personnel</li>
            </ul>

            <h2 className="text-[#13323b] text-[20px] mt-8 mb-4 font-semibold">Your Rights</h2>
            <ul className="mb-6 pl-5">
              <li className="text-[#62708d] leading-[1.6] mb-2">You may request access, correction, or deletion of your data</li>
              <li className="text-[#62708d] leading-[1.6] mb-2">Contact us at <a className="text-[#2185a1] no-underline hover:text-[#1a6b7d] underline" href="mailto:privacy@hospiceconnectcity.com">privacy@hospiceconnectcity.com</a></li>
            </ul>

            <p className="text-[#62708d] leading-[1.6] mb-4">For more details, contact our privacy officer.</p>

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

export default Privacy
