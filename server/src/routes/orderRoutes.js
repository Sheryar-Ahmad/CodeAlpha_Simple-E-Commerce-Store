import express from "express";

import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getMyOrders).post(createOrder);
router.get("/:id", getOrderById);

export default router;
