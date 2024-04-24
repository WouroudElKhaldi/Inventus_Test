import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  const { fullName, role, email, password } = req.body;

  try {
    if (!fullName || !role || !email || !password) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }
    // Email validation regex (can be refined further)
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    // Check if role is valid
    if (!["Admin", "User"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName: fullName,
      role: role,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const editUser = async (req, res) => {
  const { id, fullName, role, email, password } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Email validation regex (can be refined further)
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    // Check if role is valid
    if (role && !["Admin", "User"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const existingEmail = await User.findOne({ email, _id: { $ne: id } }); // Check for duplicate email excluding current user
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    let hashedPassword = password ? password : "";
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        role,
        email,
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.body.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = await User.findByIdAndDelete(user._id);
    if (!deletedUser) {
      return res.status(404).json({ error: "An error occured" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ fullName: 1 }); // Sort by fullName alphabetically
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};

export const getUserById = async (req, res) => {
  const id = req.body.id;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", msg: error });
  }
};
