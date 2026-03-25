const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in environment variables');
      return;
    }
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\x1B[32mMongoDB Connected: ${conn.connection.host}\x1B[m`);
  } catch (error) {
    console.error(`\x1B[31mError connecting to MongoDB: ${error.message}\x1B[m`);
  }
};

module.exports = connectDB;
