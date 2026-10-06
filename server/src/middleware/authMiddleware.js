import jwt from "jsonwebtoken";

import { findMemoryUserById, isMemoryMode } from "../data/memoryStore.js";
import { User } from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = isMemoryMode()
      ? findMemoryUserById(payload.userId)
      : await User.findById(payload.userId).select("_id fullName email role").lean();

    if (!user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication required." });
  }
}
