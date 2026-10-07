import { test } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { randomBytes } from "node:crypto";
import { createApp } from "../src/app.js";
import { Product } from "../src/models/Product.js";
import { products } from "../src/data/products.js";

test("MongoDB shopping flow and invalid requests", async () => {
  // Use a separate database so tests never replace my shop data.
  const uri = `mongodb://127.0.0.1:27017/simple_store_test_${randomBytes(6).toString("hex")}`;
  process.env.USE_MEMORY_DB = "false";
  process.env.JWT_SECRET = randomBytes(32).toString("hex");
  await mongoose.connect(uri);
  const server = createApp().listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}/api`;
  async function request(path, method = "GET", body, token) {
    const response = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    return { status: response.status, data: await response.json() };
  }
  try {
    await Product.insertMany(products);
    const credentials = { fullName: "Test Customer", email: "customer@example.com", password: "test-password-12345" };
    const registration = await request("/auth/register", "POST", credentials);
    assert.equal(registration.status, 201);
    assert.equal(registration.data.user.password, undefined);
    const token = registration.data.token;
    assert.equal((await request("/auth/register", "POST", credentials)).status, 409);
    assert.equal((await request("/auth/login", "POST", { ...credentials, password: "wrong" })).status, 401);
    assert.equal((await request("/auth/login", "POST", credentials)).status, 200);
    assert.equal((await request("/orders")).status, 401);
    const shippingAddress = { fullName: "Test Customer", phone: "03001234567", street: "Test street", city: "Islamabad", region: "ICT", postalCode: "44000", country: "Pakistan" };
    for (const items of [[null], [{ slug: "backpack", quantity: 1.5 }], [{ slug: "backpack", quantity: 11 }], []]) {
      assert.equal((await request("/orders", "POST", { items, shippingAddress }, token)).status, 400);
    }
    const placed = await request("/orders", "POST", { items: [{ slug: "backpack", quantity: 2 }], shippingAddress, total: 1 }, token);
    assert.equal(placed.status, 201);
    assert.equal(placed.data.order.total, 5200);
    const id = placed.data.order._id;
    assert.equal((await request(`/orders/${id}`, "GET", undefined, token)).status, 200);
    assert.equal((await request("/orders/bad-id", "GET", undefined, token)).status, 400);
    const other = await request("/auth/register", "POST", { ...credentials, email: "other@example.com" });
    assert.equal((await request(`/orders/${id}`, "GET", undefined, other.data.token)).status, 404);
    // Reconnecting proves that the order is stored in MongoDB, not process memory.
    await mongoose.disconnect();
    await mongoose.connect(uri);
    assert.equal((await request(`/orders/${id}`, "GET", undefined, token)).data.order.total, 5200);
    const malformed = await fetch(base + "/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
    assert.equal(malformed.status, 400);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
});
