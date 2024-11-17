import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart data from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);

    // Calculate total price
    const totalPrice = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, []);

  // Clear the cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotal(0);
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          Looks like you haven’t added anything to your cart yet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/menu"
          sx={{ textTransform: "none", fontSize: "16px", px: 3 }}
        >
          Browse Menu
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Your Cart
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
          sx={{ fontWeight: "bold", fontSize: "14px" }}
        >
          Clear Cart
        </Button>
      </Box>

      <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", p: 2 }}>
        <List>
          {cartItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ p: 2 }}>
                <Grid container alignItems="center">
                  {/* Image Section */}
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      sx={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>

          {console.log(item)}

                  {/* Details Section */}
                  <Grid item xs={6} sx={{ pl: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      {item.description || "No description available."}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      Quantity: {item.quantity}
                    </Typography>
                  </Grid>

                  {/* Price Section */}
                  <Grid item xs={3} sx={{ textAlign: "right" }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      Price: ${item.price.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {index < cartItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ mt: 4, textAlign: "right" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Final Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontSize: "16px", px: 4 }}
          component={Link}
          to="/checkout"
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
