import express from "express";
import {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

import {
  logIn,
  logOut,
  signUp,
  loggedInUser,
} from "../controllers/authController.js";
import { authenticate, checkRole } from "../middelwares/auth.js";

const userRouter = express.Router();

// Route to add a new user
userRouter.post("/", authenticate, checkRole(["Admin"]), addUser);

// Route to edit an existing user
userRouter.patch("/", authenticate, checkRole(["Admin"]), editUser);

// Route to delete a user
userRouter.delete("/", authenticate, checkRole(["Admin"]), deleteUser);

// Route to get all users
userRouter.get("/", authenticate, checkRole(["Admin"]), getAllUsers);

// Route to get a user by ID
userRouter.post("/byId", authenticate, checkRole(["Admin"]), getUserById);

// Route to singup
userRouter.post("/signup", signUp);

// Route to login
userRouter.post("/login", logIn);

// Router to  logout
userRouter.post("/logout", logOut);

// Route to get information about logged in user
userRouter.post("/logged-in", authenticate, loggedInUser);
export default userRouter;
