import React, { useState } from 'react'
import FormStep1 from './FormStep1'
import FormStep2 from './FormStep2'
import FormStep3 from './FormStep3'
import FormStep4 from './FormStep4'




const HeroSection = ({ currentStep, formData, onFormSubmit, isLoading, setFormData }) => {
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    const newErrors = {}
    if (currentStep === 1) {
      if (!formData.care_recipient) newErrors.care_recipient = 'Please select who you are seeking information for'
      if (!formData.main_concern) newErrors.main_concern = 'Please share your main concern'
    } else if (currentStep === 2) {
      if (!formData.medical_situation) newErrors.medical_situation = 'Please select the current medical situation'
      if (!formData.current_care_location) newErrors.current_care_location = 'Please select care location'
      if (!formData.urgency_level) newErrors.urgency_level = 'Please select urgency level'
    } else if (currentStep === 3) {
  if (!formData.first_name) newErrors.first_name = 'First name is required'
  
  if (!formData.phone) {
    newErrors.phone = 'Phone number is required'
  } else if (formData.phone.length < 10) {
    newErrors.phone = 'Phone number must be 10 digits'
  }

  if (!formData.email) newErrors.email = 'Email is required'
  if (!formData.best_time) newErrors.best_time = 'Please select best time to call'
}
 else if (currentStep === 4) {
      if (!formData.care_preference) newErrors.care_preference = 'Please select care preference'
      if (!formData.insurance_coverage) newErrors.insurance_coverage = 'Please select insurance coverage'
      if (!formData.terms_consent) newErrors.terms_consent = 'Please agree to terms and conditions'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onFormSubmit(currentStep, formData)
    }
  }

  const updateFormData = (field, value) => {
    // Update form data
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 formData={formData} updateFormData={updateFormData} errors={errors} />
      case 2:
        return <FormStep2 formData={formData} updateFormData={updateFormData} errors={errors} />
      case 3:
        return <FormStep3 formData={formData} updateFormData={updateFormData} errors={errors} />
      case 4:
        return <FormStep4 formData={formData} updateFormData={updateFormData} errors={errors} />
      default:
        return <FormStep1 formData={formData} updateFormData={updateFormData} errors={errors} />
    }
  }

  return (
    <section className="bg-[rgba(59,130,246,0.08)] py-8 min-h-[600px]">
      <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:'32px', alignItems:'start'}}>
          <div className="hero-text">
            <h2 className="text-[30px] font-semibold text-[#13323b] mb-4 leading-[1.2]">When Your Family Needs Hospice Care Guidance</h2>
            <p className="text-[18px] text-[#62708d] mb-8 leading-[1.5]">Get independent, expert support from licensed healthcare professionals—at no cost to your family.</p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[rgba(94,82,64,0.12)] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[20px] shrink-0">🏥</span>
                <span><strong>Expert Guidance:</strong> Receive unbiased advice from licensed healthcare professionals who understand your unique situation.</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[rgba(94,82,64,0.12)] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[20px] shrink-0">💰</span>
                <span><strong>Completely Free:</strong> Our support and resources are provided at no cost to you or your family.</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[rgba(94,82,64,0.12)] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[20px] shrink-0">🔒</span>
                <span><strong>Confidential & Secure:</strong> Your information is protected by HIPAA-compliant privacy standards.</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[rgba(94,82,64,0.12)] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[20px] shrink-0">📞</span>
                <span><strong>24/7 Support:</strong> Crisis support and compassionate help are available around the clock.</span>
              </div>
            </div>

            <div className="bg-[rgba(34,197,94,0.08)] text-[#22c55e] px-5 py-3 rounded-full text-[12px] font-[550] border border-[rgba(34,197,94,0.3)] inline-block mt-4">
              <strong>After you submit your request, we'll send you our comprehensive Hospice Family Guide to help you understand your options and next steps.</strong>
            </div>
          </div>

          <div className="sticky top-6">
            <div className="bg-white rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),_0_4px_6px_-2px_rgba(0,0,0,0.02)] border border-[rgba(94,82,64,0.12)] overflow-hidden">
              <div className="flex items-center justify-center py-5 px-6 bg-[rgba(6,182,212,0.08)] border-b border-[rgba(94,82,64,0.12)]">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[12px] transition-all duration-200 ${step < currentStep ? 'bg-[#22c55e] text-white' : step === currentStep ? 'bg-[#2185a1] text-white' : 'bg-[rgba(94,82,64,0.12)] text-[#62708d]'}`}>
                      {step}
                    </div>
                    {step < 4 && <div className={`${step < currentStep ? 'bg-[#22c55e]' : 'bg-[rgba(94,82,64,0.2)]'} w-10 h-[2px] transition-all duration-200`}></div>}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-8">
                {renderCurrentStep()}

                <button
                  type="submit"
                  className={`w-full px-6 py-4 bg-[#2185a1] text-white border-0 rounded-lg text-[16px] font-[550] cursor-pointer transition-all duration-200 relative ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1a6b7d] hover:-translate-y-[1px] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04),_0_2px_4px_-1px_rgba(0,0,0,0.02)]'}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : getSubmitButtonText()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  function getSubmitButtonText() {
    switch (currentStep) {
      case 1: return 'Next: Care Situation'
      case 2: return 'Next: Contact Information'
      case 3: return 'Next: Care Preferences'
      case 4: return 'Submit Request'
      default: return 'Continue'
    }
  }
}

export default HeroSection
