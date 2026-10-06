import { Product } from "../models/Product.js";
import { getMemoryProductBySlug, getMemoryProducts, isMemoryMode } from "../data/memoryStore.js";

export async function getProducts(req, res, next) {
  try {
    if (isMemoryMode()) {
      return res.json({ products: getMemoryProducts() });
    }

    const products = await Product.find({ isActive: true })
      .select("slug name description price image category stock highlights")
      .sort({ createdAt: 1 })
      .lean();

    res.json({ products });
  } catch (error) {
    next(error);
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    if (isMemoryMode()) {
      const product = getMemoryProductBySlug(req.params.slug);

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      return res.json({ product });
    }

    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true
    })
      .select("slug name description price image category stock highlights")
      .lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json({ product });
  } catch (error) {
    return next(error);
  }
}
