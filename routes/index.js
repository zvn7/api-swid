const express = require("express");
const router = express.Router();

// Import semua sub-routes
const storyRoutes = require("./storyRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");

// Gunakan sub-routes
router.use("/stories", storyRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);

module.exports = router;
