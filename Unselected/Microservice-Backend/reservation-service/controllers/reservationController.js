const Reservation = require("../models/Reservation");

// Helper function to check time conflict
const checkTimeConflict = async (roomType, floor, startTime, endTime, excludeId = null) => {
  const query = {
    roomType,
    floor,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
    ],
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return await Reservation.findOne(query);
};

// Helper function for standard response
const sendResponse = (res, status, success, msg, data = null) => {
  return res.status(status).json({ success, msg, data });
};

// CRUD operations for reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user })
      .populate("user", "name email")
      .sort({ startTime: 1 });

    sendResponse(res, 200, true, "Reservations retrieved successfully", reservations);
  } catch (err) {
    console.error("Error retrieving reservations:", err);
    sendResponse(res, 500, false, "Server error");
  }
};

exports.createReservation = async (req, res) => {
    try {
      const { floor, roomType, startTime, endTime, numOfPeople, note } = req.body;
  
      // Check if the required fields are provided
      if (!floor || !roomType || !startTime || !endTime || !numOfPeople) {
        return res.status(400).json({ success: false, msg: "All fields are required" });
      }
  
      // Create a new reservation
      const reservation = new Reservation({
        user: "673ca29c30a9e28254ac472b", // This must be set by authMiddleware
        floor,
        roomType,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        numOfPeople,
        note,
      });
  
      await reservation.save();
      res.status(201).json({ success: true, msg: "Reservation created successfully", data: reservation });
    } catch (error) {
      console.error("Error creating reservation:", error.message);
      res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate("user", "name email");

    sendResponse(res, 200, true, "Reservation retrieved successfully", reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { startTime, endTime, roomType, floor, numOfPeople, note } = req.body;
    const reservationId = req.params.id;

    const existingReservation = await Reservation.findById(reservationId);
    if (!existingReservation) {
      return sendResponse(res, 404, false, "Reservation not found");
    }

    const conflict = await checkTimeConflict(
      roomType,
      floor,
      new Date(startTime),
      new Date(endTime),
      reservationId
    );
    if (conflict) {
      return sendResponse(res, 400, false, "Time conflict: Another reservation exists");
    }

    existingReservation.startTime = new Date(startTime);
    existingReservation.endTime = new Date(endTime);
    existingReservation.roomType = roomType;
    existingReservation.floor = floor;
    existingReservation.numOfPeople = numOfPeople;
    existingReservation.note = note;

    await existingReservation.save();
    sendResponse(res, 200, true, "Reservation updated successfully", existingReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return sendResponse(res, 404, false, "Reservation not found");
    }

    if (reservation.user.toString() !== req.user.toString()) {
      return sendResponse(res, 403, false, "Unauthorized to cancel this reservation");
    }

    await Reservation.deleteOne({ _id: reservation._id });
    sendResponse(res, 200, true, "Reservation cancelled successfully");
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};
