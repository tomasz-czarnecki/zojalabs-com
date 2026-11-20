# ZOJA web

## Direction (set Nov 9 2026)

ZOJA is the engine for consistent AI characters: same face, voice, messages and outlook across every post and campaign. It has two faces:

- **The engine (the product).** Create a persona, keep it consistent, plan its campaigns.
- **The AI influencer marketplace (the advert and distribution).** Any AI influencer registers for free and can be found by clients. Free listing pulls creators in, and the engine is what they pay for.

Lily Wang is the case study and the first listing: presented as built with the ZOJA engine. That claim must be true before it goes public, so Lily gets rebuilt through the engine (persona bible, shot specs) as the first job it does.

The engine is planned as a personal studio where you create AI personas and plan campaigns for them. It is similar in spirit to Pletor (pletor.ai: a canvas of chained image and video models with a brand memory, strong at making variants of a finished campaign), with two twists:

- **Photographic.** Output is planned like a real shoot, not typed into a prompt box. Casting, location, lens, light, and a continuity rule so look 4 matches look 1.
- **Campaign planning.** Pletor starts after the brief. ZOJA owns the step before it: season goal, then campaign calendar, then shot spec per post, then results feeding back into the plan.

Three layers, in build order:

1. **Persona bible.** Face, voice, wardrobe, locations, and hard rules (what she never does).
2. **Campaign planner.** A calendar of posts, each with a purpose, a shot spec and a continuity rule.
3. **Results loop.** Each post's numbers go back into the plan, so the studio can explain why one post worked and the next did not.

### Case study: Lily Wang

Lily Wang is the one existing persona and the first thing the studio has to reproduce. She is a live Xiaohongshu account (6,651 followers, 25.6K likes on Nov 9 2026), so her numbers are real proof. The first campaign to lay out is the 1947 Dior post (about 15K views and about 400 followers in two days, against a few hundred for the posts after it): plan, shot spec, result.

Lily's hard rules go into her persona bible from day one:

- Keep the Mercedes star out of anything that sells, and fix the garbled 300SL badge before it ships.
- AI content must be labelled on Xiaohongshu.
- No flirting content, Xiaohongshu bans it.

The case study only counts as commercial proof once one post sells one product (the vintage-style accessories test). Plan that campaign as its finale.

### Where it gets built

The website stays in this `apps/web/` folder as static pages, same stack as today. The studio is a separate app in `apps/studio/` (app.zoja.ai, see `apps/studio/CLAUDE.md`).

- `lily/` (planned): the case-study page. Persona bible on top, then the Dior campaign as plan, shot spec and result. It links from the home page as the case study.
- `marketplace/` (planned): the free AI influencer listing, filling the existing `#` Marketplace nav link. Lily is listing number one. It starts here as a static page and moves into `apps/studio/` once creators sign up themselves, since that needs accounts and a database.
- Studio (later, in `apps/studio/`): the interactive persona and campaign tool, only after the Lily page exists and shows the planning layer. If it only shows pretty images it is a persona-making service, not a studio.
- Lily's reference images go in `assets/lily/`. They are not in the repo yet.

### Rules for this direction

- The runway page copies another site's screenshots. It stays a private mood reference and never goes public. Anything public uses our own assets.
- Do not add new top-level projects next to this one. Lily Wang and ZOJA are one project: ZOJA is the tool Lily runs on.
- A marketplace lives or dies on the client side, not on free sign-ups. Open question: who the first clients are and who brings them. Until the marketplace has its own demand, clients are found by hand, starting with Lily.
- Open question: what gets an influencer listed. Proposal: only personas with a ZOJA persona bible (consistency guaranteed, AI labelling built in) can be listed, so the engine is the reason the listing is worth trusting.

A static prototype site for the placeholder brand ZOJA, with two pages:

- Home (`index.html`, `css/home.css`): a full-screen photo hero behind a see-through header, with "Coming soon" copy: the headline "Same face. Every campaign.", a one-line pitch, the three things coming (AI influencers, campaign planning, AI photo studio), and an early-access mailto. On phones the list and links sit at the bottom, under the face. The hero uses the wide `assets/hero.webp`, with the text in the plain green band on its left. Phones get `assets/hero-portrait.webp` through `<picture>`, because the wide photo would crop through the face. Under 700px wide, the centre nav is hidden and a fixed 11px base size is used.
- Runway (`runway/`): a luxury-fashion "runway" showcase, described below.
- Nav (`css/nav.css`, `js/nav.js`): a floating glass pill. It has three links: Home, Marketplace (a `#` placeholder until that page exists) and Contact (`mailto:hello@zoja.ai`). From 900px wide the links sit in the bar. Under 900px it shrinks to logo, current page name and a menu button that opens a full-screen dark panel with numbered links. The desktop rule sits last in `nav.css` so it overrides the menu-button rules. The style is modelled on tribedesignworks.com's nav, rebuilt with our own content. It is in px, so it looks the same on every page. The logo is `assets/logo/zoja-ai-white.svg`, copied from `brand/logo/` at the repo root (the server only serves `apps/web/`). Only the home page uses it so far; the runway page still has its own header. The master copy of the nav and the colour and font tokens is now `packages/ui/`: change them there first, then copy into this folder, until the site has a build step and imports the package.

The runway: a queue of models recedes in depth. Every 2.6 s the front model steps forward and fades out, the rest move up one slot (growing, sharpening, losing their fade), a new model fades in at the back, and the LOOK number and three product cards swap with a stagger. It recreates three screenshots of another site, so it is for private use only, not for publishing.

## Deploy

Vercel project `zojalabs-com` deploys this folder (Root Directory `apps/web`) to www.zojalabs.com on every push to `main` of the `zojalabs-com` repo. Vercel publishes every file in the folder, linked or not. `.vercelignore` keeps this file, `runway/`, `tools/` and the uv files off the site. Add any new private file there, and check in a browser that `https://www.zojalabs.com/<path>` returns 404 (Vercel's firewall may answer plain `curl` with a 403 challenge page instead).

## Run

Open `index.html` directly in a browser (it works over `file://`), or serve it:

```bash
uv run tools/serve.py
```

Then go to http://localhost:8765 (home) or http://localhost:8765/runway/. The server serves the whole `apps/web/` folder. Use `tools/serve.py` instead of `python -m http.server`: the stdlib server's listen queue of 5 resets some of the ~15 parallel image requests on a cold load, and the stage then stays blank.

## Runway layout

All paths below are inside `runway/`, except `tools/`, which sits at the `apps/web/` root.

- `index.html`: markup, plus a `<template>` for the product cards.
- `css/style.css`: all styling. Sizes are in rem, where 1rem is 16px on a 2000px-wide window, so the page scales with the window like the reference. Queue slots are the `.model[data-slot=…]` rules: `--x`/`--y` place the feet (as % of the stage), `--s` is the scale, plus `--blur`, `--o` (opacity) and `--delay` (the stagger).
- `js/looks.js`: product catalogue and the looks in runway order (look number, figure, three products).
- `js/runway.js`: builds the queue and cards, then `advance()` moves every model one slot with CSS transitions and swaps the details with the Web Animations API.
- `assets/source/`: the three reference screenshots (2000×1125).
- `assets/figures/`, `assets/products/`: transparent WebP cut-outs made from the screenshots.
- `tools/cut_assets.py`: regenerates every cut-out into `runway/assets/`: `uv run tools/cut_assets.py`.

## How the assets are cut

- Crop boxes for each figure and product are in `tools/cut_assets.py`, in screenshot pixel coordinates.
- A black cursor ring recorded in the screenshots is painted out first.
- Figures use rembg's `u2net_human_seg` model. The general `isnet` model made parts of the garments see-through and pulled in background, so it is used only for the products.
- Figure edges are eroded by 2px to drop a light rim.
- The three second-row figures (green gown, ruffle gown, pink satin) come from small, soft sources. They are upscaled to front height and unsharp-masked, over the stage colour rather than over rembg's black, which would leave a white halo. They are still softer than the three front figures.
- The first run downloads the rembg models to `~/.rembg`.

## Gotchas

- The intro starts only once all figure images have decoded (`.queue.ready`). Until then, model transitions are disabled so the models do not slide in from the corner.
- Fonts are Michroma and Inter from Google Fonts, so they need a network connection. Michroma is wider than the reference's display face, and the font sizes were tuned to match its text widths.
- In a hidden or background browser tab, Chrome barely advances animation time, so screenshots there show stale frames. To check motion, use a visible tab or headless Chrome with a slowed animation rate (CDP `Animation.setPlaybackRate`).
