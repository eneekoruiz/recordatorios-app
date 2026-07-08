import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { CustomCycle } from '../../models/Task';

interface CycleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CycleModal({ isOpen, onClose }: CycleModalProps) {
  const { cycles, addCycle, updateCycle, deleteCycle } = useAppStore();
  
  const [newCycleName, setNewCycleName] = useState('');
  const [newCycleDays, setNewCycleDays] = useState(14);
  const [newCycleEmoji, setNewCycleEmoji] = useState('✨');

  const handleCreate = () => {
    if (!newCycleName) return;
    const newCycle: CustomCycle = {
      id: `cycle_${Date.now()}`,
      name: newCycleName,
      daysValue: newCycleDays,
      isPinned: true,
      emoji: newCycleEmoji
    };
    addCycle(newCycle);
    setNewCycleName('');
    setNewCycleDays(14);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="surface-glass"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-24)'
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="surface-card"
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              padding: 'var(--space-32)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-24)' }}>
              <h2 className="text-title">Gestionar Ciclos</h2>
              <button className="btn-icon" onClick={onClose}><X size={24} /></button>
            </div>

            {/* Lista de Ciclos Existentes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', marginBottom: 'var(--space-32)' }}>
              {cycles.map(cycle => (
                <div key={cycle.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-12)', background: 'var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
                    <span style={{ fontSize: '1.25rem' }}>{cycle.emoji}</span>
                    <div>
                      <div className="text-body" style={{ fontWeight: 500 }}>{cycle.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.8rem' }}>{cycle.daysValue} días</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
                    <button 
                      onClick={() => updateCycle(cycle.id, { isPinned: !cycle.isPinned })}
                      style={{ background: 'none', border: 'none', color: cycle.isPinned ? 'var(--accent-primary)' : 'var(--text-tertiary)', cursor: 'pointer' }}
                    >
                      {cycle.isPinned ? 'Fijado' : 'Fijar'}
                    </button>
                    {!['cycle_day', 'cycle_week', 'cycle_month'].includes(cycle.id) && (
                      <button className="btn-icon" onClick={() => deleteCycle(cycle.id)}>
                        <Trash2 size={16} color="var(--accent-red)" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Crear Nuevo Ciclo */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-24)' }}>
              <h3 className="text-body" style={{ fontWeight: 600, marginBottom: 'var(--space-16)' }}>Crear Nuevo Ciclo</h3>
              
              <div style={{ display: 'flex', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
                <input 
                  value={newCycleEmoji}
                  onChange={(e) => setNewCycleEmoji(e.target.value)}
                  style={{ width: '50px', textAlign: 'center', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                />
                <input 
                  placeholder="Nombre (ej. Mi Quincena)"
                  value={newCycleName}
                  onChange={(e) => setNewCycleName(e.target.value)}
                  style={{ flex: 1, padding: 'var(--space-12)', background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-24)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
                  <span className="text-muted">Duración:</span>
                  <span className="text-body" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{newCycleDays} días</span>
                </div>
                <input 
                  type="range" 
                  min="2" max="365" 
                  value={newCycleDays}
                  onChange={(e) => setNewCycleDays(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
              </div>

              <button 
                onClick={handleCreate}
                disabled={!newCycleName}
                style={{ 
                  width: '100%', padding: 'var(--space-16)', 
                  background: newCycleName ? 'var(--accent-primary)' : 'var(--border-subtle)', 
                  color: newCycleName ? 'white' : 'var(--text-tertiary)',
                  border: 'none', borderRadius: 'var(--radius-md)',
                  fontWeight: 600, cursor: newCycleName ? 'pointer' : 'not-allowed',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-8)'
                }}
              >
                <Plus size={20} /> Añadir Ciclo Matemático
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
