require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
// MongoDB Atlas connection with correct cluster URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kennmhenardpulvera:kennkenn@cluster0.f9057rn.mongodb.net/lance-yuri-kids?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Create default test user
  const { createDefaultUser } = require('./features/users/userController');
  createDefaultUser();
})
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/bookings', require('./features/bookings/bookings.routes'));
app.use('/api/users', require('./features/users/userRoutes'));
app.use('/api/admin', require('./features/admin/admin.routes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 