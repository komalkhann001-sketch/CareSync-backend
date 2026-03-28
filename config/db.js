const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('MONGO_URI is missing in environment variables!');
      return;
    }

    console.log('Attempting to connect to MongoDB Atlas...');
    
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds instead of 30
      connectTimeoutMS: 10000,
    });

    isConnected = db.connections[0].readyState;
    console.log(`\x1B[32mMongoDB Connected: ${db.connection.host}\x1B[m`);
  } catch (error) {
    console.error(`\x1B[31mError connecting to MongoDB: ${error.message}\x1B[m`);
    // On serverless, we might want to throw the error so the function fails fast
    throw error;
  }
};

module.exports = connectDB;

