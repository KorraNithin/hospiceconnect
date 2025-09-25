import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SubmissionsManager from '../components/SubmissionsManager'
import '../styles/Admin.css'

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
    return <div className="loading">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <Header />
        <main className="admin-login-content">
          <div className="container">
            <div className="login-form">
              <h2>Admin Login</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                // Simple demo login - in real app, this would call an API
                handleLogin('demo-token')
              }}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--full-width">
                  Login
                </button>
              </form>
              <div className="back-link">
                <Link to="/">← Back to Home</Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="admin">
      <Header />
      <main className="admin-content">
        <div className="container-fluid">
          <div className="admin-header">
            <h2>Submissions Dashboard</h2>
            <button
              className="btn btn--secondary"
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


