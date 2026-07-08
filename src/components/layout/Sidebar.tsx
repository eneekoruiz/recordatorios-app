import { Calendar, Inbox, CalendarDays, Plus } from 'lucide-react';
import clsx from 'clsx';
import './Layout.css';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
}

export function Sidebar({ currentView, onSelectView }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="search-bar">
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="smart-lists-nav">
        <div 
          className={clsx('nav-item', currentView === 'TODAY' && 'active')}
          onClick={() => onSelectView('TODAY')}
        >
          <div className="icon-box blue"><Calendar size={18} /></div>
          <span>Mi Día</span>
          <span className="count">3</span>
        </div>
        <div 
          className={clsx('nav-item', currentView === 'WEEK' && 'active')}
          onClick={() => onSelectView('WEEK')}
        >
          <div className="icon-box red"><CalendarDays size={18} /></div>
          <span>Mi Semana</span>
          <span className="count">12</span>
        </div>
        <div 
          className={clsx('nav-item', currentView === 'MONTH' && 'active')}
          onClick={() => onSelectView('MONTH')}
        >
          <div className="icon-box orange"><Inbox size={18} /></div>
          <span>Mi Mes</span>
          <span className="count">45</span>
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
