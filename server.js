import express from "express";
import config from "./config/config.js";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

// database connection details
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("API is running"));

app.listen(config.port, () =>
  console.log(`Server is running on port: ${config.port}`)
);
