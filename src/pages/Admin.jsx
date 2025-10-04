import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SubmissionsManager from '../components/SubmissionsManager'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem('adminToken', token)
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-[#62708d] text-[18px]">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fcfcfa]">
        <Header />
        <main className="py-12 flex items-center justify-center min-h-[60vh]">
          <div className="w-full mx-auto px-4 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
            <div className="bg-white p-12 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)] border border-[rgba(94,82,64,0.12)] w-full max-w-[400px] mx-auto">
              <h2 className="text-[#13323b] text-[24px] mb-8 text-center">Admin Login</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                // Simple demo login - in real app, this would call an API
                handleLogin('demo-token')
              }}>
                <div className="mb-6">
                  <label htmlFor="username" className="block mb-3 font-medium text-[14px] text-[#13323b]">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block mb-3 font-medium text-[14px] text-[#13323b]">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="block w-full px-4 py-3 border-2 border-[rgba(94,82,64,0.2)] rounded-lg text-[14px] text-[#13323b] bg-[#fcfcfa]"
                    required
                  />
                </div>
                <button type="submit" className="w-full px-6 py-4 bg-[#2185a1] text-white rounded-lg text-[16px] font-[550] transition-all duration-200 hover:bg-[#1a6b7d]">
                  Login
                </button>
              </form>
              <div className="text-center mt-8">
                <Link className="text-[#62708d] no-underline font-medium hover:text-[#2185a1]" to="/">← Back to Home</Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fcfcfa]">
      <Header />
      <main className="py-8">
        <div className="w-full mx-auto px-4">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[rgba(94,82,64,0.12)]">
            <h2 className="text-[#13323b] text-[28px] m-0">Submissions Dashboard</h2>
            <button
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-[14px] font-medium leading-[1.5] cursor-pointer transition-all duration-200 border-0 bg-[rgba(94,82,64,0.12)] text-[#13323b] hover:bg-[rgba(94,82,64,0.2)]"
              onClick={() => {
                localStorage.removeItem('adminToken')
                setIsAuthenticated(false)
              }}
            >
              Logout
            </button>
          </div>
          <SubmissionsManager />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Admin
