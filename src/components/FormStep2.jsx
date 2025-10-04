import React from 'react'

const FormStep2 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-[20px] text-[#13323b] mb-2">Current Care Situation</h3>
        <p className="text-[#62708d] mb-4 text-[14px]">This helps us understand your family's specific needs</p>
        <div className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-5 py-3 rounded-full text-[12px] font-[550] border border-[rgba(34,197,94,0.3)] inline-block">Receive educational resources and specialist consultation</div>
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-[550] text-[#13323b] text-[14px]">What is the current medical situation?</label>
        <div className="flex flex-col gap-2">
          {[
            { value: 'terminal', label: 'Terminal diagnosis with limited time' },
            { value: 'serious', label: 'Serious illness requiring comfort care' },
            { value: 'discharge', label: 'Hospital wants to discharge to hospice' },
            { value: 'planning', label: 'Planning ahead for future needs' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fcfcfa] hover:border-[#2185a1] hover:bg-[rgba(59,130,246,0.08)]">
              <input
                type="radio"
                name="medical_situation"
                value={option.value}
                checked={formData.medical_situation === option.value}
                onChange={(e) => handleInputChange('medical_situation', e.target.value)}
                required
              />
              <span className="text-[14px] text-[#13323b]">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.medical_situation && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.medical_situation}</div>}
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-[550] text-[#13323b] text-[14px]">Where is care currently being provided?</label>
        <div className="flex flex-col gap-2">
          {[
            { value: 'home', label: 'At home' },
            { value: 'hospital', label: 'In hospital' },
            { value: 'nursing', label: 'In nursing facility' },
            { value: 'other', label: 'Other medical facility' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fcfcfa] hover:border-[#2185a1] hover:bg-[rgba(59,130,246,0.08)]">
              <input
                type="radio"
                name="current_care_location"
                value={option.value}
                checked={formData.current_care_location === option.value}
                onChange={(e) => handleInputChange('current_care_location', e.target.value)}
                required
              />
              <span className="text-[14px] text-[#13323b]">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.current_care_location && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.current_care_location}</div>}
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-[550] text-[#13323b] text-[14px]">How urgent is your need for hospice care?</label>
        <div className="flex flex-col gap-2">
          {[
            { value: 'immediate', label: 'Need care immediately' },
            { value: 'week', label: 'Within this week' },
            { value: 'month', label: 'Within this month' },
            { value: 'future', label: 'Planning ahead for future' }
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg cursor-pointer transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fcfcfa] hover:border-[#2185a1] hover:bg-[rgba(59,130,246,0.08)]">
              <input
                type="radio"
                name="urgency_level"
                value={option.value}
                checked={formData.urgency_level === option.value}
                onChange={(e) => handleInputChange('urgency_level', e.target.value)}
                required
              />
              <span className="text-[14px] text-[#13323b]">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.urgency_level && <div className="text-[#dc2626] text-[12px] mt-1 flex items-center gap-1">{errors.urgency_level}</div>}
      </div>
    </>
  )
}

export default FormStep2
