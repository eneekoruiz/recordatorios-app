export type FrequencyLevel = 0 | 1 | 2 | 3;

export interface TaskItem {
  id: string;
  categoryId: string;
  title: string;
  notes?: string;
  frequencyLevel: FrequencyLevel;
  dueDate: Date;
  status: 'PENDING' | 'COMPLETED' | 'SKIPPED';
  alerts: string[]; 
  createdAt: number; 

  // --- SYNC-READY FIELDS (Cloud Architect) ---
  // Estos campos permiten resolución de conflictos (CRDT) y sincronización con Supabase/Firebase.
  
  /** Timestamp de la última modificación local. Gana el más reciente en el servidor. */
  updated_at: number; 
  
  /** Booleano que indica si esta entidad se modificó en local pero no se ha subido a la nube. */
  is_dirty: boolean;  
  
  /** Borrado lógico (Soft Delete). Al borrar en UI, se marca true. En el próximo sync, se le dice a la nube que lo destruya. */
  is_deleted: boolean; 
}
