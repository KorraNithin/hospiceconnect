import React, { useState } from 'react'
import FormStep1 from './FormStep1'
import FormStep2 from './FormStep2'
import FormStep3 from './FormStep3'
import FormStep4 from './FormStep4'
import '../styles/HeroSection.css'

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
      if (!formData.phone) newErrors.phone = 'Phone number is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.best_time) newErrors.best_time = 'Please select best time to call'
    } else if (currentStep === 4) {
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
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">When Your Family Needs Hospice Care Guidance</h2>
            <p className="hero-subtitle">Get independent, expert support from licensed healthcare professionals—at no cost to your family.</p>

            <div className="value-points">
              <div className="value-point">
                <span className="value-icon">🏥</span>
                <span><strong>Expert Guidance:</strong> Receive unbiased advice from licensed healthcare professionals who understand your unique situation.</span>
              </div>
              <div className="value-point">
                <span className="value-icon">💰</span>
                <span><strong>Completely Free:</strong> Our support and resources are provided at no cost to you or your family.</span>
              </div>
              <div className="value-point">
                <span className="value-icon">🔒</span>
                <span><strong>Confidential & Secure:</strong> Your information is protected by HIPAA-compliant privacy standards.</span>
              </div>
              <div className="value-point">
                <span className="value-icon">📞</span>
                <span><strong>24/7 Support:</strong> Crisis support and compassionate help are available around the clock.</span>
              </div>
            </div>

            <div className="hospice-guide-callout">
              <strong>After you submit your request, we'll send you our comprehensive Hospice Family Guide to help you understand your options and next steps.</strong>
            </div>
          </div>

          <div className="form-section">
            <div className="form-container">
              <div className="form-progress">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`progress-step ${step < currentStep ? 'completed' : step === currentStep ? 'active' : ''}`}>
                      {step}
                    </div>
                    {step < 4 && <div className={`progress-line ${step < currentStep ? 'completed' : ''}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="guidance-form">
                {renderCurrentStep()}

                <button
                  type="submit"
                  className={`btn btn--primary btn--full-width form-submit-btn ${isLoading ? 'loading' : ''}`}
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
