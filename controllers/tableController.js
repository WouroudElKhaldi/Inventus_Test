import Table from "../models/tableModel.js";
import mongoose from "mongoose";

export const addTable = async (req, res) => {
  const { number, minCapacity, maxCapacity, status, locked } = req.body;

  try {
    // Checking if all required fields are provided
    if (!number || !minCapacity || !maxCapacity) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // hande if there is a table with the same number that already exists
    const existingTable = await Table.findOne({ number });
    if (existingTable) {
      return res.status(400).json({ error: "Table number already exists" });
    }

    // Ensure minCapacity is less than maxCapacity
    if (parseInt(minCapacity) >= parseInt(maxCapacity)) {
      return res
        .status(400)
        .json({ error: "minCapacity must be less than maxCapacity" });
    }

    const newTable = await Table.create({
      number: number,
      minCapacity: minCapacity,
      maxCapacity: maxCapacity,
      status: status,
      locked: locked,
    });
    return res.status(201).json(newTable);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const editTable = async (req, res) => {
  const {
    id,
    number,
    minCapacity,
    maxCapacity,
    status,
    xPosition,
    yPosition,
    typeee,
    locked,
  } = req.body;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid table ID" });
    }

    // Check if table exists
    const existingTable = await Table.findById(id);
    if (!existingTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    // Check if table number is being changed and if the new number already exists
    if (number && number !== existingTable.number) {
      const tableWithSameNumber = await Table.findOne({ number });
      if (tableWithSameNumber) {
        return res.status(400).json({ error: "Table number already exists" });
      }
    }

    // Ensure minCapacity is less than maxCapacity if they were edited
    if (minCapacity && !maxCapacity) {
      if (parseInt(minCapacity) > parseInt(existingTable.maxCapacity)) {
        return res
          .status(400)
          .json({ error: "minCapacity must be less than maxCapacity" });
      }
    } else if (maxCapacity && !minCapacity) {
      if (parseInt(existingTable.minCapacity) > parseInt(maxCapacity)) {
        return res
          .status(400)
          .json({ error: "minCapacity must be less than maxCapacity" });
      }
    } else if (maxCapacity && minCapacity) {
      if (minCapacity && maxCapacity) {
        if (parseInt(minCapacity) > parseInt(maxCapacity)) {
          return res
            .status(400)
            .json({ error: "minCapacity must be less than maxCapacity" });
        }
      }
    }

    // Update table
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      {
        number: number,
        minCapacity: minCapacity,
        maxCapacity: maxCapacity,
        status: status,
        xPosition: xPosition,
        yPosition: yPosition,
        typeee: typeee,
        locked: locked,
      },
      { new: true }
    );
    return res.status(200).json(updatedTable);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const editPosition = async (req, res) => {
  const { id, xPosition, yPosition } = req.body;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid table ID" });
    }

    // Update table
    const updatedTable = await Table.findByIdAndUpdate(
      id,
      {
        xPosition: xPosition,
        yPosition: yPosition,
      },
      { new: true }
    );
    return res.status(200).json(updatedTable);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const deleteTable = async (req, res) => {
  const id = req.body.id;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid table ID" });
    }

    // Check if table exists
    const existingTable = await Table.findById(id);
    if (!existingTable) {
      return res.status(404).json({ error: "Table not found" });
    }

    // Delete table
    await Table.findByIdAndDelete(id);
    return res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    return res.status(200).json(tables);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const getTableById = async (req, res) => {
  const id = req.body.id;

  try {
    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid table ID" });
    }

    // Find table by ID
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }

    return res.status(200).json(table);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};
