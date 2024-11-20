import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Order Placed Successfully!
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Thank you for your order. We will process it and notify you once it's on the way.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" component={Link} to="/menu">
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmationPage;
