// Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added name field
  collaborators: [{ type: String }],
  status: { type: String, required: true },
  deadline: { type: Date },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  value: { type: Number, default: 0 },
});

module.exports = mongoose.model("Task", TaskSchema);
