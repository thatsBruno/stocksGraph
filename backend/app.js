require('dotenv').config(); 
const express = require('express');
const app = express();
const cors = require('cors');
const stockRoutes = require('./routes/stocksRoute'); 

const port = process.env.PORT || 3001;
app.use(cors());
app.use(require("./routes/stocksRoute"));
app.use(express.json());
app.use('/api', stockRoutes);


// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
