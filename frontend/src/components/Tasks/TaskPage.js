// src/components/Tasks/TaskPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, List, ListItem, Box } from "@mui/material";

const TaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [collaborators, setCollaborators] = useState([]); // Store collaborator details

  useEffect(() => {
    // Fetch task details
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTask(response.data);
        fetchCollaboratorDetails(response.data.collaborators);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, [id]);

  const fetchCollaboratorDetails = async (collaborators) => {
    try {
      const details = await Promise.all(
        collaborators.map(async (collaboratorId) => {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/${collaboratorId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          return { name: response.data.name, email: response.data.email };
        })
      );
      setCollaborators(details);
    } catch (error) {
      console.error("Error fetching collaborator details:", error);
    }
  };

  return (
    <Container maxWidth="md">
      {task ? (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h4">{task.name}</Typography>
          <Typography>Status: {task.status}</Typography>
          <Typography>
            Deadline: {new Date(task.deadline).toDateString()}
          </Typography>
          <Typography>Value: {task.value}</Typography>{" "}
          {/* Display the task value */}
          <Typography sx={{ mt: 2 }}>Collaborators:</Typography>
          <List>
            {collaborators.map((collaborator, index) => (
              <ListItem key={index}>
                {collaborator.name} - {collaborator.email}
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography>Loading task details...</Typography>
      )}
    </Container>
  );
};

export default TaskPage;
