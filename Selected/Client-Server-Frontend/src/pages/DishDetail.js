import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  useTheme,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const DishDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false); // New state to handle button feedback
  const theme = useTheme();

  useEffect(() => {
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/menu/dishes/${id}`
        );
        setDish(response.data.data.data);
      } catch (error) {
        console.error("Failed to fetch dish details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { dishId: dish._id, quantity: 1 },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAddedToCart(true); // Set the feedback state to true
      setTimeout(() => setAddedToCart(false), 2000); // Hide the feedback after 2 seconds
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!dish) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        Dish not found
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Dish Image Section */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 300,
              objectFit: "cover", // Ensure image is well-cropped
              borderRadius: 2, // Add rounded corners
            }}
            image={require(`../assets/DishImages/${dish.imageUrl}`) || "https://via.placeholder.com/400"}
            alt={dish.name}
          />
        </Grid>

        {/* Dish Details Section */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {dish.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
              Category: {dish.category}
            </Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              {dish.description}
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${dish.price}
            </Typography>

            <Button
              onClick={addToCart}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Change color on hover
                },
                "&:active": {
                  transform: "scale(0.98)", // Button shrink effect when clicked
                },
                borderRadius: 2,
                padding: "10px 20px",
                fontWeight: "bold",
                transition: "all 0.2s ease", // Smooth transition for hover/active states
              }}
            >
              {addedToCart ? "Added!" : "Add to Cart"} {/* Button text changes after adding */}
            </Button>

            {/* Snackbar notification for added to cart feedback */}
            <Snackbar
              open={addedToCart}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Dish added to cart!
              </Alert>
            </Snackbar>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DishDetail;
