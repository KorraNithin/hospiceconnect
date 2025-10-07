import React, { useState } from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import TrustSection from '../components/TrustSection'
import Footer from '../components/Footer'
import SuccessModal from '../components/SuccessModal'

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  const handleFormSubmit = async (step, data) => {
    setIsLoading(true)

    // Collect form data
    const updatedFormData = { ...formData, ...data }
    setFormData(updatedFormData)

    if (step === 4) {
      try {
        // Send data to backend
        const response = await fetch(`${apiBaseUrl}/api/submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(updatedFormData)
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        // Show thank you modal after successful submission
        setShowModal(true)
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting your request. Please try again.')
      }
    } else {
      // Move to next step
      setCurrentStep(step + 1)
    }

    setIsLoading(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setCurrentStep(1)
    setFormData({})
  }

  return (
    <div className="min-h-screen bg-[#fcfcfa]">
      <Header />
      <HeroSection
        currentStep={currentStep}
        formData={formData}
        onFormSubmit={handleFormSubmit}
        isLoading={isLoading}
        setFormData={setFormData}
      />
      <TrustSection />
      <Footer />
      {showModal && <SuccessModal onClose={closeModal} formData={formData} />}
    </div>
  )
}

export default Home
