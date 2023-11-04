import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, securityAnswer } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!securityAnswer) {
      return res.send({ message: "Security answer is required" });
    }
    // check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      securityAnswer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error while registering user");
    res.status(500).send({
      success: false,
      message: "Error in registering user",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.log("Error while logging in user", error);
    res.status(500).send({
      success: false,
      message: "Error in logging in user",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;
    if (!email) {
      return res.status(404).send({
        message: "Email is required",
      });
    }
    if (!securityAnswer) {
      return res.status(404).send({
        message: "Security answer is required",
      });
    }
    if (!newPassword) {
      return res.status(404).send({
        message: "New password is required",
      });
    }

    const user = await userModel.findOne({ email, securityAnswer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or security answer",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error while reseting password", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
