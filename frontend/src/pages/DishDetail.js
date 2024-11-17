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

const DishDetail = () => {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

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
      alert("Dish added to cart!");
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
      <Card sx={{ display: "flex", flexDirection: "row", boxShadow: 3 }}>
        <Box
          sx={{
            flex: 1,
            maxWidth: "50%",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            image={dish.imageUrl || "https://via.placeholder.com/400"}
            alt={dish.name}
          />
        </Box>
        <CardContent sx={{ flex: 1, maxWidth: "50%" }}>
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

export default DishDetail;
