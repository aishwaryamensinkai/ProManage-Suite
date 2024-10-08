// src/components/Projects/ProjectForm.js
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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const ProjectForm = () => {
  const { id: projectId } = useParams(); // Get projectId from URL
  const [project, setProject] = useState({ name: "", status: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => setProject(response.data))
        .catch((error) => console.error("Error fetching project:", error));
    }
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (projectId) {
        // Update project
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`,
          project,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Create new project
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/projects`,
          project,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      navigate("/projects");
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">
        {projectId ? "Update Project" : "Create New Project"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          fullWidth
          required
          margin="normal"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Status</InputLabel>
          <Select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            label="Status"
          >
            {/* Status options */}
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Awaiting Approval">Awaiting Approval</MenuItem>
            <MenuItem value="Deferred">Deferred</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Planned">Planned</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="On Hold">On Hold</MenuItem>
            <MenuItem value="Testing">Testing</MenuItem>
            <MenuItem value="Deployment Ready">Deployment Ready</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {projectId ? "Update Project" : "Create Project"}
        </Button>
      </form>
    </Container>
  );
};

export default ProjectForm;
