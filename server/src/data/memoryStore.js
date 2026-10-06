import bcrypt from "bcryptjs";

import { products as seedProducts } from "./products.js";

const users = [];
const orders = [];

export const memoryProducts = seedProducts.map((product, index) => ({
  _id: `product-${index + 1}`,
  ...product,
  isActive: true,
  createdAt: new Date(index).toISOString()
}));

export function isMemoryMode() {
  return process.env.USE_MEMORY_DB === "true";
}

export function getMemoryProducts() {
  return memoryProducts.filter((product) => product.isActive);
}

export function getMemoryProductBySlug(slug) {
  return memoryProducts.find((product) => product.slug === slug && product.isActive) || null;
}

export async function createMemoryUser({ fullName, email, password }) {
  const user = {
    _id: `user-${Date.now()}`,
    fullName,
    email,
    password: await bcrypt.hash(password, 12),
    role: "customer"
  };

  users.push(user);
  return user;
}

export function findMemoryUserByEmail(email) {
  return users.find((user) => user.email === email) || null;
}

export function findMemoryUserById(id) {
  const user = users.find((item) => item._id === id);

  if (!user) {
    return null;
  }

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  };
}

export async function compareMemoryPassword(user, password) {
  return bcrypt.compare(password, user.password);
}

export function createMemoryOrder(orderData) {
  const order = {
    _id: `order-${Date.now()}`,
    status: "placed",
    createdAt: new Date().toISOString(),
    ...orderData
  };

  orders.push(order);
  return order;
}

export function getMemoryOrdersByUser(userId) {
  return orders
    .filter((order) => order.user === userId)
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
}

export function getMemoryOrderById(orderId, userId) {
  return orders.find((order) => order._id === orderId && order.user === userId) || null;
}
