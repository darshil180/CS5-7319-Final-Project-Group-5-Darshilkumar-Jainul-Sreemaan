import React from "react";
import { Typography, Box, Container, Grid, Paper, CardMedia, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

// Styled components using Material UI's sx prop and styled() function
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(8),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  color: theme.palette.primary.main,
  fontSize: "2rem",
  textTransform: "uppercase",
}));

const About = () => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <Typography variant="h4" color="primary" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Welcome to Taj Restaurant
      </Typography>

      {/* Introduction Section */}
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h6" paragraph align="center" color="textSecondary" sx={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
          Experience the Richness of Indian Cuisine at Taj Restaurant.
        </Typography>
        <Typography variant="body1" paragraph align="center" color="textSecondary" sx={{ fontSize: "1rem", lineHeight: 1.7 }}>
          Located in the heart of the city, Taj Restaurant offers an unparalleled dining experience. With our focus on authentic flavors, innovative recipes, and exceptional service, every meal here is designed to transport you to the heart of India.
          From exquisite regional dishes to an inviting atmosphere, we strive to make your visit memorable.
        </Typography>
      </Box>

      {/* Our Philosophy Section */}
      <Box sx={{ marginBottom: 6 }}>
        <SectionTitle variant="h5" align="center">
          Our Philosophy
        </SectionTitle>
        <Typography variant="body1" paragraph align="center" color="textSecondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          At Taj, we believe that dining should be an experience of luxury and indulgence. We focus on using only the finest ingredients, prepared with care and passion by our skilled chefs. 
          Our goal is to create an atmosphere that blends traditional Indian elegance with modern comfort. Whether you're here for a special occasion or a casual dinner, we aim to exceed your expectations.
        </Typography>
      </Box>

      {/* Gallery Section */}
      <SectionTitle variant="h5" align="center">
        Our Gallery
      </SectionTitle>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Paper sx={{ overflow: "hidden", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={require(`../assets/tajImages/taj1.jpeg`)}
              alt="Taj Restaurant Ambiance"
              sx={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ overflow: "hidden", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={require(`../assets/tajImages/taj2.jpeg`)}
              alt="Authentic Indian Cuisine"
              sx={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ overflow: "hidden", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={require(`../assets/tajImages/taj3.jpeg`)}
              alt="Luxury Dining"
              sx={{ width: "100%", height: "auto" }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Meet Our Team Section */}
      <Box sx={{ marginTop: 6 }}>
        <SectionTitle variant="h5" align="center">
          Meet Our Team
        </SectionTitle>
        <Typography variant="body1" paragraph align="center" color="textSecondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          The heart of Taj Restaurant is our dedicated team, which includes world-class chefs, friendly staff, and exceptional hospitality professionals. Our team works tirelessly to ensure that every guest experiences the best of what we offer, combining luxury with warmth.
        </Typography>
      </Box>

      {/* Call to Action */}
      <Box sx={{ marginTop: 6, textAlign: "center" }}>
        <Button variant="contained" color="primary" href="/contact" size="large" sx={{ padding: "12px 32px", fontSize: "1rem" }}>
          Get in Touch
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default About;
