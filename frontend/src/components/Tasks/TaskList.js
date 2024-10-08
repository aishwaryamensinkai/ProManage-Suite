// src/components/Tasks/TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchTasksAndProjects = async () => {
      try {
        const [tasksResponse, projectsResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
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

        const groupedTasks = tasksResponse.data.reduce((acc, task) => {
          const projectId = task.project || "Unassigned";
          if (!acc[projectId]) acc[projectId] = [];
          acc[projectId].push(task);
          return acc;
        }, {});

        setTasks(groupedTasks);

        const projectNames = projectsResponse.data.reduce((acc, project) => {
          acc[project._id] = project.name;
          return acc;
        }, {});

        setProjects(projectNames);
      } catch (error) {
        console.error("Error fetching tasks or projects:", error);
      }
    };

    fetchTasksAndProjects();
  }, []);

  const handleDelete = async (taskId, projectId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Remove the task from the UI after deletion
      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[projectId] = updatedTasks[projectId].filter(
          (task) => task._id !== taskId
        );
        if (updatedTasks[projectId].length === 0)
          delete updatedTasks[projectId];
        return updatedTasks;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        All Tasks by Project
      </Typography>
      <Button
        component={Link}
        to="/tasks/new"
        variant="contained"
        sx={{ mb: 3 }}
      >
        Create New Task
      </Button>

      {Object.keys(tasks).map((projectId) => (
        <Box key={projectId} sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {projects[projectId] || "Unassigned"}
          </Typography>
          <Grid container spacing={3}>
            {tasks[projectId].map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{task.name}</Typography>
                    <Typography>Status: {task.status}</Typography>
                    <Typography>
                      Deadline: {new Date(task.deadline).toDateString()}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/tasks/${task._id}`}
                      variant="contained"
                      sx={{ mt: 2, mr: 1 }}
                    >
                      View Details
                    </Button>
                    <Button
                      component={Link}
                      to={`/tasks/${task._id}/edit`}
                      variant="outlined"
                      sx={{ mt: 2, mr: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => handleDelete(task._id, projectId)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default TaskList;
