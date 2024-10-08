// src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Layout/Navbar";
import Home from "./components/Auth/Home";
import LoginHome from "./components/Auth/LoginHome";
import ProjectList from "./components/Projects/ProjectList";
import ProjectPage from "./components/Projects/ProjectPage";
import ProjectForm from "./components/Projects/ProjectForm";
import TaskList from "./components/Tasks/TaskList";
import TaskPage from "./components/Tasks/TaskPage";
import TaskForm from "./components/Tasks/TaskForm";
import ReportCreator from "./components/Reports/ReportCreator";
import AuthProvider, { AuthContext } from "./context/AuthContext";

const theme = createTheme({
  palette: { primary: { main: "#007bff" }, secondary: { main: "#f50057" } },
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login-home"
            element={
              <PrivateRoute>
                <LoginHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectList />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectPage />
              </PrivateRoute>
            }
          />
          {/* New route for editing projects */}
          <Route
            path="/projects/:id/edit"
            element={
              <PrivateRoute>
                <ProjectForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <TaskPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id/edit" // New route for editing task
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/report-creator"
            element={
              <PrivateRoute>
                <ReportCreator />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
