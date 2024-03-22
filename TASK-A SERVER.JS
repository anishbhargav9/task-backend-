
const express = require('express');
const mongoose = require('mongoose');
const Trade = require('./trade');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://anishbhargav9challa:td48b8g7AyY9M5FS@cluster0.ebflp5j.mongodb.net/tradingDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Route to fetch price and volume data
app.get('/api/trades', async (req, res) => {
  try {
    // Fetch all trades from the database
    const trades = await Trade.find({}, { price: 1, volume: 1, _id: 0 }); 
    res.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'An error occurred while fetching trades' });
  }
});






// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
