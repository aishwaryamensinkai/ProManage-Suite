// src/components/Projects/ProjectPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log("Project data from backend:", response.data);
        setProject(response.data);
      })
      .catch((error) => console.error("Error fetching project data:", error));
  }, [id]);

  return (
    <Container maxWidth="md">
      {project ? (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h4">{project.name}</Typography>
          <Typography>Status: {project.status}</Typography>
          <Typography sx={{ mt: 2 }}>Tasks:</Typography>
          <List>
            {project.tasks.length > 0 ? (
              project.tasks.map((task) => (
                <ListItem key={task._id}>
                  {task.name} - Due: {new Date(task.deadline).toDateString()}
                </ListItem>
              ))
            ) : (
              <ListItem>N/A</ListItem>
            )}
          </List>
          <Button
            component={Link}
            to="/tasks"
            variant="contained"
            sx={{ mt: 2 }}
          >
            View All Tasks
          </Button>
        </Box>
      ) : (
        <Typography>Loading project details...</Typography>
      )}
    </Container>
  );
};

export default ProjectPage;
