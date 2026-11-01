const dns = require("dns");

// Use Google DNS for Node.js DNS lookups
dns.setServers(["8.8.8.8"]);

const { MongoClient } = require("mongodb");

let db;
let client;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Please check your .env file."
    );
  }

  console.log("Connecting to MongoDB...");

  try {
    client = new MongoClient(uri);

    await client.connect();

    db = client.db("ai_quiz_arena");

    // Verify that the database connection is working
    await db.command({ ping: 1 });

    console.log("MongoDB connected successfully!");

    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    throw error;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database is not connected.");
  }

  return db;
}

module.exports = {
  connectDB,
  getDB
};