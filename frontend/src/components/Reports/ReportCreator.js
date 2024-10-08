import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  Divider,
} from "@mui/material";

const ReportCreator = () => {
  const [report, setReport] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/report`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setReport(response.data.report);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Generate Project Report
        </Typography>
        <Button
          onClick={handleGenerateReport}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Generate Report
        </Button>
        {report && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Report Details:
            </Typography>
            <List>
              {report.map((project, index) => (
                <Box
                  key={index}
                  sx={{ mb: 3, p: 2, borderRadius: "8px", bgcolor: "#f5f5f5" }}
                >
                  <ListItem>
                    <Typography variant="subtitle1">
                      <strong>Project:</strong> {project.projectName}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>Total Value:</strong> {project.totalValue}%
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>Tasks:</strong>
                      <ul>
                        {project.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>Collaborators:</strong>
                      <ul>
                        {project.collaborators.map((collab, j) => (
                          <li key={j}>{collab}</li>
                        ))}
                      </ul>
                    </Typography>
                  </ListItem>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ReportCreator;
