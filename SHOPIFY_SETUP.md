# Shopify Integration Guide

This guide will help you set up Shopify as the backend for your Coherent Art Store, handling all payment processing, checkout, and order management.

## Why Shopify?

- ✅ **PCI Compliant** - Secure payment processing out of the box
- ✅ **No Backend Code** - Shopify handles all the complex infrastructure
- ✅ **Multiple Payment Methods** - Credit cards, PayPal, Apple Pay, Google Pay, etc.
- ✅ **Order Management** - Built-in dashboard for managing orders
- ✅ **Inventory Tracking** - Automatic stock management
- ✅ **Customer Management** - Built-in customer database
- ✅ **Email Notifications** - Automatic order confirmations and updates
- ✅ **Abandoned Cart Recovery** - Shopify can automatically follow up with customers
- ✅ **Mobile App** - Manage your store from anywhere

## Step 1: Create a Shopify Store

1. Go to [shopify.com](https://www.shopify.com)
2. Click "Start free trial"
3. Follow the setup wizard to create your store
4. Choose a plan (starts at $29/month after trial)

## Step 2: Enable Storefront API Access

1. In your Shopify Admin, go to **Settings** > **Apps and sales channels**
2. Click **Develop apps**
3. Click **Allow custom app development** (if prompted)
4. Click **Create an app**
5. Name it "Coherent Art Frontend" and click **Create app**
6. Click **Configure Storefront API scopes**
7. Enable the following scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
8. Click **Save**
9. Go to **API credentials** tab
10. Click **Install app** under Storefront API access token
11. Copy your **Storefront API access token** (starts with `shpat_`)
12. Copy your **Store domain** (e.g., `your-store.myshopify.com`)

## Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Shopify credentials:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_your_token_here
   NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```

## Step 4: Create Products in Shopify

### Product Structure

Each art collection should be created as a Shopify product with multiple variants for the different quality tiers (Budget, Premium, Luxury).

### Creating a Collection Product

1. In Shopify Admin, go to **Products** > **Add product**

2. **Basic Information:**
   - **Title:** Collection name (e.g., "Seasons Flow")
   - **Description:** Collection description
   - **Media:** Upload all art pieces in the collection

3. **Pricing:**
   Create variants for each tier:
   - **Budget Tier** - e.g., $129
   - **Premium Tier** - e.g., $189 (mark as default)
   - **Luxury Tier** - e.g., $299

4. **Organization:**
   - **Product type:** "Art Collection"
   - **Vendor:** "Coherent Art"
   - **Tags:** Add style (e.g., "Abstract Minimalism"), theme (e.g., "Seasons"), and "featured" if applicable

5. **Custom Metafields** (Important!):

   Go to **Settings** > **Custom data** > **Products** and create these metafields:

   - **theme** (Single line text)
     - Example: "Seasons", "Water", "Urban Life"

   - **style** (Single line text)
     - Example: "Abstract Minimalism", "Impressionist Realism", "Bold Contemporary"

   - **roomCount** (Integer)
     - Example: 3, 5, or 7

   - **colorPalette** (JSON)
     - Example: `["#e8dcc4", "#c9b8a0", "#8b7355", "#5d4e37", "#3a3226"]`

   - **pieces** (JSON)
     - Example:
       ```json
       [
         {
           "id": "seasons-1",
           "name": "Spring Morning - Living Room Centerpiece",
           "dimensions": { "width": 36, "height": 48, "unit": "inches" },
           "recommendedPlacement": "Above sofa or main seating area",
           "room": "Living Room",
           "thumbnail": "https://cdn.shopify.com/...",
           "fullImage": "https://cdn.shopify.com/..."
         }
       ]
       ```

6. **Inventory:**
   - Set stock levels for each variant
   - Enable "Track quantity"

7. Click **Save**

### Quick Setup: Bulk Import

For faster setup, you can use Shopify's CSV import:

1. Export the sample CSV from `/docs/shopify-products-template.csv`
2. Fill in your product data
3. Go to **Products** > **Import**
4. Upload your CSV file

## Step 5: Configure Shipping

1. Go to **Settings** > **Shipping and delivery**
2. Set up your shipping zones and rates
3. Consider offering free shipping threshold (e.g., free over $100)

## Step 6: Configure Checkout

1. Go to **Settings** > **Checkout**
2. Customize checkout branding to match your site
3. Enable customer accounts (optional)
4. Set up email notifications

## Step 7: Payment Providers

1. Go to **Settings** > **Payments**
2. Activate **Shopify Payments** (recommended) or add third-party provider
3. Configure supported payment methods:
   - Credit/Debit cards
   - Apple Pay
   - Google Pay
   - PayPal (optional)

## Step 8: Testing

### Test Mode (Using Mock Data)

The site is configured to work with mock data while you set up Shopify:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Test with Shopify

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false` in `.env.local`
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Browse collections - they should now load from Shopify
4. Add items to cart
5. Click "Proceed to Checkout" - you'll be redirected to Shopify checkout

### Test Orders

Use Shopify's test payment gateway:

1. Enable test mode in **Settings** > **Payments**
2. Use test card: `4242 4242 4242 4242`
3. Use any future expiry date and CVV

## Step 9: Go Live

### Before Launch Checklist

- [ ] All products created with correct pricing
- [ ] Metafields populated for all products
- [ ] Product images uploaded and optimized
- [ ] Shipping rates configured
- [ ] Payment provider activated
- [ ] Checkout customized
- [ ] Email notifications tested
- [ ] SSL certificate active (automatic with Shopify)
- [ ] Domain connected (optional)
- [ ] Taxes configured
- [ ] Legal pages created (Privacy Policy, Terms of Service, Refund Policy)

### Launch

1. Remove Shopify's password protection:
   - Go to **Online Store** > **Preferences**
   - Disable password protection

2. Update environment variables for production:
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```

3. Deploy your frontend to Vercel/Netlify with environment variables

4. Test the complete flow end-to-end

## Product Mapping

### How Collections Map to Shopify

```
Frontend Collection → Shopify Product
├─ Budget Tier     → Variant 1 ($129)
├─ Premium Tier    → Variant 2 ($189) [default]
└─ Luxury Tier     → Variant 3 ($299)
```

### Variant IDs

When adding items to checkout, the frontend needs Shopify variant IDs. These are automatically generated when you create products.

**Important:** Update `lib/shopify/checkout.ts` to map collection IDs to actual Shopify variant IDs:

```typescript
const lineItems = items.map(item => ({
  variantId: getShopifyVariantId(item.collection.id, item.selectedTier),
  quantity: item.quantity,
}));
```

Create a mapping file: `lib/shopify/productMapping.ts`:

```typescript
export const collectionToVariantMap = {
  'seasons-abstract-minimalism': {
    budget: 'gid://shopify/ProductVariant/12345',
    premium: 'gid://shopify/ProductVariant/12346',
    luxury: 'gid://shopify/ProductVariant/12347',
  },
  // Add more mappings...
};
```

## Advanced Features

### Abandoned Cart Recovery

Shopify automatically tracks abandoned checkouts and can send recovery emails.

Configure in **Settings** > **Notifications** > **Abandoned checkout**

### Analytics

Shopify provides built-in analytics:
- Sales reports
- Customer behavior
- Traffic sources
- Conversion rates

Access via **Analytics** in Shopify Admin

### Discount Codes

Create discount codes in **Discounts**:
- Percentage off
- Fixed amount off
- Free shipping
- Buy X get Y

### Collections

Organize products into collections in Shopify Admin:
- Featured Collections
- Seasonal Collections
- Style-based Collections

Use Shopify Collections API to fetch curated groups of products.

## Troubleshooting

### "Shopify credentials not configured"

- Check that `.env.local` exists and contains correct values
- Restart development server after changing environment variables

### "Product not found"

- Verify products are published to "Online Store" sales channel
- Check that Storefront API has correct scopes enabled

### Checkout redirect not working

- Verify `NEXT_PUBLIC_USE_MOCK_DATA=false`
- Check browser console for errors
- Ensure Storefront API access token is valid

### Images not loading

- Ensure all product images are uploaded to Shopify
- Check that metafields contain correct image URLs
- Verify images are publicly accessible

## Support Resources

- **Shopify Help Center:** https://help.shopify.com
- **Storefront API Docs:** https://shopify.dev/docs/api/storefront
- **Shopify Community:** https://community.shopify.com
- **24/7 Support:** Available on paid plans

## Cost Breakdown

### Shopify Plans

- **Basic:** $29/month - Good for starting out
- **Shopify:** $79/month - Recommended for growing businesses
- **Advanced:** $299/month - For high-volume stores

### Transaction Fees

- **With Shopify Payments:** 0% additional fees
- **With Third-party Gateway:** 0.5-2% per transaction (depending on plan)

### Payment Processing Rates

- **Basic:** 2.9% + 30¢ per transaction
- **Shopify:** 2.7% + 30¢ per transaction
- **Advanced:** 2.5% + 30¢ per transaction

**Total Monthly Cost Estimate:**
- Shopify Plan: $29-79/month
- Domain: ~$15/year
- Hosting (Vercel/Netlify): Free tier available
- **Total: $29-79/month + transaction fees**

---

## Next Steps

1. ✅ Complete Shopify store setup
2. ✅ Create your first product
3. ✅ Test checkout flow
4. ✅ Configure shipping and taxes
5. ✅ Customize checkout branding
6. ✅ Launch and start selling!

Need help? Check out the [README.md](./README.md) for frontend documentation.
