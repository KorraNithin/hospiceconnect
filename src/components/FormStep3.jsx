import React from 'react'

const FormStep3 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '')
    if (phoneNumber.length >= 6) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    } else if (phoneNumber.length >= 3) {
      return phoneNumber.replace(/(\d{3})(\d{0,3})/, '($1) $2')
    }
    return phoneNumber
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    handleInputChange('phone', formatted)
  }

  return (
    <>
      <div className="form-header">
        <h3>Contact Information</h3>
        <p className="form-subtitle">A licensed healthcare professional will contact you personally</p>
        <div className="value-unlock">Schedule your free consultation with a hospice specialist</div>
      </div>

      <div className="form-group">
        <label htmlFor="first_name" className="form-label">First name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          className="form-control"
          placeholder="What should we call you?"
          value={formData.first_name || ''}
          onChange={(e) => handleInputChange('first_name', e.target.value)}
          required
        />
        {errors.first_name && <div className="error-message">{errors.first_name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="form-label">Best phone number to reach you</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="form-control"
          placeholder="(214) 555-0123"
          value={formData.phone || ''}
          onChange={handlePhoneChange}
          required
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email address (optional)</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="your.email@example.com"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Best time for us to call</label>
        <div className="radio-group">
          {[
            { value: 'morning', label: 'Morning (8am-12pm)' },
            { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
            { value: 'evening', label: 'Evening (5pm-8pm)' },
            { value: 'anytime', label: 'Anytime' }
          ].map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="best_time"
                value={option.value}
                checked={formData.best_time === option.value}
                onChange={(e) => handleInputChange('best_time', e.target.value)}
                required
              />
              <span className="radio-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.best_time && <div className="error-message">{errors.best_time}</div>}
      </div>

      <div className="privacy-notice">
        <span className="privacy-icon">🔒</span>
        <span>Your information is protected by HIPAA and will only be used to provide hospice guidance.</span>
      </div>
    </>
  )
}

export default FormStep3
