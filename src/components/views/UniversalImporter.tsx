import { useState } from 'react';
import { Download, Upload, Info, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { detectFormatAndParse } from '../../utils/importerParser';
import type { ParseResult } from '../../utils/importerParser';
import { useNavigation } from '../../hooks/useNavigation';

export function UniversalImporter() {
  const { exportData, cycles } = useAppStore();
  const { pop } = useNavigation();
  const [inputText, setInputText] = useState('');
  const [preview, setPreview] = useState<ParseResult | null>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recordatorios_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleProcessText = () => {
    if (!inputText.trim()) return;
    const result = detectFormatAndParse(inputText, { cycles });
    setPreview(result);
  };

  const handleConfirmImport = () => {
    if (!preview) return;
    
    // Import everything directly into store
    useAppStore.setState((state) => {
      const updatedTasks = { ...state.tasks };
      preview.tasks.forEach(t => { updatedTasks[t.id] = t; });
      
      return {
        tasks: updatedTasks,
        cycles: [...state.cycles, ...preview.cycles],
        lists: preview.lists.length > 0 ? preview.lists : state.lists,
        // (In a full JSON restore, we overwrite. For text dump, we append)
      };
    });

    pop(); // Return to previous view
  };

  return (
    <div style={{ padding: 'var(--space-32) var(--space-64)', maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
      <header>
        <h1 className="text-display" style={{ marginBottom: 'var(--space-8)' }}>Soberanía de Datos</h1>
        <p className="text-secondary">Exporta o importa tu cerebro digital (Backup JSON, Brain Dump Texto Plano, CSV).</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-32)' }}>
        
        {/* Export Card */}
        <div className="surface-card" style={{ padding: 'var(--space-24)', background: 'var(--bg-surface)' }}>
          <h3 className="text-title" style={{ marginBottom: 'var(--space-16)' }}>Exportar</h3>
          <p className="text-muted" style={{ marginBottom: 'var(--space-24)' }}>Descarga un backup de todo tu sistema en formato JSON seguro.</p>
          
          <button 
            onClick={handleExport}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', width: '100%', background: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--space-12)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}
          >
            <Download size={18} /> Descargar JSON
          </button>
        </div>

        {/* Import Card */}
        <div className="surface-card" style={{ padding: 'var(--space-24)', background: 'var(--bg-surface)' }}>
          <h3 className="text-title" style={{ marginBottom: 'var(--space-16)' }}>Omni-Importador</h3>
          <div style={{ display: 'flex', gap: 'var(--space-8)', color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: 'var(--space-16)' }}>
            <Info size={16} style={{ flexShrink: 0 }} />
            <span>Pega tu Backup JSON, CSV o Texto Plano. El sistema detectará el formato automáticamente.</span>
          </div>

          {!preview ? (
            <>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ej: Comprar pintura @hogar #MiSemana..."
                style={{ width: '100%', minHeight: 200, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-16)', color: 'var(--text-primary)', fontFamily: 'monospace', resize: 'vertical', marginBottom: 'var(--space-16)' }}
              />
              <button 
                onClick={handleProcessText}
                disabled={!inputText.trim()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', width: '100%', background: inputText.trim() ? 'var(--text-primary)' : 'var(--border-subtle)', color: inputText.trim() ? 'var(--bg-base)' : 'var(--text-tertiary)', border: 'none', padding: 'var(--space-12)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: inputText.trim() ? 'pointer' : 'not-allowed' }}
              >
                <Upload size={18} /> Procesar Datos
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
              <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-16)', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-green)' }}>
                <h4 style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><CheckCircle2 size={18} /> Análisis Exitoso</h4>
                <ul style={{ color: 'var(--text-secondary)', marginLeft: 20 }}>
                  <li>{preview.tasks.length} Tareas detectadas</li>
                  <li>{preview.cycles.length} Nuevos ciclos detectados</li>
                  <li>{preview.lists.length} Listas (JSON completo)</li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-12)' }}>
                <button 
                  onClick={() => setPreview(null)}
                  style={{ flex: 1, padding: 'var(--space-12)', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleConfirmImport}
                  style={{ flex: 1, padding: 'var(--space-12)', background: 'var(--accent-primary)', border: 'none', color: 'white', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
                >
                  Confirmar e Importar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
