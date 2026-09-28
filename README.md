# Simple E-Commerce Store

A store built step by step by Sheheryar Ahmad for the CodeAlpha Full Stack Development internship (October 1-30, 2026).

## Current stage: semantic HTML

The homepage contains navigation, an introduction, three example products, an about section, and a footer. The temporary shop name is **Simple Store**. Prices are illustrative and shown in Pakistani rupees (PKR).

CSS and JavaScript files contain comments only. The page uses the browser's default appearance. Cart buttons are deliberately disabled: there is no cart, checkout, authentication, database, or payment processing yet.

## Open the page

Open `index.html` in a browser. No installation, server, account, or environment file is needed for this stage.

## File structure

```text
Simple E-Commerce Store/
|-- index.html              # Page structure and content
|-- assets/
|   |-- css/style.css       # Future styles
|   |-- js/main.js          # Future interactions
|   `-- images/.gitkeep     # Keeps the empty image folder in Git
|-- .gitignore             # Files Git should ignore
|-- PROJECT_CONTEXT.md     # Project decisions and working rules
`-- README.md              # Setup, status, and manual checks
```

Product images will be added when suitable assets are selected. There are no broken placeholder image links.

## Why these HTML elements?

- `header` introduces the store; `nav` groups navigation links.
- `main` identifies the primary content. The skip link lets keyboard users jump to it.
- `section` groups a topic under a heading.
- `article` describes a product that can be understood on its own.
- One `h1` introduces the page, `h2` headings introduce sections, and `h3` headings name products.
- Links navigate; buttons perform actions. Cart buttons will become available when their action is implemented.
- `footer` contains page credits and a return link.

The language, page title, description, and meaningful HTML provide an accessibility and SEO foundation. They do not complete the project's accessibility or SEO work.

## Manual checks

1. Open `index.html`. Expect a plain page with the browser tab title **Simple Store | Everyday Essentials**.
2. Click Home, Products, About, Explore products, and Back to top. Each should point to the relevant section of this page. On a tall screen the whole page may already fit, so scrolling can be minimal.
3. Reload, press Tab, and then Enter on **Skip to main content**. Focus should move to the main content, skipping the header navigation.
4. Confirm all three product names, descriptions, and PKR prices appear. Cart buttons should be disabled and the explanation should be visible above the list.
5. Narrow the browser window. Text should wrap naturally. Designed mobile layouts will be added during the CSS stage.
6. If using browser developer tools, reload with the Network panel open and confirm the local CSS and JavaScript files load without missing-file errors.

## Git and GitHub

This folder is the repository boundary. Keep project files and future backend code inside it.

Git can record local commits before a GitHub repository exists. A commit creates a local history entry; a push sends commits to a configured remote such as GitHub. Until the remote exists, commit locally after each completed change and push the accumulated history when it is connected.

Never commit passwords, API keys, or real `.env` files. `.gitignore` helps prevent accidental additions but cannot remove secrets from files already tracked by Git.

## Next steps

Review and commit the HTML foundation first. Continue HTML revisions as needed, then add CSS after Sheheryar agrees the HTML stage is complete. Discuss the React/backend architecture before introducing it. The official CodeAlpha task brief still needs to be checked before finalizing the full feature scope.
