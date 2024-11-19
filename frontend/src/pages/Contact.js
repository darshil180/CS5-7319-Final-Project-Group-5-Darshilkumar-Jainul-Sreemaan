import React, { useState } from "react";
import { Typography, Box, Container, TextField, Button, Grid, Paper, Divider, useTheme } from "@mui/material";
import { Map } from "@mui/icons-material"; // You can use an icon for the map section
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

const ContactUs = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    // Handle form submission logic, e.g., send the form data to a backend or an email service.
    console.log("Form Submitted:", formData);
    setError(null); // Clear any existing errors
  };

  return (
    <StyledContainer>
      <Typography variant="h4" color="primary" align="center" gutterBottom sx={{ fontWeight: 700 }}>
        Contact Us
      </Typography>

      {/* Contact Form Section */}
      <SectionTitle variant="h5" align="center">
        We'd Love to Hear From You
      </SectionTitle>
      <Typography variant="body1" paragraph align="center" color="textSecondary" sx={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
        Have any questions, feedback, or need assistance? Feel free to reach out, and we will get back to you as soon as possible!
      </Typography>

      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Your Name"
              name="name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Your Email"
              name="email"
              variant="outlined"
              fullWidth
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Your Message"
              name="message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} align="center">
            <Button variant="contained" color="primary" type="submit">
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider sx={{ marginY: theme.spacing(4) }} />

      {/* Restaurant Location Section */}
      <SectionTitle variant="h5" align="center">
        Our Location
      </SectionTitle>
      <Typography variant="body1" paragraph align="center" color="textSecondary" sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
        Visit us at our luxurious Taj restaurant for an unforgettable dining experience. We are located at the following address:
      </Typography>

      {/* Address */}
      <Paper sx={{ padding: theme.spacing(3), textAlign: "center", marginBottom: theme.spacing(4) }}>
        <Typography variant="h6" gutterBottom>
          Taj Restaurant
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Taj Palace, 1 Mansingh Road, New Delhi, 110011, India
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Phone: +91 11 6611 4444 | Email: contact@tajrestaurant.com
        </Typography>
      </Paper>

      {/* Map Section */}
      <SectionTitle variant="h5" align="center">
        Find Us on the Map
      </SectionTitle>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: theme.spacing(4) }}>
        <Map sx={{ fontSize: 40, marginRight: 2, color: theme.palette.primary.main }} />
        <Typography variant="body1" color="textSecondary">
          We are located at the heart of New Delhi. Look for us on the map below:
        </Typography>
      </Box>

      {/* Map Embed */}
      <Box sx={{ textAlign: "center" }}>
        {/* Embed Taj Palace location */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14079.83642417525!2d77.22111321631476!3d28.61601919725027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d7c7bbd3b35%3A0xfef246ee88b897af!2sTaj+Palace%2C+New+Delhi!5e0!3m2!1sen!2sin!4v1637423205603!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        />
      </Box>
    </StyledContainer>
  );
};

export default ContactUs;
