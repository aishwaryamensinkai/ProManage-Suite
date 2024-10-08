const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

exports.generateReport = async (req, res) => {
  try {
    const projects = await Project.find().populate("tasks");

    const report = await Promise.all(
      projects.map(async (project) => {
        // Fetch all collaborator names and calculate task values for each task in the project
        const tasksWithCollaborators = await Promise.all(
          project.tasks.map(async (taskId) => {
            const task = await Task.findById(taskId).populate("collaborators");

            // Map collaborators to their names
            const collaboratorNames = await Promise.all(
              task.collaborators.map(async (collaboratorId) => {
                const collaborator = await User.findById(collaboratorId);
                return collaborator ? collaborator.name : "Unknown";
              })
            );

            return {
              name: task.name,
              collaborators: collaboratorNames,
              value: task.value || 0, // Ensure task value defaults to 0 if not defined
            };
          })
        );

        // Calculate the total project value by summing task values
        const totalValue = tasksWithCollaborators.reduce(
          (sum, task) => sum + task.value,
          0
        );

        return {
          projectName: project.name,
          totalValue,
          tasks: tasksWithCollaborators.map((task) => task.name),
          collaborators: tasksWithCollaborators.flatMap(
            (task) => task.collaborators
          ),
        };
      })
    );

    res.json({ report });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
