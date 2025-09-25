import React, { useState, useEffect } from 'react'
import '../styles/SubmissionsManager.css'

const SubmissionsManager = () => {
  const [submissions, setSubmissions] = useState([])
  const [filteredSubmissions, setFilteredSubmissions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    search: '',
    urgency: '',
    dateRange: 'all',
    sortBy: 'date-desc'
  })
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  useEffect(() => {
    loadSubmissions()
  }, [])

  useEffect(() => {
    filterAndSortSubmissions()
  }, [submissions, filters])

  const loadSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/submissions')

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions || [])
      } else {
        console.error('Failed to load submissions:', response.statusText)
      }
    } catch (error) {
      console.error('Error loading submissions:', error)
    }
  }

  const filterAndSortSubmissions = () => {
    let filtered = [...submissions]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(sub =>
        sub.form_data.first_name?.toLowerCase().includes(searchTerm) ||
        sub.form_data.last_name?.toLowerCase().includes(searchTerm) ||
        sub.form_data.email?.toLowerCase().includes(searchTerm)
      )
    }

    // Apply urgency filter
    if (filters.urgency) {
      filtered = filtered.filter(sub =>
        sub.form_data.urgency_level === filters.urgency
      )
    }

    // Apply date filter
    const now = new Date()
    switch (filters.dateRange) {
      case 'today':
        filtered = filtered.filter(sub =>
          new Date(sub.submitted_at).toDateString() === now.toDateString()
        )
        break
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(sub =>
          new Date(sub.submitted_at) > weekAgo
        )
        break
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        filtered = filtered.filter(sub =>
          new Date(sub.submitted_at) > monthAgo
        )
        break
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.submitted_at) - new Date(b.submitted_at)
        case 'date-desc':
          return new Date(b.submitted_at) - new Date(a.submitted_at)
        case 'urgency':
          const urgencyOrder = { immediate: 1, week: 2, month: 3, future: 4 }
          return urgencyOrder[a.form_data.urgency_level] - urgencyOrder[b.form_data.urgency_level]
        default:
          return 0
      }
    })

    setFilteredSubmissions(filtered)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const getPaginatedSubmissions = () => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredSubmissions.slice(start, end)
  }

  const getTotalPages = () => {
    return Math.ceil(filteredSubmissions.length / itemsPerPage)
  }

  const getUrgencyColor = (urgency) => {
    const colors = {
      immediate: 'danger',
      week: 'warning',
      month: 'info',
      future: 'secondary'
    }
    return colors[urgency] || 'secondary'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="submissions-manager">
      <div className="filters-container">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search submissions..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Urgency Level</label>
            <select
              className="form-control"
              value={filters.urgency}
              onChange={(e) => handleFilterChange('urgency', e.target.value)}
            >
              <option value="">All</option>
              <option value="immediate">Immediate</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="future">Future</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Date Range</label>
            <select
              className="form-control"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Sort By</label>
            <select
              className="form-control"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="urgency">Urgency Level</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row" id="submissionsContainer">
        {getPaginatedSubmissions().map((submission) => (
          <div key={submission.id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="card submission-card h-100"
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title mb-0">
                    {submission.form_data.first_name} {submission.form_data.last_name}
                  </h5>
                  <span className={`badge bg-${getUrgencyColor(submission.form_data.urgency_level)}`}>
                    {submission.form_data.urgency_level}
                  </span>
                </div>
                <p className="card-text">
                  <i className="bi bi-envelope"></i> {submission.form_data.email}<br />
                  <i className="bi bi-telephone"></i> {submission.form_data.phone}<br />
                  <small className="text-muted">
                    <i className="bi bi-clock"></i>
                    {formatDate(submission.submitted_at)}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getTotalPages() > 1 && (
        <div className="row mt-4">
          <div className="col">
            <nav aria-label="Submissions pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: getTotalPages() }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === getTotalPages() ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === getTotalPages()}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {selectedSubmission && (
        <div className="modal">
          <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Submission Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setSelectedSubmission(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Contact Information</h6>
                    <p>
                      Name: {selectedSubmission.form_data.first_name} {selectedSubmission.form_data.last_name}<br />
                      Email: {selectedSubmission.form_data.email}<br />
                      Phone: {selectedSubmission.form_data.phone}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Care Details</h6>
                    <p>
                      Urgency: {selectedSubmission.form_data.urgency_level}<br />
                      Best Time: {selectedSubmission.form_data.best_time || 'Not specified'}<br />
                      Submitted: {formatDate(selectedSubmission.submitted_at)}
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <h6>Additional Information</h6>
                    <pre className="bg-light p-3 rounded">
                      {JSON.stringify(selectedSubmission.form_data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmissionsManager
