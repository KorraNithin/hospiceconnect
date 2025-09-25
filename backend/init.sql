-- Create database
CREATE DATABASE hospice_db;

-- Connect to the database
\c hospice_db;

-- Create submissions table
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  form_data JSONB NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW()
);

-- Create index on submitted_at for faster queries
CREATE INDEX idx_submitted_at ON submissions(submitted_at);
