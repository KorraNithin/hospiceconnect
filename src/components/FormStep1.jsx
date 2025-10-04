import React from 'react'

const FormStep1 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-[20px] text-[#13323b] mb-2">Tell Us About Your Situation</h3>
        <p className="text-[#62708d] mb-4 text-[14px]">Help us understand how we can best support your family</p>
        <div className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-5 py-3 rounded-full text-[12px] font-[550] border border-[rgba(34,197,94,0.3)] inline-block">Get personalized guidance from a licensed healthcare professional</div>
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-[550] text-[#13323b] text-[14px]">Who are you seeking hospice information for?</label>
        <div className="flex flex-col gap-2">
          {[
            { value: 'myself', label: 'Myself' },
            { value: 'spouse', label: 'My spouse/partner' },
            { value: 'parent', label: 'My parent' },
            { value: 'family', label: 'Other family member' },
            { value: 'friend', label: 'A friend' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fcfcfa] hover:border-[#2185a1] hover:bg-[rgba(59,130,246,0.08)]">
              <input
                type="radio"
                name="care_recipient"
                value={option.value}
                checked={formData.care_recipient === option.value}
                onChange={(e) => handleInputChange('care_recipient', e.target.value)}
                required
              />
              <span className="text-[14px] text-[#13323b]">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.care_recipient && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.care_recipient}</div>}
      </div>

      <div className="mb-6">
        <label htmlFor="main_concern" className="block mb-3 font-[550] text-[#13323b] text-[14px]">What's your main concern or question right now?</label>
        <textarea
          id="main_concern"
          name="main_concern"
          className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
          rows="4"
          placeholder="Please share what's on your mind. We're here to listen and help."
          value={formData.main_concern || ''}
          onChange={(e) => handleInputChange('main_concern', e.target.value)}
          required
        />
        {errors.main_concern && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.main_concern}</div>}
      </div>
    </>
  )
}

export default FormStep1
