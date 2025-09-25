const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// API endpoint to save form data
app.post('/api/submissions', async (req, res) => {
  try {
const {
  care_recipient, main_concern, medical_situation, current_care_location,
  urgency_level, first_name, phone, email, best_time,
  care_preference, insurance_coverage, special_requests, terms_consent
} = req.body;

const query = `
  INSERT INTO submissions (
    care_recipient, main_concern, medical_situation, current_care_location,
    urgency_level, first_name, phone, email, best_time,
    care_preference, insurance_coverage, special_requests, terms_consent
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING id
`;

const values = [
  care_recipient, main_concern, medical_situation, current_care_location,
  urgency_level, first_name, phone, email, best_time,
  care_preference, insurance_coverage, special_requests, terms_consent
];


    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Submission saved successfully', id: result.rows[0].id });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// API endpoint to get all submissions (for admin)
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const query = 'SELECT * FROM submissions ORDER BY submitted_at DESC';
    const result = await pool.query(query);
    res.json({ submissions: result.rows });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
