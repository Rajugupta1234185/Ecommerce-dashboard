# Shop Dashboard

A small e-commerce dashboard built with Next.js (App Router) and TypeScript on top of the
Fake Store API. Products are server-rendered, filtering happens in the browser, and the cart
is kept in localStorage.

## Run it

Needs Node 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Demo login: `mor_2314` / `83r5^_`

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`.

## What it does

- `/products`: server-rendered list with server-side sorting, plus search, category and price
  filters and pagination in the browser
- `/products/[id]`: server-rendered detail page with metadata and JSON-LD
- `/cart`: add, change quantity, remove, total, saved in localStorage
- Login through the Fake Store API (cookie-based), and the cart needs a signed-in user
- Filters live in the URL, so links can be shared and the back button works
- Sitemap, robots.txt, loading skeletons, error pages with retry

## How it's organised

```
app/          routes (kept thin: read params, call a service, render)
features/     products, cart, auth: each has its own components, services, utils, types
components/   shared UI (button, pagination, skeleton, error state...)
lib/          fetch wrapper, config, small helpers
proxy.ts      protects /cart
```

The server fetches products and passes them as props to a client component, which filters
and paginates them in memory. The browser never calls the products API itself.

## Decisions I made

- **Feature folders** so everything about products or the cart is in one place.
- **Paginate after filtering.** The API has no page parameter, and filtering has to be client-side,
  so paginating first would only filter the current page.
- **Only sort goes to the server**, because the API supports `?sort=`. The other filters just
  update the URL, so there is no extra request.
- **Zustand with persist for the cart.** Less code than Redux, and persistence is built in.
  The saved cart is loaded after the first render to avoid a hydration mismatch.
- **One fetch wrapper** (`lib/api/http-client.ts`) that handles timeouts, errors, and retries
  for GET requests. Login (POST) is never retried.
- **Token in an httpOnly cookie**, so JavaScript can't read it.
- **Colors defined once** in `app/theme.css` and used everywhere through names like `bg-primary`.

## Trade-offs and limits

- The API sorts by id, not price, so the sort options are "oldest/newest".
- There is no stock data, so structured data always says in stock.
- The API is free and sometimes down, which is why there is retry logic and a retry page.
- The cart is per browser, not per user, and prices are saved when you add an item.
- `proxy.ts` only checks that the cookie exists. A real backend would verify the token.

## Tests

Vitest covers the pure logic: filtering, pagination, cart total, the cart store, and the fetch
wrapper (errors, retries, timeout). I checked the pages themselves by hand and with Lighthouse.

## What I'd do next

Component and end-to-end tests, server-side filtering if the catalog grew, and syncing the cart
to a backend.