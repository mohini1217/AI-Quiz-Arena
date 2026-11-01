
// DNS configuration
require("dns").setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

const authRoutes = require("./auth");
const resultRoutes = require("./results");
const quizRoutes = require("./routes/quiz");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/quiz", quizRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("AI Quiz Arena backend is running!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Quiz Arena backend is running!",
  });
});

let client;

// Connect to MongoDB Atlas
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is missing. Check backend/.env"
    );
  }

  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is missing. Check backend/.env"
    );
  }

  client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 20000,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
  });

  console.log("Connecting to MongoDB Atlas...");

  await client.connect();

  const db = client.db("ai_quiz_arena");

  await db.command({ ping: 1 });

  app.locals.db = db;

  console.log("MongoDB connected successfully!");
}

// Start backend
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `AI Quiz Arena backend running at http://localhost:${PORT}`
      );

      console.log(
        `Health check: http://localhost:${PORT}/api/health`
      );
    });
  } catch (error) {
    console.error("\n========== BACKEND STARTUP ERROR ==========");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code || "Not provided");

    if (error.cause) {
      console.error("Underlying cause:", error.cause);
    }

    console.error("Full error details:");
    console.error(error.stack);
    console.error("============================================\n");

    if (client) {
      await client.close().catch(() => {});
    }

    process.exitCode = 1;
  }
}

// Handle unexpected errors
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

startServer();

