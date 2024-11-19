import React from "react";
import { Typography, Box, Container, Grid, Paper, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

// Styled components using Material UI's sx prop and styled() function
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  color: theme.palette.primary.main,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  marginTop: theme.spacing(3),
}));

const About = () => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        About Us
      </Typography>

      {/* Introduction Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" paragraph align="center" color="textSecondary">
          Welcome to Our Restaurant! A place where passion meets food.
        </Typography>
        <Typography variant="body1" paragraph align="center" color="textSecondary">
          We are more than just a restaurant – we are a destination for delicious food, great experiences, and unforgettable moments.
          Whether you're here for a casual meal with friends, a business lunch, or a special celebration, we aim to make each visit a delightful experience.
        </Typography>
      </Box>

      {/* Our Philosophy Section */}
      <Box sx={{ marginBottom: 4 }}>
        <SectionTitle variant="h5" align="center">
          Our Philosophy
        </SectionTitle>
        <Typography variant="body1" paragraph align="center" color="textSecondary">
          At our restaurant, we believe that food should not just be a meal; it should be an experience. We focus on fresh ingredients, innovative recipes, and creating an atmosphere that feels like home.
          Our chefs work tirelessly to craft dishes that excite the senses, and our staff is here to ensure every guest feels welcome and cared for.
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
              image="https://via.placeholder.com/400x300?text=Restaurant+Ambiance"
              alt="Restaurant Ambiance"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ overflow: "hidden", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image="https://via.placeholder.com/400x300?text=Delicious+Food"
              alt="Delicious Food"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ overflow: "hidden", borderRadius: 2 }}>
            <CardMedia
              component="img"
              image="https://via.placeholder.com/400x300?text=Friendly+Service"
              alt="Friendly Service"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Meet Our Team Section */}
      <Box sx={{ marginTop: 4 }}>
        <SectionTitle variant="h5" align="center">
          Meet Our Team
        </SectionTitle>
        <Typography variant="body1" paragraph align="center" color="textSecondary">
          Our team is the heart of our restaurant. From our talented chefs to our friendly servers, each member of our staff is dedicated to providing the best possible experience for you. 
          We take pride in creating a warm, welcoming environment where you feel like part of the family.
        </Typography>
      </Box>

      {/* Call to Action */}
      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Button variant="contained" color="primary" href="/contact" size="large">
          Contact Us
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default About;
