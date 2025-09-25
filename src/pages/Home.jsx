import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import TrustSection from '../components/TrustSection'
import Footer from '../components/Footer'
import SuccessModal from '../components/SuccessModal'
import '../styles/Home.css'

const Home = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (step, data) => {
    setIsLoading(true)

    // Collect form data
    const updatedFormData = { ...formData, ...data }
    setFormData(updatedFormData)

    if (step === 4) {
      // Send data to backend
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        })

        if (response.ok) {
          setShowModal(true)
        } else {
          alert('Error submitting form. Please try again.')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error submitting form. Please try again.')
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
    <div className="home">
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
