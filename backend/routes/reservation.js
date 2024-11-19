const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getReservations,
  createReservation,
  getReservationById,
  updateReservation,
  cancelReservation,
} = require("../controllers/reservationController");

const router = express.Router();

// Apply authentication middleware globally to routes that require user authentication
router.use(authMiddleware);

// Routes related to reservations
router.route("/").get(getReservations).post(createReservation);

router
  .route("/:id")
  .get(getReservationById)
  .put(updateReservation)
  .delete(cancelReservation);

module.exports = router;
