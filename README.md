# Parts

An online parts shop built with Next.js and GSAP.

## Pages

- **Home:** hero, featured products, brand showcase, category banners and trust features
- **Shop:** all products, with sorting, and a page for each brand
- **Product:** product details, add-to-cart and a pincode delivery check
- **Cart:** shopping cart with a slide-out drawer
- **Contact:** contact form

## Tech stack

- Next.js (App Router) and React
- GSAP for animations

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Image scripts

- `scripts/scrape-images.mjs` downloads product images.
- `scripts/generate-placeholders.mjs` creates placeholder images.
