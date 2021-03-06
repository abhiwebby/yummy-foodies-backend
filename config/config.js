import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.CONNECTION_URL,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
};

export default config;
