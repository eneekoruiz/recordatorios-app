import { Plus, BarChart2, Settings, DownloadCloud, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import './Layout.css';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
}

export function Sidebar({ currentView, onSelectView }: SidebarProps) {
  const cycles = useAppStore(state => state.cycles);
  
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <div className="avatar">E</div>
        <div className="user-info">
          <div className="user-name text-title">Eneko Ruiz</div>
          <div className="user-email text-muted">Plan Élite</div>
        </div>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="smart-lists-nav">
        {cycles.filter(c => c.isPinned).map(cycle => (
          <div 
            key={cycle.id}
            className={`nav-item ${currentView === cycle.id ? 'active' : ''}`}
            onClick={() => onSelectView(cycle.id)}
          >
            <span style={{ fontSize: '1.2rem' }}>{cycle.emoji}</span>
            <span>{cycle.name}</span>
          </div>
        ))}

        <div 
          className={`nav-item ${currentView === 'ANALYTICS' ? 'active' : ''}`}
          onClick={() => onSelectView('ANALYTICS')}
          style={{ marginTop: 'var(--space-12)' }}
        >
          <BarChart2 size={18} />
          <span>Estadísticas</span>
        </div>
        
        <div 
          className="nav-item"
          onClick={() => onSelectView('MANAGE_CYCLES')}
          style={{ color: 'var(--text-tertiary)' }}
        >
          <Settings size={18} />
          <span>Gestionar Ciclos</span>
        </div>
        
        <div 
          className="nav-item"
          onClick={() => onSelectView('DATA')}
          style={{ color: 'var(--text-tertiary)' }}
        >
          <DownloadCloud size={18} />
          <span>Importar / Exportar</span>
        </div>

        <div 
          className="nav-item"
          onClick={() => onSelectView('BRAIN_DUMP')}
          style={{ color: 'var(--accent-glow)' }}
        >
          <Zap size={18} color="var(--accent-primary)" />
          <span style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Brain Dump</span>
        </div>
      </div>

      <div className="categories-section">
        <div className="section-header">Mis Listas</div>
        <div className="category-item">
          <div className="list-icon" style={{ backgroundColor: '#ff9500' }}></div>
          <span>Limpieza</span>
        </div>
        <div className="category-item">
          <div className="list-icon" style={{ backgroundColor: '#34c759' }}></div>
          <span>Compra</span>
        </div>
        <div className="category-item">
          <div className="list-icon" style={{ backgroundColor: '#af52de' }}></div>
          <span>Skincare</span>
        </div>
      </div>

      <button className="add-list-btn">
        <Plus size={18} />
        Añadir Lista
      </button>
    </aside>
  );
}
