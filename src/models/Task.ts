export interface CustomCycle {
  id: string;
  name: string;
  daysValue: number; // Duración en días para la cascada matemática
  isPinned: boolean;
  emoji: string;
}

export interface TaskItem {
  id: string;
  categoryId: string;
  title: string;
  notes?: string;
  
  // Dependencias Topológicas (Bloqueadores)
  blockedBy: string[]; // Array de IDs de tareas que deben completarse primero
  
  // Nuevo: Referencia al ciclo dinámico (sustituye a frequencyLevel)
  cycleId: string;
  
  dueDate: Date;
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
  alerts: string[]; 
  createdAt: number; 

  // --- INNOVATION FIELDS ---
  /** Coordenadas de Geofencing para disparar notificaciones basadas en ubicación */
  location?: { lat: number; lng: number; radius: number; address: string };

  // --- SYNC-READY FIELDS (Cloud Architect) ---
  updated_at: number; 
  is_dirty: boolean;  
  is_deleted: boolean; 
}
