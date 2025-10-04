import React, { useState } from 'react'
import PdfModal from './PdfModal'
import privacyPdf from '../privacy.pdf'
import termsPdf from '../terms.pdf'

const FormStep4 = ({ formData, updateFormData, errors }) => {
  const [pdfSrc, setPdfSrc] = useState(null)
  const [pdfTitle, setPdfTitle] = useState('')

  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  const openPrivacy = (e) => {
    e.preventDefault()
    setPdfTitle('Privacy Policy')
    setPdfSrc(privacyPdf)
  }

  const openTerms = (e) => {
    e.preventDefault()
    setPdfTitle('Terms of Service')
    setPdfSrc(termsPdf)
  }

  const closeModal = () => {
    setPdfSrc(null)
    setPdfTitle('')
  }

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-[20px] text-[#13323b] mb-2">Care Preferences & Coverage</h3>
        <p className="text-[#62708d] mb-4 text-[14px]">Final details to help us match you with the right hospice agencies</p>
        <div className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-5 py-3 rounded-full text-[12px] font-[550] border border-[rgba(34,197,94,0.3)] inline-block">Connect with 2-3 quality agencies that match your specific needs</div>
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-[550] text-[#13323b] text-[14px]">Preferred type of hospice care</label>
        <div className="flex flex-col gap-2">
          {[
            { value: 'home', label: 'Home-based care' },
            { value: 'facility', label: 'Facility-based care' },
            { value: 'either', label: 'Either option works' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fcfcfa] hover:border-[#2185a1] hover:bg-[rgba(59,130,246,0.08)]">
              <input
                type="radio"
                name="care_preference"
                value={option.value}
                checked={formData.care_preference === option.value}
                onChange={(e) => handleInputChange('care_preference', e.target.value)}
                required
              />
              <span className="text-[14px] text-[#13323b]">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.care_preference && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.care_preference}</div>}
      </div>

      <div className="mb-6">
        <label htmlFor="insurance_coverage" className="block mb-3 font-medium text-[14px] text-[#13323b]">Insurance coverage</label>
        <select
          id="insurance_coverage"
          name="insurance_coverage"
          className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
          value={formData.insurance_coverage || ''}
          onChange={(e) => handleInputChange('insurance_coverage', e.target.value)}
          required
        >
          <option value="">Select insurance type</option>
          <option value="medicare">Medicare</option>
          <option value="private">Private insurance</option>
          <option value="medicaid">Medicaid</option>
          <option value="va">VA benefits</option>
          <option value="multiple">Multiple types</option>
          <option value="unsure">Unsure about coverage</option>
        </select>
        {errors.insurance_coverage && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.insurance_coverage}</div>}
      </div>

      <div className="mb-6">
        <label htmlFor="special_requests" className="block mb-3 font-medium text-[14px] text-[#13323b]">Any specific concerns or requests? (Optional)</label>
        <textarea
          id="special_requests"
          name="special_requests"
          className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
          rows="3"
          placeholder="Special medical needs, religious preferences, family considerations, etc."
          value={formData.special_requests || ''}
          onChange={(e) => handleInputChange('special_requests', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 mt-4 p-4 bg-[rgba(6,182,212,0.08)] rounded-lg text-[12px] text-[#62708d] border border-[rgba(94,82,64,0.12)]">
        <span className="text-[16px] shrink-0">🤝</span>
        <span>We'll connect you with 2-3 quality hospice agencies in Dallas that match your specific needs and preferences.</span>
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-medium text-[14px] text-[#13323b]" htmlFor="terms_consent">
          <input
            type="checkbox"
            id="terms_consent"
            name="terms_consent"
            checked={formData.terms_consent || false}
            onChange={(e) => handleInputChange('terms_consent', e.target.checked)}
            required
          />
          I agree to the <a href="#" onClick={openPrivacy}>Privacy Policy</a> and <a href="#" onClick={openTerms}>Terms of Service</a>.
        </label>
        {errors.terms_consent && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.terms_consent}</div>}
      </div>
      {pdfSrc && (
        <PdfModal src={pdfSrc} title={pdfTitle} onClose={closeModal} />
      )}
    </>
  )
}

export default FormStep4
