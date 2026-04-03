# Eratos Robotics Landing Starter

A Bun-first Next.js 16 starter for building the Eratos Robotics landing page without burning more time on setup.

## Included

- Bun + Next.js App Router
- TypeScript
- Tailwind CSS 4
- shadcn/ui primitives
- Biome for linting and formatting
- A polished landing page shell with editable content config

## Commands

```bash
bun run dev
bun run format
bun run lint
bun run typecheck
bun run check
```

Open `http://localhost:3000` after `bun run dev`.

## Edit First

- `src/config/site.ts`: landing page copy, nav items, section content
- `src/app/globals.css`: brand colors, surface styles, typography tokens
- `src/app/page.tsx`: section order and layout structure
- `src/app/layout.tsx`: metadata and fonts

## Notes

- The current page is a strong placeholder, not a finished brand narrative.
- The setup is intentionally lean, so it is easy to extend instead of fighting a bloated template.
