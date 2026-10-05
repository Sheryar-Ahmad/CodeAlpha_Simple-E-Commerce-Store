import validator from "validator";

import { User } from "../models/User.js";
import { createToken } from "../utils/tokens.js";

function sendAuthResponse(res, user, statusCode = 200) {
  const token = createToken(user);

  res.status(statusCode).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
  });
}

export async function register(req, res, next) {
  try {
    const fullName = String(req.body.fullName || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!fullName || fullName.length > 100) {
      return res.status(400).json({ message: "Full name is required and must be under 100 characters." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    if (!validator.isLength(password, { min: 12, max: 128 })) {
      return res.status(400).json({ message: "Password must be between 12 and 128 characters." });
    }

    const existingUser = await User.findOne({ email }).select("_id").lean();

    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({ fullName, email, password });
    return sendAuthResponse(res, user, 201);
  } catch (error) {
    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!validator.isEmail(email) || !password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = await User.findOne({ email }).select("+password fullName email role");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return sendAuthResponse(res, user);
  } catch (error) {
    return next(error);
  }
}

export function getMe(req, res) {
  res.json({ user: req.user });
}
