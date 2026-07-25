# Surfing 101 🌊

A free website that helps new surfers get started, anywhere in the world: the basics of how to
surf, beginner-friendly wave breaks on six continents, live forecast conditions and nearby surf
shops for any location you search, and guidance on picking a board and wetsuit.

Built with [Next.js](https://nextjs.org) and exported as a static site so it can be hosted for
free on GitHub Pages.

## Sections

- **Learn to Surf** — technique basics, etiquette, safety, and a glossary.
- **Wave Breaks** — a curated, mapped list of beginner-friendly surf spots across North America,
  Oceania, Europe, Africa, and Asia, with difficulty, conditions, and hazards for each.
- **Explore** — search any beach, city, or coastline on Earth for forecast wave/wind conditions
  and nearby surf shops. Works globally, not just for the curated spots list.
- **Surf Shops** — a curated directory of Northern California shops for board/wetsuit rentals and
  lessons (see Explore for shops anywhere else).
- **Gear Guide** — board types by skill level and a wetsuit-thickness guide by water temperature.

## How Explore works

Explore is entirely client-side and calls free, keyless public APIs directly from the visitor's
browser — no backend or database required, which keeps this a static site:

- **Geocoding** and **marine/weather forecasts** from [Open-Meteo](https://open-meteo.com/).
- **Nearby surf shops** from [OpenStreetMap](https://www.openstreetmap.org/) via the Overpass API.
- The world map (curated spots, and Explore results) renders with [Leaflet](https://leafletjs.com/)
  and OpenStreetMap tiles.

Because these are forecast/community-sourced data, not live buoy sensors, results are clearly
labeled as forecasts — always confirm with a local surf report before paddling out.

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building

This project is configured for static export:

```bash
npm run build
```

The static site is generated in the `out/` directory.

## Deploying to GitHub Pages

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys the site
automatically on every push to `main`. To enable it:

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site will be published at `https://<your-github-username>.github.io/Surfing-101/`.

## Adding content

Spot, shop, board, and wetsuit data live in `src/data/*.ts` as plain TypeScript arrays — add a
new entry (including `lat`/`lng` for the map) to extend any section without touching page markup.
