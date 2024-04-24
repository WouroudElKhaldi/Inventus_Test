import Reservation from "../models/reservationModel.js";
import Table from "../models/tableModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const addReservation = async (req, res) => {
  const { tableId, date, time, duration, userId } = req.body;

  try {
    // Check if all required fields are provided
    if (!tableId || !date || !time || !duration) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    if (!mongoose.isValidObjectId(tableId)) {
      return res.status(400).json({ error: "Invalid table ID" });
    }
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    // Check if table with the specified ID exists
    const existingTable = await Table.findById(tableId);
    if (!existingTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    // Check if user with the specified ID exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const newReservation = await Reservation.create({
      userId: userId,
      tableId: tableId,
      date: date,
      time: time,
      duration: duration,
    });
    return res.status(200).json(newReservation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const editReservation = async (req, res) => {
  const { id, date, time, duration } = req.body;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid reservation ID" });
    }

    // Check if reservation exists
    const existingReservation = await Reservation.findById(id);
    if (!existingReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Update reservation
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { date: date, time: time, duration: duration },
      { new: true }
    );
    return res.status(200).json(updatedReservation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  const id = req.body.id;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid reservation ID" });
    }

    // Check if reservation exists
    const existingReservation = await Reservation.findById(id);
    if (!existingReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    // Delete reservation
    await Reservation.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("tableId userId");
    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const getReservationById = async (req, res) => {
  const id = req.body.id;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid reservation ID" });
    }

    // Find reservation by ID
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const getReservationDash = async (req, res) => {
  try {
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: "users", // Assuming the collection name for users is "users"
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "tables", // Assuming the collection name for tables is "tables"
          localField: "tableId",
          foreignField: "_id",
          as: "table",
        },
      },
      {
        $unwind: "$table",
      },
      {
        $project: {
          _id: 1,
          date: 1,
          time: 1,
          duration: 1,
          userId: 1,
          tableId: 1,
          user_name: "$user.fullName",
          table_number: "$table.number",
        },
      },
    ]);

    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};
