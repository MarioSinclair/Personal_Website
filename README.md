# Mario Sinclair · Now Boarding

My personal site, themed as an airport departures hall. My name flips in on a split-flap board, roles are boarding passes, projects print from a ticket kiosk, and my travels are an arrivals board with a route map.

[mariosinclaircodes.vercel.app](https://mariosinclaircodes.vercel.app/)

## Sections

| Section | Theme |
|---|---|
| Hero | Split-flap name, status board, passport card, visitor counter |
| Profile | Origin ticket (Kingston → Tampa), interests, coursework |
| Experience | Boarding passes stamped Landed / In flight / Boarding |
| Projects | Self-service kiosk: press a button, a ticket prints |
| Leadership | Crew ID badges on lanyards |
| Travel | Route map (world / North America), arrivals and departures boards, trip photos |
| Contact | "Final call" board, email, LinkedIn, GitHub, résumé |

## Stack

React 19, Vite, GSAP + ScrollTrigger, Lenis smooth scrolling, plain CSS. Fonts: Barlow Condensed, Barlow, DM Mono.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Editing content

- Experience, projects, leadership: `src/data/content.js`
- Cities and upcoming trips: `src/data/travel.js`
- Résumé: replace `public/Mario_Sinclair_Resume.pdf`

## Trip photos

Put photos in `src/assets/travel/<AIRPORT CODE>/` (for example `src/assets/travel/FCO/colosseum.webp`). They appear on the site automatically. Add a caption in `CAPTIONS` in `src/data/travel.js` if you want one. Keep files around 1600px on the long side, ideally WebP.

## Visitor counter

`api/visits.js` is a Vercel function backed by Upstash Redis. To turn it on:

1. In the Vercel dashboard, open the project, then **Storage**, and add **Upstash for Redis** (free tier is fine).
2. Connect it to this project. Vercel adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars.
3. Redeploy.

Until then, or in `npm run dev`, the counter shows a fixed preview number (dev) or hides itself (production).
