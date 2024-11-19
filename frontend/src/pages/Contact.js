import React, { useState } from "react";
import { Typography, Box, Container, TextField, Button, Grid, Paper, Divider, useTheme } from "@mui/material";
import { Map } from "@mui/icons-material"; // You can use an icon for the map section
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
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        Contact Us
      </Typography>

      {/* Contact Form Section */}
      <SectionTitle variant="h5" align="center">
        We’d Love to Hear From You
      </SectionTitle>
      <Typography variant="body1" paragraph align="center" color="textSecondary">
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
      <Typography variant="body1" paragraph align="center" color="textSecondary">
        Visit us at our restaurant for an unforgettable dining experience. We are located at the following address:
      </Typography>

      {/* Address */}
      <Paper sx={{ padding: theme.spacing(3), textAlign: "center", marginBottom: theme.spacing(4) }}>
        <Typography variant="h6" gutterBottom>
          Our Restaurant
        </Typography>
        <Typography variant="body1" color="textSecondary">
          123 Restaurant Street, Food City, 12345
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Phone: (123) 456-7890 | Email: contact@restaurant.com
        </Typography>
      </Paper>

      {/* Map Section */}
      <SectionTitle variant="h5" align="center">
        Find Us on the Map
      </SectionTitle>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: theme.spacing(4) }}>
        <Map sx={{ fontSize: 40, marginRight: 2, color: theme.palette.primary.main }} />
        <Typography variant="body1" color="textSecondary">
          We are located at the heart of Food City. Look for us on the map below:
        </Typography>
      </Box>

      {/* Map Embed */}
      <Box sx={{ textAlign: "center" }}>
        {/* You can embed Google Maps or use any other map service here */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11635.576331347109!2d-73.935242!3d40.730610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a30c87b3fa1%3A0x7fcb4468c0d12e10!2sRestaurant+Street%2C+Food+City%2C+NY!5e0!3m2!1sen!2sus!4v1636720123125!5m2!1sen!2sus"
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
