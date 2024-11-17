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
} from "@mui/material";
import axios from "axios";

const DishDetailPage = () => {
  const { id } = useParams(); // Get the dish id from the URL
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dish details using the id from the URL
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/menu/dishes/${id}`
        );
        setDish(response.data.data.data); // Assuming the dish data is in the 'data' field
      } catch (error) {
        console.error("Failed to fetch dish details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishDetails();
  }, [id]); // Fetch data when the id changes

  // Function to add item to cart in localStorage
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex((item) => item.id === dish._id);

    if (itemIndex !== -1) {
      // If item already exists in cart, update quantity
      existingCart[itemIndex].quantity += 1;
    } else {
      // If item does not exist, add it
      existingCart.push({ id: dish._id, name: dish.name, quantity: 1, price: dish.price, imageUrl: dish.imageUrl });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
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
      <Card sx={{ display: "flex", flexDirection: "row", boxShadow: 3 }}>
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            maxWidth: "50%", // Make the image take up half the width
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "filter 0.3s ease-in-out",
              filter: "blur(5px)", // Apply blur effect
            }}
            image={dish.imageUrl || "https://via.placeholder.com/400"}
            alt={dish.name}
          />
        </Box>

        {/* Content Section */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "30px",
            maxWidth: "50%",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {dish.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
            Category: {dish.category}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            {dish.description}
          </Typography>
          <Typography variant="h5" color="primary">
            ${dish.price}
          </Typography>
          <Button
            onClick={addToCart}
            sx={{
              mt: 2,
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DishDetailPage;
