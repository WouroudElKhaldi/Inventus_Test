import express from "express";
import {
  addReservation,
  editReservation,
  deleteReservation,
  getAllReservations,
  getReservationById,
  getReservationDash,
} from "../controllers/reservationController.js";
import { authenticate, checkRole } from "../middelwares/auth.js";

const reservationRouter = express.Router();

// Route to add a new reservation
reservationRouter.post(
  "/",
  authenticate,
  checkRole(["Admin", "User"]),
  addReservation
);

// Route to edit an existing reservation
reservationRouter.patch(
  "/",
  authenticate,
  checkRole(["Admin"]),
  editReservation
);

// Route to delete a reservation
reservationRouter.delete(
  "/",
  authenticate,
  checkRole(["Admin"]),
  deleteReservation
);

// Route to get all reservations
reservationRouter.get(
  "/",
  authenticate,
  checkRole(["Admin"]),
  getAllReservations
);

// Route to get all reservations fro dash
reservationRouter.get(
  "/dash",
  authenticate,
  checkRole(["Admin"]),
  getReservationDash
);

// Route to get a reservation by ID
reservationRouter.post(
  "/byId",
  authenticate,
  checkRole(["Admin"]),
  getReservationById
);

export default reservationRouter;
