import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// forgot password
router.post("/forgot-password", forgotPasswordController);

// protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
