import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []); // Run once when the component mounts

  // Clear the cart
  const clearCart = () => {
    // Clear the cart from localStorage
    localStorage.removeItem("cart");

    // Immediately update the state to reflect the empty cart
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Your cart is empty.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Your Cart</Typography>

        {/* Clear Cart Button */}
        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
          sx={{ fontWeight: "bold", fontSize: "14px" }}
        >
          Clear Cart
        </Button>
      </Box>

      <Grid container spacing={4}>
        {cartItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">Price: ${item.price}</Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CartPage;
