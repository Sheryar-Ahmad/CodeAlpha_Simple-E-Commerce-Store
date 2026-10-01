<div align="center">

# Simple Store — E-Commerce Website

**Everyday essentials, organized around a simple shopping experience.**

Developed by **[Sheheryar Ahmad](https://github.com/Sheryar-Ahmad)**

CodeAlpha Full Stack Development Internship · October 2026

[Explore the code](https://github.com/Sheryar-Ahmad/CodeAlpha_Simple-E-Commerce-Store) · [Run locally](#getting-started) · [Feature roadmap](#roadmap)

</div>

---

## Project overview

Simple Store is an e-commerce website for browsing everyday products, managing a shopping cart, and placing orders. The project is being developed toward a complete shopping experience, covering both the customer-facing storefront and the backend services needed to manage products, accounts, and orders.

The current catalog introduces study and workspace essentials with prices in Pakistani rupees (PKR). The implementation starts with semantic HTML and separate locations for styles, scripts, and product images.

This repository contains **Task 1: Simple E-Commerce Store** for the CodeAlpha Full Stack Development internship.

## Project status

| Item | Current state |
| --- | --- |
| Development stage | HTML, responsive CSS, and front-end JavaScript shopping flow complete |
| Available pages | Homepage, product details, cart, checkout, confirmation, login, and registration |
| Visual design | Navy-and-cream theme, responsive product layouts, and styled account, cart, and checkout screens |
| Shopping functionality | Browser-saved cart, quantity updates, cart totals, demo checkout, and demo confirmation |
| Backend and database | Not implemented |
| Deployment | No live deployment configured |

> The repository currently contains a front-end shopping demo, not a production shop. Cart data and demo orders are stored in the browser only; no real orders, accounts, or payments are processed.

## Features and scope

### Available now

- **Responsive design:** mobile-first layouts, flexible navigation, product grids, and a cart table that scrolls within its panel.
- **Consistent styling:** shared color variables, reusable buttons and panels, readable forms, and coordinated page layouts.
- **Keyboard and motion support:** visible focus outlines, a focus-revealed skip link, and reduced-motion preferences.
- **Product imagery:** supplied backpack, notebook, and lamp images on the homepage and product details, plus a study-space banner.
- **Product listings:** product names, descriptions, and prices for an Everyday Backpack, Study Notebook, and Desk Lamp.
- **Cart interactions:** add products, update quantities, remove items, clear the cart, and review calculated totals.
- **Browser persistence:** cart data is saved with `localStorage` and validated before being rendered.
- **Demo checkout:** collect front-end-only delivery details, create a demo order reference, and show a confirmation page.
- **Store navigation:** connected shopping and account pages, with matching product detail anchors.
- **Account forms:** labelled registration and login fields, disabled until secure backend endpoints exist.
- **Semantic structure:** distinct header, navigation, main content, product articles, and footer.
- **Keyboard navigation groundwork:** a skip link that moves focus to the main content.
- **Page metadata:** a descriptive title, meta description, document language, and viewport setting.
- **Organized source:** separate files for HTML, CSS, and JavaScript.

### Planned shopping experience

| Feature | Intended behavior |
| --- | --- |
| Product details | View a product's description, image, price, and availability |
| Shopping cart | Add or remove products, update quantities, and review totals |
| User accounts | Register, sign in, and access protected account features |
| Order processing | Submit a cart and receive an order confirmation |
| Persistent data | Store products, users, and orders in a database |

Cart and demo checkout behavior are implemented in the browser. User accounts, server-side order processing, payments, and database persistence still require the backend stage.

## Technology

| Layer | Technology | Status |
| --- | --- | --- |
| Page structure | HTML5 | Implemented |
| Styling | CSS | Implemented with Grid, Flexbox, custom properties, and media queries |
| Browser interactions | JavaScript | Implemented with DOM events, localStorage, validation guards, cart totals, and demo checkout |
| Version control | Git and GitHub | In use |
| Backend | To be finalized | Not implemented |
| Database | To be finalized | Not implemented |

The current version has **no third-party runtime dependencies** and requires no build process.

## Getting started

### Prerequisites

- Git, if cloning from the terminal.
- A web browser.

### Download the source

```bash
git clone https://github.com/Sheryar-Ahmad/CodeAlpha_Simple-E-Commerce-Store.git
cd CodeAlpha_Simple-E-Commerce-Store
```

Alternatively, download the repository using **Code → Download ZIP** and extract it.

### Open the storefront

Open [index.html](index.html) in your browser. On Windows, you can double-click the file in File Explorer.

No `npm install`, server startup, database connection, or environment configuration is required at this stage. All seven pages share the stylesheet in `assets/css/style.css`; no external fonts or CSS frameworks are loaded.

## Repository structure

```text
CodeAlpha_Simple-E-Commerce-Store/
├── index.html
├── product.html
├── cart.html
├── checkout.html
├── order-confirmation.html
├── login.html
├── register.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
├── .gitignore
└── README.md
```

| Path | Responsibility |
| --- | --- |
| [index.html](index.html) | Homepage markup, content, navigation, and product listings |
| [product.html](product.html) | All three product detail sections, each with its own anchor |
| [cart.html](cart.html) | Browser-rendered basket, quantity controls, totals, removal actions, and empty state |
| [checkout.html](checkout.html) | Front-end-only delivery form and calculated order summary |
| [order-confirmation.html](order-confirmation.html) | Demo order reference, delivery address, purchased items, and totals |
| [login.html](login.html) / [register.html](register.html) | Disabled account forms with labels and autocomplete hints |
| [assets/css/style.css](assets/css/style.css) | Shared design tokens, components, page layouts, responsive rules, and print styles, organized in 14 commented sections |
| [assets/js/main.js](assets/js/main.js) | Product catalog, cart storage, DOM rendering, checkout handling, and confirmation rendering |
| `assets/images/` | Supplied product images and two banner options; the alternate banner is not loaded by the pages |
| [.gitignore](.gitignore) | Excludes environment files, dependencies, build output, and logs |
| [README.md](README.md) | Public project overview, setup, and implementation status |

## Image assets

The original PNG files are retained without conversion or compression.

| File | Use |
| --- | --- |
| `assets/images/123.png` | Alternate banner, retained but not loaded by the pages |
| `assets/images/456.png` | Homepage study-space banner |
| `assets/images/131415.png` | Everyday Backpack |
| `assets/images/101112.png` | Study Notebook |
| `assets/images/789.png` | Desk Lamp |

The three product images are 1254 × 1254 pixels; both banners are 1774 × 887 pixels. The HTML displays smaller versions with the same proportions. Product images load lazily, but their original download sizes remain unchanged. Web optimization is deferred by choice.

## Accessibility and search foundations

The pages include:

- A document language of English.
- One main heading, followed by section and product headings.
- Semantic landmarks that identify each major part of the page.
- A keyboard-accessible skip link.
- Descriptive navigation and product-specific button text.
- A page title and description that explain the storefront's content.

These are initial foundations. Accessibility conformance, search rankings, performance scores, and cross-browser compatibility have not been formally assessed. Product images include descriptive alternatives and width/height attributes. Product images use lazy loading; the homepage banner loads immediately. The responsive stylesheet preserves hidden states and readable disabled controls, provides visible keyboard focus, and respects reduced-motion settings. Cart, checkout, confirmation, and account previews have `noindex` metadata; this is a search-engine instruction, not access control.

## Verification

There is no automated test suite yet. The current storefront can be reviewed with these checks:

| Check | How to verify | Expected result |
| --- | --- | --- |
| Page loads | Open `index.html` | Store header, three products, about section, and footer appear |
| Browser title | Inspect the browser tab | “Everyday Essentials \| Simple Store” |
| Product links | Open each product from the homepage | The matching detail section is targeted |
| Add to cart | Open `index.html`, choose a product, then open Cart | The product appears in the cart and the nav count updates |
| Product quantity | Open `product.html`, choose a quantity, and add a product | The selected quantity is saved in the cart |
| Cart controls | Update quantity, remove an item, or clear the cart | Totals update and empty-cart messaging appears when needed |
| Demo checkout | Fill checkout with cart items present and place the demo order | The browser opens the confirmation page, shows a demo reference, and clears the cart |
| Account forms | Open Log in and Register | All inputs and submission controls are disabled |
| Checkout validation | Submit checkout with missing required details | The browser shows required-field validation |
| Skip link | Reload, press Tab, then Enter | Focus moves to the main content |
| Images | Open the homepage and each product detail section | The banner and matching product images appear without stretching |
| Responsive layout | Resize from desktop to 320px wide | Navigation wraps, content stacks, and the page has no horizontal scrolling |
| Cart on mobile | Tab to the cart table region; scroll horizontally | All columns remain reachable inside the table panel |
| Keyboard focus | Press Tab through links | The focused link has a visible outline |
| Local assets | Reload with the browser Network panel open, then scroll through the products | Images, stylesheet, and script have no missing-file errors |

This checklist describes expected behavior; it is not a report that every browser has passed testing.

## Roadmap

1. **Storefront structure — complete:** seven connected HTML pages, sample product details, and labelled forms.
2. **Visual design — complete for the current preview:** responsive CSS, supplied product imagery, shared components, styled forms, and keyboard focus states.
3. **Shopping interactions — complete for the front-end demo:** cart state, quantity changes, totals, browser persistence, and demo order confirmation.
4. **Backend integration** — add account access, product data, and persistent orders.
5. **Release preparation** — verify the shopping flow, address security and accessibility issues, deploy, and record the project walkthrough.

## Study plan

Review the HTML pages, the commented stylesheet, and `assets/js/main.js` together. The first JavaScript milestone is complete for the browser demo; the next major learning step is connecting the same ideas to an Express backend and database.

## Author

**Sheheryar Ahmad**
Software Engineering student at COMSATS University Islamabad
Full Stack Development Intern at CodeAlpha · October 1–30, 2026

[GitHub profile](https://github.com/Sheryar-Ahmad) · [Project repository](https://github.com/Sheryar-Ahmad/CodeAlpha_Simple-E-Commerce-Store)

---

<div align="center">

<strong>Simple Store</strong><br>
A CodeAlpha Full Stack Development project by Sheheryar Ahmad.

</div>
