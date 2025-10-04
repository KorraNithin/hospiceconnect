import React from 'react'

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
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-[rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_10px_10px_-5px_rgba(0,0,0,0.04)] max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto z-[1001]">
        <div className="pt-6 px-6 pb-0 text-center">
          <h3 className="text-[#13323b] text-[24px] mb-4">Thank You for Reaching Out</h3>
        </div>
        <div className="p-6">
          <div>
            <p className="text-[#62708d] leading-[1.6] mb-6 text-center">We understand this is a difficult time, and we're here to help. Your request has been received.</p>
            <div className="bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.3)] rounded-lg p-5 mb-6">
              <h4 className="text-[#22c55e] text-[16px] mb-2 font-semibold">{nextSteps.title}</h4>
              <p className="bg-[rgba(34,197,94,0.12)] text-[#22c55e] px-4 py-2 rounded-full text-[12px] font-[550] mb-4 inline-block">{nextSteps.timeframe}</p>
              <h5 className="text-[#13323b] text-[14px] mb-3 font-[550]">What happens next:</h5>
              <ul className="list-none p-0 m-0">
                {nextSteps.steps.map((step, index) => (
                  <li key={index} className="relative pl-5 mb-2 text-[#62708d] leading-[1.5] text-[14px]">
                    <span className="absolute left-0 text-[#22c55e] font-bold">✓</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.3)] rounded-lg p-4 text-center">
              <h4 className="text-[#3b82f6] text-[14px] mb-2 font-[550]">Need immediate support?</h4>
              <p className="text-[#62708d] m-0 text-[14px]">Call our 24/7 support line: <a href="tel:+12145552273" className="text-[#3b82f6] font-semibold no-underline hover:text-[#2563eb]">(214) 555-CARE (2273)</a></p>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 pt-0 text-center">
          <button onClick={onClose} className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-[14px] font-medium leading-[1.5] cursor-pointer transition-all duration-200 no-underline relative border-0 bg-[rgba(94,82,64,0.12)] text-[#13323b] hover:bg-[rgba(94,82,64,0.2)]">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
