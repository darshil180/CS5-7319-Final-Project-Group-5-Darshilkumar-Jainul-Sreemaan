import React from "react";
import { Button, Toolbar, Box, Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Add ShoppingCart Icon
import { useSelector } from "react-redux"; // Import useSelector from Redux

const Navbar = () => {
  // Get the authentication status from the Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Get the cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Toolbar>
      {/* Navigation buttons */}
      <Button component={Link} to="/" sx={{ marginRight: 2 }}>
        Home
      </Button>
      <Button component={Link} to="/menu">
        Menu
      </Button>

      {/* Only show Cart button if user is authenticated */}
      {isAuthenticated && (
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon sx={{ fontSize: 28 }} />
            </Badge>
          </IconButton>
        </Box>
      )}
    </Toolbar>
  );
};

export default Navbar;
