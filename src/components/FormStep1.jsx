import React from 'react'

const FormStep1 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  return (
    <>
      <div className="form-header">
        <h3>Tell Us About Your Situation</h3>
        <p className="form-subtitle">Help us understand how we can best support your family</p>
        <div className="value-unlock">Get personalized guidance from a licensed healthcare professional</div>
      </div>

      <div className="form-group">
        <label className="form-label">Who are you seeking hospice information for?</label>
        <div className="radio-group">
          {[
            { value: 'myself', label: 'Myself' },
            { value: 'spouse', label: 'My spouse/partner' },
            { value: 'parent', label: 'My parent' },
            { value: 'family', label: 'Other family member' },
            { value: 'friend', label: 'A friend' }
          ].map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="care_recipient"
                value={option.value}
                checked={formData.care_recipient === option.value}
                onChange={(e) => handleInputChange('care_recipient', e.target.value)}
                required
              />
              <span className="radio-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.care_recipient && <div className="error-message">{errors.care_recipient}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="main_concern" className="form-label">What's your main concern or question right now?</label>
        <textarea
          id="main_concern"
          name="main_concern"
          className="form-control"
          rows="4"
          placeholder="Please share what's on your mind. We're here to listen and help."
          value={formData.main_concern || ''}
          onChange={(e) => handleInputChange('main_concern', e.target.value)}
          required
        />
        {errors.main_concern && <div className="error-message">{errors.main_concern}</div>}
      </div>
    </>
  )
}

export default FormStep1
