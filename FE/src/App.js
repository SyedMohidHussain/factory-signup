import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import FactorySignup from "./FactorySignup";
import FactoryIcon from "@mui/icons-material/Factory";
function App() {
  return (
    <Box sx={{ padding: 3, fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <AppBar
      position="static"
      sx={{
        background: "white", // Green gradient
        paddingY: 1.5,
        boxShadow: 3, // Slight shadow for depth
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FactoryIcon sx={{ fontSize: 40, color: "black", mr: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black", textAlign: "center" }}>
          Factory Signup with <Box component="span" sx={{ color: "green" }}>AI Assistance</Box>
        </Typography>
      </Toolbar>
    </AppBar>
      {/* Navbar End */}

      <FactorySignup />
    </Box>
  );
}

export default App;
