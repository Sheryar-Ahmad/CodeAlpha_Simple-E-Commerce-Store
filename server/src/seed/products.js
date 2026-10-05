import "dotenv/config";

import { connectDatabase } from "../config/database.js";
import { products } from "../data/products.js";
import { Product } from "../models/Product.js";

async function seedProducts() {
  await connectDatabase();

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} products.`);
  process.exit(0);
}

seedProducts().catch((error) => {
  console.error("Product seeding failed:", error.message);
  process.exit(1);
});
