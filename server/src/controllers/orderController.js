import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import {
  createMemoryOrder,
  getMemoryOrderById,
  getMemoryOrdersByUser,
  getMemoryProducts,
  isMemoryMode
} from "../data/memoryStore.js";

const DELIVERY_CHARGE = 200;
const MAX_QUANTITY = 10;

function cleanString(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function cleanQuantity(value) {
  const quantity = Number.parseInt(value, 10);

  if (Number.isNaN(quantity) || quantity < 1) {
    return 1;
  }

  return Math.min(quantity, MAX_QUANTITY);
}

function cleanShippingAddress(body) {
  return {
    fullName: cleanString(body.fullName, 100),
    phone: cleanString(body.phone, 30),
    street: cleanString(body.street, 300),
    city: cleanString(body.city, 100),
    region: cleanString(body.region, 100),
    postalCode: cleanString(body.postalCode, 20),
    country: cleanString(body.country, 100),
    deliveryNotes: cleanString(body.deliveryNotes, 500)
  };
}

function hasRequiredAddressFields(address) {
  return Boolean(
    address.fullName &&
      address.phone &&
      address.street &&
      address.city &&
      address.region &&
      address.postalCode &&
      address.country
  );
}

export async function createOrder(req, res, next) {
  try {
    const requestedItems = Array.isArray(req.body.items) ? req.body.items : [];
    const shippingAddress = cleanShippingAddress(req.body.shippingAddress || {});

    if (requestedItems.length === 0) {
      return res.status(400).json({ message: "Add at least one product before placing an order." });
    }

    if (!hasRequiredAddressFields(shippingAddress)) {
      return res.status(400).json({ message: "Complete all required delivery fields." });
    }

    const quantitiesBySlug = new Map();

    requestedItems.forEach((item) => {
      const slug = cleanString(item.slug, 60).toLowerCase();

      if (slug) {
        const nextQuantity = (quantitiesBySlug.get(slug) || 0) + cleanQuantity(item.quantity);
        quantitiesBySlug.set(slug, Math.min(nextQuantity, MAX_QUANTITY));
      }
    });

    if (quantitiesBySlug.size === 0) {
      return res.status(400).json({ message: "Add at least one valid product before placing an order." });
    }

    const products = isMemoryMode()
      ? getMemoryProducts().filter((product) => quantitiesBySlug.has(product.slug))
      : await Product.find({
          slug: { $in: [...quantitiesBySlug.keys()] },
          isActive: true
        });

    if (products.length !== quantitiesBySlug.size) {
      return res.status(400).json({ message: "One or more products are no longer available." });
    }

    const orderItems = products.map((product) => {
      const quantity = quantitiesBySlug.get(product.slug);

      if (quantity < 1) {
        throw new Error(`${product.name} is out of stock.`);
      }

      if (quantity > product.stock) {
        const label = product.stock === 1 ? "item" : "items";
        const error = new Error(`${product.name} has only ${product.stock} ${label} available.`);
        error.statusCode = 400;
        throw error;
      }

      return {
        product: product._id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity
      };
    });

    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;

    const orderInput = {
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: "cash-on-delivery",
      subtotal,
      deliveryCharge,
      total: subtotal + deliveryCharge
    };

    const order = isMemoryMode() ? createMemoryOrder(orderInput) : await Order.create(orderInput);

    return res.status(201).json({ order });
  } catch (error) {
    return next(error);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = isMemoryMode()
      ? getMemoryOrdersByUser(req.user._id)
      : await Order.find({ user: req.user._id })
          .select("items subtotal deliveryCharge total status createdAt")
          .sort({ createdAt: -1 })
          .lean();

    return res.json({ orders });
  } catch (error) {
    return next(error);
  }
}

export async function getOrderById(req, res, next) {
  try {
    const order = isMemoryMode()
      ? getMemoryOrderById(req.params.id, req.user._id)
      : await Order.findOne({
          _id: req.params.id,
          user: req.user._id
        }).lean();

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    return res.json({ order });
  } catch (error) {
    return next(error);
  }
}
