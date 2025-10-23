const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use MongoDB Atlas from Render environment variable
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('❌ MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;



