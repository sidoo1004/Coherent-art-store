# Set picker (Horizon theme)

Custom files added to the Horizon theme so a "set" product page lets customers tick
Piece 1–4, pick one size for all pieces, see the set discount live, and add the chosen
pieces to the cart as separate items (so Printful fulfils each one).

- `blocks/set-picker.liquid` – the picker block (checkboxes, size, live total, add to cart).
- `templates/product.set.json` – product template for set pages (assign template "set").
- `templates/product.piece.json` – template for single pieces; redirects to the parent set.

Data it relies on (product metafields):
- `custom.set_pieces` (list of products) on the set product. Piece N = image N of the set.
- `custom.parent_set` (product) on each piece.

Discounts: three automatic discounts on the "Set pieces (hidden)" collection
(products tagged `set-piece`): 2 items 6%, 3 items 15%, 4+ items 25%.
Keep the percentages in the block settings in sync with those discounts.

## Warm Series theme ("Coherent — Warm Series (preview)")

The main product page design. `sections/warm-series-product.liquid` renders
`snippets/ws-set-picker.liquid` (+ `assets/ws-set-picker.js`) instead of the normal buy box
whenever the product's `custom.set_pieces` field is filled. Piece N jumps the gallery to Print N.
Set discount % lives in the section settings ("Set discount").
