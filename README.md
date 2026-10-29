# FoodBridge 3D

**Rescue Food. Feed People. Zero Waste.**

A responsive food-rescue community demo connecting restaurants with surplus meals to shelters, NGOs, volunteers, and families. This implementation combines the uploaded FoodBridge project's content and interactions with a fixed React Three Fiber scene and scroll-driven camera choreography.

## Stack

- Next.js 14.2 (App Router), React 18, TypeScript
- Tailwind CSS 4, Framer Motion, Lucide, Radix UI
- Three.js, React Three Fiber 8, Drei 9, React Three Postprocessing
- Lenis + GSAP ScrollTrigger for smooth scrolling and camera progress

ScrollTrigger is distributed as part of GSAP and imported from `gsap/ScrollTrigger`; it is not a separate npm package.

## Run locally

Use Node.js 20.9+ and npm:

```bash
npm install
npm run dev
```

Open http://localhost:3000. Create a production build with `npm run build`, then serve it with `npm start`.

## Deploy

Vercel auto-detects Next.js. Import the repository and deploy with the default Next.js build settings. Optionally set `NEXT_PUBLIC_SITE_URL` to the production URL for canonical metadata, sitemap, and robots URLs.

## Architecture

The page uses semantic DOM sections and uploaded FoodBridge UI/data, layered above a fixed, decorative WebGL canvas. The 3D scene is dynamically imported with SSR disabled; desktop renders ten floating food objects and bloom, while mobile renders six objects at a reduced pixel ratio without post-processing.

```text
Native page scroll
      │
      ├── Lenis RAF ◄── GSAP ticker
      │
      └── GSAP ScrollTrigger (body progress 0–1)
                 │
                 └── progress ref ──► R3F useFrame / CameraRig
                                         │
                                         └── zoom → orbit → pullback → tilt → wide view

DOM content (Navbar → sections → Footer)  [z-10, interactive]
Fixed R3F Canvas                          [z-0, decorative]
```

Lenis, its GSAP ticker callback, ScrollTrigger instances, and resize listeners are cleaned up on unmount. The scene's camera sequence is divided into five 20%-scroll beats: zoom in, orbit, pull back, tilt down, and zoom out wide.

## Uploaded FoodBridge content

The uploaded `FoodBridge-source.zip` was found at the repository root. Its rescue fixtures, impact metrics, monthly chart, testimonials, navigation, section copy, visual map, and demo interactions are used in the site. Listings, names, partner identities, quotes, addresses, and statistics are illustrative San Francisco demo data; claims and contact submissions do not create real reservations or send/store personal information.

Update `src/data/rescues.ts` for listings and `src/data/content.ts` for metrics, chart values, testimonials, navigation, and social destinations. The project is frontend-only and has no database or API credentials.
