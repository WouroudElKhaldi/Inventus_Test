import mongoose from "mongoose";

// Define the Table schema
const tableSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    minCapacity: {
      type: Number,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Availble",
      enum: ["Availble", "Reserved"],
    },
    xPosition: {
      type: String,
      default: "0",
    },
    yPosition: {
      type: String,
      default: "0",
    },
    typeee: {
      type: String,
      enum: ["Round", "Rectangle", "Square", "Triangle"],
    },
    locked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the Table model
const Table = mongoose.model("Table", tableSchema);

// Export the Table model
export default Table;
