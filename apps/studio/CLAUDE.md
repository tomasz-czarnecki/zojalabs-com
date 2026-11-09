# ZOJA app (app.zoja.ai)

The studio web app: create AI personas, keep them consistent and plan their campaigns. Later it also holds the marketplace. The product direction is in `apps/web/CLAUDE.md`.

For now this folder is only a static placeholder page (`index.html`, `css/app.css`). It gets replaced when the real app starts, not extended.

## Routes (planned)

- `/`: logged out goes to the login page (sign up, link back to zoja.ai). Logged in goes to the dashboard with the user's personas.
- `/marketplace`: the public AI influencer listing. Browsing needs no account; listing your own influencer does.
- A deep link opened while logged out returns to that page after login, not to the dashboard.

## Not decided yet

- Framework. Next.js is the natural fit on Vercel.
- Auth provider (for example Clerk or Supabase Auth), database and file storage for persona images.
- API keys for image models stay on the server, never in browser code.
- Once the app has a build step, it imports tokens, fonts, logos and components from `packages/ui` (`@zoja/ui`) instead of keeping its own copies.

## Deploy

A separate Vercel project from the same repo: Root Directory `apps/studio`, domain app.zoja.ai. Vercel publishes every file in this folder, so `.vercelignore` keeps this file off the site. Check new private files with `curl -I https://app.zoja.ai/<path>`.

## Run

Open `index.html` directly, or use the `studio` config in `.claude/launch.json` (http://localhost:8766).
