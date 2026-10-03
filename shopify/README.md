# Warm Series Product — Shopify section

This is the Coherent art-store product page design, rebuilt as a real Shopify
Online Store 2.0 section. Each **product is one set** (e.g. "Minimalist |
Seasons Concept") made of several matching prints — the section's gallery
shows one row per print in that set, not one row per separate product.

## Files

- `sections/warm-series-product.liquid` — the section (markup, settings, blocks)
- `assets/warm-series-product.css` — all styling (same colors/type as the mockup)
- `assets/warm-series-product.js` — variant picker, cart add, swipeable gallery, counter

## 1. Set up your product in Shopify admin first

- **Variant options**: create two options, e.g. "Size" (S / M / L) and "Frame"
  (No Frame / Premium), with **real prices set per combination** in Shopify
  admin. The page reads `variant.price` directly — there's no "+$45" markup
  math happening in the template, so set each variant's actual price.
- **Compare-at price** (optional): set this on a variant if you want the
  struck-through price + "X% below list" badge to show.

## 2. Add a "Print" block for each piece in the set

The gallery is driven by blocks, not by a collection — because the set
*is* the product. In the theme editor, add one **Print** block per piece
(e.g. "Wandering Light", "Quiet Horizon", "Terracotta Field", "Low Tide")
and, in each block, pick that print's photo(s):

- **Photo 1** (required) — the full piece, shown straight-on. All prints are
  4:3 landscape, so upload true 4:3 photos for a clean fit.
- **Photo 2 / Photo 3** (optional) — more angles of that same print (on the
  wall, a texture/detail shot). Leave blank until you have them; the row
  just won't be swipeable yet.

Reorder blocks in the theme editor to reorder the rows. No separate
products or collection are needed for this gallery.

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

- Add a **Print** block per piece in the set and assign its photo(s) (see
  step 2).
- Add **blocks** for the trust icons, benefits, process steps, specs,
  comparison rows, reviews, and FAQ — a starter set is pre-filled via the
  section's preset, but you'll want to edit the copy to match your real
  materials/claims.

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
  version uses your real product photos, picked per print via blocks.
- Sizes, prices, and the frame option are real Shopify variants now, not
  hardcoded JS state — switching options updates price via the actual
  variant data and adds the correct variant ID to cart.
- "Buy Now" adds to cart via `/cart/add.js` then redirects to `/checkout`.

## Before going live

Install it on a **duplicate/preview theme** first (already done — see
"Coherent — Warm Series (preview)" in your theme list), test the variant
picker, add-to-cart, and buy-now flow with a real product, then publish.
