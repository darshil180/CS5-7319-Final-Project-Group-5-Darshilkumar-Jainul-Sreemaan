const express = require("express");
const authMiddleware = require("../middleware/auth"); // Middleware to check if the user is authenticated
const {
  getReservations,
  createReservation,
  getReservationById,
  updateReservation,
  cancelReservation
} = require("../controllers/reservationController");

const router = express.Router();

// Apply authentication middleware globally to routes that require user authentication
router.use(authMiddleware);

// Routes related to reservations
router
  .route("/") 
  // Get all reservations for the authenticated user
  .get(getReservations) 
  // Create a new reservation
  .post(createReservation);

router
  .route("/:id") 
  // Get a reservation by its ID
  .get(getReservationById)
  // Update an existing reservation by its ID
  .put(updateReservation) 
  // Delete a reservation by its ID
  .delete(cancelReservation);

module.exports = router;
