import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      dish: {
        _id: "dish1",
        name: "Pizza Margherita",
        price: 12.99,
        imageUrl: "https://via.placeholder.com/100",
      },
      quantity: 2,
    },
    {
      dish: {
        _id: "dish2",
        name: "Caesar Salad",
        price: 8.99,
        imageUrl: "https://via.placeholder.com/100",
      },
      quantity: 1,
    },
    {
      dish: {
        _id: "dish3",
        name: "Burger",
        price: 10.50,
        imageUrl: "https://via.placeholder.com/100",
      },
      quantity: 3,
    },
  ]);

  const [total, setTotal] = useState(
    cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0)
  );

  // Update cart item quantity
  const updateCartItem = (id, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.dish._id === id ? { ...item, quantity } : item
    );

    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  // Remove a cart item
  const removeCartItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.dish._id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  // Calculate total price
  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "text.primary" }}
        >
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/menu"
          sx={{
            padding: "12px 24px",
            fontSize: "1rem",
            borderRadius: "25px",
          }}
        >
          Browse Menu
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Your Cart
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
          sx={{
            borderRadius: "25px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            padding: "8px 20px",
          }}
        >
          Clear Cart
        </Button>
      </Box>

      {/* Cart Items */}
      <List>
        {cartItems.map((item) => (
          <React.Fragment key={item.dish._id}>
            <ListItem sx={{ mb: 3 }}>
              <Paper
                elevation={3}
                sx={{
                  padding: "16px",
                  width: "100%",
                  borderRadius: "15px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Grid container alignItems="center">
                  {/* Dish Image */}
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.dish.imageUrl}
                      alt={item.dish.name}
                      sx={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Grid>

                  {/* Dish Details */}
                  <Grid item xs={6} sx={{ paddingLeft: "16px" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      {item.dish.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      ${item.dish.price} each
                    </Typography>
                  </Grid>

                  {/* Actions */}
                  <Grid item xs={3} textAlign="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton
                        onClick={() => updateCartItem(item.dish._id, item.quantity + 1)}
                        color="primary"
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => updateCartItem(item.dish._id, item.quantity - 1)}
                        color="secondary"
                        disabled={item.quantity === 1}
                      >
                        <Remove />
                      </IconButton>
                      <IconButton
                        onClick={() => removeCartItem(item.dish._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Total and Checkout */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
          sx={{
            padding: "12px 24px",
            fontSize: "1rem",
            borderRadius: "25px",
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
