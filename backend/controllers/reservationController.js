const Reservation = require("../models/Reservation");

// Helper function to check time conflict
const checkTimeConflict = async (roomType, floor, startTime, endTime, excludeId = null) => {
  const query = {
    roomType,
    floor, // Include floor in the conflict check
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
    ],
  };

  if (excludeId) {
    query._id = { $ne: excludeId }; // Exclude the current reservation in updates
  }

  return await Reservation.findOne(query);
};

// Helper function for standard response
const sendResponse = (res, status, success, msg, data = null) => {
  return res.status(status).json({ success, msg, data });
};

// Get the user's reservations
exports.getReservations = async (req, res) => {
  try {
    const userId = req.user; // User ID from authenticated user

    // Fetch the reservations for the user, populating the user details
    const reservations = await Reservation.find({ user: userId })
      .populate("user", "name email")
      .sort({ startTime: 1 });

    // Send appropriate response based on result
    if (!reservations.length) {
      return sendResponse(res, 404, false, "No reservations found for this user");
    }

    sendResponse(res, 200, true, "Reservations retrieved successfully", reservations);
  } catch (err) {
    console.error("Error retrieving reservations:", err);
    sendResponse(res, 500, false, "Server error");
  }
};

// Make a reservation
exports.createReservation = async (req, res) => {
  try {
    const { floor, roomType, startTime, endTime, numOfPeople, note } = req.body;

    // Validate input data
    if (!floor || !roomType || !startTime || !endTime || !numOfPeople) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    // Check for time conflict before creating reservation
    const conflict = await checkTimeConflict(roomType, floor, new Date(startTime), new Date(endTime));
    if (conflict) {
      return sendResponse(res, 400, false, "Time conflict: Another reservation exists during this period.");
    }

    // Create reservation and save it
    const reservation = new Reservation({
      user: req.user,
      floor,
      roomType,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      numOfPeople,
      note,
    });

    await reservation.save();
    sendResponse(res, 201, true, "Reservation created successfully!", reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};

// Get a reservation by its ID
exports.getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    
    const reservation = await Reservation.findById(reservationId)
      .populate("user", "name email");

    if (!reservation) {
      return sendResponse(res, 404, false, "Reservation not found");
    }

    sendResponse(res, 200, true, "Reservation retrieved successfully", reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const { startTime, endTime, roomType, floor, numOfPeople, note } = req.body;
    const reservationId = req.params.id;

    const existingReservation = await Reservation.findById(reservationId);
    if (!existingReservation) {
      return sendResponse(res, 404, false, "Reservation not found");
    }

    // Validate time conflict for updated reservation
    const conflict = await checkTimeConflict(roomType, floor, new Date(startTime), new Date(endTime), reservationId);
    if (conflict) {
      return sendResponse(res, 400, false, "Time conflict: Another reservation exists during this period.");
    }

    // Update reservation with new details
    existingReservation.startTime = new Date(startTime);
    existingReservation.endTime = new Date(endTime);
    existingReservation.roomType = roomType;
    existingReservation.floor = floor;
    existingReservation.numOfPeople = numOfPeople;
    existingReservation.note = note;

    await existingReservation.save();
    sendResponse(res, 200, true, "Reservation updated successfully!", existingReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};

// Cancel a reservation
exports.cancelReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return sendResponse(res, 404, false, "Reservation not found");
    }

    // Check if the user trying to cancel is the owner of the reservation
    if (reservation.user.toString() !== req.user.toString()) {
      return sendResponse(res, 403, false, "You are not authorized to cancel this reservation");
    }

    // Delete the reservation
    await Reservation.deleteOne({ _id: reservationId });
    sendResponse(res, 200, true, "Reservation cancelled successfully");
  } catch (error) {
    console.error("Error canceling reservation:", error);
    sendResponse(res, 500, false, "Server error");
  }
};
