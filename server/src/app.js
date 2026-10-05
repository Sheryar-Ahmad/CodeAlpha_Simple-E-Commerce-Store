import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "10kb" }));

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: "draft-7",
      legacyHeaders: false
    })
  );

  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "Simple Store API"
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/products", productRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
