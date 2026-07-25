# Surfing 101 🌊

A free website that helps new surfers get started: the basics of how to surf, Northern
California wave breaks to learn at, nearby surf shops, and guidance on picking a board and
wetsuit.

Built with [Next.js](https://nextjs.org) and exported as a static site so it can be hosted for
free on GitHub Pages.

## Sections

- **Learn to Surf** — technique basics, etiquette, safety, and a glossary.
- **Wave Breaks** — Northern California surf spots (Linda Mar, Cowell's, Stinson Beach, Bolinas,
  Rodeo Beach, and more), with difficulty, conditions, and hazards for each.
- **Surf Shops** — local shops for board/wetsuit rentals and lessons.
- **Gear Guide** — board types by skill level and a wetsuit-thickness guide by water temperature.

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
new entry to extend any section without touching page markup.
