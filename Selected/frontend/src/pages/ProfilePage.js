import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const ProfilePage = () => {
  const theme = useTheme(); // Get the theme from Material-UI
  const [orderHistory, setOrderHistory] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders and user details
    const fetchUserDataAndOrders = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        // Fetch user details
        const userResponse = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `${token}` }, // Pass the token for authentication
        });

        setUserDetails(userResponse.data.data);

        // Fetch order history
        const orderResponse = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `${token}` }, // Pass the token for authentication
        });

        // Ensure response data is an array
        const orders = Array.isArray(orderResponse.data.data.data) ? orderResponse.data.data.data : [];
        setOrderHistory(orders); // Set order history if it's an array
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndOrders();
  }, []);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Loading user and order data...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      {/* User Details Section */}
      {userDetails && (
        <Box sx={{
          mb: 4,
          padding: "16px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          boxShadow: 3,
        }}>
          <Typography variant="h5" gutterBottom align="center" sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}>
            User Profile
          </Typography>
          <Typography variant="body1" sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}>
            Name: {userDetails.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Email: {userDetails.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Phone: {userDetails.phone || "N/A"}
          </Typography>
        </Box>
      )}

      {/* Order History Section */}
      <Typography variant="h4" gutterBottom align="center" sx={{
        fontWeight: "bold",
        color: theme.palette.primary.main,
      }}>
        Order History
      </Typography>

      {orderHistory.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No orders found.
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {orderHistory.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{
                boxShadow: 3,
                borderRadius: "12px",
                backgroundColor: theme.palette.background.default,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-5px)",
                },
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}>
                    Order ID: {order._id}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Total: ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Status: {order.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Order Type: {order.orderType}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    sx={{
                      marginLeft: "auto",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                    }}
                    onClick={() => handleOpenDialog(order)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal for displaying order details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
        }}>
          Order Details
        </DialogTitle>
        <DialogContent sx={{ p: 4, mt: 4 }}>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
              }}>
                Order ID: {selectedOrder._id}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                Total: ${selectedOrder.totalAmount.toFixed(2)}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                Status: {selectedOrder.status}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                Order Type: {selectedOrder.orderType}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}>
                  Items:
                </Typography>
                {selectedOrder.items.map((item) => (
                  <Box key={item._id} sx={{
                    mt: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    paddingBottom: "10px",
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {item.dish.name} (x{item.quantity})
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ${item.dish.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: {item.dish.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
