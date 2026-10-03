# Warm Series Product — Shopify section

This is the Coherent art-store product page design, rebuilt as a real Shopify
Online Store 2.0 section. It uses your actual product/variant/collection data
instead of the hardcoded mockup content — nothing here is faked.

## Files

- `sections/warm-series-product.liquid` — the section (markup, settings, blocks)
- `assets/warm-series-product.css` — all styling (same colors/type as the mockup)
- `assets/warm-series-product.js` — variant picker, cart add, swipeable gallery, counter

## 1. Set up your product in Shopify admin first

The design depends on a few things existing on the product:

- **Variant options**: create two options, e.g. "Size" (S / M / L) and "Frame"
  (No Frame / Premium), with **real prices set per combination** in Shopify
  admin. The page reads `variant.price` directly — there's no "+$45" markup
  math happening in the template, so set each variant's actual price.
- **Images**: upload real 4:3 photos. Optionally set each image's **alt text**
  to a caption (e.g. "On the wall", "Surface detail") — the gallery uses alt
  text as the slide label, falling back to "Photo 1/2/3" if left blank.
- **Compare-at price** (optional): set this on a variant if you want the
  struck-through price + "X% below list" badge to show.

## 2. Create a collection for "the set"

The top gallery shows this product's own row first, then up to 3 more rows
pulled live from a collection you choose (e.g. a "Warm Series" collection
containing all 4 pieces). Each other product's title, price, and first 3
images are pulled automatically — add/remove pieces from the collection and
the gallery updates on its own.

## 3. Install the files

In Shopify admin: **Online Store → Themes → your theme → Edit code**.

1. Under `Assets`, click **Add a new asset → Create a blank file**, name it
   `warm-series-product.css`, paste in the contents of that file here.
2. Repeat for `warm-series-product.js`.
3. Under `Sections`, click **Add a new section**, name it
   `warm-series-product.liquid`, paste in the contents of that file here.

## 4. Add the section to your product template

Go to **Online Store → Themes → Customize**, open a product page, and under
**Add section** pick **Warm Series Product**. From there:

- Pick the **set collection** in the section settings.
- Add **blocks** for the trust icons, benefits, process steps, specs,
  comparison rows, reviews, and FAQ — a starter set is pre-filled via the
  section's preset, but you'll want to edit the copy to match your real
  materials/claims.
- If you have a real bundle product (all 4 prints as one SKU), pick it under
  **Bundle callout → Bundle product** so the real price shows. Otherwise it
  falls back to a manual price field you type in, linking to the collection
  page (true one-click multi-item bundle checkout needs Shopify's native
  Bundles feature or a dedicated bundle SKU — plain Liquid can't fabricate
  that part).

## Honesty flags — read before publishing

- **"Happy customers" counter defaults to off (0).** Don't put a made-up
  number in there — it's a real, editable setting (`happy_collectors_count`)
  specifically so you can enter your actual count, or leave it hidden.
- **Reviews, FAQ, benefits, and comparison rows start empty** (aside from the
  preset placeholders) — fill them in as blocks in the theme editor with your
  real claims. Nothing here is pre-written to look like real customer quotes.
- **Fonts**: the section loads Google Fonts (Fraunces/Archivo/IBM Plex Mono)
  itself so it works as a self-contained paste-in. If your theme already
  loads these sitewide, remove the `<link>` tag at the top of the section to
  avoid loading them twice.

## What's different from the design mockup

- The mockup's gallery images were AI-generated placeholder gradients; this
  version uses your real product photos.
- Sizes, prices, and the frame option are real Shopify variants now, not
  hardcoded JS state — switching options updates price via the actual
  variant data and adds the correct variant ID to cart.
- "Buy Now" adds to cart via `/cart/add.js` then redirects to `/checkout`.

## Before going live

This has not been tested against a live Shopify store (no store was
connected in the session that built it). Install it on a **duplicate/preview
theme** first, test the variant picker, add-to-cart, and buy-now flow with a
real product, then publish.
