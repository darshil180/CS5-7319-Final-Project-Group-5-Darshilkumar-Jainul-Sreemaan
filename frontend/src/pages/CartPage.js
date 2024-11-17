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
  IconButton,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart data from the backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("Cart API response:", response.data);

      const items = response.data.data.data.items || []; // Ensure it's an array
      console.log(items);
      setCartItems(Array.isArray(items) ? items : []);
      calculateTotal(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Calculate total price
  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.dish.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  // Update cart item quantity
  const updateCartItem = async (id, quantity) => {
    try {
      if (quantity < 1) {
        return; // Prevent setting quantity below 1
      }

      const token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:5000/api/cart/update",
        { dishId: id, quantity },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchCart(); // Refresh cart after update
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Remove a cart item
  const removeCartItem = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        { dishId: id },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      fetchCart(); // Refresh cart after removal
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/clear",
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/menu"
          sx={{ padding: "10px 20px", fontSize: "1rem" }}
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
          sx={{
            borderRadius: "20px",
            fontSize: "1rem",
            padding: "8px 16px",
            fontWeight: "600",
          }}
        >
          Clear Cart
        </Button>
      </Box>
      <List>
        {cartItems.map((item) => (
          <React.Fragment key={item.dish._id}>
            <ListItem sx={{ mb: 2 }}>
              <Paper sx={{ padding: "16px", width: "100%", borderRadius: "12px" }}>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      src={item.dish.imageUrl || "https://via.placeholder.com/100"}
                      alt={item.dish.name}
                      sx={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{item.dish.name}</Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      ${item.dish.price} each
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton
                        onClick={() => updateCartItem(item.dish._id, item.quantity + 1)}
                        size="small"
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => updateCartItem(item.dish._id, item.quantity - 1)}
                        size="small"
                        disabled={item.quantity === 1}
                      >
                        <Remove />
                      </IconButton>
                      <IconButton
                        onClick={() => removeCartItem(item.dish._id)}
                        size="small"
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
          sx={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CartPage;
