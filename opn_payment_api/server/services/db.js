const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://tester:ZBmvfC6THKdwASOQ@cluster0.veggxzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  } 
  db = client.db('cloudnc_database');
  return db;
}

module.exports = connectToDatabase;
