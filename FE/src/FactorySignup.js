import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  Grid,
  Box,
  Divider
} from "@mui/material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FactoryIcon from "@mui/icons-material/Factory";

function FactorySignup() {
  const [factories, setFactories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch factories from the backend
  const fetchFactories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/factories");
      setFactories(response.data);
    } catch (err) {
      console.error("Error fetching factories:", err);
    }
  };

  // Handle Factory Signup submission
  const handleFactorySubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !description) {
      setError("Name and description are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/factory", {
        name,
        description,
      });

      setSuccess("Factory created successfully!");
      setFactories((prevFactories) => [...prevFactories, response.data.factory]);
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Error creating factory:", err);
      setError("Failed to create factory. Please try again.");
    }
  };

  useEffect(() => {
    fetchFactories();
  }, []);

  return (
    <Box sx={{ padding: 3, fontFamily: "Arial, sans-serif" }}>
      <Grid container spacing={4}>
        {/* Factory Signup Form */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 3 }}>
            <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, pb: 1, borderBottom: "2px solid #ccc" }}>
                <AddBusinessIcon color="primary" fontSize="large" />
                <Typography variant="h4" color="primary" fontWeight="bold">
                  Factory Registration
                </Typography>
              </Box>

              {/* Error and Success Messages */}
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <Box component="form" onSubmit={handleFactorySubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Factory Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!error && !name}
                  helperText={!name && error ? "Name is required" : ""}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!error && !description}
                  helperText={!description && error ? "Description is required" : ""}
                  sx={{ mb: 2 }}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                 Register
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Registered Factories List */}
        <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, pb: 1, mt:5, borderBottom: "2px solid #ccc" }}>
          <FactoryIcon color="primary" fontSize="large" />
          <Typography variant="h4" color="primary" fontWeight="bold">
            Registered Factories
          </Typography>
        </Box>

          {factories.length === 0 ? (
            <Alert severity="info">No factories registered yet.</Alert>
          ) : (
            factories.map((factory) => (
              <Card
                key={factory.id}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 5 },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
               
                    <Typography variant="h6">
                    Name:  <strong>{factory.name}</strong>
                    </Typography>
                  </Box>
            
                  
            
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            
                    <Typography variant="body1">
                    Description: <strong>{factory.description}</strong>
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ mb: 1 }} />
            
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                   
                    <Typography variant="body1" >
                      Category: <strong>{factory.category}</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default FactorySignup;
