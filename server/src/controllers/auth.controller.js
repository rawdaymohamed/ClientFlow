import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { authCookieOptions } from "../utils/cookieOptions.js";
import { COOKIE_NAME } from "../constants/index.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.cookie(COOKIE_NAME, token, authCookieOptions);

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString());

    res.cookie(COOKIE_NAME, token, authCookieOptions);

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie(COOKIE_NAME, authCookieOptions);

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const protectedRoute = async (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "You have accessed a protected route",
    data: {
      userId: req.user.id,
    },
  });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Current user fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
