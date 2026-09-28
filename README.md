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
| Development stage | HTML storefront foundation |
| Available page | Homepage with three sample product listings |
| Visual design | Browser-default appearance; custom styling is pending |
| Shopping functionality | Not available yet; cart buttons are disabled |
| Backend and database | Not implemented |
| Deployment | No live deployment configured |

> The repository currently contains a static storefront, not an operational shop. Products and prices are examples, and no orders or payments are accepted.

## Features and scope

### Available now

- **Product listings:** product names, descriptions, and prices for an Everyday Backpack, Study Notebook, and Desk Lamp.
- **Store navigation:** links to the home, products, and about sections.
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
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── .gitkeep
├── .gitignore
└── README.md
```

| Path | Responsibility |
| --- | --- |
| [index.html](index.html) | Homepage markup, content, navigation, and product listings |
| [assets/css/style.css](assets/css/style.css) | Dedicated stylesheet; currently a placeholder comment |
| [assets/js/main.js](assets/js/main.js) | Dedicated script; currently a placeholder comment |
| `assets/images/` | Reserved for product images; `.gitkeep` retains the empty folder |
| [.gitignore](.gitignore) | Excludes environment files, dependencies, build output, and logs |
| [README.md](README.md) | Public project overview, setup, and implementation status |

## Accessibility and search foundations

The homepage includes:

- A document language of English.
- One main heading, followed by section and product headings.
- Semantic landmarks that identify each major part of the page.
- A keyboard-accessible skip link.
- Descriptive navigation and product-specific button text.
- A page title and description that explain the storefront's content.

These are initial foundations. Accessibility conformance, search rankings, performance scores, and cross-browser compatibility have not been formally assessed. Image alternatives and the final responsive layout will be addressed when those assets and styles are added.

## Verification

There is no automated test suite yet. The current storefront can be reviewed with these checks:

| Check | How to verify | Expected result |
| --- | --- | --- |
| Page loads | Open `index.html` | Store header, three products, about section, and footer appear |
| Browser title | Inspect the browser tab | “Simple Store \| Everyday Essentials” |
| Section links | Select Home, Products, About, or Explore products | The matching section is targeted; scrolling depends on viewport height |
| Skip link | Reload, press Tab, then Enter | Focus moves to the main content |
| Cart controls | Inspect each product button | Buttons are disabled and an availability notice is visible |
| Local assets | Reload with the browser Network panel open | The stylesheet and script have no missing-file errors |

This checklist describes expected behavior; it is not a report that every browser has passed testing.

## Roadmap

1. **Storefront structure** — complete the HTML pages and product detail content.
2. **Visual design** — introduce responsive CSS, product photography, and consistent components.
3. **Shopping interactions** — implement cart state, quantity changes, totals, and form feedback.
4. **Backend integration** — add account access, product data, and persistent orders.
5. **Release preparation** — verify the shopping flow, address security and accessibility issues, deploy, and record the project walkthrough.

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
