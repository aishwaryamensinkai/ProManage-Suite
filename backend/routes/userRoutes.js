// userRoutes.js
const express = require("express");
const {
  register,
  login,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", protect, getUsers);
router.get("/users/:id", protect, getUserById);

module.exports = router;
