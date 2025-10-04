import React from 'react'

const FormStep3 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }
const formatPhoneDisplay = (digits) => {
  const numbers = (digits || '').replace(/\D/g, '').slice(0, 10)
  const len = numbers.length
  if (len === 0) return ''

  const area = numbers.slice(0, Math.min(3, len))
  const next = len > 3 ? numbers.slice(3, Math.min(7, len)) : ''
  const last = len > 7 ? numbers.slice(7, Math.min(10, len)) : ''

  let formatted = `+1 (`
  formatted += area
  if (len >= 3) formatted += ')'
  if (len > 3) formatted += ` ${next}`
  if (len > 7) formatted += `-${last}`
  return formatted
}

const handlePhoneChange = (e) => {
  let onlyNumbers = e.target.value.replace(/\D/g, '')
  if (onlyNumbers.startsWith('1')) {
    onlyNumbers = onlyNumbers.slice(1)
  }
  if (onlyNumbers.length > 10) {
    onlyNumbers = onlyNumbers.slice(0, 10)
  }
  handleInputChange('phone', onlyNumbers)
}



  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-[20px] text-[#13323b] mb-2">Contact Information</h3>
        <p className="text-[#62708d] mb-4 text-[14px]">A licensed healthcare professional will contact you personally</p>
        <div className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-5 py-3 rounded-full text-[12px] font-[550] border border-[rgba(34,197,94,0.3)] inline-block">Schedule your free consultation with a hospice specialist</div>
      </div>

      <div className="mb-6">
        <label htmlFor="first_name" className="block mb-3 font-medium text-[14px] text-[#13323b]">First name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
          placeholder="What should we call you?"
          value={formData.first_name || ''}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
          required
        />
        {errors.first_name && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.first_name}</div>}
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block mb-3 font-medium text-[14px] text-[#13323b]">Best phone number to reach you</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
          placeholder="+1 (___) ____-___"
          value={formatPhoneDisplay(formData.phone || '')}
          onChange={handlePhoneChange}
          required
        />
        {errors.phone && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.phone}</div>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-3 font-medium text-[14px] text-[#13323b]">Email address (optional)</label>
        <input
          type="email"
          id="email"
          name="email"
          className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
          placeholder="your.email@example.com"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
        {errors.email && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.email}</div>}
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-medium text-[14px] text-[#13323b]">Best time for us to call</label>
        <div className="flex flex-col gap-2">
          {[
            { value: 'morning', label: 'Morning (8am-12pm)' },
            { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
            { value: 'evening', label: 'Evening (5pm-8pm)' },
            { value: 'anytime', label: 'Anytime' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fcfcfa] hover:border-[#2185a1] hover:bg-[rgba(59,130,246,0.08)]">
              <input
                type="radio"
                name="best_time"
                value={option.value}
                checked={formData.best_time === option.value}
                onChange={(e) => handleInputChange('best_time', e.target.value)}
                required
              />
              <span className="text-[14px] text-[#13323b]">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.best_time && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.best_time}</div>}
      </div>

      <div className="flex items-center gap-2 mt-4 p-4 bg-[rgba(6,182,212,0.08)] rounded-lg text-[12px] text-[#62708d] border border-[rgba(94,82,64,0.12)]">
        <span className="text-[16px] shrink-0">🔒</span>
        <span>Your information is protected by HIPAA and will only be used to provide hospice guidance.</span>
      </div>
    </>
  )
}

export default FormStep3
