import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Restaurant App
        </Typography>
        <Box>
          <Button component={Link} to="/" sx={{ color: "white", marginRight: 2 }}>
            Home
          </Button>
          <Button component={Link} to="/menu" sx={{ color: "white" }}>
            Menu
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
