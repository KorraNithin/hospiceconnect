import React, { useState } from 'react'
import PdfModal from './PdfModal'
import privacyPdf from '../privacy.pdf'
import termsPdf from '../terms.pdf'

const Footer = () => {
  const [pdfOpen, setPdfOpen] = useState(false)
  const [pdfTitle, setPdfTitle] = useState('')
  const [pdfSrc, setPdfSrc] = useState(null)

  const openDocument = (e, title, src) => {
    e.preventDefault()
    setPdfTitle(title)
    setPdfSrc(src)
    setPdfOpen(true)
  }

  const closeModal = () => {
    setPdfOpen(false)
    setPdfSrc(null)
    setPdfTitle('')
  }

  return (
    <footer className="bg-[#13323b] text-[#fcfcfa] pt-8 pb-4 mt-auto">
      <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'32px', marginBottom:'32px'}}>
          <div>
            <h4 className="text-[#fcfcfa] text-[16px] mb-4 font-semibold">Family Hospice Support Network</h4>
            <p style={{color:'rgba(252, 252, 250, 0.8)', lineHeight:'1.5', marginBottom:'8px'}}>Independent resource center helping Dallas families navigate hospice care decisions</p>
            <p className="text-[16px] font-semibold">24/7 Support: <a className="text-[#fcfcfa]" href="tel:+12145552273">(214) 555-CARE (2273)</a></p>
          </div>
          <div>
            <h5 className="text-[#fcfcfa] text-[14px] mb-3 font-[550]">Our Services</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-2">Hospice care guidance</li>
              <li className="mb-2">Medicare navigation</li>
              <li className="mb-2">Agency matching</li>
              <li className="mb-2">Crisis support</li>
            </ul>
          </div>
          <div>
            <h5 className="text-[#fcfcfa] text-[14px] mb-3 font-[550]">Privacy & Compliance</h5>
            <ul className="list-none p-0 m-0">
              <li className="mb-2"><a className="no-underline" style={{color:'rgba(252,252,250,0.8)', transition:'color 150ms cubic-bezier(0.16,1,0.3,1)'}} href="#" onClick={(e)=>openDocument(e,'HIPAA Privacy Notice', privacyPdf)}>HIPAA Privacy Notice</a></li>
              <li className="mb-2"><a className="no-underline" style={{color:'rgba(252,252,250,0.8)', transition:'color 150ms cubic-bezier(0.16,1,0.3,1)'}} href="#" onClick={(e)=>openDocument(e,'Privacy Policy', privacyPdf)}>Privacy Policy</a></li>
              <li className="mb-2"><a className="no-underline" style={{color:'rgba(252,252,250,0.8)', transition:'color 150ms cubic-bezier(0.16,1,0.3,1)'}} href="#" onClick={(e)=>openDocument(e,'Terms of Service', termsPdf)}>Terms of Service</a></li>
              <li className="mb-2">Licensed Healthcare Professionals</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[rgba(252,252,250,0.2)] pt-4 text-center">
          <p className="text-[12px] m-0" style={{color:'rgba(252,252,250,0.6)'}}>&copy; 2020-2025 Family Hospice Support Network. All rights reserved. | Serving Dallas-Fort Worth Area</p>
        </div>
      </div>
      {pdfOpen && pdfSrc && (
        <PdfModal src={pdfSrc} title={pdfTitle} onClose={closeModal} />
      )}
    </footer>
  )
}

export default Footer
