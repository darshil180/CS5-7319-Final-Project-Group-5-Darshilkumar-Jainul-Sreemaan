const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.get("/", authMiddleware, reservationController.getReservations);
router.post("/", authMiddleware, reservationController.createReservation);
router.get("/:id", authMiddleware, reservationController.getReservationById);
router.put("/:id", authMiddleware, reservationController.updateReservation);
router.delete("/:id", authMiddleware, reservationController.cancelReservation);

module.exports = router;
