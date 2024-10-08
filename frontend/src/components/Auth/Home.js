// src/components/Auth/Home.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        user
      );
      login(res.data.token);
      navigate("/login-home");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/register`,
        user
      );
      setIsRegistering(false);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {isRegistering ? "Register" : "Login"}
        </Typography>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {isRegistering ? "Register" : "Login"}
          </Button>
        </form>
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          fullWidth
          sx={{ mt: 1 }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "New user? Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
