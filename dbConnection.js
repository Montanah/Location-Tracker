const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI for MongoDB
const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the database object
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Throw the error to handle it elsewhere
    }
}

module.exports = connectToMongoDB;
