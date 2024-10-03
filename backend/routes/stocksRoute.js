const express = require('express');
const router = express.Router();
const client = require('../db/dbconn'); // Import the database client

router.get('/stocks', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM stocks');
    if (result.rows.length === 0) {
      return res.status(404).send('Stock not found'); // Handle case where stock doesn't exist
    }
    res.json(result.rows); // Return the stock data
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database query failed'); // Handle database errors
  }
});

router.get('/stocks/ticker/:ticker', async (req, res) => {
  const ticker = req.params.ticker; // Get the ticker from the request parameters
  try {
    const result = await client.query('SELECT * FROM stocks WHERE ticker = $1', [ticker]);
    if (result.rows.length === 0) {
      return res.status(404).send('Stock not found'); // Handle case where stock doesn't exist
    }
    res.json(result.rows[0]); // Return the stock data
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database query failed'); // Handle database errors
  }
});


module.exports = router;
