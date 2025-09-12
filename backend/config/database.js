const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas cloud database or local MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/finance-tracker';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Please make sure MongoDB is running or use MongoDB Atlas');
    // Don't exit the process, just log the error
    // process.exit(1);
  }
};

module.exports = connectDB;


