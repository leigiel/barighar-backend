// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is alive and kicking!' });
});

const PORT = 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
const listingsRoutes = require('./routes/listingsRoutes');
app.use('/api/listings', listingsRoutes);
require('dotenv').config();
const connectDB = require('./config/db');
console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI);

connectDB();
