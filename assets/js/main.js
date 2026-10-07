/*
  Simple Store front-end behavior
  --------------------------------
  I keep shared page behavior here so the cart works across all pages:
  - product data lives in one catalog object
  - cart and auth data are saved in localStorage
  - checkout sends real orders to the Express API when a user is logged in
  - every value from storage is validated before use
  - the DOM is updated with textContent/createElement, not unsafe HTML strings
*/

const CART_STORAGE_KEY = "simpleStoreCart";
const ORDER_STORAGE_KEY = "simpleStoreLatestOrder";
const AUTH_STORAGE_KEY = "simpleStoreAuth";
const API_BASE_URL = "http://localhost:5001/api";
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

async function apiRequest(path, options = {}) {
  const { method = "GET", body, token = getStoredAuth()?.token } = options;
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (error) {
    throw new Error("Could not reach the API server. Start the backend and try again.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Clear expired sessions so I can log in again.
    if (response.status === 401 && token) clearAuth();
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
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

function getStoredAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));

    if (!auth?.token || !auth?.user?.email) {
      return null;
    }

    return auth;
  } catch (error) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function saveAuth(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  updateAuthNavigation();
}

function clearAuth() {
  // Keep the previous customer's order private on shared browsers.
  localStorage.removeItem(ORDER_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  updateAuthNavigation();
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

function updateAuthNavigation() {
  const auth = getStoredAuth();
  const loginLinks = document.querySelectorAll('a[href="login.html"]');
  const registerLinks = document.querySelectorAll('a[href="register.html"], [data-logout]');

  loginLinks.forEach((link) => {
    link.textContent = auth ? auth.user.fullName : "Log in";
    link.setAttribute("aria-label", auth ? `Signed in as ${auth.user.fullName}` : "Log in");
  });

  registerLinks.forEach((link) => {
    if (auth) {
      link.textContent = "Log out";
      link.href = "#logout";
      link.dataset.logout = "";
    } else {
      link.textContent = "Register";
      link.href = "register.html";
      delete link.dataset.logout;
    }
  });
}

function showFormError(form, message) {
  const error = form.querySelector('[role="alert"]');

  if (!error) {
    return;
  }

  error.textContent = message;
  error.hidden = false;
}

function clearFormError(form) {
  const error = form.querySelector('[role="alert"]');

  if (!error) {
    return;
  }

  error.textContent = "";
  error.hidden = true;
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

async function placeOrder(form) {
  const auth = getStoredAuth();
  const totals = getCartTotals();

  if (!auth) {
    showCheckoutError("Please log in or create an account before placing an order.");
    return;
  }

  if (totals.items.length === 0) {
    showCheckoutError("Add at least one product before placing an order.");
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Placing order...";

  try {
    const data = await apiRequest("/orders", {
      method: "POST",
      body: {
        items: totals.items.map((item) => ({ slug: item.id, quantity: item.quantity })),
        shippingAddress: getCheckoutFormData(form),
        paymentMethod: "cash-on-delivery"
      }
    });

    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(data.order));
    saveCart({});
    window.location.href = `order-confirmation.html?order=${encodeURIComponent(data.order._id)}`;
  } catch (error) {
    showCheckoutError(error.message);
    submitButton.disabled = false;
    submitButton.textContent = "Place order";
  }
}

function getStoredOrder() {
  try {
    const order = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY));

    if (!order || !Array.isArray(order.items)) {
      return null;
    }

    const items = order.items
      .map((item) => {
        const slug = String(item.slug || item.id || "").trim();
        const fallbackProduct = PRODUCTS[slug];
        const quantity = clampQuantity(item.quantity);
        const price = Number(item.price || fallbackProduct?.price || 0);

        if (!slug || !price) {
          return null;
        }

        return {
          id: slug,
          name: String(item.name || fallbackProduct?.name || "Product"),
          price,
          quantity,
          url: fallbackProduct?.url || `product.html#${slug}`,
          lineTotal: price * quantity
        };
      })
      .filter(Boolean);

    if (items.length === 0) {
      return null;
    }

    const subtotal = Number(order.subtotal || items.reduce((total, item) => total + item.lineTotal, 0));
    const delivery = Number(order.delivery || order.deliveryCharge || (subtotal > 0 ? DELIVERY_CHARGE : 0));
    const shippingAddress = order.shippingAddress || order.customer || {};

    return {
      reference: order.reference || `ORDER-${String(order._id || "").slice(-6).toUpperCase()}`,
      status: order.status || "placed",
      shippingAddress,
      items,
      subtotal,
      delivery,
      total: Number(order.total || subtotal + delivery)
    };
  } catch (error) {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    return null;
  }
}

async function renderConfirmationPage() {
  const orderItems = document.querySelector("[data-confirmation-items]");

  if (!orderItems) {
    return;
  }

  const message = document.querySelector("[data-order-message]");
  const updates = document.querySelector("[data-order-updates]");
  const orderId = new URLSearchParams(window.location.search).get("order");
  let order = null;
  // Let the API check ownership before showing a confirmed order.
  if (getStoredAuth() && orderId) {
    message.textContent = "Loading your order...";
    try {
      const data = await apiRequest(`/orders/${encodeURIComponent(orderId)}`);
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(data.order));
      order = getStoredOrder();
    } catch (error) {
      message.textContent = error.message;
    }
  } else {
    message.textContent = "Complete checkout to see your order confirmation.";
  }

  if (!order) {
    updateSummaryTotals({ subtotal: 0, delivery: 0, total: 0 });
    return;
  }

  message.textContent = "Thank you! Your order has been saved.";
  updates.textContent = "Payment is due on delivery. Keep your order reference for your records.";
  document.querySelector("[data-order-reference]").textContent = order.reference;
  document.querySelector("[data-order-status]").textContent = order.status;
  document.querySelector("[data-order-address]").textContent = `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.region}, ${order.shippingAddress.country}`;

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
  // Rebuild the row after editing so typing does not lose focus.
  document.addEventListener("change", (event) => {
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

function bindAuthForms() {
  const loginForm = document.querySelector("[data-login-form]");
  const registerForm = document.querySelector("[data-register-form]");

  if (loginForm) {
    loginForm.addEventListener("input", () => clearFormError(loginForm));
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }

      const formData = new FormData(loginForm);

      const button = event.currentTarget.querySelector('button[type="submit"]');
      // Disable the button while waiting so I don't submit the form twice.
      if (button.disabled) return;
      button.disabled = true;
      try {
        const auth = await apiRequest("/auth/login", {
          method: "POST",
          token: null,
          body: {
            email: String(formData.get("email") || "").trim(),
            password: String(formData.get("password") || "")
          }
        });

        saveAuth(auth);
        window.location.href = getCartItems().length > 0 ? "checkout.html" : "index.html";
      } catch (error) {
        showFormError(loginForm, error.message);
      } finally {
        button.disabled = false;
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("input", () => clearFormError(registerForm));
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const password = String(formData.get("password") || "");
      const confirmPassword = String(formData.get("confirmPassword") || "");

      if (password !== confirmPassword) {
        showFormError(registerForm, "Passwords do not match.");
        return;
      }

      if (!registerForm.checkValidity()) {
        registerForm.reportValidity();
        return;
      }

      const button = event.currentTarget.querySelector('button[type="submit"]');
      // Disable the button while waiting so I don't submit the form twice.
      if (button.disabled) return;
      button.disabled = true;
      try {
        const auth = await apiRequest("/auth/register", {
          method: "POST",
          token: null,
          body: {
            fullName: String(formData.get("fullName") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            password
          }
        });

        saveAuth(auth);
        window.location.href = getCartItems().length > 0 ? "checkout.html" : "index.html";
      } catch (error) {
        showFormError(registerForm, error.message);
      } finally {
        button.disabled = false;
      }
    });
  }
}

function bindLogoutLinks() {
  document.addEventListener("click", (event) => {
    const logoutLink = event.target.closest("[data-logout]");

    if (!logoutLink) {
      return;
    }

    event.preventDefault();
    clearAuth();
    setStatusMessage("You have been logged out.");
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
    placeOrder(form);
  });
}

bindProductButtons();
bindCartActions();
bindAuthForms();
bindLogoutLinks();
bindCheckoutForm();
updateCartCount();
updateAuthNavigation();
renderCartPage();
renderCheckoutPage();
renderConfirmationPage();
