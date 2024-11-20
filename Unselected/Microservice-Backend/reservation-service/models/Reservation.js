const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  floor: { type: Number, required: true },
  roomType: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  numOfPeople: { type: Number, required: true },
  note: { type: String },
});

module.exports = mongoose.model("Reservation", reservationSchema);
