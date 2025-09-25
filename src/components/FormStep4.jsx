import React from 'react'

const FormStep4 = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value)
  }

  return (
    <>
      <div className="form-header">
        <h3>Care Preferences & Coverage</h3>
        <p className="form-subtitle">Final details to help us match you with the right hospice agencies</p>
        <div className="value-unlock">Connect with 2-3 quality agencies that match your specific needs</div>
      </div>

      <div className="form-group">
        <label className="form-label">Preferred type of hospice care</label>
        <div className="radio-group">
          {[
            { value: 'home', label: 'Home-based care' },
            { value: 'facility', label: 'Facility-based care' },
            { value: 'either', label: 'Either option works' }
          ].map((option) => (
            <label key={option.value} className="radio-option">
              <input
                type="radio"
                name="care_preference"
                value={option.value}
                checked={formData.care_preference === option.value}
                onChange={(e) => handleInputChange('care_preference', e.target.value)}
                required
              />
              <span className="radio-text">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.care_preference && <div className="error-message">{errors.care_preference}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="insurance_coverage" className="form-label">Insurance coverage</label>
        <select
          id="insurance_coverage"
          name="insurance_coverage"
          className="form-control"
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
        {errors.insurance_coverage && <div className="error-message">{errors.insurance_coverage}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="special_requests" className="form-label">Any specific concerns or requests? (Optional)</label>
        <textarea
          id="special_requests"
          name="special_requests"
          className="form-control"
          rows="3"
          placeholder="Special medical needs, religious preferences, family considerations, etc."
          value={formData.special_requests || ''}
          onChange={(e) => handleInputChange('special_requests', e.target.value)}
        />
      </div>

      <div className="transparency-note">
        <span className="transparency-icon">🤝</span>
        <span>We'll connect you with 2-3 quality hospice agencies in Dallas that match your specific needs and preferences.</span>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="terms_consent">
          <input
            type="checkbox"
            id="terms_consent"
            name="terms_consent"
            checked={formData.terms_consent || false}
            onChange={(e) => handleInputChange('terms_consent', e.target.checked)}
            required
          />
          I agree to the <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/terms" target="_blank">Terms of Service</a>.
        </label>
        {errors.terms_consent && <div className="error-message">{errors.terms_consent}</div>}
      </div>
    </>
  )
}

export default FormStep4
