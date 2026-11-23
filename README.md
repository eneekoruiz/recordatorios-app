# Recordatorios App · PWA React y Dexie.js

Aplicación progresiva (PWA) de listas y recordatorios diseñada con enfoque offline-first, almacenamiento local reactivo en IndexedDB y renderizado virtualizado de alto rendimiento.

- **Documentación de arquitectura:** [DeepWiki - recordatorios-app](https://deepwiki.com/eneekoruiz/recordatorios-app)

## Propósito y Valor Técnico

Variante de cliente ligero enfocada en la velocidad de renderizado y la autonomía local absoluta, permitiendo gestionar catálogos extensos de tareas pendientes sin latencia ni dependencias de red.

- **Persistencia Reactiva con Dexie.js:** Esquema relacional de tareas, carpetas y etiquetas almacenado directamente en IndexedDB, con suscripciones reactivas a cambios mediante el hook `useLiveQuery` de Dexie.
- **Renderizado Virtualizado (`@tanstack/react-virtual`):** Lista virtualizada que calcula en tiempo real los nodos visibles en el viewport, asegurando un desplazamiento fluido a 60 FPS incluso con miles de elementos históricos archivados.
- **Capacidades PWA Completas:** Manifiesto de aplicación web y Service Worker configurados para permitir la instalación de escritorio y móvil, con caché de activos estáticos para arranque instantáneo sin conexión.

## Stack Técnico

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Almacenamiento Local:** Dexie.js (IndexedDB wrapper), `dexie-react-hooks`
- **Rendimiento & Estado:** Zustand, `@tanstack/react-virtual`
- **Tooling:** Vite Plugin PWA, Oxlint

## Puesta en Marcha Local

```bash
git clone https://github.com/eneekoruiz/recordatorios-app.git
cd recordatorios-app
npm install

# Iniciar servidor de desarrollo con recarga rápida
npm run dev

# Análisis estático de código
npm run lint

# Generar bundle de producción
npm run build
```
