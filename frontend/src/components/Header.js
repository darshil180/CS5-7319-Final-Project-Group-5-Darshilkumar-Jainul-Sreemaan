// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation for route checking
import { useDispatch } from "react-redux"; // Import useDispatch for Redux actions
import { logout } from "../redux/userSlice"; // Import logout action

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Hook to get the current route

  const handleSignOut = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Dispatch logout action to Redux store
    dispatch(logout());

    // Redirect to login page
    navigate("/login");
  };

  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Restaurant App
        </Typography>
        {token ? (
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        ) : location.pathname !== "/login" ? (  // Don't show "Login" button if we're on the login page
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : null }
      </Toolbar>
    </AppBar>
  );
};

export default Header;
