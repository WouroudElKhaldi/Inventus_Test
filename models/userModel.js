import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["User", "Admin"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
