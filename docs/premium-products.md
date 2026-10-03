# Premium (paid) products

The website **shows** premium products; an external store **sells and delivers** them.
This keeps the site free to host, and paid files never sit in the public repository.

## How it fits together

```
Resource page / topic page  →  Product card  →  "Get it" button  →  External store checkout
(src/content/resources/)       (src/content/products/)               (delivers the file)
```

## Today (before selling)

The site includes one clearly labelled example: `src/content/products/stoichiometry-exam-pack-example.yaml`
(`placeholder: true` shows an **"Example only. Not a real product"** label and a disabled *Coming soon* button).

## When you're ready to sell

The store platform will be chosen in the monetization stage (ideally one that handles sales tax/VAT
for you). Then, for each product:

1. Create the product on the store platform and upload the paid file **there**.
2. Copy `templates/product.yaml` into `src/content/products/` and fill in `title`, `description`,
   `price` (as shown to buyers, e.g. `US$9`), `checkoutUrl` (the store's product link), `includes`.
   Set `placeholder: false`.
3. Create a resource that points to it (copy `templates/resource.yaml`), with `access: premium` and
   `product: <product file name>`, and **no `file`**.
4. Turn on `shop: true` under `features` in `src/config/site.ts` (once, the first time).

## Rules

- Never commit paid files, download links meant only for buyers, or store passwords/API keys.
- Keep the free lessons complete. Premium products add convenience and depth; they don't lock up the explanation.
- Before selling: add a refund policy page and update the terms and privacy pages (legal review recommended).
