# Understanding the HTML storefront

Start by opening `index.html` in a browser. Keep the matching file open in your editor and connect each visible section to its HTML.

## Suggested reading order

| File | What to learn |
| --- | --- |
| `index.html` | Page structure, headings, navigation, lists, and product articles |
| `product.html` | Product anchors, description lists, labels, and number inputs |
| `cart.html` | Table captions, row/column headers, and an empty state |
| `checkout.html` | Forms, fieldsets, legends, delivery fields, and summaries |
| `order-confirmation.html` | Presenting an order reference and item summary |
| `login.html` | Email/password inputs and autocomplete |
| `register.html` | Required inputs, password guidance, and confirmation |

## The shared page structure

- `head` contains the browser title, description, language-related metadata, and asset links. The document language itself is set on `html`.
- `header` introduces the store. `nav` groups navigation links.
- `main` holds the page's main content. Each page has one `main` and one `h1`.
- `section` groups a topic under a heading. `article` holds a product description that makes sense on its own.
- `footer` provides credits and navigation.

The same header and footer are written in each file so every page works on its own without JavaScript. Shared components can replace that repetition when we choose an application architecture later.

## Links and buttons

A link navigates somewhere. A button performs an action.

```html
<a href="product.html#backpack">View backpack details</a>
<button type="button" disabled>Add backpack to cart</button>
```

The `#backpack` fragment targets the element with `id="backpack"`. Today, all three product descriptions live in one file and have separate anchors. Later, a reusable product view can load one selected product from the database.

## Forms without the mystery

```html
<label for="email">Email address (required)</label>
<input id="email" name="email" type="email" autocomplete="email" required>
```

- `for` connects a label to the input with the matching `id`.
- `name` identifies the value when a working form is submitted.
- `type="email"` gives the browser an email input.
- `autocomplete` explains what kind of saved information belongs here.
- `required` tells the browser that the field needs a value.

A `fieldset` groups related fields. Its `legend` names that group. Our fieldsets are disabled because no secure submission endpoint exists yet. Disabled fields cannot receive input or be submitted. Disabled fields also do not exercise browser validation yet.

The forms use `method="post"`; their current actions refer to the same static page as placeholders. Before enabling them, we must connect real endpoints, add server-side validation, and decide the authentication and CSRF protections. POST alone does not encrypt or secure data; deployment needs HTTPS.

HTML cannot compare two passwords, authenticate someone, calculate a cart, check live stock, or save an order. Those behaviors belong to JavaScript and the backend. Browser validation never replaces server validation.

## Accessibility details

- The skip link targets `main-content`. `tabindex="-1"` lets that region receive focus without adding it to normal Tab navigation.
- `aria-current="page"` identifies the current navigation destination.
- `aria-labelledby` points to a heading that names a section.
- `aria-describedby` points to supporting instructions.
- `scope="col"` and `scope="row"` associate table headers with their cells.
- Empty status/error elements reserve places for later feedback. They do not generate feedback by themselves.
- The hidden empty-cart section is an alternate state. JavaScript must show it instead of the populated basket when the real cart is empty.

## Sample totals

The cart, checkout, and confirmation use the same example:

```text
1 backpack  x PKR 2,500 = PKR 2,500
2 notebooks x PKR   450 = PKR   900
Subtotal                 PKR 3,400
Example delivery charge  PKR   200
Total                    PKR 3,600
```

These numbers are static text today. The backend must calculate trusted prices, delivery charges, and availability before accepting a real order. The example cash-on-delivery option is not an active payment service or a final payment architecture decision.

## Practice tomorrow

1. Follow each product link and find the matching `id` in `product.html`.
2. Explain why a product uses `article` but navigation uses `nav`.
3. Find a label and its matching input. Explain how `id` differs from `name`.
4. Follow the preview journey: homepage, product details, cart, checkout, confirmation.
5. Find `hidden` in the cart and explain when that section should be visible.
6. Trace the example totals across the three shopping pages.

Ask about any unfamiliar attribute before changing it. Responsive image layout, dynamic states, and working submissions are future stages; this milestone completes the initial page markup, not the functioning store.

## How the product images work

- `src` points to a local image file.
- `alt` describes the visible product for someone who cannot see the image.
- `width` and `height` provide its display dimensions and reserve space. The square products and wide banner keep their original proportions.
- `loading="lazy"` lets the browser delay product images until they are near the viewport. The opening banner is not lazy-loaded.
- `decoding="async"` allows product image decoding without requiring it to block the next paint.
- `fetchpriority="high"` gives the opening banner a higher download-priority hint.

The image files were supplied for the sample catalog. The CSS stage will make their display sizes adapt to the page layout. Setting HTML dimensions does not reduce the downloaded file size.
