// models/Reservation.js
const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      enum: ["Dining-4", "Dining-8", "Party Room", "Banquet Hall"], // Define possible room types
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    numOfPeople: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
