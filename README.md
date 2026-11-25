# HSV Sugandhika

A premium, responsive e-commerce website for HSV Sugandhika — handcrafted spiritual fragrances and devotional essentials.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Managing products

All catalogue content lives in **`src/data/products.ts`**. Add, edit or remove entries in the `products` array. Each product has:

- `slug` — URL-friendly identifier
- `name`, `price` (INR), `category`
- `summary`, `description[]`
- `image`, `imageAlt`, `gallery[]`
- optional `badge`, `isNew`, `featured`, `addedAt`

New arrivals are derived from `isNew` + `addedAt`; the featured section uses `featured`. No other file needs changing.

Brand details, navigation, testimonials, policies and social links live in **`src/data/site.ts`**.

## Payments

Online payments are intentionally not enabled. Checkout collects delivery details and opens WhatsApp with the basket pre-filled, so no payment is ever falsely reported as successful.

An optional Razorpay wrapper is available in `src/lib/razorpay.ts`. To enable it, configure `VITE_RAZORPAY_KEY_ID` (and, for live mode, `VITE_RAZORPAY_ORDER_API_URL`) in `.env`, then wire it into `src/pages/Checkout.tsx` and verify payments against your backend before going live.

## SEO

Static metadata is in `index.html`; per-page metadata is set by `src/hooks/useSEO.tsx`. Update `SITE_URL` in `src/data/site.ts`, `public/robots.txt` and `public/sitemap.xml` when deploying to the final domain.

## Images

Product photography is stored in `public/images/`. Two products without dedicated photography (Vaijayanthi Maala and Big Size Wicks) currently use related brand imagery as visual stand-ins; replace the `image`/`gallery` paths in `products.ts` when dedicated photos are available.
