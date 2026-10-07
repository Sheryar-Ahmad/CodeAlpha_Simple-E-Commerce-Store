# Understanding the fixes

## Starting the website

Run `./start-backend.ps1` in PowerShell from the project folder. MongoDB is now the default. The older `-UseMongo` option still works. Use `-Memory` only for a temporary demo whose data disappears on restart.

Run `./start-frontend.ps1` in another terminal and open http://localhost:5501/index.html. Keep both terminals open. If a port is already occupied, stop your existing server before starting another.

## What changed and why

- Order confirmation now asks the API for the order ID in the URL. The backend checks that the signed-in customer owns the order. Only a successful response shows the saved-order message.
- Logout clears the cached order as well as the login token. Navigation changes back to Register correctly.
- Cart quantities update after editing finishes. Rebuilding an input after every keystroke used to interrupt typing.
- Login and registration buttons stay disabled while requests are pending to prevent repeated clicks.
- The API rejects missing items, fractions, excessive quantities, and invalid order IDs. Prices still come from the database, even if someone changes the browser's totals.
- Duplicate email and invalid JSON requests get clear client errors. Production server errors hide internal details.
- A busy backend port now produces a short explanation instead of an unhandled error stack.

Comments explain these decisions near the code. They describe why something is needed rather than repeating every line.

## Tests

From `server/`, run `npm test` with MongoDB running. The test creates and removes its own temporary database. It checks registration, login, duplicate emails, invalid quantities, server-calculated totals, ownership, invalid references, malformed JSON, and saved orders after reconnecting.

## Browser checks

1. Register, log out, and log in again. Check the navigation after each step.
2. Add products, edit quantities, remove items, and empty the cart.
3. Submit an incomplete checkout. Required fields should prevent submission.
4. Place an order while signed in. Check the reference, items, address, and total.
5. Refresh confirmation. It should retrieve the same order from the API.
6. Log out on confirmation and refresh. Private order details should no longer appear.
7. Stop the backend and try login. A readable connection error should appear.
8. Test on a narrow screen and use Tab to check keyboard access.

## Current limits

This is a local cash-on-delivery store. Email delivery, online payments, administrative order updates, and deployment are not implemented. Product listings use a fixed frontend catalog; changing database prices alone does not update browsing prices. Stock is checked at checkout but is not reserved or reduced, so this is not yet a production inventory system. Browser tokens use localStorage; production authentication needs a deployment-specific security review. Automated API tests do not replace browser testing.
