import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ProfilePage = () => {
  const theme = useTheme(); // Get the theme from Material-UI
  const [orderHistory, setOrderHistory] = useState([
    {
      _id: "order1",
      createdAt: "2024-11-01T10:00:00Z",
      totalAmount: 45.99,
      status: "Delivered",
      orderType: "Dine-in",
      items: [
        { _id: "item1", dish: { name: "Pizza Margherita", price: 12.99, description: "Classic Italian pizza with tomatoes and mozzarella." }, quantity: 1 },
        { _id: "item2", dish: { name: "Caesar Salad", price: 8.99, description: "Fresh salad with Caesar dressing and croutons." }, quantity: 1 },
      ],
    },
    {
      _id: "order2",
      createdAt: "2024-11-10T18:30:00Z",
      totalAmount: 30.50,
      status: "Preparing",
      orderType: "Takeaway",
      items: [
        { _id: "item3", dish: { name: "Burger", price: 10.50, description: "Juicy beef burger with lettuce and tomato." }, quantity: 2 },
        { _id: "item4", dish: { name: "Fries", price: 3.50, description: "Crispy golden fries." }, quantity: 2 },
      ],
    },
    {
      _id: "order3",
      createdAt: "2024-11-15T14:00:00Z",
      totalAmount: 20.00,
      status: "Pending",
      orderType: "Delivery",
      items: [
        { _id: "item5", dish: { name: "Pasta Carbonara", price: 15.00, description: "Rich creamy pasta with bacon and parmesan." }, quantity: 1 },
        { _id: "item6", dish: { name: "Garlic Bread", price: 5.00, description: "Toasted bread with garlic butter." }, quantity: 1 },
      ],
    },
  ]);

  const [userDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* User Details Section */}
      {userDetails && (
        <Box
          sx={{
            mb: 4,
            padding: "16px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            User Profile
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
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
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
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
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "12px",
                  backgroundColor: theme.palette.background.default,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Order ID: {order._id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Total: ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    Status: {order.status}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
          }}
        >
          Order Details
        </DialogTitle>
        <DialogContent sx={{ p: 4, mt: 4 }}>
          {selectedOrder && (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                }}
              >
                Order ID: {selectedOrder._id}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ mt: 1 }}
              >
                Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ mt: 1 }}
              >
                Total: ${selectedOrder.totalAmount.toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ mt: 1 }}
              >
                Status: {selectedOrder.status}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ mt: 1 }}
              >
                Order Type: {selectedOrder.orderType}
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  }}
                >
                  Items:
                </Typography>
                {selectedOrder.items.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      mt: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      paddingBottom: "10px",
                    }}
                  >
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
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;
