require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const app = express();
const cors = require('cors');
const stockRoutes = require('./routes/stocksRoute'); // Import the routes

// Create an instance of Express
const port = process.env.PORT || 3000;
app.use(require("./routes/stocksRoute"));
app.use(express.json());
app.use('/api', stockRoutes);


app.use(cors());

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
