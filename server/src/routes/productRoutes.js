import express from "express";

import { getProductBySlug, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

export default router;
