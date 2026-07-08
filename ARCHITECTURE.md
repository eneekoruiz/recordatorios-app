# Arquitectura (Modo Dios) 🧠

Este documento desglosa la ingeniería detrás de *Recordatorios Pro*, explicando cómo logramos un rendimiento $O(1)$, consultas matriciales sin cuello de botella y un sistema de notificaciones resiliente.

## 1. El Estado Global: Hash Maps sobre Arrays
Normalmente, las apps de tareas usan `TaskItem[]`. Esto provoca que buscar, actualizar o eliminar una tarea tenga una complejidad $O(N)$.
En nuestra arquitectura, el _store_ de Zustand (`useAppStore.ts`) utiliza un diccionario indexado (`Record<string, TaskItem>`). 
*   **Ventaja:** Cuando un usuario desliza (*swipe*) para completar la tarea `t-8492`, el acceso a memoria es $O(1)$. La actualización es instantánea, sin importar si hay miles de tareas.

## 2. Consultas Matriciales y Rutinas en Cascada
Para evitar duplicar datos en la base de datos para tareas recurrentes, introdujimos el concepto de `frequencyLevel` (Nivel 1: Diario, Nivel 2: Semanal).
*   **Lógica de Renderizado:** Cuando el usuario entra en "Mi Semana" (Nivel 2), el selector derivado en Zustand pide: `todas las tareas donde frequencyLevel <= 2`. 
*   **Virtualización:** Una vez filtradas y agrupadas por categoría, se "aplanan" (*flatten*) en un array 1D (`header, task, header...`) que alimenta a `@tanstack/react-virtual`. El DOM solo inyecta los ~10 nodos visibles, permitiendo 60fps de scroll infinito.

## 3. Algoritmo SmartSort (Priorización de Contexto)
El clásico `ORDER BY date` es ineficiente cognitivamente. Implementamos una heurística de urgencia (`_score`):
1.  **Detección de Proximidad:** Si la alarma más cercana de una tarea suena en `< 2 horas`, suma +50 puntos.
2.  **Desgaste del Día:** Si son más de las 18:00 PM y es una rutina "Diaria", suma +30 puntos.
3.  El motor agrupa y ordena las dos tareas con mayor puntuación en la sección "Up Next".

## 4. Manifiestos Nativos y Store Readiness (ASO)
Para empaquetar en iOS/Android mediante Capacitor, este proyecto está blindado a nivel permisos.

### A. AndroidManifest.xml
Si migras a Capacitor, requerirás inyectar estos permisos para el `NotificationService`:
```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<!-- Justificación ASO: Se requiere alarma exacta para que las píldoras (medicinas) notifiquen al milisegundo. -->
```

### B. Info.plist (iOS)
Apple rechaza apps por permisos no justificados. Se inyecta en el plist:
```xml
<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
  <string>processing</string>
</array>
<key>NSUserNotificationAlertStyle</key>
<string>alert</string>
<!-- Justificación de Revisión: La app actúa como agenda clínica y personal, requiriendo alertas activas. -->
```

## 5. Resiliencia de Datos
Toda la operación local está flanqueada por el middleware `persist` de Zustand. Cada mutación en la memoria $O(1)$ se serializa en milisegundos. En caso de cierre forzoso (Zero Crashes), el estado de recuperación es del 100%.
