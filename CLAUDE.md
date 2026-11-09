# zoja-ai

A monorepo: apps that deploy on their own sit in `apps/`, code they share sits in `packages/`. Each app is a separate Vercel project connected to this repo, with its own Root Directory and domain.

- `apps/web/`: the public website, www.zoja.ai (Vercel Root Directory `apps/web`). Static pages. See `apps/web/CLAUDE.md`, which also holds the product direction.
- `apps/studio/`: the studio web app, app.zoja.ai (Vercel Root Directory `apps/studio`). A placeholder page for now. See `apps/studio/CLAUDE.md`.
- `packages/ui/`: the shared design system (tokens, self-hosted fonts, logos, nav). Not deployed by itself; apps bundle it once they have a build step. See `packages/ui/CLAUDE.md`.
- `brand/`: logo source files. Copy a logo into an app's own `assets/`, because each Vercel project publishes only its own folder.

Features of an app are pages inside its folder, not new folders in `apps/`. A new app folder is only for something with its own address that runs on its own. Once an app has a framework, its code goes in its own `src/`.

Vercel publishes every file in a project's folder, linked or not. Keep private files (like `CLAUDE.md`) out with that folder's `.vercelignore`.

Local previews: the `web`, `studio` and `ui` configs in `.claude/launch.json` (ports 8765, 8766, 8767).
