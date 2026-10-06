# Simple Store Backend Guide

This file explains the backend in simple words, so you can revise what was built and explain it during your CodeAlpha walkthrough.

## 1. What changed today

The project moved from a front-end demo to a full-stack e-commerce project structure.

Before today, the browser could add items to a cart and create a demo order with `localStorage`.

Now the project also has a real backend inside the `server` folder. The backend is built with Node.js, Express, MongoDB, and Mongoose.

## 2. The simple idea

Think of the project as two sides:

| Side | Job |
| --- | --- |
| Frontend | Shows pages, handles clicks, stores the cart in the browser, and sends requests |
| Backend | Receives requests, validates data, talks to MongoDB, and saves users/products/orders |

The frontend should never be fully trusted. A user can change browser data. That is why the backend recalculates prices and validates orders again.

## 3. Backend folder structure

```text
server/
├── package.json
├── package-lock.json
├── .env.example
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── authController.js
    │   ├── orderController.js
    │   └── productController.js
    ├── data/
    │   └── products.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    ├── models/
    │   ├── Order.js
    │   ├── Product.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── orderRoutes.js
    │   └── productRoutes.js
    ├── seed/
    │   └── products.js
    └── utils/
        └── tokens.js
```

## 4. Important files explained

### `server/src/server.js`

This is the starting point of the backend.

It connects to MongoDB first. If the database connection works, it starts the Express server.

### `server/src/app.js`

This creates the Express app.

It adds security middleware, JSON parsing, CORS, rate limiting, health check route, product routes, auth routes, order routes, and error handling.

### `server/src/config/database.js`

This file connects Mongoose to MongoDB using `MONGODB_URI` from `.env`.

Secrets stay in `.env`, not in GitHub.

### `server/src/models/Product.js`

This describes what a product looks like in MongoDB.

A product has a slug, name, description, price, image, category, stock, highlights, and active status.

### `server/src/models/User.js`

This describes a user account.

Before saving a password, the model hashes it with bcrypt. That means the real password is not stored directly in the database.

### `server/src/models/Order.js`

This describes a saved order.

An order belongs to a user, contains order items, stores the delivery address, payment method, subtotal, delivery charge, total, and status.

## 5. Authentication flow

Registration:

1. User fills the register form.
2. Frontend sends name, email, and password to `POST /api/auth/register`.
3. Backend validates the data.
4. Backend hashes the password.
5. Backend saves the user.
6. Backend returns a JWT token.
7. Frontend saves the token in `localStorage`.

Login:

1. User fills the login form.
2. Frontend sends email and password to `POST /api/auth/login`.
3. Backend finds the user by email.
4. Backend compares the entered password with the hashed password.
5. If correct, backend returns a JWT token.

## 6. What JWT means

JWT means JSON Web Token.

In this project, the token proves that a user is logged in.

When checkout places an order, the frontend sends:

```text
Authorization: Bearer token_here
```

The backend checks that token before allowing the order route.

## 7. Order flow

1. User adds products to cart.
2. User logs in or creates an account.
3. User fills checkout form.
4. Frontend sends product slugs, quantities, and delivery details to `POST /api/orders`.
5. Backend checks the logged-in user.
6. Backend finds the real product prices from MongoDB.
7. Backend recalculates subtotal, delivery, and total.
8. Backend saves the order in MongoDB.
9. Frontend stores the returned order and shows the confirmation page.

The key professional idea is this: the frontend sends what the user wants, but the backend decides what is valid.

## 8. API routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check if the API is running |
| GET | `/api/products` | Get all active products |
| GET | `/api/products/:slug` | Get one product |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get logged-in user |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get current user's orders |
| GET | `/api/orders/:id` | Get one current-user order |

## 9. How to run it locally

From the `server` folder:

```bash
npm install
copy .env.example .env
npm run seed
npm run dev
```

MongoDB must be running before `npm run seed` or `npm run dev`.

If you are in `E:\CodeAlpha_Projects`, first move into the project:

```powershell
cd ".\Simple E-Commerce Store"
```

Then you can run:

```powershell
.\start-backend.ps1
```

This starts memory mode. Memory mode is useful for learning and testing because it does not require MongoDB. The data resets when you stop the backend.

To run the real MongoDB version later:

```powershell
.\start-backend.ps1 -UseMongo
```

If Mongo mode says `MongoDB connection failed`, install/start MongoDB locally or replace `MONGODB_URI` in `server/.env` with a MongoDB Atlas URI.

## 10. What to explain in your demo

Say this in simple words:

"I started with semantic HTML, then added responsive CSS, then JavaScript cart behavior. After that, I converted it into a full-stack project by adding an Express API, MongoDB models, authentication with JWT, and protected order processing. The frontend still keeps the cart in the browser, but real orders are sent to the backend, where prices are recalculated and saved."

## 11. What is still future improvement

- Admin dashboard for managing products and orders.
- Better order status management.
- Email confirmation.
- Real deployment with environment variables.
- More automated backend tests.
