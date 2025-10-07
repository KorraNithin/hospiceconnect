const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer');


require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://hospiceconnect-2.onrender.com', // frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],      // allowed HTTP methods
  credentials: true                               // if you need cookies
}))
app.use(express.json());

// Database connection
const pool = new Pool({
  
  // connectionString: process.env.DATABASE_URL,

  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Email transporter (Gmail via SMTP - recommend using an App Password)
let mailTransporter = null;
if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Verify SMTP connectivity on startup
  mailTransporter
    .verify()
    .then(() => {
      console.log('Gmail SMTP: ready to send emails as', process.env.GMAIL_USER);
    })
    .catch((err) => {
      console.error('Gmail SMTP verification failed:', err?.message || err);
      console.error('Hint: Ensure 2FA is ON and GMAIL_PASS is a Gmail App Password');
    });
}

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

    // Attempt to send email notification (non-blocking for DB success)
    let emailSent = false;
    let emailError = null;
    try {
      if (!mailTransporter) {
        throw new Error('Email transporter not configured. Set GMAIL_USER and GMAIL_PASS.');
      }

      const recipient = process.env.NOTIFY_EMAIL || process.env.RECIPIENT_EMAIL;
      if (!recipient) {
        throw new Error('No recipient configured. Set NOTIFY_EMAIL or RECIPIENT_EMAIL.');
      }

      const submissionId = result.rows[0].id;
      const subject = `New HospiceConnect submission #${submissionId}`;

      const plainText = [
        `New submission received (ID: ${submissionId})`,
        '',
        `Care recipient: ${care_recipient || '-'}`,
        `Main concern: ${main_concern || '-'}`,
        `Medical situation: ${medical_situation || '-'}`,
        `Current care location: ${current_care_location || '-'}`,
        `Urgency level: ${urgency_level || '-'}`,
        '',
        `First name: ${first_name || '-'}`,
        `Phone: ${phone || '-'}`,
        `Email: ${email || '-'}`,
        `Best time to call: ${best_time || '-'}`,
        '',
        `Care preference: ${care_preference || '-'}`,
        `Insurance coverage: ${insurance_coverage || '-'}`,
        `Special requests: ${special_requests || '-'}`,
        `Agreed to terms: ${terms_consent ? 'Yes' : 'No'}`,
      ].join('\n');

      const html = `
        <h2>New submission received (ID: ${submissionId})</h2>
        <h3>Situation</h3>
        <ul>
          <li><strong>Care recipient:</strong> ${care_recipient || '-'}</li>
          <li><strong>Main concern:</strong> ${main_concern || '-'}</li>
          <li><strong>Medical situation:</strong> ${medical_situation || '-'}</li>
          <li><strong>Current care location:</strong> ${current_care_location || '-'}</li>
          <li><strong>Urgency level:</strong> ${urgency_level || '-'}</li>
        </ul>
        <h3>Contact</h3>
        <ul>
          <li><strong>First name:</strong> ${first_name || '-'}</li>
          <li><strong>Phone:</strong> ${phone || '-'}</li>
          <li><strong>Email:</strong> ${email || '-'}</li>
          <li><strong>Best time to call:</strong> ${best_time || '-'}</li>
        </ul>
        <h3>Preferences</h3>
        <ul>
          <li><strong>Care preference:</strong> ${care_preference || '-'}</li>
          <li><strong>Insurance coverage:</strong> ${insurance_coverage || '-'}</li>
          <li><strong>Special requests:</strong> ${special_requests || '-'}</li>
          <li><strong>Agreed to terms:</strong> ${terms_consent ? 'Yes' : 'No'}</li>
        </ul>
      `;

      await mailTransporter.sendMail({
        from: process.env.GMAIL_FROM || process.env.GMAIL_USER,
        to: recipient,
        subject,
        text: plainText,
        html,
      });
      emailSent = true;
    } catch (mailErr) {
      emailError = mailErr?.message || String(mailErr);
      console.error('Error sending email notification:', mailErr);
    }

    res.status(201).json({
      message: 'Submission saved successfully',
      id: result.rows[0].id,
      emailSent,
      ...(emailError ? { emailError } : {}),
    });
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

// Debug endpoint to test email sending
app.get('/api/debug/email', async (req, res) => {
  try {
    if (!mailTransporter) {
      return res.status(400).json({ ok: false, error: 'Email transporter not configured. Set GMAIL_USER and GMAIL_PASS.' });
    }

    const recipient = process.env.NOTIFY_EMAIL || process.env.RECIPIENT_EMAIL;
    if (!recipient) {
      return res.status(400).json({ ok: false, error: 'No recipient configured. Set NOTIFY_EMAIL or RECIPIENT_EMAIL.' });
    }

    await mailTransporter.verify();
    await mailTransporter.sendMail({
      from: process.env.GMAIL_FROM || process.env.GMAIL_USER,
      to: recipient,
      subject: 'HospiceConnect debug email',
      text: 'This is a test email to verify SMTP configuration.'
    });

    res.json({ ok: true, message: 'Debug email sent successfully' });
  } catch (err) {
    console.error('Debug email error:', err);
    res.status(500).json({ ok: false, error: err?.message || String(err) });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
