import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Welcome to the Restaurant App!
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, color: "gray" }}>
        Discover delicious dishes, order online, and enjoy your meal!
      </Typography>

      {/* Image Slider */}
      <Box sx={{ mb: 4, position: "relative" }}>
        <Slider {...sliderSettings}>
          <div>
            <img
              src={dish1} // Use local image imported
              alt="Dish 1"
              style={{
                width: "100%",
                height: "400px", // Fixed height
                objectFit: "cover", // Maintain aspect ratio and crop
                borderRadius: "10px",
              }}
            />
          </div>
          <div>
            <img
              src={dish2} // Use local image imported
              alt="Dish 2"
              style={{
                width: "100%",
                height: "400px", // Fixed height
                objectFit: "cover", // Maintain aspect ratio and crop
                borderRadius: "10px",
              }}
            />
          </div>
          <div>
            <img
              src={dish3} // Use local image imported
              alt="Dish 3"
              style={{
                width: "100%",
                height: "400px", // Fixed height
                objectFit: "cover", // Maintain aspect ratio and crop
                borderRadius: "10px",
              }}
            />
          </div>
        </Slider>
      </Box>

      {/* Action Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/menu")}
        sx={{
          mt: 2,
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Explore Our Menu
      </Button>
    </Container>
  );
};

export default Home;
