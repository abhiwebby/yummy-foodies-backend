import express from "express";
import config from "./config/config.js";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userRoutes from "./routes/userRoutes.js";

const app = express();

// database connection details
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.listen(config.port, () =>
  console.log(`Server is running on port: ${config.port}`)
);

// initiate Routes
app.use("/users", userRoutes);
