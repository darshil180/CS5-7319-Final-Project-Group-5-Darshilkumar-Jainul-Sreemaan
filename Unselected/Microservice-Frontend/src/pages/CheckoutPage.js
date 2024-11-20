import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderType, setOrderType] = useState("Dine-In"); // Default order type
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      setError("Unauthorized: No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          ...shippingInfo,
          orderType,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order Placed:", response.data);

      // Clear cart after placing order
      localStorage.removeItem("cart");

      // Redirect to order confirmation page
      navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Checkout</Typography>

      <form onSubmit={handleSubmit}>
        {/* User Info */}
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

        {/* Order Type */}
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Order Type</FormLabel>
          <RadioGroup
            row
            name="orderType"
            value={orderType}
            onChange={handleOrderTypeChange}
          >
            <FormControlLabel value="Dine-In" control={<Radio />} label="Dine-In" />
            <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
          </RadioGroup>
        </FormControl>

        {/* Error Message */}
        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Place Order
        </Button>
      </form>
    </Container>
  );
};

export default CheckoutPage;
