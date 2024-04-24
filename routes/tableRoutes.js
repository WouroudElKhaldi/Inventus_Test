import express from "express";
import {
  addTable,
  editTable,
  deleteTable,
  getAllTables,
  getTableById,
  editPosition,
} from "../controllers/tableController.js";
import { authenticate, checkRole } from "../middelwares/auth.js";

const tableRouter = express.Router();

// Route to add a new table
tableRouter.post("/", authenticate, checkRole(["Admin"]), addTable);

// Route to edit an existing table
tableRouter.patch("/", authenticate, checkRole(["Admin"]), editTable);

// Route to edit an existing table
tableRouter.patch(
  "/position",
  authenticate,
  checkRole(["Admin"]),
  editPosition
);

// Route to delete a table
tableRouter.delete("/", authenticate, checkRole(["Admin"]), deleteTable);

// Route to get all tables
tableRouter.get("/", getAllTables);

// Route to get a table by ID
tableRouter.post("/byId", getTableById);

export default tableRouter;
