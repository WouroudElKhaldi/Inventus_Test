import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "all fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    // Set token in HTTP-only cookie
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Login successful", userRole: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loggedInUser = (req, res) => {
  return res.json({ user: req.user }).status(200);
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signUp = async (req, res) => {
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

    const token = generateToken(newUser);
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Sign up successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};
