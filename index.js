import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/Config.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import tableRouter from "./routes/tableRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 2024;
const app = express();
app.use(express.json());

// configuring cors options for the server to interact with the front end
const corsOption = {
  origin: process.env.FRONT_END_PATH,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cookieParser());
app.use(cors(corsOption));

// all routes
app.use("/user", userRouter);
app.use("/table", tableRouter);
app.use("/reservation", reservationRouter);
app.listen(PORT, () => {
  connect();
  console.log(`running on port: ${PORT}`);
  if (PORT === 2024) {
    console.log(
      "ERROR: issue reading port from process.env. Continue with caution! ..."
    );
  }
});
