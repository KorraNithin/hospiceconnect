import React from 'react'
import '../styles/SuccessModal.css'

const SuccessModal = ({ onClose, formData }) => {
  const getNextSteps = () => {
    const urgency = formData.urgency_level || 'week'

    switch (urgency) {
      case 'immediate':
        return {
          title: "Immediate Support Response",
          timeframe: "A licensed specialist will call within 2 hours to provide immediate support",
          steps: [
            "Crisis assessment and immediate comfort measures",
            "Direct connection to available hospice agencies",
            "Medicare coverage verification",
            "24/7 support line access for your family"
          ]
        }
      case 'week':
        return {
          title: "This Week Support Plan",
          timeframe: "A healthcare professional will call within 24 hours to discuss your options",
          steps: [
            "Comprehensive situation assessment",
            "Educational resources about hospice care",
            "Introduction to 2-3 matched agencies",
            "Follow-up consultation scheduling"
          ]
        }
      case 'month':
        return {
          title: "Monthly Planning Support",
          timeframe: "A specialist will call within 48 hours to provide guidance and resources",
          steps: [
            "Detailed planning consultation",
            "Medicare and insurance guidance",
            "Family preparation resources",
            "Ongoing support coordination"
          ]
        }
      case 'future':
        return {
          title: "Future Planning Resources",
          timeframe: "You'll receive educational materials by email and a call within 7 days",
          steps: [
            "Comprehensive planning guide delivery",
            "Educational webinar access",
            "Future consultation scheduling",
            "Resource library access"
          ]
        }
      default:
        return {
          title: "Support Plan",
          timeframe: "A healthcare professional will contact you soon",
          steps: [
            "Comprehensive situation assessment",
            "Educational resources about hospice care",
            "Introduction to matched agencies",
            "Follow-up consultation scheduling"
          ]
        }
    }
  }

  const nextSteps = getNextSteps()

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thank You for Reaching Out</h3>
        </div>
        <div className="modal-body">
          <div className="success-message">
            <p>We understand this is a difficult time, and we're here to help. Your request has been received.</p>
            <div className="next-steps">
              <h4>{nextSteps.title}</h4>
              <p className="timeframe">{nextSteps.timeframe}</p>
              <h5>What happens next:</h5>
              <ul>
                {nextSteps.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="contact-reminder">
              <h4>Need immediate support?</h4>
              <p>Call our 24/7 support line: <a href="tel:+12145552273" className="support-phone">(214) 555-CARE (2273)</a></p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn--secondary">Close</button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
