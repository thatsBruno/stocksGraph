const { Client } = require('pg'); // Import the PostgreSQL client
require('dotenv').config();       // Load environment variables

// Define and export the PostgreSQL client
const client = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

// Connect the client
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
