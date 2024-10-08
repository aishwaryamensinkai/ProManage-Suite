// projectController.js
const Project = require("../models/Project");
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");
    project.value = project.tasks.reduce(
      (total, task) => total + task.value,
      0
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Delete associated tasks
    await Task.deleteMany({ project: projectId });

    // Delete the project
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project and associated tasks deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
