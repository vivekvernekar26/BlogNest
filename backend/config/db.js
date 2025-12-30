const mongoose = require('mongoose');
const { MONGODB_URI, NODE_ENV } = require('./config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      // options can be provided if needed
    });
    if (NODE_ENV !== 'test') {
      console.log(`MongoDB connected: ${conn.connection.host}`);
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

