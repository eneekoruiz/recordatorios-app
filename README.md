# Recordatorios Pro 🚀

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.x-61dafb.svg)
![Vite](https://img.shields.io/badge/vite-latest-646cff.svg)
![Status](https://img.shields.io/badge/status-Production_Ready-brightgreen.svg)

El clon definitivo y avanzado de Apple Reminders, diseñado para operar bajo los estándares comerciales más estrictos (10/10). Con un motor cognitivo (NLP), priorización inteligente (SmartSort) y una interfaz de fricción cero basada en gestos.

## Características de Nivel Comercial (Killer Features)

*   🧠 **Procesamiento de Lenguaje Natural (NLP):** Escribe `"Pastillas a las 5 y 8"` y el sistema auto-configurará las horas y la categoría (Skincare/Salud) al vuelo.
*   ⚡ **SmartSort (Priorización de Contexto):** Se acabó ordenar a mano. El algoritmo heurístico evalúa la proximidad de tus alertas y el desgaste del día para destacar tus 2 tareas más urgentes en *"Up Next"*.
*   📱 **Zero-Friction UX (Swipe Gestures):** Arrastra las tareas a la derecha para completarlas o a la izquierda para eliminarlas, acompañadas de *Haptic Feedback* (vibración).
*   🚀 **Rendimiento Extremo (60fps):** Las listas anidadas están virtualizadas (`@tanstack/react-virtual`). El DOM jamás se sobrecarga, incluso con 10,000 tareas activas. El estado global corre en un **Hash Map $O(1)$** usando Zustand.
*   🛡️ **Resiliencia Total (Zero Crashes):** Arquitectura *Offline-First* con persistencia de estado instantánea y manejo elegante de casos límite (permisos denegados).

## Desarrollo e Instalación

1. Clona el repositorio.
2. Instala las dependencias: `npm install`
3. Arranca el entorno de desarrollo: `npm run dev`

### Compilación para Producción (Release Build)

Este proyecto está purgado de *warnings*, *console.logs* sobrantes y *mock data*, preparado para pasar estrictos QA.

```bash
# Ejecuta la comprobación estricta de TypeScript y construye los binarios minificados
npm run build
```

El resultado se depositará en el directorio `dist/`, listo para ser servido por cualquier CDN o empaquetado con Capacitor para iOS/Android.

## Internacionalización (i18n) & ASO

La aplicación está diseñada pensando en la optimización de la App Store. Contiene etiquetas `aria-label` para *VoiceOver/TalkBack* y la estructura JSON (`src/i18n/es.json`) está preparada para escalar a 20 idiomas con un solo clic en el futuro.
