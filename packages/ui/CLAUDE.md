# @zoja/ui: the ZOJA design system

One place for what the website (`apps/web/`) and the studio (`apps/studio/`) share. This package is not deployed by itself and has no Vercel project. Apps bundle the parts they use at build time.

- `theme.css`: the Tailwind theme for apps that use Tailwind (see Status).
- `tokens.css`: colours, font stacks and easing as CSS variables (`--ink`, `--sage`, `--white`, `--night`, `--display`, `--text`, `--ui`, `--ease`).
- `fonts.css` + `fonts/`: Michroma, Inter (variable 400–700) and Space Grotesk (variable 400–700) as woff2, latin and latin-ext only (latin-ext covers Polish). Served from our own site instead of Google's. Each font's OFL licence sits next to it and must ship with it.
- `logo/`: the zoja.ai wordmark, dark and white. The full set of logo variants stays in `brand/logo/`.
- `nav/`: the glass pill nav: `nav.html` (markup), `nav.css` (needs `tokens.css`), `nav.js` (menu panel toggle).
- `preview.html`: one page that shows every token, font, logo and the nav. Use the `ui` config in `.claude/launch.json` (http://localhost:8767/preview.html).

## Status

- **Studio (`apps/studio`): wired in.** It depends on `@zoja/ui` through the npm workspace and imports `fonts.css`, `tokens.css`, `theme.css` and the logo. Next.js bundles the font files and serves them itself.
- **Website (`apps/web`): not wired in.** It is plain HTML with no build step, and Vercel only publishes its own folder, so it keeps its own copies of the tokens, the nav and Google Fonts links. Change a token or the nav here first, then copy the change into `apps/web/`.

`theme.css` is the Tailwind v4 adapter: it maps the `tokens.css` variables onto Tailwind names (`--color-ink`, `--font-display` …), so `tokens.css` stays plain CSS that any page can use.

## Regenerating the fonts

The woff2 files and `fonts.css` came from the Google Fonts CSS API (`family=Inter:wght@400..700&family=Michroma&family=Space+Grotesk:wght@400..700`), keeping only the latin and latin-ext blocks with their `unicode-range`. To add a weight or a font, fetch the API again with a Chrome user agent and keep the same file naming (`<family>-<subset>.woff2`).
