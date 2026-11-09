@AGENTS.md

# ZOJA studio (app.zoja.ai)

The studio web app: create AI personas, keep them consistent and plan their campaigns. Later it also holds the marketplace. The product direction is in `apps/web/CLAUDE.md`.

Next.js 16 (App Router, Turbopack, `src/`) with Tailwind CSS 4, TypeScript and npm. It is part of the npm workspace at the repo root, so install from the root (`npm install`), never inside this folder.

## What exists

A design-tool layout, modelled on a node-canvas reference: top bar, tool rail on the left, canvas filling the rest.

- `src/app/layout.tsx`: loads `@zoja/ui` fonts and tokens, then `globals.css`, and lays out `TopBar`, `ToolSidebar` and the page. The body is fixed to the window height (`h-dvh`, no page scroll); the canvas handles its own panning.
- `src/app/globals.css`: Tailwind plus `@zoja/ui/theme.css`, which gives the ZOJA classes: `bg-sage`, `text-ink`, `bg-night`, `font-display` (Michroma), `font-sans` (Inter, the default), `font-ui` (Space Grotesk), `ease-zoja`.
- `src/components/top-bar.tsx`: menu, logo, "Drafts / Untitled campaign" breadcrumb, Create button, desktop/tablet/phone toggles. All placeholders.
- `src/components/tool-sidebar.tsx`: placeholder tools with Lucide icons. Clicking only marks a tool as selected.
- `src/components/canvas/`: the canvas, built on React Flow (`@xyflow/react`).
  - `studio-canvas.tsx`: two nodes, Persona → Shot, joined left to right by a blue curved connector with an arrow. Drag the background to pan, scroll or pinch to zoom (25–200%), drag nodes to move them. Panning stops at a large box (`translateExtent`), so the canvas is semi-infinite. Nodes are uncontrolled (`defaultNodes`), so moves are not saved.
  - `step-node.tsx`: the node look: title card, then a grey panel of rows and one blue action row. Input handle on the left, output on the right.
  - `zoom-bar.tsx`: bottom pill with zoom out, zoom %, zoom in and fit to view.
  - `canvas.css`: React Flow theme through its `--xy-*` variables (dots, edge and handle colours). React Flow's stylesheet is unlayered, so it beats Tailwind classes on its own elements; theme those through these variables or this file, not Tailwind classes.
- `src/app/page.tsx`: renders the canvas.

The studio chrome is neutral: Tailwind's zinc greys with blue-500 as the accent. The sage green is the website's brand colour and is kept out of the tool. Fonts and the logo come from `packages/ui`; change them there, not here. Studio-only components stay in `src/components/` until the website needs them too.

React Flow shows a small "React Flow" link in the corner. Its MIT licence allows hiding it, but the authors ask commercial apps that hide it to buy React Flow Pro.

## Next steps (planned)

1. Make the nodes real: persona bible fields (face, voice, wardrobe, locations, hard rules) editable in the Persona node, and the canvas saved as JSON files on the local machine.
2. "Generate" through one server route that calls an image model. The API key lives in `.env.local` (git-ignored) and is read only on the server.
3. Login, database and file storage only when the studio goes online: Vercel has no lasting files.

## Routes (planned)

- `/`: logged out goes to the login page (sign up, link back to zoja.ai). Logged in goes to the dashboard with the user's personas.
- `/marketplace`: the public AI influencer listing. Browsing needs no account; listing your own influencer does.
- A deep link opened while logged out returns to that page after login, not to the dashboard.

## Run and check

- `npm run dev:studio` from the repo root, or the `studio` config in `.claude/launch.json`: http://localhost:8766.
- Before pushing: `npx tsc --noEmit`, `npm run lint` and `npm run build` inside this folder.
- `cacheComponents` is on in `next.config.ts`: data reads that are not cached must sit inside `<Suspense>`. Check the guides in `node_modules/next/dist/docs/` before writing data code.

## Deploy

Not online yet. When it is: a separate Vercel project from the same repo, Root Directory `apps/studio`, framework Next.js, domain app.zoja.ai. Vercel installs from the repo root so it can reach `packages/ui`. Only routes and `public/` are served; `.vercelignore` keeps this file out of the upload anyway.
