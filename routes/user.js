import express from "express";
import {
  signup,
  login,
  googleAuth,
  googleCallback,
  logout,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyUserEmail,
  forgotPassword,
} from "../controllers/user.js";
import {
  signupValidator,
  loginValidator,
  createUserValidator,
  updateUserValidator,
} from "../validators/user.js";
import { validationResultHandler } from "../middlewares/validateResult.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

/* ---------- Auth ---------- */
router.post("/signup", signupValidator, validationResultHandler, signup);
router.post("/login", loginValidator, validationResultHandler, login);
router.get("/logout", logout);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/verify/:id", verifyUserEmail);
router.post("/forgotPassword", forgotPassword);

router.post(
  "/",
  protect(["admin"]),
  createUserValidator,
  validationResultHandler,
  createUser
);
router.put(
  "/:userId",
  protect(["admin"]),
  updateUserValidator,
  validationResultHandler,
  updateUser
);
router.delete("/:id", 
  protect(["admin"]), 
  deleteUser);

export default router;
