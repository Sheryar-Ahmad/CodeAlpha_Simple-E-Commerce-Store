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
| Development stage | Initial HTML page structure complete |
| Available pages | Homepage, product details, cart, checkout, confirmation, login, and registration |
| Visual design | Browser-default appearance; custom styling is pending |
| Shopping functionality | Not available yet; cart buttons are disabled |
| Backend and database | Not implemented |
| Deployment | No live deployment configured |

> The repository currently contains a static storefront, not an operational shop. Products and prices are examples, and no orders or payments are accepted.

## Features and scope

### Available now

- **Product imagery:** supplied backpack, notebook, and lamp images on the homepage and product details, plus a study-space banner.
- **Product listings:** product names, descriptions, and prices for an Everyday Backpack, Study Notebook, and Desk Lamp.
- **Store navigation:** connected shopping and account pages, with matching product detail anchors.
- **Shopping previews:** consistent example cart totals, checkout fields, and an order confirmation layout.
- **Account forms:** labelled registration and login fields, disabled until secure endpoints exist.
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
| Responsive interface | Browse and shop comfortably on mobile and desktop |

These features form the required e-commerce scope. They are planned capabilities, not claims about the current release.

## Technology

| Layer | Technology | Status |
| --- | --- | --- |
| Page structure | HTML5 | Implemented |
| Styling | CSS3 | File prepared; styles pending |
| Browser interactions | JavaScript | File prepared; behavior pending |
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

No `npm install`, server startup, database connection, or environment configuration is required at this stage. The page will appear without custom styling.

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
├── docs/
│   └── HTML_GUIDE.md
├── .gitignore
└── README.md
```

| Path | Responsibility |
| --- | --- |
| [index.html](index.html) | Homepage markup, content, navigation, and product listings |
| [product.html](product.html) | All three product detail sections, each with its own anchor |
| [cart.html](cart.html) | Example basket, quantity controls, totals, and a hidden empty state |
| [checkout.html](checkout.html) | Disabled contact, delivery, and payment-preview form |
| [order-confirmation.html](order-confirmation.html) | Clearly labelled example order confirmation |
| [login.html](login.html) / [register.html](register.html) | Disabled account forms with labels and autocomplete hints |
| [docs/HTML_GUIDE.md](docs/HTML_GUIDE.md) | Page-by-page explanation and study exercises |
| [assets/css/style.css](assets/css/style.css) | Dedicated stylesheet; currently a placeholder comment |
| [assets/js/main.js](assets/js/main.js) | Dedicated script; currently a placeholder comment |
| `assets/images/` | Supplied product images and two banner options; the alternate banner is not loaded by the pages |
| [.gitignore](.gitignore) | Excludes environment files, dependencies, build output, and logs |
| [README.md](README.md) | Public project overview, setup, and implementation status |

## Image assets

The original PNG files are retained without conversion or compression.

| File | Use |
| --- | --- |
| `assets/images/123.png` | Homepage study-space banner |
| `assets/images/456.png` | Alternate banner, retained but not loaded by the pages |
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

These are initial foundations. Accessibility conformance, search rankings, performance scores, and cross-browser compatibility have not been formally assessed. Product images include descriptive alternatives and width/height attributes. Product images use lazy loading; the homepage banner loads immediately. The final responsive layout will be added in the CSS stage. Cart, checkout, confirmation, and account previews have `noindex` metadata; this is a search-engine instruction, not access control.

## Verification

There is no automated test suite yet. The current storefront can be reviewed with these checks:

| Check | How to verify | Expected result |
| --- | --- | --- |
| Page loads | Open `index.html` | Store header, three products, about section, and footer appear |
| Browser title | Inspect the browser tab | “Everyday Essentials \| Simple Store” |
| Product links | Open each product from the homepage | The matching detail section is targeted |
| Shopping previews | Open Cart, Preview checkout, then the confirmation preview | Each page opens; all totals agree at PKR 3,600 and no order is placed |
| Account forms | Open Log in and Register | All inputs and submission controls are disabled |
| Checkout form | Open the checkout preview | Delivery fields are labelled and disabled; no data can be submitted |
| Skip link | Reload, press Tab, then Enter | Focus moves to the main content |
| Cart controls | Inspect each product button | Buttons are disabled and an availability notice is visible |
| Images | Open the homepage and each product detail section | The banner and matching product images appear without stretching |
| Local assets | Reload with the browser Network panel open, then scroll through the products | Images, stylesheet, and script have no missing-file errors |

This checklist describes expected behavior; it is not a report that every browser has passed testing.

## Roadmap

1. **Storefront structure — complete:** seven connected HTML pages, sample product details, and labelled form previews.
2. **Visual design** — style the supplied product images with responsive CSS and consistent components.
3. **Shopping interactions** — implement cart state, quantity changes, totals, and form feedback.
4. **Backend integration** — add account access, product data, and persistent orders.
5. **Release preparation** — verify the shopping flow, address security and accessibility issues, deploy, and record the project walkthrough.

## Study the HTML

Read [the HTML guide](docs/HTML_GUIDE.md) for a suggested reading order, explanations of the elements and attributes, sample calculations, and exercises. The initial HTML milestone is complete; markup will still evolve as real data and interactions are introduced.

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
