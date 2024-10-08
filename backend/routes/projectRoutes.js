// projectRoutes.js
const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/projects", protect, createProject);
router.get("/projects", protect, getProjects);
router.get("/projects/:id", protect, getProjectById);
router.put("/projects/:id", protect, updateProject);
router.delete("/projects/:id", protect, deleteProject);

module.exports = router;
