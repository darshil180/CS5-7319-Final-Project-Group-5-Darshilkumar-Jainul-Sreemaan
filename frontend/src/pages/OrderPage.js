import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []); // Run once when the component mounts

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">Your cart is empty.</Typography>
        <Button variant="contained" color="primary" component={Link} to="/menu" sx={{ mt: 2 }}>
          Go to Menu
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Your Order Summary</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {cartItems.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Box sx={{ flex: "0 0 100px", mr: 2 }}>
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography variant="body1">Price: ${item.price}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "right", mt: 4 }}>
        <Typography variant="h6">
          <strong>Total:</strong> ${calculateTotal()}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
          sx={{ mt: 2 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default OrderPage;
