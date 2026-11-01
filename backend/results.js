const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Verify login token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Please log in to continue.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired login session.",
    });
  }
}

// Save quiz result
router.post("/", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;

    if (!db) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected.",
      });
    }

    const {
      id,
      categoryId,
      categoryName,
      score,
      totalQuestions,
      date,
      answers,
    } = req.body;

    if (
      !categoryId ||
      !Number.isInteger(score) ||
      !Number.isInteger(totalQuestions) ||
      totalQuestions <= 0 ||
      score < 0 ||
      score > totalQuestions ||
      !Array.isArray(answers) ||
      answers.length !== totalQuestions
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid quiz result data.",
      });
    }

    const attemptId = String(id || "");
    const collection = db.collection("quiz_results");

    // Prevent duplicate attempts
    if (attemptId) {
      const existing = await collection.findOne({
        userId: req.user.id,
        attemptId,
      });

      if (existing) {
        return res.json({
          success: true,
          message: "This quiz result is already saved.",
          resultId: existing._id.toString(),
        });
      }
    }

    const parsedDate = date ? new Date(date) : new Date();

    const resultDocument = {
      attemptId,
      userId: req.user.id,
      categoryId,
      categoryName: categoryName || "General",
      score,
      totalQuestions,
      percentage: Math.round(
        (score / totalQuestions) * 100
      ),
      date: Number.isNaN(parsedDate.getTime())
        ? new Date()
        : parsedDate,
      answers,
      createdAt: new Date(),
    };

    const saved = await collection.insertOne(resultDocument);

    return res.status(201).json({
      success: true,
      message: "Quiz result saved successfully!",
      resultId: saved.insertedId.toString(),
    });
  } catch (error) {
    console.error("Save quiz result error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save quiz result.",
    });
  }
});

// Get logged-in user's quiz history
router.get("/history", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;

    if (!db) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected.",
      });
    }

    const results = await db
      .collection("quiz_results")
      .find({
        userId: req.user.id,
      })
      .sort({ date: -1 })
      .limit(100)
      .toArray();

    return res.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error("Fetch quiz history error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch quiz history.",
    });
  }
});

module.exports = router;