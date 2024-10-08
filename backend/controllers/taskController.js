// taskController.js
const Task = require("../models/Task");
const User = require("../models/User");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const task = await newTask.save();

    // Update each user's valueEarned
    await updateUserValues(task);

    // Add task to the project’s task array and update project value
    if (task.project) {
      await Project.findByIdAndUpdate(task.project, {
        $push: { tasks: task._id },
      });
      await updateProjectValue(task.project);
    }

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateUserValues = async (task) => {
  for (const collaborator of task.collaborators) {
    const user = await User.findOne({ email: collaborator });
    if (user) {
      user.valueEarned += task.value;
      await user.save();
    }
  }
};

const updateProjectValue = async (projectId) => {
  const project = await Project.findById(projectId).populate("tasks");
  project.value = project.tasks.reduce((total, task) => total + task.value, 0);
  await project.save();
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Update each collaborator's valueEarned
    await updateUserValues(task);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Deduct task value from project and collaborators
    if (task.project) {
      await Project.findByIdAndUpdate(task.project, {
        $inc: { value: -task.value },
        $pull: { tasks: taskId },
      });
    }
    await updateUserValues(task, true); // Pass true to deduct values
    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
