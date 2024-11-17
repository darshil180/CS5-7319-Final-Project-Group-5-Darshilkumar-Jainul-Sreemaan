import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box, Badge } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // ShoppingCart Icon
import { logout } from "../redux/userSlice"; // Redux logout action
import { useTheme } from "@mui/material/styles"; // For custom theme

const Header = () => {
  const theme = useTheme(); // Access the custom theme
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current route
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Get authentication status from Redux
  
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  
  // Cart state from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0); 

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Restaurant App
        </Typography>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button 
            component={Link} 
            to="/" 
            sx={{
              color: "white", 
              marginRight: 2, 
              textTransform: "none", 
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              }
            }}>
            Home
          </Button>
          <Button 
            component={Link} 
            to="/menu" 
            sx={{
              color: "white", 
              textTransform: "none", 
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              }
            }}>
            Menu
          </Button>

          {/* Only show Cart button if user is authenticated */}
          {isAuthenticated && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton 
                component={Link} 
                to="/cart" 
                sx={{
                  color: "white", 
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                  }
                }}>
                <Badge 
                  badgeContent={cartItemCount} 
                  color="error" 
                  sx={{ "& .MuiBadge-dot": { backgroundColor: theme.palette.secondary.main } }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 28 }} />
                </Badge>
              </IconButton>
            </Box>
          )}

          {/* User Profile Menu */}
          {token ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleProfileClick} sx={{ color: "white" }}>
                <Avatar>{localStorage.getItem("userName")?.[0]}</Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                sx={{ mt: 2 }}
              >
                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                <MenuItem onClick={() => navigate("/orders")}>Order History</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </Box>
          ) : location.pathname !== "/login" ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
