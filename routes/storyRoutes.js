const express = require("express");
const router = express.Router();

// Pastikan import-nya sesuai dengan export di controller
const { createStory, getStories, updateStatus } = require("../controllers/storyController");

// Pastikan middleware ini ada dan benar isinya
const authenticate = require("../middlewares/authMiddleware");

// Route publik (misalnya lihat semua cerita)
router.get("/", getStories);

// Route yang butuh autentikasi
router.post("/", authenticate, createStory);
router.patch("/:id/status", authenticate, updateStatus);

module.exports = router;
