require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // adjust path if needed

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON request body

// Routes
app.use('/api/auth', authRoutes); // Mount the auth routes

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.log('Unhandled rejection:', error);
});
