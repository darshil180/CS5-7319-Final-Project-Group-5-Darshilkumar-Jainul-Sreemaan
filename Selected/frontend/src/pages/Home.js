import React from "react";
import { Typography, Container, Button, Box, Paper, Grid } from "@mui/material";
import Slider from "react-slick"; // Import react-slick
import { useNavigate } from "react-router-dom";

// Import your local images
import dish1 from "../assets/images/images1.jpeg";
import dish2 from "../assets/images/images2.jpeg";
import dish3 from "../assets/images/images3.jpeg";

// Custom styling for slider
const sliderSettings = {
  dots: true, // Show dots for navigation
  infinite: true, // Infinite scroll
  speed: 500, // Transition speed
  slidesToShow: 1, // Show one image at a time
  slidesToScroll: 1, // Scroll one image at a time
  autoplay: true, // Autoplay images
  autoplaySpeed: 5000, // Change image every 5 seconds
  arrows: false, // Disable navigation arrows
  centerMode: true, // Optionally center the active slide
  centerPadding: "0", // Ensure no extra padding around images
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      {/* Welcome Message */}
      <Typography
        variant="h3"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "primary.main",
          fontSize: "36px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Welcome to Taj Restaurant!
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: 4,
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        A fine dining experience that tantalizes your taste buds with authentic flavors.
      </Typography>

      {/* Image Slider */}
      <Box sx={{ mb: 4, position: "relative" }}>
        <Slider {...sliderSettings}>
          <div>
            <img
              src={dish1}
              alt="Dish 1"
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
          <div>
            <img
              src={dish2}
              alt="Dish 2"
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
          <div>
            <img
              src={dish3}
              alt="Dish 3"
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        </Slider>
      </Box>

      {/* Call to Action Section */}
      <Paper
        sx={{
          padding: "30px",
          textAlign: "center",
          backgroundColor: "background.paper",
          borderRadius: "10px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          mb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Explore Our Exquisite Menu!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontSize: "18px",
          }}
        >
          From traditional delicacies to modern culinary masterpieces, our menu has something for every palate.
        </Typography>

        {/* Buttons Section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/menu")}
            sx={{
              padding: "12px 24px",
              fontSize: "18px",
              borderRadius: "50px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            View Our Menu
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/reservation/new")}
            sx={{
              padding: "12px 24px",
              fontSize: "18px",
              borderRadius: "50px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            Make a Reservation
          </Button>
        </Box>
      </Paper>

      {/* Additional Section with Dishes */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <img
              src={dish1}
              alt="Dish 1"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              Signature Dish 1
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              A must-try dish that brings the flavors of India right to your table.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <img
              src={dish2}
              alt="Dish 2"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              Signature Dish 2
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              A flavorful blend of spices and fresh ingredients, perfect for your taste buds.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <img
              src={dish3}
              alt="Dish 3"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              Signature Dish 3
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              A delicious and aromatic dish that brings the heart of Indian cuisine to your table.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
