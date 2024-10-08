import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const { id: taskId } = useParams(); // Retrieve taskId from URL params
  const [task, setTask] = useState({
    name: "",
    status: "",
    deadline: "",
    collaborators: [],
    project: "",
    value: 0, // Add value field here
  });
  const [collaborators, setCollaborators] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch collaborators and projects
    const fetchData = async () => {
      try {
        const [usersResponse, projectsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        setCollaborators(usersResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching users or projects:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (taskId) {
      // Fetch task details if editing
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setTask(response.data))
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        // Update existing task
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${taskId}`,
          task,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Create a new task
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks`,
          task,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">
        {taskId ? "Update Task" : "Create New Task"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Name"
          fullWidth
          required
          margin="normal"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Status</InputLabel>
          <Select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            label="Status"
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
            <MenuItem value="Deferred">Deferred</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Deadline"
          type="date"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />

        {/* New Value Field */}
        <TextField
          label="Task Value"
          fullWidth
          required
          margin="normal"
          type="number"
          value={task.value}
          onChange={(e) =>
            setTask({ ...task, value: parseFloat(e.target.value) })
          }
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Collaborators</InputLabel>
          <Select
            multiple
            value={task.collaborators}
            onChange={(e) =>
              setTask({ ...task, collaborators: e.target.value })
            }
            renderValue={(selected) =>
              selected
                .map(
                  (id) =>
                    collaborators.find((collab) => collab._id === id)?.name ||
                    ""
                )
                .join(", ")
            }
          >
            {collaborators.map((collab) => (
              <MenuItem key={collab._id} value={collab._id}>
                <Checkbox checked={task.collaborators.includes(collab._id)} />
                <ListItemText primary={collab.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Project</InputLabel>
          <Select
            value={task.project}
            onChange={(e) => setTask({ ...task, project: e.target.value })}
            label="Project"
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {taskId ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
