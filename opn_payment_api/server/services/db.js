const mongoose = require('mongoose');

const uri = 'mongodb+srv://tester:ZBmvfC6THKdwASOQ@cluster0.veggxzx.mongodb.net/cloudnc_database?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;