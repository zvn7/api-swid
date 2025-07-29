const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authenticate, UserController.getProfile);

module.exports = router;
