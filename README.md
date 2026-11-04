# IGNIS — Microgravity Combustion Lab

A NASA Space Apps Challenge 2026 project. IGNIS is a mission-control dashboard for microgravity combustion research: live flame visualization, telemetry readouts, and an AI research assistant.

## Fork

This repository is a **fork** of [azura-anime](https://github.com/yk445kauod-coder/azura-anime). The original project's name and scope were replaced entirely by this rebuild — the fork exists because IGNIS grew out of that codebase.

## The rebuild

The forked UI was rebuilt from scratch as a space-lab mission-control experience (xAI/NASA mission-control aesthetic):

- **Design system** — dark-only theme built on OKLCH semantic tokens: deep-space navy surfaces, ember-orange combustion accents, cyan telemetry, defined entirely in `src/styles.css`.
- **Typography** — Space Grotesk for display/values, DM Sans for body, IBM Plex Mono for mission-control labels and telemetry readouts.
- **Real imagery** — no AI-generated images. Uses public-domain NASA photography hosted via CDN assets: the real "Fire in Space" microgravity flame (FLEX experiment) and the Blue Marble Earth backdrop, with NASA credit shown in the UI.
- **Dashboard** — sidebar navigation (Operations / Science), system status bar with live UTC clock, environment/data-source/experiment status cards, combustion visualization panel with telemetry (flame diameter, temperature, pressure, heat-flux sparkline), IGNIS AI assistant panel, quick access, key insights, and mission stats with an SVG donut chart.
- **Stack** — TanStack Start (React 19), Tailwind CSS v4, shadcn-style components, lucide-react icons.

## Tech stack

- [Lovable](https://lovable.dev) project — continue developing in the [Lovable editor](https://lovable.dev/projects/aff00746-5200-45a6-aa1a-aca0c0c6b30b).
- Vite 7 + TanStack Start v1, Tailwind CSS v4.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Building

```sh
npm run build
```
