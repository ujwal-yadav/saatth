# Saatth

A responsive care companion app built with Next.js 16 and React 19, following the supplied Saatth UI reference.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js (usually `http://localhost:3000`).

```bash
npm run lint
npm run build
npm start
```

## Screens and interactions

- `/`: landing page, six services, and an introduction to the care flow.
- `/dashboard`: care dashboard, sample visit updates, and recurring care setup.
- `/visits`: sample visits and saved recurring care plans.
- `/family`: family profiles with preselected booking details.
- `/support`: contact message composition and preview.

Booking includes a date, person, duration, address, price estimate, review step, and confirmation. Visits, recurring plans, and the selected neighbourhood persist in local browser storage. Dialogs support keyboard navigation, Escape, backdrop dismissal, and focus restoration.

This is an interactive frontend prototype. Companions, pricing, tracking, and family profiles are illustrative. It does not dispatch companions, process payments, or send support messages. The supplied image is stored locally as an optimized WebP.

## Structure

- `src/app`: routes, metadata, and reference styles.
- `src/components`: reusable UI, page content, dialogs, and shared state.
- `src/lib/saatth.ts`: services, shared types, and date/currency formatting.
- `public/images`: the supplied care companion photograph.
