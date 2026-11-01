
const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get available quiz categories
router.get("/categories", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Quiz categories fetched successfully.",
    categories: [
      { id: "python", name: "Python" },
      { id: "javascript", name: "JavaScript" },
      { id: "ai", name: "Artificial Intelligence" },
      { id: "general", name: "General Knowledge" },
    ],
  });
});

module.exports = router;

