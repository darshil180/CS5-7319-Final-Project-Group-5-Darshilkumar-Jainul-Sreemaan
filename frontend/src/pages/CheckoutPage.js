import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Changed to useNavigate

const CheckoutPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the order data to a backend (for example using axios)
    // For now, we will just log the order and redirect to order confirmation.

    console.log("Order Placed:", shippingInfo);

    // Clear cart after placing order
    localStorage.removeItem("cart");

    // Redirect to order confirmation page
    navigate("/order-confirmation"); // Use navigate instead of history.push
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Checkout</Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={shippingInfo.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Place Order
        </Button>
      </form>
    </Container>
  );
};

export default CheckoutPage;
