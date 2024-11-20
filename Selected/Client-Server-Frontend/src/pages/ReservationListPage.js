import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardContent, Typography, Divider, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ReservationListPage = () => {
  const [reservations, setReservations] = useState([]);
  const theme = useTheme(); // Access the theme for consistent styling

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setReservations(response.data.data.data);
      } catch (error) {
        console.error("Error fetching reservations", error);
      }
    };

    fetchReservations();
  }, []);

  // Function to check if a reservation is in the past
  const isPastReservation = (startTime) => {
    const currentDate = new Date();
    const reservationDate = new Date(startTime);
    return reservationDate < currentDate; // If reservation time is before current time, it's a past reservation
  };

  // Split reservations into past and upcoming
  const pastReservations = reservations.filter((reservation) => isPastReservation(reservation.startTime));
  const upcomingReservations = reservations.filter((reservation) => !isPastReservation(reservation.startTime));

  return (
    <Container sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: theme.palette.primary.main }}>
        Your Reservations
      </Typography>

      {/* Past Reservations */}
      {pastReservations.length > 0 && (
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" sx={{ color: theme.palette.secondary.main, marginBottom: 2 }}>
            Past Reservations
          </Typography>
          <Grid container spacing={3}>
            {pastReservations.map((reservation) => (
              <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
                      Room Type: {reservation.roomType} - Floor {reservation.floor}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Date & Time:
                      </Typography>
                      <Typography variant="body2">
                        {new Date(reservation.startTime).toLocaleString()} -{" "}
                        {new Date(reservation.endTime).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        People:
                      </Typography>
                      <Typography variant="body2">{reservation.numOfPeople}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Note:
                      </Typography>
                      <Typography variant="body2">{reservation.note}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Upcoming Reservations */}
      {upcomingReservations.length > 0 && (
        <Paper sx={{ padding: "20px" }}>
          <Typography variant="h5" sx={{ color: theme.palette.primary.main, marginBottom: 2 }}>
            Upcoming Reservations
          </Typography>
          <Grid container spacing={3}>
            {upcomingReservations.map((reservation) => (
              <Grid item xs={12} sm={6} md={4} key={reservation._id}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
                      Room Type: {reservation.roomType} - Floor {reservation.floor}
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Date & Time:
                      </Typography>
                      <Typography variant="body2">
                        {new Date(reservation.startTime).toLocaleString()} -{" "}
                        {new Date(reservation.endTime).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        People:
                      </Typography>
                      <Typography variant="body2">{reservation.numOfPeople}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Note:
                      </Typography>
                      <Typography variant="body2">{reservation.note}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* If no past and no upcoming reservations */}
      {pastReservations.length === 0 && upcomingReservations.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.secondary }}>
          You don't have any reservations yet.
        </Typography>
      )}
    </Container>
  );
};

export default ReservationListPage;
