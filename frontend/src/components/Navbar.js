// src/components/Navbar.js
import React from "react";
import { Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Toolbar>
      <Button component={Link} to="/" sx={{ marginRight: 2 }}>
        Home
      </Button>
      <Button component={Link} to="/menu">
        Menu
      </Button>
    </Toolbar>
  );
};

export default Navbar;
