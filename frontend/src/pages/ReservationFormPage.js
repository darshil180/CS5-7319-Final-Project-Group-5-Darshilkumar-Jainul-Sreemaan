import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  Alert,
} from "@mui/material";

const ReservationFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomType: "",
    floor: "",
    startTime: "",
    endTime: "",
    numOfPeople: "",
    note: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reservations",
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`, // Assuming the token is saved in localStorage
          },
        }
      );
      navigate("/reservations"); // Redirect to reservation list page upon success
    } catch (error) {
      setError(error.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <Container sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
        Create a Reservation
      </Typography>

      {error && <Alert severity="error" sx={{ marginBottom: 3 }}>{error}</Alert>}

      <Paper sx={{ padding: "20px", boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Room Type */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Select Room Type</MenuItem>
                  <MenuItem value="Dining-4">Dining-4</MenuItem>
                  <MenuItem value="Dining-8">Dining-8</MenuItem>
                  <MenuItem value="Party Room">Party Room</MenuItem>
                  <MenuItem value="Banquet Hall">Banquet Hall</MenuItem>
                </Select>
                <FormHelperText>Choose a room type</FormHelperText>
              </FormControl>
            </Grid>

            {/* Floor */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Select Floor</MenuItem>
                  <MenuItem value="1">Floor 1</MenuItem>
                  <MenuItem value="2">Floor 2</MenuItem>
                  <MenuItem value="3">Floor 3</MenuItem>
                </Select>
                <FormHelperText>Choose a floor</FormHelperText>
              </FormControl>
            </Grid>

            {/* Start Time */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Time"
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* End Time */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Time"
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Number of People */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of People"
                type="number"
                name="numOfPeople"
                value={formData.numOfPeople}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* Note */}
            <Grid item xs={12}>
              <TextField
                label="Note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 2 }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ padding: "12px", fontSize: "16px" }}
              >
                Reserve
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ReservationFormPage;
