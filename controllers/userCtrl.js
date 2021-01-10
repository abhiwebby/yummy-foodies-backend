import config from "../config/config.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const getUsers = (req, res) => {
//   res.send("get all users data...");
// };

// Add User
export const addUser = async (req, res) => {
  try {
    let { email, password, confirmPassword, username } = req.body;

    // validate credentials
    // New User
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        Message: "fields are empty!",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        Message: "password at least 6 characters",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        Message: "password is mismatched",
      });
    }

    // Existing User
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        Message: "Email Id already exist!",
      });
    }
    if (!username) {
      username = email;
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    res.json({ Status: savedUser });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate credentials
    if (!email || !password) {
      return res.status(400).json({ Message: "fields are empty!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ Message: "There is no Account with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ Message: "Invalid Credentials" });
    }

    // JWT validation
    const token = jwt.sign({ id: user._id }, config.jwtSecret);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
