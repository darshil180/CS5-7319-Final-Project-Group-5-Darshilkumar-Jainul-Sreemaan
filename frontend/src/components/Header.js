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
        {/* Logo / App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
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
              marginRight: 2, 
              textTransform: "none", 
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              }
            }}>
            Menu
          </Button>

          {/* Static Pages (New Links) */}
          <Button 
            component={Link} 
            to="/about" 
            sx={{
              color: "white", 
              marginRight: 2, 
              textTransform: "none", 
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              }
            }}>
            About
          </Button>
          <Button 
            component={Link} 
            to="/contact" 
            sx={{
              color: "white", 
              marginRight: 2, 
              textTransform: "none", 
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              }
            }}>
            Contact
          </Button>

          {/* "Create Reservation" Button */}
          {isAuthenticated && (
            <Button 
              component={Link} 
              to="/reservation/new" 
              sx={{
                color: "white", 
                marginRight: 2, 
                textTransform: "none", 
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}>
              Reservation
            </Button>
          )}

          {/* Cart Button */}
          {isAuthenticated && (
            <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
              <IconButton 
                component={Link} 
                to="/cart" 
                sx={{
                  color: "white", 
                  padding: "8px",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: "50%",
                  }
                }}>
                <Badge 
                  badgeContent={cartItemCount} 
                  color="error" 
                  sx={{
                    "& .MuiBadge-dot": { backgroundColor: theme.palette.secondary.main },
                    fontSize: '14px', // Adjust font size of badge
                    top: 4, // Adjust badge position
                    right: -5, // Move badge closer to cart icon
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            </Box>
          )}

          {/* User Profile Menu */}
          {token ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handleProfileClick} sx={{ color: "white" }}>
                <Avatar 
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    fontSize: "18px", 
                    textTransform: "uppercase",
                  }}
                >
                  {localStorage.getItem("userName")?.[0]}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                sx={{
                  mt: 2,
                  "& .MuiPaper-root": {
                    borderRadius: "10px", // Rounded menu
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
                  },
                }}
              >
                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                <MenuItem onClick={() => navigate("/reservations")}>Reservations</MenuItem>
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
