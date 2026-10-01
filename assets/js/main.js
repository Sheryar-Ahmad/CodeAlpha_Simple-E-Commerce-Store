/*
  Simple Store front-end behavior
  --------------------------------
  This file keeps the first JavaScript milestone small and readable:
  - product data lives in one catalog object
  - cart data is saved in localStorage
  - every value from storage is validated before use
  - the DOM is updated with textContent/createElement, not unsafe HTML strings
*/

const CART_STORAGE_KEY = "simpleStoreCart";
const ORDER_STORAGE_KEY = "simpleStoreLatestOrder";
const DELIVERY_CHARGE = 200;
const MAX_QUANTITY = 10;

const PRODUCTS = {
  backpack: {
    id: "backpack",
    name: "Everyday Backpack",
    price: 2500,
    url: "product.html#backpack"
  },
  notebook: {
    id: "notebook",
    name: "Study Notebook",
    price: 450,
    url: "product.html#notebook"
  },
  lamp: {
    id: "lamp",
    name: "Desk Lamp",
    price: 1800,
    url: "product.html#lamp"
  }
};

const currencyFormatter = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0
});

function formatMoney(amount) {
  return currencyFormatter.format(amount).replace("PKR", "PKR ");
}

function clampQuantity(value) {
  const quantity = Number.parseInt(value, 10);

  if (Number.isNaN(quantity) || quantity < 1) {
    return 1;
  }

  return Math.min(quantity, MAX_QUANTITY);
}

function getStoredCart() {
  try {
    const parsedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {};
    const safeCart = {};

    Object.entries(parsedCart).forEach(([productId, quantity]) => {
      if (PRODUCTS[productId]) {
        safeCart[productId] = clampQuantity(quantity);
      }
    });

    return safeCart;
  } catch (error) {
    localStorage.removeItem(CART_STORAGE_KEY);
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

function getCartItems(cart = getStoredCart()) {
  return Object.entries(cart).map(([productId, quantity]) => {
    const product = PRODUCTS[productId];

    return {
      ...product,
      quantity,
      lineTotal: product.price * quantity
    };
  });
}

function getCartTotals(cart = getStoredCart()) {
  const items = getCartItems(cart);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const delivery = subtotal > 0 ? DELIVERY_CHARGE : 0;

  return {
    items,
    subtotal,
    delivery,
    total: subtotal + delivery
  };
}

function setStatusMessage(message) {
  let status = document.querySelector("[data-store-status]");

  if (!status) {
    status = document.createElement("p");
    status.dataset.storeStatus = "";
    status.id = "store-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    document.querySelector("main")?.prepend(status);
  }

  status.textContent = message;
}

function addToCart(productId, quantity = 1) {
  if (!PRODUCTS[productId]) {
    return;
  }

  const cart = getStoredCart();
  const currentQuantity = cart[productId] || 0;
  cart[productId] = Math.min(currentQuantity + clampQuantity(quantity), MAX_QUANTITY);
  saveCart(cart);
  setStatusMessage(`${PRODUCTS[productId].name} was added to your cart.`);
}

function updateCartItem(productId, quantity) {
  if (!PRODUCTS[productId]) {
    return;
  }

  const cart = getStoredCart();
  cart[productId] = clampQuantity(quantity);
  saveCart(cart);
  renderCartPage();
}

function removeCartItem(productId) {
  const cart = getStoredCart();
  delete cart[productId];
  saveCart(cart);
  renderCartPage();
  setStatusMessage("Item removed from your cart.");
}

function clearCart() {
  saveCart({});
  renderCartPage();
  setStatusMessage("Your cart is now empty.");
}

function updateCartCount() {
  const totalItems = getCartItems().reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll('a[href="cart.html"]').forEach((cartLink) => {
    const label = totalItems === 1 ? "Cart (1 item)" : `Cart (${totalItems} items)`;
    cartLink.textContent = totalItems > 0 ? label : "Cart";
    cartLink.setAttribute("aria-label", label);
  });
}

function updateSummaryTotals(totals) {
  document.querySelectorAll("[data-cart-subtotal]").forEach((element) => {
    element.textContent = formatMoney(totals.subtotal);
  });

  document.querySelectorAll("[data-cart-delivery]").forEach((element) => {
    element.textContent = formatMoney(totals.delivery);
  });

  document.querySelectorAll("[data-cart-total]").forEach((element) => {
    element.textContent = formatMoney(totals.total);
  });
}

function createCartRow(item) {
  const row = document.createElement("tr");
  const nameCell = document.createElement("th");
  const priceCell = document.createElement("td");
  const quantityCell = document.createElement("td");
  const totalCell = document.createElement("td");
  const actionCell = document.createElement("td");
  const link = document.createElement("a");
  const label = document.createElement("label");
  const quantityInput = document.createElement("input");
  const removeButton = document.createElement("button");

  nameCell.scope = "row";
  link.href = item.url;
  link.textContent = item.name;
  nameCell.append(link);

  priceCell.textContent = formatMoney(item.price);

  label.htmlFor = `cart-${item.id}-quantity`;
  label.textContent = `${item.name} quantity`;

  quantityInput.id = `cart-${item.id}-quantity`;
  quantityInput.type = "number";
  quantityInput.min = "1";
  quantityInput.max = String(MAX_QUANTITY);
  quantityInput.step = "1";
  quantityInput.value = String(item.quantity);
  quantityInput.dataset.cartQuantity = item.id;

  quantityCell.append(label, quantityInput);
  totalCell.textContent = formatMoney(item.lineTotal);

  removeButton.type = "button";
  removeButton.textContent = `Remove ${item.name}`;
  removeButton.dataset.removeFromCart = item.id;
  actionCell.append(removeButton);

  row.append(nameCell, priceCell, quantityCell, totalCell, actionCell);
  return row;
}

function renderCartPage() {
  const cartBody = document.querySelector("[data-cart-items]");

  if (!cartBody) {
    return;
  }

  const totals = getCartTotals();
  const cartLayout = document.querySelector(".cart-layout");
  const emptyCart = document.querySelector("#empty-cart");
  const checkoutLink = document.querySelector("[data-checkout-link]");
  const clearButton = document.querySelector("[data-clear-cart]");

  cartBody.replaceChildren();
  updateSummaryTotals(totals);

  if (totals.items.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = "Your cart is empty.";
    row.append(cell);
    cartBody.append(row);

    cartLayout.hidden = true;
    emptyCart.hidden = false;
    checkoutLink?.setAttribute("aria-disabled", "true");
    clearButton?.setAttribute("disabled", "");
    return;
  }

  totals.items.forEach((item) => {
    cartBody.append(createCartRow(item));
  });

  cartLayout.hidden = false;
  emptyCart.hidden = true;
  checkoutLink?.removeAttribute("aria-disabled");
  clearButton?.removeAttribute("disabled");
}

function renderCheckoutPage() {
  const checkoutItems = document.querySelector("[data-checkout-items]");

  if (!checkoutItems) {
    return;
  }

  const totals = getCartTotals();
  const submitButton = document.querySelector("[data-checkout-form] button[type='submit']");

  checkoutItems.replaceChildren();
  updateSummaryTotals(totals);

  if (totals.items.length === 0) {
    const item = document.createElement("li");
    item.textContent = "Your cart is empty. Add a product before placing an order.";
    checkoutItems.append(item);
    submitButton?.setAttribute("disabled", "");
    return;
  }

  totals.items.forEach((cartItem) => {
    const item = document.createElement("li");
    item.textContent = `${cartItem.name} x ${cartItem.quantity}: ${formatMoney(cartItem.lineTotal)}`;
    checkoutItems.append(item);
  });

  submitButton?.removeAttribute("disabled");
}

function showCheckoutError(message) {
  const error = document.querySelector("#checkout-error");

  if (!error) {
    return;
  }

  error.textContent = message;
  error.hidden = false;
}

function clearCheckoutError() {
  const error = document.querySelector("#checkout-error");

  if (!error) {
    return;
  }

  error.textContent = "";
  error.hidden = true;
}

function getCheckoutFormData(form) {
  const formData = new FormData(form);

  return {
    fullName: String(formData.get("fullName") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    street: String(formData.get("street") || "").trim(),
    city: String(formData.get("city") || "").trim(),
    region: String(formData.get("region") || "").trim(),
    postalCode: String(formData.get("postalCode") || "").trim(),
    country: String(formData.get("country") || "").trim(),
    deliveryNotes: String(formData.get("deliveryNotes") || "").trim()
  };
}

function placeDemoOrder(form) {
  const totals = getCartTotals();

  if (totals.items.length === 0) {
    showCheckoutError("Add at least one product before placing an order.");
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const order = {
    reference: `DEMO-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    customer: getCheckoutFormData(form),
    items: totals.items,
    subtotal: totals.subtotal,
    delivery: totals.delivery,
    total: totals.total
  };

  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  saveCart({});
  window.location.href = "order-confirmation.html";
}

function getStoredOrder() {
  try {
    const order = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY));

    if (!order || !Array.isArray(order.items)) {
      return null;
    }

    const safeCart = {};

    order.items.forEach((item) => {
      if (PRODUCTS[item.id]) {
        safeCart[item.id] = clampQuantity(item.quantity);
      }
    });

    const totals = getCartTotals(safeCart);

    if (totals.items.length === 0) {
      return null;
    }

    return {
      ...order,
      items: totals.items,
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      total: totals.total
    };
  } catch (error) {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    return null;
  }
}

function renderConfirmationPage() {
  const orderItems = document.querySelector("[data-confirmation-items]");

  if (!orderItems) {
    return;
  }

  const order = getStoredOrder();

  if (!order) {
    updateSummaryTotals({ subtotal: 0, delivery: 0, total: 0 });
    return;
  }

  document.querySelector("[data-order-reference]").textContent = order.reference;
  document.querySelector("[data-order-status]").textContent = "Demo order placed";
  document.querySelector("[data-order-address]").textContent = `${order.customer.street}, ${order.customer.city}, ${order.customer.region}, ${order.customer.country}`;

  orderItems.replaceChildren();
  order.items.forEach((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = item.url;
    link.textContent = item.name;
    listItem.append(link, ` x ${item.quantity}: ${formatMoney(item.lineTotal)}`);
    orderItems.append(listItem);
  });

  updateSummaryTotals(order);
}

function bindProductButtons() {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.productId, 1);
    });
  });

  document.querySelectorAll("[data-product-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const quantityInput = form.querySelector('input[name="quantity"]');
      addToCart(form.dataset.productId, quantityInput?.value || 1);
    });
  });
}

function bindCartActions() {
  document.addEventListener("input", (event) => {
    const input = event.target.closest("[data-cart-quantity]");

    if (input) {
      updateCartItem(input.dataset.cartQuantity, input.value);
    }
  });

  document.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-from-cart]");
    const clearButton = event.target.closest("[data-clear-cart]");

    if (removeButton) {
      removeCartItem(removeButton.dataset.removeFromCart);
    }

    if (clearButton) {
      clearCart();
    }
  });
}

function bindCheckoutForm() {
  const form = document.querySelector("[data-checkout-form]");

  if (!form) {
    return;
  }

  form.addEventListener("input", clearCheckoutError);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    placeDemoOrder(form);
  });
}

bindProductButtons();
bindCartActions();
bindCheckoutForm();
updateCartCount();
renderCartPage();
renderCheckoutPage();
renderConfirmationPage();
