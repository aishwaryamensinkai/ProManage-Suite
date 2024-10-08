// taskRoutes.js
const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/tasks", protect, createTask);
router.get("/tasks", protect, getTasks);
router.get("/tasks/:id", protect, getTaskById);
router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

module.exports = router;
