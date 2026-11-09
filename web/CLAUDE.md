# ZOJA web

A static prototype site for the placeholder brand ZOJA, with two pages:

- Home (`index.html`, `css/home.css`): a full-screen photo hero behind a see-through header, the season headline and links to the runway. The hero uses the wide `assets/hero.webp`, with the text in the plain green band on its left. Phones get `assets/hero-portrait.webp` through `<picture>`, because the wide photo would crop through the face. Under 700px wide, the centre nav is hidden and a fixed 11px base size is used.
- Runway (`runway/`): a luxury-fashion "runway" showcase, described below.
- Nav (`css/nav.css`, `js/nav.js`): a floating glass pill. It has two links: Home and Marketplace, which is a `#` placeholder until that page exists. From 900px wide both links sit in the bar. Under 900px it shrinks to logo, current page name and a menu button that opens a full-screen dark panel with numbered links. The desktop rule sits last in `nav.css` so it overrides the menu-button rules. The style is modelled on tribedesignworks.com's nav, rebuilt with our own content. It is in px, so it looks the same on every page. Only the home page uses it so far; the runway page still has its own header.

The runway: a queue of models recedes in depth. Every 2.6 s the front model steps forward and fades out, the rest move up one slot (growing, sharpening, losing their fade), a new model fades in at the back, and the LOOK number and three product cards swap with a stagger. It recreates three screenshots of another site, so it is for private use only, not for publishing.

## Run

Open `index.html` directly in a browser (it works over `file://`), or serve it:

```bash
uv run tools/serve.py
```

Then go to http://localhost:8765 (home) or http://localhost:8765/runway/. The server serves the whole `web/` folder. Use `tools/serve.py` instead of `python -m http.server`: the stdlib server's listen queue of 5 resets some of the ~15 parallel image requests on a cold load, and the stage then stays blank.

## Runway layout

All paths below are inside `runway/`, except `tools/`, which sits at the `web/` root.

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
