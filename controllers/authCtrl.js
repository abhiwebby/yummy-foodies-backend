import config from "../config/config.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ Message: "No authentication token, authorization denied" });
    }
    const verified = jwt.verify(token, config.jwtSecret);
    if (!verified) {
      return res
        .status(401)
        .json({ Message: "Token verification failed, authorization denied" });
    }
    req.user = verified.id;
    next();
    console.log(verified);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
