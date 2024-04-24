import mongoose from "mongoose";

// Define the Reservation schema
const reservationSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    duration: {
      // for how many hours
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Reservation model
const Reservation = mongoose.model("Reservation", reservationSchema);

// Export the Reservation model
export default Reservation;
