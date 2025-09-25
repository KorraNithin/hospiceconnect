import React from 'react'

const FormStep2 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  return (
    <>
      <div className="form-header">
        <h3>Current Care Situation</h3>
        <p className="form-subtitle">This helps us understand your family's specific needs</p>
        <div className="value-unlock">Receive educational resources and specialist consultation</div>
      </div>

      <div className="form-group">
        <label className="form-label">What is the current medical situation?</label>
        <div className="radio-group">
          {[
            { value: 'terminal', label: 'Terminal diagnosis with limited time' },
            { value: 'serious', label: 'Serious illness requiring comfort care' },
            { value: 'discharge', label: 'Hospital wants to discharge to hospice' },
            { value: 'planning', label: 'Planning ahead for future needs' }
          ].map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="medical_situation"
                value={option.value}
                checked={formData.medical_situation === option.value}
                onChange={(e) => handleInputChange('medical_situation', e.target.value)}
                required
              />
              <span className="radio-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.medical_situation && <div className="error-message">{errors.medical_situation}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Where is care currently being provided?</label>
        <div className="radio-group">
          {[
            { value: 'home', label: 'At home' },
            { value: 'hospital', label: 'In hospital' },
            { value: 'nursing', label: 'In nursing facility' },
            { value: 'other', label: 'Other medical facility' }
          ].map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="current_care_location"
                value={option.value}
                checked={formData.current_care_location === option.value}
                onChange={(e) => handleInputChange('current_care_location', e.target.value)}
                required
              />
              <span className="radio-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.current_care_location && <div className="error-message">{errors.current_care_location}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">How urgent is your need for hospice care?</label>
        <div className="radio-group">
          {[
            { value: 'immediate', label: 'Need care immediately' },
            { value: 'week', label: 'Within this week' },
            { value: 'month', label: 'Within this month' },
            { value: 'future', label: 'Planning ahead for future' }
          ].map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="urgency_level"
                value={option.value}
                checked={formData.urgency_level === option.value}
                onChange={(e) => handleInputChange('urgency_level', e.target.value)}
                required
              />
              <span className="radio-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.urgency_level && <div className="error-message">{errors.urgency_level}</div>}
      </div>
    </>
  )
}

export default FormStep2
