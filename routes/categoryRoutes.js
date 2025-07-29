const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", categoryController.getCategories);
router.post("/", authenticate, categoryController.createCategory);

module.exports = router;
