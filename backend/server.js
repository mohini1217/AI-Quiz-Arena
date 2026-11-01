require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { connectDB, getDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Quiz Arena backend is running!"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working correctly"
  });
});

// Signup API
app.post("/api/auth/signup", async (req, res) => {
  try {
    const db = getDB();

    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await db.collection("users").findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.collection("users").insertOne({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: {
        id: result.insertedId.toString(),
        name: name.trim(),
        email: normalizedEmail
      }
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to create account. Please try again."
    });
  }
});

// Login API
app.post("/api/auth/login", async (req, res) => {
  try {
    const db = getDB();

    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await db.collection("users").findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password."
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from .env");
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to log in. Please try again."
    });
  }
});

// Start server after connecting to MongoDB
async function startServer() {
  try {
    await connectDB();

    // Prevent duplicate accounts with the same normalized email.
    await getDB().collection("users").createIndex(
      { email: 1 },
      { unique: true }
    );

    app.listen(PORT, () => {
      console.log(
        `AI Quiz Arena backend running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
}

startServer();

