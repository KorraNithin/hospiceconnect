# Hospice Backend

This is the backend server for the hospice form submission application.

## Setup

1. Install PostgreSQL and create a database named `hospice_db`
2. Update the `.env` file with your database credentials
3. Run `npm install` to install dependencies
4. Run the SQL script in `init.sql` to create the database table
5. Run `npm start` to start the server

## API Endpoints

- POST /api/submissions: Save a new form submission
- GET /api/admin/submissions: Get all submissions (for admin panel)
