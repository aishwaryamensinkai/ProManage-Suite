// src/components/Projects/ProjectList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchProjects(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        All Projects
      </Typography>
      <Button
        component={Link}
        to="/projects/new"
        variant="contained"
        sx={{ mb: 3 }}
      >
        Create New Project
      </Button>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography>Status: {project.status}</Typography>
                <Button
                  component={Link}
                  to={`/projects/${project._id}`}
                  variant="contained"
                  sx={{ mt: 2, mr: 1 }}
                >
                  View Details
                </Button>
                <Button
                  component={Link}
                  to={`/projects/${project._id}/edit`}
                  variant="outlined"
                  sx={{ mt: 2, mr: 1 }}
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDelete(project._id)}
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectList;
