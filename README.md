# Recordatorios App

Offline-first Progressive Web Application for managing tasks and reminders with local IndexedDB storage and virtualized rendering.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Storage & PWA:** Dexie.js (IndexedDB wrapper), `dexie-react-hooks`, Vite Plugin PWA
- **State & Performance:** Zustand, `@tanstack/react-virtual`
- **Linting:** Oxlint

## Architecture & Key Decisions

- **Dexie.js Reactive Persistence:** Relational task and folder schemas stored client-side in IndexedDB using Dexie, with real-time UI updates driven by `useLiveQuery`.
- **Virtualized Lists:** Utilizes TanStack Virtual for item list rendering, maintaining 60 FPS scrolling performance across large task archives.
- **PWA Service Worker:** Offline assets and app shell cached locally via Vite Plugin PWA for standalone desktop and mobile installation.

## Local Setup

### Prerequisites

- Node.js 18+

### Installation & Run

```bash
git clone https://github.com/eneekoruiz/recordatorios-app.git
cd recordatorios-app
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build production bundle
npm run build
```
