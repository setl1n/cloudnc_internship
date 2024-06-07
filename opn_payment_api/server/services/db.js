require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;