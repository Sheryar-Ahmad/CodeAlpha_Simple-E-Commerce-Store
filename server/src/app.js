import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const allowedOrigins = new Set([
  process.env.CLIENT_ORIGIN,
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "null"
].filter(Boolean));

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "10kb" }));

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("This origin is not allowed by CORS."));
      },
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

  app.get("/api", (req, res) => {
    res.json({
      service: "Simple Store API",
      status: "ok",
      routes: {
        health: "GET /api/health",
        products: "GET /api/products",
        productDetails: "GET /api/products/:slug",
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        currentUser: "GET /api/auth/me",
        orders: "GET /api/orders, POST /api/orders",
        orderDetails: "GET /api/orders/:id"
      }
    });
  });

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
