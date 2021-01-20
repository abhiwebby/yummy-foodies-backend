import express from "express";
import {
  addUser,
  login,
  deleteUser,
  tokenIsValid,
} from "../controllers/userCtrl.js";
import { auth } from "../controllers/authCtrl.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/login", login);
router.delete("/delete", auth, deleteUser);
router.post("/tokenisvalid", tokenIsValid);

export default router;
