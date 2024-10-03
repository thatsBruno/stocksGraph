const express = require('express');
const router = express.Router();
const client = require('../db/dbconn'); 

router.get('/stocks', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM stocks');
    if (result.rows.length === 0) {
      return res.status(404).send('Stock not found'); 
    }
    res.json(result.rows); 
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database query failed'); 
  }
});

router.get('/stocks/ticker/:ticker', async (req, res) => {
  const ticker = req.params.ticker; 
  try {
    const result = await client.query('SELECT * FROM stocks WHERE ticker = $1', [ticker]);
    if (result.rows.length === 0) {
      return res.status(404).send('Stock not found');
    }
    res.json(result.rows[0]); 
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database query failed'); 
  }
});


module.exports = router;
