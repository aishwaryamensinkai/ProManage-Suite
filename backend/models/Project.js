// Project.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added name field
  // collaborators: [{ type: String }],
  status: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  value: { type: Number, default: 0 },
});

module.exports = mongoose.model("Project", ProjectSchema);
