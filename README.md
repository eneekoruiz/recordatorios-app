# Recordatorios App

PWA de gestión de tareas y recordatorios diseñada con enfoque offline-first.

## Características

- Almacenamiento local principal en IndexedDB mediante Dexie.js.
- Interfaz reactiva construida con React 18, TypeScript y Tailwind CSS.
- Sincronización remota opcional con backend PostgreSQL / Prisma y almacenamiento S3.
- Gestión de estado global con Zustand.
- Soporte para instalación como PWA y funcionamiento sin conexión.

## Stack técnico

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Persistencia local:** Dexie.js (IndexedDB).
- **Backend / Sincronización:** Prisma Client, Supabase / PostgreSQL, AWS S3 SDK.

## Instalación y desarrollo local

```bash
npm install
npm run dev
```

Para generar la compilación de producción:

```bash
npm run build
```
